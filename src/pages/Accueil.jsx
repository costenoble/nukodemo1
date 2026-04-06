import Hero        from '../components/Hero'
import Stats       from '../components/Stats'
import Showroom    from '../components/Showroom'
import Collection  from '../components/Collection'
import Parcours    from '../components/Parcours'
import Ambiance    from '../components/Ambiance'
import Engagements from '../components/Engagements'
import Horaires    from '../components/Horaires'
import Temoignages from '../components/Temoignages'
import Devis       from '../components/Devis'

export default function Accueil() {
  return (
    <>
      <Hero />
      <Stats />
      <Showroom />
      <Collection />
      <Parcours />
      <Ambiance />
      <Engagements />
      <Horaires />
      <Temoignages />
      <Devis />
    </>
  )
}
