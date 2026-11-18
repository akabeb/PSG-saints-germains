import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LaurentContainer } from "@/components/LaurentContainer";
import { MenuSection } from "@/components/MenuSection";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { geoContent } from "@/lib/geo-content";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { dict, isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : "fr";
  const t = dict[l];
  const settings = await getSiteSettings(l);
  return buildPageMetadata({
    locale: l,
    path: "/la-carte",
    title: settings.menuTitle || t.menu_page.heroTitle,
    description: geoContent[l].menuPageLead,
  });
}

export default async function LaCartePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = dict[l];
  const geo = geoContent[l];
  const settings = await getSiteSettings(l);
  const pageTitle = settings.menuTitle || t.menu_page.heroTitle;

  return (
    <>
      <PageHero title={pageTitle} locale={l} />
      <MenuSection locale={l} hideSectionHeading leadText={geo.menuPageLead} />

      <section
        id="savoir-faire"
        className="border-t border-wp-field-border/25 bg-wp-warm/45 py-[65px]"
      >
        <LaurentContainer>
          <article id="engagements-cuisine" className="mx-auto max-w-3xl">
            <div className="text-center">
              <SectionTitle
                id="titre-savoir-faire"
                title={geo.menuCraftTitle}
                subtitle={geo.menuCraftText}
              />
            </div>

            <ul className="m-0 mt-8 list-none space-y-3.5 p-0 font-body text-[15.5px] leading-[1.8] text-wp-ink/88">
              {geo.menuCraftBullets.map((b, idx) => (
                <li
                  key={idx}
                  className="border-l-2 border-wp-field-border/55 pl-4"
                >
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-center">
              <Link
                href={`/${l}/infos-pratiques`}
                className="font-cta text-[11px] uppercase tracking-[0.22em] text-wp-accent underline decoration-wp-field-border/55 underline-offset-4 transition hover:text-wp-gold-dark"
              >
                {geo.links.practicalInfo}
              </Link>
              <Link
                href={`/${l}/contact`}
                className="font-cta text-[11px] uppercase tracking-[0.22em] text-wp-accent underline decoration-wp-field-border/55 underline-offset-4 transition hover:text-wp-gold-dark"
              >
                {geo.links.contactTeam}
              </Link>
            </div>
          </article>
        </LaurentContainer>
      </section>
    </>
  );
}
