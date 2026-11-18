import Image from "next/image";
import Link from "next/link";

import { LaurentContainer } from "@/components/LaurentContainer";
import { ManageCookiesButton } from "@/components/ManageCookiesButton";
import { dict, type Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/getSiteSettings";

export async function Footer({ locale }: Readonly<{ locale: Locale }>) {
  const settings = await getSiteSettings(locale);
  const t = dict[locale];

  return (
    <footer className="border-t border-wp-field-border/25 bg-wp-surface py-16 text-center md:py-20">
      <LaurentContainer>
        <Link
          href={`/${locale}`}
          className="inline-block focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wp-accent"
          aria-label={settings.name}
        >
          <Image
            src="/assets/logo.png"
            alt={settings.name}
            width={140}
            height={55}
            className="mx-auto"
          />
        </Link>

        <p className="mt-6 font-heading text-[15px] uppercase tracking-[0.18em] text-wp-accent">
          {settings.name}
        </p>

        <p className="mt-2 font-body text-[15px] tracking-[0.5px] text-wp-ink/85">
          <a
            href={settings.addressUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-wp-accent hover:underline focus:outline-none focus-visible:outline-2 focus-visible:outline-wp-accent"
          >
            {settings.address}
          </a>
          {" · "}
          <a
            href={settings.phoneHref}
            className="font-bold text-wp-accent hover:underline focus:outline-none focus-visible:outline-2 focus-visible:outline-wp-accent"
          >
            {settings.phone}
          </a>
        </p>

        {settings.hoursLines.length > 0 && (
          <p className="mt-2 font-body text-[14px] text-wp-ink/75">
            {settings.hoursLines.join(" · ")}
          </p>
        )}

        <p className="mt-1 font-script text-[17px] text-wp-gold-dark">
          {t.footer.walkInSummary}
        </p>

        <nav
          aria-label={t.aria.footerNav}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-wp-field-border/20 pt-6"
        >
          <Link
            href={`/${locale}`}
            className="py-1 font-cta text-[11px] uppercase tracking-[0.22em] text-wp-ink/80 transition hover:text-wp-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-wp-accent"
          >
            {t.nav.home}
          </Link>
          <Link
            href={`/${locale}/la-carte`}
            className="py-1 font-cta text-[11px] uppercase tracking-[0.22em] text-wp-ink/80 transition hover:text-wp-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-wp-accent"
          >
            {t.nav.menu}
          </Link>
          <Link
            href={`/${locale}/infos-pratiques`}
            className="py-1 font-cta text-[11px] uppercase tracking-[0.22em] text-wp-ink/80 transition hover:text-wp-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-wp-accent"
          >
            {t.nav.infos}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="py-1 font-cta text-[11px] uppercase tracking-[0.22em] text-wp-ink/80 transition hover:text-wp-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-wp-accent"
          >
            {t.nav.contact}
          </Link>
          <Link
            href={`/${locale}/mentions-legales`}
            className="py-1 font-cta text-[11px] uppercase tracking-[0.22em] text-wp-ink/80 transition hover:text-wp-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-wp-accent"
          >
            {t.footer.legalLink}
          </Link>
          <ManageCookiesButton label={t.footer.cookiesLink} />
        </nav>

        <p className="mt-6 font-body text-[12px] text-wp-ink/65">
          {t.footer.alcoholWarning}
        </p>
      </LaurentContainer>
    </footer>
  );
}
