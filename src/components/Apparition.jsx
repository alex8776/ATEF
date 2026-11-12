// =============================================================
// Apparition.jsx — fait apparaître son contenu en fondu
// quand il entre dans l'écran pendant le défilement.
//
// Utilisation : on "enveloppe" n'importe quel bloc :
//   <Apparition>
//     <p>Ce texte apparaîtra en douceur</p>
//   </Apparition>
// =============================================================

// 📘 CONCEPT REACT : useRef
// useRef donne accès à l'élément HTML réel (la <div>) dans la page.
// On en a besoin pour demander au navigateur : "cet élément est-il visible ?"
import { useEffect, useRef, useState } from 'react'
import './Apparition.css'

// Props :
//   - children : 📘 prop spéciale = tout ce qu'on met ENTRE <Apparition> et </Apparition>
//   - delai    : retard en millisecondes (pour faire apparaître des blocs l'un après l'autre)
//   - className: classe CSS en plus, si besoin
function Apparition({ children, delai = 0, className = '' }) {
  const refBloc = useRef(null)
  const [estVisible, setEstVisible] = useState(false)

  useEffect(() => {
    const bloc = refBloc.current

    // IntersectionObserver : outil du navigateur qui prévient
    // quand un élément entre dans la zone visible de l'écran.
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setEstVisible(true)
          observateur.disconnect() // on n'anime qu'une seule fois
        }
      },
      { threshold: 0.15 }, // déclenche quand 15 % du bloc est visible
    )

    observateur.observe(bloc)

    // Nettoyage si le composant disparaît
    return () => observateur.disconnect()
  }, [])

  return (
    <div
      ref={refBloc}
      className={`apparition ${estVisible ? 'est-visible' : ''} ${className}`}
      // 📘 style en JSX = un objet JavaScript (les doubles accolades {{ }})
      style={{ transitionDelay: `${delai}ms` }}
    >
      {children}
    </div>
  )
}

export default Apparition
