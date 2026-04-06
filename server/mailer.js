import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const VENDOR_EMAIL = process.env.VENDOR_EMAIL || 'contact@nukostoves.fr'
const FROM_EMAIL = process.env.FROM_EMAIL || 'NUKÖ <noreply@nukostoves.fr>'

function formatAmount(cents, currency = 'eur') {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

function buildItemsHtml(items) {
  return items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e1d8;">${item.description}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e1d8;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e1d8;text-align:right;">${formatAmount(item.amount_total, item.currency)}</td>
        </tr>`
    )
    .join('')
}

function customerEmailHtml({ customerName, sessionId, amountTotal, currency, items }) {
  const firstName = customerName?.split(' ')[0] || 'Client'

  return `
  <div style="font-family:'DM Sans',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a18;">
    <div style="background:#2D5A3D;padding:2rem;text-align:center;">
      <h1 style="color:#fff;font-family:Georgia,serif;font-weight:300;font-size:1.8rem;margin:0;">NUKÖ</h1>
    </div>

    <div style="padding:2rem;">
      <h2 style="font-family:Georgia,serif;font-weight:300;font-size:1.5rem;">Merci ${firstName} !</h2>
      <p>Votre commande a bien été enregistrée. Votre poêle sera fabriqué dans notre atelier de Lorient et expédié sous 2 à 4 semaines.</p>

      <table style="width:100%;border-collapse:collapse;margin:1.5rem 0;">
        <thead>
          <tr style="background:#faf7f2;">
            <th style="padding:8px 12px;text-align:left;font-size:0.85rem;">Article</th>
            <th style="padding:8px 12px;text-align:center;font-size:0.85rem;">Qté</th>
            <th style="padding:8px 12px;text-align:right;font-size:0.85rem;">Prix</th>
          </tr>
        </thead>
        <tbody>
          ${buildItemsHtml(items)}
        </tbody>
      </table>

      <p style="font-size:1.1rem;font-weight:500;text-align:right;">
        Total : ${formatAmount(amountTotal, currency)}
      </p>

      <p style="font-size:0.8rem;color:#7a7a72;">Référence : ${sessionId}</p>

      <hr style="border:none;border-top:1px solid #e5e1d8;margin:1.5rem 0;" />

      <p style="font-size:0.85rem;color:#7a7a72;">
        Une question ? Répondez à cet email ou contactez-nous à contact@nukostoves.fr
      </p>
    </div>

    <div style="background:#1a1a18;padding:1.5rem;text-align:center;">
      <p style="color:#7a7a72;font-size:0.75rem;margin:0;">NUKÖ — Poêles à bois compacts, fabriqués en Bretagne</p>
    </div>
  </div>`
}

function vendorEmailHtml({ customerName, customerEmail, sessionId, amountTotal, currency, items }) {
  return `
  <div style="font-family:'DM Sans',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a18;">
    <div style="background:#B85C38;padding:1.5rem;text-align:center;">
      <h1 style="color:#fff;font-family:Georgia,serif;font-weight:300;font-size:1.5rem;margin:0;">Nouvelle commande !</h1>
    </div>

    <div style="padding:2rem;">
      <p><strong>Client :</strong> ${customerName || 'Non renseigné'}</p>
      <p><strong>Email :</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
      <p><strong>Montant :</strong> ${formatAmount(amountTotal, currency)}</p>
      <p><strong>Référence Stripe :</strong> ${sessionId}</p>

      <table style="width:100%;border-collapse:collapse;margin:1.5rem 0;">
        <thead>
          <tr style="background:#faf7f2;">
            <th style="padding:8px 12px;text-align:left;font-size:0.85rem;">Article</th>
            <th style="padding:8px 12px;text-align:center;font-size:0.85rem;">Qté</th>
            <th style="padding:8px 12px;text-align:right;font-size:0.85rem;">Prix</th>
          </tr>
        </thead>
        <tbody>
          ${buildItemsHtml(items)}
        </tbody>
      </table>
    </div>
  </div>`
}

export async function sendOrderEmails({ customerEmail, customerName, sessionId, amountTotal, currency, items }) {
  if (!process.env.SMTP_USER) {
    console.log('SMTP not configured — skipping emails')
    console.log('Would have sent to:', customerEmail, 'and', VENDOR_EMAIL)
    return
  }

  // Send to customer
  await transporter.sendMail({
    from: FROM_EMAIL,
    to: customerEmail,
    subject: 'NUKÖ — Confirmation de votre commande',
    html: customerEmailHtml({ customerName, sessionId, amountTotal, currency, items }),
  })

  // Send to vendor
  await transporter.sendMail({
    from: FROM_EMAIL,
    to: VENDOR_EMAIL,
    subject: `Nouvelle commande — ${customerName || customerEmail}`,
    html: vendorEmailHtml({ customerName, customerEmail, sessionId, amountTotal, currency, items }),
  })
}
