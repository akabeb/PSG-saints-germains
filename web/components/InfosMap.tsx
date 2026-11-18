"use client";

import { dict, type Locale } from "@/lib/i18n";

/**
 * Carte OpenStreetMap (embed iframe autorisé par la CSP frame-src) +
 * barre d'accès direct Google Maps / OpenStreetMap.
 */
export function InfosMap({
  lat,
  lng,
  locale = "fr",
  addressUrl,
}: {
  lat: number;
  lng: number;
  locale?: Locale;
  addressUrl?: string;
}) {
  const t = dict[locale];
  const delta = 0.004;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const osmDirectUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`;

  return (
    <div className="w-full bg-wp-warm">
      <div className="h-[420px] w-full">
        <iframe
          src={src}
          title={t.aria.mapTitle}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 border-t border-wp-field-border/25 px-4 py-4 text-center">
        {addressUrl && (
          <a
            href={addressUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-cta text-[11px] uppercase tracking-[0.22em] text-wp-accent underline decoration-wp-field-border/50 underline-offset-4 transition hover:text-wp-gold-dark focus:outline-none focus-visible:outline-2 focus-visible:outline-wp-accent"
          >
            {t.contact.directionsLabel}
          </a>
        )}
        <a
          href={osmDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-cta text-[11px] uppercase tracking-[0.22em] text-wp-ink/75 underline decoration-wp-field-border/40 underline-offset-4 transition hover:text-wp-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-wp-accent"
        >
          {t.contact.osmLinkLabel}
        </a>
      </div>
    </div>
  );
}
