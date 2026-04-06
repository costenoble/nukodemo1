import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './PageConfirmation.module.css'

export default function PageConfirmation() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCart()

  useEffect(() => {
    if (sessionId) {
      clearCart()
    }
  }, [sessionId, clearCart])

  return (
    <section className={styles.section} data-scroll-section>
      <div className={styles.inner}>
        <div className={styles.icon}>&#10003;</div>
        <h1 className={styles.title}>Paiement confirmé</h1>
        <p className={styles.text}>
          Merci pour votre commande ! Vous allez recevoir un email de confirmation
          avec le récapitulatif de votre achat.
        </p>
        <p className={styles.text}>
          Votre poêle sera fabriqué dans notre atelier de Lorient et expédié
          sous 2 à 4 semaines. Nous vous tiendrons informé par email.
        </p>
        {sessionId && (
          <p className={styles.ref}>
            Référence : <code>{sessionId.slice(0, 20)}...</code>
          </p>
        )}
        <div className={styles.actions}>
          <Link to="/" className="btn btn--green">Retour à l&apos;accueil</Link>
          <Link to="/contact" className="btn btn--dark">Une question ?</Link>
        </div>
      </div>
    </section>
  )
}
