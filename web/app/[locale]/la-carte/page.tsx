import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MenuSection } from "@/components/MenuSection";
import { PageHero } from "@/components/PageHero";
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
    title: settings.menuTitle || t.menu_page.heroTitle,
    description: settings.tagline,
  };
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
  const settings = await getSiteSettings(l);

  return (
    <>
      <PageHero title={settings.menuTitle || t.menu_page.heroTitle} locale={l} />
      <MenuSection locale={l} />
    </>
  );
}
