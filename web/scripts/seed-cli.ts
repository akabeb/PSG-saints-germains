/**
 * Script officiel Sanity CLI pour synchroniser siteSettings + menuCategory (FR · EN · ES · IT · DE)
 * avec un PRIX UNIQUE par choix (`sanity exec scripts/seed-cli.ts --with-user-token`).
 */

import { getCliClient } from "sanity/cli";

import { FALLBACK_MENU_RAW } from "../lib/menu-fallback";
import { site, siteByLocale } from "../lib/site";

const client = getCliClient({ apiVersion: "2025-01-01" });

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

async function run() {
  const cfg = client.config();
  console.log(
    `\n🌱 Mise à jour Sanity CLI (5 langues FR·EN·ES·IT·DE, prix unique) — projet: ${cfg.projectId} / dataset: ${cfg.dataset}\n`,
  );

  process.stdout.write("  → siteSettings … ");
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

run().catch((err) => {
  console.error("\n❌ Erreur :", err.message);
  process.exit(1);
});
