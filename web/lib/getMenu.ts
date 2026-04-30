import { groq } from "next-sanity";

import type { Locale } from "@/lib/i18n";
import { sanityClient } from "@/lib/sanity.client";
import { FALLBACK_MENU, type MenuCategoryData } from "@/lib/menu-fallback";

type SanityMenuCategory = {
  _id: string;
  title: string;
  title_en?: string;
  order: number;
  column: "left" | "right";
  intro?: string;
  intro_en?: string;
  priceColumns?: string[];
  singlePrice?: string;
  items: Array<{
    kind?: "item" | "divider";
    name: string;
    name_en?: string;
    price?: string;
    description?: string;
    description_en?: string;
    priceColumns?: string[];
  }>;
};

const MENU_QUERY = groq`*[_type == "menuCategory"] | order(order asc) {
  _id,
  title, title_en,
  order,
  column,
  intro, intro_en,
  priceColumns,
  singlePrice,
  items[]{ kind, name, name_en, price, description, description_en, priceColumns }
}`;

/** Résout la version locale d'une catégorie (titre, intro, descriptions des items). */
function resolveLocale(cat: SanityMenuCategory, locale: Locale): MenuCategoryData {
  return {
    _id: cat._id,
    title: (locale === "en" && cat.title_en?.trim()) ? cat.title_en : cat.title,
    order: cat.order,
    column: cat.column,
    intro: (locale === "en" && cat.intro_en?.trim()) ? cat.intro_en : cat.intro,
    priceColumns: cat.priceColumns,
    singlePrice: cat.singlePrice,
    items: cat.items.map((item) => ({
      kind: item.kind,
      name: (locale === "en" && item.name_en?.trim()) ? item.name_en : item.name,
      price: item.price,
      priceColumns: item.priceColumns,
      description:
        locale === "en" && item.description_en?.trim()
          ? item.description_en
          : item.description,
    })),
  };
}

export async function getMenu(locale: Locale = "fr"): Promise<MenuCategoryData[]> {
  if (!sanityClient) return FALLBACK_MENU;
  try {
    const data = await sanityClient.fetch<SanityMenuCategory[]>(MENU_QUERY);
    if (!data || data.length === 0) return FALLBACK_MENU;
    return data.map((cat) => resolveLocale(cat, locale));
  } catch {
    return FALLBACK_MENU;
  }
}
