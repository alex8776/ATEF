// =============================================================
// PageEnConstruction.jsx — page temporaire pour About, News, Programme
// en attendant leur maquette. Un seul composant pour 3 pages :
// on lui passe juste le titre à afficher en prop.
// =============================================================

import { Link } from 'react-router-dom'
import './PageEnConstruction.css'

function PageEnConstruction({ titre }) {
  return (
    <main className="page-en-construction">
      <h1 className="texte-manuscrit page-en-construction__titre">{titre}</h1>
      <p>Cette page arrive bientôt.</p>
      {/* Link (React Router) change de page SANS recharger le site.
          Pour les liens internes, on utilise Link plutôt que <a>. */}
      <Link to="/" className="page-en-construction__retour">
        ← Retour à l'accueil
      </Link>
    </main>
  )
}

export default PageEnConstruction
