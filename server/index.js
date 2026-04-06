import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'
import { sendOrderEmails } from './mailer.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const app = express()
const PORT = process.env.PORT || 3001

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

// Webhook route must use raw body — register BEFORE express.json()
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  let event

  try {
    if (WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], WEBHOOK_SECRET)
    } else {
      // Dev mode: trust the event without signature verification
      event = JSON.parse(req.body.toString())
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    console.log('Payment successful for session:', session.id)
    console.log('Customer email:', session.customer_details?.email)

    try {
      // Retrieve line items for the email
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

      await sendOrderEmails({
        customerEmail: session.customer_details?.email,
        customerName: session.customer_details?.name,
        sessionId: session.id,
        amountTotal: session.amount_total,
        currency: session.currency,
        items: lineItems.data,
      })

      console.log('Order confirmation emails sent')
    } catch (err) {
      console.error('Failed to send order emails:', err.message)
    }
  }

  res.json({ received: true })
})

// JSON parser for all other routes
app.use(express.json())
app.use(cors({ origin: CLIENT_URL }))

// Create Stripe Checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Le panier est vide' })
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: item.image ? [`${CLIENT_URL}${item.image}`] : [],
        },
        unit_amount: item.price ? Math.round(item.price * 100) : 0,
      },
      quantity: item.qty,
    }))

    // Filter out items with no price (sur devis)
    const paidItems = lineItems.filter(li => li.price_data.unit_amount > 0)

    if (!paidItems.length) {
      return res.status(400).json({
        error: 'Tous vos articles sont sur devis. Veuillez nous contacter pour un devis personnalisé.',
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: paidItems,
      shipping_address_collection: {
        allowed_countries: ['FR'],
      },
      locale: 'fr',
      success_url: `${CLIENT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/panier`,
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Stripe session error:', err.message)
    res.status(500).json({ error: 'Erreur lors de la création de la session de paiement' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
