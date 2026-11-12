// =============================================================
// App.jsx — LE COMPOSANT PRINCIPAL
// Il contient ce qui est commun à toutes les pages
// (barre de navigation, pied de page, écran de chargement)
// et décide quelle page afficher selon l'adresse (le "routing").
// =============================================================

import { useCallback, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import EcranChargement from './components/EcranChargement'
import BarreNavigation from './components/BarreNavigation'
import PiedDePage from './components/PiedDePage'
import RemonterEnHaut from './components/RemonterEnHaut'

import PageAccueil from './pages/PageAccueil'
import PageEnConstruction from './pages/PageEnConstruction'

function App() {
  // false au démarrage → l'écran de chargement est affiché
  const [chargementTermine, setChargementTermine] = useState(false)
  // passe à true dès que le logo commence à s'effacer → le site s'anime
  const [siteVisible, setSiteVisible] = useState(false)

  // 📘 useCallback : "mémorise" une fonction pour qu'elle reste LA MÊME
  // d'un affichage à l'autre. Sans ça, à chaque fois qu'App se ré-affiche,
  // une nouvelle fonction serait créée → EcranChargement croirait qu'elle a
  // changé (elle est dans ses dépendances) et relancerait ses minuteurs.
  const afficherSite = useCallback(() => setSiteVisible(true), [])
  const terminerChargement = useCallback(() => setChargementTermine(true), [])

  // Sur l'accueil, le footer fait partie des "cartes" de la page (voir PageAccueil.jsx).
  // On ne l'affiche donc ici que pour les autres pages.
  const { pathname } = useLocation()
  const estAccueil = pathname === '/'

  return (
    // 📘 <> ... </> s'appelle un "Fragment" : un conteneur invisible.
    // Un composant doit toujours retourner UN SEUL élément parent.
    <>
      {/* 📘 Affichage conditionnel avec "&&" :
          si chargementTermine est false → on affiche l'écran de chargement
          si chargementTermine est true  → on n'affiche rien */}
      {!chargementTermine && (
        <EcranChargement
          quandFonduCommence={afficherSite}
          quandTermine={terminerChargement}
        />
      )}

      <RemonterEnHaut />
      {/* estVisible : la barre descend du haut quand le chargement est fini */}
      <BarreNavigation estVisible={siteVisible} />

      {/* 📘 CONCEPT REACT ROUTER : les routes
          Chaque <Route> associe une adresse (path) à une page (element).
          Ajouter une page = ajouter une ligne ici + un lien dans data/contenu.js */}
      <Routes>
        {/* On transmet l'info à la page d'accueil : son hero attend la fin
            du chargement pour lancer ses animations */}
        <Route path="/" element={<PageAccueil estPret={siteVisible} />} />
        <Route path="/a-propos" element={<PageEnConstruction titre="À propos" />} />
        <Route path="/actualites" element={<PageEnConstruction titre="Actualités" />} />
        <Route path="/programme" element={<PageEnConstruction titre="Programme" />} />
        <Route path="/mentions-legales" element={<PageEnConstruction titre="Mentions légales" />} />
        <Route path="/confidentialite" element={<PageEnConstruction titre="Confidentialité" />} />
        {/* "*" = n'importe quelle autre adresse → page 404 */}
        <Route path="*" element={<PageEnConstruction titre="Page introuvable" />} />
      </Routes>

      {!estAccueil && <PiedDePage />}
    </>
  )
}

export default App
