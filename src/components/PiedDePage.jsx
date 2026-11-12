// =============================================================
// PiedDePage.jsx — le bas du site ("footer")
// 4 colonnes : marque + réseaux | navigation | contact | newsletter
// Puis une barre du bas : copyright, liens légaux, retour en haut.
// =============================================================

import { useState } from 'react'
import { Link } from 'react-router-dom'

// 📘 react-icons : une bibliothèque d'icônes prêtes à l'emploi.
// Chaque icône est un composant React : <FaInstagram />
// "fa" = la famille Font Awesome.
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaClock,
  FaArrowUp,
  FaArrowRight,
  FaChevronRight,
} from 'react-icons/fa6'

import './PiedDePage.css'
import logoAtef from '../assets/images/logo-atef.png'
import SignatureAdvisor from './SignatureAdvisor'
import { liensMenu, contenuPiedDePage } from '../data/contenu'

// Associe le nom d'un réseau (dans contenu.js) à son icône.
// C'est un objet utilisé comme "dictionnaire" : iconesReseaux['instagram'] → FaInstagram
const iconesReseaux = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
}

// Année calculée une seule fois, en dehors du composant
const anneeEnCours = new Date().getFullYear()

function PiedDePage() {
  const { slogan, contacts, reseauxSociaux, liensLegaux } = contenuPiedDePage

  // Les lignes de contact, décrites dans un tableau puis affichées avec .map()
  //   - lien    : adresse du lien (absent = simple texte)
  //   - externe : true → ouvre dans un nouvel onglet
  const lignesContact = [
    // mailto: ouvre l'application mail de l'utilisateur
    { cle: 'email', Icone: FaEnvelope, libelle: 'Email', valeur: contacts.email, lien: `mailto:${contacts.email}` },
    // tel: lance l'appel sur mobile. replace() enlève les espaces
    { cle: 'telephone', Icone: FaPhone, libelle: 'Téléphone', valeur: contacts.telephone, lien: `tel:${contacts.telephone.replace(/\s/g, '')}` },
    // wa.me : ouvre directement une discussion WhatsApp
    { cle: 'whatsapp', Icone: FaWhatsapp, libelle: 'WhatsApp', valeur: 'Écrire sur WhatsApp', lien: `https://wa.me/${contacts.whatsapp.replace('+', '')}`, externe: true },
    { cle: 'adresse', Icone: FaLocationDot, libelle: 'Adresse', valeur: contacts.adresse },
    { cle: 'horaires', Icone: FaClock, libelle: 'Horaires', valeur: contacts.horaires },
  ]

  // --- State du formulaire newsletter ---
  const [email, setEmail] = useState('')            // ce que tape l'utilisateur
  const [estInscrit, setEstInscrit] = useState(false) // true après l'envoi

  // 📘 Gestion d'un formulaire en React
  function envoyerNewsletter(evenement) {
    // Empêche le comportement par défaut du navigateur (recharger la page)
    evenement.preventDefault()

    // TODO backend : envoyer "email" à l'API (ex: fetch('/api/newsletter', ...))
    console.log('Inscription newsletter :', email)

    setEstInscrit(true)
    setEmail('') // vide le champ
  }

  function remonterEnHaut() {
    // Page normale : on fait défiler jusqu'en haut
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Page d'accueil (navigation par sections) : on prévient DefilementSections
    // 📘 CustomEvent : un événement "maison" que d'autres composants peuvent écouter
    window.dispatchEvent(new CustomEvent('atef:remonter'))
  }

  return (
    <footer className="pied-de-page">
      <div className="pied-de-page__grille">
        {/* ---------- Colonne 1 : marque ---------- */}
        <div className="pied-de-page__colonne pied-de-page__marque">
          <img src={logoAtef} alt="A.T.E.F" className="pied-de-page__logo" />
          <p className="pied-de-page__slogan">{slogan}</p>

          <div className="pied-de-page__reseaux">
            {reseauxSociaux.map(({ reseau, url }) => {
              // On récupère le composant icône correspondant au réseau.
              // Majuscule obligatoire : React ne reconnaît un composant que s'il commence par une majuscule.
              const Icone = iconesReseaux[reseau]
              return (
                <a
                  key={reseau}
                  href={url}
                  target="_blank"          // ouvre dans un nouvel onglet
                  rel="noopener noreferrer" // sécurité obligatoire avec target="_blank"
                  aria-label={reseau}      // texte lu par les lecteurs d'écran
                  className="pied-de-page__reseau"
                >
                  <Icone />
                </a>
              )
            })}
          </div>
        </div>

        {/* ---------- Colonne 2 : navigation (ordinateur uniquement) ---------- */}
        <div className="pied-de-page__colonne pied-de-page__navigation">
          <h3 className="pied-de-page__titre">Navigation</h3>
          <ul className="pied-de-page__liste">
            {liensMenu.map((lien) => (
              <li key={lien.chemin}>
                <Link to={lien.chemin} className="pied-de-page__lien">
                  {lien.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Colonne 3 : contact ---------- */}
        <div className="pied-de-page__colonne pied-de-page__contact">
          <h3 className="pied-de-page__titre">Contact</h3>
          <ul className="pied-de-page__liste pied-de-page__contacts">
            {lignesContact.map(({ cle, Icone, libelle, valeur, lien, externe }) => {
              // 📘 Si la ligne a un lien → <a>, sinon → <div>.
              // On choisit la balise dans une variable (avec une majuscule, comme un composant).
              const Balise = lien ? 'a' : 'div'
              return (
                <li key={cle} className={`pied-de-page__contact-${cle}`}>
                  <Balise
                    className="pied-de-page__contact-ligne"
                    {...(lien && { href: lien })}
                    {...(externe && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    <span className="pied-de-page__contact-icone">
                      <Icone />
                    </span>
                    <span className="pied-de-page__contact-textes">
                      {/* le libellé ("Email", "Téléphone"…) n'apparaît que sur tablette/téléphone */}
                      <span className="pied-de-page__contact-libelle">{libelle}</span>
                      <span className="pied-de-page__contact-valeur">{valeur}</span>
                    </span>
                    {lien && <FaChevronRight className="pied-de-page__contact-chevron" aria-hidden="true" />}
                  </Balise>
                </li>
              )
            })}
          </ul>
        </div>

        {/* ---------- Colonne 4 : newsletter ---------- */}
        <div className="pied-de-page__colonne pied-de-page__newsletter">
          <h3 className="pied-de-page__titre">Newsletter</h3>
          <p className="pied-de-page__texte">
            Recevez les prochains événements et programmes en avant-première.
          </p>

          {/* 📘 Affichage conditionnel avec l'opérateur ternaire :
              condition ? (si vrai) : (si faux) */}
          {estInscrit ? (
            <p className="pied-de-page__merci">Merci, vous êtes inscrit(e) ✨</p>
          ) : (
            <form className="pied-de-page__formulaire" onSubmit={envoyerNewsletter}>
              {/* 📘 "Champ contrôlé" : React garde la valeur dans le state.
                  value = ce qui est affiché, onChange = mise à jour à chaque touche */}
              <input
                type="email"
                required // le navigateur vérifie que c'est un email valide
                placeholder="Votre adresse email"
                value={email}
                onChange={(evenement) => setEmail(evenement.target.value)}
                className="pied-de-page__champ"
                aria-label="Adresse email"
              />
              <button type="submit" className="pied-de-page__envoyer">
                {/* sur tablette, le bouton devient un rond avec une flèche (le texte est caché) */}
                <span className="pied-de-page__envoyer-texte">S'inscrire</span>
                <FaArrowRight className="pied-de-page__envoyer-fleche" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ---------- Barre du bas ---------- */}
      <div className="pied-de-page__bas">
        <div className="pied-de-page__bas-contenu">
          <p>© {anneeEnCours} A.T.E.F — Edith Assona. Tous droits réservés.</p>

          <SignatureAdvisor className="pied-de-page__signature" />

          <div className="pied-de-page__bas-droite">
            {liensLegaux.map((lien) => (
              <Link key={lien.chemin} to={lien.chemin} className="pied-de-page__lien">
                {lien.libelle}
              </Link>
            ))}
            <button
              onClick={remonterEnHaut}
              className="pied-de-page__haut"
              aria-label="Remonter en haut de la page"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default PiedDePage
