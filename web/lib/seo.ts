import type { Metadata } from "next";

import { localeMeta, locales, type Locale } from "@/lib/i18n";
import { site, siteByLocale, siteUrl } from "@/lib/site";

type PageSeoParams = {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: PageSeoParams): Metadata {
  const base = siteUrl.replace(/\/$/, "");
  const cleanPath = path === "/" ? "" : path;
  const canonicalUrl = `${base}/${locale}${cleanPath}`;
  const localizedTagline =
    locale === "fr" ? site.tagline : siteByLocale[locale].tagline;
  const fullTitle = title
    ? `${title} | ${site.name}`
    : `${site.name} — ${localizedTagline}`;

  const languages: Record<string, string> = {
    "x-default": `${base}/fr${cleanPath}`,
  };
  for (const l of locales) {
    languages[l] = `${base}/${l}${cleanPath}`;
  }

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeMeta[l].ogLocale),
      url: canonicalUrl,
      siteName: site.name,
      title: fullTitle,
      description,
      images: [
        {
          url: "/assets/hero-cover.jpg",
          width: 2560,
          height: 1262,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/assets/hero-cover.jpg"],
    },
  };
}
