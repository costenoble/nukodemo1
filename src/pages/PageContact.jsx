import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './PageContact.module.css'

const infos = [
  {
    icon: '\u25CE',
    title: 'Atelier',
    lines: ['Lorient, Bretagne'],
    sub: 'Visite sur rendez-vous',
  },
  {
    icon: '\u25CE',
    title: 'Email',
    lines: ['contact@nukostoves.fr'],
    sub: 'Réponse sous 24h ouvrées',
    href: 'mailto:contact@nukostoves.fr',
  },
  {
    icon: '\u25CE',
    title: 'Expédition',
    lines: ['France métropolitaine'],
    sub: 'Délai : 2 à 4 semaines',
  },
  {
    icon: '\u25CE',
    title: 'Réseaux',
    lines: ['@nukostoves'],
    sub: 'Instagram & Facebook',
  },
]

export default function PageContact() {
  const [submitted, setSubmitted] = useState(false)
  const resetTimerRef = useRef(null)

  useEffect(() => {
    return () => { clearTimeout(resetTimerRef.current) }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    clearTimeout(resetTimerRef.current)
    setSubmitted(true)
    const form = e.currentTarget
    resetTimerRef.current = setTimeout(() => {
      setSubmitted(false)
      form.reset()
    }, 5000)
  }

  return (
    <>
      <section className={styles.hero} data-scroll-section>
        <div className={styles.heroBg}>
          <img
            src="/images/IMG_8511.jpg"
            alt="Contact NUKÖ"
            decoding="async"
            fetchPriority="high"
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroInner}>
          <span className="section-label section-label--light">Contact</span>
          <h1 className={styles.heroTitle}>
            Parlons de<br /><em>votre projet</em>
          </h1>
          <p className={styles.heroSub}>
            Une question sur nos poêles, l&apos;installation ou la livraison ?<br />
            On vous répond sous 24h.
          </p>
        </div>
      </section>

      <section className={styles.infos} data-scroll-section>
        <div className={styles.infosGrid}>
          {infos.map((info, i) => (
            <div
              key={info.title}
              className={styles.infoCard}
              data-reveal
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className={styles.infoIcon}>{info.icon}</span>
              <div>
                <h3>{info.title}</h3>
                {info.lines.map(l => (
                  info.href
                    ? <a key={l} href={info.href} className={styles.infoLink}>{l}</a>
                    : <p key={l}>{l}</p>
                ))}
                <span className={styles.infoSub}>{info.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.formSection} data-scroll-section>
        <div className={styles.formInner}>

          <aside className={styles.sidebar} data-reveal>
            <h2 className={styles.sidebarTitle}>
              Posez-nous<br /><em>vos questions</em>
            </h2>
            <p className={styles.sidebarText}>
              Quel poêle pour mon van ? Comment installer le conduit dans une tiny house ?
              Notre équipe vous conseille gratuitement.
            </p>

            <div className={styles.sidebarNote}>
              <strong>Conseil personnalisé</strong>
              <p>Envoyez-nous les dimensions et photos de votre habitat, on vous recommande le modèle adapté.</p>
            </div>
          </aside>

          <form className={styles.form} onSubmit={handleSubmit} data-reveal>
            <div className={styles.formRow}>
              <div className={styles.group}>
                <label htmlFor="prenom">Prénom</label>
                <input type="text" id="prenom" name="prenom" placeholder="Jean" required />
              </div>
              <div className={styles.group}>
                <label htmlFor="nom">Nom</label>
                <input type="text" id="nom" name="nom" placeholder="Dupont" required />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.group}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="jean@email.com" required />
              </div>
              <div className={styles.group}>
                <label htmlFor="tel">Téléphone</label>
                <input type="tel" id="tel" name="tel" placeholder="06 00 00 00 00" />
              </div>
            </div>

            <div className={styles.group}>
              <label htmlFor="habitat">Type d&apos;habitat</label>
              <select id="habitat" name="habitat" required>
                <option value="">Sélectionner</option>
                <option>Van / Fourgon</option>
                <option>Tiny House</option>
                <option>Yourte</option>
                <option>Caravane</option>
                <option>Cabane / Chalet</option>
                <option>Autre</option>
              </select>
            </div>

            <div className={styles.group}>
              <label htmlFor="message">Votre message <span>(optionnel)</span></label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Dimensions de votre espace, type de véhicule, questions sur l'installation..."
              />
            </div>

            <div className={styles.rgpd}>
              <input type="checkbox" id="rgpd" name="rgpd" required />
              <label htmlFor="rgpd">
                J&apos;accepte que mes données soient utilisées pour traiter ma demande, conformément à la{' '}
                <Link to="/politique-confidentialite">politique de confidentialité</Link>.
              </label>
            </div>

            <button
              type="submit"
              className={`${styles.submit} ${submitted ? styles.success : ''}`}
              disabled={submitted}
            >
              {submitted ? 'Message envoyé — on vous répond sous 24h' : 'Envoyer mon message'}
            </button>
          </form>

        </div>
      </section>
    </>
  )
}
