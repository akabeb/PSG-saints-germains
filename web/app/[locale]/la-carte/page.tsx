import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MenuSection } from "@/components/MenuSection";
import { PageHero } from "@/components/PageHero";
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
    description: settings.description,
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
  const settings = await getSiteSettings(l);

  return (
    <>
      <PageHero title={settings.menuTitle || t.menu_page.heroTitle} locale={l} />
      <MenuSection locale={l} hideSectionHeading />
    </>
  );
}
