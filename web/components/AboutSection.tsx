import Image from "next/image";
import Link from "next/link";

import { ChevronGridAnimated } from "@/components/ChevronGridAnimated";
import { LaurentContainer } from "@/components/LaurentContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { geoContent } from "@/lib/geo-content";
import { dict, type Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { urlForImage } from "@/lib/sanity.image";
import { CHEVRON_PATTERN_TALL_SVG } from "@/lib/svg-assets";

const FALLBACK_LEFT = "/assets/COMPTOIR-OUR-STORY.jpg";
const FALLBACK_RIGHT = "/assets/COMPTOIR-PRESSION.jpg";

export async function AboutSection({ locale }: Readonly<{ locale: Locale }>) {
  const settings = await getSiteSettings(locale);
  const t = dict[locale];
  const geo = geoContent[locale];
  const leftSrc = settings.aboutImageLeft
    ? (urlForImage(settings.aboutImageLeft, 900) ?? FALLBACK_LEFT)
    : FALLBACK_LEFT;
  const rightSrc = settings.aboutImageRight
    ? (urlForImage(settings.aboutImageRight, 900) ?? FALLBACK_RIGHT)
    : FALLBACK_RIGHT;

  return (
    <section id="a-propos" className="bg-wp-surface py-[70px]">
      <LaurentContainer>
        <article id="histoire-bistrot">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              id="titre-a-propos"
              eyebrow={settings.aboutEyebrow}
              title={settings.aboutTitle}
              subtitle={settings.aboutText}
              level="h2"
            />
          </div>

          {/* Repères factuels structurés en liste HTML sémantique (<ul>/<li>) */}
          <div className="mx-auto mt-12 max-w-4xl border-y border-wp-field-border/30 py-8">
            <h3
              id="reperes-cles"
              className="mb-6 text-center font-heading text-[15px] font-normal uppercase tracking-[0.22em] text-wp-gold-dark"
            >
              {geo.highlightsTitle}
            </h3>
            <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2">
              {geo.highlights.map((item, index) => (
                <li
                  key={index}
                  className="border-l-2 border-wp-field-border/50 pl-4 font-body text-[15px] leading-[1.7] text-wp-ink/90"
                >
                  <strong className="block font-heading text-[14px] font-normal uppercase tracking-[0.14em] text-wp-accent">
                    {item.label}
                  </strong>
                  <span className="mt-1 block text-wp-ink/82">{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Paragraphes éditoriaux autonomes répondant aux sous-intentions de recherche */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-3">
            {geo.homeFaq.map((q) => (
              <div key={q.id} id={q.id} className="space-y-2">
                <h3 className="m-0 font-heading text-[15px] font-normal uppercase leading-snug tracking-[0.14em] text-wp-accent">
                  {q.question}
                </h3>
                <p className="m-0 font-body text-[14.5px] leading-[1.75] text-wp-ink/85">
                  {q.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Maillage interne contextuel dans <main> */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-center">
            <Link
              href={`/${locale}/la-carte`}
              className="font-cta text-[11px] uppercase tracking-[0.22em] text-wp-accent underline decoration-wp-field-border/55 underline-offset-4 transition hover:text-wp-gold-dark"
            >
              {geo.links.exploreMenu}
            </Link>
            <Link
              href={`/${locale}/infos-pratiques`}
              className="font-cta text-[11px] uppercase tracking-[0.22em] text-wp-accent underline decoration-wp-field-border/55 underline-offset-4 transition hover:text-wp-gold-dark"
            >
              {geo.links.practicalInfo}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="font-cta text-[11px] uppercase tracking-[0.22em] text-wp-accent underline decoration-wp-field-border/55 underline-offset-4 transition hover:text-wp-gold-dark"
            >
              {geo.links.contactTeam}
            </Link>
          </div>
        </article>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-10">
          <div className="relative overflow-hidden">
            <Image
              src={leftSrc}
              alt={t.aria.aboutLeftAlt}
              width={778}
              height={1182}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="hidden self-center md:block">
            <ChevronGridAnimated
              markup={CHEVRON_PATTERN_TALL_SVG}
              width={290}
              height={548}
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src={rightSrc}
              alt={t.aria.aboutRightAlt}
              width={778}
              height={1182}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </LaurentContainer>
    </section>
  );
}
