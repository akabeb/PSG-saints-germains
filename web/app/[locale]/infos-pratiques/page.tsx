import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InfosMap } from "@/components/InfosMap";
import { LaurentContainer } from "@/components/LaurentContainer";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/getSiteSettings";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? (locale as Locale) : "fr";
  const settings = await getSiteSettings(l);
  return {
    title: settings.infosHeroTitle,
    description: `${settings.address} — ${settings.phone}`,
  };
}

export default async function InfosPratiquesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
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
            <div className="mt-5 text-center font-body text-[16px] leading-[1.9] tracking-[1px] text-wp-ink/85">
              {settings.hoursLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </LaurentContainer>
      </section>
      <section className="bg-wp-surface pb-[70px]">
        <LaurentContainer>
          <SectionTitle title={settings.addressTitle} />
          <div className="mt-8 text-center font-body text-[16px] leading-[1.9] tracking-[1px] text-wp-ink/90">
            <p>{settings.address}</p>
            <p>
              <a
                href={settings.phoneHref}
                className="hover:text-wp-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
              >
                {settings.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${settings.email}`}
                className="hover:text-wp-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
              >
                {settings.email}
              </a>
            </p>
          </div>
        </LaurentContainer>
      </section>
      <section className="bg-wp-surface pb-[70px]">
        <LaurentContainer>
          <div className="mx-auto max-w-3xl">
            <SectionTitle title={settings.directionsTitle} subtitle={settings.directionsText} />
            <p className="mt-6 text-center font-body text-[16px] leading-[1.75] tracking-[1px] text-wp-ink/85">
              {settings.directionsMetro}
            </p>
          </div>
        </LaurentContainer>
      </section>
      <InfosMap lat={settings.mapLat} lng={settings.mapLng} />
    </>
  );
}
