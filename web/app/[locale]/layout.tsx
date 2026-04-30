import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { Footer } from "@/components/Footer";
import { HtmlLangSync } from "@/components/HtmlLangSync";
import { Navigation } from "@/components/Navigation";
import { dict, isLocale, localeMeta, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const t = dict[typedLocale];

  return (
    <>
      <HtmlLangSync lang={localeMeta[typedLocale].htmlLang} />
      <a
        href="#laurent-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-wp-gold focus:px-4 focus:py-2 focus:font-cta focus:text-[11px] focus:uppercase focus:tracking-[0.3em] focus:text-wp-panel"
      >
        {t.aria.skipToContent}
      </a>
      <div className="laurent-wrapper relative min-h-screen overflow-x-hidden">
        <Navigation />
        <main id="laurent-main" className="relative z-[1]">
          {children}
        </main>
        <Footer locale={typedLocale} />
      </div>
    </>
  );
}
