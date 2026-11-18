import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InfosMap } from "@/components/InfosMap";
import { LaurentContainer } from "@/components/LaurentContainer";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
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
  const settings = await getSiteSettings(l);
  return buildPageMetadata({
    locale: l,
    path: "/infos-pratiques",
    title: settings.infosHeroTitle,
    description: `${settings.address} · ${settings.phone} — ${settings.hoursLines.join(", ")}`,
  });
}

export default async function InfosPratiquesPage({
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
      <PageHero title={settings.infosHeroTitle} locale={l} />

      <section className="bg-wp-surface py-[70px]">
        <LaurentContainer>
          <SectionTitle
            eyebrow={settings.hoursEyebrow}
            title={settings.hoursTitle}
          />
          {settings.hoursLines.length > 0 && (
            <div className="mt-6 text-center font-body text-[17px] leading-[1.9] tracking-[0.5px] text-wp-ink/90">
              {settings.hoursLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
          <p className="mx-auto mt-4 max-w-xl text-center font-script text-[20px] text-wp-gold-dark">
            {t.infos.walkInBanner}
          </p>
        </LaurentContainer>
      </section>

      <section className="bg-wp-surface pb-[70px]">
        <LaurentContainer>
          <SectionTitle title={settings.addressTitle} />
          <div className="mt-8 space-y-2 text-center font-body text-[16px] leading-[1.9] tracking-[0.5px] text-wp-ink/90">
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
            </p>
            <p>
              <a
                href={`mailto:${settings.email}`}
                className="underline decoration-wp-field-border/40 underline-offset-4 transition-colors hover:text-wp-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
              >
                {settings.email}
              </a>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={settings.phoneHref}
              className="inline-flex min-h-[46px] items-center justify-center border border-wp-accent bg-wp-accent px-8 py-3 font-cta text-[12px] uppercase tracking-[0.24em] text-white transition hover:bg-wp-accent/90 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
            >
              {t.contact.callCta}
            </a>
            <a
              href={settings.addressUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center justify-center border border-wp-field-border px-8 py-3 font-cta text-[12px] uppercase tracking-[0.24em] text-wp-accent transition hover:bg-wp-accent hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
            >
              {t.contact.directionsLabel}
            </a>
          </div>
        </LaurentContainer>
      </section>

      <section className="bg-wp-surface pb-[70px]">
        <LaurentContainer>
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              title={settings.directionsTitle}
              subtitle={settings.directionsText}
            />
            <p className="mt-6 text-center font-body text-[16px] leading-[1.75] tracking-[0.5px] text-wp-ink/85">
              {settings.directionsMetro}
            </p>
          </div>
        </LaurentContainer>
      </section>

      <InfosMap
        lat={settings.mapLat}
        lng={settings.mapLng}
        locale={l}
        addressUrl={settings.addressUrl}
      />
    </>
  );
}
