import type { GeoFaqItem } from "@/lib/geo-content";
import { dict, localeMeta, type Locale } from "@/lib/i18n";
import type { MenuCategoryData } from "@/lib/menu-fallback";
import { siteUrl } from "@/lib/site";

type BreadcrumbEntry = {
  name: string;
  path: string;
};

type PageJsonLdProps = {
  locale: Locale;
  /** Chemin relatif à la locale, ex. "" | "/la-carte" | "/infos-pratiques" */
  path: string;
  title: string;
  description: string;
  pageType?: "WebPage" | "ContactPage" | "AboutPage";
  breadcrumbs?: BreadcrumbEntry[];
  faqItems?: GeoFaqItem[];
  menuCategories?: MenuCategoryData[];
};

function extractNumericEuroPrice(raw?: string): string | undefined {
  if (!raw) return undefined;
  const m = raw.match(/^(\d+(?:[.,]\d+)?)\s*€$/);
  if (!m) return undefined;
  return m[1].replace(",", ".");
}

/**
 * Émet chaque schéma de page (WebPage, BreadcrumbList, SpeakableSpecification, FAQPage, Menu)
 * dans sa propre balise <script type="application/ld+json"> de premier niveau.
 */
export function PageJsonLd({
  locale,
  path,
  title,
  description,
  pageType = "WebPage",
  breadcrumbs = [],
  faqItems,
  menuCategories,
}: Readonly<PageJsonLdProps>) {
  const base = siteUrl.replace(/\/$/, "");
  const pageUrl = `${base}/${locale}${path}`;
  const t = dict[locale];

  const trail: BreadcrumbEntry[] = [
    { name: t.nav.home, path: "" },
    ...breadcrumbs,
  ];

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": pageType,
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: localeMeta[locale].htmlLang,
      mainEntityOfPage: pageUrl,
      isPartOf: { "@id": `${base}/#website` },
      about: { "@id": `${base}/#organization` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".geo-summary"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: trail.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${base}/${locale}${crumb.path}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".geo-summary"],
      xpath: [
        "/html/head/title",
        "/html/head/meta[@name='description']/@content",
      ],
    },
  ];

  if (faqItems && faqItems.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqItems.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer,
        },
      })),
    });
  }

  if (menuCategories && menuCategories.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Menu",
      "@id": `${base}/${locale}/la-carte#menu`,
      name: title,
      inLanguage: localeMeta[locale].htmlLang,
      hasMenuSection: menuCategories.map((cat) => {
        const dishes = cat.items.filter((i) => i.kind !== "divider");
        return {
          "@type": "MenuSection",
          name: cat.title,
          ...(cat.intro ? { description: cat.intro } : {}),
          hasMenuItem: dishes.map((d) => {
            const numericPrice = extractNumericEuroPrice(d.price ?? cat.singlePrice);
            return {
              "@type": "MenuItem",
              name: d.name,
              ...(d.description ? { description: d.description } : {}),
              ...(numericPrice
                ? {
                    offers: {
                      "@type": "Offer",
                      price: numericPrice,
                      priceCurrency: "EUR",
                    },
                  }
                : {}),
            };
          }),
        };
      }),
    });
  }

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
