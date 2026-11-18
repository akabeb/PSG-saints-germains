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

export type GeoLocaleContent = {
  /** Titre de l'encadré Repères clés dans la section À propos */
  highlightsTitle: string;
  /** Liste structurée <ul> de 4 repères factuels vérifiables */
  highlights: GeoHighlight[];
  /** Paragraphe de synthèse factuel en tête de /la-carte */
  menuPageLead: string;
  /** Titre de la section éditoriale Questions fréquentes sur /infos-pratiques */
  infosGuideEyebrow: string;
  infosGuideTitle: string;
  /** Paragraphes éditoriaux autonomes (50–80 mots) couplés 1:1 au schéma FAQPage */
  infosFaq: GeoFaqItem[];
  /** Bloc éditorial Groupes & Réceptions sur /contact */
  contactGroupsEyebrow: string;
  contactGroupsTitle: string;
  contactGroupsLead: string;
  contactGroupsBullets: string[];
};

export const geoContent: Record<Locale, GeoLocaleContent> = {
  fr: {
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
        label: "Spécialités maison & repères de prix",
        detail:
          "Entrées de bistrot dès 6,8 € (œuf mayonnaise maison, escargots de Bourgogne), croques sur pain Poilâne (10,4 €–13 €), plats maison (16,8 €–23,9 €), fromages affinés et glaces artisanales Lili & Enzo.",
      },
      {
        label: "Accès, confort & accueil international",
        detail:
          "Métros Saint-Germain-des-Prés (ligne 4) et Rue du Bac (ligne 12), terrasse parisienne, Wi-Fi gratuit, paiement CB dès 5 € et carte traduite en 5 langues (FR, EN, ES, IT, DE).",
      },
    ],
    menuPageLead:
      "La carte du Comptoir des Saints-Pères réunit les grands classiques de la brasserie parisienne préparés sur place : entrées traditionnelles, grandes salades repas, croques dorés sur pain Poilâne, œufs plein air, viandes et poissons grillés, fromages au lait cru, jus pressés minute, vins de propriété au verre et cocktails maison. Tous nos tarifs sont affichés nets en euros, taxes et service compris.",
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
    contactGroupsEyebrow: "GROUPES & PRIVATISATION",
    contactGroupsTitle: "Repas de groupe & petits-déjeuners à Saint-Germain",
    contactGroupsLead:
      "Si l'accueil quotidien au Comptoir des Saints-Pères se fait librement sans réservation pour les tables individuelles, notre équipe accompagne volontiers vos demandes particulières au 29 rue des Saints-Pères (Paris 6e) par téléphone ou par e-mail :",
    contactGroupsBullets: [
      "Tables de 1 à 6 convives : accueil immédiat sur place 7j/7 en salle ou en terrasse, sans réservation préalable.",
      "Repas de groupe (à partir de 8 convives) : contactez-nous en amont pour organiser votre déjeuner ou dîner de brasserie.",
      "Petits-déjeuners d'équipe ou rendez-vous matinaux : accueil dès 7h00 du lundi au vendredi à deux pas des maisons d'édition et galeries de la Rive Gauche.",
      "Objets oubliés, allergènes ou renseignements pratiques : réponse directe au 01 40 20 09 39 ou à christophe6eme@gmail.com.",
    ],
  },

  en: {
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
        label: "House specialties & price range",
        detail:
          "Bistro starters from €6.8 (homemade egg mayonnaise, Burgundy snails), Poilâne bread croques (€10.4–€13), main courses (€16.8–€23.9), French cheeses and Lili & Enzo artisan ice creams.",
      },
      {
        label: "Metro access, amenities & languages",
        detail:
          "Metro Saint-Germain-des-Prés (line 4) and Rue du Bac (line 12), Parisian sidewalk terrace, free Wi-Fi, credit cards accepted from €5, and full menu in 5 languages (FR, EN, ES, IT, DE).",
      },
    ],
    menuPageLead:
      "The menu at Le Comptoir des Saints-Pères brings together classic Parisian brasserie dishes prepared fresh daily: traditional starters, meal-sized salads, toasted croques on Poilâne sourdough bread, free-range omelettes, grilled meats and salmon, French raw-milk cheeses, freshly squeezed juices, estate wines by the glass and house cocktails. All prices are net in euros, taxes and service included.",
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
  },

  es: {
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
        label: "Especialidades caseras y precios claros",
        detail:
          "Entrantes desde 6,8 € (huevos con mayonesa casera, caracoles de Borgoña), croques en pan Poilâne (10,4 €–13 €), platos principales (16,8 €–23,9 €), quesos franceses y helados artesanales.",
      },
      {
        label: "Acceso en metro, servicios e idiomas",
        detail:
          "Metro Saint-Germain-des-Prés (línea 4) y Rue du Bac (línea 12), terraza parisina, Wi-Fi gratuito, pago con tarjeta desde 5 € y carta en 5 idiomas (FR, EN, ES, IT, DE).",
      },
    ],
    menuPageLead:
      "La carta de Le Comptoir des Saints-Pères reúne las grandes recetas de la brasserie parisina elaboradas a diario: entrantes tradicionales, ensaladas completas, croques dorados en pan Poilâne, tortillas de huevos camperos, carnes y salmón a la parrilla, quesos franceses, zumos recién exprimidos, vinos por copa y cócteles de la casa. Precios netos en euros, impuestos y servicio incluidos.",
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
  },

  it: {
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
        label: "Specialità della casa e fascia di prezzo",
        detail:
          "Antipasti da 6,8 € (uova con maionese fatta in casa, lumache di Borgogna), croque su pane Poilâne (10,4 €–13 €), piatti principali (16,8 €–23,9 €), formaggi francesi e gelati artigianali.",
      },
      {
        label: "Metro, comfort e menù multilingue",
        detail:
          "Metro Saint-Germain-des-Prés (linea 4) e Rue du Bac (linea 12), terrazza parigina, Wi-Fi gratuito, pagamento con carta da 5 € e menù tradotto in 5 lingue (FR, EN, ES, IT, DE).",
      },
    ],
    menuPageLead:
      "Il menù di Le Comptoir des Saints-Pères riunisce i grandi classici della brasserie parigina preparati in casa: antipasti tradizionali, ricche insalate, croque dorati su pane Poilâne, omelette di uova allevate all'aperto, carni e salmone alla griglia, formaggi a latte crudo, spremute fresche, vini al calice e cocktail della casa. Tutti i prezzi sono netti in euro, tasse e servizio inclusi.",
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
  },

  de: {
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
        label: "Hausgemachte Klassiker & Preise",
        detail:
          "Vorspeisen ab 6,8 € (hausgemachte Eier-Mayonnaise, Weinbergschnecken), Croques auf Poilâne-Brot (10,4 €–13 €), Hauptgerichte (16,8 €–23,9 €), französischer Käse und handwerkliches Eis.",
      },
      {
        label: "Metro-Anbindung, Service & Sprachen",
        detail:
          "Metro Saint-Germain-des-Prés (Linie 4) und Rue du Bac (Linie 12), Pariser Terrasse, kostenloses WLAN, Kartenzahlung ab 5 € und Speisekarte in 5 Sprachen (FR, EN, ES, IT, DE).",
      },
    ],
    menuPageLead:
      "Die Speisekarte des Le Comptoir des Saints-Pères vereint frisch zubereitete Klassiker der Pariser Brasserie-Küche: traditionelle Vorspeisen, große Salate, knusprige Croques auf Poilâne-Brot, Omelettes aus Freilandeiern, Fleisch- und Lachsgerichte vom Grill, Rohmilchkäse, frisch gepresste Säfte, offene Weine und Hauscocktails. Alle Preise verstehen sich netto in Euro inklusive Steuern und Bedienung.",
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
  },
};
