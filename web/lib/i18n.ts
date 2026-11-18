/**
 * Configuration multilingue — Top 5 clientèles parisiennes :
 * FR (défaut), EN, ES, IT, DE.
 */
export const locales = ["fr", "en", "es", "it", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export const localeMeta: Record<
  Locale,
  {
    label: string;
    shortLabel: string;
    flag: string;
    htmlLang: string;
    ogLocale: string;
  }
> = {
  fr: {
    label: "Français",
    shortLabel: "FR",
    flag: "/assets/flag-fr.png",
    htmlLang: "fr",
    ogLocale: "fr_FR",
  },
  en: {
    label: "English",
    shortLabel: "EN",
    flag: "/assets/flag-gb.png",
    htmlLang: "en",
    ogLocale: "en_GB",
  },
  es: {
    label: "Español",
    shortLabel: "ES",
    flag: "/assets/flag-es.png",
    htmlLang: "es",
    ogLocale: "es_ES",
  },
  it: {
    label: "Italiano",
    shortLabel: "IT",
    flag: "/assets/flag-it.png",
    htmlLang: "it",
    ogLocale: "it_IT",
  },
  de: {
    label: "Deutsch",
    shortLabel: "DE",
    flag: "/assets/flag-de.png",
    htmlLang: "de",
    ogLocale: "de_DE",
  },
};

export type DictSchema = {
  nav: {
    home: string;
    menu: string;
    infos: string;
    contact: string;
    callShort: string;
  };
  hero: {
    serviceBadge: string;
    callCta: string;
    directionsCta: string;
    menuCta: string;
  };
  menu: {
    foodSeparator: string;
    drinksSeparator: string;
    expandAll: string;
    collapseAll: string;
    allergensLabel: string;
    legalPricing: string;
    legalMeatAndAlcohol: string;
  };
  home: {
    menuTitle: string;
  };
  contact: {
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    walkInNote: string;
    groupNote: string;
    callCta: string;
    emailCta: string;
    directionsLabel: string;
    osmLinkLabel: string;
    pageTitle: string;
    formName: string;
    formEmail: string;
    formPlaceholder: string;
    formSubmit: string;
  };
  menu_page: {
    heroTitle: string;
  };
  infos: {
    heroTitle: string;
    walkInBanner: string;
  };
  footer: {
    legalLink: string;
    cookiesLink: string;
    alcoholWarning: string;
    walkInSummary: string;
  };
  cookies: {
    bannerAria: string;
    message: string;
    accept: string;
    decline: string;
  };
  legal: {
    heroTitle: string;
    metaDescription: string;
    editorTitle: string;
    editorCompanyLabel: string;
    editorTradeLabel: string;
    editorCapitalLabel: string;
    editorRcsLabel: string;
    editorSiretLabel: string;
    editorAddressLabel: string;
    editorPhoneLabel: string;
    editorEmailLabel: string;
    hostTitle: string;
    hostText: string;
    privacyTitle: string;
    privacyText: string;
    ipTitle: string;
    ipText: string;
  };
  aria: {
    mainNav: string;
    footerNav: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
    changeLanguage: string;
    chooseLanguage: string;
    heroImageAlt: string;
    aboutLeftAlt: string;
    aboutRightAlt: string;
    counterAlt: string;
    mapTitle: string;
  };
  error: {
    title: string;
    retry: string;
    home: string;
  };
  notFound: {
    label: string;
    sub: string;
    home: string;
  };
};

export const dict: Record<Locale, DictSchema> = {
  fr: {
    nav: {
      home: "Accueil",
      menu: "La Carte",
      infos: "Infos pratiques",
      contact: "Contact",
      callShort: "Appeler",
    },
    hero: {
      serviceBadge: "Accueil sans réservation en continu · Ouvert 7j/7",
      callCta: "Appeler",
      directionsCta: "Itinéraire Maps",
      menuCta: "Voir la carte",
    },
    menu: {
      foodSeparator: "Cuisine & Assiettes",
      drinksSeparator: "Cave & Boissons",
      expandAll: "Tout déplier",
      collapseAll: "Tout replier",
      allergensLabel: "Allergènes",
      legalPricing:
        "Prix nets en euros, taxes et service compris. Minimum CB 5 €. Wi-Fi gratuit. Liste des allergènes majeurs disponible sur simple demande auprès de notre équipe.",
      legalMeatAndAlcohol:
        "Origine des viandes affichée au comptoir. L'abus d'alcool est dangereux pour la santé, à consommer avec modération.",
    },
    home: { menuTitle: "La Carte" },
    contact: {
      addressLabel: "Adresse",
      phoneLabel: "Téléphone",
      emailLabel: "E-mail",
      hoursLabel: "Horaires d'ouverture",
      walkInNote: "Accueil en continu toute la journée, sans réservation.",
      groupNote:
        "Pour une demande particulière ou un groupe, appelez-nous directement ou écrivez-nous par e-mail :",
      callCta: "Appeler le bistrot",
      emailCta: "Envoyer un e-mail",
      directionsLabel: "Ouvrir dans Google Maps",
      osmLinkLabel: "Voir sur OpenStreetMap",
      pageTitle: "Nous contacter",
      formName: "Votre nom",
      formEmail: "Votre e-mail",
      formPlaceholder: "Votre message (date souhaitée, nombre de convives, question…)",
      formSubmit: "Envoyer le message",
    },
    menu_page: { heroTitle: "La Carte" },
    infos: {
      heroTitle: "Infos Pratiques",
      walkInBanner:
        "Service continu sans réservation — installez-vous directement en salle ou en terrasse.",
    },
    footer: {
      legalLink: "Mentions légales",
      cookiesLink: "Cookies",
      alcoholWarning:
        "L'abus d'alcool est dangereux pour la santé, à consommer avec modération.",
      walkInSummary: "Accueil sans réservation en continu",
    },
    cookies: {
      bannerAria: "Préférences de cookies",
      message:
        "Nous utilisons Google Tag Manager / Analytics uniquement pour mesurer la fréquentation du site, sous réserve de votre accord.",
      accept: "Accepter",
      decline: "Refuser",
    },
    legal: {
      heroTitle: "Mentions légales",
      metaDescription:
        "Mentions légales, éditeur, hébergement et politique de confidentialité du Comptoir des Saints-Pères.",
      editorTitle: "1. Éditeur du site",
      editorCompanyLabel: "Dénomination sociale",
      editorTradeLabel: "Nom commercial",
      editorCapitalLabel: "Capital social",
      editorRcsLabel: "Immatriculation",
      editorSiretLabel: "SIRET",
      editorAddressLabel: "Siège social",
      editorPhoneLabel: "Téléphone",
      editorEmailLabel: "E-mail",
      hostTitle: "2. Hébergement",
      hostText:
        "Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (https://vercel.com).",
      privacyTitle: "3. Données personnelles & Cookies (RGPD)",
      privacyText:
        "Ce site utilise Google Tag Manager (GTM-PBSB8XVM) à des fins exclusives de mesure d'audience, désactivé par défaut (Google Consent Mode v2) tant que vous n'avez pas cliqué sur « Accepter » dans le bandeau dédié. Vous pouvez modifier votre choix à tout moment via le lien « Cookies » en pied de page. Lorsque vous consultez les pages « Infos pratiques » ou « Contact », une carte OpenStreetMap est chargée depuis les serveurs de la fondation OpenStreetMap (https://www.openstreetmap.org). Conformément au RGPD et à la loi Informatique et Libertés, vous pouvez exercer vos droits d'accès, de rectification ou de suppression en écrivant à :",
      ipTitle: "4. Propriété intellectuelle & Informations réglementaires",
      ipText:
        "L'ensemble des textes, photographies, logos et éléments graphiques présents sur ce site sont protégés par le droit de la propriété intellectuelle. Toute reproduction non autorisée est interdite. Tous les prix affichés sur notre carte sont exprimés en euros, nets TTC et service compris. L'abus d'alcool est dangereux pour la santé, à consommer avec modération (Article L.3323-4 du Code de la santé publique).",
    },
    aria: {
      mainNav: "Navigation principale",
      footerNav: "Navigation de pied de page",
      openMenu: "Ouvrir le menu de navigation",
      closeMenu: "Fermer le menu de navigation",
      skipToContent: "Aller au contenu principal",
      changeLanguage: "Changer de langue",
      chooseLanguage: "Choisir une langue",
      heroImageAlt: "Terrasse du Comptoir des Saints-Pères à Saint-Germain-des-Prés",
      aboutLeftAlt: "Terrasse en rotin du Comptoir des Saints-Pères",
      aboutRightAlt: "Mosaïque historique Bières à la pression, Alcools et Liqueurs",
      counterAlt: "Le comptoir en laiton du Comptoir des Saints-Pères",
      mapTitle: "Carte d'accès OpenStreetMap — 29 Rue des Saints-Pères, Paris 6e",
    },
    error: {
      title: "Une erreur s'est produite",
      retry: "Réessayer",
      home: "Revenir à l'accueil",
    },
    notFound: {
      label: "Page introuvable",
      sub: "Cette page n'existe pas ou a été déplacée.",
      home: "Revenir à l'accueil",
    },
  },

  en: {
    nav: {
      home: "Home",
      menu: "Our Menu",
      infos: "Practical Info",
      contact: "Contact",
      callShort: "Call",
    },
    hero: {
      serviceBadge: "Walk-ins welcome · Continuous service · Open 7 days a week",
      callCta: "Call us",
      directionsCta: "Google Maps",
      menuCta: "View the menu",
    },
    menu: {
      foodSeparator: "Bistro Kitchen",
      drinksSeparator: "Cellar & Drinks",
      expandAll: "Expand all",
      collapseAll: "Collapse all",
      allergensLabel: "Allergens",
      legalPricing:
        "Net prices in euros, taxes and service included. Credit card minimum €5. Free Wi-Fi. Information on major allergens is available upon request from our team.",
      legalMeatAndAlcohol:
        "Meat origin details are displayed at the counter. Alcohol abuse is dangerous for your health, please drink responsibly.",
    },
    home: { menuTitle: "Our Menu" },
    contact: {
      addressLabel: "Address",
      phoneLabel: "Phone",
      emailLabel: "Email",
      hoursLabel: "Opening Hours",
      walkInNote: "Continuous walk-in service all day, no reservation required.",
      groupNote:
        "For group enquiries or special requests, call us directly or send us an email:",
      callCta: "Call the bistro",
      emailCta: "Send an email",
      directionsLabel: "Open in Google Maps",
      osmLinkLabel: "View on OpenStreetMap",
      pageTitle: "Contact us",
      formName: "Your name",
      formEmail: "Your email",
      formPlaceholder: "Your message (preferred date, party size, question…)",
      formSubmit: "Send message",
    },
    menu_page: { heroTitle: "Our Menu" },
    infos: {
      heroTitle: "Practical Info",
      walkInBanner:
        "Continuous service, no reservation required — walk right in for indoor or terrace seating.",
    },
    footer: {
      legalLink: "Legal Notice",
      cookiesLink: "Cookies",
      alcoholWarning:
        "Alcohol abuse is dangerous for your health, please drink responsibly.",
      walkInSummary: "Walk-ins welcome · Continuous service",
    },
    cookies: {
      bannerAria: "Cookie preferences",
      message:
        "We use Google Tag Manager / Analytics solely to measure anonymous site traffic, subject to your consent.",
      accept: "Accept",
      decline: "Decline",
    },
    legal: {
      heroTitle: "Legal Notice",
      metaDescription:
        "Legal notice, publisher details, hosting provider and privacy policy for Le Comptoir des Saints-Pères.",
      editorTitle: "1. Website Publisher",
      editorCompanyLabel: "Registered company",
      editorTradeLabel: "Trade name",
      editorCapitalLabel: "Share capital",
      editorRcsLabel: "Trade register (RCS)",
      editorSiretLabel: "SIRET",
      editorAddressLabel: "Registered office",
      editorPhoneLabel: "Phone",
      editorEmailLabel: "Email",
      hostTitle: "2. Hosting Provider",
      hostText:
        "This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States (https://vercel.com).",
      privacyTitle: "3. Personal Data & Cookies (GDPR)",
      privacyText:
        "This website uses Google Tag Manager (GTM-PBSB8XVM) solely for audience measurement, disabled by default (Google Consent Mode v2) unless you click 'Accept'. You can change your preference anytime via the 'Cookies' link in the footer. When you visit the Practical Info or Contact pages, an OpenStreetMap frame is loaded from the OpenStreetMap Foundation (https://www.openstreetmap.org). Under GDPR, you may exercise your rights of access, rectification or erasure by writing to:",
      ipTitle: "4. Intellectual Property & Regulatory Information",
      ipText:
        "All texts, photographs, logos and graphic elements on this website are protected by intellectual property laws. Any unauthorised reproduction is prohibited. All menu prices are stated in euros, inclusive of VAT and service. Alcohol abuse is dangerous for your health, please drink responsibly.",
    },
    aria: {
      mainNav: "Main navigation",
      footerNav: "Footer navigation",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      skipToContent: "Skip to main content",
      changeLanguage: "Change language",
      chooseLanguage: "Select a language",
      heroImageAlt: "Terrace of Le Comptoir des Saints-Pères in Saint-Germain-des-Prés",
      aboutLeftAlt: "Rattan bistro terrace at Le Comptoir des Saints-Pères",
      aboutRightAlt: "Historic tile mosaic for draft beers, spirits and liqueurs",
      counterAlt: "The brass bar counter inside Le Comptoir des Saints-Pères",
      mapTitle: "OpenStreetMap location — 29 Rue des Saints-Pères, Paris 6th",
    },
    error: {
      title: "Something went wrong",
      retry: "Try again",
      home: "Back to home",
    },
    notFound: {
      label: "Page not found",
      sub: "This page does not exist or has been moved.",
      home: "Back to home",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      menu: "La Carta",
      infos: "Info práctica",
      contact: "Contacto",
      callShort: "Llamar",
    },
    hero: {
      serviceBadge: "Servicio continuo sin reserva · Abierto los 7 días",
      callCta: "Llamar",
      directionsCta: "Cómo llegar (Maps)",
      menuCta: "Ver la carta",
    },
    menu: {
      foodSeparator: "Cocina de Bistró",
      drinksSeparator: "Bodega y Bebidas",
      expandAll: "Desplegar todo",
      collapseAll: "Plegar todo",
      allergensLabel: "Alérgenos",
      legalPricing:
        "Precios netos en euros, impuestos y servicio incluidos. Pago mínimo con tarjeta: 5 €. Wi-Fi gratuito. Lista de alérgenos disponible bajo petición a nuestro equipo.",
      legalMeatAndAlcohol:
        "Origen de las carnes indicado en el mostrador. El abuso de alcohol es perjudicial para la salud; consúmalo con moderación.",
    },
    home: { menuTitle: "La Carta" },
    contact: {
      addressLabel: "Dirección",
      phoneLabel: "Teléfono",
      emailLabel: "Correo electrónico",
      hoursLabel: "Horario de apertura",
      walkInNote: "Servicio continuo durante todo el día, sin necesidad de reserva.",
      groupNote:
        "Para grupos o solicitudes especiales, llámenos directamente o escríbanos por correo electrónico:",
      callCta: "Llamar al bistró",
      emailCta: "Enviar un correo",
      directionsLabel: "Abrir en Google Maps",
      osmLinkLabel: "Ver en OpenStreetMap",
      pageTitle: "Contacto",
      formName: "Su nombre",
      formEmail: "Su correo electrónico",
      formPlaceholder: "Su mensaje (fecha deseada, número de comensales, consulta…)",
      formSubmit: "Enviar mensaje",
    },
    menu_page: { heroTitle: "La Carta" },
    infos: {
      heroTitle: "Información Práctica",
      walkInBanner:
        "Servicio continuo sin reserva — acomódese directamente en el salón o en la terraza.",
    },
    footer: {
      legalLink: "Aviso legal",
      cookiesLink: "Cookies",
      alcoholWarning:
        "El abuso de alcohol es perjudicial para la salud, consúmalo con moderación.",
      walkInSummary: "Sin reserva · Servicio continuo",
    },
    cookies: {
      bannerAria: "Preferencias de cookies",
      message:
        "Utilizamos Google Tag Manager / Analytics únicamente para medir la audiencia del sitio, sujeto a su consentimiento.",
      accept: "Aceptar",
      decline: "Rechazar",
    },
    legal: {
      heroTitle: "Aviso legal",
      metaDescription:
        "Aviso legal, datos del editor, alojamiento y política de privacidad de Le Comptoir des Saints-Pères.",
      editorTitle: "1. Editor del sitio web",
      editorCompanyLabel: "Razón social",
      editorTradeLabel: "Nombre comercial",
      editorCapitalLabel: "Capital social",
      editorRcsLabel: "Registro Mercantil (RCS)",
      editorSiretLabel: "SIRET",
      editorAddressLabel: "Domicilio social",
      editorPhoneLabel: "Teléfono",
      editorEmailLabel: "Correo electrónico",
      hostTitle: "2. Alojamiento web",
      hostText:
        "Este sitio está alojado por Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, Estados Unidos (https://vercel.com).",
      privacyTitle: "3. Datos personales y Cookies (RGPD)",
      privacyText:
        "Este sitio web utiliza Google Tag Manager (GTM-PBSB8XVM) únicamente para la medición de audiencia, desactivado por defecto (Google Consent Mode v2) salvo que pulse « Aceptar ». Puede modificar su elección en cualquier momento desde el enlace « Cookies » en el pie de página. Al consultar Información práctica o Contacto, se carga un mapa desde OpenStreetMap (https://www.openstreetmap.org). Conforme al RGPD, puede ejercer sus derechos escribiendo a:",
      ipTitle: "4. Propiedad intelectual e información reglamentaria",
      ipText:
        "Todos los textos, fotografías, logotipos y elementos gráficos de este sitio están protegidos por derechos de propiedad intelectual. Todos los precios de nuestra carta están expresados en euros, IVA y servicio incluidos.",
    },
    aria: {
      mainNav: "Navegación principal",
      footerNav: "Navegación de pie de página",
      openMenu: "Abrir menú de navegación",
      closeMenu: "Cerrar menú de navegación",
      skipToContent: "Ir al contenido principal",
      changeLanguage: "Cambiar idioma",
      chooseLanguage: "Seleccionar idioma",
      heroImageAlt: "Terraza de Le Comptoir des Saints-Pères en Saint-Germain-des-Prés",
      aboutLeftAlt: "Terraza parisina de mimbre en Le Comptoir des Saints-Pères",
      aboutRightAlt: "Mosaico histórico de cervezas de barril, alcoholes y licores",
      counterAlt: "La barra de latón de Le Comptoir des Saints-Pères",
      mapTitle: "Mapa OpenStreetMap — 29 Rue des Saints-Pères, París 6",
    },
    error: {
      title: "Se ha producido un error",
      retry: "Reintentar",
      home: "Volver al inicio",
    },
    notFound: {
      label: "Página no encontrada",
      sub: "Esta página no existe o ha sido trasladada.",
      home: "Volver al inicio",
    },
  },

  it: {
    nav: {
      home: "Home",
      menu: "Il Menù",
      infos: "Info pratiche",
      contact: "Contatti",
      callShort: "Chiama",
    },
    hero: {
      serviceBadge: "Accoglienza senza prenotazione · Orario continuato 7/7",
      callCta: "Chiama",
      directionsCta: "Indicazioni Maps",
      menuCta: "Vedi il menù",
    },
    menu: {
      foodSeparator: "Cucina del Bistrot",
      drinksSeparator: "Cantina e Bevande",
      expandAll: "Espandi tutto",
      collapseAll: "Chiudi tutto",
      allergensLabel: "Allergeni",
      legalPricing:
        "Prezzi netti in euro, tasse e servizio inclusi. Pagamento minimo con carta: 5 €. Wi-Fi gratuito. Elenco degli allergeni disponibile su richiesta al nostro personale.",
      legalMeatAndAlcohol:
        "Origine delle carni esposta al banco. L'abuso di alcol è pericoloso per la salute, consumare con moderazione.",
    },
    home: { menuTitle: "Il Menù" },
    contact: {
      addressLabel: "Indirizzo",
      phoneLabel: "Telefono",
      emailLabel: "E-mail",
      hoursLabel: "Orari di apertura",
      walkInNote: "Servizio continuato tutto il giorno, senza prenotazione.",
      groupNote:
        "Per gruppi o richieste particolari, chiamateci direttamente o scriveteci via e-mail:",
      callCta: "Chiama il bistrot",
      emailCta: "Invia un'e-mail",
      directionsLabel: "Apri in Google Maps",
      osmLinkLabel: "Vedi su OpenStreetMap",
      pageTitle: "Contattaci",
      formName: "Il vostro nome",
      formEmail: "La vostra e-mail",
      formPlaceholder: "Il vostro messaggio (data desiderata, numero di ospiti, domanda…)",
      formSubmit: "Invia messaggio",
    },
    menu_page: { heroTitle: "Il Menù" },
    infos: {
      heroTitle: "Informazioni Pratiche",
      walkInBanner:
        "Servizio continuato senza prenotazione — accomodatevi liberamente in sala o in terrazza.",
    },
    footer: {
      legalLink: "Note legali",
      cookiesLink: "Cookie",
      alcoholWarning:
        "L'abuso di alcol è pericoloso per la salute, consumare con moderazione.",
      walkInSummary: "Senza prenotazione · Orario continuato",
    },
    cookies: {
      bannerAria: "Preferenze sui cookie",
      message:
        "Utilizziamo Google Tag Manager / Analytics esclusivamente per misurare il traffico del sito, previo vostro consenso.",
      accept: "Accetta",
      decline: "Rifiuta",
    },
    legal: {
      heroTitle: "Note legali",
      metaDescription:
        "Note legali, editore, hosting e informativa sulla privacy di Le Comptoir des Saints-Pères.",
      editorTitle: "1. Editore del sito",
      editorCompanyLabel: "Ragione sociale",
      editorTradeLabel: "Insegna commerciale",
      editorCapitalLabel: "Capitale sociale",
      editorRcsLabel: "Registro delle Imprese (RCS)",
      editorSiretLabel: "SIRET",
      editorAddressLabel: "Sede legale",
      editorPhoneLabel: "Telefono",
      editorEmailLabel: "E-mail",
      hostTitle: "2. Hosting",
      hostText:
        "Questo sito è ospitato da Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, Stati Uniti (https://vercel.com).",
      privacyTitle: "3. Dati personali e Cookie (GDPR)",
      privacyText:
        "Questo sito utilizza Google Tag Manager (GTM-PBSB8XVM) esclusivamente per la misurazione del traffico, disattivato per impostazione predefinita (Google Consent Mode v2) finché non cliccate su « Accetta ». Potete modificare la vostra scelta in qualsiasi momento tramite il link « Cookie » nel piè di pagina. Visitando Info pratiche o Contatti viene caricata una mappa da OpenStreetMap (https://www.openstreetmap.org). Ai sensi del GDPR, potete esercitare i vostri diritti scrivendo a:",
      ipTitle: "4. Proprietà intellettuale e informazioni normative",
      ipText:
        "Tutti i testi, le fotografie, i loghi e gli elementi grafici di questo sito sono protetti dal diritto d'autore. Tutti i prezzi indicati nel menù sono espressi in euro, IVA e servizio inclusi.",
    },
    aria: {
      mainNav: "Navigazione principale",
      footerNav: "Navigazione a piè di pagina",
      openMenu: "Apri il menù di navigazione",
      closeMenu: "Chiudi il menù di navigazione",
      skipToContent: "Vai al contenuto principale",
      changeLanguage: "Cambia lingua",
      chooseLanguage: "Scegli una lingua",
      heroImageAlt: "Terrazza di Le Comptoir des Saints-Pères a Saint-Germain-des-Prés",
      aboutLeftAlt: "Terrazza in vimini di Le Comptoir des Saints-Pères",
      aboutRightAlt: "Mosaico storico Birre alla spina, Alcolici e Liquori",
      counterAlt: "Il bancone in ottone di Le Comptoir des Saints-Pères",
      mapTitle: "Mappa OpenStreetMap — 29 Rue des Saints-Pères, Parigi 6",
    },
    error: {
      title: "Si è verificato un errore",
      retry: "Riprova",
      home: "Torna alla home",
    },
    notFound: {
      label: "Pagina non trovata",
      sub: "Questa pagina non esiste o è stata spostata.",
      home: "Torna alla home",
    },
  },

  de: {
    nav: {
      home: "Startseite",
      menu: "Speisekarte",
      infos: "Praktische Infos",
      contact: "Kontakt",
      callShort: "Anrufen",
    },
    hero: {
      serviceBadge: "Ohne Reservierung · Durchgehender Service · 7 Tage geöffnet",
      callCta: "Anrufen",
      directionsCta: "Route (Maps)",
      menuCta: "Zur Speisekarte",
    },
    menu: {
      foodSeparator: "Bistro-Küche",
      drinksSeparator: "Weinkeller & Getränke",
      expandAll: "Alle öffnen",
      collapseAll: "Alle schließen",
      allergensLabel: "Allergene",
      legalPricing:
        "Nettopreise in Euro, inklusive Steuern und Bedienung. Kartenzahlung ab 5 €. Kostenloses WLAN. Informationen zu Hauptallergenen erhalten Sie auf Anfrage bei unserem Team.",
      legalMeatAndAlcohol:
        "Herkunft des Fleisches am Tresen ausgewiesen. Alkoholmissbrauch gefährdet Ihre Gesundheit – bitte genießen Sie verantwortungsbewusst.",
    },
    home: { menuTitle: "Speisekarte" },
    contact: {
      addressLabel: "Adresse",
      phoneLabel: "Telefon",
      emailLabel: "E-Mail",
      hoursLabel: "Öffnungszeiten",
      walkInNote: "Durchgehender Service den ganzen Tag, ohne Reservierung.",
      groupNote:
        "Für Gruppenanfragen oder besondere Wünsche rufen Sie uns gerne direkt an oder schreiben Sie uns eine E-Mail:",
      callCta: "Bistro anrufen",
      emailCta: "E-Mail senden",
      directionsLabel: "In Google Maps öffnen",
      osmLinkLabel: "Auf OpenStreetMap ansehen",
      pageTitle: "Kontakt",
      formName: "Ihr Name",
      formEmail: "Ihre E-Mail",
      formPlaceholder: "Ihre Nachricht (gewünschtes Datum, Personenzahl, Frage…)",
      formSubmit: "Nachricht senden",
    },
    menu_page: { heroTitle: "Speisekarte" },
    infos: {
      heroTitle: "Praktische Infos",
      walkInBanner:
        "Durchgehender Service ohne Reservierung — nehmen Sie einfach drinnen oder auf der Terrasse Platz.",
    },
    footer: {
      legalLink: "Impressum & Datenschutz",
      cookiesLink: "Cookies",
      alcoholWarning:
        "Alkoholmissbrauch gefährdet Ihre Gesundheit – bitte genießen Sie verantwortungsbewusst.",
      walkInSummary: "Ohne Reservierung · Durchgehender Service",
    },
    cookies: {
      bannerAria: "Cookie-Einstellungen",
      message:
        "Wir verwenden Google Tag Manager / Analytics ausschließlich zur anonymen Reichweitenmessung, vorbehaltlich Ihrer Zustimmung.",
      accept: "Akzeptieren",
      decline: "Ablehnen",
    },
    legal: {
      heroTitle: "Impressum & Datenschutz",
      metaDescription:
        "Impressum, Herausgeber, Hosting und Datenschutzerklärung von Le Comptoir des Saints-Pères.",
      editorTitle: "1. Herausgeber der Website",
      editorCompanyLabel: "Firmenname",
      editorTradeLabel: "Geschäftsbezeichnung",
      editorCapitalLabel: "Stammkapital",
      editorRcsLabel: "Handelsregister (RCS)",
      editorSiretLabel: "SIRET",
      editorAddressLabel: "Firmensitz",
      editorPhoneLabel: "Telefon",
      editorEmailLabel: "E-Mail",
      hostTitle: "2. Hosting",
      hostText:
        "Diese Website wird gehostet von Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA (https://vercel.com).",
      privacyTitle: "3. Personenbezogene Daten & Cookies (DSGVO)",
      privacyText:
        "Diese Website nutzt Google Tag Manager (GTM-PBSB8XVM) ausschließlich zur Reichweitenmessung, standardmäßig deaktiviert (Google Consent Mode v2), bis Sie auf „Akzeptieren“ klicken. Sie können Ihre Auswahl jederzeit über den Link „Cookies“ in der Fußzeile ändern. Auf den Seiten Praktische Infos und Kontakt wird eine Karte von OpenStreetMap geladen (https://www.openstreetmap.org). Gemäß DSGVO können Sie Ihre Rechte geltend machen unter:",
      ipTitle: "4. Urheberrecht & gesetzliche Hinweise",
      ipText:
        "Alle Texte, Fotografien, Logos und grafischen Elemente auf dieser Website sind urheberrechtlich geschützt. Sämtliche Preise auf unserer Karte verstehen sich in Euro inklusive Mehrwertsteuer und Bedienung.",
    },
    aria: {
      mainNav: "Hauptnavigation",
      footerNav: "Fußzeilennavigation",
      openMenu: "Navigationsmenü öffnen",
      closeMenu: "Navigationsmenü schließen",
      skipToContent: "Zum Hauptinhalt springen",
      changeLanguage: "Sprache wechseln",
      chooseLanguage: "Sprache auswählen",
      heroImageAlt: "Terrasse des Le Comptoir des Saints-Pères in Saint-Germain-des-Prés",
      aboutLeftAlt: "Pariser Bistro-Terrasse im Le Comptoir des Saints-Pères",
      aboutRightAlt: "Historisches Fliesenmosaik für Fassbier, Spirituosen und Liköre",
      counterAlt: "Der Messingtresen im Le Comptoir des Saints-Pères",
      mapTitle: "OpenStreetMap-Standort — 29 Rue des Saints-Pères, Paris 6.",
    },
    error: {
      title: "Ein Fehler ist aufgetreten",
      retry: "Erneut versuchen",
      home: "Zur Startseite",
    },
    notFound: {
      label: "Seite nicht gefunden",
      sub: "Diese Seite existiert nicht oder wurde verschoben.",
      home: "Zur Startseite",
    },
  },
};

export type Dict = DictSchema;
