import { useState, useEffect, useRef } from 'react'
import styles from './Temoignages.module.css'

const temoignages = [
  {
    quote: "On vit en van depuis 2 ans et le NUKÖ a changé nos hivers. Compact, efficace, et la qualité de fabrication est top. On recommande les yeux fermés.",
    cite: '— Léa & Tom, van aménagé Sprinter',
  },
  {
    quote: "Pour notre tiny house en Bretagne, on voulait un poêle fabriqué localement. NUKÖ a tout compris : le bon dimensionnement, les conseils d\'installation, un SAV réactif.",
    cite: '— Antoine D., tiny house à Vannes',
  },
  {
    quote: "Installé dans notre yourte depuis cet automne. La chaleur est douce, l\'autonomie excellente, et le design s\'intègre parfaitement. Merci l\'équipe !",
    cite: '— Claire & Mathieu, yourte dans le Morbihan',
  },
]

export default function Temoignages() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)

  const goTo = (index) => {
    setCurrent((index + temoignages.length) % temoignages.length)
  }

  const startInterval = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % temoignages.length)
    }, 5000)
  }

  useEffect(() => {
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [])

  const pause = () => clearInterval(intervalRef.current)
  const resume = () => startInterval()

  return (
    <section className={styles.section} id="temoignages" data-scroll-section>
      <div className={styles.inner}>
        <span className="section-label" data-reveal>Témoignages</span>

        <div
          className={styles.slider}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
        >
          {temoignages.map((t, i) => (
            <div
              key={i}
              className={`${styles.slide} ${i === current ? styles.active : ''}`}
            >
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <cite className={styles.cite}>{t.cite}</cite>
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <button type="button" className={styles.btn} onClick={() => goTo(current - 1)} aria-label="Précédent">&larr;</button>
          <div className={styles.dots}>
            {temoignages.map((_, i) => (
              <button
                type="button"
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Voir le témoignage ${i + 1}`}
                aria-pressed={i === current}
              />
            ))}
          </div>
          <button type="button" className={styles.btn} onClick={() => goTo(current + 1)} aria-label="Suivant">&rarr;</button>
        </div>
      </div>
    </section>
  )
}
