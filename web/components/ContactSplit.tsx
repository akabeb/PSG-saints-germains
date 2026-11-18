import Image from "next/image";

import { TitleDecor } from "@/components/TitleDecor";
import { dict, type Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { urlForImage } from "@/lib/sanity.image";

const FALLBACK_BG = "/assets/Saint-peres.jpg";

export async function ContactSplit({ locale }: Readonly<{ locale: Locale }>) {
  const settings = await getSiteSettings(locale);
  const t = dict[locale];
  const bgSrc = settings.contactImage
    ? (urlForImage(settings.contactImage, 1400) ?? FALLBACK_BG)
    : FALLBACK_BG;

  return (
    <section id="nous-contacter" className="grid bg-wp-warm md:grid-cols-2">
      {/* Colonne gauche : coordonnées actionnables + horaires 7j/7 unifiés */}
      <div className="flex items-center justify-center px-6 py-20 text-center md:py-[120px]">
        <div className="max-w-md">
          <div className="flex items-center justify-center gap-4">
            <TitleDecor className="hidden shrink-0 sm:block" />
            <h2
              id="titre-nous-contacter"
              className="min-w-0 font-heading text-[28px] font-normal uppercase tracking-[0.2em] text-wp-accent sm:text-[36px] md:text-[42px]"
            >
              {settings.contactTitle}
            </h2>
            <TitleDecor className="hidden shrink-0 sm:block" />
          </div>

          <div className="mt-8 space-y-2 font-body text-[16px] leading-[1.75] tracking-[0.5px] text-wp-ink/90">
            <p>
              <a
                href={settings.addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-wp-field-border/50 underline-offset-4 transition-colors hover:text-wp-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
              >
                {settings.address}
              </a>
            </p>
            <p>
              <a
                href={settings.phoneHref}
                className="font-bold text-wp-accent transition-opacity hover:opacity-80 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
              >
                {settings.phone}
              </a>
              {" · "}
              <a
                href={`mailto:${settings.email}`}
                className="underline decoration-wp-field-border/40 underline-offset-4 transition-colors hover:text-wp-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
              >
                {settings.email}
              </a>
            </p>
          </div>

          {settings.hoursLines.length > 0 && (
            <div className="mt-6 border-y border-wp-field-border/25 py-4 font-body text-[15px] leading-[1.8] text-wp-ink/85">
              <ul className="m-0 list-none p-0">
                {settings.hoursLines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <p className="mt-1.5 font-script text-[18px] text-wp-gold-dark">
                {t.contact.walkInNote}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={settings.phoneHref}
              className="inline-flex min-h-[46px] items-center justify-center border border-wp-accent bg-wp-accent px-7 py-3 font-cta text-[12px] uppercase tracking-[0.24em] text-white transition hover:bg-wp-accent/90 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
            >
              {t.contact.callCta}
            </a>
            <a
              href={settings.addressUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center justify-center border border-wp-field-border px-7 py-3 font-cta text-[12px] uppercase tracking-[0.24em] text-wp-accent transition hover:bg-wp-accent hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
            >
              {t.contact.directionsLabel}
            </a>
          </div>

          {settings.instagramUrl ? (
            <div className="mt-6">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2 font-cta text-[11px] uppercase tracking-[0.24em] text-wp-gold-dark underline decoration-wp-gold-dark/50 underline-offset-4 transition hover:text-wp-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
              >
                {settings.contactCtaLabel}
              </a>
            </div>
          ) : null}
        </div>
      </div>

      {/* Colonne droite : image plein cadre */}
      <div className="relative min-h-[320px] md:min-h-0">
        <Image
          src={bgSrc}
          alt={t.aria.counterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
