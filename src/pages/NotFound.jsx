import { Link } from 'react-router-dom'
import styles from './LegalPage.module.css'

export default function NotFound() {
  return (
    <section className={styles.page} data-scroll-section>
      <div className={styles.inner} data-reveal>
        <span className={styles.label}>Erreur 404</span>
        <h1 className={styles.title}>Page introuvable</h1>
        <p className={styles.meta}>
          L&apos;adresse demandée n&apos;existe pas ou a été déplacée.
        </p>
        <Link to="/" className={styles.back}>&larr; Retour à l&apos;accueil</Link>
      </div>
    </section>
  )
}
