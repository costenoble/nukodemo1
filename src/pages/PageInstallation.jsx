import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLocoReady } from '../context/LocomotiveContext'
import styles from './PageInstallation.module.css'

const guides = [
  {
    num: '01',
    title: 'Choix de l\'emplacement',
    desc: 'Identifiez l\'endroit idéal dans votre van ou tiny house. Prévoyez les distances de sécurité avec les parois et le passage du conduit.',
  },
  {
    num: '02',
    title: 'Protection thermique',
    desc: 'Installez une plaque de protection au sol et un écran thermique mural. Nous fournissons les spécifications adaptées à chaque modèle.',
  },
  {
    num: '03',
    title: 'Conduit de cheminée',
    desc: 'Passage du conduit double paroi à travers le toit ou la paroi. Kit de traversée disponible dans nos accessoires.',
  },
  {
    num: '04',
    title: 'Mise en service',
    desc: 'Premier allumage progressif pour roder le poêle. Guide d\'utilisation complet fourni, assistance téléphonique gratuite.',
  },
]

const avantages = [
  { title: 'Compact & léger', desc: 'Nos poêles pèsent entre 15 et 35 kg. Conçus pour ne pas surcharger votre habitat mobile.' },
  { title: 'Sécurisé', desc: 'Double paroi, pieds antidérapants, poignées isolées. Pensé pour un usage en mouvement.' },
  { title: 'Efficace', desc: 'Rendement supérieur à 75%. Chauffe rapidement les petits volumes avec peu de bois.' },
  { title: 'Guide inclus', desc: 'Chaque poêle est livré avec un guide d\'installation détaillé et illustré, spécifique à votre type d\'habitat.' },
]

export default function PageInstallation() {
  const avantagesRef = useRef(null)
  const { ready } = useLocoReady()

  useEffect(() => {
    if (!ready || !avantagesRef.current) return undefined

    const cards = [...avantagesRef.current.querySelectorAll('[data-scrub-left]')]
    if (!cards.length) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      cards.forEach((card) => gsap.set(card, { x: 0, autoAlpha: 1 }))
      return undefined
    }

    const clamp = gsap.utils.clamp(0, 1)
    let frameId = null

    const updateCards = () => {
      frameId = null
      const start = window.innerHeight * 0.8
      const end = window.innerHeight * 0.46

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const progress = clamp((start - rect.top) / (start - end))
        gsap.set(card, { x: -48 + (48 * progress), autoAlpha: progress })
      })
    }

    const requestUpdate = () => {
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(updateCards)
    }

    const refreshTimer = window.setTimeout(requestUpdate, 500)
    requestUpdate()
    window.addEventListener('loco-scroll', requestUpdate)
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.clearTimeout(refreshTimer)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      window.removeEventListener('loco-scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [ready])

  return (
    <>
      <section className={styles.pageHero} data-scroll-section>
        <div className={styles.pageHeroBg}>
          <img
            src="/images/IMG_8515.jpg"
            alt="Installation d'un poêle NUKÖ dans un van"
            decoding="async"
            fetchPriority="high"
          />
          <div className={styles.pageHeroOverlay} />
        </div>
        <div className={styles.pageHeroInner}>
          <span className="section-label section-label--light">Guide d&apos;installation</span>
          <h1 className={styles.pageTitle}>
            Installer votre poêle<br /><em>en toute simplicité</em>
          </h1>
          <p className={styles.pageIntro}>
            Nos poêles sont conçus pour une installation accessible. Suivez notre guide étape par étape, adapté à chaque type d&apos;habitat mobile.
          </p>
        </div>
      </section>

      <section className={styles.services} data-scroll-section>
        <div className={styles.servicesInner}>
          <div data-reveal>
            <span className="section-label">Étapes</span>
            <h2 className="section-title">Installation<br /><em>pas à pas</em></h2>
          </div>
          <div className={styles.servicesList}>
            {guides.map((s) => (
              <div key={s.num} className={styles.serviceItem} data-reveal>
                <div className={styles.serviceNum}>{s.num}</div>
                <div className={styles.serviceContent}>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.aides} data-scroll-section ref={avantagesRef}>
        <div className={styles.aidesInner}>
          <div data-reveal>
            <span className="section-label">Pourquoi NUKÖ</span>
            <h2 className="section-title">Pensé pour<br /><em>l&apos;habitat mobile</em></h2>
            <p className={styles.aidesIntro}>
              Chaque détail est conçu pour s&apos;adapter aux contraintes des vans, tiny houses, yourtes et caravanes.
            </p>
          </div>
          <div className={styles.aidesGrid}>
            {avantages.map((a) => (
              <div key={a.title} className={styles.aideCard} data-scrub-left>
                <h3 className={styles.aideTitle}>{a.title}</h3>
                <p className={styles.aideDesc}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
