import type { Locale } from "@/lib/i18n";

export type GeoHighlight = {
  label: string;
  detail: string;
};

export type GeoFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type GeoPracticalFact = {
  label: string;
  value: string;
};

export type GeoLocaleContent = {
  /** Valeurs Schema.org strictement traduites dans la langue active */
  servesCuisine: string[];
  paymentAccepted: string;
  contactTypeLabel: string;

  highlightsTitle: string;
  highlights: GeoHighlight[];
  homeFaq: GeoFaqItem[];

  /** Phrases complètes Sujet-Verbe-Objet introduisant chaque catégorie de la carte */
  categoryLeads: Record<string, string>;

  menuPageLead: string;
  menuCraftTitle: string;
  menuCraftText: string;
  menuCraftBullets: string[];

  /** Encadré structuré de repères pratiques (Infos pratiques & Contact) */
  practicalFactsTitle: string;
  practicalFacts: GeoPracticalFact[];

  infosGuideEyebrow: string;
  infosGuideTitle: string;
  infosFaq: GeoFaqItem[];

  contactGroupsEyebrow: string;
  contactGroupsTitle: string;
  contactGroupsLead: string;
  contactGroupsBullets: string[];
  /** Paragraphes éditoriaux autonomes sur /contact (couplés à FAQPage JSON-LD) */
  contactFaq: GeoFaqItem[];

  legalLead: string;
  links: {
    exploreMenu: string;
    practicalInfo: string;
    contactTeam: string;
  };
};

export const geoContent: Record<Locale, GeoLocaleContent> = {
  fr: {
    servesCuisine: ["Cuisine française", "Brasserie", "Bistrot parisien"],
    paymentAccepted: "Espèces, Carte bancaire",
    contactTypeLabel: "Accueil & renseignements",
    highlightsTitle: "Le Comptoir des Saints-Pères en bref",
    highlights: [
      {
        label: "Adresse & quartier historique",
        detail:
          "29 rue des Saints-Pères, 75006 Paris — au cœur de Saint-Germain-des-Prés, à 5 minutes à pied du Musée d'Orsay, du Musée du Louvre et de l'École des Beaux-Arts.",
      },
      {
        label: "Service continu 7j/7 sans réservation",
        detail:
          "Ouvert tous les jours (lun–ven 7h–23h30, sam 8h–22h30, dim 9h–23h) : petits-déjeuners de 7h à 11h, cuisine de brasserie de 12h à 22h, comptoir et terrasse en continu.",
      },
      {
        label: "Spécialités maison & maisons partenaires",
        detail:
          "Œuf mayonnaise maison, escargots de Bourgogne, croques dorés sur pain Poilâne, viandes et poissons grillés, fromages affinés et glaces artisanales Lili & Enzo.",
      },
      {
        label: "Accès, confort & accueil international",
        detail:
          "Métros Saint-Germain-des-Prés (ligne 4) et Rue du Bac (ligne 12), terrasse parisienne, Wi-Fi gratuit, paiement CB dès 5 € et carte traduite en 5 langues (FR, EN, ES, IT, DE).",
      },
    ],
    homeFaq: [
      {
        id: "offre-brasserie",
        question: "Que propose Le Comptoir des Saints-Pères ?",
        answer:
          "Le Comptoir des Saints-Pères propose une cuisine de brasserie parisienne traditionnelle préparée sur place : œufs mayonnaise maison, escargots de Bourgogne, croques sur pain Poilâne, tartare de bœuf, entrecôte, salades repas, fromages affinés, jus pressés minute, vins de propriété et cocktails maison.",
      },
      {
        id: "localisation-saint-germain",
        question: "Où se situe Le Comptoir des Saints-Pères à Paris ?",
        answer:
          "Le bistrot est situé au 29 rue des Saints-Pères dans le 6e arrondissement de Paris, au cœur de Saint-Germain-des-Prés, à cinq minutes à pied du Musée d'Orsay, du Musée du Louvre et des stations de métro Saint-Germain-des-Prés (ligne 4) et Rue du Bac (ligne 12).",
      },
      {
        id: "horaires-sans-reservation",
        question: "Pourquoi choisir notre brasserie en service continu 7j/7 ?",
        answer:
          "Ouvert 7 jours sur 7 sans réservation du matin jusqu'au soir, l'établissement accueille librement les Parisiens et les voyageurs en salle ou en terrasse, du petit-déjeuner (7h–11h) au service brasserie continu (12h–22h), avec une carte traduite en cinq langues.",
      },
    ],
    categoryLeads: {
      "cat-entrees":
        "Le Comptoir des Saints-Pères prépare sur place les entrées emblématiques du bistrot parisien et des planches généreuses à partager en salle ou en terrasse.",
      "cat-salades":
        "Nos grandes salades repas sont assemblées minute avec jeunes pousses de mesclun, légumes frais, fromages affinés et garnitures chaudes.",
      "cat-croques":
        "Tous nos croques parisiens sont dorés au four sur le pain au levain de la maison Poilâne et servis accompagnés d'une salade verte.",
      "cat-quiches":
        "Notre cuisine sert tout au long de la journée des quiches dorées accompagnées de mesclun ainsi qu'une traditionnelle soupe gratinée à l'oignon.",
      "cat-plats":
        "Les plats de brasserie du Comptoir des Saints-Pères mettent à l'honneur viandes sélectionnées, tartare préparé minute, volaille fermière, saumon grillé et recettes végétariennes.",
      "cat-oeufs":
        "Nos œufs au plat et nos omelettes garnies sont cuisinés minute exclusivement à partir d'œufs plein air et servis avec salade verte.",
      "cat-fromages":
        "Notre sélection de fromages français réunit Camembert au lait cru, chèvre frais, Cantal et Bleu d'Auvergne servis à l'assiette ou en planche à partager.",
      "cat-desserts":
        "Les desserts maison du bistrot s'accompagnent des glaces et sorbets artisanaux signés par les maîtres glaciers Lili & Enzo.",
      "cat-jus":
        "Nos jus de fruits et de légumes frais sont pressés à la minute au comptoir pour une pause vitaminée à toute heure de la journée.",
      "cat-cocktails":
        "Le bar du Comptoir des Saints-Pères réalise à la demande grands classiques de la mixologie, créations maison au Saint-Germain et cocktails sans alcool.",
      "cat-bieres":
        "Notre tirage pression et notre cave proposent bières blondes, blanches, d'abbaye, IPA artisanale, cidre doux et bière sans alcool.",
      "cat-aperitifs":
        "Retrouvez l'esprit de l'apéritif à Saint-Germain-des-Prés autour d'un kir, d'un Spritz, d'un vermouth ou d'un Americano préparé maison.",
      "cat-vins":
        "Notre cave rassemble vins rouges, blancs et rosés de vignerons français ainsi que des champagnes servis au verre, en carafe ou à la bouteille.",
      "cat-spiritueux":
        "Le comptoir propose une sélection soignée de whiskys écossais et japonais, gins, vodkas, rhums vieux de dégustation et eaux-de-vie de fruits.",
      "cat-boissons":
        "Du café expresso matinal aux chocolats chauds viennois, thés Comptoirs Richard et eaux minérales françaises, nos boissons sont servies en continu 7j/7.",
    },
    menuPageLead:
      "La carte du Comptoir des Saints-Pères réunit les grands classiques de la brasserie parisienne préparés sur place au 29 rue des Saints-Pères (Paris 6e) : entrées traditionnelles, grandes salades repas, croques dorés sur pain Poilâne, œufs plein air, viandes et poissons grillés, fromages au lait cru, jus pressés minute, vins de propriété au verre et cocktails maison. Tous nos tarifs sont affichés nets en euros, taxes et service compris.",
    menuCraftTitle: "Produits sélectionnés & maisons partenaires",
    menuCraftText:
      "Fidèle à la tradition des bistrots de Saint-Germain-des-Prés, Le Comptoir des Saints-Pères privilégie des produits frais travaillés minute et des artisans reconnus :",
    menuCraftBullets: [
      "Croques-Monsieur, Croques-Madame et tartines grillés sur le célèbre pain au levain de la maison Poilâne.",
      "Œufs plein air pour nos omelettes minute et nos œufs au plat servis avec salade verte.",
      "Glaces et sorbets artisanaux signés Lili & Enzo, accompagnant nos desserts maison (crème brûlée, mousse au chocolat, tarte Tatin tiède).",
      "Cave française servie au verre (14 cL), au pichet (25 cL, 50 cL) ou à la bouteille (75 cL), de Brouilly à Petit Chablis.",
    ],
    practicalFactsTitle: "Fiche pratique de l'établissement",
    practicalFacts: [
      { label: "Établissement", value: "Le Comptoir des Saints-Pères — Brasserie & bistrot parisien" },
      { label: "Adresse", value: "29 rue des Saints-Pères, 75006 Paris (Saint-Germain-des-Prés)" },
      { label: "Horaires 7j/7", value: "Lun–Ven 7h–23h30 · Sam 8h–22h30 · Dim 9h–23h (service brasserie continu 12h–22h)" },
      { label: "Métro & musées à proximité", value: "Saint-Germain-des-Prés (ligne 4) & Rue du Bac (ligne 12) — à 5 min à pied du Louvre et du Musée d'Orsay" },
      { label: "Téléphone & réservation", value: "01 40 20 09 39 — Accueil libre sans réservation toute la journée en salle et en terrasse" },
    ],
    infosGuideEyebrow: "QUESTIONS PRATIQUES",
    infosGuideTitle: "Préparer votre visite à Saint-Germain-des-Prés",
    infosFaq: [
      {
        id: "reservation-service-continu",
        question: "Faut-il réserver une table au Comptoir des Saints-Pères ?",
        answer:
          "Non, Le Comptoir des Saints-Pères fonctionne exclusivement en accueil libre sans réservation, 7 jours sur 7. Vous pouvez vous installer directement en salle ou en terrasse à toute heure : pour un petit-déjeuner parisien dès 7h en semaine, un déjeuner tardif après une visite au Musée d'Orsay ou au Louvre, un apéritif ou un dîner jusqu'à 22h.",
      },
      {
        id: "acces-musees-transports",
        question: "Comment rejoindre le bistrot depuis le Louvre, le Musée d'Orsay ou en métro ?",
        answer:
          "Le restaurant est situé au 29 rue des Saints-Pères (Paris 6e), entre le boulevard Saint-Germain et les quais de Seine. En métro, descendez à Saint-Germain-des-Prés (ligne 4, 3 minutes à pied) ou à Rue du Bac (ligne 12, 5 minutes à pied). À pied, comptez 5 minutes depuis le Musée d'Orsay ou le Pont du Carrousel menant au Musée du Louvre.",
      },
      {
        id: "options-vegetariennes-services",
        question: "Proposez-vous des plats végétariens, le Wi-Fi et le paiement par carte ?",
        answer:
          "Oui, notre carte comprend plusieurs recettes végétariennes préparées minute : assiettes végétariennes chaudes ou froides, linguine à la burrata et basilic frais, burger végétarien au cheddar, omelettes plein air, quiche aux légumes et fromages affinés. L'établissement met à disposition un Wi-Fi gratuit, accepte les cartes bancaires dès 5 € et accueille les visiteurs en cinq langues.",
      },
    ],
    contactGroupsEyebrow: "GROUPES & RENSEIGNEMENTS",
    contactGroupsTitle: "Repas de groupe & petits-déjeuners à Saint-Germain",
    contactGroupsLead:
      "Si l'accueil quotidien au Comptoir des Saints-Pères se fait librement sans réservation pour les tables individuelles, notre équipe accompagne volontiers vos demandes particulières au 29 rue des Saints-Pères (Paris 6e) par téléphone ou par e-mail :",
    contactGroupsBullets: [
      "Tables de 1 à 6 convives : accueil immédiat sur place 7j/7 en salle ou en terrasse, sans réservation préalable.",
      "Repas de groupe (à partir de 8 convives) : contactez-nous en amont pour organiser votre déjeuner ou dîner de brasserie.",
      "Petits-déjeuners d'équipe ou rendez-vous matinaux : accueil dès 7h00 du lundi au vendredi à deux pas des maisons d'édition et galeries de la Rive Gauche.",
      "Objets oubliés, allergènes ou renseignements pratiques : réponse directe au 01 40 20 09 39 ou à christophe6eme@gmail.com.",
    ],
    contactFaq: [
      {
        id: "contact-terrasse-sans-reservation",
        question: "Comment venir déjeuner ou boire un verre en terrasse sans réserver ?",
        answer:
          "Le Comptoir des Saints-Pères accueille les visiteurs en continu 7 jours sur 7 au 29 rue des Saints-Pères (Paris 6e), sans prise de réservation pour les tables courantes. Présentez-vous directement auprès de notre équipe à votre arrivée pour choisir une table en salle ou sur notre terrasse parisienne.",
      },
      {
        id: "contact-acces-louvre-orsay",
        question: "À quelle distance à pied se trouvent le Musée d'Orsay et le Musée du Louvre ?",
        answer:
          "Située sur la Rive Gauche entre le boulevard Saint-Germain et la Seine, notre brasserie se rejoint en 5 minutes à pied depuis le Musée d'Orsay, le Pont du Carrousel du Louvre et l'École des Beaux-Arts, ou en 3 minutes depuis le métro Saint-Germain-des-Prés (ligne 4).",
      },
    ],
    legalLead:
      "La présente page rassemble les informations légales obligatoires du site officiel ausaintsperes.com, édité par la société SAS CHLOCERO exploitant la brasserie parisienne Le Comptoir des Saints-Pères au 29 rue des Saints-Pères (75006 Paris), conformément à la loi pour la confiance dans l'économie numérique (LCEN) et au Règlement général sur la protection des données (RGPD).",
    links: {
      exploreMenu: "Consulter la carte complète et les tarifs",
      practicalInfo: "Voir les horaires 7j/7 et l'accès métro",
      contactTeam: "Contacter le bistrot (téléphone & groupes)",
    },
  },

  en: {
    servesCuisine: ["French", "Brasserie", "Parisian Bistro"],
    paymentAccepted: "Cash, Credit Card",
    contactTypeLabel: "Customer enquiries",
    highlightsTitle: "Le Comptoir des Saints-Pères at a Glance",
    highlights: [
      {
        label: "Address & Left Bank location",
        detail:
          "29 rue des Saints-Pères, 75006 Paris — in the heart of Saint-Germain-des-Prés, a 5-minute walk from the Musée d'Orsay, the Louvre Museum and the École des Beaux-Arts.",
      },
      {
        label: "Open 7 days a week, walk-ins welcome",
        detail:
          "Open daily (Mon–Fri 7am–11:30pm, Sat 8am–10:30pm, Sun 9am–11pm): French breakfast 7am–11am, brasserie kitchen 12pm–10pm, bar and terrace all day without reservation.",
      },
      {
        label: "House specialties & artisan partners",
        detail:
          "Homemade egg mayonnaise, Burgundy snails, Poilâne sourdough croques, grilled meats and salmon, French raw-milk cheeses and Lili & Enzo artisan ice creams.",
      },
      {
        label: "Metro access, amenities & languages",
        detail:
          "Metro Saint-Germain-des-Prés (line 4) and Rue du Bac (line 12), Parisian sidewalk terrace, free Wi-Fi, credit cards accepted from €5, and full menu in 5 languages (FR, EN, ES, IT, DE).",
      },
    ],
    homeFaq: [
      {
        id: "what-we-offer",
        question: "What does Le Comptoir des Saints-Pères serve?",
        answer:
          "Le Comptoir des Saints-Pères serves authentic Parisian brasserie cuisine prepared fresh on site: homemade egg mayonnaise, Burgundy snails, toasted croques on Poilâne sourdough, beef tartare, ribeye steak, meal-sized salads, French cheeses, freshly squeezed juices, estate wines and house cocktails.",
      },
      {
        id: "where-we-are-located",
        question: "Where is Le Comptoir des Saints-Pères located in Paris?",
        answer:
          "The bistro is located at 29 rue des Saints-Pères in Paris's 6th arrondissement, in the heart of Saint-Germain-des-Prés, a five-minute walk from the Musée d'Orsay, the Louvre Museum, and Metro stations Saint-Germain-des-Prés (line 4) and Rue du Bac (line 12).",
      },
      {
        id: "why-choose-continuous-service",
        question: "Why choose our Left Bank brasserie with continuous walk-in service?",
        answer:
          "Open 7 days a week without reservation from morning until night, Le Comptoir des Saints-Pères welcomes guests indoors or on the sidewalk terrace for breakfast (7am–11am) and all-day brasserie dining (12pm–10pm), with menus in five languages.",
      },
    ],
    categoryLeads: {
      "cat-entrees":
        "Le Comptoir des Saints-Pères prepares traditional Parisian bistro starters and generous charcuterie and cheese boards to share indoors or on the terrace.",
      "cat-salades":
        "Our meal-sized salads combine crisp mesclun greens, market vegetables, French cheeses and warm toppings prepared to order throughout the day.",
      "cat-croques":
        "Every Parisian croque is baked golden on authentic Poilâne country sourdough bread and served with fresh green salad.",
      "cat-quiches":
        "Our kitchen serves savory French quiches with mesclun salad alongside traditional gratinated French onion soup all day long.",
      "cat-plats":
        "Main courses at Le Comptoir des Saints-Pères showcase butcher's cuts, hand-seasoned beef tartare, free-range roast chicken, grilled salmon and vegetarian recipes.",
      "cat-oeufs":
        "Our fried eggs and French omelettes are cooked to order exclusively with free-range eggs and accompanied by crisp green salad.",
      "cat-fromages":
        "Our cheese cellar highlights raw-milk Camembert, fresh goat cheese, Cantal and Bleu d'Auvergne served individually or as a sharing board.",
      "cat-desserts":
        "Homemade bistro desserts are served alongside artisan ice creams and fruit sorbets crafted by master ice-cream makers Lili & Enzo.",
      "cat-jus":
        "Freshly squeezed fruit and vegetable juices are pressed to order at the counter for a refreshing break at any hour.",
      "cat-cocktails":
        "Our bartenders mix classic cocktails, signature Saint-Germain elderflower creations and refreshing alcohol-free mocktails.",
      "cat-bieres":
        "Enjoy cold draft beers, Belgian abbey brews, craft IPA, sweet French cider and alcohol-free beer at the brass counter or terrace.",
      "cat-aperitifs":
        "Experience the Parisian apéritif hour in Saint-Germain-des-Prés with a classic Kir, Spritz, vermouth or house-made Americano.",
      "cat-vins":
        "Our cellar features French red, white and rosé estate wines as well as Champagnes available by the glass, carafe or bottle.",
      "cat-spiritueux":
        "The bar offers a curated selection of Scotch and Japanese whiskies, gins, vodkas, aged Caribbean rums and French fruit brandies.",
      "cat-boissons":
        "From morning espressos and Viennese hot chocolate to Comptoirs Richard teas and French mineral waters, drinks are served continuously 7 days a week.",
    },
    menuPageLead:
      "The menu at Le Comptoir des Saints-Pères brings together classic Parisian brasserie dishes prepared fresh daily at 29 rue des Saints-Pères (Paris 6th): traditional starters, meal-sized salads, toasted croques on Poilâne sourdough bread, free-range omelettes, grilled meats and salmon, French raw-milk cheeses, freshly squeezed juices, estate wines by the glass and house cocktails. All prices are net in euros, taxes and service included.",
    menuCraftTitle: "Selected Ingredients & Artisan Partners",
    menuCraftText:
      "True to the heritage of Saint-Germain-des-Prés bistros, Le Comptoir des Saints-Pères works with fresh market produce and renowned French artisans:",
    menuCraftBullets: [
      "Croque-Monsieur, Croque-Madame and open-faced toasts served on iconic Poilâne country sourdough bread.",
      "Free-range eggs used for all cooked-to-order plain, ham, cheese, mushroom and burrata omelettes.",
      "Artisan ice creams and sorbets crafted by Lili & Enzo alongside house desserts (crème brûlée, chocolate mousse, warm tarte Tatin).",
      "Curated French wine list served by the glass (14 cL), carafe (25 cL, 50 cL) or bottle (75 cL).",
    ],
    practicalFactsTitle: "Practical Bistro Facts",
    practicalFacts: [
      { label: "Establishment", value: "Le Comptoir des Saints-Pères — Traditional Parisian Brasserie & Bistro" },
      { label: "Address", value: "29 rue des Saints-Pères, 75006 Paris (Saint-Germain-des-Prés)" },
      { label: "Opening Hours (7/7)", value: "Mon–Fri 7am–11:30pm · Sat 8am–10:30pm · Sun 9am–11pm (continuous kitchen 12pm–10pm)" },
      { label: "Metro & Nearby Museums", value: "Saint-Germain-des-Prés (line 4) & Rue du Bac (line 12) — 5 min walk from the Louvre and Musée d'Orsay" },
      { label: "Phone & Walk-in Policy", value: "+33 1 40 20 09 39 — Continuous walk-in seating all day indoors and on the terrace, no reservation needed" },
    ],
    infosGuideEyebrow: "VISITOR GUIDE",
    infosGuideTitle: "Planning Your Visit in Saint-Germain-des-Prés",
    infosFaq: [
      {
        id: "walk-in-policy",
        question: "Do I need a reservation at Le Comptoir des Saints-Pères?",
        answer:
          "No reservation is needed: Le Comptoir des Saints-Pères welcomes walk-in guests all day, 7 days a week. You can take a seat directly inside the dining room or on our Parisian terrace for morning coffee and breakfast from 7am on weekdays, a relaxed lunch after visiting the Louvre or Musée d'Orsay, afternoon drinks or dinner until 10pm.",
      },
      {
        id: "getting-there-museums",
        question: "How do I get to the bistro from the Louvre, Musée d'Orsay or by Metro?",
        answer:
          "Le Comptoir des Saints-Pères is located at 29 rue des Saints-Pères in Paris's 6th arrondissement, between Boulevard Saint-Germain and the Seine riverbanks. Take Metro line 4 to Saint-Germain-des-Prés (3-minute walk) or line 12 to Rue du Bac (5-minute walk). Both the Musée d'Orsay and the Louvre's Pont du Carrousel entrance are a 5-minute walk away.",
      },
      {
        id: "vegetarian-wifi-payment",
        question: "Are vegetarian dishes, free Wi-Fi and card payments available?",
        answer:
          "Yes, our menu features generous vegetarian options prepared to order, including warm and cold vegetarian plates, burrata and fresh basil linguine, a cheddar veggie burger, vegetable quiche, free-range omelettes and French cheeses. Complimentary Wi-Fi is available for guests, credit cards are accepted from €5, and menus are available in five languages.",
      },
    ],
    contactGroupsEyebrow: "GROUPS & ENQUIRIES",
    contactGroupsTitle: "Group Dining & Morning Gatherings in Saint-Germain",
    contactGroupsLead:
      "While everyday dining for couples, families and small tables at Le Comptoir des Saints-Pères requires no reservation, our team is happy to assist with special arrangements at 29 rue des Saints-Pères (Paris 6th) by phone or email:",
    contactGroupsBullets: [
      "Tables of 1 to 6 guests: walk right in 7 days a week for indoor or terrace seating, no booking required.",
      "Group meals (8 guests or more): call or email ahead so we can prepare a dedicated brasserie table for your party.",
      "Business breakfasts & morning meetings: open from 7:00am Monday to Friday in the heart of the Left Bank gallery district.",
      "Lost property, allergen details or general enquiries: reach us directly at +33 1 40 20 09 39 or christophe6eme@gmail.com.",
    ],
    contactFaq: [
      {
        id: "contact-walk-in-terrace",
        question: "Can we visit for lunch, dinner or terrace drinks without booking ahead?",
        answer:
          "Yes, Le Comptoir des Saints-Pères operates on a continuous walk-in basis 7 days a week at 29 rue des Saints-Pères (Paris 6th). Simply arrive at your convenience and our staff will seat you in the main brasserie dining room or out on the Parisian sidewalk terrace.",
      },
      {
        id: "contact-walking-louvre-orsay",
        question: "How far is the bistro on foot from the Louvre Museum and Musée d'Orsay?",
        answer:
          "Located on the Left Bank between Boulevard Saint-Germain and the Seine, Le Comptoir des Saints-Pères is a 5-minute walk from both the Musée d'Orsay and the Pont du Carrousel leading directly into the Louvre, and 3 minutes from Saint-Germain-des-Prés Metro station (line 4).",
      },
    ],
    legalLead:
      "This page provides the mandatory statutory disclosures for the official website ausaintsperes.com, published by SAS CHLOCERO operating the Parisian brasserie Le Comptoir des Saints-Pères at 29 rue des Saints-Pères (75006 Paris, France), in accordance with French digital law (LCEN) and the European General Data Protection Regulation (GDPR).",
    links: {
      exploreMenu: "Explore our full menu and prices",
      practicalInfo: "Check opening hours and Metro access",
      contactTeam: "Contact the bistro (phone & groups)",
    },
  },

  es: {
    servesCuisine: ["Cocina francesa", "Brasserie", "Bistró parisino"],
    paymentAccepted: "Efectivo, Tarjeta bancaria",
    contactTypeLabel: "Información y atención al cliente",
    highlightsTitle: "Le Comptoir des Saints-Pères de un vistazo",
    highlights: [
      {
        label: "Dirección y barrio histórico",
        detail:
          "29 rue des Saints-Pères, 75006 París — en pleno Saint-Germain-des-Prés, a 5 minutos a pie del Museo de Orsay, del Museo del Louvre y de la Escuela de Bellas Artes.",
      },
      {
        label: "Abierto los 7 días sin reserva",
        detail:
          "Horario continuo todos los días (lun–vie 7:00–23:30, sáb 8:00–22:30, dom 9:00–23:00): desayunos de 7:00 a 11:00, cocina de brasserie de 12:00 a 22:00 y terraza todo el día.",
      },
      {
        label: "Especialidades caseras y artesanos",
        detail:
          "Huevos con mayonesa casera, caracoles de Borgoña, croques en pan Poilâne, carnes a la parrilla, quesos franceses y helados artesanales Lili & Enzo.",
      },
      {
        label: "Acceso en metro, servicios e idiomas",
        detail:
          "Metro Saint-Germain-des-Prés (línea 4) y Rue du Bac (línea 12), terraza parisina, Wi-Fi gratuito, pago con tarjeta desde 5 € y carta en 5 idiomas (FR, EN, ES, IT, DE).",
      },
    ],
    homeFaq: [
      {
        id: "que-ofrece-bistro",
        question: "¿Qué ofrece Le Comptoir des Saints-Pères?",
        answer:
          "Le Comptoir des Saints-Pères ofrece cocina tradicional de brasserie parisina elaborada en casa: huevos con mayonesa, caracoles de Borgoña, croques en pan Poilâne, steak tartar, entrecot, ensaladas completas, quesos franceses, zumos naturales, vinos por copa y cócteles.",
      },
      {
        id: "donde-esta-ubicado",
        question: "¿Dónde se encuentra Le Comptoir des Saints-Pères en París?",
        answer:
          "El bistró está ubicado en el 29 rue des Saints-Pères, en el distrito 6 de París (Saint-Germain-des-Prés), a cinco minutos a pie del Museo de Orsay, del Museo del Louvre y de las estaciones de metro Saint-Germain-des-Prés (línea 4) y Rue du Bac (línea 12).",
      },
      {
        id: "por-que-elegir-servicio-continuo",
        question: "¿Por qué elegir nuestra brasserie con servicio continuo los 7 días?",
        answer:
          "Abierto los 7 días de la semana sin necesidad de reserva, el restaurante recibe a visitantes y parisinos en salón o terraza desde el desayuno (7:00–11:00) hasta la cena (12:00–22:00), con carta traducida íntegramente al español.",
      },
    ],
    categoryLeads: {
      "cat-entrees":
        "Le Comptoir des Saints-Pères elabora en casa los entrantes clásicos del bistró parisino y generosas tablas de embutidos y quesos para compartir.",
      "cat-salades":
        "Nuestras ensaladas completas se preparan al momento con brotes tiernos de mézclum, verduras frescas, quesos franceses y guarniciones calientes.",
      "cat-croques":
        "Todos nuestros croques parisinos se gratinan sobre auténtico pan de masa madre de la casa Poilâne y se sirven con ensalada verde.",
      "cat-quiches":
        "Nuestra cocina ofrece durante todo el día quiches caseras con mézclum y la tradicional sopa de cebolla gratinada francesa.",
      "cat-plats":
        "Los platos principales de Le Comptoir des Saints-Pères destacan por sus carnes seleccionadas, tartar de ternera preparado al momento, pollo de corral, salmón a la parrilla y opciones vegetarianas.",
      "cat-oeufs":
        "Nuestros huevos fritos y tortillas variadas se cocinan al instante exclusivamente con huevos camperos y se acompañan de ensalada verde.",
      "cat-fromages":
        "Nuestra selección de quesos franceses reúne Camembert de leche cruda, queso fresco de cabra, Cantal y Bleu d'Auvergne en plato o tabla.",
      "cat-desserts":
        "Los postres caseros del bistró se acompañan de los helados y sorbetes artesanales elaborados por los maestros heladeros Lili & Enzo.",
      "cat-jus":
        "Exprimimos al momento nuestros zumos naturales de frutas y verduras frescas en la barra a cualquier hora del día.",
      "cat-cocktails":
        "El bar de Le Comptoir des Saints-Pères prepara cócteles clásicos, creaciones con licor Saint-Germain y refrescantes cócteles sin alcohol.",
      "cat-bieres":
        "Disfrute de cervezas de barril bien frías, cervezas de abadía, IPA artesanal, sidra dulce francesa y cerveza sin alcohol en sala o terraza.",
      "cat-aperitifs":
        "Viva la hora del aperitivo en Saint-Germain-des-Prés con un Kir Royal, un Spritz, un vermut o un Americano preparado en casa.",
      "cat-vins":
        "Nuestra bodega selecciona vinos tintos, blancos y rosados de viñedos franceses, así como champanes servidos por copa, jarra o botella.",
      "cat-spiritueux":
        "La barra ofrece una cuidada carta de whiskys escoceses y japoneses, ginebras, vodkas, rones añejos y aguardientes de frutas.",
      "cat-boissons":
        "Desde el café expreso matinal y el chocolate vienés hasta los tés Comptoirs Richard y aguas minerales, servimos bebidas de forma continua los 7 días.",
    },
    menuPageLead:
      "La carta de Le Comptoir des Saints-Pères reúne las grandes recetas de la brasserie parisina elaboradas a diario en el 29 rue des Saints-Pères (París 6): entrantes tradicionales, ensaladas completas, croques dorados en pan Poilâne, tortillas de huevos camperos, carnes y salmón a la parrilla, quesos franceses, zumos recién exprimidos, vinos por copa y cócteles de la casa. Precios netos en euros, impuestos y servicio incluidos.",
    menuCraftTitle: "Productos frescos y artesanos colaboradores",
    menuCraftText:
      "Fiel a la tradición de los bistrós de Saint-Germain-des-Prés, Le Comptoir des Saints-Pères selecciona ingredientes frescos y casas artesanas de referencia:",
    menuCraftBullets: [
      "Croque-Monsieur, Croque-Madame y tostadas preparados con el célebre pan de masa madre Poilâne.",
      "Huevos camperos para todas nuestras tortillas hechas al momento y huevos fritos con ensalada.",
      "Helados y sorbetes artesanales de Lili & Enzo junto a nuestros postres caseros (crème brûlée, mousse de chocolate, tarta Tatin tibia).",
      "Selección de vinos franceses servidos por copa (14 cL), jarra (25 cL, 50 cL) o botella (75 cL).",
    ],
    practicalFactsTitle: "Ficha práctica del establecimiento",
    practicalFacts: [
      { label: "Establecimiento", value: "Le Comptoir des Saints-Pères — Brasserie y bistró parisino tradicional" },
      { label: "Dirección", value: "29 rue des Saints-Pères, 75006 París (Saint-Germain-des-Prés)" },
      { label: "Horarios (7/7)", value: "Lun–Vie 7:00–23:30 · Sáb 8:00–22:30 · Dom 9:00–23:00 (cocina continua 12:00–22:00)" },
      { label: "Metro y museos cercanos", value: "Saint-Germain-des-Prés (línea 4) y Rue du Bac (línea 12) — a 5 min a pie del Louvre y del Museo de Orsay" },
      { label: "Teléfono y acceso sin reserva", value: "+33 1 40 20 09 39 — Servicio continuo sin reserva durante todo el día en comedor y terraza" },
    ],
    infosGuideEyebrow: "GUÍA PRÁCTICA",
    infosGuideTitle: "Prepare su visita en Saint-Germain-des-Prés",
    infosFaq: [
      {
        id: "reserva-servicio-continuo",
        question: "¿Es necesario reservar mesa en Le Comptoir des Saints-Pères?",
        answer:
          "No hace falta reservar: Le Comptoir des Saints-Pères atiende de forma continua sin reserva los 7 días de la semana. Puede sentarse directamente en el comedor o en la terraza para desayunar desde las 7:00 entre semana, almorzar después de visitar el Museo de Orsay o el Louvre, tomar un aperitivo o cenar hasta las 22:00.",
      },
      {
        id: "como-llegar-museos",
        question: "¿Cómo llegar desde el Louvre, el Museo de Orsay o en metro?",
        answer:
          "El bistró está situado en el 29 rue des Saints-Pères (París 6), entre el bulevar Saint-Germain y el Sena. En metro, baje en Saint-Germain-des-Prés (línea 4, a 3 minutos a pie) o en Rue du Bac (línea 12, a 5 minutos). Tanto el Museo de Orsay como el Puente del Carrusel del Louvre se encuentran a 5 minutos caminando.",
      },
      {
        id: "opciones-vegetarianas-servicios",
        question: "¿Ofrecen platos vegetarianos, Wi-Fi gratuito y pago con tarjeta?",
        answer:
          "Sí, nuestra carta incluye platos vegetarianos fríos y calientes, linguine con burrata y albahaca, hamburguesa vegetariana con cheddar, quiche de verduras, tortillas camperas y tabla de quesos. Disponemos de Wi-Fi gratuito, aceptamos tarjetas bancarias a partir de 5 € y contamos con carta completa en español y otros cuatro idiomas.",
      },
    ],
    contactGroupsEyebrow: "GRUPOS Y CONSULTAS",
    contactGroupsTitle: "Comidas de grupo y desayunos en Saint-Germain",
    contactGroupsLead:
      "Aunque el acceso diario para parejas, familias y mesas pequeñas es libre y sin reserva, nuestro equipo atiende encantado sus solicitudes especiales en el 29 rue des Saints-Pères (París 6) por teléfono o correo electrónico:",
    contactGroupsBullets: [
      "Mesas de 1 a 6 comensales: bienvenida directa los 7 días en salón o terraza sin necesidad de reserva.",
      "Grupos (a partir de 8 personas): llámenos o escríbanos con antelación para organizar su almuerzo o cena en el bistró.",
      "Desayunos profesionales y reuniones matinales: abiertos desde las 7:00 de lunes a viernes en el corazón de la Rive Gauche.",
      "Objetos olvidados, alérgenos o consultas prácticas: atención directa en el +33 1 40 20 09 39 o en christophe6eme@gmail.com.",
    ],
    contactFaq: [
      {
        id: "contacto-terraza-sin-reserva",
        question: "¿Podemos acudir a almorzar, cenar o tomar algo en terraza sin reservar?",
        answer:
          "Sí, Le Comptoir des Saints-Pères funciona con acceso libre sin reserva los 7 días de la semana en el 29 rue des Saints-Pères (París 6). Solo tiene que acercarse cuando lo desee y nuestro equipo le acomodará en el salón interior o en nuestra terraza parisina.",
      },
      {
        id: "contacto-distancia-louvre-orsay",
        question: "¿A qué distancia a pie se encuentran el Museo del Louvre y el Museo de Orsay?",
        answer:
          "Situada en la Rive Gauche entre el bulevar Saint-Germain y el río Sena, nuestra brasserie está a solo 5 minutos a pie tanto del Museo de Orsay como del Puente del Carrusel que accede al Louvre, y a 3 minutos del metro Saint-Germain-des-Prés (línea 4).",
      },
    ],
    legalLead:
      "Esta página reúne la información legal obligatoria del sitio web oficial ausaintsperes.com, editado por la sociedad SAS CHLOCERO que explota la brasserie parisina Le Comptoir des Saints-Pères en el 29 rue des Saints-Pères (75006 París, Francia), de conformidad con la legislación francesa (LCEN) y el Reglamento General de Protección de Datos (RGPD).",
    links: {
      exploreMenu: "Ver la carta completa y los precios",
      practicalInfo: "Consultar horarios y cómo llegar en metro",
      contactTeam: "Contactar con el bistró (teléfono y grupos)",
    },
  },

  it: {
    servesCuisine: ["Cucina francese", "Brasserie", "Bistrot parigino"],
    paymentAccepted: "Contanti, Carta di credito",
    contactTypeLabel: "Informazioni e accoglienza clienti",
    highlightsTitle: "Le Comptoir des Saints-Pères in sintesi",
    highlights: [
      {
        label: "Indirizzo e quartiere storico",
        detail:
          "29 rue des Saints-Pères, 75006 Parigi — nel cuore di Saint-Germain-des-Prés, a 5 minuti a piedi dal Museo d'Orsay, dal Museo del Louvre e dall'École des Beaux-Arts.",
      },
      {
        label: "Aperto 7 giorni su 7 senza prenotazione",
        detail:
          "Orario continuato tutti i giorni (lun–ven 7:00–23:30, sab 8:00–22:30, dom 9:00–23:00): colazioni dalle 7:00 alle 11:00, cucina brasserie dalle 12:00 alle 22:00 e terrazza tutto il giorno.",
      },
      {
        label: "Specialità della casa e artigiani partner",
        detail:
          "Uova con maionese fatta in casa, lumache di Borgogna, croque su pane Poilâne, carni alla griglia, formaggi francesi e gelati artigianali Lili & Enzo.",
      },
      {
        label: "Metro, comfort e menù multilingue",
        detail:
          "Metro Saint-Germain-des-Prés (linea 4) e Rue du Bac (linea 12), terrazza parigina, Wi-Fi gratuito, pagamento con carta da 5 € e menù tradotto in 5 lingue (FR, EN, ES, IT, DE).",
      },
    ],
    homeFaq: [
      {
        id: "cosa-propone-bistrot",
        question: "Cosa propone Le Comptoir des Saints-Pères?",
        answer:
          "Le Comptoir des Saints-Pères propone una cucina tradizionale da brasserie parigina preparata al momento: uova con maionese fatta in casa, lumache di Borgogna, croque su pane Poilâne, tartare di manzo, entrecôte, grandi insalate, formaggi francesi, spremute fresche, vini al calice e cocktail.",
      },
      {
        id: "dove-si-trova-parigi",
        question: "Dove si trova Le Comptoir des Saints-Pères a Parigi?",
        answer:
          "Il bistrot si trova al 29 rue des Saints-Pères nel 6° arrondissement di Parigi, nel cuore di Saint-Germain-des-Prés, a cinque minuti a piedi dal Museo d'Orsay, dal Museo del Louvre e dalle fermate metro Saint-Germain-des-Prés (linea 4) e Rue du Bac (linea 12).",
      },
      {
        id: "perche-scegliere-orario-continuato",
        question: "Perché scegliere la nostra brasserie con orario continuato 7 giorni su 7?",
        answer:
          "Aperto 7 giorni su 7 senza prenotazione dalla mattina alla sera, il locale accoglie liberamente gli ospiti in sala o sulla terrazza parigina dalla colazione (7:00–11:00) alla cena (12:00–22:00), con il menù completo tradotto in italiano.",
      },
    ],
    categoryLeads: {
      "cat-entrees":
        "Le Comptoir des Saints-Pères prepara in casa gli antipasti classici del bistrot parigino e ricchi taglieri di salumi e formaggi da condividere.",
      "cat-salades":
        "Le nostre grandi insalate vengono composte al momento con misticanza fresca, verdure di mercato, formaggi francesi e guarnizioni calde.",
      "cat-croques":
        "Tutti i nostri croque parigini sono dorati al forno sull'autentico pane a lievitazione naturale Poilâne e serviti con insalata verde.",
      "cat-quiches":
        "La nostra cucina serve a ogni ora quiche salate con insalatina novella e la tradizionale zuppa di cipolle gratinata alla francese.",
      "cat-plats":
        "I piatti principali di Le Comptoir des Saints-Pères valorizzano tagli di carne scelti, tartare di manzo preparata al momento, pollo ruspante, salmone alla griglia e ricette vegetariane.",
      "cat-oeufs":
        "Le nostre uova al tegamino e le omelette farcite vengono cucinate espresse esclusivamente con uova da allevamento all'aperto.",
      "cat-fromages":
        "La selezione di formaggi francesi comprende Camembert a latte crudo, caprino fresco, Cantal e Bleu d'Auvergne al piatto o in tagliere.",
      "cat-desserts":
        "I dolci fatti in casa del bistrot sono accompagnati dai gelati e sorbetti artigianali firmati dai maestri gelatieri Lili & Enzo.",
      "cat-jus":
        "Le nostre spremute fresche di frutta e verdura vengono preparate al minuto al bancone per una pausa rigenerante in qualsiasi momento.",
      "cat-cocktails":
        "Il bar di Le Comptoir des Saints-Pères realizza grandi classici della miscelazione, creazioni al liquore Saint-Germain e cocktail analcolici.",
      "cat-bieres":
        "Gustate birre alla spina, birre d'abbazia, IPA artigianale, sidro dolce francese e birra analcolica al banco in ottone o in terrazza.",
      "cat-aperitifs":
        "Vivete il rito dell'aperitivo a Saint-Germain-des-Prés con un Kir Royal, uno Spritz, un vermouth o un Americano preparato in casa.",
      "cat-vins":
        "La nostra cantina riunisce vini rossi, bianchi e rosati di produttori francesi e Champagne serviti al calice, in caraffa o in bottiglia.",
      "cat-spiritueux":
        "Il bancone propone un'accurata selezione di whisky scozzesi e giapponesi, gin, vodka, rum invecchiati e acquaviti di frutta.",
      "cat-boissons":
        "Dal caffè espresso del mattino alla cioccolata viennese, dai tè Comptoirs Richard alle acque minerali, le bevande sono servite con orario continuato 7/7.",
    },
    menuPageLead:
      "Il menù di Le Comptoir des Saints-Pères riunisce i grandi classici della brasserie parigina preparati in casa al 29 rue des Saints-Pères (Parigi 6): antipasti tradizionali, ricche insalate, croque dorati su pane Poilâne, omelette di uova allevate all'aperto, carni e salmone alla griglia, formaggi a latte crudo, spremute fresche, vini al calice e cocktail della casa. Tutti i prezzi sono netti in euro, tasse e servizio inclusi.",
    menuCraftTitle: "Ingredienti selezionati e artigiani partner",
    menuCraftText:
      "Fedele alla tradizione dei bistrot di Saint-Germain-des-Prés, Le Comptoir des Saints-Pères valorizza prodotti freschi e artigiani francesi d'eccellenza:",
    menuCraftBullets: [
      "Croque-Monsieur, Croque-Madame e bruschette preparati sull'iconico pane a lievitazione naturale Poilâne.",
      "Uova da allevamento all'aperto per tutte le omelette espresse e le uova al tegamino con insalata.",
      "Gelati e sorbetti artigianali firmati Lili & Enzo accanto ai dolci della casa (crème brûlée, mousse al cioccolato, tarte Tatin tiepida).",
      "Cantina francese servita al calice (14 cL), in caraffa (25 cL, 50 cL) o in bottiglia (75 cL).",
    ],
    practicalFactsTitle: "Scheda pratica del locale",
    practicalFacts: [
      { label: "Locale", value: "Le Comptoir des Saints-Pères — Brasserie e bistrot parigino tradizionale" },
      { label: "Indirizzo", value: "29 rue des Saints-Pères, 75006 Parigi (Saint-Germain-des-Prés)" },
      { label: "Orari di apertura (7/7)", value: "Lun–Ven 7:00–23:30 · Sab 8:00–22:30 · Dom 9:00–23:00 (cucina continuata 12:00–22:00)" },
      { label: "Metro e musei vicini", value: "Saint-Germain-des-Prés (linea 4) e Rue du Bac (linea 12) — a 5 min a piedi dal Louvre e dal Museo d'Orsay" },
      { label: "Telefono e ingresso libero", value: "+33 1 40 20 09 39 — Accoglienza senza prenotazione tutto il giorno in sala e in terrazza" },
    ],
    infosGuideEyebrow: "GUIDA PRATICA",
    infosGuideTitle: "Organizzare la visita a Saint-Germain-des-Prés",
    infosFaq: [
      {
        id: "prenotazione-orario-continuato",
        question: "Serve la prenotazione da Le Comptoir des Saints-Pères?",
        answer:
          "No, Le Comptoir des Saints-Pères accoglie gli ospiti liberamente senza prenotazione, 7 giorni su 7 con orario continuato. Potete accomodarvi direttamente in sala o in terrazza per la colazione parigina dalle 7:00 nei giorni feriali, un pranzo dopo il Museo d'Orsay o il Louvre, un aperitivo o la cena fino alle 22:00.",
      },
      {
        id: "come-arrivare-musei",
        question: "Come raggiungere il bistrot dal Louvre, dal Museo d'Orsay o in metropolitana?",
        answer:
          "Il ristorante si trova al 29 rue des Saints-Pères (Parigi 6), tra boulevard Saint-Germain e la Senna. In metropolitana scendete a Saint-Germain-des-Prés (linea 4, 3 minuti a piedi) o a Rue du Bac (linea 12, 5 minuti a piedi). Il Museo d'Orsay e il Pont du Carrousel per il Louvre distano appena 5 minuti a piedi.",
      },
      {
        id: "piatti-vegetariani-servizi",
        question: "Ci sono piatti vegetariani, Wi-Fi gratuito e pagamento con carta?",
        answer:
          "Sì, il menù propone piatti vegetariani caldi e freddi, linguine con burrata e basilico fresco, burger vegetariano al cheddar, quiche alle verdure, omelette e formaggi francesi. Il locale offre Wi-Fi gratuito, accetta carte di credito a partire da 5 € e mette a disposizione il menù completo in italiano e in altre quattro lingue.",
      },
    ],
    contactGroupsEyebrow: "GRUPPI E RICHIESTE",
    contactGroupsTitle: "Pranzi di gruppo e colazioni a Saint-Germain",
    contactGroupsLead:
      "Sebbene l'accoglienza quotidiana per coppie, famiglie e piccoli tavoli avvenga sempre senza prenotazione, il nostro staff è a disposizione per richieste particolari al 29 rue des Saints-Pères (Parigi 6) per telefono o e-mail:",
    contactGroupsBullets: [
      "Tavoli da 1 a 6 ospiti: accoglienza immediata 7 giorni su 7 in sala o in terrazza, senza prenotazione.",
      "Gruppi (da 8 persone in su): contattateci in anticipo per organizzare al meglio il vostro pranzo o la vostra cena.",
      "Colazioni di lavoro e incontri mattutini: apertura dalle 7:00 dal lunedì al venerdì nel cuore della Rive Gauche.",
      "Oggetti smarriti, allergeni o informazioni pratiche: risposta diretta al +33 1 40 20 09 39 o a christophe6eme@gmail.com.",
    ],
    contactFaq: [
      {
        id: "contatti-terrazza-senza-prenotazione",
        question: "Possiamo venire a pranzo, a cena o in terrazza senza prenotare?",
        answer:
          "Sì, Le Comptoir des Saints-Pères accoglie gli ospiti senza prenotazione 7 giorni su 7 al 29 rue des Saints-Pères (Parigi 6). Presentatevi liberamente all'orario che preferite e il nostro personale vi farà accomodare nella sala interna o sulla terrazza parigina.",
      },
      {
        id: "contatti-distanza-louvre-orsay",
        question: "Quanto distano a piedi il Museo del Louvre e il Museo d'Orsay?",
        answer:
          "Situata sulla Rive Gauche tra boulevard Saint-Germain e la Senna, la nostra brasserie dista 5 minuti a piedi sia dal Museo d'Orsay sia dal Pont du Carrousel per il Museo del Louvre, e 3 minuti dalla fermata metro Saint-Germain-des-Prés (linea 4).",
      },
    ],
    legalLead:
      "Questa pagina raccoglie le note legali obbligatorie del sito ufficiale ausaintsperes.com, pubblicato dalla società SAS CHLOCERO che gestisce la brasserie parigina Le Comptoir des Saints-Pères al 29 rue des Saints-Pères (75006 Parigi, Francia), in conformità con la normativa francese (LCEN) e il Regolamento generale sulla protezione dei dati (GDPR).",
    links: {
      exploreMenu: "Scopri il menù completo e i prezzi",
      practicalInfo: "Orari di apertura e come arrivare in metro",
      contactTeam: "Contatta il bistrot (telefono e gruppi)",
    },
  },

  de: {
    servesCuisine: ["Französische Küche", "Brasserie", "Pariser Bistro"],
    paymentAccepted: "Bargeld, Kreditkarte",
    contactTypeLabel: "Gästeinformation & Kontakt",
    highlightsTitle: "Le Comptoir des Saints-Pères auf einen Blick",
    highlights: [
      {
        label: "Adresse & historisches Viertel",
        detail:
          "29 rue des Saints-Pères, 75006 Paris — mitten in Saint-Germain-des-Prés, 5 Gehminuten vom Musée d'Orsay, dem Louvre und der École des Beaux-Arts entfernt.",
      },
      {
        label: "7 Tage durchgehend ohne Reservierung",
        detail:
          "Täglich geöffnet (Mo–Fr 7:00–23:30, Sa 8:00–22:30, So 9:00–23:00 Uhr): Frühstück 7:00–11:00 Uhr, Brasserie-Küche 12:00–22:00 Uhr sowie Bar und Terrasse durchgehend.",
      },
      {
        label: "Hausgemachte Klassiker & Partner",
        detail:
          "Hausgemachte Eier-Mayonnaise, Weinbergschnecken, Croques auf Poilâne-Brot, Grillgerichte, französischer Käse und handwerkliches Eis von Lili & Enzo.",
      },
      {
        label: "Metro-Anbindung, Service & Sprachen",
        detail:
          "Metro Saint-Germain-des-Prés (Linie 4) und Rue du Bac (Linie 12), Pariser Terrasse, kostenloses WLAN, Kartenzahlung ab 5 € und Speisekarte in 5 Sprachen (FR, EN, ES, IT, DE).",
      },
    ],
    homeFaq: [
      {
        id: "was-bietet-das-bistro",
        question: "Was bietet das Le Comptoir des Saints-Pères an?",
        answer:
          "Das Le Comptoir des Saints-Pères serviert klassische Pariser Brasserie-Küche aus frischer Zubereitung: Eier-Mayonnaise, Burgunder Weinbergschnecken, Croques auf Poilâne-Brot, Rindertatar, Entrecôte, große Salate, französischen Käse, frisch gepresste Säfte, offene Weine und Hauscocktails.",
      },
      {
        id: "wo-befindet-sich-das-bistro",
        question: "Wo befindet sich das Le Comptoir des Saints-Pères in Paris?",
        answer:
          "Das Bistro liegt in der 29 rue des Saints-Pères im 6. Pariser Arrondissement (Saint-Germain-des-Prés), nur fünf Gehminuten vom Musée d'Orsay, dem Louvre sowie den Metrostationen Saint-Germain-des-Prés (Linie 4) und Rue du Bac (Linie 12) entfernt.",
      },
      {
        id: "warum-durchgehender-service",
        question: "Warum unsere Brasserie mit durchgehendem Service ohne Reservierung wählen?",
        answer:
          "An 7 Tagen pro Woche durchgehend ohne Reservierung geöffnet, empfängt das Haus Gäste im Gastraum oder auf der Pariser Terrasse vom Frühstück (7:00–11:00 Uhr) bis zum Abendessen (12:00–22:00 Uhr) mit einer vollständig auf Deutsch übersetzten Karte.",
      },
    ],
    categoryLeads: {
      "cat-entrees":
        "Das Le Comptoir des Saints-Pères bereitet klassische Pariser Bistro-Vorspeisen sowie großzügige Wurst- und Käseplatten zum Teilen frisch im Haus zu.",
      "cat-salades":
        "Unsere großen Hauptspeisen-Salate werden frisch mit jungem Mesclun-Salat, Marktgemüse, französischem Käse und warmen Beilagen angerichtet.",
      "cat-croques":
        "Alle Pariser Croques werden auf originalem Sauerteigbrot der Traditionsbäckerei Poilâne goldbraun gebacken und mit grünem Salat serviert.",
      "cat-quiches":
        "Unsere Küche serviert durchgehend herzhafte Quiches mit Mesclun-Salat sowie die klassische gratinierte französische Zwiebelsuppe.",
      "cat-plats":
        "Die Hauptgerichte im Le Comptoir des Saints-Pères vereinen ausgewählte Fleischstücke, frisch angemachtes Rindertatar, Freilandhähnchen, gegrillten Lachs und vegetarische Küche.",
      "cat-oeufs":
        "Unsere Spiegeleier und gefüllten Omelettes werden frisch auf Bestellung ausschließlich aus Freilandeiern zubereitet.",
      "cat-fromages":
        "Unsere Käseauswahl umfasst Rohmilch-Camembert, frischen Ziegenkäse, Cantal und Bleu d'Auvergne als Teller oder Platte zum Teilen.",
      "cat-desserts":
        "Zu unseren hausgemachten Bistro-Desserts servieren wir handwerkliches Eis und Fruchtsorbets der Eismeister Lili & Enzo.",
      "cat-jus":
        "Unsere frischen Obst- und Gemüsesäfte werden zu jeder Tageszeit direkt am Tresen frisch gepresst.",
      "cat-cocktails":
        "Die Bar des Le Comptoir des Saints-Pères mixt zeitlose Cocktail-Klassiker, Hauskreationen mit Saint-Germain-Likör und alkoholfreie Mocktails.",
      "cat-bieres":
        "Genießen Sie frisch gezapftes Fassbier, Abteibier, handwerkliches IPA, milden Cidre und alkoholfreies Bier im Saal oder auf der Terrasse.",
      "cat-aperitifs":
        "Erleben Sie die Pariser Aperitif-Kultur in Saint-Germain-des-Prés bei einem Kir Royal, Spritz, Wermut oder hausgemachten Americano.",
      "cat-vins":
        "Unser Weinkeller führt französische Rot-, Weiß- und Roséweine sowie Champagner im offenen Ausschank, in der Karaffe oder als Flasche.",
      "cat-spiritueux":
        "Am Messingtresen erwartet Sie eine feine Auswahl an schottischen und japanischen Whiskys, Gins, Wodkas, gereiften Rums und Obstbränden.",
      "cat-boissons":
        "Vom morgendlichen Espresso und Wiener Schokolade über Tees von Comptoirs Richard bis zu Mineralwasser servieren wir Getränke durchgehend an 7 Tagen.",
    },
    menuPageLead:
      "Die Speisekarte des Le Comptoir des Saints-Pères vereint frisch zubereitete Klassiker der Pariser Brasserie-Küche in der 29 rue des Saints-Pères (Paris 6.): traditionelle Vorspeisen, große Salate, knusprige Croques auf Poilâne-Brot, Omelettes aus Freilandeiern, Fleisch- und Lachsgerichte vom Grill, Rohmilchkäse, frisch gepresste Säfte, offene Weine und Hauscocktails. Alle Preise verstehen sich netto in Euro inklusive Steuern und Bedienung.",
    menuCraftTitle: "Ausgewählte Zutaten & Handwerkspartner",
    menuCraftText:
      "Ganz in der Tradition der Bistros von Saint-Germain-des-Prés setzt das Le Comptoir des Saints-Pères auf frische Marktküche und renommierte französische Handwerksbetriebe:",
    menuCraftBullets: [
      "Croque-Monsieur, Croque-Madame und Röstbrote auf dem berühmten Sauerteigbrot der Bäckerei Poilâne.",
      "Freilandeier für alle frisch zubereiteten Omelettes und Spiegeleier mit grünem Salat.",
      "Handwerkliches Eis und Sorbets von Lili & Enzo neben unseren Hausdesserts (Crème brûlée, Mousse au Chocolat, lauwarme Tarte Tatin).",
      "Französische Weinauswahl im Glas (14 cL), in der Karaffe (25 cL, 50 cL) oder als Flasche (75 cL).",
    ],
    practicalFactsTitle: "Praktischer Überblick zum Bistro",
    practicalFacts: [
      { label: "Haus", value: "Le Comptoir des Saints-Pères — Traditionelle Pariser Brasserie & Bistro" },
      { label: "Adresse", value: "29 rue des Saints-Pères, 75006 Paris (Saint-Germain-des-Prés)" },
      { label: "Öffnungszeiten (7/7)", value: "Mo–Fr 7:00–23:30 · Sa 8:00–22:30 · So 9:00–23:00 Uhr (durchgehende Küche 12:00–22:00 Uhr)" },
      { label: "Metro & Museen", value: "Saint-Germain-des-Prés (Linie 4) & Rue du Bac (Linie 12) — 5 Gehminuten vom Louvre und Musée d'Orsay" },
      { label: "Telefon & Empfang", value: "+33 1 40 20 09 39 — Ganztägig freier Empfang ohne Reservierung im Gastraum und auf der Terrasse" },
    ],
    infosGuideEyebrow: "BESUCHERINFOS",
    infosGuideTitle: "Ihr Besuch in Saint-Germain-des-Prés",
    infosFaq: [
      {
        id: "reservierung-durchgehender-service",
        question: "Muss man im Le Comptoir des Saints-Pères einen Tisch reservieren?",
        answer:
          "Nein, das Le Comptoir des Saints-Pères empfängt seine Gäste 7 Tage die Woche durchgehend ohne Reservierung. Sie können jederzeit spontan im Gastraum oder auf der Terrasse Platz nehmen — zum Pariser Frühstück ab 7:00 Uhr unter der Woche, zum Mittagessen nach dem Louvre oder Musée d'Orsay, zum Aperitif oder zum Abendessen bis 22:00 Uhr.",
      },
      {
        id: "anfahrt-museen-metro",
        question: "Wie erreicht man das Bistro vom Louvre, Musée d'Orsay oder mit der Metro?",
        answer:
          "Das Bistro liegt in der 29 rue des Saints-Pères (Paris 6.) zwischen dem Boulevard Saint-Germain und dem Seine-Ufer. Mit der Metro fahren Sie bis Saint-Germain-des-Prés (Linie 4, 3 Gehminuten) oder Rue du Bac (Linie 12, 5 Gehminuten). Sowohl das Musée d'Orsay als auch der Louvre über den Pont du Carrousel sind in 5 Minuten zu Fuß erreichbar.",
      },
      {
        id: "vegetarisch-wlan-kartenzahlung",
        question: "Gibt es vegetarische Gerichte, kostenloses WLAN und Kartenzahlung?",
        answer:
          "Ja, unsere Karte bietet zahlreiche frisch zubereitete vegetarische Speisen wie warme und kalte vegetarische Teller, Burrata-Linguine mit Basilikum, einen Veggie-Burger mit Cheddar, Gemüsequiche, Freiland-Omelettes und französische Käsespezialitäten. Kostenloses WLAN steht bereit, Kartenzahlung ist ab 5 € möglich und die gesamte Karte liegt auf Deutsch vor.",
      },
    ],
    contactGroupsEyebrow: "GRUPPEN & ANFRAGEN",
    contactGroupsTitle: "Gruppenessen & Frühstückstreffen in Saint-Germain",
    contactGroupsLead:
      "Während Paare, Familien und kleinere Runden jederzeit spontan ohne Reservierung willkommen sind, unterstützt unser Team Sie bei besonderen Anfragen in der 29 rue des Saints-Pères (Paris 6.) gerne telefonisch oder per E-Mail:",
    contactGroupsBullets: [
      "Tische für 1 bis 6 Gäste: direkter Empfang an 7 Tagen pro Woche im Saal oder auf der Terrasse ohne Voranmeldung.",
      "Gruppen ab 8 Personen: kontaktieren Sie uns vorab telefonisch oder per E-Mail zur Vorbereitung Ihrer Tafel.",
      "Geschäftsfrühstück & Morgentermine: montags bis freitags bereits ab 7:00 Uhr im Herzen der Rive Gauche geöffnet.",
      "Fundsachen, Allergenauskünfte oder Rückfragen: direkter Kontakt unter +33 1 40 20 09 39 oder christophe6eme@gmail.com.",
    ],
    contactFaq: [
      {
        id: "kontakt-terrasse-ohne-reservierung",
        question: "Können wir spontan ohne Reservierung zum Essen oder auf die Terrasse kommen?",
        answer:
          "Ja, das Le Comptoir des Saints-Pères empfängt seine Gäste an 7 Tagen pro Woche durchgehend ohne Reservierung in der 29 rue des Saints-Pères (Paris 6.). Kommen Sie einfach vorbei — unser Team begleitet Sie gerne zu einem Platz im Bistro-Saal oder auf der Pariser Straßenterrasse.",
      },
      {
        id: "kontakt-entfernung-louvre-orsay",
        question: "Wie weit ist das Bistro zu Fuß vom Louvre und vom Musée d'Orsay entfernt?",
        answer:
          "Zwischen dem Boulevard Saint-Germain und der Seine auf der Rive Gauche gelegen, erreichen Sie unsere Brasserie in nur 5 Gehminuten vom Musée d'Orsay sowie über den Pont du Carrousel vom Louvre und in 3 Minuten von der Metrostation Saint-Germain-des-Prés (Linie 4).",
      },
    ],
    legalLead:
      "Diese Seite enthält die gesetzlichen Pflichtangaben der offiziellen Website ausaintsperes.com, herausgegeben von der Gesellschaft SAS CHLOCERO als Betreiberin der Pariser Brasserie Le Comptoir des Saints-Pères in der 29 rue des Saints-Pères (75006 Paris, Frankreich), gemäß französischem Telemediengesetz (LCEN) und der Datenschutz-Grundverordnung (DSGVO).",
    links: {
      exploreMenu: "Vollständige Speisekarte und Preise ansehen",
      practicalInfo: "Öffnungszeiten und Metro-Anfahrt prüfen",
      contactTeam: "Bistro kontaktieren (Telefon & Gruppen)",
    },
  },
};
