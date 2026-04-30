import { notFound } from "next/navigation";

import { AboutSection } from "@/components/AboutSection";
import { ContactSplit } from "@/components/ContactSplit";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { isLocale, type Locale } from "@/lib/i18n";

export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <>
      <Hero locale={l} />
      <MenuSection locale={l} />
      <AboutSection locale={l} />
      <ContactSplit locale={l} />
    </>
  );
}
