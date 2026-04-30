/**
 * i18n config — FR (par défaut) et EN.
 * Le drapeau anglais utilisé est l'Union Jack (gb.png), pas le drapeau US.
 */
export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export const localeMeta: Record<Locale, { label: string; flag: string; htmlLang: string }> = {
  fr: { label: "Français", flag: "/assets/flag-fr.png", htmlLang: "fr" },
  en: { label: "English", flag: "/assets/flag-gb.png", htmlLang: "en" },
};

/** Dictionnaire des chaînes UI hardcodées. Le contenu CMS (Sanity) est traduit via champs _en. */
export const dict = {
  fr: {
    nav: {
      home: "Accueil",
      menu: "La Carte",
      infos: "Infos pratiques",
      contact: "Contact",
    },
    menu: {
      foodSeparator: "Plats & Salades",
      drinksSeparator: "Boissons",
    },
    home: {
      menuTitle: "La Carte",
    },
    contact: {
      addressLabel: "Adresse",
      phoneLabel: "Téléphone",
      emailLabel: "E-mail",
      hoursLabel: "Horaires",
      directionsLabel: "Itinéraire",
      pageTitle: "Nous contacter",
      formPlaceholder: "Votre message",
      formSubmit: "Envoyer",
    },
    menu_page: {
      heroTitle: "La Carte",
    },
    infos: {
      heroTitle: "Infos Pratiques",
    },
    aria: {
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      skipToContent: "Aller au contenu",
    },
    error: {
      title: "Une erreur s'est produite",
      retry: "Réessayer",
      home: "Revenir à l'accueil",
    },
    notFound: {
      label: "Page introuvable",
      sub: "Cette page n'existe pas.",
      home: "Revenir à l'accueil",
    },
  },
  en: {
    nav: {
      home: "Home",
      menu: "The Menu",
      infos: "Useful info",
      contact: "Contact",
    },
    menu: {
      foodSeparator: "Food",
      drinksSeparator: "Drinks",
    },
    home: {
      menuTitle: "Our Menu",
    },
    contact: {
      addressLabel: "Address",
      phoneLabel: "Phone",
      emailLabel: "Email",
      hoursLabel: "Opening hours",
      directionsLabel: "Directions",
      pageTitle: "Contact us",
      formPlaceholder: "Your message",
      formSubmit: "Send",
    },
    menu_page: {
      heroTitle: "Our Menu",
    },
    infos: {
      heroTitle: "Practical Info",
    },
    aria: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      skipToContent: "Skip to content",
    },
    error: {
      title: "Something went wrong",
      retry: "Try again",
      home: "Back to home",
    },
    notFound: {
      label: "Page not found",
      sub: "This page does not exist.",
      home: "Back to home",
    },
  },
} as const;

export type Dict = (typeof dict)[Locale];
