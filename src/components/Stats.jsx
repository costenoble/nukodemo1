import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLocoReady } from '../context/LocomotiveContext'
import styles from './Stats.module.css'

const stats = [
  { number: '+200', label: 'Poêles livrés', value: 200, prefix: '+', suffix: '', grouped: true },
  { number: '100%', label: 'Fabriqué en Bretagne', value: 100, prefix: '', suffix: '%', grouped: false },
  { number: '2 ans', label: 'De garantie', value: 2, prefix: '', suffix: ' ans', grouped: false },
  { number: '4,9', label: 'Avis clients / 5', value: 0, prefix: '', suffix: '', grouped: false },
]

const digitReel = Array.from({ length: 20 }, (_, index) => index % 10)

function renderNumberVisual(value, statIndex) {
  let slotOrder = 0

  return value.split('').map((char, charIndex) => {
    if (/\d/.test(char)) {
      const currentOrder = slotOrder
      slotOrder += 1

      return (
        <span key={`${statIndex}-${charIndex}`} className={styles.digitSlot}>
          <span
            className={styles.digitTrack}
            data-digit-track
            data-target-digit={char}
            data-stat-index={statIndex}
            data-slot-order={currentOrder}
          >
            {digitReel.map((digit, digitIndex) => (
              <span key={digitIndex} className={styles.digit}>
                {digit}
              </span>
            ))}
          </span>
        </span>
      )
    }

    if (char === ' ') {
      return <span key={`${statIndex}-${charIndex}`} className={styles.spaceChar} aria-hidden="true" />
    }

    return (
      <span key={`${statIndex}-${charIndex}`} className={styles.staticChar} aria-hidden="true">
        {char}
      </span>
    )
  })
}

export default function Stats() {
  const sectionRef = useRef(null)
  const hasAnimatedRef = useRef(false)
  const { ready } = useLocoReady()

  useLayoutEffect(() => {
    if (!ready || !sectionRef.current || hasAnimatedRef.current) return undefined

    const section = sectionRef.current
    const items = [...section.querySelectorAll('[data-stat]')]
    const borders = [...section.querySelectorAll('[data-stat-border]')]
    const digitTracks = [...section.querySelectorAll('[data-digit-track]')]
    let frameId = null
    let timerId = null
    let timeline = null

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const animateStats = () => {
      const rect = section.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0
      if (!inView || hasAnimatedRef.current) return

      hasAnimatedRef.current = true
      window.removeEventListener('loco-scroll', requestAnimation)
      window.removeEventListener('scroll', requestAnimation)
      window.removeEventListener('resize', requestAnimation)

      if (prefersReducedMotion) {
        gsap.set(items, { autoAlpha: 1, y: 0 })
        gsap.set(borders, { scaleX: 1 })
        digitTracks.forEach((track) => {
          const targetDigit = Number(track.dataset.targetDigit ?? 0)
          const targetPercent = -(((10 + targetDigit) * 100) / digitReel.length)
          gsap.set(track, { yPercent: targetPercent })
        })
        return
      }

      timeline = gsap.timeline({ defaults: { overwrite: 'auto' } })

      timeline.to(items, {
        autoAlpha: 1, y: 0, duration: 1.2, ease: 'power2.out', stagger: 0.14,
      }, 0)

      timeline.to(borders, {
        scaleX: 1, duration: 1.05, ease: 'sine.out', stagger: 0.14,
      }, 0.1)

      digitTracks.forEach((track) => {
        const targetDigit = Number(track.dataset.targetDigit ?? 0)
        const statIndex = Number(track.dataset.statIndex ?? 0)
        const slotOrder = Number(track.dataset.slotOrder ?? 0)
        const targetPercent = -(((10 + targetDigit) * 100) / digitReel.length)

        timeline.to(track, {
          yPercent: targetPercent, duration: 1.9, ease: 'power2.out',
        }, 0.26 + (statIndex * 0.12) + (slotOrder * 0.04))
      })
    }

    const requestAnimation = () => {
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(() => { frameId = null; animateStats() })
    }

    gsap.set(items, { autoAlpha: 0, y: 12 })
    gsap.set(borders, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(digitTracks, { yPercent: 0 })

    requestAnimation()
    timerId = window.setTimeout(requestAnimation, 300)
    window.addEventListener('loco-scroll', requestAnimation)
    window.addEventListener('scroll', requestAnimation, { passive: true })
    window.addEventListener('resize', requestAnimation)

    return () => {
      window.clearTimeout(timerId)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      window.removeEventListener('loco-scroll', requestAnimation)
      window.removeEventListener('scroll', requestAnimation)
      window.removeEventListener('resize', requestAnimation)
      timeline?.kill()
      gsap.killTweensOf(items)
      gsap.killTweensOf(borders)
      gsap.killTweensOf(digitTracks)
    }
  }, [ready])

  return (
    <section className={styles.stats} data-scroll-section ref={sectionRef}>
      <div className={styles.inner}>
        {stats.map((s, i) => (
          <div key={i} className={styles.item} data-stat>
            <div className={styles.borderLine} data-stat-border />
            <span className={styles.number}>
              <span className={styles.srOnly}>{s.number}</span>
              <span className={styles.numberVisual} aria-hidden="true">
                {renderNumberVisual(s.number, i)}
              </span>
            </span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
