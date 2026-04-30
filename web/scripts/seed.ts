/**
 * Seed Sanity — injecte siteSettings (FR+EN) + toutes les menuCategory.
 * Usage :
 *   1. Ajouter dans .env.local :  SANITY_WRITE_TOKEN=skXXXX...
 *   2. npx tsx scripts/seed.ts
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { resolve } from "node:path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "z0nk1sgq";
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    || "production";
const TOKEN      = process.env.SANITY_WRITE_TOKEN;

if (!TOKEN) {
  console.error(
    "\n❌  SANITY_WRITE_TOKEN manquant.\n" +
    "   Créez un token Éditeur sur https://sanity.io/manage →\n" +
    "   API → Tokens → Add API token, puis ajoutez-le dans .env.local :\n" +
    "   SANITY_WRITE_TOKEN=sk...\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  apiVersion: "2025-01-01",
  token: TOKEN,
  useCdn: false,
});

/* ─────────────────────────────────────────────
   siteSettings (singleton)
───────────────────────────────────────────── */
const SITE_SETTINGS = {
  _type: "siteSettings",
  _id:   "siteSettings",

  name:         "Le Comptoir des Saints-Pères",
  address:      "29 Rue des Saints-Pères, 75006 Paris",
  addressUrl:   "https://www.google.com/maps/search/?api=1&query=29+Rue+des+Saints-P%C3%A8res+75006+Paris",
  phone:        "01 40 20 09 39",
  email:        "christophe6eme@gmail.com",
  instagramUrl: "https://www.instagram.com/comptoirdessaintsperes/",

  heroTitle:   "Le Comptoir des Saints-Pères",
  heroWelcome: "Bienvenue au Comptoir des Saints-Pères, authentique bistrot parisien situé à Saint-Germain-des-Prés.",
  heroTitle_en:   "Le Comptoir des Saints-Pères",
  heroWelcome_en: "Welcome to the Comptoir des Saints-Pères, an authentic Parisian bistro in Saint-Germain-des-Prés.",

  menuEyebrow: "",
  menuTitle:   "La Carte",
  menuEyebrow_en: "",
  menuTitle_en:   "Our Menu",

  aboutEyebrow: "L'histoire du Comptoir des Saints-Pères",
  aboutTitle:   "A propos du bistrot",
  aboutText:    "Installez-vous là où Hemingway s'attablait, où Picasso déjeunait.\nL'équipe du Comptoir des Saints-Pères vous accueille à Saint-Germain-des-Prés, dans un bistrot parisien chargé d'histoire.",
  aboutEyebrow_en: "The story of the Comptoir des Saints-Pères",
  aboutTitle_en:   "About the bistro",
  aboutText_en:    "Settle in where Hemingway used to sit, where Picasso had lunch.\nThe team at the Comptoir des Saints-Pères welcomes you to Saint-Germain-des-Prés, in a historic Parisian bistro.",

  contactTitle:    "Nous contacter",
  contactDays:     "Du lundi au vendredi",
  contactCtaLabel: "Suivez-nous sur Instagram",
  contactTitle_en:    "Contact us",
  contactDays_en:     "Monday to Friday",
  contactCtaLabel_en: "Follow us on Instagram",

  infosHeroTitle:   "Infos Pratiques",
  hoursEyebrow:     "BIENVENUE",
  hoursTitle:       "Horaires",
  hoursLines:       [
    "Du lundi au vendredi 7h–23h30",
    "Samedi 8h–22h30",
    "Dimanche 9h–18h",
  ],
  addressTitle:     "ADRESSE",
  directionsTitle:  "Itinéraire",
  directionsText:   "Le Comptoir des Saints-Pères se situe entre le Musée d'Orsay, le Musée du Louvre et l'église de Saint-Germain-des-Prés",
  directionsMetro:  "Métros Saint-Germain-des-Prés (ligne 4) et Rue du Bac (ligne 12)",
  mapLat: 48.8563,
  mapLng: 2.3318,

  infosHeroTitle_en:   "Practical Info",
  hoursEyebrow_en:     "WELCOME",
  hoursTitle_en:       "Opening Hours",
  hoursLines_en:       [
    "Monday to Friday 7am–11:30pm",
    "Saturday 8am–10:30pm",
    "Sunday 9am–6pm",
  ],
  addressTitle_en:     "ADDRESS",
  directionsTitle_en:  "Getting Here",
  directionsText_en:   "The Comptoir des Saints-Pères is located between the Musée d'Orsay, the Louvre Museum and Saint-Germain-des-Prés church",
  directionsMetro_en:  "Metro Saint-Germain-des-Prés (line 4) and Rue du Bac (line 12)",
};

/* ─────────────────────────────────────────────
   menuCategory — carte complète (PDF 2026)
───────────────────────────────────────────── */
const MENU_CATEGORIES = [
  // ===== FOOD =====
  {
    _id: "cat-plats", _type: "menuCategory",
    title: "LES PLATS", title_en: "MAINS", order: 1, column: "left",
    items: [
      { _key: "p1",  kind: "item", name: "Assiette de roast beef froid",      name_en: "Cold roast beef plate",                      price: "16.7€", description: "Pommes sautées, mayonnaise",                                                                                        description_en: "Sautéed potatoes, mayonnaise" },
      { _key: "p2",  kind: "item", name: "Steak haché œuf à cheval",           name_en: "Ground beef steak with fried egg",            price: "16.3€", description: "Frites maison",                                                                                                      description_en: "Homemade fries" },
      { _key: "p3",  kind: "item", name: "Entrecôte",                          name_en: "Ribeye steak",                                price: "23.5€", description: "Pommes sautées / Sauce au choix : béarnaise, Bleu d'Auvergne ou poivre",                                              description_en: "Sautéed potatoes / Sauce of your choice: béarnaise, Bleu d'Auvergne or pepper" },
      { _key: "p4",  kind: "item", name: "Onglet de veau à la normande",       name_en: "Veal hanger steak Normand style",             price: "18.9€", description: "Frites maison",                                                                                                      description_en: "Homemade fries" },
      { _key: "p5",  kind: "item", name: "Tartare de boeuf",                   name_en: "Beef tartare",                                price: "18.2€", description: "Pommes sautées et mesclun",                                                                                           description_en: "Sautéed potatoes and mesclun" },
      { _key: "p6",  kind: "item", name: "Poulet fermier rôti",                name_en: "Roast free-range chicken",                    price: "17.2€", description: "Frites maison et mesclun",                                                                                            description_en: "Homemade fries and mesclun" },
      { _key: "p7",  kind: "item", name: "Comptoir burger",                    name_en: "Comptoir burger",                             price: "18.3€", description: "Supplément bacon (+2€)",                                                                                              description_en: "Bacon supplement (+€2)" },
      { _key: "p8",  kind: "item", name: "Linguine",                           name_en: "Linguine",                                    price: "16.9€", description: "Burrata, crème de balsamique, feuilles de basilic, tomates confites",                                                 description_en: "Burrata, balsamic cream, basil leaves, sun-dried tomatoes" },
      { _key: "p9",  kind: "item", name: "Burger végétarien",                  name_en: "Vegetarian burger",                           price: "18.3€", description: "Salade, tomate, beignet de légumes, crème ciboulette, avocat, concombre, cheddar. Frites maison et salade",          description_en: "Salad, tomato, vegetable fritter, chive cream, avocado, cucumber, cheddar. Homemade fries and salad" },
      { _key: "p10", kind: "item", name: "Pavé de saumon grillé, au citron confit", name_en: "Grilled salmon fillet with preserved lemon", price: "17.5€", description: "Haricots verts et riz 5 parfums",                                                                             description_en: "Green beans and 5-spice rice" },
      { _key: "pd1", kind: "divider", name: "Les garnitures supplémentaires",  name_en: "Side orders" },
      { _key: "p11", kind: "item", name: "Haricots verts frais",               name_en: "Fresh green beans",                           price: "+ 5.0€" },
      { _key: "p12", kind: "item", name: "Salade verte, frites maison, pommes sautées ou riz", name_en: "Green salad, homemade fries, sautéed potatoes or rice", price: "+ 4.2€" },
    ],
  },
  {
    _id: "cat-oeufs", _type: "menuCategory",
    title: "LES OEUFS & OMELETTES", title_en: "EGGS & OMELETTES", order: 2, column: "left",
    items: [
      { _key: "o0",  kind: "divider", name: "Œufs plein air",                 name_en: "Free-range eggs" },
      { _key: "o1",  kind: "item",    name: "Œufs au plat nature",             name_en: "Fried eggs (plain)",                          price: "8.8€" },
      { _key: "o1b", kind: "item",    name: "Œufs au plat au jambon",          name_en: "Fried eggs with ham",                         price: "9.4€" },
      { _key: "o2",  kind: "item",    name: "Œufs au plat bacon avec toast",   name_en: "Fried eggs with bacon and toast",              price: "11.2€" },
      { _key: "o3",  kind: "item",    name: "Omelette nature avec salade",     name_en: "Plain omelette with salad",                   price: "9.4€" },
      { _key: "od1", kind: "divider", name: "Omelette au choix avec salade",   name_en: "Omelette of your choice with salad" },
      { _key: "o4",  kind: "item",    name: "Jambon ou fromage ou champignons ou pommes de terre", name_en: "Ham, cheese, mushrooms or potatoes", price: "9.9€" },
      { _key: "o5",  kind: "item",    name: "Omelette mixte",                  name_en: "Mixed omelette",                              price: "10.4€", description: "Jambon et fromage avec salade",                    description_en: "Ham and cheese with salad" },
      { _key: "o6",  kind: "item",    name: "Omelette complète",               name_en: "Complete omelette",                           price: "11.3€", description: "Jambon, fromage et champignons avec salade",       description_en: "Ham, cheese and mushrooms with salad" },
      { _key: "o7",  kind: "item",    name: "Omelette Burrata",                name_en: "Burrata omelette",                            price: "13.7€", description: "Burrata, feuilles de basilic, tomates confites et pesto", description_en: "Burrata, basil leaves, sun-dried tomatoes and pesto" },
      { _key: "o8",  kind: "item",    name: "Supplément frites",               name_en: "Fries supplement",                            price: "+ 4.2€" },
    ],
  },
  {
    _id: "cat-fromages", _type: "menuCategory",
    title: "LES FROMAGES", title_en: "CHEESE", order: 3, column: "left",
    items: [
      { _key: "f1", kind: "item", name: "Camembert au lait cru, chèvre frais, Cantal, Bleu d'Auvergne", name_en: "Camembert, fresh goat cheese, Cantal, Bleu d'Auvergne", price: "7.0€", description: "Au choix", description_en: "Your choice" },
      { _key: "f2", kind: "item", name: "Assiette de 2 fromages",              name_en: "Cheese plate (2 cheeses)",                    price: "11.0€" },
      { _key: "f3", kind: "item", name: "Planche à partager, 4 fromages",      name_en: "Cheese board to share (4 cheeses)",           price: "18.8€" },
    ],
  },
  {
    _id: "cat-entrees", _type: "menuCategory",
    title: "LES ENTRÉES & ASSIETTES", title_en: "STARTERS & PLATTERS", order: 4, column: "left",
    items: [
      { _key: "e1",  kind: "item", name: "Assiette de tomates, Burrata, feuilles de basilic et pesto", name_en: "Tomato, Burrata, basil leaves and pesto plate",                               price: "13.4€" },
      { _key: "e2",  kind: "item", name: "Assiette végétarienne froide",       name_en: "Cold vegetarian plate",                       price: "11.5€", description: "Avocats, carottes râpées, haricots verts, concombre",           description_en: "Avocados, grated carrots, green beans, cucumber" },
      { _key: "e3",  kind: "item", name: "Planche de charcuterie",             name_en: "Charcuterie board",                           price: "17.6€", description: "Terrine de campagne, rillettes, rosette, jambon de pays, saucisse sèche", description_en: "Country terrine, rillettes, rosette, country ham, dry sausage" },
      { _key: "e4",  kind: "item", name: "Planche mixte",                      name_en: "Mixed board",                                 price: "18.1€", description: "Assortiment de charcuterie et fromages",                        description_en: "Assorted charcuterie and cheeses" },
      { _key: "e5",  kind: "item", name: "Assiette végétarienne chaude",       name_en: "Hot vegetarian plate",                        price: "12.1€", description: "En fonction du marché",                                         description_en: "According to market availability" },
      { _key: "e6",  kind: "item", name: "Assiette de saumon fumé & toast",    name_en: "Smoked salmon plate & toast",                 price: "17.1€" },
      { _key: "e7",  kind: "item", name: "Assiette de foie gras maison & toast", name_en: "Homemade foie gras plate & toast",          price: "18.3€" },
      { _key: "e8",  kind: "item", name: "Terrine de campagne",                name_en: "Country terrine",                             price: "7.9€" },
      { _key: "e9",  kind: "item", name: "Œuf dur mayonnaise",                 name_en: "Hard-boiled egg with mayonnaise",             price: "6.3€" },
      { _key: "e10", kind: "item", name: "Escargots de Bourgogne",             name_en: "Burgundy snails",                             price: "les 6 : 11€ – les 12 : 19.5€" },
      { _key: "e11", kind: "item", name: "Sardines Peita Pays basque",         name_en: "Basque country Peita sardines",               price: "10.9€" },
      { _key: "e12", kind: "item", name: "Jambon supérieur ou saucisses de Francfort & frites", name_en: "Premium ham or Frankfurt sausages & fries", price: "11.4€" },
    ],
  },
  {
    _id: "cat-salades", _type: "menuCategory",
    title: "LES SALADES", title_en: "SALADS", order: 5, column: "left",
    items: [
      { _key: "s1",  kind: "item", name: "Salade comptoir",         name_en: "Comptoir salad",               price: "13.3€", description: "Mesclun, tomates, pomme de terre, jambon, emmental, œuf dur",                     description_en: "Mesclun, tomatoes, potato, ham, emmental, hard-boiled egg" },
      { _key: "s2",  kind: "item", name: "Salade grecque",          name_en: "Greek salad",                  price: "13.3€", description: "Mesclun, tomates, oignon, feta, olives noires, pesto",                            description_en: "Mesclun, tomatoes, onion, feta, black olives, pesto" },
      { _key: "s3",  kind: "item", name: "Salade italienne",        name_en: "Italian salad",                price: "16.7€", description: "Jambon de pays, légumes grillés marinés, tomate, Burrata, Parmesan, mesclun, pesto", description_en: "Country ham, marinated grilled vegetables, tomato, Burrata, Parmesan, mesclun, pesto" },
      { _key: "s4",  kind: "item", name: "Salade de chèvre toasté", name_en: "Toasted goat cheese salad",   price: "14.6€", description: "Mesclun, chèvre toasté, tomates, lardons",                                        description_en: "Mesclun, toasted goat cheese, tomatoes, lardons" },
      { _key: "s5",  kind: "item", name: "Salade niçoise",          name_en: "Niçoise salad",                price: "16.3€", description: "Mesclun, tomates, haricots verts, œuf dur, anchois, olives noires, poivron, cœur d'artichaut", description_en: "Mesclun, tomatoes, green beans, hard-boiled egg, anchovies, black olives, pepper, artichoke heart" },
      { _key: "s6",  kind: "item", name: "Salade périgourdine",     name_en: "Périgord salad",               price: "17.4€", description: "Mesclun, magret fumé, haricots verts frais, champignons, tomates cerises et foie gras maison", description_en: "Mesclun, smoked duck breast, fresh green beans, mushrooms, cherry tomatoes and homemade foie gras" },
      { _key: "s7",  kind: "item", name: "Salade Caesar",           name_en: "Caesar salad",                 price: "16.4€", description: "Salade romaine, poulet, croûtons, Parmesan, sauce caesar maison",                 description_en: "Romaine lettuce, chicken, croutons, Parmesan, homemade caesar dressing" },
      { _key: "s8",  kind: "item", name: "Salade auvergnate",       name_en: "Auvergne salad",               price: "13.8€", description: "Mesclun, Bleu d'Auvergne, jambon de pays, saucisse sèche, noix, tomates, œuf dur", description_en: "Mesclun, Bleu d'Auvergne, country ham, dry sausage, walnuts, tomatoes, hard-boiled egg" },
      { _key: "s9",  kind: "item", name: "Salade de haricots verts et Parmesan", name_en: "Green bean and Parmesan salad", price: "16.1€", description: "Haricots verts frais, Parmesan, pesto",                          description_en: "Fresh green beans, Parmesan, pesto" },
      { _key: "s10", kind: "item", name: "Salade scandinave",       name_en: "Scandinavian salad",           price: "15.3€", description: "Mesclun, haricots verts, tomates, pommes de terre, saumon fumé",                 description_en: "Mesclun, green beans, tomatoes, potatoes, smoked salmon" },
      { _key: "s11", kind: "item", name: "Salade des Saints-Pères", name_en: "Saints-Pères salad",           price: "14.8€", description: "Mesclun, tomates, champignons, pommes sautées, lardons, Cantal, croûtons",       description_en: "Mesclun, tomatoes, mushrooms, sautéed potatoes, lardons, Cantal, croutons" },
    ],
  },
  {
    _id: "cat-croques", _type: "menuCategory",
    title: "LES CROQUES", title_en: "CROQUE SANDWICHES", order: 6, column: "left",
    items: [
      { _key: "cd1", kind: "divider", name: "Sur pain poilâne",        name_en: "On Poilâne bread" },
      { _key: "c1",  kind: "item",    name: "Croque-Monsieur",          name_en: "Croque-Monsieur",        price: "9.9€",  description: "Jambon, fromage & salade verte",                description_en: "Ham, cheese & green salad" },
      { _key: "c2",  kind: "item",    name: "Croque-Madame",            name_en: "Croque-Madame",          price: "10.9€", description: "Jambon, fromage, œuf & salade verte",           description_en: "Ham, cheese, egg & green salad" },
      { _key: "c3",  kind: "item",    name: "Croque Italien",           name_en: "Italian croque",         price: "11.2€", description: "Jambon, tomate, mozzarella & salade verte",     description_en: "Ham, tomato, mozzarella & green salad" },
      { _key: "c4",  kind: "item",    name: "Croque chèvre",            name_en: "Goat cheese croque",     price: "10.9€", description: "Chèvre, concombre, huile d'olive & salade verte", description_en: "Goat cheese, cucumber, olive oil & green salad" },
      { _key: "c5",  kind: "item",    name: "Croque saumon",            name_en: "Salmon croque",          price: "12€",   description: "Saumon fumé, crème à la ciboulette & salade verte", description_en: "Smoked salmon, chive cream & green salad" },
      { _key: "c6",  kind: "item",    name: "Supplément frites maison", name_en: "Homemade fries supplement", price: "+ 4.2€" },
    ],
  },
  {
    _id: "cat-quiches", _type: "menuCategory",
    title: "LES QUICHES & SOUPES", title_en: "QUICHES & SOUPS", order: 7, column: "left",
    items: [
      { _key: "q1", kind: "item", name: "Quiche lorraine et mesclun",  name_en: "Quiche Lorraine with mesclun",        price: "10.9€" },
      { _key: "q2", kind: "item", name: "Quiche du moment et mesclun", name_en: "Seasonal quiche with mesclun",        price: "9.7€" },
      { _key: "q3", kind: "item", name: "Soupe gratinée à l'oignon",   name_en: "French onion soup au gratin",         price: "8.4€" },
      { _key: "q4", kind: "item", name: "Soupe du jour",               name_en: "Soup of the day",                    price: "8.8€", description: "En hiver seulement", description_en: "Winter only" },
    ],
  },
  {
    _id: "cat-desserts", _type: "menuCategory",
    title: "LES DESSERTS & GLACES", title_en: "DESSERTS & ICE CREAMS", order: 8, column: "left",
    items: [
      { _key: "d1", kind: "item", name: "Dessert du jour",                         name_en: "Dessert of the day",                          price: "7.2€" },
      { _key: "d2", kind: "item", name: "Mousse au chocolat ou Crème caramel",     name_en: "Chocolate mousse or Crème caramel",           price: "7.3€" },
      { _key: "d3", kind: "item", name: "Fromage blanc 0% et coulis de fruits rouges", name_en: "Fromage blanc 0% with red fruit coulis",  price: "7.8€" },
      { _key: "d4", kind: "item", name: "Crème brûlée",                            name_en: "Crème brûlée",                                price: "7.9€" },
      { _key: "d5", kind: "item", name: "Moelleux au chocolat",                    name_en: "Warm chocolate cake",                         price: "7.9€" },
      { _key: "d6", kind: "item", name: "Tarte tatin tiède",                       name_en: "Warm tarte tatin",                            price: "7.9€", description: "Servie avec de la crème fraîche",           description_en: "Served with fresh cream" },
      { _key: "d7", kind: "item", name: "Les glaces & sorbets, Lili & Enzo",       name_en: "Ice creams & sorbets, Lili & Enzo",           price: "1 boule : 3.8€ – 2 boules : 7.5€", description: "Glacier artisanal. Demandez nos parfums !", description_en: "Artisan ice cream. Ask for our flavours!" },
      { _key: "d8", kind: "item", name: "Café ou chocolat liégeois",               name_en: "Coffee or chocolate liégeois",                price: "8.9€" },
      { _key: "d9", kind: "item", name: "Colonel",                                 name_en: "Colonel",                                     price: "10€", description: "Sorbet citron et vodka (2cL)",             description_en: "Lemon sorbet and vodka (2cL)" },
    ],
  },

  // ===== BOISSONS =====
  {
    _id: "cat-jus", _type: "menuCategory",
    title: "LES JUS PRESSÉS MINUTE", title_en: "FRESHLY SQUEEZED JUICES", order: 9, column: "right",
    items: [
      { _key: "j1", kind: "item", name: "Saint Christophe",   price: "8.6€", description: "Orange, ananas, passion" },
      { _key: "j2", kind: "item", name: "Saint Laurent",      price: "8.6€", description: "Orange, ananas, menthe" },
      { _key: "j3", kind: "item", name: "Saint Pierre",       price: "8.6€", description: "Pomme, carotte, gingembre" },
      { _key: "j4", kind: "item", name: "Saint Thomas detox", price: "8.6€", description: "Pomme, citron vert, céleri, concombre, gingembre" },
      { _key: "j5", kind: "item", name: "Saint Glin Glin",    price: "8.6€", description: "Orange, carotte, citron" },
      { _key: "j6", kind: "item", name: "Saint Germain",      price: "8.6€", description: "Orange, ananas, citron, gingembre" },
      { _key: "j7", kind: "item", name: "Saint Luc",          price: "8.6€", description: "Orange, carotte, pomme, gingembre" },
      { _key: "j8", kind: "item", name: "Saint Benoit",       price: "8.6€", description: "Pomme, citron vert, céleri" },
      { _key: "j9", kind: "item", name: "Saint Louis",        price: "8.6€", description: "Céleri, pomme, menthe, concombre, citron vert" },
    ],
  },
  {
    _id: "cat-cocktails", _type: "menuCategory",
    title: "LES COCKTAILS", title_en: "COCKTAILS", order: 10, column: "right",
    intro: "Prix par défaut : 11.6€", intro_en: "Default price: 11.6€",
    items: [
      { _key: "ck1",  kind: "item", name: "Bloody Mary",               price: "11.6€", description: "Vodka 4cl, jus de tomate, citron, épices",                                          description_en: "Vodka 4cl, tomato juice, lemon, spices" },
      { _key: "ck2",  kind: "item", name: "Old fashioned",             price: "11.6€", description: "Whisky 4cl, sucre, Angostura bitters, zeste d'orange",                              description_en: "Whisky 4cl, sugar, Angostura bitters, orange zest" },
      { _key: "ck3",  kind: "item", name: "Cosmopolitan",              price: "11.6€", description: "Vodka 4cl, triple sec 2cl, cranberry, citron vert",                                  description_en: "Vodka 4cl, triple sec 2cl, cranberry, lime" },
      { _key: "ck4",  kind: "item", name: "Margarita",                 price: "11.6€", description: "Tequila 4cl, Cointreau 2cl, citron vert",                                            description_en: "Tequila 4cl, Cointreau 2cl, lime" },
      { _key: "ck5",  kind: "item", name: "Mojito",                    price: "11.6€", description: "Rhum ambré 4cl, menthe fraîche, citron vert, sucre, eau gazeuse. Supplément Champagne (+ 3€)", description_en: "Amber rum 4cl, fresh mint, lime, sugar, sparkling water. Champagne supplement (+ €3)" },
      { _key: "ck6",  kind: "item", name: "Gin Saint-Germain Fashion", price: "11.6€", description: "Gin Jos' Berri Deyrolle 4cl, sucre de canne, zeste & Bitter à l'orange, eau pétillante", description_en: "Gin Jos' Berri Deyrolle 4cl, cane sugar, orange zest & bitters, sparkling water" },
      { _key: "ck7",  kind: "item", name: "Hemingway",                 price: "11.6€", description: "Rhum blanc 4cl, citron vert, marasquin 4cl, jus de pamplemousse",                   description_en: "White rum 4cl, lime, maraschino 4cl, grapefruit juice" },
      { _key: "ck8",  kind: "item", name: "Planteur",                  name_en: "Planter's punch",  price: "11.6€", description: "Rhum blanc 4cl, orange, ananas, sucre de canne, cannelle", description_en: "White rum 4cl, orange, pineapple, cane sugar, cinnamon" },
      { _key: "ck9",  kind: "item", name: "Gin tonic",                 name_en: "Gin & tonic",      price: "11.6€", description: "Gin Bombay 4cl, Schweppes" },
      { _key: "ck10", kind: "item", name: "Vesper",                    price: "11.6€", description: "Gin 4cl, Vodka 1.5cl, Lillet 1.5cl, zeste de citron",                               description_en: "Gin 4cl, Vodka 1.5cl, Lillet 1.5cl, lemon zest" },
      { _key: "ck11", kind: "item", name: "Art déco",                  price: "11.6€", description: "Liqueur Saint-Germain 4cl, Champagne 10cl, sirop de vanille, jus de citron",        description_en: "Saint-Germain liqueur 4cl, Champagne 10cl, vanilla syrup, lemon juice" },
      { _key: "ck12", kind: "item", name: "Caïpirinha",                price: "9.5€",  description: "Cachaça 4cl, citron, sucre",                                                         description_en: "Cachaça 4cl, lemon, sugar" },
      { _key: "ck13", kind: "item", name: "Soupe de champagne",        name_en: "Champagne punch",  price: "13.7€", description: "Champagne 10cl, Cointreau 2cl, citron vert, sucre",     description_en: "Champagne 10cl, Cointreau 2cl, lime, sugar" },
      { _key: "ckd1", kind: "divider", name: "Sans alcool — 7.1€",     name_en: "Non-alcoholic — 7.1€" },
      { _key: "ck14", kind: "item", name: "Aqua lemon",        description: "Eau gazeuse, citron, menthe, sucre",                       description_en: "Sparkling water, lemon, mint, sugar" },
      { _key: "ck15", kind: "item", name: "Sweet Power",       description: "Orange, ananas, pamplemousse, grenadine",                  description_en: "Orange, pineapple, grapefruit, grenadine" },
      { _key: "ck16", kind: "item", name: "Flamingo",          description: "Citron, ananas, cranberry, Perrier",                       description_en: "Lemon, pineapple, cranberry, Perrier" },
      { _key: "ck17", kind: "item", name: "Osco Mule",         description: "Osco sans alcool, ginger beer, citron vert, menthe",      description_en: "Non-alcoholic Osco, ginger beer, lime, mint" },
      { _key: "ck18", kind: "item", name: "Honeymoon",         description: "Orange, pomme, sirop d'érable, citron vert",              description_en: "Orange, apple, maple syrup, lime" },
      { _key: "ck19", kind: "item", name: "Les Saintes-Mères", description: "Ananas, orange, citron vert, orgeat, grenadine",          description_en: "Pineapple, orange, lime, orgeat, grenadine" },
      { _key: "ck20", kind: "item", name: "Tiki Punch",        description: "Jus d'ananas et de pamplemousse, citron vert, sirop de vanille, menthe fraîche", description_en: "Pineapple and grapefruit juice, lime, vanilla syrup, fresh mint" },
    ],
  },
  {
    _id: "cat-bieres", _type: "menuCategory",
    title: "LES BIÈRES", title_en: "BEERS", order: 11, column: "right",
    items: [
      { _key: "bd1", kind: "divider", name: "Pression", name_en: "Draft", priceColumns: ["25cL", "50cL"] },
      { _key: "b1",  kind: "item",    name: "Kronenbourg, 1664",            price: "5.4€ / 9.1€" },
      { _key: "b2",  kind: "item",    name: "1664 blanche",                 price: "5.9€ / 10.1€" },
      { _key: "b3",  kind: "item",    name: "IPA Saint Erwann",             price: "5.9€ / 10.1€" },
      { _key: "b4",  kind: "item",    name: "Grimbergen",                   price: "5.9€ / 10.1€" },
      { _key: "b5",  kind: "item",    name: "Bière du mois",                name_en: "Beer of the month",   price: "5.9€ / 10.1€" },
      { _key: "b6",  kind: "item",    name: "Supplément",                   name_en: "Supplement",          price: "Sirop +0.4€ — Picon +2.5€" },
      { _key: "bd2", kind: "divider", name: "Bouteilles", name_en: "Bottles", priceColumns: ["33cL"] },
      { _key: "b7",  kind: "item",    name: "Heineken, Carlsberg",          price: "7€" },
      { _key: "b8",  kind: "item",    name: "Desperados",                   price: "7€" },
      { _key: "b9",  kind: "item",    name: "Corona (35.5cL)",              price: "7€" },
      { _key: "b10", kind: "item",    name: "Cidre doux",                   name_en: "Sweet cider",         price: "5.6€ / 27.5€", description: "verre / bouteille", description_en: "glass / bottle" },
      { _key: "b11", kind: "item",    name: "Bière sans alcool (25cL)",     name_en: "Non-alcoholic beer (25cL)", price: "5.9€" },
    ],
  },
  {
    _id: "cat-aperitifs", _type: "menuCategory",
    title: "LES APÉRITIFS", title_en: "APERITIFS", order: 12, column: "right",
    items: [
      { _key: "a1",  kind: "item", name: "Ricard (4cL)",                  price: "6.2€" },
      { _key: "a2",  kind: "item", name: "Pastis 51 (4cL)",               price: "6.2€" },
      { _key: "a3",  kind: "item", name: "Kirs (14cL)",                   price: "5.5€",  description: "Cassis, Mûre ou Pêche",   description_en: "Blackcurrant, Blackberry or Peach" },
      { _key: "a4",  kind: "item", name: "Kir Royal (12cL)",              price: "11€" },
      { _key: "a5",  kind: "item", name: "Porto (8cL)",                   price: "7.1€" },
      { _key: "a6",  kind: "item", name: "Muscat de Rivesaltes (8cL)",    price: "7.1€" },
      { _key: "a7",  kind: "item", name: "Lillet (8cL)",                  price: "7.1€" },
      { _key: "a8",  kind: "item", name: "Salers (8cL)",                  price: "7.1€",  description: "Quinquina",               description_en: "Gentian aperitif" },
      { _key: "a9",  kind: "item", name: "Martini (8cL)",                 price: "7.1€" },
      { _key: "a10", kind: "item", name: "Spritz",                        price: "11€",   description: "Apérol 4cl, Prosecco 12cl" },
      { _key: "a11", kind: "item", name: "Saint Germain Spritz",          price: "11.9€", description: "Liqueur Saint Germain 4cl, Prosecco 12cl" },
      { _key: "a12", kind: "item", name: "Americano maison (8cL)",        price: "11€",   description: "Supplément Gin (+ 2€)" },
    ],
  },
  {
    _id: "cat-vins", _type: "menuCategory",
    title: "LES VINS & CHAMPAGNES", title_en: "WINES & CHAMPAGNES", order: 13, column: "right",
    priceColumns: ["14cL", "25cL", "50cL", "75cL"],
    items: [
      { _key: "vd1", kind: "divider", name: "Les Rouges", name_en: "Reds" },
      { _key: "v1",  kind: "item", name: "Beaujolais Village Dom. Combes Morguière",         price: "5.6€ / 9€ / 17.5€ / 26€",    description: "Gamay" },
      { _key: "v2",  kind: "item", name: "Brouilly Dom. du Petit Pressoir",                  price: "6.7€ / 11.4€ / 22.2€ / 31€", description: "Gamay" },
      { _key: "v3",  kind: "item", name: "Bourgogne Hautes Côtes de Beaune",                 price: "9.3€ / 15.8€ / 31€ / 45€",   description: "Pinot noir" },
      { _key: "v4",  kind: "item", name: "Bordeaux supérieur Cht. de Seguin",                price: "6.9€ / 11.4€ / 22.5€ / 35€", description: "Cabernet sauvignon, Merlot" },
      { _key: "v5",  kind: "item", name: "Bourgogne Dom. Perdrycourt",                       price: "7.9€ / 14.1€ / 27.4€ / 43€", description: "Pinot noir" },
      { _key: "v6",  kind: "item", name: "Graves Cht. Saint-Robert",                        price: "7.1€ / 11.8€ / 22.6€ / 35€", description: "Merlot, Cabernets" },
      { _key: "v7",  kind: "item", name: "Menetou-Salon Dom. de Loyes",                     price: "7.7€ / 14.5€ / 28.1€ / 37€", description: "Pinot noir" },
      { _key: "v8",  kind: "item", name: "Côtes du Rhône Dom. Courty",                      price: "6.5€ / 9.5€ / 18€ / 28€" },
      { _key: "v9",  kind: "item", name: "Chinon Dom. Raffault « Les Galuches »",           price: "6.5€ / 9.5€ / 18€ / 28€",   description: "Cabernet franc" },
      { _key: "v10", kind: "item", name: "Vin du mois",                                     price: "5.4€ / 8.8€ / 17.3€ / 25€" },
      { _key: "v11", kind: "item", name: "Gigondas Dom. Malijay",                           price: "46€ (bouteille)",             description: "Syrah" },
      { _key: "v12", kind: "item", name: "Moulin à vent Dom. de Briante",                   price: "46€ (bouteille)" },
      { _key: "vd2", kind: "divider", name: "Les Blancs", name_en: "Whites" },
      { _key: "v13", kind: "item", name: "Petit Chablis Dom. de Perdrycourt",               price: "7.4€ / 12.8€ / 23€ / 36€",   description: "Chardonnay" },
      { _key: "v14", kind: "item", name: "Menetou-Salon Dom. de Loyes",                     price: "7.7€ / 14.5€ / 28.1€ / 37€", description: "Sauvignon" },
      { _key: "v15", kind: "item", name: "Gaillac doux Dom. Barreau",                       price: "6.9€ / 11.6€ / 22.4€ / 34€", description: "L'en de l'el, Muscadelle, Mauzac" },
      { _key: "v16", kind: "item", name: "Entre deux mers Cht. des 3 Tours",               price: "5.6€ / 8.9€ / 17.2€ / 25€",  description: "Sauvignon, Muscadelle" },
      { _key: "v17", kind: "item", name: "IGP d'Oc Dom. Astruc",                           price: "5.7€ / 9.1€ / 17.5€ / 26€",  description: "Chardonnay" },
      { _key: "v18", kind: "item", name: "Gaillac sec Dom. Barreau",                       price: "5.4€ / 8.8€ / 17.2€ / 25€",  description: "Mauzac, Sauvignon" },
      { _key: "v19", kind: "item", name: "Viognier La petite vigne",                       price: "5.5€ / 8.9€ / 17.5€ / 26€",  description: "Viognier" },
      { _key: "vd3", kind: "divider", name: "Les Rosés",     name_en: "Rosés" },
      { _key: "v20", kind: "item", name: "IGP Vaucluse Le Fou de Malijay",                 price: "5.5€ / 8.9€ / 17.2€ / 25€" },
      { _key: "v21", kind: "item", name: "Pink Flamingo Dom. Royal de Jarras",             price: "5.6€ / 9€ / 17.5€ / 26€" },
      { _key: "v22", kind: "item", name: "Finesse rosé BIO Dom. des Planes, Côtes de Provence", price: "6.8€ / 11.6€ / 21.6€ / 34€" },
      { _key: "vd4", kind: "divider", name: "Les Champagnes", name_en: "Champagnes", priceColumns: ["12cL", "Bouteille"] },
      { _key: "v23", kind: "item", name: "Champagne Roger Desbordes & Fils",        price: "11.5€ / -" },
      { _key: "v24", kind: "item", name: "Champagne Henriot Brut souverain",        price: "- / 68€" },
      { _key: "vd5", kind: "divider", name: "Les Eaux de Vie", name_en: "Brandies", priceColumns: ["4cL"] },
      { _key: "ev1", kind: "item", name: "Cognac Hennessy VS",                          price: "11.5€" },
      { _key: "ev2", kind: "item", name: "Cognac Rémy Martin VSOP",                     price: "13€" },
      { _key: "ev3", kind: "item", name: "Bas-Armagnac Cht. de Laubade « Intemporel »", price: "14€" },
      { _key: "ev4", kind: "item", name: "Calvados Morin VSOP",                         price: "13€" },
      { _key: "ev5", kind: "item", name: "Mirabelle Miclo",                             price: "13€" },
      { _key: "ev6", kind: "item", name: "Poire William Delaitre",                      price: "13.5€" },
      { _key: "ev7", kind: "item", name: "Vieille Prune Nusbaumer",                     price: "13€" },
      { _key: "ev8", kind: "item", name: "Framboise sauvage Grande réserve Miclo",      price: "13€" },
      { _key: "vd6", kind: "divider", name: "Les Liqueurs", name_en: "Liqueurs", priceColumns: ["4cL"] },
      { _key: "lq1", kind: "item", name: "Liqueur Saint-Germain",  price: "9.6€" },
      { _key: "lq2", kind: "item", name: "Jägermeister",           price: "9.6€" },
      { _key: "lq3", kind: "item", name: "Grand Marnier rouge",    price: "9.6€" },
      { _key: "lq4", kind: "item", name: "Marie Brizard",          price: "9.6€" },
      { _key: "lq5", kind: "item", name: "Fernet Branca",          price: "9.6€" },
      { _key: "lq6", kind: "item", name: "Bailey's",               price: "9.6€" },
      { _key: "lq7", kind: "item", name: "Get 27",                 price: "9.6€" },
      { _key: "lq8", kind: "item", name: "Cointreau",              price: "9.6€" },
      { _key: "lq9", kind: "item", name: "Kahlua",                 price: "9.6€" },
    ],
  },
  {
    _id: "cat-spiritueux", _type: "menuCategory",
    title: "LES SPIRITUEUX", title_en: "SPIRITS", order: 16, column: "right",
    items: [
      { _key: "spd1", kind: "divider", name: "Whiskys (4cL)",   name_en: "Whiskies (4cL)" },
      { _key: "sp1",  kind: "item", name: "Johnny Walker Red Label",     price: "9€",    description: "Blended, Écosse" },
      { _key: "sp2",  kind: "item", name: "Johnny Walker Black Label",   price: "10.9€", description: "Blended, Écosse" },
      { _key: "sp3",  kind: "item", name: "Talisker 10 ans",             price: "12.9€", description: "Single Malt, Écosse" },
      { _key: "sp4",  kind: "item", name: "Isle of Jura Origin",         price: "13€",   description: "Single Malt, Écosse" },
      { _key: "sp5",  kind: "item", name: "Bunnahabhain 12 ans",         price: "14€",   description: "Single Malt, Écosse" },
      { _key: "sp6",  kind: "item", name: "Jameson",                     price: "9.5€",  description: "Blended, Cork, Irlande" },
      { _key: "sp7",  kind: "item", name: "Jack Daniel's",               price: "9.5€",  description: "Tennessee Whiskey" },
      { _key: "sp8",  kind: "item", name: "Maker's Mark",                price: "12.5€", description: "Bourbon, Kentucky" },
      { _key: "sp9",  kind: "item", name: "Nikka from the barrel 51,4°", price: "14€",   description: "Blended, Japon" },
      { _key: "spd2", kind: "divider", name: "Gins (4cL)",       name_en: "Gins (4cL)" },
      { _key: "sp10", kind: "item", name: "Bombay Original",             price: "8.8€" },
      { _key: "sp11", kind: "item", name: "Bombay Sapphire",             price: "11€" },
      { _key: "sp12", kind: "item", name: "Tanqueray",                   price: "11€" },
      { _key: "sp13", kind: "item", name: "Jos' Berri Deyrolle",         price: "11€" },
      { _key: "sp14", kind: "item", name: "Supplément soda ou tonic Finley", name_en: "Finley soda or tonic supplement", price: "+ 2.50€" },
      { _key: "spd3", kind: "divider", name: "Vodkas (4cL)",     name_en: "Vodkas (4cL)" },
      { _key: "sp15", kind: "item", name: "Absolut",     price: "9€",    description: "Suède" },
      { _key: "sp16", kind: "item", name: "Fiorowka",    price: "9€",    description: "France" },
      { _key: "sp17", kind: "item", name: "Belvédère",   price: "9.9€",  description: "Pologne" },
      { _key: "sp18", kind: "item", name: "Grey Goose",  price: "13.5€", description: "France" },
      { _key: "spd4", kind: "divider", name: "Rhums (4cL)",      name_en: "Rums (4cL)" },
      { _key: "sp19", kind: "item", name: "Damoiseau Rhum vieux",         price: "12€",   description: "Guadeloupe" },
      { _key: "sp20", kind: "item", name: "Diplomatico",                  price: "14€",   description: "Venezuela" },
      { _key: "sp21", kind: "item", name: "English Harbour 10 ans",       price: "13.5€", description: "Trinidad" },
      { _key: "sp22", kind: "item", name: "Angostura 1919 8 ans",         price: "13€",   description: "Trinidad" },
      { _key: "sp23", kind: "item", name: "Eau de vie de Canne Nusbaumer", price: "13€" },
      { _key: "spd5", kind: "divider", name: "Tequilas (4cL)",   name_en: "Tequilas (4cL)" },
      { _key: "sp24", kind: "item", name: "Sauza Silver", price: "9€" },
    ],
  },
  {
    _id: "cat-boissons", _type: "menuCategory",
    title: "LES BOISSONS", title_en: "DRINKS", order: 17, column: "right",
    items: [
      { _key: "bd1",  kind: "divider", name: "Fraîches",                        name_en: "Cold drinks" },
      { _key: "bo1",  kind: "item",    name: "Lait aromatisé",                  name_en: "Flavoured milk",                   price: "4.9€", description: "Au choix",         description_en: "Your choice" },
      { _key: "bo2",  kind: "item",    name: "Café, thé, chocolat glacé",       name_en: "Iced coffee, tea or chocolate",    price: "6.3€", description: "Au choix",         description_en: "Your choice" },
      { _key: "bd2",  kind: "divider", name: "Eaux minérales",                  name_en: "Mineral waters" },
      { _key: "bo3",  kind: "item",    name: "Vittel (25cL)",                   price: "4.7€" },
      { _key: "bo4",  kind: "item",    name: "Vichy ou Perrier (33cL)",         name_en: "Vichy or Perrier (33cL)",          price: "5.2€" },
      { _key: "bo5",  kind: "item",    name: "Evian, Badoit (50cL / 1L)",       price: "6.2€ / 8.2€" },
      { _key: "bo6",  kind: "item",    name: "Chateldon (75cL)",                price: "8.7€" },
      { _key: "bd3",  kind: "divider", name: "Sodas",                           name_en: "Soft drinks" },
      { _key: "bo7",  kind: "item",    name: "Orangina, Schweppes (25cL)",      price: "5.2€" },
      { _key: "bo8",  kind: "item",    name: "Sprite (33cL)",                   price: "5.2€" },
      { _key: "bo9",  kind: "item",    name: "Ginger beer (33cL)",              price: "5.2€" },
      { _key: "bo10", kind: "item",    name: "Limonade au verre (25cL)",        name_en: "Lemonade by the glass (25cL)",     price: "5.2€" },
      { _key: "bo11", kind: "item",    name: "Coca-Cola / Cherry / Zero (33cL)", price: "5.2€" },
      { _key: "bo12", kind: "item",    name: "Fanta / Fuzetea (33cL)",          price: "5.2€" },
      { _key: "bd4",  kind: "divider", name: "Jus de fruits Granini — 5.4€",   name_en: "Granini fruit juices — 5.4€" },
      { _key: "bo13", kind: "item",    name: "Tomate BIO",                      name_en: "Organic tomato" },
      { _key: "bo14", kind: "item",    name: "Abricot",                         name_en: "Apricot" },
      { _key: "bo15", kind: "item",    name: "Ananas",                          name_en: "Pineapple" },
      { _key: "bo16", kind: "item",    name: "Pamplemousse",                    name_en: "Grapefruit" },
      { _key: "bo17", kind: "item",    name: "Pomme",                           name_en: "Apple" },
      { _key: "bd5",  kind: "divider", name: "Jus de fruits frais pressés — 6.3€", name_en: "Freshly pressed fruit juices — 6.3€" },
      { _key: "bo18", kind: "item",    name: "Orange ou citron",                name_en: "Orange or lemon" },
      { _key: "bd6",  kind: "divider", name: "Chaudes",                         name_en: "Hot drinks" },
      { _key: "bo19", kind: "item",    name: "Café expresso (ou décaféiné)",    name_en: "Espresso (or decaf)",              price: "3€" },
      { _key: "bo20", kind: "item",    name: "Double expresso",                 name_en: "Double espresso",                  price: "5.5€" },
      { _key: "bo21", kind: "item",    name: "Café américain",                  name_en: "Americano",                        price: "5.2€" },
      { _key: "bo22", kind: "item",    name: "Noisette ou allongé",             name_en: "Macchiato or long espresso",       price: "3.1€" },
      { _key: "bo23", kind: "item",    name: "Grand crème",                     name_en: "Large white coffee",               price: "5.4€" },
      { _key: "bo24", kind: "item",    name: "Cappuccino",                      price: "6.2€" },
      { _key: "bo25", kind: "item",    name: "Grand chocolat",                  name_en: "Hot chocolate",                    price: "5.4€" },
      { _key: "bo26", kind: "item",    name: "Lait chaud vanille / miel",       name_en: "Warm vanilla or honey milk",       price: "5.4€" },
      { _key: "bo27", kind: "item",    name: "Café ou chocolat viennois",       name_en: "Coffee or chocolate Viennois",     price: "6.2€" },
      { _key: "bo28", kind: "item",    name: "Grand moka",                      name_en: "Grand mocha",                      price: "6.2€", description: "Chocolat et café",  description_en: "Chocolate and coffee" },
      { _key: "bo29", kind: "item",    name: "Citron pressé chaud au miel",     name_en: "Hot lemon with honey",             price: "6.1€" },
      { _key: "bo30", kind: "item",    name: "Grog au rhum",                    name_en: "Rum grog",                         price: "6.6€" },
      { _key: "bo31", kind: "item",    name: "Vin chaud à la cannelle",         name_en: "Warm spiced wine with cinnamon",   price: "6.3€" },
      { _key: "bo32", kind: "item",    name: "French Coffee (Cognac)",          price: "10.6€" },
      { _key: "bo33", kind: "item",    name: "Irish Coffee (Whisky irlandais)", name_en: "Irish Coffee (Irish Whiskey)",     price: "10.6€" },
      { _key: "bo34", kind: "item",    name: "Thés Comptoir Richard",           name_en: "Comptoir Richard teas",            price: "5.4€", description: "Ceylan, Earl Grey, Darjeeling, vanille, fruits rouges, Rooibos, lapsang souchong, thé vert, menthe fraîche", description_en: "Ceylon, Earl Grey, Darjeeling, vanilla, red berries, Rooibos, lapsang souchong, green tea, fresh mint" },
      { _key: "bo35", kind: "item",    name: "Infusions",                       name_en: "Herbal teas",                      price: "5.4€", description: "Tilleul bio, camomille bio, verveine bio, menthe fraîche", description_en: "Organic lime blossom, organic chamomile, organic verbena, fresh mint" },
    ],
  },
];

/* ─────────────────────────────────────────────
   Main
───────────────────────────────────────────── */
async function seed() {
  console.log(`\n🌱 Seeding Sanity — project: ${PROJECT_ID} / dataset: ${DATASET}\n`);

  // Supprimer les catégories obsolètes fusionnées dans d'autres
  const obsolete = ["cat-liqueurs", "cat-eaux-de-vie"];
  for (const id of obsolete) {
    try { await client.delete(id); } catch { /* déjà supprimé */ }
  }

  process.stdout.write("  → siteSettings … ");
  await client.createOrReplace(SITE_SETTINGS);
  console.log("✅");

  for (const cat of MENU_CATEGORIES) {
    process.stdout.write(`  → ${cat.title.padEnd(35)} `);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await client.createOrReplace(cat as any);
    console.log("✅");
  }

  console.log(`\n✨ Seed terminé — ${MENU_CATEGORIES.length + 1} documents créés/mis à jour.\n`);
}

seed().catch((err) => {
  console.error("\n❌ Erreur seed :", err.message);
  process.exit(1);
});
