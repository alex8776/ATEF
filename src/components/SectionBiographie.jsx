// =============================================================
// SectionBiographie.jsx — "Edith Assona"
//
// - Ordinateur : photo à gauche, nom + texte + bouton à droite
// - Tablette   : surtitre, puis photo (avec pastille) + texte et citation
// - Téléphone  : surtitre, carte photo avec le nom écrit dessus,
//                1er paragraphe, citation, bouton pleine largeur
// =============================================================

import './SectionBiographie.css'
import BoutonDore from './BoutonDore'
import Apparition from './Apparition'
import { contenuBiographie } from '../data/contenu'

import imageConference from '../assets/images/edith-conference.webp'
import imageBadge21 from '../assets/images/badge-21.png'

function SectionBiographie() {
  const { surtitre, etiquettePhoto, nom, paragraphes, citation, texteBouton } = contenuBiographie

  return (
    // id="biographie" : c'est la cible du bouton "Qui est Edith Assona ?"
    <section className="section-biographie" id="biographie">
      {/* Surtitre "— À PROPOS" (tablette et téléphone) */}
      <p className="surtitre section-biographie__surtitre">{surtitre}</p>

      <Apparition className="section-biographie__colonne-photo">
        {/* La "carte photo" : la photo + des éléments posés par-dessus */}
        <div className="section-biographie__carte">
          <img
            src={imageConference}
            alt="Edith Assona en conférence"
            className="section-biographie__photo"
          />

          {/* Pastille "Academy Twenty One" (tablette et téléphone) */}
          <span className="pastille section-biographie__pastille">
            <img src={imageBadge21} alt="" />
            {etiquettePhoto}
          </span>

          {/* Nom écrit sur la photo (téléphone). aria-hidden : le vrai titre est le <h2> */}
          <p className="texte-manuscrit section-biographie__nom-photo" aria-hidden="true">
            {nom}
          </p>
        </div>
      </Apparition>

      {/* delai={150} : le texte apparaît un peu après la photo */}
      <Apparition delai={150} className="section-biographie__colonne-texte">
        <h2 className="texte-manuscrit section-biographie__nom">{nom}</h2>

        {/* On affiche chaque paragraphe du tableau.
            index = sa position (0, 1, 2…), utilisé comme "key" car
            la liste ne change jamais d'ordre. */}
        {paragraphes.map((paragraphe, index) => (
          <p key={index} className="section-biographie__paragraphe">
            {paragraphe}
          </p>
        ))}

        {/* <blockquote> : la balise HTML prévue pour les citations */}
        <blockquote className="section-biographie__citation">{citation}</blockquote>

        {/* Action secondaire → variante "contour" */}
        <BoutonDore texte={texteBouton} lien="/a-propos" variante="contour" fleche />
      </Apparition>
    </section>
  )
}

export default SectionBiographie
