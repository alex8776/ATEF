// =============================================================
// BarreNavigation.jsx — le menu en haut de la page
//
// - Ordinateur : barre pleine largeur (logo, liens, langue)
// - Tablette   : "pilule" flottante arrondie avec les liens
// - Téléphone  : pilule flottante (logo, langue, bouton rond ☰)
//                + un MENU PLEIN ÉCRAN qui s'ouvre au clic
// =============================================================

// 📘 CONCEPT REACT : le "state" (état) avec useState
// Le state, c'est une variable que React SURVEILLE.
// Quand elle change, React redessine automatiquement le composant.
import { useEffect, useState } from 'react'
// NavLink = un lien de React Router qui sait si sa page est active
import { NavLink, Link } from 'react-router-dom'
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa6'

import './BarreNavigation.css'
import BoutonDore from './BoutonDore'
import logoAtef from '../assets/images/logo-atef.png'
import imagePortrait from '../assets/images/edith-portrait.webp'
import { liensMenu, contenuPiedDePage } from '../data/contenu'

// estVisible : false pendant l'écran de chargement → la barre est cachée en haut
function BarreNavigation({ estVisible = true }) {
  // menuMobileOuvert : true = menu plein écran ouvert (téléphone)
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false)

  // Langue du site ('fr' ou 'en'). Pour l'instant c'est visuel :
  // la traduction (i18n) viendra plus tard.
  const [langue, setLangue] = useState('fr')

  const { contacts } = contenuPiedDePage

  function basculerMenu() {
    setMenuMobileOuvert(!menuMobileOuvert)
  }

  function fermerMenu() {
    setMenuMobileOuvert(false)
  }

  function changerLangue() {
    setLangue(langue === 'fr' ? 'en' : 'fr')
  }

  // Quand le menu plein écran est ouvert :
  //  - on bloque le défilement de la page derrière
  //  - la touche Échap le ferme
  useEffect(() => {
    if (!menuMobileOuvert) return

    document.documentElement.classList.add('menu-mobile-ouvert')
    function surClavier(evenement) {
      if (evenement.key === 'Escape') setMenuMobileOuvert(false)
    }
    window.addEventListener('keydown', surClavier)

    return () => {
      document.documentElement.classList.remove('menu-mobile-ouvert')
      window.removeEventListener('keydown', surClavier)
    }
  }, [menuMobileOuvert])

  return (
    // 📘 Fragment <> </> : on renvoie 2 éléments côte à côte (l'en-tête + le menu plein écran)
    <>
      <header className={`barre-navigation ${estVisible ? 'est-visible' : ''}`}>
        <div className="barre-navigation__contenu">
          {/* Logo : cliquer dessus ramène à l'accueil */}
          <Link to="/" className="barre-navigation__logo" onClick={fermerMenu}>
            <img src={logoAtef} alt="A.T.E.F — Accueil" />
          </Link>

          {/* Liens (ordinateur et tablette) */}
          <nav className="barre-navigation__liens" aria-label="Menu principal">
            {/* 📘 CONCEPT REACT : .map() pour afficher une liste.
                "key" est obligatoire : un identifiant unique par élément. */}
            {liensMenu.map((lien) => (
              <NavLink
                key={lien.chemin}
                to={lien.chemin}
                end // "end" : "/" n'est actif QUE sur l'accueil
                className={({ isActive }) =>
                  `barre-navigation__lien ${isActive ? 'est-actif' : ''}`
                }
              >
                {lien.libelle}
              </NavLink>
            ))}
          </nav>

          <button
            className="barre-navigation__langue"
            onClick={changerLangue}
            aria-label={langue === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            {langue === 'fr' ? 'EN' : 'FR'}
          </button>

          {/* Bouton rond ☰ / ✕ (téléphone uniquement, voir le CSS) */}
          <button
            className={`barre-navigation__burger ${menuMobileOuvert ? 'est-ouvert' : ''}`}
            onClick={basculerMenu}
            aria-label={menuMobileOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuMobileOuvert}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* ---------- Menu plein écran (téléphone) ----------
          📘 inert : quand il est fermé, ses liens ne sont ni cliquables ni atteignables au clavier */}
      <div
        className={`menu-plein-ecran ${menuMobileOuvert ? 'est-ouvert' : ''}`}
        inert={!menuMobileOuvert}
      >
        {/* Portrait en filigrane, très transparent */}
        <img src={imagePortrait} alt="" className="menu-plein-ecran__filigrane" />

        <nav className="menu-plein-ecran__liens" aria-label="Menu principal">
          {liensMenu.map((lien, index) => (
            <NavLink
              key={lien.chemin}
              to={lien.chemin}
              end
              onClick={fermerMenu}
              // --i : numéro du lien, pour les faire apparaître l'un après l'autre (CSS)
              style={{ '--i': index }}
              className={({ isActive }) => `menu-plein-ecran__lien ${isActive ? 'est-actif' : ''}`}
            >
              {/* padStart : 1 → "01", 2 → "02"… */}
              <span className="menu-plein-ecran__numero">{String(index + 1).padStart(2, '0')}</span>
              <span className="texte-manuscrit menu-plein-ecran__libelle">{lien.libelle}</span>
            </NavLink>
          ))}
        </nav>

        <div className="menu-plein-ecran__actions">
          {/* Choix de la langue : deux boutons, celui actif est doré */}
          <div className="menu-plein-ecran__langues" role="group" aria-label="Langue">
            {['fr', 'en'].map((code) => (
              <button
                key={code}
                onClick={() => setLangue(code)}
                className={langue === code ? 'est-actif' : ''}
                aria-pressed={langue === code}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <BoutonDore
            texte="Écrire sur WhatsApp"
            lien={`https://wa.me/${contacts.whatsapp.replace('+', '')}`}
            icone={FaWhatsapp}
            externe
          />
          <BoutonDore
            texte="Envoyer un email"
            lien={`mailto:${contacts.email}`}
            icone={FaEnvelope}
            variante="contour"
          />
        </div>
      </div>
    </>
  )
}

export default BarreNavigation
