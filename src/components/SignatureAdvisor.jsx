// =============================================================
// SignatureAdvisor.jsx — le petit logo "21" + le mot "Advisor"
// en écriture manuscrite. Il revient 4 fois dans la maquette
// (accueil, biographie, événement, écran de chargement).
// =============================================================

import './SignatureAdvisor.css'
// 📘 En React (avec Vite), on importe une image comme un module.
// La variable "imageBadge21" contient alors le chemin final de l'image.
import imageBadge21 from '../assets/images/badge-21.png'

// className (optionnel) : permet de positionner la signature
// différemment selon l'endroit où on l'utilise.
function SignatureAdvisor({ className = '' }) {
  return (
    <div className={`signature-advisor ${className}`}>
      <img src={imageBadge21} alt="Logo 21" className="signature-advisor__badge" />
      <span className="texte-manuscrit signature-advisor__texte">Advisor</span>
    </div>
  )
}

export default SignatureAdvisor
