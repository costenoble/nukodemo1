import { Link } from 'react-router-dom'
import styles from './Horaires.module.css'

export default function Horaires() {
  return (
    <section className={styles.section} data-scroll-section>
      <div className={styles.inner}>

        <div className={styles.left} data-reveal>
          <span className="section-label">Expédition</span>
          <h2 className="section-title">
            Livré chez vous<br /><em>partout en France</em>
          </h2>
          <p className={styles.subtitle}>
            Chaque poêle est soigneusement emballé et expédié depuis notre atelier de Lorient.
            Livraison en France métropolitaine sous 2 à 4 semaines après commande.
          </p>
          <Link to="/contact" className="btn btn--dark">
            Nous contacter
          </Link>
        </div>

        <div className={styles.right} data-reveal>
          <div className={styles.table}>
            <div className={styles.row}>
              <span className={styles.jour}>Fabrication</span>
              <span className={styles.heures}>2 à 4 semaines</span>
            </div>
            <div className={styles.row}>
              <span className={styles.jour}>Expédition</span>
              <span className={styles.heures}>France métropolitaine</span>
            </div>
            <div className={styles.row}>
              <span className={styles.jour}>Frais de port</span>
              <span className={styles.heures}>Inclus</span>
            </div>
            <div className={styles.row}>
              <span className={styles.jour}>Suivi</span>
              <span className={styles.heures}>Email + numéro de tracking</span>
            </div>
          </div>

          <div className={styles.urgence}>
            <div className={styles.urgenceDot} />
            <p>
              <strong>Besoin d&apos;aide pour l&apos;installation ?</strong> — Guide fourni avec chaque poêle + accompagnement téléphonique gratuit.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
