// =============================================================
// main.jsx — LE POINT DE DÉPART de l'application
// C'est le premier fichier JavaScript exécuté par le navigateur.
// Son seul rôle : prendre le composant <App /> et l'afficher
// dans la <div id="root"> du fichier index.html.
// =============================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// BrowserRouter permet d'avoir plusieurs "pages" (/, /about, /news...)
// sans recharger le site à chaque clic.
import { BrowserRouter } from 'react-router-dom'

// 📘 Les styles globaux sont importés AVANT App : ainsi, les styles des
// composants (importés dans App et ses enfants) passent après et peuvent les compléter.
import './index.css' // styles globaux (couleurs, polices, reset)
import App from './App.jsx'

// On récupère la div "root" dans index.html
const elementRacine = document.getElementById('root')

// On demande à React d'afficher l'application dedans
createRoot(elementRacine).render(
  // StrictMode : mode "strict" de React, affiche des avertissements
  // utiles dans la console pendant le développement (aucun effet en production)
  <StrictMode>
    {/* basename : le site vit dans le sous-dossier /ATEF/ (voir "base" dans vite.config.js).
        import.meta.env.BASE_URL contient cette valeur : React Router l'ajoute à tous les liens. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
