import { defineField, defineType } from "sanity";

export const dish = defineType({
  name: "dish",
  title: "Plat",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "price",
      title: "Prix (€)",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Entrée", value: "entree" },
          { title: "Plat", value: "plat" },
          { title: "Dessert", value: "dessert" },
          { title: "Vin", value: "vin" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Texte alternatif",
        }),
      ],
    }),
    defineField({
      name: "allergens",
      title: "Allergènes",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "onMenu",
      title: "Au menu (formule)",
      description:
        "Activé : plat proposé dans un menu. Désactivé : proposé à la carte.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? "Sans nom",
        subtitle: subtitle ?? "",
        media,
      };
    },
  },
});
