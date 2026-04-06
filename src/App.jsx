import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout           from './components/layout/Layout'
import Accueil          from './pages/Accueil'
import PageCatalogue    from './pages/PageCatalogue'
import PagePanier       from './pages/PagePanier'
import PageInstallation from './pages/PageInstallation'
import PageContact      from './pages/PageContact'
import PageConfirmation from './pages/PageConfirmation'
import MentionsLegales  from './pages/MentionsLegales'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'
import NotFound         from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout><Accueil /></Layout>
        } />
        <Route path="/catalogue" element={
          <Layout><PageCatalogue /></Layout>
        } />
        <Route path="/panier" element={
          <Layout><PagePanier /></Layout>
        } />
        <Route path="/installation" element={
          <Layout><PageInstallation /></Layout>
        } />
        <Route path="/contact" element={
          <Layout><PageContact /></Layout>
        } />
        <Route path="/confirmation" element={
          <Layout><PageConfirmation /></Layout>
        } />
        <Route path="/mentions-legales" element={
          <Layout><MentionsLegales /></Layout>
        } />
        <Route path="/politique-confidentialite" element={
          <Layout><PolitiqueConfidentialite /></Layout>
        } />
        <Route path="*" element={
          <Layout><NotFound /></Layout>
        } />
      </Routes>
    </BrowserRouter>
  )
}
