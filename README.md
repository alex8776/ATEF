# A.T.E.F — Front-end React

Site vitrine d'Edith Assona. React 19 + Vite + React Router, en CSS classique (sans Tailwind).

## Lancer le projet

```bash
npm install      # installe les dépendances (une seule fois)
npm run dev      # lance le site en local → http://localhost:5173
npm run build    # génère la version finale dans /dist (à mettre en ligne)
```

## Où trouver quoi

```
src/
├── main.jsx                 → point de départ (affiche <App /> dans la page)
├── App.jsx                  → structure commune + routes (quelle page pour quelle adresse)
├── index.css                → couleurs, polices, styles globaux
├── data/contenu.js          → ✏️ TOUS LES TEXTES du site (modifie-les ici)
├── assets/images/           → images
├── pages/
│   ├── PageAccueil.jsx      → la page d'accueil = assemblage des sections
│   └── PageEnConstruction.jsx → page temporaire (About, News, Programme)
└── components/              → les "briques" réutilisables (1 .jsx + 1 .css chacune)
    ├── EcranChargement      → écran logo au démarrage
    ├── BarreNavigation      → menu du haut (+ burger mobile)
    ├── SectionAccueil       → "Grâce et gratitude."
    ├── SectionBiographie    → "Edith Assona"
    ├── SectionEvenement     → "A21 Business Show"
    ├── PiedDePage           → footer
    ├── BoutonDore           → bouton doré réutilisé 3×
    ├── SignatureAdvisor     → "21 Advisor" réutilisé 4×
    └── RemonterEnHaut       → remonte en haut à chaque changement de page
```

Les commentaires marqués 📘 expliquent un concept React la première fois qu'il apparaît.

## Ajouter une page

1. Crée `src/pages/MaPage.jsx`.
2. Ajoute la route dans `App.jsx` : `<Route path="/ma-page" element={<MaPage />} />`.
3. Ajoute le lien dans `liensMenu` (`data/contenu.js`).

## À faire

- Remplacer `edith-conference.webp`, `edith-business-show.webp`, `logo-atef.png` et `badge-21.png` par les fichiers originaux en haute définition (les noms doivent rester les mêmes).
- Mettre le GIF du logo dans l'écran de chargement (instructions en haut de `EcranChargement.jsx`).
