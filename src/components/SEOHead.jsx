import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SEO_DATA = {
  '/': {
    title: 'NUKO — Poêles à bois design',
    description: 'Poêles à bois haut de gamme, design scandinave et performance énergétique. Showroom à Paris, installation sur mesure dans toute la France.',
  },
  '/collection': {
    title: 'Collection de poêles — NUKO',
    description: 'Découvrez notre collection de poêles à bois : modèles suspendus, encastrables, contemporains et classiques. Design et performance.',
  },
  '/installation': {
    title: 'Installation & services — NUKO',
    description: 'Installation professionnelle, entretien et ramonage. Nos experts certifiés vous accompagnent de la conception à la mise en service.',
  },
  '/contact': {
    title: 'Contact & showroom — NUKO',
    description: 'Visitez notre showroom à Paris ou demandez un devis personnalisé. Nos conseillers vous guident dans le choix de votre poêle à bois.',
  },
  '/mentions-legales': {
    title: 'Mentions légales — NUKO',
    description: 'Informations légales de NUKO, spécialiste en poêles à bois design.',
  },
  '/politique-confidentialite': {
    title: 'Politique de confidentialité — NUKO',
    description: 'Politique de confidentialité et traitement des données personnelles de NUKO.',
  },
}

const BASE_URL = 'https://nukostoves.fr'

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'NUKO Stoves',
  description: 'Poêles à bois design et performants. Showroom à Paris, installation sur mesure.',
  url: BASE_URL,
  telephone: '+33145000000',
  email: 'contact@nukostoves.fr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '28 rue du Faubourg Saint-Antoine',
    addressLocality: 'Paris',
    postalCode: '75012',
    addressCountry: 'FR',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '18:00' },
  ],
}

export default function SEOHead() {
  const { pathname } = useLocation()
  const seo = SEO_DATA[pathname] ?? SEO_DATA['/']

  useEffect(() => {
    document.title = seo.title

    const setMeta = (name, content, prop = false) => {
      const selector = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        prop ? el.setAttribute('property', name) : el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', seo.description)
    setMeta('robots', 'index, follow')
    setMeta('og:type', 'website', true)
    setMeta('og:title', seo.title, true)
    setMeta('og:description', seo.description, true)
    setMeta('og:url', `${BASE_URL}${pathname}`, true)
    setMeta('og:locale', 'fr_FR', true)
    setMeta('og:site_name', 'NUKO Stoves', true)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${BASE_URL}${pathname}`)

    let jsonLd = document.querySelector('script[data-jsonld]')
    if (pathname === '/') {
      if (!jsonLd) {
        jsonLd = document.createElement('script')
        jsonLd.setAttribute('type', 'application/ld+json')
        jsonLd.setAttribute('data-jsonld', 'true')
        document.head.appendChild(jsonLd)
      }
      jsonLd.textContent = JSON.stringify(JSON_LD)
    } else if (jsonLd) {
      jsonLd.remove()
    }
  }, [pathname, seo])

  return null
}
