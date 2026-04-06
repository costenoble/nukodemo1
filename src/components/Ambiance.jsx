import { Link } from 'react-router-dom'
import styles from './Ambiance.module.css'

const IMG = '/images/IMG_8513.jpg'

export default function Ambiance() {
  return (
    <section className={styles.section} data-scroll-section>
      <div className={styles.bg} data-scroll data-scroll-speed="-0.2">
        <img src={IMG} alt="Poêle NUKÖ dans un van aménagé" loading="lazy" decoding="async" />
        <div className={styles.overlay} />
      </div>
      <div className={styles.content}>
        <span className="section-label section-label--light" data-reveal>L&apos;esprit NUKÖ</span>
        <h2 className={styles.title} data-reveal>
          La liberté,<br /><em>au coin du feu</em>
        </h2>
        <Link to="/catalogue" className="btn btn--light" data-reveal>
          Voir le catalogue
        </Link>
      </div>
    </section>
  )
}
