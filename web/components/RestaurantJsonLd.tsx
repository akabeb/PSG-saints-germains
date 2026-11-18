import { getSiteSettings } from "@/lib/getSiteSettings";
import { localeMeta, type Locale } from "@/lib/i18n";
import { legalEntity, siteUrl } from "@/lib/site";

export async function RestaurantJsonLd({ locale }: Readonly<{ locale: Locale }>) {
  const settings = await getSiteSettings(locale);
  const base = siteUrl.replace(/\/$/, "");
  const e164Phone = settings.phoneHref.replace(/^tel:/, "");
  const sameAs = [settings.instagramUrl, settings.addressUrl].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: settings.name,
        legalName: legalEntity.companyName,
        identifier: legalEntity.siret,
        url: `${base}/${locale}`,
        description: settings.description,
        logo: {
          "@type": "ImageObject",
          "@id": `${base}/#logo`,
          url: `${base}/assets/logo.png`,
          contentUrl: `${base}/assets/logo.png`,
          caption: settings.name,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "29 Rue des Saints-Pères",
          addressLocality: "Paris",
          postalCode: "75006",
          addressCountry: "FR",
        },
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
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: `${base}/${locale}`,
        name: settings.name,
        description: settings.description,
        inLanguage: localeMeta[locale].htmlLang,
        publisher: { "@id": `${base}/#organization` },
      },
      {
        "@type": ["Restaurant", "LocalBusiness"],
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
        hasMenu: { "@id": `${base}/${locale}/la-carte#menu` },
        hasMap: settings.addressUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: "29 Rue des Saints-Pères",
          addressLocality: "Paris",
          postalCode: "75006",
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: settings.mapLat,
          longitude: settings.mapLng,
        },
        openingHoursSpecification: [
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
        ],
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
