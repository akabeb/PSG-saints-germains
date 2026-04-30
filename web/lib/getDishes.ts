import { groq } from "next-sanity";

import { sanityClient } from "@/lib/sanity.client";
import type { Dish } from "@/lib/types.dish";

const DISHES_QUERY = groq`*[_type == "dish"] | order(name asc) {
  _id,
  name,
  description,
  price,
  category,
  image,
  allergens,
  onMenu
}`;

export async function getDishes(): Promise<Dish[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<Dish[]>(DISHES_QUERY);
  } catch {
    return [];
  }
}

export const CATEGORY_ORDER: Dish["category"][] = [
  "entree",
  "plat",
  "dessert",
  "vin",
];

export const CATEGORY_LABELS: Record<Dish["category"], string> = {
  entree: "Entrées",
  plat: "Plats",
  dessert: "Desserts",
  vin: "Vins",
};

export function groupDishesByCategory(dishes: Dish[]) {
  const map = new Map<Dish["category"], Dish[]>();
  for (const cat of CATEGORY_ORDER) map.set(cat, []);
  for (const dish of dishes) {
    const list = map.get(dish.category);
    if (list) list.push(dish);
  }
  return CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    dishes: map.get(category) ?? [],
  })).filter((section) => section.dishes.length > 0);
}
