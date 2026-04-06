import { Link } from 'react-router-dom'
import styles from './Showroom.module.css'

const IMGS = [
  '/images/IMG_8511.jpg',
  '/images/IMG_8513.jpg',
  '/images/IMG_8515.jpg',
]

export default function Showroom() {
  return (
    <section className={styles.showroom} id="showroom" data-scroll-section>

      <div className={styles.textCol}>
        <div className={styles.text} data-reveal>
          <span className="section-label">L&apos;atelier</span>
          <h2 className="section-title">
            Fabriqué à la main<br /><em>en Bretagne</em>
          </h2>
          <p className="section-body">
            Chaque poêle NUKÖ est conçu et assemblé dans notre atelier
            à Lorient. Acier de qualité, soudures soignées, finitions
            artisanales — nous maîtrisons chaque étape de fabrication.
          </p>
          <p className="section-body">
            Nous testons chaque unité avant expédition pour garantir
            sécurité et performance dans votre habitat mobile.
          </p>
          <Link to="/catalogue" className="btn btn--dark">
            Voir le catalogue
          </Link>
        </div>
      </div>

      <div className={styles.mosaic}>
        <div className={styles.imgMain} data-reveal>
          <img src={IMGS[0]} alt="Atelier NUKÖ à Lorient" loading="lazy" decoding="async" />
        </div>
        <div className={styles.imgSub} data-reveal style={{ transitionDelay: '0.15s' }}>
          <img src={IMGS[1]} alt="Fabrication artisanale" loading="lazy" decoding="async" />
        </div>
        <div className={styles.imgSub} data-reveal style={{ transitionDelay: '0.3s' }}>
          <img src={IMGS[2]} alt="Poêle NUKÖ en fonctionnement" loading="lazy" decoding="async" />
        </div>
      </div>

    </section>
  )
}
