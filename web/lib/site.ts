import type { Locale } from "@/lib/i18n";

/** URL canonique (SEO, Open Graph, sitemap). */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ausaintsperes.com";

/** Informations légales de la société exploitante (LCEN). */
export const legalEntity = {
  companyName: "SAS CHLOCERO",
  tradeName: "Le Comptoir des Saints-Pères",
  capital: "1 000 €",
  rcs: "840 646 855 R.C.S. Paris",
  siret: "840 646 855 00014",
  registeredAddress: "29 Rue des Saints-Pères, 75006 Paris, France",
  hostName: "Vercel Inc.",
  hostAddress: "440 N Barranca Ave #4133, Covina, CA 91723, United States",
  hostUrl: "https://vercel.com",
} as const;

export const site = {
  name: "Le Comptoir des Saints-Pères",
  tagline: "Brasserie parisienne au cœur de Saint-Germain-des-Prés",
  welcome:
    "Bienvenue au Comptoir des Saints-Pères, authentique bistrot parisien situé à Saint-Germain-des-Prés.",
  description:
    "Authentique bistrot parisien au 29 rue des Saints-Pères (Paris 6e) : cuisine de brasserie en continu sans réservation, vins et esprit Saint-Germain — ouvert 7j/7.",
  address: "29 Rue des Saints-Pères, 75006 Paris",
  addressUrl:
    "https://www.google.com/maps/place/Le+Comptoir+des+Saints-P%C3%A8res/@48.8562766,2.3319344,21z/data=!4m6!3m5!1s0x47e671d7de37c30d:0x4d72509d349ce56e!8m2!3d48.8564091!4d2.3318364!16s%2Fg%2F1thx7y17",
  phone: "01 40 20 09 39",
  phoneInternational: "+33 1 40 20 09 39",
  phoneHref: "tel:+33140200939",
  email: "christophe6eme@gmail.com",
  instagramUrl: "https://www.instagram.com/comptoirdessaintsperes/",

  menuEyebrow: "Cuisine de bistrot & cave",
  menuTitle: "La Carte",

  aboutEyebrow: "L'histoire du Comptoir des Saints-Pères",
  aboutTitle: "À propos du bistrot",
  aboutText:
    "Installez-vous là où Hemingway s'attablait, où Picasso déjeunait.\nL'équipe du Comptoir des Saints-Pères vous accueille à Saint-Germain-des-Prés, dans un bistrot parisien chargé d'histoire.",

  contactTitle: "Nous contacter",
  contactDays: "Ouvert 7j/7 — Accueil sans réservation en continu",
  contactCtaLabel: "Suivez-nous sur Instagram",

  infosHeroTitle: "Infos Pratiques",
  hoursEyebrow: "BIENVENUE",
  hoursTitle: "Horaires",
  hoursLines: [
    "Du lundi au vendredi 7h–23h30",
    "Samedi 8h–22h30",
    "Dimanche 9h–23h",
    "Petits-déjeuners de 7h à 11h · Service brasserie de 12h à 22h",
  ],
  addressTitle: "ADRESSE",
  directionsTitle: "Itinéraire",
  directionsText:
    "Le Comptoir des Saints-Pères se situe entre le Musée d'Orsay, le Musée du Louvre et l'église de Saint-Germain-des-Prés.",
  directionsMetro:
    "Métros Saint-Germain-des-Prés (ligne 4) et Rue du Bac (ligne 12)",
  mapLat: 48.8564091,
  mapLng: 2.3318364,
};

export type LocalizedSiteCopy = {
  tagline: string;
  welcome: string;
  description: string;
  menuEyebrow: string;
  menuTitle: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutText: string;
  contactTitle: string;
  contactDays: string;
  contactCtaLabel: string;
  infosHeroTitle: string;
  hoursEyebrow: string;
  hoursTitle: string;
  hoursLines: string[];
  addressTitle: string;
  directionsTitle: string;
  directionsText: string;
  directionsMetro: string;
};

export const siteByLocale: Record<Exclude<Locale, "fr">, LocalizedSiteCopy> = {
  en: {
    tagline: "Parisian Brasserie in the heart of Saint-Germain-des-Prés",
    welcome:
      "Welcome to Le Comptoir des Saints-Pères, an authentic Parisian bistro in Saint-Germain-des-Prés.",
    description:
      "Authentic Parisian bistro at 29 rue des Saints-Pères (Paris 6th): traditional brasserie cuisine, continuous walk-in service, fine wines and Saint-Germain spirit — open 7 days a week.",
    menuEyebrow: "Bistro kitchen & cellar",
    menuTitle: "Our Menu",
    aboutEyebrow: "The story of Le Comptoir des Saints-Pères",
    aboutTitle: "About the bistro",
    aboutText:
      "Settle in where Hemingway used to sit, where Picasso had lunch.\nThe team at Le Comptoir des Saints-Pères welcomes you to Saint-Germain-des-Prés, in a historic Parisian bistro.",
    contactTitle: "Contact us",
    contactDays: "Open 7 days a week — Walk-ins welcome, continuous service",
    contactCtaLabel: "Follow us on Instagram",
    infosHeroTitle: "Practical Info",
    hoursEyebrow: "WELCOME",
    hoursTitle: "Opening Hours",
    hoursLines: [
      "Monday to Friday 7am–11:30pm",
      "Saturday 8am–10:30pm",
      "Sunday 9am–11pm",
      "Breakfast 7am–11am · Brasserie service 12pm–10pm",
    ],
    addressTitle: "ADDRESS",
    directionsTitle: "Getting Here",
    directionsText:
      "Le Comptoir des Saints-Pères is located between the Musée d'Orsay, the Louvre Museum and Saint-Germain-des-Prés church.",
    directionsMetro:
      "Metro Saint-Germain-des-Prés (line 4) and Rue du Bac (line 12)",
  },
  es: {
    tagline: "Brasserie parisina en el corazón de Saint-Germain-des-Prés",
    welcome:
      "Bienvenido a Le Comptoir des Saints-Pères, auténtico bistró parisino en Saint-Germain-des-Prés.",
    description:
      "Auténtico bistró parisino en 29 rue des Saints-Pères (París 6): cocina tradicional de brasserie sin reserva, vinos selectos y espíritu de Saint-Germain — abierto los 7 días.",
    menuEyebrow: "Cocina de bistró y bodega",
    menuTitle: "La Carta",
    aboutEyebrow: "La historia de Le Comptoir des Saints-Pères",
    aboutTitle: "Sobre el bistró",
    aboutText:
      "Siéntese donde solía sentarse Hemingway, donde almorzaba Picasso.\nEl equipo de Le Comptoir des Saints-Pères le da la bienvenida en Saint-Germain-des-Prés, en un bistró parisino cargado de historia.",
    contactTitle: "Contacto",
    contactDays: "Abierto los 7 días — Servicio continuo sin reserva",
    contactCtaLabel: "Síganos en Instagram",
    infosHeroTitle: "Información Práctica",
    hoursEyebrow: "BIENVENIDOS",
    hoursTitle: "Horarios",
    hoursLines: [
      "Lunes a viernes 7:00–23:30",
      "Sábado 8:00–22:30",
      "Domingo 9:00–23:00",
      "Desayunos 7:00–11:00 · Servicio de brasserie 12:00–22:00",
    ],
    addressTitle: "DIRECCIÓN",
    directionsTitle: "Cómo llegar",
    directionsText:
      "Le Comptoir des Saints-Pères se encuentra entre el Museo de Orsay, el Museo del Louvre y la iglesia de Saint-Germain-des-Prés.",
    directionsMetro:
      "Metro Saint-Germain-des-Prés (línea 4) y Rue du Bac (línea 12)",
  },
  it: {
    tagline: "Brasserie parigina nel cuore di Saint-Germain-des-Prés",
    welcome:
      "Benvenuti a Le Comptoir des Saints-Pères, autentico bistrot parigino a Saint-Germain-des-Prés.",
    description:
      "Autentico bistrot parigino al 29 rue des Saints-Pères (Parigi 6): cucina tradizionale di brasserie con orario continuato senza prenotazione, vini scelti e spirito Saint-Germain — aperto 7 giorni su 7.",
    menuEyebrow: "Cucina di bistrot e cantina",
    menuTitle: "Il Menù",
    aboutEyebrow: "La storia di Le Comptoir des Saints-Pères",
    aboutTitle: "Il bistrot",
    aboutText:
      "Accomodatevi dove sedeva Hemingway, dove pranzava Picasso.\nIl team di Le Comptoir des Saints-Pères vi accoglie a Saint-Germain-des-Prés, in uno storico bistrot parigino.",
    contactTitle: "Contattaci",
    contactDays: "Aperto 7 giorni su 7 — Orario continuato senza prenotazione",
    contactCtaLabel: "Seguici su Instagram",
    infosHeroTitle: "Informazioni Pratiche",
    hoursEyebrow: "BENVENUTI",
    hoursTitle: "Orari",
    hoursLines: [
      "Dal lunedì al venerdì 7:00–23:30",
      "Sabato 8:00–22:30",
      "Domenica 9:00–23:00",
      "Colazione 7:00–11:00 · Servizio brasserie 12:00–22:00",
    ],
    addressTitle: "INDIRIZZO",
    directionsTitle: "Come raggiungerci",
    directionsText:
      "Le Comptoir des Saints-Pères si trova tra il Museo d'Orsay, il Museo del Louvre e la chiesa di Saint-Germain-des-Prés.",
    directionsMetro:
      "Metro Saint-Germain-des-Prés (linea 4) e Rue du Bac (linea 12)",
  },
  de: {
    tagline: "Pariser Brasserie im Herzen von Saint-Germain-des-Prés",
    welcome:
      "Willkommen im Le Comptoir des Saints-Pères, einem authentischen Pariser Bistro in Saint-Germain-des-Prés.",
    description:
      "Authentisches Pariser Bistro in der 29 rue des Saints-Pères (Paris 6.): klassische Brasserie-Küche ohne Reservierung, ausgewählte Weine und das Flair von Saint-Germain — 7 Tage geöffnet.",
    menuEyebrow: "Bistro-Küche & Weinkeller",
    menuTitle: "Speisekarte",
    aboutEyebrow: "Die Geschichte des Le Comptoir des Saints-Pères",
    aboutTitle: "Über das Bistro",
    aboutText:
      "Nehmen Sie dort Platz, wo einst Hemingway saß und Picasso zu Mittag aß.\nDas Team des Le Comptoir des Saints-Pères empfängt Sie in Saint-Germain-des-Prés in einem geschichtsträchtigen Pariser Bistro.",
    contactTitle: "Kontakt",
    contactDays: "7 Tage geöffnet — Durchgehender Service ohne Reservierung",
    contactCtaLabel: "Folgen Sie uns auf Instagram",
    infosHeroTitle: "Praktische Infos",
    hoursEyebrow: "WILLKOMMEN",
    hoursTitle: "Öffnungszeiten",
    hoursLines: [
      "Montag bis Freitag 7:00–23:30 Uhr",
      "Samstag 8:00–22:30 Uhr",
      "Sonntag 9:00–23:00 Uhr",
      "Frühstück 7:00–11:00 Uhr · Brasserie-Küche 12:00–22:00 Uhr",
    ],
    addressTitle: "ADRESSE",
    directionsTitle: "Anfahrt",
    directionsText:
      "Das Le Comptoir des Saints-Pères liegt zwischen dem Musée d'Orsay, dem Louvre und der Kirche Saint-Germain-des-Prés.",
    directionsMetro:
      "Metro Saint-Germain-des-Prés (Linie 4) und Rue du Bac (Linie 12)",
  },
};

export const siteEn = siteByLocale.en;
