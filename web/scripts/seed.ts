/**
 * Seed Sanity — met à jour siteSettings (FR·EN·ES·IT·DE) + toutes les menuCategory (prix unique par choix)
 * directement dans la base Sanity à partir de `lib/menu-fallback.ts` et `lib/site.ts`.
 *
 * Usage recommandé (session Sanity CLI) :
 *   cd web && npm run seed
 *
 * Usage alternatif avec token API (nécessite un SANITY_WRITE_TOKEN à droits Éditeur) :
 *   cd web && node --experimental-strip-types scripts/seed.ts
 */

import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { FALLBACK_MENU_RAW } from "../lib/menu-fallback.ts";
import { site, siteByLocale } from "../lib/site.ts";

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  for (const rawLine of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "z0nk1sgq";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!TOKEN) {
  console.error(
    "\n❌  SANITY_WRITE_TOKEN manquant dans web/.env.local.\n" +
      "   Utilisez plutôt `npm run seed` (via session Sanity CLI) ou créez un token Éditeur.\n",
  );
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2025-01-01",
  token: TOKEN,
  useCdn: false,
});

const SITE_SETTINGS_PATCH: Record<string, unknown> = {
  name: site.name,
  address: site.address,
  addressUrl: site.addressUrl,
  phone: site.phone,
  email: site.email,
  instagramUrl: site.instagramUrl,

  heroTitle: site.name,
  heroWelcome: site.welcome,
  menuEyebrow: site.menuEyebrow,
  menuTitle: site.menuTitle,
  aboutEyebrow: site.aboutEyebrow,
  aboutTitle: site.aboutTitle,
  aboutText: site.aboutText,
  contactTitle: site.contactTitle,
  contactDays: site.contactDays,
  contactCtaLabel: site.contactCtaLabel,
  infosHeroTitle: site.infosHeroTitle,
  hoursEyebrow: site.hoursEyebrow,
  hoursTitle: site.hoursTitle,
  hoursLines: site.hoursLines,
  addressTitle: site.addressTitle,
  directionsTitle: site.directionsTitle,
  directionsText: site.directionsText,
  directionsMetro: site.directionsMetro,
  mapLat: site.mapLat,
  mapLng: site.mapLng,
};

for (const lang of ["en", "es", "it", "de"] as const) {
  const c = siteByLocale[lang];
  SITE_SETTINGS_PATCH[`heroTitle_${lang}`] = site.name;
  SITE_SETTINGS_PATCH[`heroWelcome_${lang}`] = c.welcome;
  SITE_SETTINGS_PATCH[`menuEyebrow_${lang}`] = c.menuEyebrow;
  SITE_SETTINGS_PATCH[`menuTitle_${lang}`] = c.menuTitle;
  SITE_SETTINGS_PATCH[`aboutEyebrow_${lang}`] = c.aboutEyebrow;
  SITE_SETTINGS_PATCH[`aboutTitle_${lang}`] = c.aboutTitle;
  SITE_SETTINGS_PATCH[`aboutText_${lang}`] = c.aboutText;
  SITE_SETTINGS_PATCH[`contactTitle_${lang}`] = c.contactTitle;
  SITE_SETTINGS_PATCH[`contactDays_${lang}`] = c.contactDays;
  SITE_SETTINGS_PATCH[`contactCtaLabel_${lang}`] = c.contactCtaLabel;
  SITE_SETTINGS_PATCH[`infosHeroTitle_${lang}`] = c.infosHeroTitle;
  SITE_SETTINGS_PATCH[`hoursEyebrow_${lang}`] = c.hoursEyebrow;
  SITE_SETTINGS_PATCH[`hoursTitle_${lang}`] = c.hoursTitle;
  SITE_SETTINGS_PATCH[`hoursLines_${lang}`] = c.hoursLines;
  SITE_SETTINGS_PATCH[`addressTitle_${lang}`] = c.addressTitle;
  SITE_SETTINGS_PATCH[`directionsTitle_${lang}`] = c.directionsTitle;
  SITE_SETTINGS_PATCH[`directionsText_${lang}`] = c.directionsText;
  SITE_SETTINGS_PATCH[`directionsMetro_${lang}`] = c.directionsMetro;
}

async function seed() {
  console.log(`\n🌱 Mise à jour Sanity — projet: ${PROJECT_ID} / dataset: ${DATASET}\n`);

  const obsolete = ["cat-liqueurs", "cat-eaux-de-vie"];
  for (const id of obsolete) {
    try {
      await client.delete(id);
    } catch {
      /* déjà supprimé */
    }
  }

  process.stdout.write("  → siteSettings (patch sans écraser les images) … ");
  await client.createIfNotExists({ _id: "siteSettings", _type: "siteSettings" });
  await client.patch("siteSettings").set(SITE_SETTINGS_PATCH).commit();
  console.log("✅");

  for (const cat of FALLBACK_MENU_RAW) {
    const doc = {
      ...cat,
      _type: "menuCategory",
      items: cat.items.map((item, index) => ({
        _key: `${cat._id}-${index}`,
        kind: item.kind ?? "item",
        ...item,
      })),
    };
    process.stdout.write(`  → ${cat.title.padEnd(35)} `);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await client.createOrReplace(doc as any);
    console.log("✅");
  }

  console.log(
    `\n✨ Base Sanity mise à jour — ${FALLBACK_MENU_RAW.length} catégories (FR·EN·ES·IT·DE) + siteSettings synchronisés.\n`,
  );
}

seed().catch((err) => {
  console.error("\n❌ Erreur seed :", err.message);
  process.exit(1);
});
