import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

const HERO_IMG = '/images/IMG_8513.jpg'

export default function Hero() {
  return (
    <section className={styles.hero} data-scroll-section>
      <div className={styles.bg}>
        <img
          src={HERO_IMG}
          alt="Poêle à bois NUKÖ dans un van aménagé"
          className={styles.img}
          decoding="async"
          fetchPriority="high"
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <p className={styles.label} data-scroll data-scroll-speed="0.12">Fabricant breton — Poêles à bois compacts</p>
        <h1 className={styles.title} data-scroll data-scroll-speed="0.2">
          <span className={styles.titleLine}>Le feu</span><br />
          <em className={styles.titleAccent}>partout avec vous</em>
        </h1>
        <div className={styles.bottom} data-scroll data-scroll-speed="0.16">
          <p className={styles.desc}>
            Poêles à bois compacts, conçus et fabriqués en Bretagne<br />
            pour vans, tiny houses, yourtes et caravanes.
          </p>
          <Link to="/catalogue" className="btn btn--light">
            Découvrir nos poêles
          </Link>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <span>Découvrir</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
