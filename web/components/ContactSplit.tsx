import Image from "next/image";

import { TitleDecor } from "@/components/TitleDecor";
import type { Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { urlForImage } from "@/lib/sanity.image";

const FALLBACK_BG = "/assets/Saint-peres.png";

export async function ContactSplit({ locale }: Readonly<{ locale: Locale }>) {
  const settings = await getSiteSettings(locale);
  const bgSrc = settings.contactImage
    ? (urlForImage(settings.contactImage) ?? FALLBACK_BG)
    : FALLBACK_BG;

  return (
    <section className="grid bg-wp-warm md:grid-cols-2">
      {/* Colonne gauche : texte */}
      <div className="flex items-center justify-center px-6 py-24 text-center md:py-[180px]">
        <div className="max-w-md">
          <div className="flex items-center justify-center gap-4">
            <TitleDecor className="flex-shrink-0" />
            <h3 className="min-w-0 font-heading text-[36px] font-normal uppercase tracking-[0.23em] text-wp-accent md:text-[48px]">
              {settings.contactTitle}
            </h3>
            <TitleDecor className="flex-shrink-0" />
          </div>
          <p className="mt-8 font-body text-[16px] leading-[1.75] tracking-[1px] text-wp-ink/85">
            {settings.address}
            <br />
            {settings.phone} – {settings.email}
          </p>
          {settings.contactDays ? (
            <p className="mt-3 font-body text-[15px] tracking-[1px] text-wp-ink/75">
              {settings.contactDays}
            </p>
          ) : null}
          {settings.instagramUrl ? (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex border border-wp-ornament px-9 py-3.5 font-cta text-[12px] uppercase text-wp-accent transition hover:bg-wp-accent hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
            >
              {settings.contactCtaLabel}
            </a>
          ) : null}
        </div>
      </div>

      {/* Colonne droite : image plein cadre */}
      <div className="relative min-h-[300px] md:min-h-0">
        <Image
          src={bgSrc}
          alt={`Plan — ${settings.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
