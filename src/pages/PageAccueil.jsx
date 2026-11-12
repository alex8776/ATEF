// =============================================================
// PageAccueil.jsx — la page d'accueil (adresse "/")
// Une page = un assemblage de sections. Chaque section est
// un composant indépendant, comme des pièces de Lego.
//
// Ici, les sections sont confiées à <DefilementSections> qui gère
// le passage d'une section à l'autre (molette, clavier, points à droite).
// =============================================================

import DefilementSections from '../components/DefilementSections'
import SectionAccueil from '../components/SectionAccueil'
import SectionBiographie from '../components/SectionBiographie'
import SectionEvenement from '../components/SectionEvenement'
import PiedDePage from '../components/PiedDePage'

// estPret : reçu de App.jsx, puis transmis au hero.
// 📘 Passer une prop d'un parent à un petit-enfant en passant par
// l'enfant s'appelle le "prop drilling". Ça marche très bien sur 2-3 niveaux.
function PageAccueil({ estPret }) {
  // La liste des "cartes", dans l'ordre d'affichage.
  //   - id     : identifiant unique
  //   - nom    : affiché au survol des points de navigation
  //   - element: le composant à afficher
  //   - estPied: true pour le footer (il ne prend pas tout l'écran)
  const panneaux = [
    { id: 'accueil', nom: 'Accueil', element: <SectionAccueil estPret={estPret} /> },
    { id: 'biographie', nom: 'Edith Assona', element: <SectionBiographie /> },
    { id: 'evenement', nom: 'Événement', element: <SectionEvenement /> },
    { id: 'contact', nom: 'Contact', element: <PiedDePage />, estPied: true },
  ]

  return (
    // <main> : balise HTML qui indique le contenu principal de la page
    <main>
      <DefilementSections panneaux={panneaux} />
    </main>
  )
}

export default PageAccueil
