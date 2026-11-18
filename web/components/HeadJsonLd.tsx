import { geoContent } from "@/lib/geo-content";
import { getMenu } from "@/lib/getMenu";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { dict, localeMeta, locales, type Locale } from "@/lib/i18n";
import { legalEntity, siteUrl } from "@/lib/site";

function extractNumericEuroPrice(raw?: string): string | undefined {
  if (!raw) return undefined;
  const m = raw.match(/^(\d+(?:[.,]\d+)?)\s*€$/);
  if (!m) return undefined;
  return m[1].replace(",", ".");
}

/**
 * Injecte dans <head> les schémas Schema.org strictement localisés dans la langue active (`locale`) :
 * - @graph fondamental (Organization + Restaurant/FoodEstablishment/LocalBusiness + WebSite)
 * - Schémas de page dédiés (ContactPage, WebPage, BreadcrumbList, SpeakableSpecification, Menu, FAQPage)
 */
export async function HeadJsonLd({
  locale,
  pathname,
}: Readonly<{ locale: Locale; pathname: string }>) {
  const base = siteUrl.replace(/\/$/, "");
  const subPath = pathname.replace(new RegExp(`^/${locale}`), "") || "";
  const pageUrl = `${base}/${locale}${subPath}`;
  const langCode = localeMeta[locale].htmlLang;

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

  // Métadonnées strictement traduites selon la langue et la route active
  let pageTitle = `${settings.name} — ${settings.tagline}`;
  let pageDescription = settings.description;
  let pageType: "WebPage" | "ContactPage" = "WebPage";
  const breadcrumbs: { name: string; path: string }[] = [
    { name: t.nav.home, path: "" },
  ];
  let faqItems = undefined as typeof geo.homeFaq | undefined;
  let includeMenu = false;

  if (subPath === "") {
    faqItems = geo.homeFaq;
    includeMenu = true;
  } else if (subPath === "/la-carte") {
    const localizedMenuLabel = settings.menuTitle || t.menu_page.heroTitle;
    pageTitle = `${localizedMenuLabel} — ${settings.name}`;
    pageDescription = geo.menuPageLead;
    breadcrumbs.push({ name: localizedMenuLabel, path: "/la-carte" });
    includeMenu = true;
  } else if (subPath === "/infos-pratiques") {
    const localizedInfosLabel = settings.infosHeroTitle;
    pageTitle = `${localizedInfosLabel} — ${settings.name}`;
    pageDescription = `${settings.address} · ${settings.phone} — ${settings.hoursLines.join(", ")}`;
    pageType = "ContactPage";
    breadcrumbs.push({ name: localizedInfosLabel, path: "/infos-pratiques" });
    faqItems = geo.infosFaq;
  } else if (subPath === "/contact") {
    const localizedContactLabel = settings.contactTitle || t.contact.pageTitle;
    pageTitle = `${localizedContactLabel} — ${settings.name}`;
    pageDescription = `${settings.address} — ${settings.phone} — ${settings.email}`;
    pageType = "ContactPage";
    breadcrumbs.push({ name: localizedContactLabel, path: "/contact" });
    faqItems = geo.contactFaq;
  } else if (subPath === "/mentions-legales") {
    pageTitle = `${t.legal.heroTitle} — ${settings.name}`;
    pageDescription = t.legal.metaDescription;
    breadcrumbs.push({ name: t.legal.heroTitle, path: "/mentions-legales" });
  }

  // 1. Graphe d'entité principal (Restaurant + FoodEstablishment + LocalBusiness + Organization + WebSite)
  const coreGraphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Restaurant", "FoodEstablishment", "LocalBusiness"],
        "@id": `${base}/#restaurant`,
        parentOrganization: { "@id": `${base}/#organization` },
        name: settings.name,
        url: `${base}/${locale}`,
        inLanguage: langCode,
        description: settings.description,
        logo: `${base}/assets/logo.png`,
        image: [
          `${base}/assets/hero-cover.jpg`,
          `${base}/assets/COMPTOIR-OUR-STORY.jpg`,
          `${base}/assets/COMPTOIR-PRESSION.jpg`,
        ],
        telephone: e164Phone,
        email: settings.email,
        servesCuisine: geo.servesCuisine,
        priceRange: "€€",
        currenciesAccepted: "EUR",
        paymentAccepted: geo.paymentAccepted,
        acceptsReservations: false,
        address: postalAddress,
        geo: geoCoordinates,
        openingHoursSpecification,
        hasMenu: `${base}/${locale}/la-carte`,
        hasMap: settings.addressUrl,
        sameAs,
      },
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: settings.name,
        legalName: legalEntity.companyName,
        taxID: legalEntity.siret,
        url: `${base}/${locale}`,
        logo: `${base}/assets/logo.png`,
        description: settings.description,
        address: postalAddress,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: e164Phone,
            email: settings.email,
            contactType: geo.contactTypeLabel,
            areaServed: "FR",
            availableLanguage: [...locales],
          },
        ],
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: settings.name,
        url: `${base}/${locale}`,
        description: settings.description,
        inLanguage: langCode,
        publisher: { "@id": `${base}/#restaurant` },
      },
    ],
  };

  // 2. Schémas spécifiques à la page active (tous strictement dans la langue `locale`)
  const schemas: Record<string, unknown>[] = [
    coreGraphSchema,
    {
      "@context": "https://schema.org",
      "@type": pageType,
      "@id": `${pageUrl}#webpage`,
      name: pageTitle,
      url: pageUrl,
      description: pageDescription,
      inLanguage: langCode,
      isPartOf: { "@id": `${base}/#website` },
      mainEntity: { "@id": `${base}/#restaurant` },
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
  ];

  if (faqItems && faqItems.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      inLanguage: langCode,
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
      const localizedMenuLabel = settings.menuTitle || t.menu_page.heroTitle;
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Menu",
        "@id": `${base}/${locale}/la-carte#menu`,
        name: `${localizedMenuLabel} — ${settings.name}`,
        url: `${base}/${locale}/la-carte`,
        inLanguage: langCode,
        mainEntityOfPage: `${base}/${locale}/la-carte`,
        hasMenuSection: menuCategories.map((cat) => {
          const dishes = cat.items.filter((i) => i.kind !== "divider");
          const sectionDescription = cat.intro ?? geo.categoryLeads[cat._id];
          return {
            "@type": "MenuSection",
            name: cat.title,
            ...(sectionDescription ? { description: sectionDescription } : {}),
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
