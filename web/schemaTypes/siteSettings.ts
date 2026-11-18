import { defineField, defineType } from "sanity";

const TRANSLATION_LANGUAGES = [
  { code: "en", label: "English (EN)" },
  { code: "es", label: "Español (ES)" },
  { code: "it", label: "Italiano (IT)" },
  { code: "de", label: "Deutsch (DE)" },
] as const;

/**
 * Paramètres globaux du site — singleton.
 * Séparation claire en 3 onglets :
 *   1. « Coordonnées & Médias » (données communes non traduites : adresse, tél, photos, GPS)
 *   2. « Textes & Horaires (FR) » (langue de référence française)
 *   3. « Traductions (EN · ES · IT · DE) » (repliées par langue, facultatives avec repli automatique)
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  groups: [
    { name: "general", title: "Coordonnées & Médias", default: true },
    { name: "fr", title: "Textes & Horaires (FR)" },
    { name: "i18n", title: "Traductions (EN · ES · IT · DE)" },
  ],
  fieldsets: TRANSLATION_LANGUAGES.map((lang) => ({
    name: `i18n_${lang.code}`,
    title: `Traductions — ${lang.label}`,
    options: { collapsible: true, collapsed: lang.code !== "en" },
  })),
  fields: [
    /* ── 1. Coordonnées & Médias (partagés entre toutes les langues) ── */
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
    defineField({
      name: "mapLat",
      title: "Latitude (carte)",
      type: "number",
      group: "general",
      initialValue: 48.8563,
    }),
    defineField({
      name: "mapLng",
      title: "Longitude (carte)",
      type: "number",
      group: "general",
      initialValue: 2.3318,
    }),
    defineField({
      name: "heroImage",
      title: "Image hero (parallax)",
      type: "image",
      options: { hotspot: true },
      group: "general",
    }),
    defineField({
      name: "aboutImageLeft",
      title: "À propos — image gauche",
      type: "image",
      options: { hotspot: true },
      group: "general",
    }),
    defineField({
      name: "aboutImageRight",
      title: "À propos — image droite",
      type: "image",
      options: { hotspot: true },
      group: "general",
    }),
    defineField({
      name: "contactImage",
      title: "Contact — image colonne droite",
      type: "image",
      options: { hotspot: true },
      group: "general",
    }),

    /* ── 2. Textes & Horaires — Français (FR) ── */
    defineField({
      name: "heroTitle",
      title: "Titre hero — FR",
      type: "string",
      group: "fr",
    }),
    defineField({
      name: "heroWelcome",
      title: "Sous-titre hero — FR",
      type: "text",
      rows: 3,
      group: "fr",
    }),
    defineField({
      name: "menuEyebrow",
      title: "Surtitre section carte — FR",
      type: "string",
      group: "fr",
    }),
    defineField({
      name: "menuTitle",
      title: "Titre section carte — FR (ex. La Carte)",
      type: "string",
      group: "fr",
    }),
    defineField({
      name: "aboutEyebrow",
      title: "À propos — surtitre FR",
      type: "string",
      group: "fr",
    }),
    defineField({
      name: "aboutTitle",
      title: "À propos — titre FR",
      type: "string",
      group: "fr",
    }),
    defineField({
      name: "aboutText",
      title: "À propos — texte FR",
      type: "text",
      rows: 5,
      group: "fr",
    }),
    defineField({
      name: "contactTitle",
      title: "Contact — titre FR (ex. Nous contacter)",
      type: "string",
      group: "fr",
    }),
    defineField({
      name: "contactDays",
      title: "Contact — mention jours FR",
      type: "string",
      group: "fr",
    }),
    defineField({
      name: "contactCtaLabel",
      title: "Contact — libellé bouton FR",
      type: "string",
      group: "fr",
    }),
    defineField({
      name: "infosHeroTitle",
      title: "Infos — titre hero FR",
      type: "string",
      group: "fr",
    }),
    defineField({
      name: "hoursEyebrow",
      title: "Horaires — surtitre FR (ex. BIENVENUE)",
      type: "string",
      group: "fr",
    }),
    defineField({
      name: "hoursTitle",
      title: "Horaires — titre FR",
      type: "string",
      group: "fr",
    }),
    defineField({
      name: "hoursLines",
      title: "Horaires — lignes FR",
      type: "array",
      of: [{ type: "string" }],
      group: "fr",
    }),
    defineField({
      name: "addressTitle",
      title: "Adresse — titre FR",
      type: "string",
      group: "fr",
    }),
    defineField({
      name: "directionsTitle",
      title: "Itinéraire — titre FR",
      type: "string",
      group: "fr",
    }),
    defineField({
      name: "directionsText",
      title: "Itinéraire — texte FR",
      type: "text",
      rows: 3,
      group: "fr",
    }),
    defineField({
      name: "directionsMetro",
      title: "Itinéraire — mention métros FR",
      type: "string",
      group: "fr",
    }),

    /* ── 3. Traductions repliées par langue (EN · ES · IT · DE) ── */
    ...TRANSLATION_LANGUAGES.flatMap(({ code, label }) => {
      const fs = `i18n_${code}`;
      const tag = code.toUpperCase();
      return [
        defineField({
          name: `heroTitle_${code}`,
          title: `Titre hero — ${tag} (${label})`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `heroWelcome_${code}`,
          title: `Sous-titre hero — ${tag}`,
          type: "text",
          rows: 3,
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `menuEyebrow_${code}`,
          title: `Surtitre section carte — ${tag}`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `menuTitle_${code}`,
          title: `Titre section carte — ${tag}`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `aboutEyebrow_${code}`,
          title: `À propos — surtitre ${tag}`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `aboutTitle_${code}`,
          title: `À propos — titre ${tag}`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `aboutText_${code}`,
          title: `À propos — texte ${tag}`,
          type: "text",
          rows: 5,
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `contactTitle_${code}`,
          title: `Contact — titre ${tag}`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `contactDays_${code}`,
          title: `Contact — mention jours ${tag}`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `contactCtaLabel_${code}`,
          title: `Contact — libellé bouton ${tag}`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `infosHeroTitle_${code}`,
          title: `Infos — titre hero ${tag}`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `hoursEyebrow_${code}`,
          title: `Horaires — surtitre ${tag}`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `hoursTitle_${code}`,
          title: `Horaires — titre ${tag}`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `hoursLines_${code}`,
          title: `Horaires — lignes ${tag}`,
          type: "array",
          of: [{ type: "string" }],
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `addressTitle_${code}`,
          title: `Adresse — titre ${tag}`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `directionsTitle_${code}`,
          title: `Itinéraire — titre ${tag}`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `directionsText_${code}`,
          title: `Itinéraire — texte ${tag}`,
          type: "text",
          rows: 3,
          group: "i18n",
          fieldset: fs,
        }),
        defineField({
          name: `directionsMetro_${code}`,
          title: `Itinéraire — mention métros ${tag}`,
          type: "string",
          group: "i18n",
          fieldset: fs,
        }),
      ];
    }),
  ],
  preview: {
    select: { title: "name" },
    prepare({ title }) {
      return { title: title ?? "Paramètres du site" };
    },
  },
});
