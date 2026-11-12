// =============================================================
// contenu.js — TOUS LES TEXTES DU SITE
// On sépare le contenu (textes) du code (composants).
// Pour modifier un texte, on vient ICI, pas besoin de toucher aux composants.
// Plus tard, ces données pourront venir d'une API (backend).
// =============================================================

// Liens du menu de navigation.
// "chemin" = l'adresse de la page dans le navigateur (ex: monsite.com/about)
export const liensMenu = [
  { libelle: 'Accueil', chemin: '/' },
  { libelle: 'À propos', chemin: '/a-propos' },
  { libelle: 'Actualités', chemin: '/actualites' },
  { libelle: 'Programme', chemin: '/programme' },
]

// Section 1 : le grand bandeau d'accueil
export const contenuAccueil = {
  surtitre: 'Edith Assona · A.T.E.F', // affiché sur tablette et téléphone
  titre: 'Grâce et gratitude.',
  description:
    "Femme d’affaires, Edith Assona a excellé dans le marketing de réseau professionnel avec Academy Twenty One. Son parcours témoigne de son sens du leadership et de sa capacité à fédérer des équipes autour d’objectifs communs.",
  texteBouton: 'Qui est Edith Assona ?',
  texteBoutonSecondaire: 'Nos événements', // tablette uniquement
  // Cartes flottantes autour du portrait (tablette uniquement)
  carteAdvisor: { titre: 'Advisor', sousTitre: 'Academy Twenty One' },
  carteEvenement: { sousTitre: 'Dernier événement', titre: 'A21 Business Show · Kinshasa' },
}

// Section 2 : la biographie
export const contenuBiographie = {
  surtitre: 'À propos',
  etiquettePhoto: 'Academy Twenty One',
  nom: 'Edith Assona',
  // Un tableau = plusieurs paragraphes. On en ajoute autant qu'on veut.
  paragraphes: [
    "Femme d’affaires, Edith Assona s’est distinguée dans le marketing de réseau professionnel avec Academy Twenty One. Au fil de son parcours, elle a mis son sens du leadership au service d’une ambition collective, en fédérant des équipes autour d’objectifs communs et en encourageant chacun à prendre des responsabilités.",
    "Son approche repose sur la transmission, la confiance et la constance. Pour elle, accompagner une équipe, c’est partager son expérience, donner à chacun les moyens de progresser et l’aider à prendre confiance dans sa capacité à diriger. Elle incarne un leadership qui se mesure aussi à la progression des personnes qui l’entourent.",
  ],
  // Phrase mise en avant (tablette et téléphone)
  citation: '« Un leadership qui se mesure à la progression de ceux qui l’entourent. »',
  texteBouton: 'En savoir plus',
}

// Section 3 : l'événement mis en avant
export const contenuEvenement = {
  surtitre: 'Dernier événement',
  titreSection: 'Nos événements', // grand titre manuscrit (tablette et téléphone)
  lieu: 'Kinshasa',
  titre: 'A21 BUSINESS SHOW A KINSHASA',
  description:
    "Ce BUSINESS SHOW a été bien plus qu’un simple événement. Ce fut une véritable rencontre de visions, d’ambitions et d’opportunités, où chaque échange, chaque témoignage et chaque instant partagé nous a rappelé que la réussite commence par une décision : celle d’oser voir plus grand !",
  texteBouton: 'Consulter',
}

// Pied de page
// ⚠️ EXEMPLES : remplace ces coordonnées par les vraies avant la mise en ligne
export const contenuPiedDePage = {
  slogan: 'Inspirer, transmettre et faire grandir ceux qui osent voir plus grand.',

  contacts: {
    email: 'contact@atef-exemple.com',
    telephone: '+243 81 000 00 00',
    whatsapp: '+243810000000', // sans espaces ni "+" final : utilisé dans le lien wa.me
    adresse: 'Gombe, Kinshasa — RD Congo',
    horaires: 'Lun – Ven · 9h – 17h',
  },

  // "reseau" sert à choisir la bonne icône dans PiedDePage.jsx
  reseauxSociaux: [
    { reseau: 'facebook', url: 'https://facebook.com/' },
    { reseau: 'instagram', url: 'https://instagram.com/' },
    { reseau: 'linkedin', url: 'https://linkedin.com/' },
    { reseau: 'youtube', url: 'https://youtube.com/' },
  ],

  liensLegaux: [
    { libelle: 'Mentions légales', chemin: '/mentions-legales' },
    { libelle: 'Confidentialité', chemin: '/confidentialite' },
  ],
}
