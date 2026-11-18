import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LaurentContainer } from "@/components/LaurentContainer";
import { PageHero } from "@/components/PageHero";
import { geoContent } from "@/lib/geo-content";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { dict, isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { legalEntity } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : "fr";
  const t = dict[l];
  return buildPageMetadata({
    locale: l,
    path: "/mentions-legales",
    title: t.legal.heroTitle,
    description: t.legal.metaDescription,
  });
}

export default async function MentionsLegalesPage({
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

  return (
    <>
      <PageHero title={t.legal.heroTitle} locale={l} />

      <section id="mentions-legales" className="bg-wp-surface py-[70px]">
        <LaurentContainer>
          <article
            id="informations-reglementaires"
            className="mx-auto max-w-3xl space-y-12 font-body text-[16px] leading-[1.85] text-wp-ink/90"
          >
            <p className="geo-summary border-l-2 border-wp-field-border/55 pl-4 text-wp-ink/88">
              {geo.legalLead}
            </p>

            {/* 1. Éditeur (en liste <ul>/<li> pour une extraction RAG intégrale) */}
            <div id="editeur">
              <h2
                id="titre-editeur"
                className="mb-4 font-heading text-[22px] font-normal uppercase tracking-[0.18em] text-wp-accent"
              >
                {t.legal.editorTitle}
              </h2>
              <ul className="m-0 list-none space-y-2 p-0">
                <li>
                  <strong className="font-bold text-wp-ink">
                    {t.legal.editorCompanyLabel} :
                  </strong>{" "}
                  {legalEntity.companyName}.
                </li>
                <li>
                  <strong className="font-bold text-wp-ink">
                    {t.legal.editorTradeLabel} :
                  </strong>{" "}
                  {settings.name}.
                </li>
                <li>
                  <strong className="font-bold text-wp-ink">
                    {t.legal.editorCapitalLabel} :
                  </strong>{" "}
                  {legalEntity.capital}.
                </li>
                <li>
                  <strong className="font-bold text-wp-ink">
                    {t.legal.editorRcsLabel} :
                  </strong>{" "}
                  {legalEntity.rcs}.
                </li>
                <li>
                  <strong className="font-bold text-wp-ink">
                    {t.legal.editorSiretLabel} :
                  </strong>{" "}
                  {legalEntity.siret}.
                </li>
                <li>
                  <strong className="font-bold text-wp-ink">
                    {t.legal.editorAddressLabel} :
                  </strong>{" "}
                  {legalEntity.registeredAddress}.
                </li>
                <li>
                  <strong className="font-bold text-wp-ink">
                    {t.legal.editorPhoneLabel} :
                  </strong>{" "}
                  <a href={settings.phoneHref} className="text-wp-accent hover:underline">
                    {settings.phone}
                  </a>
                  .
                </li>
                <li>
                  <strong className="font-bold text-wp-ink">
                    {t.legal.editorEmailLabel} :
                  </strong>{" "}
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-wp-accent hover:underline"
                  >
                    {settings.email}
                  </a>
                  .
                </li>
              </ul>
            </div>

            {/* 2. Hébergement */}
            <div id="hebergement">
              <h2
                id="titre-hebergement"
                className="mb-4 font-heading text-[22px] font-normal uppercase tracking-[0.18em] text-wp-accent"
              >
                {t.legal.hostTitle}
              </h2>
              <p>{t.legal.hostText}</p>
            </div>

            {/* 3. RGPD & Cookies */}
            <div id="donnees-cookies">
              <h2
                id="titre-donnees-cookies"
                className="mb-4 font-heading text-[22px] font-normal uppercase tracking-[0.18em] text-wp-accent"
              >
                {t.legal.privacyTitle}
              </h2>
              <p>
                {t.legal.privacyText}{" "}
                <a
                  href={`mailto:${settings.email}`}
                  className="font-bold text-wp-accent underline underline-offset-4"
                >
                  {settings.email}
                </a>
                .
              </p>
            </div>

            {/* 4. Propriété intellectuelle & réglementation CHR */}
            <div id="propriete-intellectuelle">
              <h2
                id="titre-propriete-intellectuelle"
                className="mb-4 font-heading text-[22px] font-normal uppercase tracking-[0.18em] text-wp-accent"
              >
                {t.legal.ipTitle}
              </h2>
              <p>{t.legal.ipText}</p>
            </div>

            <div className="flex flex-wrap items-center gap-6 border-t border-wp-field-border/25 pt-8">
              <Link
                href={`/${l}/la-carte`}
                className="font-cta text-[11px] uppercase tracking-[0.22em] text-wp-accent underline decoration-wp-field-border/55 underline-offset-4 transition hover:text-wp-gold-dark"
              >
                {geo.links.exploreMenu}
              </Link>
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
