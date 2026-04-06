import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLocoReady } from '../context/LocomotiveContext'
import styles from './Parcours.module.css'

const steps = [
  {
    num: '01',
    title: 'Échangez avec nous',
    desc: 'Décrivez-nous votre habitat (van, tiny house, yourte...) et vos besoins. On vous conseille le poêle adapté à votre espace.',
  },
  {
    num: '02',
    title: 'Commandez en ligne',
    desc: 'Choisissez votre poêle dans notre catalogue et passez commande. Paiement sécurisé par carte bancaire via Stripe.',
  },
  {
    num: '03',
    title: 'Fabrication sur mesure',
    desc: 'Votre poêle est fabriqué à la main dans notre atelier de Lorient. Comptez 2 à 4 semaines selon le modèle.',
  },
  {
    num: '04',
    title: 'Livraison & installation',
    desc: 'Expédition soignée en France métropolitaine. Guide d\'installation fourni, et accompagnement téléphonique si besoin.',
  },
]

export default function Parcours() {
  const sectionRef = useRef(null)
  const { ready } = useLocoReady()

  useEffect(() => {
    if (!ready || !sectionRef.current) return undefined

    const stepCards = [...sectionRef.current.querySelectorAll('[data-scrub-left]')]
    if (!stepCards.length) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      stepCards.forEach((card) => gsap.set(card, { x: 0, autoAlpha: 1 }))
      return undefined
    }

    const clamp = gsap.utils.clamp(0, 1)
    let frameId = null

    const updateSteps = () => {
      frameId = null
      const start = window.innerHeight * 0.8
      const end = window.innerHeight * 0.46

      stepCards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const progress = clamp((start - rect.top) / (start - end))
        gsap.set(card, { x: -48 + (48 * progress), autoAlpha: progress })
      })
    }

    const requestUpdate = () => {
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(updateSteps)
    }

    const timer = window.setTimeout(requestUpdate, 500)
    requestUpdate()

    window.addEventListener('loco-scroll', requestUpdate)
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.clearTimeout(timer)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      window.removeEventListener('loco-scroll', requestUpdate)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [ready])

  return (
    <section className={styles.parcours} id="parcours" data-scroll-section ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.header} data-reveal>
          <span className="section-label">Comment ça marche</span>
          <h2 className="section-title">
            De la commande<br /><em>à la première flambée</em>
          </h2>
        </div>

        <div className={styles.steps}>
          {steps.map((s) => (
            <div key={s.num} className={styles.step} data-scrub-left>
              <div className={styles.stepNum}>{s.num}</div>
              <div className={styles.stepContent}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
