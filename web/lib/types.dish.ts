export type DishCategory = "entree" | "plat" | "dessert" | "vin";

export type DishImage = {
  asset?: { _ref: string };
  alt?: string;
};

export type Dish = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: DishCategory;
  image?: DishImage;
  allergens?: string[];
  onMenu?: boolean;
};
