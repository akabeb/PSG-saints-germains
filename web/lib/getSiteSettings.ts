import { groq } from "next-sanity";

import { sanityClient } from "@/lib/sanity.client";
import type { Locale } from "@/lib/i18n";
import { site, siteEn } from "@/lib/site";
import type { DishImage } from "@/lib/types.dish";

type SanitySettingsRaw = {
  name?: string;
  address?: string;
  addressUrl?: string;
  phone?: string;
  email?: string;
  instagramUrl?: string;
  heroImage?: DishImage;
  heroTitle?: string;        heroTitle_en?: string;
  heroWelcome?: string;      heroWelcome_en?: string;
  menuEyebrow?: string;      menuEyebrow_en?: string;
  menuTitle?: string;        menuTitle_en?: string;
  aboutEyebrow?: string;     aboutEyebrow_en?: string;
  aboutTitle?: string;       aboutTitle_en?: string;
  aboutText?: string;        aboutText_en?: string;
  aboutImageLeft?: DishImage;
  aboutImageRight?: DishImage;
  contactTitle?: string;     contactTitle_en?: string;
  contactDays?: string;      contactDays_en?: string;
  contactCtaLabel?: string;  contactCtaLabel_en?: string;
  contactImage?: DishImage;
  infosHeroTitle?: string;   infosHeroTitle_en?: string;
  hoursEyebrow?: string;     hoursEyebrow_en?: string;
  hoursTitle?: string;       hoursTitle_en?: string;
  hoursLines?: string[];     hoursLines_en?: string[];
  addressTitle?: string;     addressTitle_en?: string;
  directionsTitle?: string;  directionsTitle_en?: string;
  directionsText?: string;   directionsText_en?: string;
  directionsMetro?: string;  directionsMetro_en?: string;
  mapLat?: number;
  mapLng?: number;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  welcome: string;
  description: string;
  address: string;
  addressUrl: string;
  phone: string;
  phoneHref: string;
  email: string;
  instagramUrl: string;
  heroImage?: DishImage;
  heroTitle?: string;
  menuEyebrow: string;
  menuTitle: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutText: string;
  aboutImageLeft?: DishImage;
  aboutImageRight?: DishImage;
  contactTitle: string;
  contactDays: string;
  contactCtaLabel: string;
  contactImage?: DishImage;
  infosHeroTitle: string;
  hoursEyebrow: string;
  hoursTitle: string;
  hoursLines: readonly string[] | string[];
  addressTitle: string;
  directionsTitle: string;
  directionsText: string;
  directionsMetro: string;
  mapLat: number;
  mapLng: number;
};

const SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  name, address, addressUrl, phone, email, instagramUrl,
  heroImage,
  heroTitle, heroTitle_en,
  heroWelcome, heroWelcome_en,
  menuEyebrow, menuEyebrow_en,
  menuTitle, menuTitle_en,
  aboutEyebrow, aboutEyebrow_en,
  aboutTitle, aboutTitle_en,
  aboutText, aboutText_en,
  aboutImageLeft, aboutImageRight,
  contactTitle, contactTitle_en,
  contactDays, contactDays_en,
  contactCtaLabel, contactCtaLabel_en,
  contactImage,
  infosHeroTitle, infosHeroTitle_en,
  hoursEyebrow, hoursEyebrow_en,
  hoursTitle, hoursTitle_en,
  hoursLines, hoursLines_en,
  addressTitle, addressTitle_en,
  directionsTitle, directionsTitle_en,
  directionsText, directionsText_en,
  directionsMetro, directionsMetro_en,
  mapLat, mapLng
}`;

/** Retourne la valeur locale-appropriée : préfère le champ _en si locale=en et valeur non vide. */
function pick(
  raw: SanitySettingsRaw,
  frKey: keyof SanitySettingsRaw,
  enKey: keyof SanitySettingsRaw,
  locale: Locale,
): string | undefined {
  const enVal = raw[enKey];
  const frVal = raw[frKey];
  if (locale === "en" && enVal && enVal !== "") return enVal as string;
  if (frVal && frVal !== "") return frVal as string;
  return undefined;
}

function pickArray(
  raw: SanitySettingsRaw,
  frKey: keyof SanitySettingsRaw,
  enKey: keyof SanitySettingsRaw,
  locale: Locale,
): string[] | undefined {
  const enVal = raw[enKey] as string[] | undefined;
  const frVal = raw[frKey] as string[] | undefined;
  if (locale === "en" && enVal && enVal.length > 0) return enVal;
  if (frVal && frVal.length > 0) return frVal;
  return undefined;
}

export async function getSiteSettings(locale: Locale = "fr"): Promise<SiteSettings> {
  const defaults: SiteSettings =
    locale === "en"
      ? { ...site, ...siteEn }
      : { ...site };

  if (!sanityClient) return defaults;

  try {
    const raw = await sanityClient.fetch<SanitySettingsRaw | null>(SETTINGS_QUERY);
    if (!raw) return defaults;

    const merged: SiteSettings = { ...defaults };

    /* Non-traduit */
    if (raw.name)         merged.name = raw.name;
    if (raw.address)      merged.address = raw.address;
    if (raw.addressUrl)   merged.addressUrl = raw.addressUrl;
    if (raw.email)        merged.email = raw.email;
    if (raw.instagramUrl) merged.instagramUrl = raw.instagramUrl;
    if (raw.heroImage)    merged.heroImage = raw.heroImage;
    if (raw.aboutImageLeft)  merged.aboutImageLeft = raw.aboutImageLeft;
    if (raw.aboutImageRight) merged.aboutImageRight = raw.aboutImageRight;
    if (raw.contactImage) merged.contactImage = raw.contactImage;
    if (raw.mapLat != null) merged.mapLat = raw.mapLat;
    if (raw.mapLng != null) merged.mapLng = raw.mapLng;

    if (raw.phone) {
      merged.phone = raw.phone;
      merged.phoneHref = `tel:${raw.phone.replace(/\s/g, "")}`;
    }

    /* Traduit */
    const heroTitle = pick(raw, "heroTitle", "heroTitle_en", locale);
    if (heroTitle) merged.heroTitle = heroTitle;

    const welcome = pick(raw, "heroWelcome", "heroWelcome_en", locale);
    if (welcome) merged.welcome = welcome;

    const menuEyebrow = pick(raw, "menuEyebrow", "menuEyebrow_en", locale);
    if (menuEyebrow !== undefined) merged.menuEyebrow = menuEyebrow;

    const menuTitle = pick(raw, "menuTitle", "menuTitle_en", locale);
    if (menuTitle) merged.menuTitle = menuTitle;

    const aboutEyebrow = pick(raw, "aboutEyebrow", "aboutEyebrow_en", locale);
    if (aboutEyebrow) merged.aboutEyebrow = aboutEyebrow;

    const aboutTitle = pick(raw, "aboutTitle", "aboutTitle_en", locale);
    if (aboutTitle) merged.aboutTitle = aboutTitle;

    const aboutText = pick(raw, "aboutText", "aboutText_en", locale);
    if (aboutText) merged.aboutText = aboutText;

    const contactTitle = pick(raw, "contactTitle", "contactTitle_en", locale);
    if (contactTitle) merged.contactTitle = contactTitle;

    const contactDays = pick(raw, "contactDays", "contactDays_en", locale);
    if (contactDays) merged.contactDays = contactDays;

    const contactCtaLabel = pick(raw, "contactCtaLabel", "contactCtaLabel_en", locale);
    if (contactCtaLabel) merged.contactCtaLabel = contactCtaLabel;

    const infosHeroTitle = pick(raw, "infosHeroTitle", "infosHeroTitle_en", locale);
    if (infosHeroTitle) merged.infosHeroTitle = infosHeroTitle;

    const hoursEyebrow = pick(raw, "hoursEyebrow", "hoursEyebrow_en", locale);
    if (hoursEyebrow) merged.hoursEyebrow = hoursEyebrow;

    const hoursTitle = pick(raw, "hoursTitle", "hoursTitle_en", locale);
    if (hoursTitle) merged.hoursTitle = hoursTitle;

    const hoursLines = pickArray(raw, "hoursLines", "hoursLines_en", locale);
    if (hoursLines) merged.hoursLines = hoursLines;

    const addressTitle = pick(raw, "addressTitle", "addressTitle_en", locale);
    if (addressTitle) merged.addressTitle = addressTitle;

    const directionsTitle = pick(raw, "directionsTitle", "directionsTitle_en", locale);
    if (directionsTitle) merged.directionsTitle = directionsTitle;

    const directionsText = pick(raw, "directionsText", "directionsText_en", locale);
    if (directionsText) merged.directionsText = directionsText;

    const directionsMetro = pick(raw, "directionsMetro", "directionsMetro_en", locale);
    if (directionsMetro) merged.directionsMetro = directionsMetro;

    return merged;
  } catch {
    return defaults;
  }
}
