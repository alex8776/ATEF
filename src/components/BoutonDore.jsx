// =============================================================
// BoutonDore.jsx — le bouton doré arrondi de la maquette
// Il apparaît plusieurs fois sur le site. Au lieu de copier-coller
// le même code, on crée UN composant réutilisable.
// =============================================================

import { FaArrowRight } from 'react-icons/fa6'
import './BoutonDore.css'

// 📘 CONCEPT REACT : les "props"
// Un composant est une fonction. Les props sont ses paramètres.
// Ici on reçoit :
//   - texte    : ce qui est écrit sur le bouton
//   - lien     : où le bouton emmène quand on clique (ex: "#biographie")
//   - variante : "plein" (action principale, fond doré)
//                ou "contour" (action secondaire, juste une bordure dorée)
//   - fleche   : true → petite flèche → après le texte (visible sur tablette/téléphone)
//   - icone    : une icône react-icons à afficher AVANT le texte (ex: FaWhatsapp)
//   - externe  : true → ouvre le lien dans un nouvel onglet
//   - className: classe CSS en plus, si besoin
//
// Utilisation :  <BoutonDore texte="En savoir plus" lien="/a-propos" variante="contour" fleche />
function BoutonDore({
  texte,
  lien = '#',
  variante = 'plein',
  fleche = false,
  icone: Icone, // 📘 on renomme la prop avec une majuscule pour pouvoir l'utiliser comme composant
  externe = false,
  className = '',
}) {
  return (
    <a
      href={lien}
      className={`bouton-dore bouton-dore--${variante} ${className}`}
      // 📘 "..." (spread) : ajoute ces attributs seulement si externe vaut true
      {...(externe && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {Icone && <Icone className="bouton-dore__icone" aria-hidden="true" />}
      <span>{texte}</span>
      {fleche && <FaArrowRight className="bouton-dore__fleche" aria-hidden="true" />}
    </a>
  )
}

// "export default" rend le composant utilisable dans les autres fichiers
export default BoutonDore
