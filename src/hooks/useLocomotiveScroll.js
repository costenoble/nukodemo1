import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LocomotiveScroll from 'locomotive-scroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useLocomotiveScroll() {
  const scrollRef = useRef(null)
  const locomotiveRef = useRef(null)
  const observerRef = useRef(null)
  const loadHandlerRef = useRef(null)
  const [locoReady, setLocoReady] = useState(false)
  const location = useLocation()
  const shouldResetToTop = location.pathname === '/' && !location.hash

  useEffect(() => {
    const { history } = window
    if (!history || typeof history.scrollRestoration !== 'string') return undefined

    const previousScrollRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'

    return () => {
      history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  const selectHashTarget = useCallback((hash) => {
    if (!hash || !scrollRef.current) return null

    try {
      return scrollRef.current.querySelector(hash) ?? document.querySelector(hash)
    } catch {
      return null
    }
  }, [])

  const scrollToHash = useCallback((hash, options = {}) => {
    const target = selectHashTarget(hash)
    if (!target || !locomotiveRef.current) return false

    locomotiveRef.current.scrollTo(target, { offset: -80, duration: 900, ...options })
    return true
  }, [selectHashTarget])

  useEffect(() => {
    if (!scrollRef.current) return
    const scrollContainer = scrollRef.current

    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    if (loadHandlerRef.current) {
      window.removeEventListener('load', loadHandlerRef.current)
      loadHandlerRef.current = null
    }

    if (locomotiveRef.current) {
      locomotiveRef.current.destroy()
      locomotiveRef.current = null
    }

    setLocoReady(false)
    ScrollTrigger.getAll().forEach(t => t.kill())
    ScrollTrigger.clearScrollMemory()

    scrollContainer.style.transform = ''
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    let cleanupImages = () => {}
    const initFrame = window.requestAnimationFrame(() => {
      const loco = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        smoothMobile: false,
        multiplier: 0.95,
        lerp: 0.18,
        initPosition: { x: 0, y: 0 },
        smartphone: { smooth: false },
        tablet: { smooth: false },
      })
      locomotiveRef.current = loco

      ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
          if (arguments.length && loco.scroll) {
            loco.scrollTo(value, { duration: 0, disableLerp: true })
          }
          return loco.scroll?.instance?.scroll?.y ?? 0
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
        },
        pinType: scrollContainer.style.transform ? 'transform' : 'fixed',
      })

      loco.on('scroll', () => {
        ScrollTrigger.update()
        window.dispatchEvent(new Event('loco-scroll'))
      })
      ScrollTrigger.addEventListener('refresh', () => loco.update())
      ScrollTrigger.refresh()
      setLocoReady(true)

      const nav = document.getElementById('nav')
      let isNavScrolled = null

      // Pages without a dark hero: force dark navbar immediately
      const pagesWithoutHero = ['/panier', '/confirmation', '/mentions-legales', '/politique-confidentialite']
      const forceDark = pagesWithoutHero.includes(window.location.pathname)
      if (forceDark && nav) {
        nav.classList.add('scrolled')
        isNavScrolled = true
      }

      loco.on('scroll', ({ scroll }) => {
        const nextScrolled = forceDark || scroll.y > 80
        if (nav && nextScrolled !== isNavScrolled) {
          nav.classList.toggle('scrolled', nextScrolled)
          isNavScrolled = nextScrolled
        }
      })

      const revealEls = scrollContainer.querySelectorAll('[data-reveal]')
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible')
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
      )
      revealEls.forEach(el => observer.observe(el))
      observerRef.current = observer

      const pendingImages = [...scrollContainer.querySelectorAll('img')].filter(img => !img.complete)
      let mediaUpdatePending = false
      const handleMediaLoad = () => {
        if (mediaUpdatePending) return
        mediaUpdatePending = true
        window.requestAnimationFrame(() => {
          mediaUpdatePending = false
          loco.update()
          ScrollTrigger.refresh()
        })
      }

      pendingImages.forEach((img) => {
        img.addEventListener('load', handleMediaLoad)
        img.addEventListener('error', handleMediaLoad)
      })

      cleanupImages = () => {
        pendingImages.forEach((img) => {
          img.removeEventListener('load', handleMediaLoad)
          img.removeEventListener('error', handleMediaLoad)
        })
      }

      const syncScrollPosition = () => {
        loco.update()
        ScrollTrigger.refresh()
        if (window.location.hash && scrollToHash(window.location.hash, { duration: 0, disableLerp: true })) {
          return
        }
        if (shouldResetToTop) {
          loco.scrollTo(0, { duration: 0, disableLerp: true })
        }
      }

      syncScrollPosition()
      loadHandlerRef.current = syncScrollPosition
      window.addEventListener('load', syncScrollPosition)
    })

    return () => {
      window.cancelAnimationFrame(initFrame)
      cleanupImages()
      ScrollTrigger.getAll().forEach(t => t.kill())
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      if (loadHandlerRef.current) {
        window.removeEventListener('load', loadHandlerRef.current)
        loadHandlerRef.current = null
      }
      if (locomotiveRef.current) {
        locomotiveRef.current.destroy()
        locomotiveRef.current = null
      }
      scrollContainer.style.transform = ''
    }
  }, [location.pathname, scrollToHash, shouldResetToTop])

  useEffect(() => {
    if (!location.hash || !locomotiveRef.current) return

    const hashTimer = window.setTimeout(() => {
      scrollToHash(location.hash)
    }, 0)

    return () => window.clearTimeout(hashTimer)
  }, [location.hash, scrollToHash])

  useEffect(() => {
    if (!shouldResetToTop || !locomotiveRef.current) return

    const resetTimer = window.setTimeout(() => {
      locomotiveRef.current?.update()
      locomotiveRef.current?.scrollTo(0, { duration: 0, disableLerp: true })
    }, 0)

    return () => window.clearTimeout(resetTimer)
  }, [location.pathname, location.hash, shouldResetToTop])

  const scrollTo = useCallback((target, options = {}) => {
    if (!locomotiveRef.current) return

    const defaults = { offset: -80, duration: 1000 }

    if (typeof target === 'string' && target.startsWith('#')) {
      const hashTarget = selectHashTarget(target)
      if (!hashTarget) return
      locomotiveRef.current.scrollTo(hashTarget, { ...defaults, ...options })
      return
    }

    locomotiveRef.current.scrollTo(target, { ...defaults, ...options })
  }, [selectHashTarget])

  return { scrollRef, scrollTo, locoReady }
}
