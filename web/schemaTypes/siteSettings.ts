import { defineField, defineType } from "sanity";

/**
 * Paramètres globaux du site — singleton.
 * Les champs sans suffixe = version française (défaut).
 * Les champs _en = traduction anglaise (facultative, fall-back sur FR si absent).
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  groups: [
    { name: "general", title: "Général", default: true },
    { name: "hero", title: "Hero — FR" },
    { name: "hero_en", title: "Hero — EN" },
    { name: "menu", title: "Section carte — FR" },
    { name: "menu_en", title: "Section carte — EN" },
    { name: "about", title: "À propos — FR" },
    { name: "about_en", title: "À propos — EN" },
    { name: "contact", title: "Contact — FR" },
    { name: "contact_en", title: "Contact — EN" },
    { name: "infos", title: "Infos pratiques — FR" },
    { name: "infos_en", title: "Infos pratiques — EN" },
  ],
  fields: [
    /* ── Général (non traduit) ── */
    defineField({
      name: "name",
      title: "Nom du restaurant",
      type: "string",
      group: "general",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "addressUrl",
      title: "Lien Google Maps",
      type: "url",
      group: "general",
    }),
    defineField({
      name: "phone",
      title: "Téléphone",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "instagramUrl",
      title: "URL Instagram",
      type: "url",
      group: "general",
    }),

    /* ── Hero FR ── */
    defineField({
      name: "heroImage",
      title: "Image hero (parallax)",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Titre hero — FR",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroWelcome",
      title: "Sous-titre hero — FR",
      type: "text",
      rows: 3,
      group: "hero",
    }),

    /* ── Hero EN ── */
    defineField({
      name: "heroTitle_en",
      title: "Titre hero — EN",
      type: "string",
      group: "hero_en",
    }),
    defineField({
      name: "heroWelcome_en",
      title: "Sous-titre hero — EN",
      type: "text",
      rows: 3,
      group: "hero_en",
    }),

    /* ── Menu FR ── */
    defineField({
      name: "menuEyebrow",
      title: "Surtitre section carte — FR",
      type: "string",
      group: "menu",
    }),
    defineField({
      name: "menuTitle",
      title: "Titre section carte — FR (ex. La Carte)",
      type: "string",
      group: "menu",
    }),

    /* ── Menu EN ── */
    defineField({
      name: "menuEyebrow_en",
      title: "Surtitre section carte — EN",
      type: "string",
      group: "menu_en",
    }),
    defineField({
      name: "menuTitle_en",
      title: "Titre section carte — EN (ex. Our Menu)",
      type: "string",
      group: "menu_en",
    }),

    /* ── À propos FR ── */
    defineField({
      name: "aboutEyebrow",
      title: "À propos — surtitre FR",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutTitle",
      title: "À propos — titre FR",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutText",
      title: "À propos — texte FR",
      type: "text",
      rows: 5,
      group: "about",
    }),
    defineField({
      name: "aboutImageLeft",
      title: "À propos — image gauche",
      type: "image",
      options: { hotspot: true },
      group: "about",
    }),
    defineField({
      name: "aboutImageRight",
      title: "À propos — image droite",
      type: "image",
      options: { hotspot: true },
      group: "about",
    }),

    /* ── À propos EN ── */
    defineField({
      name: "aboutEyebrow_en",
      title: "À propos — surtitre EN",
      type: "string",
      group: "about_en",
    }),
    defineField({
      name: "aboutTitle_en",
      title: "À propos — titre EN",
      type: "string",
      group: "about_en",
    }),
    defineField({
      name: "aboutText_en",
      title: "À propos — texte EN",
      type: "text",
      rows: 5,
      group: "about_en",
    }),

    /* ── Contact FR ── */
    defineField({
      name: "contactTitle",
      title: "Contact — titre FR (ex. Nous contacter)",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactDays",
      title: "Contact — mention jours FR",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactCtaLabel",
      title: "Contact — libellé bouton FR",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactImage",
      title: "Contact — image colonne droite",
      type: "image",
      options: { hotspot: true },
      group: "contact",
    }),

    /* ── Contact EN ── */
    defineField({
      name: "contactTitle_en",
      title: "Contact — titre EN (ex. Contact us)",
      type: "string",
      group: "contact_en",
    }),
    defineField({
      name: "contactDays_en",
      title: "Contact — mention jours EN",
      type: "string",
      group: "contact_en",
    }),
    defineField({
      name: "contactCtaLabel_en",
      title: "Contact — libellé bouton EN",
      type: "string",
      group: "contact_en",
    }),

    /* ── Infos pratiques FR ── */
    defineField({
      name: "infosHeroTitle",
      title: "Infos — titre hero FR",
      type: "string",
      group: "infos",
    }),
    defineField({
      name: "hoursEyebrow",
      title: "Horaires — surtitre FR (ex. BIENVENUE)",
      type: "string",
      group: "infos",
    }),
    defineField({
      name: "hoursTitle",
      title: "Horaires — titre FR",
      type: "string",
      group: "infos",
    }),
    defineField({
      name: "hoursLines",
      title: "Horaires — lignes FR",
      type: "array",
      of: [{ type: "string" }],
      group: "infos",
    }),
    defineField({
      name: "addressTitle",
      title: "Adresse — titre FR",
      type: "string",
      group: "infos",
    }),
    defineField({
      name: "directionsTitle",
      title: "Itinéraire — titre FR",
      type: "string",
      group: "infos",
    }),
    defineField({
      name: "directionsText",
      title: "Itinéraire — texte FR",
      type: "text",
      rows: 3,
      group: "infos",
    }),
    defineField({
      name: "directionsMetro",
      title: "Itinéraire — mention métros FR",
      type: "string",
      group: "infos",
    }),
    defineField({
      name: "mapLat",
      title: "Latitude (carte)",
      type: "number",
      group: "infos",
      initialValue: 48.8563,
    }),
    defineField({
      name: "mapLng",
      title: "Longitude (carte)",
      type: "number",
      group: "infos",
      initialValue: 2.3318,
    }),

    /* ── Infos pratiques EN ── */
    defineField({
      name: "infosHeroTitle_en",
      title: "Infos — titre hero EN",
      type: "string",
      group: "infos_en",
    }),
    defineField({
      name: "hoursEyebrow_en",
      title: "Horaires — surtitre EN (ex. WELCOME)",
      type: "string",
      group: "infos_en",
    }),
    defineField({
      name: "hoursTitle_en",
      title: "Horaires — titre EN",
      type: "string",
      group: "infos_en",
    }),
    defineField({
      name: "hoursLines_en",
      title: "Horaires — lignes EN",
      type: "array",
      of: [{ type: "string" }],
      group: "infos_en",
    }),
    defineField({
      name: "addressTitle_en",
      title: "Adresse — titre EN",
      type: "string",
      group: "infos_en",
    }),
    defineField({
      name: "directionsTitle_en",
      title: "Itinéraire — titre EN",
      type: "string",
      group: "infos_en",
    }),
    defineField({
      name: "directionsText_en",
      title: "Itinéraire — texte EN",
      type: "text",
      rows: 3,
      group: "infos_en",
    }),
    defineField({
      name: "directionsMetro_en",
      title: "Itinéraire — mention métros EN",
      type: "string",
      group: "infos_en",
    }),
  ],
  preview: {
    select: { title: "name" },
    prepare({ title }) {
      return { title: title ?? "Paramètres du site" };
    },
  },
});
