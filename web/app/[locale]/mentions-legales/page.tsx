import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LaurentContainer } from "@/components/LaurentContainer";
import { PageHero } from "@/components/PageHero";
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
  const settings = await getSiteSettings(l);

  return (
    <>
      <PageHero title={t.legal.heroTitle} locale={l} />

      <section className="bg-wp-surface py-[70px]">
        <LaurentContainer>
          <div className="mx-auto max-w-3xl space-y-12 font-body text-[16px] leading-[1.85] text-wp-ink/90">
            {/* 1. Éditeur */}
            <div>
              <h2 className="mb-4 font-heading text-[22px] font-normal uppercase tracking-[0.18em] text-wp-accent">
                {t.legal.editorTitle}
              </h2>
              <dl className="grid gap-2 sm:grid-cols-[200px_1fr]">
                <dt className="font-bold text-wp-ink">{t.legal.editorCompanyLabel}</dt>
                <dd>{legalEntity.companyName}</dd>

                <dt className="font-bold text-wp-ink">{t.legal.editorTradeLabel}</dt>
                <dd>{settings.name}</dd>

                <dt className="font-bold text-wp-ink">{t.legal.editorCapitalLabel}</dt>
                <dd>{legalEntity.capital}</dd>

                <dt className="font-bold text-wp-ink">{t.legal.editorRcsLabel}</dt>
                <dd>{legalEntity.rcs}</dd>

                <dt className="font-bold text-wp-ink">{t.legal.editorSiretLabel}</dt>
                <dd>{legalEntity.siret}</dd>

                <dt className="font-bold text-wp-ink">{t.legal.editorAddressLabel}</dt>
                <dd>{legalEntity.registeredAddress}</dd>

                <dt className="font-bold text-wp-ink">{t.legal.editorPhoneLabel}</dt>
                <dd>
                  <a href={settings.phoneHref} className="text-wp-accent hover:underline">
                    {settings.phone}
                  </a>
                </dd>

                <dt className="font-bold text-wp-ink">{t.legal.editorEmailLabel}</dt>
                <dd>
                  <a href={`mailto:${settings.email}`} className="text-wp-accent hover:underline">
                    {settings.email}
                  </a>
                </dd>
              </dl>
            </div>

            {/* 2. Hébergement */}
            <div>
              <h2 className="mb-4 font-heading text-[22px] font-normal uppercase tracking-[0.18em] text-wp-accent">
                {t.legal.hostTitle}
              </h2>
              <p>{t.legal.hostText}</p>
            </div>

            {/* 3. RGPD & Cookies */}
            <div>
              <h2 className="mb-4 font-heading text-[22px] font-normal uppercase tracking-[0.18em] text-wp-accent">
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
            <div>
              <h2 className="mb-4 font-heading text-[22px] font-normal uppercase tracking-[0.18em] text-wp-accent">
                {t.legal.ipTitle}
              </h2>
              <p>{t.legal.ipText}</p>
            </div>
          </div>
        </LaurentContainer>
      </section>
    </>
  );
}
