import styles from './Engagements.module.css'

const engagements = [
  {
    img: '/images/IMG_8511.jpg',
    title: 'Fabrication française',
    subtitle: 'Atelier à Lorient',
    detail: 'Chaque poêle est entièrement conçu, soudé et assemblé dans notre atelier breton. Acier français, savoir-faire local.',
  },
  {
    img: '/images/IMG_8513.jpg',
    title: 'Pensé pour le mobile',
    subtitle: 'Compact & sécurisé',
    detail: 'Nos poêles sont dimensionnés pour les petits espaces : légers, stables, avec des protections thermiques adaptées aux habitats mobiles.',
  },
  {
    img: '/images/IMG_8515.jpg',
    title: 'Garantie 2 ans',
    subtitle: 'SAV réactif',
    detail: 'Garantie complète de 2 ans sur chaque poêle. Notre équipe à Lorient assure un SAV direct et rapide.',
  },
]

export default function Engagements() {
  return (
    <section className={styles.engagements} id="engagements" data-scroll-section>
      <div className={styles.header} data-reveal>
        <span className="section-label">Nos engagements</span>
        <h2 className="section-title">
          La qualité<br /><em>artisanale</em>
        </h2>
      </div>

      <div className={styles.grid}>
        {engagements.map((e, i) => (
          <div
            key={e.title}
            className={styles.card}
            data-reveal
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className={styles.photo}>
              <img src={e.img} alt={e.title} loading="lazy" decoding="async" />
            </div>
            <div className={styles.info}>
              <h3>{e.title}</h3>
              <p className={styles.subtitle}>{e.subtitle}</p>
              <span>{e.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
