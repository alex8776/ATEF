// =============================================================
// DefilementSections.jsx — navigation "section par section"
//
// Sur ordinateur : pas de barre de défilement. Un coup de molette,
// une flèche du clavier ou un glissé du doigt fait passer à la
// section suivante/précédente avec un effet de "cartes empilées" :
//   - la section actuelle recule et s'assombrit,
//   - la suivante monte par-dessus comme une carte.
//
// Sur tablette et téléphone (≤ 1024px) : défilement normal (les sections
// sont plus hautes que l'écran, on ne peut pas les forcer à tenir dedans).
//
// Utilisation :
//   <DefilementSections panneaux={[
//     { id: 'accueil', nom: 'Accueil', element: <SectionAccueil /> },
//     ...
//   ]} />
// =============================================================

import { useCallback, useEffect, useRef, useState } from 'react'
import './DefilementSections.css'

// Durée de l'animation entre deux sections (en ms). Doit correspondre au CSS.
const DUREE_TRANSITION = 1000
// Au-dessus de cette largeur (ordinateur), on active le mode "section par section"
const REQUETE_ORDINATEUR = '(min-width: 1025px)'

// 📘 HOOK PERSONNALISÉ : une fonction qui commence par "use" et qui
// utilise d'autres hooks. Ici : "l'écran est-il assez large ?"
// Il se met à jour tout seul si on redimensionne la fenêtre.
function useEstOrdinateur() {
  const [estOrdinateur, setEstOrdinateur] = useState(
    () => window.matchMedia(REQUETE_ORDINATEUR).matches,
  )

  useEffect(() => {
    const requete = window.matchMedia(REQUETE_ORDINATEUR)
    const surChangement = () => setEstOrdinateur(requete.matches)
    requete.addEventListener('change', surChangement)
    return () => requete.removeEventListener('change', surChangement)
  }, [])

  return estOrdinateur
}

function DefilementSections({ panneaux }) {
  const estOrdinateur = useEstOrdinateur()
  const [indexActif, setIndexActif] = useState(0) // section affichée

  // 📘 useRef pour des valeurs qui ne doivent PAS redessiner le composant
  const estVerrouille = useRef(false)   // true pendant une transition
  const dernierEvenementMolette = useRef(0)
  const departToucher = useRef(null)    // position du doigt au début d'un glissé

  const dernierIndex = panneaux.length - 1

  // Copie de l'index dans une ref : les écouteurs d'événements (molette, clavier)
  // peuvent ainsi lire la valeur à jour sans être recréés à chaque changement
  const indexActifRef = useRef(0)

  // Aller à une section précise (en restant dans les limites)
  const allerA = useCallback(
    (nouvelIndex) => {
      if (estVerrouille.current) return // une animation est déjà en cours
      const indexBorne = Math.max(0, Math.min(dernierIndex, nouvelIndex))
      if (indexBorne === indexActifRef.current) return // déjà sur cette section

      // On bloque les nouveaux changements pendant l'animation
      estVerrouille.current = true
      setTimeout(() => {
        estVerrouille.current = false
      }, DUREE_TRANSITION + 150)

      indexActifRef.current = indexBorne
      setIndexActif(indexBorne)
    },
    [dernierIndex],
  )

  const suivante = useCallback(() => allerA(indexActifRef.current + 1), [allerA])
  const precedente = useCallback(() => allerA(indexActifRef.current - 1), [allerA])

  // --- Écouteurs : molette, clavier, toucher (seulement sur ordinateur) ---
  useEffect(() => {
    if (!estOrdinateur) return

    // On cache la barre de défilement de la page pendant ce mode
    document.documentElement.classList.add('sans-defilement')
    window.scrollTo(0, 0)

    function surMolette(evenement) {
      const maintenant = Date.now()
      const ecart = maintenant - dernierEvenementMolette.current
      dernierEvenementMolette.current = maintenant

      // Les pavés tactiles envoient une rafale d'événements (inertie).
      // On ignore la rafale en cours : il faut un nouveau geste.
      if (estVerrouille.current || ecart < 120) return
      if (Math.abs(evenement.deltaY) < 8) return // micro-mouvement

      if (evenement.deltaY > 0) suivante()
      else precedente()
    }

    function surClavier(evenement) {
      // On ne détourne pas les touches quand la personne écrit dans un champ
      const balise = evenement.target.tagName
      if (balise === 'INPUT' || balise === 'TEXTAREA') return

      if (['ArrowDown', 'PageDown', ' '].includes(evenement.key)) {
        evenement.preventDefault()
        suivante()
      } else if (['ArrowUp', 'PageUp'].includes(evenement.key)) {
        evenement.preventDefault()
        precedente()
      } else if (evenement.key === 'Home') {
        allerA(0)
      } else if (evenement.key === 'End') {
        allerA(dernierIndex)
      }
    }

    function surDebutToucher(evenement) {
      departToucher.current = evenement.touches[0].clientY
    }

    function surFinToucher(evenement) {
      if (departToucher.current === null) return
      const distance = departToucher.current - evenement.changedTouches[0].clientY
      departToucher.current = null
      if (Math.abs(distance) < 50) return // glissé trop court
      if (distance > 0) suivante()
      else precedente()
    }

    // Le bouton "remonter" du footer envoie cet événement (voir PiedDePage.jsx)
    function surRemonter() {
      allerA(0)
    }

    window.addEventListener('wheel', surMolette, { passive: true })
    window.addEventListener('keydown', surClavier)
    window.addEventListener('touchstart', surDebutToucher, { passive: true })
    window.addEventListener('touchend', surFinToucher)
    window.addEventListener('atef:remonter', surRemonter)

    // Nettoyage : on retire tout quand on quitte la page ou passe en mobile
    return () => {
      document.documentElement.classList.remove('sans-defilement')
      window.removeEventListener('wheel', surMolette)
      window.removeEventListener('keydown', surClavier)
      window.removeEventListener('touchstart', surDebutToucher)
      window.removeEventListener('touchend', surFinToucher)
      window.removeEventListener('atef:remonter', surRemonter)
    }
  }, [estOrdinateur, suivante, precedente, allerA, dernierIndex])

  // Les liens internes (ex: bouton "Qui est Edith Assona ?" → #biographie)
  // ne peuvent plus faire défiler la page : on les transforme en changement de section.
  function surClicLien(evenement) {
    if (!estOrdinateur) return
    const lien = evenement.target.closest('a[href^="#"]')
    if (!lien) return
    const cible = document.getElementById(lien.getAttribute('href').slice(1))
    const panneau = cible?.closest('[data-index-panneau]')
    if (!panneau) return
    evenement.preventDefault()
    allerA(Number(panneau.dataset.indexPanneau))
  }

  // --- Sur tablette / téléphone : les sections sont simplement les unes sous les autres ---
  if (!estOrdinateur) {
    return (
      <div className="defilement-normal">
        {panneaux.map((panneau) => (
          <div key={panneau.id}>{panneau.element}</div>
        ))}
      </div>
    )
  }

  // Donne à chaque panneau son état par rapport à la section affichée
  function etatDuPanneau(index) {
    if (index === indexActif) return 'est-actif'
    if (index < indexActif) return 'est-passe'   // déjà vu → reculé derrière
    return 'est-a-venir'                          // pas encore vu → caché en bas
  }

  return (
    <div
      className="defilement-sections"
      onClick={surClicLien}
      style={{ '--duree-transition': `${DUREE_TRANSITION}ms` }}
    >
      {panneaux.map((panneau, index) => (
        <div
          key={panneau.id}
          data-index-panneau={index}
          className={`panneau ${etatDuPanneau(index)} ${panneau.estPied ? 'panneau--pied' : ''}`}
          // z-index croissant : chaque panneau passe au-dessus du précédent (effet "pile de cartes")
          style={{ zIndex: index + 1 }}
          // 📘 inert : rend le panneau non cliquable et ignoré par la touche Tab
          // tant qu'il n'est pas la section affichée
          inert={index !== indexActif}
        >
          {panneau.element}
        </div>
      ))}

      {/* Points de navigation à droite de l'écran */}
      <nav className="defilement-points" aria-label="Sections de la page">
        {panneaux.map((panneau, index) => (
          <button
            key={panneau.id}
            className={`defilement-point ${index === indexActif ? 'est-actif' : ''}`}
            onClick={() => allerA(index)}
            aria-label={panneau.nom}
            aria-current={index === indexActif}
          >
            <span className="defilement-point__nom">{panneau.nom}</span>
          </button>
        ))}
      </nav>

      {/* Indication "faites défiler", visible seulement sur la première section */}
      <button
        className={`defilement-indice ${indexActif === 0 ? 'est-visible' : ''}`}
        onClick={suivante}
        aria-label="Section suivante"
      >
        <span className="defilement-indice__souris">
          <span className="defilement-indice__molette"></span>
        </span>
        <span className="defilement-indice__texte">Défiler</span>
      </button>
    </div>
  )
}

export default DefilementSections
