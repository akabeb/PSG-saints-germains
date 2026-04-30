import { defineField, defineType } from "sanity";

/**
 * Catégorie du menu (LES PLATS, LES VINS, etc.)
 * Les noms des plats restent en français (restaurant français authentique).
 * title_en / intro_en permettent de traduire les en-têtes si souhaité.
 */
export const menuCategory = defineType({
  name: "menuCategory",
  title: "Catégorie du menu",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre — FR (ex. LES PLATS)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title_en",
      title: "Titre — EN (ex. MAINS, optionnel)",
      description: "Laissez vide pour conserver le titre français sur la version anglaise.",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      validation: (r) => r.required().integer().min(0),
    }),
    defineField({
      name: "column",
      title: "Colonne",
      type: "string",
      options: {
        list: [
          { title: "Gauche (nourriture)", value: "left" },
          { title: "Droite (boissons)", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    }),
    defineField({
      name: "priceColumns",
      title: "Colonnes de prix (vins : 14cL, 25cL, 50cL, 75cL)",
      description: "Laissez vide pour un prix simple par item.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "singlePrice",
      title: "Prix unique pour toute la catégorie (optionnel)",
      description: "Ex. « 8.3€ » pour LES JUS PRESSÉS — tous les items partagent ce prix.",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Texte d'intro — FR (optionnel, sous le titre)",
      type: "string",
    }),
    defineField({
      name: "intro_en",
      title: "Texte d'intro — EN (optionnel)",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "menuItem",
          title: "Item",
          fields: [
            defineField({
              name: "kind",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Item (plat / boisson)", value: "item" },
                  { title: "Sous-divider (titre intermédiaire)", value: "divider" },
                ],
                layout: "radio",
              },
              initialValue: "item",
            }),
            defineField({
              name: "name",
              title: "Nom — FR",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "name_en",
              title: "Nom — EN (optionnel)",
              description: "Laissez vide pour conserver le nom français.",
              type: "string",
              hidden: ({ parent }) => parent?.kind === "divider",
            }),
            defineField({
              name: "price",
              title: "Prix (texte libre — ex. « 16.2€ » ou « 5.3€ / 8.7€ / 17.2€ / 25€ »)",
              type: "string",
              hidden: ({ parent }) => parent?.kind === "divider",
            }),
            defineField({
              name: "description",
              title: "Description / composition — FR",
              type: "text",
              rows: 2,
              hidden: ({ parent }) => parent?.kind === "divider",
            }),
            defineField({
              name: "description_en",
              title: "Description / composition — EN (optionnel)",
              type: "text",
              rows: 2,
              hidden: ({ parent }) => parent?.kind === "divider",
            }),
            defineField({
              name: "priceColumns",
              title: "Colonnes de prix du sous-divider (ex. 25cL, 50cL)",
              description: "Affiché à droite du titre intermédiaire. Laissez vide pour hériter des colonnes de la catégorie.",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
              hidden: ({ parent }) => parent?.kind !== "divider",
            }),
          ],
          preview: {
            select: { name: "name", price: "price", kind: "kind" },
            prepare({ name, price, kind }) {
              return {
                title: kind === "divider" ? `— ${name} —` : name,
                subtitle: kind === "divider" ? "Sous-divider" : price,
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
    select: { title: "title", order: "order", column: "column" },
    prepare({ title, order, column }) {
      return {
        title: title ?? "Sans titre",
        subtitle: `#${order ?? "?"} — colonne ${column ?? "?"}`,
      };
    },
  },
});
