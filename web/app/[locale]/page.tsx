import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AboutSection } from "@/components/AboutSection";
import { ContactSplit } from "@/components/ContactSplit";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { PageJsonLd } from "@/components/PageJsonLd";
import { getMenu } from "@/lib/getMenu";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { isLocale, type Locale } from "@/lib/i18n";
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
    path: "",
    description: settings.description,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const [settings, categories] = await Promise.all([
    getSiteSettings(l),
    getMenu(l),
  ]);

  return (
    <>
      <PageJsonLd
        locale={l}
        path=""
        title={`${settings.name} — ${settings.tagline}`}
        description={settings.description}
        menuCategories={categories}
      />
      <Hero locale={l} />
      <MenuSection locale={l} />
      <AboutSection locale={l} />
      <ContactSplit locale={l} />
    </>
  );
}
