"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { dict, isLocale, defaultLocale } from "@/lib/i18n";

export default function LocaleError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const pathname = usePathname() ?? "";
  const seg = pathname.split("/")[1];
  const locale = isLocale(seg) ? seg : defaultLocale;
  const t = dict[locale];

  return (
    <section className="flex min-h-[500px] flex-col items-center justify-center bg-wp-panel px-6 text-center">
      <h1 className="font-heading text-[28px] font-normal uppercase tracking-[0.22em] text-white sm:text-[36px]">
        {t.error.title}
      </h1>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="border border-wp-gold px-8 py-3 font-cta text-[12px] uppercase tracking-[0.36em] text-wp-gold transition hover:bg-wp-gold/10 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold"
        >
          {t.error.retry}
        </button>
        <Link
          href={`/${locale}`}
          className="border border-wp-ornament/60 px-8 py-3 font-cta text-[12px] uppercase tracking-[0.36em] text-white/70 transition hover:bg-wp-ornament/10 hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold"
        >
          {t.error.home}
        </Link>
      </div>
    </section>
  );
}
