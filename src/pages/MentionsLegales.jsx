import { Link } from 'react-router-dom'
import styles from './LegalPage.module.css'

export default function MentionsLegales() {
  return (
    <section className={styles.page} data-scroll-section>
      <div className={styles.inner} data-reveal>
        <span className={styles.label}>Informations légales</span>
        <h1 className={styles.title}>Mentions légales</h1>
        <p className={styles.meta}>Dernière mise à jour: 5 avril 2026</p>

        <div className={styles.content}>
          <div>
            <h2>Éditeur du site</h2>
            <p>
              NUKO Stoves, spécialiste en poêles à bois.
              <br />
              28 rue du Faubourg Saint-Antoine, 75012 Paris.
              <br />
              Téléphone: 01 45 00 00 00.
              <br />
              Email: contact@nukostoves.fr.
            </p>
          </div>

          <div>
            <h2>Hébergement</h2>
            <p>
              Le site est hébergé par un prestataire technique conforme aux exigences de sécurité et de disponibilité applicables.
            </p>
          </div>

          <div>
            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des éléments présents sur ce site (textes, visuels, structure, identité graphique) est protégé.
              Toute reproduction, totale ou partielle, est interdite sans autorisation écrite préalable.
            </p>
          </div>
        </div>

        <Link to="/" className={styles.back}>&larr; Retour à l&apos;accueil</Link>
      </div>
    </section>
  )
}
