import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import styles from './PageCatalogue.module.css'

const categories = [
  { id: 'van', label: 'Vans & Fourgons' },
  { id: 'tiny', label: 'Tiny Houses' },
  { id: 'yourte', label: 'Yourtes & Caravanes' },
  { id: 'accessoire', label: 'Accessoires' },
]

export default function PageCatalogue() {
  const { addItem } = useCart()
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash])

  return (
    <>
      <section className={styles.pageHero} data-scroll-section>
        <div className={styles.pageHeroBg}>
          <img src="/images/IMG_8513.jpg" alt="Catalogue NUKÖ" decoding="async" fetchPriority="high" />
          <div className={styles.pageHeroOverlay} />
        </div>
        <div className={styles.pageHeroInner}>
          <span className="section-label section-label--light">Catalogue</span>
          <h1 className={styles.pageTitle}>
            Nos poêles<br /><em>& accessoires</em>
          </h1>
          <p className={styles.pageIntro}>
            Chaque poêle est fabriqué à la main dans notre atelier de Lorient. Choisissez le modèle adapté à votre habitat mobile.
          </p>
        </div>
      </section>

      {categories.map((cat) => {
        const catProducts = products.filter(p => p.category === cat.id)
        if (!catProducts.length) return null

        return (
          <section key={cat.id} id={cat.id} className={styles.category} data-scroll-section>
            <div className={styles.catHeader} data-reveal>
              <h2 className={styles.catTitle}>{cat.label}</h2>
            </div>

            <div className={styles.grid}>
              {catProducts.map((product, i) => (
                <article
                  key={product.id}
                  className={styles.card}
                  data-reveal
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className={styles.cardImg}>
                    <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardTop}>
                      <h3 className={styles.cardName}>{product.name}</h3>
                      <span className={styles.cardSub}>{product.subtitle}</span>
                    </div>
                    <p className={styles.cardDesc}>{product.description}</p>
                    <ul className={styles.cardDetails}>
                      {product.details.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardPrice}>{product.priceLabel}</span>
                      <button
                        type="button"
                        className={styles.addBtn}
                        onClick={() => addItem(product)}
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
