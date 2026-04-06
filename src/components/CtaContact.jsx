import { Link } from 'react-router-dom'
import styles from './CtaContact.module.css'

export default function CtaContact() {
  return (
    <section className={styles.section} data-scroll-section>
      <div className={styles.inner}>
        <div className={styles.text} data-reveal>
          <h2 className={styles.title}>
            Prêt à embarquer<br /><em>la chaleur du bois ?</em>
          </h2>
          <p>Découvrez nos poêles compacts ou demandez conseil. Notre équipe à Lorient vous accompagne dans votre projet.</p>
        </div>
        <div className={styles.actions} data-reveal>
          <Link to="/catalogue" className="btn btn--light">Voir le catalogue</Link>
          <Link to="/contact" className={styles.phone}>
            <span>ou écrivez-nous</span>
            <strong>contact@nukostoves.fr</strong>
          </Link>
        </div>
      </div>
    </section>
  )
}
