"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { TitleDecor } from "@/components/TitleDecor";
import { dict, isLocale, defaultLocale } from "@/lib/i18n";

export default function LocaleNotFound() {
  const pathname = usePathname() ?? "";
  const seg = pathname.split("/")[1];
  const locale = isLocale(seg) ? seg : defaultLocale;
  const t = dict[locale];

  return (
    <section className="flex min-h-[500px] flex-col items-center justify-center bg-wp-panel px-6 text-center">
      <p className="font-heading text-[12px] uppercase tracking-[0.3em] text-wp-gold">404</p>
      <div className="mt-4 flex items-center gap-6">
        <TitleDecor className="hidden sm:block" />
        <h1 className="font-heading text-[28px] font-normal uppercase tracking-[0.22em] text-white sm:text-[36px]">
          {t.notFound.label}
        </h1>
        <TitleDecor className="hidden sm:block" />
      </div>
      <p className="mt-3 font-body text-[15px] tracking-wide text-white/50">{t.notFound.sub}</p>
      <Link
        href={`/${locale}`}
        className="mt-10 border border-wp-ornament px-8 py-3 font-cta text-[12px] uppercase tracking-[0.36em] text-white/80 transition hover:bg-wp-ornament/15 hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold"
      >
        {t.notFound.home}
      </Link>
    </section>
  );
}
