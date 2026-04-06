import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

import styles from './PagePanier.module.css'

export default function PagePanier() {
  const { items, removeItem, updateQty, totalItems, totalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            id: i.id,
            name: i.name,
            price: i.price,
            qty: i.qty,
            image: i.image,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la création de la session de paiement')
      }

      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <section className={styles.empty} data-scroll-section>
        <div className={styles.emptyInner}>
          <h1 className={styles.emptyTitle}>Votre panier est vide</h1>
          <p className={styles.emptyText}>Découvrez nos poêles à bois compacts, fabriqués en Bretagne.</p>
          <Link to="/catalogue" className="btn btn--green">
            Voir le catalogue
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className={styles.header} data-scroll-section>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Votre panier</h1>
          <span className={styles.count}>{totalItems} article{totalItems > 1 ? 's' : ''}</span>
        </div>
      </section>

      <section className={styles.cart} data-scroll-section>
        <div className={styles.cartInner}>

          <div className={styles.items}>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
                </div>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <span className={styles.itemSub}>{item.subtitle}</span>
                  <span className={styles.itemPrice}>
                    {item.price ? `${item.price.toLocaleString('fr-FR')} €` : 'Sur devis'}
                  </span>
                </div>
                <div className={styles.itemActions}>
                  <div className={styles.qty}>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      aria-label="Diminuer la quantité"
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => removeItem(item.id)}
                    aria-label={`Retirer ${item.name}`}
                  >
                    Retirer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Récapitulatif</h2>

            <div className={styles.summaryLines}>
              {items.map(item => (
                <div key={item.id} className={styles.summaryLine}>
                  <span>{item.name} × {item.qty}</span>
                  <span>{(item.price * item.qty).toLocaleString('fr-FR')} €</span>
                </div>
              ))}
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>{totalPrice.toLocaleString('fr-FR')} €</span>
            </div>

            <p className={styles.summaryNote}>
              Livraison incluse en France métropolitaine. Fabrication sous 2 à 4 semaines.
            </p>

            <button
              type="button"
              className={styles.checkoutBtn}
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Redirection vers le paiement...' : 'Passer au paiement'}
            </button>

            {error && <p className={styles.error}>{error}</p>}

            <button
              type="button"
              className={styles.clearBtn}
              onClick={clearCart}
            >
              Vider le panier
            </button>
          </aside>

        </div>
      </section>
    </>
  )
}
