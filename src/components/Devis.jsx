import { useEffect, useRef, useState } from 'react'
import styles from './Devis.module.css'

export default function Devis() {
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
    }, 4000)
  }

  return (
    <section className={styles.devis} id="devis" data-scroll-section>
      <div className={styles.inner}>

        <div className={styles.text} data-reveal>
          <h2 className={styles.title}>
            Votre projet<br /><em>commence ici</em>
          </h2>

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <strong>Email</strong>
              <a href="mailto:contact@nukostoves.fr">contact@nukostoves.fr</a>
            </div>
            <div className={styles.contactItem}>
              <strong>Localisation</strong>
              <span>Lorient, Bretagne</span>
            </div>
            <div className={styles.contactItem}>
              <strong>Expédition</strong>
              <span>France métropolitaine</span>
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} data-reveal>
          <div className={styles.group}>
            <label htmlFor="nom">Nom complet</label>
            <input type="text" id="nom" name="nom" placeholder="Jean Dupont" required />
          </div>
          <div className={styles.group}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="jean@email.com" required />
          </div>
          <div className={styles.group}>
            <label htmlFor="tel">Téléphone</label>
            <input type="tel" id="tel" name="tel" placeholder="06 00 00 00 00" />
          </div>
          <div className={styles.group}>
            <label htmlFor="habitat">Type d&apos;habitat</label>
            <select id="habitat" name="habitat">
              <option value="">Sélectionner</option>
              <option>Van / Fourgon</option>
              <option>Tiny House</option>
              <option>Yourte</option>
              <option>Caravane</option>
              <option>Cabane / Chalet</option>
              <option>Autre</option>
            </select>
          </div>
          <div className={`${styles.group} ${styles.groupFull}`}>
            <label htmlFor="message">Décrivez votre projet (optionnel)</label>
            <textarea id="message" name="message" rows={4} placeholder="Surface, type de véhicule/habitat, besoins spécifiques..." />
          </div>
          <button
            type="submit"
            className={`${styles.submit} ${submitted ? styles.success : ''}`}
            disabled={submitted}
          >
            {submitted ? 'Demande envoyée' : 'Demander un devis gratuit'}
          </button>
        </form>

      </div>
    </section>
  )
}
