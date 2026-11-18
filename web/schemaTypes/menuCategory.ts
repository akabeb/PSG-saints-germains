import { defineField, defineType } from "sanity";

/**
 * Catégorie du menu — séparation stricte entre :
 *   1. « Carte & Prix » (vue principale : choix, composition FR et PRIX UNIQUE partagé par toutes les langues)
 *   2. « Traductions (EN · ES · IT · DE) » (repliées à part pour ne jamais alourdir les mises à jour de tarifs)
 */
export const menuCategory = defineType({
  name: "menuCategory",
  title: "Catégorie du menu",
  type: "document",
  groups: [
    { name: "pricing", title: "Carte & Prix", default: true },
    { name: "i18n", title: "Traductions (EN · ES · IT · DE)" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre — FR (ex. LES PLATS)",
      type: "string",
      group: "pricing",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      group: "pricing",
      validation: (r) => r.required().integer().min(0),
    }),
    defineField({
      name: "column",
      title: "Section",
      type: "string",
      group: "pricing",
      options: {
        list: [
          { title: "Cuisine & Assiettes (gauche)", value: "left" },
          { title: "Cave & Boissons (droite)", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    }),
    defineField({
      name: "singlePrice",
      title: "Prix unique pour toute la catégorie (optionnel — toutes langues)",
      description:
        "Ex. « 8.8€ » pour LES JUS PRESSÉS. Un seul tarif à modifier pour les 5 langues.",
      type: "string",
      group: "pricing",
    }),
    defineField({
      name: "priceColumns",
      title: "Colonnes de contenances (ex. 14cL, 25cL, 50cL, 75cL)",
      description:
        "Les mots comme « Bouteille » sont traduits automatiquement en EN/ES/IT/DE.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "pricing",
    }),
    defineField({
      name: "intro",
      title: "Texte d'intro — FR (optionnel, ex. « Prix par défaut : 11.8€ »)",
      type: "string",
      group: "pricing",
    }),

    /* ── Traductions catégorie (onglet séparé) ── */
    defineField({
      name: "title_en",
      title: "Titre — EN",
      type: "string",
      group: "i18n",
    }),
    defineField({
      name: "title_es",
      title: "Titre — ES",
      type: "string",
      group: "i18n",
    }),
    defineField({
      name: "title_it",
      title: "Titre — IT",
      type: "string",
      group: "i18n",
    }),
    defineField({
      name: "title_de",
      title: "Titre — DE",
      type: "string",
      group: "i18n",
    }),
    defineField({
      name: "intro_en",
      title: "Texte d'intro — EN",
      type: "string",
      group: "i18n",
    }),
    defineField({
      name: "intro_es",
      title: "Texte d'intro — ES",
      type: "string",
      group: "i18n",
    }),
    defineField({
      name: "intro_it",
      title: "Texte d'intro — IT",
      type: "string",
      group: "i18n",
    }),
    defineField({
      name: "intro_de",
      title: "Texte d'intro — DE",
      type: "string",
      group: "i18n",
    }),

    /* ── Liste des choix & prix ── */
    defineField({
      name: "items",
      title: "Choix & Prix",
      type: "array",
      group: "pricing",
      of: [
        {
          type: "object",
          name: "menuItem",
          title: "Choix",
          fieldsets: [
            {
              name: "translations",
              title: "Traductions du plat (EN · ES · IT · DE)",
              options: { collapsible: true, collapsed: true },
            },
          ],
          fields: [
            defineField({
              name: "kind",
              title: "Type de ligne",
              type: "string",
              options: {
                list: [
                  { title: "Plat / Boisson (avec prix)", value: "item" },
                  { title: "Sous-titre intermédiaire (divider)", value: "divider" },
                ],
                layout: "radio",
              },
              initialValue: "item",
            }),
            defineField({
              name: "name",
              title: "Intitulé (FR)",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "price",
              title: "Prix (€) — unique pour toutes les langues",
              description:
                "Ex. « 23.9€ », « 5.7€ / 9.0€ / 17.5€ / 26€ » ou « les 6 : 11.5€ // les 12 : 19.9€ » (les unités sont traduites automatiquement).",
              type: "string",
              hidden: ({ parent }) => parent?.kind === "divider",
            }),
            defineField({
              name: "description",
              title: "Composition / garniture (FR)",
              type: "text",
              rows: 2,
              hidden: ({ parent }) => parent?.kind === "divider",
            }),
            defineField({
              name: "priceColumns",
              title: "Colonnes de contenances du sous-titre (ex. 25cL, 50cL)",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
              hidden: ({ parent }) => parent?.kind !== "divider",
            }),
            defineField({
              name: "allergens",
              title: "Allergènes majeurs (optionnel)",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
              hidden: ({ parent }) => parent?.kind === "divider",
            }),

            /* ── Traductions repliées (séparées du prix !) ── */
            defineField({
              name: "name_en",
              title: "Intitulé — English (EN)",
              type: "string",
              fieldset: "translations",
            }),
            defineField({
              name: "description_en",
              title: "Composition — English (EN)",
              type: "text",
              rows: 2,
              fieldset: "translations",
              hidden: ({ parent }) => parent?.kind === "divider",
            }),
            defineField({
              name: "name_es",
              title: "Intitulé — Español (ES)",
              type: "string",
              fieldset: "translations",
            }),
            defineField({
              name: "description_es",
              title: "Composition — Español (ES)",
              type: "text",
              rows: 2,
              fieldset: "translations",
              hidden: ({ parent }) => parent?.kind === "divider",
            }),
            defineField({
              name: "name_it",
              title: "Intitulé — Italiano (IT)",
              type: "string",
              fieldset: "translations",
            }),
            defineField({
              name: "description_it",
              title: "Composition — Italiano (IT)",
              type: "text",
              rows: 2,
              fieldset: "translations",
              hidden: ({ parent }) => parent?.kind === "divider",
            }),
            defineField({
              name: "name_de",
              title: "Intitulé — Deutsch (DE)",
              type: "string",
              fieldset: "translations",
            }),
            defineField({
              name: "description_de",
              title: "Composition — Deutsch (DE)",
              type: "text",
              rows: 2,
              fieldset: "translations",
              hidden: ({ parent }) => parent?.kind === "divider",
            }),
          ],
          preview: {
            select: { name: "name", price: "price", kind: "kind" },
            prepare({ name, price, kind }) {
              return {
                title: kind === "divider" ? `— ${name} —` : name,
                subtitle: kind === "divider" ? "Sous-titre" : price || "Prix de catégorie",
              };
            },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", order: "order", column: "column", singlePrice: "singlePrice" },
    prepare({ title, order, column, singlePrice }) {
      const colLabel = column === "right" ? "Boissons" : "Cuisine";
      const priceHint = singlePrice ? ` · ${singlePrice}` : "";
      return {
        title: title ?? "Sans titre",
        subtitle: `#${order ?? "?"} — ${colLabel}${priceHint}`,
      };
    },
  },
});
