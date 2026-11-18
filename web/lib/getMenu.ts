import { groq } from "next-sanity";

import type { Locale } from "@/lib/i18n";
import { sanityClient } from "@/lib/sanity.client";
import {
  FALLBACK_MENU_RAW,
  localizePriceColumns,
  localizePriceString,
  pickMenuTranslation,
  resolveFallbackMenu,
  type MenuCategoryData,
} from "@/lib/menu-fallback";

type SanityMenuCategory = Record<string, unknown> & {
  _id: string;
  title: string;
  order: number;
  column: "left" | "right";
  intro?: string;
  priceColumns?: string[];
  singlePrice?: string;
  items: Array<
    Record<string, unknown> & {
      kind?: "item" | "divider";
      name: string;
      price?: string;
      description?: string;
      allergens?: string[];
      priceColumns?: string[];
    }
  >;
};

const MENU_QUERY = groq`*[_type == "menuCategory"] | order(order asc) {
  _id,
  title, title_en, title_es, title_it, title_de,
  order,
  column,
  intro, intro_en, intro_es, intro_it, intro_de,
  priceColumns,
  singlePrice,
  items[]{
    kind,
    name, name_en, name_es, name_it, name_de,
    price,
    description, description_en, description_es, description_it, description_de,
    allergens,
    priceColumns
  }
}`;

const NATURAL_FOOD_ORDER: Record<string, number> = {
  "cat-entrees": 1,
  "cat-salades": 2,
  "cat-croques": 3,
  "cat-quiches": 4,
  "cat-plats": 5,
  "cat-oeufs": 6,
  "cat-fromages": 7,
  "cat-desserts": 8,
};

const fallbackCatById = new Map(FALLBACK_MENU_RAW.map((c) => [c._id, c]));
const fallbackItemByFrName = new Map(
  FALLBACK_MENU_RAW.flatMap((c) =>
    c.items.map((it) => [it.name.trim().toLowerCase(), it] as const),
  ),
);

function resolveLocale(cat: SanityMenuCategory, locale: Locale): MenuCategoryData {
  const fbCat = fallbackCatById.get(cat._id) as unknown as Record<string, unknown> | undefined;

  return {
    _id: cat._id,
    title: pickMenuTranslation(cat, "title", locale, fbCat) ?? cat.title,
    order: NATURAL_FOOD_ORDER[cat._id] ?? cat.order,
    column: cat.column,
    intro: pickMenuTranslation(cat, "intro", locale, fbCat),
    priceColumns: localizePriceColumns(cat.priceColumns, locale),
    singlePrice: cat.singlePrice,
    items: (cat.items ?? []).map((item) => {
      const fbItem = fallbackItemByFrName.get(
        item.name.trim().toLowerCase(),
      ) as unknown as Record<string, unknown> | undefined;

      return {
        kind: item.kind,
        name: pickMenuTranslation(item, "name", locale, fbItem) ?? item.name,
        price: localizePriceString(item.price, locale),
        priceColumns: localizePriceColumns(item.priceColumns, locale),
        description: pickMenuTranslation(item, "description", locale, fbItem),
        allergens: item.allergens,
      };
    }),
  };
}

export async function getMenu(locale: Locale = "fr"): Promise<MenuCategoryData[]> {
  if (!sanityClient) return resolveFallbackMenu(locale);
  try {
    const data = await sanityClient.fetch<SanityMenuCategory[]>(MENU_QUERY);
    if (!data || data.length === 0) return resolveFallbackMenu(locale);
    return data
      .map((cat) => resolveLocale(cat, locale))
      .sort((a, b) => a.order - b.order);
  } catch {
    return resolveFallbackMenu(locale);
  }
}
