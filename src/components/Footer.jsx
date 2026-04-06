import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} data-scroll-section>
      <div className={styles.inner}>

        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>NUKÖ</Link>
          <p>Poêles à bois compacts,<br />fabriqués en Bretagne.</p>
        </div>

        <div className={styles.nav}>
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/catalogue">Catalogue</Link></li>
            <li><Link to="/installation">Installation</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className={styles.nav}>
          <h4>Nos poêles</h4>
          <ul>
            <li><Link to="/catalogue#van">Poêle Van</Link></li>
            <li><Link to="/catalogue#tiny">Poêle Tiny House</Link></li>
            <li><Link to="/catalogue#yourte">Poêle Yourte</Link></li>
            <li><Link to="/catalogue#accessoires">Accessoires</Link></li>
          </ul>
        </div>

        <div className={styles.contact}>
          <h4>Contact</h4>
          <p>Lorient, Bretagne<br />France</p>
          <p><a href="mailto:contact@nukostoves.fr">contact@nukostoves.fr</a></p>
          <div className={styles.social}>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
          </div>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>&copy; 2026 NUKÖ — Tous droits réservés</p>
        <p>
          <Link to="/mentions-legales">Mentions légales</Link> — <Link to="/politique-confidentialite">Politique de confidentialité</Link>
        </p>
      </div>
    </footer>
  )
}
