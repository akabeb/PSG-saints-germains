import Image from "next/image";

import { TitleDecor } from "@/components/TitleDecor";
import { dict, type Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { urlForImage } from "@/lib/sanity.image";

const fallbackHero =
  process.env.NEXT_PUBLIC_HERO_IMAGE?.trim() || "/assets/hero-cover.jpg";

export async function Hero({ locale }: Readonly<{ locale: Locale }>) {
  const settings = await getSiteSettings(locale);
  const t = dict[locale];
  const heroSrc = settings.heroImage
    ? (urlForImage(settings.heroImage, 2000) ?? fallbackHero)
    : fallbackHero;
  const title = settings.heroTitle?.trim() || settings.name;

  return (
    <section
      id="accueil"
      className="relative flex min-h-[540px] w-full items-center justify-center overflow-hidden bg-wp-panel pt-24 pb-16 md:min-h-[700px] md:pt-28"
    >
      <Image
        src={heroSrc}
        alt={t.aria.heroImageAlt}
        fill
        priority
        fetchPriority="high"
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Voile d'assombrissement garantissant un contraste WCAG AA sur toute la photo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-wp-panel/75 via-wp-panel/50 to-wp-panel/75"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-5 text-center">
        <p className="mb-4 font-script text-[19px] tracking-[0.04em] text-wp-gold sm:text-[21px]">
          {t.hero.serviceBadge}
        </p>

        <div className="inline-flex max-w-full items-center justify-center gap-x-5 md:gap-x-10">
          <TitleDecor className="hidden shrink-0 sm:block" />
          <h1 className="m-0 font-heading text-[26px] font-normal uppercase leading-[1.27] tracking-[0.18em] text-white sm:text-[36px] md:text-[48px]">
            {title}
          </h1>
          <TitleDecor className="hidden shrink-0 sm:block" />
        </div>

        <p className="geo-summary mx-auto mt-4 max-w-2xl font-body text-[15.5px] font-normal leading-[1.7] tracking-[0.4px] text-white/95 sm:text-[16.5px]">
          {settings.welcome}
        </p>

        {settings.hoursLines.length > 0 && (
          <p className="mt-4 font-body text-[14px] tracking-[0.5px] text-white/85 sm:text-[15px]">
            {settings.hoursLines.join(" · ")}
          </p>
        )}

        {/* Actions immédiates (< 30 s) : Appel 1-clic, Itinéraire Maps, Accès direct Carte */}
        <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <a
            href={settings.phoneHref}
            className="inline-flex min-h-[46px] items-center justify-center border border-wp-gold bg-wp-panel/70 px-7 py-3 font-cta text-[12px] uppercase tracking-[0.26em] text-wp-gold transition hover:bg-wp-gold hover:text-wp-panel focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold"
          >
            {t.hero.callCta} · {settings.phone}
          </a>
          <a
            href={settings.addressUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[46px] items-center justify-center border border-white/60 bg-wp-panel/55 px-7 py-3 font-cta text-[12px] uppercase tracking-[0.26em] text-white transition hover:border-wp-gold hover:text-wp-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold"
          >
            {t.hero.directionsCta}
          </a>
          <a
            href="#la-carte"
            className="inline-flex min-h-[46px] items-center justify-center border border-wp-ornament/80 bg-wp-panel/55 px-7 py-3 font-cta text-[12px] uppercase tracking-[0.26em] text-white/90 transition hover:border-wp-gold hover:text-wp-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold"
          >
            {t.hero.menuCta}
          </a>
        </div>
      </div>
    </section>
  );
}
