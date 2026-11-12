// =============================================================
// EcranChargement.jsx — l'animation du logo au lancement du site
// (frames "MacBook Air 2, 3, 4" de la maquette Figma)
//
// Déroulé (environ 4 secondes) :
//   1. l'ellipse dorée se dessine, avec une lueur au bout du trait
//   2. les lettres A.T.E.F se dévoilent de gauche à droite
//   3. la signature "21 Advisor" apparaît
//   4. l'écran disparaît en fondu → le hero s'anime
// =============================================================

import { useEffect, useState } from 'react'

import './EcranChargement.css'
import SignatureAdvisor from './SignatureAdvisor'
// Les lettres du logo, sans l'ellipse (l'ellipse est redessinée en SVG pour l'animer)
import lettresLogo from '../assets/images/logo-atef-lettres.png'

// Durées en millisecondes (1000 ms = 1 seconde)
const DUREE_AFFICHAGE = 4200 // temps pendant lequel l'écran reste visible
const DUREE_FONDU = 700      // durée du fondu de disparition

// Le tracé de l'ellipse du logo (mêmes dimensions que l'image : 357 × 179).
// Il part du haut, fait le tour dans le sens des aiguilles d'une montre et revient.
// Ce même tracé sert au trait ET à la lueur qui le suit (voir le CSS).
// 📘 "M" = se placer en un point, "A" = dessiner un arc d'ellipse.
const TRACE_ELLIPSE = 'M 177 24.5 A 159.5 66 0 1 1 177 156.5 A 159.5 66 0 1 1 177 24.5'

// Props :
//   - quandFonduCommence : appelée quand l'écran COMMENCE à disparaître
//     (le hero lance ses animations à ce moment-là, pour un enchaînement fluide)
//   - quandTermine : appelée quand l'écran a complètement disparu
//     C'est comme ça qu'un enfant "prévient" son parent en React.
function EcranChargement({ quandFonduCommence, quandTermine }) {
  const [estEnTrainDeDisparaitre, setEstEnTrainDeDisparaitre] = useState(false)

  useEffect(() => {
    // Étape 1 : après l'animation du logo, on lance le fondu
    const minuteurFondu = setTimeout(() => {
      setEstEnTrainDeDisparaitre(true)
      quandFonduCommence()
    }, DUREE_AFFICHAGE)

    // Étape 2 : quand le fondu est fini, on prévient le parent (App.jsx)
    const minuteurFin = setTimeout(() => {
      quandTermine()
    }, DUREE_AFFICHAGE + DUREE_FONDU)

    // 📘 "Nettoyage" : si le composant disparaît avant la fin,
    // on annule les minuteurs pour éviter des bugs.
    return () => {
      clearTimeout(minuteurFondu)
      clearTimeout(minuteurFin)
    }
  }, [quandFonduCommence, quandTermine]) // 📘 Le tableau = les "dépendances" : React relance l'effet seulement si l'une d'elles change

  return (
    <div
      className={`ecran-chargement ${estEnTrainDeDisparaitre ? 'est-cache' : ''}`}
      // On passe le tracé au CSS via une "variable CSS" (--trace)
      style={{ '--trace': `path('${TRACE_ELLIPSE}')` }}
      role="img"
      aria-label="A.T.E.F"
    >
      <div className="logo-anime">
        {/* 📘 SVG = image vectorielle écrite en code : nette à toutes les tailles */}
        <svg viewBox="0 0 357 179" className="logo-anime__svg" aria-hidden="true">
          {/* pathLength="1" : on dit que le tracé mesure "1".
              Ça simplifie l'animation du dessin dans le CSS (0 → 1). */}
          <path d={TRACE_ELLIPSE} pathLength="1" className="logo-anime__ellipse" />

          {/* La lueur : un petit point lumineux qui suit le bout du trait */}
          <g className="logo-anime__lueur">
            <circle r="9" className="logo-anime__halo" />
            <circle r="2.6" className="logo-anime__coeur" />
          </g>
        </svg>

        <img src={lettresLogo} alt="" className="logo-anime__lettres" />
      </div>

      <SignatureAdvisor className="ecran-chargement__signature" />
    </div>
  )
}

export default EcranChargement
