import { geoContent } from "@/lib/geo-content";
import { getMenu } from "@/lib/getMenu";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { dict, localeMeta, type Locale } from "@/lib/i18n";
import { legalEntity, siteUrl } from "@/lib/site";

function extractNumericEuroPrice(raw?: string): string | undefined {
  if (!raw) return undefined;
  const m = raw.match(/^(\d+(?:[.,]\d+)?)\s*€$/);
  if (!m) return undefined;
  return m[1].replace(",", ".");
}

/**
 * Injecte l'intégralité des schémas JSON-LD directement dans le <head> serveur
 * (un bloc <script type="application/ld+json"> de premier niveau par schéma).
 */
export async function HeadJsonLd({
  locale,
  pathname,
}: Readonly<{ locale: Locale; pathname: string }>) {
  const base = siteUrl.replace(/\/$/, "");
  const subPath = pathname.replace(new RegExp(`^/${locale}`), "") || "";
  const pageUrl = `${base}/${locale}${subPath}`;

  const t = dict[locale];
  const geo = geoContent[locale];
  const settings = await getSiteSettings(locale);
  const e164Phone = settings.phoneHref.replace(/^tel:/, "");
  const officialRegistryUrl =
    "https://annuaire-entreprises.data.gouv.fr/entreprise/chlocero-840646855";
  const sameAs = [
    settings.instagramUrl,
    settings.addressUrl,
    officialRegistryUrl,
  ].filter(Boolean);

  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: "29 Rue des Saints-Pères",
    addressLocality: "Paris",
    postalCode: "75006",
    addressCountry: "FR",
  };

  const geoCoordinates = {
    "@type": "GeoCoordinates",
    latitude: settings.mapLat,
    longitude: settings.mapLng,
  };

  const openingHoursSpecification = [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "23:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "22:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "09:00",
      closes: "23:00",
    },
  ];

  // Métadonnées de page selon la route active
  let pageTitle = `${settings.name} — ${settings.tagline}`;
  let pageDescription = settings.description;
  let pageType: "WebPage" | "AboutPage" | "ContactPage" = "WebPage";
  const breadcrumbs: { name: string; path: string }[] = [
    { name: t.nav.home, path: "" },
  ];
  let faqItems = undefined as typeof geo.homeFaq | undefined;
  let includeMenu = false;

  if (subPath === "") {
    faqItems = geo.homeFaq;
    includeMenu = true;
  } else if (subPath === "/la-carte") {
    pageTitle = settings.menuTitle || t.menu_page.heroTitle;
    pageDescription = geo.menuPageLead;
    breadcrumbs.push({ name: pageTitle, path: "/la-carte" });
    includeMenu = true;
  } else if (subPath === "/infos-pratiques") {
    pageTitle = settings.infosHeroTitle;
    pageDescription = `${settings.address} · ${settings.phone} — ${settings.hoursLines.join(", ")}`;
    pageType = "AboutPage";
    breadcrumbs.push({ name: pageTitle, path: "/infos-pratiques" });
    faqItems = geo.infosFaq;
  } else if (subPath === "/contact") {
    pageTitle = settings.contactTitle || t.contact.pageTitle;
    pageDescription = `${settings.address} — ${settings.phone} — ${settings.email}`;
    pageType = "ContactPage";
    breadcrumbs.push({ name: pageTitle, path: "/contact" });
  } else if (subPath === "/mentions-legales") {
    pageTitle = t.legal.heroTitle;
    pageDescription = t.legal.metaDescription;
    breadcrumbs.push({ name: pageTitle, path: "/mentions-legales" });
  }

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: settings.name,
      legalName: legalEntity.companyName,
      taxID: legalEntity.siret,
      url: `${base}/${locale}`,
      logo: `${base}/assets/logo.png`,
      image: `${base}/assets/hero-cover.jpg`,
      description: settings.description,
      telephone: e164Phone,
      email: settings.email,
      address: postalAddress,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: e164Phone,
          email: settings.email,
          contactType: "customer service",
          areaServed: "FR",
          availableLanguage: ["fr", "en", "es", "it", "de"],
        },
      ],
      sameAs,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: `${base}/${locale}`,
      name: settings.name,
      description: settings.description,
      inLanguage: localeMeta[locale].htmlLang,
      publisher: { "@id": `${base}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${base}/#localbusiness`,
      parentOrganization: { "@id": `${base}/#organization` },
      name: settings.name,
      description: settings.description,
      url: `${base}/${locale}`,
      logo: `${base}/assets/logo.png`,
      image: `${base}/assets/hero-cover.jpg`,
      telephone: e164Phone,
      email: settings.email,
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Cash, Credit Card",
      hasMap: settings.addressUrl,
      address: postalAddress,
      geo: geoCoordinates,
      openingHoursSpecification,
      sameAs,
    },
    {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "@id": `${base}/#restaurant`,
      parentOrganization: { "@id": `${base}/#organization` },
      name: settings.name,
      description: settings.description,
      url: `${base}/${locale}`,
      logo: `${base}/assets/logo.png`,
      image: [
        `${base}/assets/hero-cover.jpg`,
        `${base}/assets/COMPTOIR-OUR-STORY.jpg`,
        `${base}/assets/COMPTOIR-PRESSION.jpg`,
      ],
      telephone: e164Phone,
      email: settings.email,
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Cash, Credit Card",
      servesCuisine: ["French", "Brasserie", "Bistro"],
      acceptsReservations: false,
      hasMenu: `${base}/${locale}/la-carte`,
      hasMap: settings.addressUrl,
      address: postalAddress,
      geo: geoCoordinates,
      openingHoursSpecification,
      sameAs,
    },
    {
      "@context": "https://schema.org",
      "@type": pageType,
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
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
      itemListElement: breadcrumbs.map((crumb, index) => ({
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

  if (includeMenu) {
    const menuCategories = await getMenu(locale);
    if (menuCategories.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Menu",
        "@id": `${base}/${locale}/la-carte#menu`,
        name: settings.menuTitle || t.menu_page.heroTitle,
        inLanguage: localeMeta[locale].htmlLang,
        hasMenuSection: menuCategories.map((cat) => {
          const dishes = cat.items.filter((i) => i.kind !== "divider");
          return {
            "@type": "MenuSection",
            name: cat.title,
            ...(cat.intro ? { description: cat.intro } : {}),
            hasMenuItem: dishes.map((d) => {
              const numericPrice = extractNumericEuroPrice(
                d.price ?? cat.singlePrice,
              );
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
