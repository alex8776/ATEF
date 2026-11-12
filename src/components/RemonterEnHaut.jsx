// =============================================================
// RemonterEnHaut.jsx — petit composant "invisible"
// Problème : quand on change de page, le navigateur garde la
// position de défilement de la page précédente.
// Solution : à chaque changement d'adresse, on remonte en haut.
// Ce composant n'affiche rien (il retourne null).
// =============================================================

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function RemonterEnHaut() {
  // useLocation donne l'adresse actuelle (ex: "/about")
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]) // s'exécute à chaque fois que "pathname" change

  return null
}

export default RemonterEnHaut
