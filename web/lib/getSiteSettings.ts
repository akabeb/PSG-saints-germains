import { groq } from "next-sanity";

import { sanityClient } from "@/lib/sanity.client";
import type { Locale } from "@/lib/i18n";
import { site, siteByLocale } from "@/lib/site";
import type { DishImage } from "@/lib/types.dish";

type SanitySettingsRaw = Record<string, unknown> & {
  name?: string;
  address?: string;
  addressUrl?: string;
  phone?: string;
  email?: string;
  instagramUrl?: string;
  heroImage?: DishImage;
  aboutImageLeft?: DishImage;
  aboutImageRight?: DishImage;
  contactImage?: DishImage;
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
  phoneInternational: string;
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

const SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]`;

function pickLocalizedString(
  raw: SanitySettingsRaw,
  baseKey: string,
  locale: Locale,
): string | undefined {
  if (locale === "fr") {
    const frVal = raw[baseKey];
    return typeof frVal === "string" && frVal.trim() !== "" ? frVal : undefined;
  }
  const locVal = raw[`${baseKey}_${locale}`];
  if (typeof locVal === "string" && locVal.trim() !== "") return locVal;
  return undefined;
}

function pickLocalizedArray(
  raw: SanitySettingsRaw,
  baseKey: string,
  locale: Locale,
): string[] | undefined {
  if (locale === "fr") {
    const frVal = raw[baseKey];
    return Array.isArray(frVal) && frVal.length > 0 ? (frVal as string[]) : undefined;
  }
  const locVal = raw[`${baseKey}_${locale}`];
  if (Array.isArray(locVal) && locVal.length > 0) return locVal as string[];
  return undefined;
}

function buildPhoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return `tel:${digits}`;
  if (digits.startsWith("0") && digits.length === 10) {
    return `tel:+33${digits.slice(1)}`;
  }
  return `tel:${digits}`;
}

const STALE_CONTACT_DAYS = new Set([
  "du lundi au vendredi",
  "monday to friday",
]);

export async function getSiteSettings(locale: Locale = "fr"): Promise<SiteSettings> {
  const defaults: SiteSettings =
    locale === "fr"
      ? { ...site }
      : { ...site, ...siteByLocale[locale] };

  if (!sanityClient) return defaults;

  try {
    const raw = await sanityClient.fetch<SanitySettingsRaw | null>(SETTINGS_QUERY);
    if (!raw) return defaults;

    const merged: SiteSettings = { ...defaults };

    if (typeof raw.name === "string" && raw.name) merged.name = raw.name;
    if (typeof raw.address === "string" && raw.address) merged.address = raw.address;
    if (typeof raw.addressUrl === "string" && raw.addressUrl) merged.addressUrl = raw.addressUrl;
    if (typeof raw.email === "string" && raw.email) merged.email = raw.email;
    if (typeof raw.instagramUrl === "string" && raw.instagramUrl) merged.instagramUrl = raw.instagramUrl;
    if (raw.heroImage) merged.heroImage = raw.heroImage;
    if (raw.aboutImageLeft) merged.aboutImageLeft = raw.aboutImageLeft;
    if (raw.aboutImageRight) merged.aboutImageRight = raw.aboutImageRight;
    if (raw.contactImage) merged.contactImage = raw.contactImage;
    if (typeof raw.mapLat === "number") merged.mapLat = raw.mapLat;
    if (typeof raw.mapLng === "number") merged.mapLng = raw.mapLng;

    if (typeof raw.phone === "string" && raw.phone) {
      merged.phone = raw.phone;
      merged.phoneHref = buildPhoneHref(raw.phone);
    }

    const heroTitle = pickLocalizedString(raw, "heroTitle", locale);
    if (heroTitle) merged.heroTitle = heroTitle;

    const welcome = pickLocalizedString(raw, "heroWelcome", locale);
    if (welcome) merged.welcome = welcome;

    const menuEyebrow = pickLocalizedString(raw, "menuEyebrow", locale);
    if (menuEyebrow) merged.menuEyebrow = menuEyebrow;

    const menuTitle = pickLocalizedString(raw, "menuTitle", locale);
    if (menuTitle) merged.menuTitle = menuTitle;

    const aboutEyebrow = pickLocalizedString(raw, "aboutEyebrow", locale);
    if (aboutEyebrow) merged.aboutEyebrow = aboutEyebrow;

    const aboutTitle = pickLocalizedString(raw, "aboutTitle", locale);
    if (aboutTitle) merged.aboutTitle = aboutTitle;

    const aboutText = pickLocalizedString(raw, "aboutText", locale);
    if (aboutText) merged.aboutText = aboutText;

    const contactTitle = pickLocalizedString(raw, "contactTitle", locale);
    if (contactTitle) merged.contactTitle = contactTitle;

    const contactDays = pickLocalizedString(raw, "contactDays", locale);
    if (contactDays && !STALE_CONTACT_DAYS.has(contactDays.trim().toLowerCase())) {
      merged.contactDays = contactDays;
    }

    const contactCtaLabel = pickLocalizedString(raw, "contactCtaLabel", locale);
    if (contactCtaLabel) merged.contactCtaLabel = contactCtaLabel;

    const infosHeroTitle = pickLocalizedString(raw, "infosHeroTitle", locale);
    if (infosHeroTitle) merged.infosHeroTitle = infosHeroTitle;

    const hoursEyebrow = pickLocalizedString(raw, "hoursEyebrow", locale);
    if (hoursEyebrow) merged.hoursEyebrow = hoursEyebrow;

    const hoursTitle = pickLocalizedString(raw, "hoursTitle", locale);
    if (hoursTitle) merged.hoursTitle = hoursTitle;

    const hoursLines = pickLocalizedArray(raw, "hoursLines", locale);
    if (hoursLines) merged.hoursLines = hoursLines;

    const addressTitle = pickLocalizedString(raw, "addressTitle", locale);
    if (addressTitle) merged.addressTitle = addressTitle;

    const directionsTitle = pickLocalizedString(raw, "directionsTitle", locale);
    if (directionsTitle) merged.directionsTitle = directionsTitle;

    const directionsText = pickLocalizedString(raw, "directionsText", locale);
    if (directionsText) merged.directionsText = directionsText;

    const directionsMetro = pickLocalizedString(raw, "directionsMetro", locale);
    if (directionsMetro) merged.directionsMetro = directionsMetro;

    return merged;
  } catch {
    return defaults;
  }
}
