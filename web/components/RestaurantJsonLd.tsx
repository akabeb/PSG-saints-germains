import { getSiteSettings } from "@/lib/getSiteSettings";
import { localeMeta, type Locale } from "@/lib/i18n";
import { legalEntity, siteUrl } from "@/lib/site";

/**
 * Émet des blocs <script type="application/ld+json"> de premier niveau séparés
 * (sans encapsulation @graph) afin que Google ET les analyseurs GEO/RAG stricts
 * détectent directement chaque @type racine (Organization, WebSite, LocalBusiness, Restaurant).
 */
export async function RestaurantJsonLd({ locale }: Readonly<{ locale: Locale }>) {
  const settings = await getSiteSettings(locale);
  const base = siteUrl.replace(/\/$/, "");
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

  const organizationSchema = {
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
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: `${base}/${locale}`,
    name: settings.name,
    description: settings.description,
    inLanguage: localeMeta[locale].htmlLang,
    publisher: { "@id": `${base}/#organization` },
  };

  const localBusinessSchema = {
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
  };

  const restaurantSchema = {
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
  };

  const schemas = [
    organizationSchema,
    webSiteSchema,
    localBusinessSchema,
    restaurantSchema,
  ];

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
