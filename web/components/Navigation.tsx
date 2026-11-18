"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LogoSvg } from "@/components/LogoSvg";
import {
  dict,
  isLocale,
  localeMeta,
  locales,
  defaultLocale,
  type Locale,
} from "@/lib/i18n";
import { laurentContainerClass } from "@/lib/laurent-layout";
import { site } from "@/lib/site";

function detectLocale(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  return isLocale(seg) ? seg : defaultLocale;
}

function buildLocalePath(currentPath: string, target: Locale) {
  const segs = currentPath.split("/").filter(Boolean);
  if (isLocale(segs[0])) segs[0] = target;
  else segs.unshift(target);
  return "/" + segs.join("/");
}

export function Navigation() {
  const pathname = usePathname() ?? "/fr";
  const currentLocale = detectLocale(pathname);
  const t = dict[currentLocale];
  const isHome =
    pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen && !langOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setLangOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [mobileOpen, langOpen]);

  const links = [
    { href: `/${currentLocale}`, label: t.nav.home, match: isHome },
    {
      href: `/${currentLocale}/la-carte`,
      label: t.nav.menu,
      match: pathname.endsWith("/la-carte"),
    },
    {
      href: `/${currentLocale}/infos-pratiques`,
      label: t.nav.infos,
      match: pathname.endsWith("/infos-pratiques"),
    },
    {
      href: `/${currentLocale}/contact`,
      label: t.nav.contact,
      match: pathname.endsWith("/contact"),
    },
  ];

  const transparent = isHome && !scrolled && !mobileOpen && !langOpen;
  const otherLocales = locales.filter((l) => l !== currentLocale);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
        transparent
          ? "border-b border-transparent bg-gradient-to-b from-wp-panel/75 to-transparent"
          : "border-b border-white/10 bg-wp-panel/95 backdrop-blur-md"
      }`}
    >
      <nav
        aria-label={t.aria.mainNav}
        className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 md:py-5 ${laurentContainerClass}`}
      >
        {/* Gauche : logo */}
        <Link
          href={`/${currentLocale}`}
          className="group justify-self-start py-1 text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold"
          aria-label={site.name}
        >
          <LogoSvg
            className="h-[39px] w-[100px] transition-opacity duration-300 group-hover:opacity-80"
            fill="currentColor"
          />
        </Link>

        {/* Centre : liens desktop */}
        <ul className="hidden items-center justify-self-center gap-x-7 lg:flex">
          {links.map(({ href, label, match }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={match ? "page" : undefined}
                className={`nav-link py-1 text-[13px] font-light uppercase tracking-[0.12em] text-white transition-colors hover:text-wp-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wp-gold ${
                  match ? "is-active text-wp-gold" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Droite : appel (desktop) + sélecteur de langue 5 langues (desktop + mobile) + burger */}
        <div className="flex items-center justify-self-end gap-x-3 lg:gap-x-6">
          <a
            href={site.phoneHref}
            className="hidden border border-wp-ornament/80 px-4 py-2 font-cta text-[11px] uppercase tracking-[0.22em] text-wp-gold transition hover:border-wp-gold hover:bg-wp-gold/15 hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold lg:inline-block"
          >
            {site.phone}
          </a>

          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-expanded={langOpen}
              aria-haspopup="true"
              aria-label={t.aria.changeLanguage}
              className="nav-link h-11 cursor-pointer gap-2.5 px-2 text-[12px] font-light uppercase leading-none tracking-[0.12em] text-white transition-colors hover:text-wp-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold lg:h-auto lg:px-0 lg:py-1 lg:text-[13px]"
            >
              <span
                className="inline-block h-[11px] w-[16px] shrink-0 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${localeMeta[currentLocale].flag}')` }}
                aria-hidden="true"
              />
              <span className="translate-y-[0.5px]">
                {localeMeta[currentLocale].shortLabel}
              </span>
              <svg
                aria-hidden="true"
                width="9"
                height="6"
                viewBox="0 0 9 6"
                className={`ml-0.5 text-wp-gold transition-transform duration-200 ${
                  langOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M1 1l3.5 3.5L8 1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </button>

            <ul
              aria-label={t.aria.chooseLanguage}
              aria-hidden={!langOpen}
              inert={!langOpen}
              className={`absolute right-0 top-full mt-3 min-w-[148px] list-none border border-white/15 bg-wp-panel/98 px-4 py-2 shadow-xl transition-all duration-200 ${
                langOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0"
              }`}
            >
              {otherLocales.map((l) => (
                <li key={l} className="border-b border-white/10 last:border-0">
                  <Link
                    href={buildLocalePath(pathname, l)}
                    className="flex min-h-10 items-center gap-3 py-2 text-[12px] font-light uppercase leading-none tracking-[0.12em] text-white transition-colors hover:text-wp-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-wp-gold"
                  >
                    <span
                      className="inline-block h-[11px] w-[16px] shrink-0 bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url('${localeMeta[l].flag}')` }}
                      aria-hidden="true"
                    />
                    <span className="translate-y-[0.5px]">{localeMeta[l].label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] focus:outline-none focus-visible:outline-2 focus-visible:outline-wp-gold lg:hidden"
            aria-label={mobileOpen ? t.aria.closeMenu : t.aria.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="laurent-mobile-drawer"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={`block h-px w-6 bg-white transition-transform duration-200 ${
                mobileOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-white transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-white transition-transform duration-200 ${
                mobileOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Drawer mobile */}
      <div
        id="laurent-mobile-drawer"
        className={`mobile-drawer overflow-hidden transition-all duration-300 lg:hidden ${
          mobileOpen ? "visible max-h-[560px] opacity-100" : "invisible max-h-0 opacity-0"
        }`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <ul className="flex flex-col border-t border-white/10 bg-wp-panel px-6 py-2">
          {links.map(({ href, label, match }) => (
            <li key={href} className="border-b border-white/10">
              <Link
                href={href}
                aria-current={match ? "page" : undefined}
                className={`block py-4 text-[13px] font-light uppercase tracking-[0.18em] transition hover:text-wp-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold ${
                  match ? "text-wp-gold" : "text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="border-b border-white/10 py-3">
            <a
              href={site.phoneHref}
              className="flex min-h-11 items-center justify-center border border-wp-ornament px-5 py-2.5 font-cta text-[12px] uppercase tracking-[0.24em] text-wp-gold transition hover:bg-wp-gold/15 hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-wp-gold"
            >
              {t.nav.callShort} · {site.phone}
            </a>
          </li>
          <li className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3">
            {locales.map((l) => (
              <Link
                key={l}
                href={buildLocalePath(pathname, l)}
                className={`flex min-h-10 items-center gap-2.5 text-[12px] font-light uppercase leading-none tracking-[0.18em] transition hover:text-wp-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold ${
                  l === currentLocale ? "text-wp-gold" : "text-white/75"
                }`}
              >
                <span
                  className="inline-block h-[11px] w-[16px] shrink-0 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${localeMeta[l].flag}')` }}
                  aria-hidden="true"
                />
                <span className="translate-y-[0.5px]">{localeMeta[l].shortLabel}</span>
              </Link>
            ))}
          </li>
        </ul>
      </div>
    </header>
  );
}
