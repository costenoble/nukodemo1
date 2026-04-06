import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Navbar.module.css'

const links = [
  { label: 'Accueil',      href: '/' },
  { label: 'Catalogue',    href: '/catalogue' },
  { label: 'Installation', href: '/installation' },
  { label: 'Contact',      href: '/contact' },
]

export default function Navbar({ scrollTo }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { totalItems } = useCart()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLink = (e, href) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault()
      if (scrollTo) scrollTo(href.replace('/', ''))
    }
    setMenuOpen(false)
  }

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href.split('#')[0])
  }

  return (
    <>
      <nav className={styles.nav} id="nav">
        <Link to="/" className={styles.logo}>NUKÖ</Link>

        <ul className={styles.links}>
          {links.map(l => (
            <li key={l.href}>
              <Link
                to={l.href}
                className={isActive(l.href) ? styles.active : ''}
                onClick={e => handleLink(e, l.href)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link to="/panier" className={styles.cartLink} aria-label="Panier">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </Link>
          <Link to="/catalogue" className={styles.cta}>Nos poêles</Link>
        </div>

        {/* Burger / Close toggle */}
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Overlay — click to close */}
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
      >
        <ul>
          {links.map(l => (
            <li key={l.href}>
              <Link
                to={l.href}
                className={isActive(l.href) ? styles.drawerActive : ''}
                onClick={e => handleLink(e, l.href)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/panier" onClick={() => setMenuOpen(false)}>
              Panier {totalItems > 0 && `(${totalItems})`}
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
