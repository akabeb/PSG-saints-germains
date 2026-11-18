import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

const PUBLIC_PATHS = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/la-carte", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/infos-pratiques", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, "");
  const lastModified = new Date();

  return PUBLIC_PATHS.flatMap(({ path, priority, changeFrequency }) => {
    const languages: Record<string, string> = {
      "x-default": `${base}/fr${path}`,
    };
    for (const l of locales) {
      languages[l] = `${base}/${l}${path}`;
    }

    return locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority: locale === "fr" ? priority : Number((priority * 0.9).toFixed(2)),
      alternates: { languages },
    }));
  });
}
