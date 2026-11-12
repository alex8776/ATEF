// =============================================================
// SectionAccueil.jsx — le grand bandeau en haut ("hero")
// Fond : la pièce blanche. À droite : le portrait d'Edith.
// À gauche : le titre "Grâce et gratitude.", le texte et le bouton.
//
// Chaque élément a sa propre animation d'entrée (voir le CSS).
// Elles démarrent quand "estPret" passe à true, c'est-à-dire
// quand l'écran de chargement a disparu.
// =============================================================

import { Fragment } from 'react'
import './SectionAccueil.css'
import { FaLocationDot, FaChevronRight } from 'react-icons/fa6'
import BoutonDore from './BoutonDore'
import SignatureAdvisor from './SignatureAdvisor'
import { contenuAccueil } from '../data/contenu'

import imageFondPiece from '../assets/images/fond-piece.webp'
import imagePortrait from '../assets/images/edith-portrait.webp'
import imageBadge21 from '../assets/images/badge-21.png'

// Découpe un texte en mots, puis chaque mot en lettres.
// Chaque lettre reçoit son numéro (--i) : le CSS s'en sert pour
// la faire apparaître un peu après la précédente (effet "cascade").
function TitreLettreParLettre({ texte }) {
  const mots = texte.split(' ')
  let numeroLettre = 0 // compteur de lettres sur tout le titre

  return mots.map((mot, indexMot) => (
    // 📘 Fragment : regroupe des éléments sans ajouter de balise dans la page
    <Fragment key={indexMot}>
      {/* Chaque mot reste groupé : il ne sera jamais coupé en fin de ligne */}
      <span className="titre-mot">
        {mot.split('').map((lettre) => {
          const numero = numeroLettre++
          return (
            // 📘 style={{ '--i': numero }} crée une variable CSS sur l'élément
            <span key={numero} className="titre-lettre" style={{ '--i': numero }}>
              {lettre}
            </span>
          )
        })}
      </span>
      {/* L'espace entre les mots est placé EN DEHORS du mot, sinon le navigateur
          le supprime (il ignore les espaces en fin de bloc inline-block) */}
      {indexMot < mots.length - 1 && ' '}
    </Fragment>
  ))
}

// Props :
//   - estPret : true quand l'écran de chargement est terminé → les animations démarrent
function SectionAccueil({ estPret = true }) {
  // 📘 "Déstructuration" : on sort les valeurs de l'objet en une ligne.
  const {
    surtitre, titre, description, texteBouton, texteBoutonSecondaire, carteAdvisor, carteEvenement,
  } = contenuAccueil

  return (
    <section className={`section-accueil ${estPret ? 'est-pret' : ''}`} id="accueil">
      {/* Image de fond (pièce vide). alt="" car elle est décorative. */}
      <img src={imageFondPiece} alt="" className="section-accueil__fond" />

      <div className="section-accueil__contenu">
        <div className="section-accueil__texte">
          {/* Surtitre "— EDITH ASSONA · A.T.E.F" (tablette et téléphone) */}
          <p className="surtitre section-accueil__surtitre">{surtitre}</p>

          {/* aria-label : les lecteurs d'écran lisent le titre en entier,
              pas lettre par lettre (les lettres sont cachées avec aria-hidden) */}
          <h1 className="texte-manuscrit section-accueil__titre" aria-label={titre}>
            <span aria-hidden="true">
              <TitreLettreParLettre texte={titre} />
            </span>
          </h1>

          {/* Petit trait doré décoratif qui s'étire sous le titre */}
          <span className="section-accueil__trait" aria-hidden="true"></span>

          <p className="section-accueil__description">{description}</p>

          {/* Boutons : le principal mène à la biographie (id="biographie"),
              le secondaire (tablette uniquement) à la section événement */}
          <div className="section-accueil__boutons">
            <BoutonDore texte={texteBouton} lien="#biographie" fleche />
            <BoutonDore
              texte={texteBoutonSecondaire}
              lien="#evenement"
              variante="contour"
              className="section-accueil__bouton-secondaire"
            />
          </div>
        </div>

        <img
          src={imagePortrait}
          alt="Portrait d'Edith Assona"
          className="section-accueil__portrait"
        />

        <SignatureAdvisor className="section-accueil__signature" />

        {/* Cartes flottantes autour du portrait (tablette uniquement) */}
        <div className="carte-flottante carte-flottante--advisor" aria-hidden="true">
          <img src={imageBadge21} alt="" className="carte-flottante__badge" />
          <span className="carte-flottante__textes">
            <span className="texte-manuscrit carte-flottante__manuscrit">{carteAdvisor.titre}</span>
            <span className="carte-flottante__petit">{carteAdvisor.sousTitre}</span>
          </span>
        </div>

        <a href="#evenement" className="carte-flottante carte-flottante--evenement">
          <span className="carte-flottante__pastille">
            <FaLocationDot />
          </span>
          <span className="carte-flottante__textes">
            <span className="carte-flottante__petit">{carteEvenement.sousTitre}</span>
            <span className="carte-flottante__fort">{carteEvenement.titre}</span>
          </span>
          <FaChevronRight className="carte-flottante__chevron" />
        </a>
      </div>
    </section>
  )
}

export default SectionAccueil
