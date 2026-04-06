import { Link } from 'react-router-dom'
import styles from './Collection.module.css'

const IMGS = {
  van:    '/images/IMG_8511.jpg',
  tiny:   '/images/IMG_8513.jpg',
  yourte: '/images/IMG_8515.jpg',
}

const poeles = [
  {
    id: 'van',
    num: '01',
    img: IMGS.van,
    title: 'Poêle Van & Fourgon',
    desc: 'Ultra-compact et léger, conçu pour les espaces réduits. Chauffe efficacement 8 à 15 m² avec une sécurité maximale.',
  },
  {
    id: 'tiny',
    num: '02',
    img: IMGS.tiny,
    title: 'Poêle Tiny House',
    desc: 'Le compromis parfait entre puissance et encombrement. Idéal pour les tiny houses et petits habitats de 15 à 30 m².',
  },
  {
    id: 'yourte',
    num: '03',
    img: IMGS.yourte,
    title: 'Poêle Yourte & Caravane',
    desc: 'Robuste et performant, pensé pour les yourtes, caravanes et habitats alternatifs. Chaleur douce et longue autonomie.',
  },
]

export default function Collection() {
  return (
    <section className={styles.collection} id="collection" data-scroll-section>
      <div className={styles.header} data-reveal>
        <span className="section-label section-label--light">Nos poêles</span>
        <h2 className="section-title section-title--light">
          Un poêle<br /><em>pour chaque aventure</em>
        </h2>
      </div>

      <div className={styles.grid}>
        {poeles.map((p, i) => (
          <article
            key={p.num}
            className={styles.card}
            data-reveal
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className={styles.cardImg}>
              <img src={p.img} alt={p.title} loading="lazy" decoding="async" />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.num}>{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <Link to={`/catalogue#${p.id}`} className="link-arrow">Découvrir &rarr;</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
