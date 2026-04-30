import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InfosMap } from "@/components/InfosMap";
import { LaurentContainer } from "@/components/LaurentContainer";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { TitleDecor } from "@/components/TitleDecor";
import { dict, isLocale, type Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/getSiteSettings";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? (locale as Locale) : "fr";
  const t = dict[l];
  const settings = await getSiteSettings(l);
  return {
    title: settings.contactTitle || t.contact.pageTitle,
    description: `${settings.address} — ${settings.phone}`,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = dict[l];
  const settings = await getSiteSettings(l);
  const pageTitle = settings.contactTitle || t.contact.pageTitle;

  return (
    <>
      <PageHero title={pageTitle} locale={l} />

      {/* Bloc adresse + horaires */}
      <section className="bg-white py-[70px]">
        <LaurentContainer>
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-4">
              <TitleDecor />
              <h2 className="font-heading text-[32px] font-normal uppercase tracking-[6.5px] text-wp-accent">
                {pageTitle}
              </h2>
              <TitleDecor />
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {/* Coordonnées */}
              <div>
                <h3 className="mb-4 font-heading text-[15px] font-normal uppercase tracking-[0.22em] text-wp-accent">
                  {t.contact.addressLabel}
                </h3>
                <p className="font-body text-[16px] leading-[1.9] tracking-[1px] text-wp-ink/90">
                  {settings.address}
                </p>
                <p className="mt-3 font-body text-[16px] leading-[1.9] tracking-[1px] text-wp-ink/90">
                  <a href={settings.phoneHref} className="hover:text-wp-accent transition-colors">
                    {settings.phone}
                  </a>
                  <br />
                  <a href={`mailto:${settings.email}`} className="hover:text-wp-accent transition-colors">
                    {settings.email}
                  </a>
                </p>
              </div>

              {/* Horaires */}
              <div>
                <h3 className="mb-4 font-heading text-[15px] font-normal uppercase tracking-[0.22em] text-wp-accent">
                  {t.contact.hoursLabel}
                </h3>
                {(settings.hoursLines as string[]).map((line, i) => (
                  <p key={i} className="font-body text-[16px] leading-[1.9] tracking-[1px] text-wp-ink/90">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Instagram CTA */}
            {settings.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex border border-[#9a7d57] px-9 py-3.5 font-cta text-[12px] uppercase text-wp-accent transition hover:bg-wp-accent hover:text-white"
              >
                {settings.contactCtaLabel}
              </a>
            )}
          </div>
        </LaurentContainer>
      </section>

      {/* Section itinéraire */}
      <section className="bg-white pb-[70px]">
        <LaurentContainer>
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              title={settings.directionsTitle}
              subtitle={settings.directionsText}
            />
            <p className="mt-6 text-center font-body text-[16px] leading-[1.75] tracking-[1px] text-wp-ink/85">
              {settings.directionsMetro}
            </p>
            {settings.addressUrl && (
              <div className="mt-8 text-center">
                <a
                  href={settings.addressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex border border-[#9a7d57] px-9 py-3.5 font-cta text-[12px] uppercase text-wp-accent transition hover:bg-wp-accent hover:text-white"
                >
                  {t.contact.directionsLabel}
                </a>
              </div>
            )}
          </div>
        </LaurentContainer>
      </section>

      <InfosMap lat={settings.mapLat} lng={settings.mapLng} />
    </>
  );
}
