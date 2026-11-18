import type { Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { siteUrl } from "@/lib/site";

export async function RestaurantJsonLd({ locale }: Readonly<{ locale: Locale }>) {
  const settings = await getSiteSettings(locale);
  const base = siteUrl.replace(/\/$/, "");
  const e164Phone = settings.phoneHref.replace(/^tel:/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${base}/#restaurant`,
    name: settings.name,
    description: settings.description,
    url: `${base}/${locale}`,
    image: [
      `${base}/assets/hero-cover.jpg`,
      `${base}/assets/COMPTOIR-OUR-STORY.jpg`,
      `${base}/assets/COMPTOIR-PRESSION.jpg`,
    ],
    telephone: e164Phone,
    email: settings.email,
    priceRange: "€€",
    servesCuisine: ["French", "Brasserie", "Bistro"],
    acceptsReservations: false,
    hasMenu: `${base}/${locale}/la-carte`,
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
    ...(settings.instagramUrl ? { sameAs: [settings.instagramUrl] } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
