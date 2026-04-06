import { Link } from 'react-router-dom'
import styles from './LegalPage.module.css'

export default function PolitiqueConfidentialite() {
  return (
    <section className={styles.page} data-scroll-section>
      <div className={styles.inner} data-reveal>
        <span className={styles.label}>Protection des données</span>
        <h1 className={styles.title}>Politique de confidentialité</h1>
        <p className={styles.meta}>Dernière mise à jour: 5 avril 2026</p>

        <div className={styles.content}>
          <div>
            <h2>Collecte des données</h2>
            <p>
              Les données personnelles collectées via nos formulaires (nom, email, téléphone) sont
              utilisées uniquement pour traiter vos demandes de devis et vous recontacter. Elles ne
              sont jamais cédées à des tiers.
            </p>
          </div>

          <div>
            <h2>Durée de conservation</h2>
            <p>
              Vos données sont conservées pendant une durée maximale de 3 ans à compter de votre
              dernier contact avec nous, conformément aux recommandations de la CNIL.
            </p>
          </div>

          <div>
            <h2>Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression
              et de portabilité de vos données. Pour exercer ces droits, contactez-nous à
              contact@nukostoves.fr.
            </p>
          </div>

          <div>
            <h2>Cookies</h2>
            <p>
              Ce site utilise uniquement des cookies strictement nécessaires à son fonctionnement.
              Aucun cookie publicitaire ou de suivi n&apos;est utilisé.
            </p>
          </div>
        </div>

        <Link to="/" className={styles.back}>&larr; Retour à l&apos;accueil</Link>
      </div>
    </section>
  )
}
