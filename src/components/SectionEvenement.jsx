// =============================================================
// SectionEvenement.jsx — "A21 BUSINESS SHOW A KINSHASA"
//
// - Ordinateur : photo du public en fond + grande carte blanche
// - Tablette   : en-tête "Nos événements" + flèches, carte horizontale
// - Téléphone  : en-tête, carte verticale (photo en haut), pagination
//
// Les flèches et les points sont prêts pour un futur carrousel :
// ils seront actifs quand il y aura plusieurs événements.
// =============================================================

import { FaLocationDot, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import './SectionEvenement.css'
import BoutonDore from './BoutonDore'
import Apparition from './Apparition'
import { contenuEvenement } from '../data/contenu'

import imageFondPublic from '../assets/images/fond-public.webp'
import imageBusinessShow from '../assets/images/edith-business-show.webp'

function SectionEvenement() {
  const { surtitre, titreSection, lieu, titre, description, texteBouton } = contenuEvenement

  return (
    <section className="section-evenement" id="evenement">
      <img src={imageFondPublic} alt="" className="section-evenement__fond" />

      {/* En-tête de section (tablette et téléphone) */}
      <div className="section-evenement__entete">
        <div>
          <p className="surtitre">{surtitre}</p>
          <h2 className="texte-manuscrit section-evenement__titre-section">{titreSection}</h2>
        </div>

        {/* Flèches du futur carrousel (tablette) — désactivées pour l'instant */}
        <div className="section-evenement__fleches">
          <button disabled aria-label="Événement précédent">
            <FaChevronLeft />
          </button>
          <button disabled aria-label="Événement suivant">
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Toute la carte apparaît en fondu au défilement */}
      <Apparition>
        <article className="section-evenement__carte">
          <div className="section-evenement__media">
            <img
              src={imageBusinessShow}
              alt="Edith Assona sur scène au A21 Business Show"
              className="section-evenement__photo"
            />
            {/* Pastille du lieu, posée sur la photo (tablette et téléphone) */}
            <span className="pastille section-evenement__lieu">
              <FaLocationDot />
              {lieu}
            </span>
          </div>

          <div className="section-evenement__texte">
            {/* Petit libellé au-dessus du titre (ordinateur ; sur tablette/téléphone il est dans l'en-tête) */}
            <p className="section-evenement__surtitre">{surtitre}</p>
            <h3 className="section-evenement__titre">{titre}</h3>
            <p className="section-evenement__description">{description}</p>
            <BoutonDore texte={texteBouton} lien="/actualites" fleche />
          </div>
        </article>
      </Apparition>

      {/* Points de pagination du futur carrousel (tablette et téléphone) */}
      <div className="section-evenement__pagination" aria-hidden="true">
        <span className="est-actif"></span>
        <span></span>
        <span></span>
      </div>
    </section>
  )
}

export default SectionEvenement
