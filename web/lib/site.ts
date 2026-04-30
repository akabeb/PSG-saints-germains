/** URL canonique (SEO, Open Graph, sitemap). */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ausaintsperes.com";

/**
 * Défauts éditoriaux FR — alignés 1:1 sur le site WordPress (ausaintsperes.com).
 * Ces valeurs sont écrasées par les champs `siteSettings` côté Sanity dès qu'ils sont remplis.
 */
export const site = {
  name: "Le Comptoir des Saints-Pères",
  tagline:
    "Brasserie Parisienne au coeur du quartier Saint-Germain",
  welcome:
    "Bienvenue au Comptoir des Saints-Pères, authentique bistrot parisien situé à Saint-Germain-des-Prés.",
  description:
    "Authentique bistrot parisien : plats du marché, vins et esprit Saint-Germain — là où l'histoire du quartier se goûte encore.",
  address: "29 Rue des Saints-Pères, 75006 Paris",
  addressUrl:
    "https://www.google.com/maps/search/?api=1&query=29+Rue+des+Saints-P%C3%A8res+75006+Paris",
  phone: "+33 1 40 20 09 39",
  phoneHref: "tel:+33140200939",
  email: "christophe6eme@gmail.com",
  instagramUrl: "https://www.instagram.com/comptoirdessaintsperes/",

  menuEyebrow: "",
  menuTitle: "La Carte",

  aboutEyebrow: "L'histoire du Comptoir des Saints-Pères",
  aboutTitle: "A propos du bistrot",
  aboutText:
    "Installez-vous là où Hemingway s'attablait, où Picasso déjeunait.\nL'équipe du Comptoir des Saints-Pères vous accueille à Saint-Germain-des-Prés, dans un bistrot parisien chargé d'histoire.",

  contactTitle: "Nous contacter",
  contactDays: "Du lundi au vendredi",
  contactCtaLabel: "Suivez-nous sur Instagram",

  infosHeroTitle: "Infos Pratiques",
  hoursEyebrow: "BIENVENUE",
  hoursTitle: "Horaires",
  hoursLines: ["Du lundi au samedi"],
  addressTitle: "ADRESSE",
  directionsTitle: "Itinéraire",
  directionsText:
    "Le Comptoir des Saints-Pères se situe entre le Musée d'Orsay, le Musée du Louvre et l'église de Saint-Germain-des-Prés",
  directionsMetro:
    "Métros Saint-Germain-des-Prés (ligne 4) et Rue du Bac (ligne 12)",
  mapLat: 48.8563,
  mapLng: 2.3318,
} as const;

/** Traductions anglaises des textes éditoriaux.
 *  Fusionnées sur `site` quand locale === "en". */
export const siteEn = {
  tagline: "Parisian Brasserie in the heart of Saint-Germain",
  welcome:
    "Welcome to the Comptoir des Saints-Pères, an authentic Parisian bistro in Saint-Germain-des-Prés.",
  description:
    "An authentic Parisian bistro: market dishes, wines and Saint-Germain spirit — where the history of the neighbourhood can still be tasted.",

  menuEyebrow: "",
  menuTitle: "Our Menu",

  aboutEyebrow: "The story of the Comptoir des Saints-Pères",
  aboutTitle: "About the bistro",
  aboutText:
    "Settle in where Hemingway used to sit, where Picasso had lunch.\nThe team at the Comptoir des Saints-Pères welcomes you to Saint-Germain-des-Prés, in a historic Parisian bistro.",

  contactTitle: "Contact us",
  contactDays: "Monday to Friday",
  contactCtaLabel: "Follow us on Instagram",

  infosHeroTitle: "Practical Info",
  hoursEyebrow: "WELCOME",
  hoursTitle: "Opening Hours",
  hoursLines: ["Monday to Saturday"],
  addressTitle: "ADDRESS",
  directionsTitle: "Getting Here",
  directionsText:
    "The Comptoir des Saints-Pères is located between the Musée d'Orsay, the Louvre Museum and Saint-Germain-des-Prés church",
  directionsMetro:
    "Metro Saint-Germain-des-Prés (line 4) and Rue du Bac (line 12)",
} as const;
