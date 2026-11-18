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
    "Le Comptoir des Saints-Pères est une brasserie parisienne traditionnelle située au 29 rue des Saints-Pères (Paris 6e), au cœur de Saint-Germain-des-Prés. Ouvert 7j/7 en service continu sans réservation, le bistrot sert petits-déjeuners, plats maison, croques sur pain Poilâne et vins de propriété en salle ou en terrasse.",
  description:
    "Le Comptoir des Saints-Pères, authentique bistrot et brasserie parisienne au 29 rue des Saints-Pères (Paris 6e, Saint-Germain-des-Prés) : cuisine maison en service continu 7j/7 sans réservation, terrasse, vins et cocktails à 5 min du Louvre et d'Orsay.",
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
    "Installez-vous là où Hemingway s'attablait, où Picasso déjeunait. Situé à cinq minutes à pied du Musée d'Orsay, du Musée du Louvre et de l'église de Saint-Germain-des-Prés, Le Comptoir des Saints-Pères perpétue l'esprit des bistrots historiques de la Rive Gauche : cuisine de brasserie préparée sur place, œufs plein air, croques dorés sur pain Poilâne, fromages affinés, glaces artisanales et vins français servis au verre ou à la bouteille.",

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
    "Le Comptoir des Saints-Pères vous accueille au 29 rue des Saints-Pères (75006 Paris), sur la Rive Gauche, à cinq minutes à pied du Musée d'Orsay, du Pont du Carrousel menant au Musée du Louvre, de l'École des Beaux-Arts et de l'église de Saint-Germain-des-Prés.",
  directionsMetro:
    "Métros Saint-Germain-des-Prés (ligne 4, à 3 min) et Rue du Bac (ligne 12, à 5 min) · Bus 39, 63, 68, 86, 95",
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
      "Le Comptoir des Saints-Pères is a traditional Parisian brasserie at 29 rue des Saints-Pères (Paris 6th), in the heart of Saint-Germain-des-Prés. Open 7 days a week with continuous walk-in service, our bistro serves French breakfasts, homemade dishes, Poilâne bread croques and estate wines indoors or on the terrace.",
    description:
      "Le Comptoir des Saints-Pères, authentic Parisian bistro and brasserie at 29 rue des Saints-Pères (Paris 6th, Saint-Germain-des-Prés): homemade French cuisine, continuous walk-in service 7 days a week, terrace and wines 5 minutes from the Louvre and Musée d'Orsay.",
    menuEyebrow: "Bistro kitchen & cellar",
    menuTitle: "Our Menu",
    aboutEyebrow: "The story of Le Comptoir des Saints-Pères",
    aboutTitle: "About the bistro",
    aboutText:
      "Settle in where Hemingway used to sit and Picasso had lunch. Located a five-minute walk from the Musée d'Orsay, the Louvre Museum and Saint-Germain-des-Prés church, Le Comptoir des Saints-Pères keeps the Left Bank bistro tradition alive with freshly prepared brasserie classics, free-range eggs, Poilâne sourdough croques, French cheeses, artisan ice creams and wines served by the glass or bottle.",
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
      "Le Comptoir des Saints-Pères welcomes you at 29 rue des Saints-Pères (75006 Paris) on the Left Bank, within a five-minute walk of the Musée d'Orsay, the Pont du Carrousel leading to the Louvre Museum, the École des Beaux-Arts and Saint-Germain-des-Prés church.",
    directionsMetro:
      "Metro Saint-Germain-des-Prés (line 4, 3 min walk) and Rue du Bac (line 12, 5 min walk) · Bus 39, 63, 68, 86, 95",
  },
  es: {
    tagline: "Brasserie parisina en el corazón de Saint-Germain-des-Prés",
    welcome:
      "Le Comptoir des Saints-Pères es una brasserie parisina tradicional situada en el 29 rue des Saints-Pères (París 6), en el corazón de Saint-Germain-des-Prés. Abierto los 7 días con servicio continuo sin reserva, el bistró ofrece desayunos, cocina casera, croques en pan Poilâne y vinos franceses en salón o terraza.",
    description:
      "Le Comptoir des Saints-Pères, auténtico bistró y brasserie parisina en 29 rue des Saints-Pères (París 6, Saint-Germain-des-Prés): cocina francesa casera con servicio continuo los 7 días sin reserva, terraza y vinos a 5 min del Louvre y del Museo de Orsay.",
    menuEyebrow: "Cocina de bistró y bodega",
    menuTitle: "La Carta",
    aboutEyebrow: "La historia de Le Comptoir des Saints-Pères",
    aboutTitle: "Sobre el bistró",
    aboutText:
      "Siéntese donde solía escribir Hemingway y almorzaba Picasso. A cinco minutos a pie del Museo de Orsay, del Museo del Louvre y de la iglesia de Saint-Germain-des-Prés, Le Comptoir des Saints-Pères mantiene vivo el espíritu de los bistrós históricos de la Rive Gauche con platos de brasserie caseros, huevos camperos, croques en pan Poilâne, quesos franceses, helados artesanales y vinos por copa o botella.",
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
      "Le Comptoir des Saints-Pères le recibe en el 29 rue des Saints-Pères (75006 París), en la Rive Gauche, a cinco minutos a pie del Museo de Orsay, del Puente del Carrusel hacia el Museo del Louvre, de la Escuela de Bellas Artes y de la iglesia de Saint-Germain-des-Prés.",
    directionsMetro:
      "Metro Saint-Germain-des-Prés (línea 4, a 3 min) y Rue du Bac (línea 12, a 5 min) · Autobuses 39, 63, 68, 86, 95",
  },
  it: {
    tagline: "Brasserie parigina nel cuore di Saint-Germain-des-Prés",
    welcome:
      "Le Comptoir des Saints-Pères è una brasserie parigina tradizionale situata al 29 rue des Saints-Pères (Parigi 6), nel cuore di Saint-Germain-des-Prés. Aperto 7 giorni su 7 con orario continuato senza prenotazione, il bistrot serve colazioni, piatti fatti in casa, croque su pane Poilâne e vini francesi in sala o in terrazza.",
    description:
      "Le Comptoir des Saints-Pères, autentico bistrot e brasserie parigina al 29 rue des Saints-Pères (Parigi 6, Saint-Germain-des-Prés): cucina francese fatta in casa con orario continuato 7 giorni su 7 senza prenotazione, terrazza e vini a 5 min dal Louvre e dal Museo d'Orsay.",
    menuEyebrow: "Cucina di bistrot e cantina",
    menuTitle: "Il Menù",
    aboutEyebrow: "La storia di Le Comptoir des Saints-Pères",
    aboutTitle: "Il bistrot",
    aboutText:
      "Accomodatevi dove sedeva Hemingway e pranzava Picasso. Situato a cinque minuti a piedi dal Museo d'Orsay, dal Museo del Louvre e dalla chiesa di Saint-Germain-des-Prés, Le Comptoir des Saints-Pères custodisce l'anima autentica dei bistrot della Rive Gauche con specialità di brasserie fatte in casa, uova allevate all'aperto, croque dorati su pane Poilâne, formaggi francesi, gelati artigianali e vini al calice o in bottiglia.",
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
      "Le Comptoir des Saints-Pères vi accoglie al 29 rue des Saints-Pères (75006 Parigi), sulla Rive Gauche, a cinque minuti a piedi dal Museo d'Orsay, dal Pont du Carrousel verso il Museo del Louvre, dall'École des Beaux-Arts e dalla chiesa di Saint-Germain-des-Prés.",
    directionsMetro:
      "Metro Saint-Germain-des-Prés (linea 4, a 3 min) e Rue du Bac (linea 12, a 5 min) · Autobus 39, 63, 68, 86, 95",
  },
  de: {
    tagline: "Pariser Brasserie im Herzen von Saint-Germain-des-Prés",
    welcome:
      "Das Le Comptoir des Saints-Pères ist eine traditionelle Pariser Brasserie in der 29 rue des Saints-Pères (Paris 6.) im Herzen von Saint-Germain-des-Prés. Das Bistro ist 7 Tage die Woche durchgehend ohne Reservierung geöffnet und serviert Frühstück, hausgemachte Klassiker, Croques auf Poilâne-Brot und französische Weine im Saal oder auf der Terrasse.",
    description:
      "Le Comptoir des Saints-Pères, authentisches Pariser Bistro und Brasserie in der 29 rue des Saints-Pères (Paris 6., Saint-Germain-des-Prés): hausgemachte französische Küche, 7 Tage durchgehender Service ohne Reservierung, Terrasse und Weine 5 Gehminuten vom Louvre und Musée d'Orsay.",
    menuEyebrow: "Bistro-Küche & Weinkeller",
    menuTitle: "Speisekarte",
    aboutEyebrow: "Die Geschichte des Le Comptoir des Saints-Pères",
    aboutTitle: "Über das Bistro",
    aboutText:
      "Nehmen Sie dort Platz, wo einst Hemingway saß und Picasso zu Mittag aß. Nur fünf Gehminuten vom Musée d'Orsay, dem Louvre und der Kirche Saint-Germain-des-Prés entfernt pflegt das Le Comptoir des Saints-Pères die Tradition der historischen Bistros der Rive Gauche: frisch zubereitete Brasserie-Gerichte, Freilandeier, knusprige Croques auf Poilâne-Brot, gereifter französischer Käse, handwerkliches Eis und Weine im offenen Ausschank oder als Flasche.",
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
      "Das Le Comptoir des Saints-Pères empfängt Sie in der 29 rue des Saints-Pères (75006 Paris) am linken Seine-Ufer, fünf Gehminuten vom Musée d'Orsay, der Brücke Pont du Carrousel zum Louvre, der École des Beaux-Arts und der Kirche Saint-Germain-des-Prés entfernt.",
    directionsMetro:
      "Metro Saint-Germain-des-Prés (Linie 4, 3 Gehminuten) und Rue du Bac (Linie 12, 5 Gehminuten) · Bus 39, 63, 68, 86, 95",
  },
};

export const siteEn = siteByLocale.en;
