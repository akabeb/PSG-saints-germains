"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LogoSvg } from "@/components/LogoSvg";
import { dict, isLocale, localeMeta, locales, defaultLocale, type Locale } from "@/lib/i18n";
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
  const pathname = usePathname();
  const currentLocale = detectLocale(pathname);
  const t = dict[currentLocale];
  const isHome = pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;
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
    if (!langOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
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
  }, [langOpen]);

  const links = [
    { href: `/${currentLocale}`, label: t.nav.home, match: isHome },
    { href: `/${currentLocale}/infos-pratiques`, label: t.nav.infos, match: pathname.endsWith("/infos-pratiques") },
  ];

  const transparent = isHome && !scrolled && !mobileOpen;
  const otherLocales = locales.filter((l) => l !== currentLocale);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-white/10 bg-wp-panel/95 backdrop-blur-md"
      }`}
    >
      <nav className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 ${laurentContainerClass}`}>
        {/* Gauche : logo */}
        <Link
          href={`/${currentLocale}`}
          className="group justify-self-start text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
          aria-label={site.name}
        >
          <LogoSvg
            className="h-[39px] w-[100px] transition-opacity duration-300 group-hover:opacity-80"
            fill="currentColor"
          />
        </Link>

        {/* Centre : liens */}
        <ul className="hidden items-center justify-self-center gap-x-7 md:flex">
          {links.map(({ href, label, match }) => (
            <li key={href}>
              <Link
                href={href}
                className={`nav-link text-[13px] font-light uppercase tracking-[0.1em] text-white transition-colors hover:text-wp-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold ${
                  match ? "is-active" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Droite : sélecteur de langue */}
        <div ref={langRef} className="relative hidden justify-self-end md:block">
          <button
            type="button"
            onClick={() => setLangOpen((v) => !v)}
            aria-expanded={langOpen}
            aria-haspopup="true"
            aria-label="Changer de langue"
            className="nav-link flex cursor-pointer items-center gap-1.5 text-[13px] font-light uppercase tracking-[0.1em] text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold"
          >
            <span
              className="inline-block h-[11px] w-[16px] shrink-0 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${localeMeta[currentLocale].flag}')`, marginRight: "8px" }}
              aria-hidden
            />
            <span>{localeMeta[currentLocale].label}</span>
          </button>
          <ul
            aria-label="Choisir une langue"
            className={`absolute right-0 top-full mt-6 min-w-max list-none p-0 transition-all duration-200 ${
              langOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-1 opacity-0"
            }`}
          >
            {otherLocales.map((l) => (
              <li key={l} className="py-2">
                <Link
                  href={buildLocalePath(pathname, l)}
                  className="nav-link flex items-center gap-1.5 text-[13px] font-light uppercase tracking-[0.1em] text-white transition-colors hover:text-wp-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold"
                >
                  <span
                    className="inline-block h-[11px] w-[16px] shrink-0 bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${localeMeta[l].flag}')`, marginRight: "8px" }}
                    aria-hidden
                  />
                  {localeMeta[l].label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Burger mobile */}
        <button
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] justify-self-end md:hidden"
          aria-label={mobileOpen ? t.aria.closeMenu : t.aria.openMenu}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            className={`block h-px w-6 bg-white transition-transform duration-200 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-white transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-white transition-transform duration-200 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Drawer mobile */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-[400px]" : "max-h-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <ul className="flex flex-col border-t border-white/10 bg-wp-panel px-6 py-2">
          {links.map(({ href, label, match }) => (
            <li key={href} className="border-b border-white/10">
              <Link
                href={href}
                className={`block py-4 text-[13px] font-light uppercase tracking-[0.18em] text-white transition hover:text-wp-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold ${
                  match ? "text-wp-gold" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-2" aria-hidden>
            <div className="border-t border-wp-gold/30" />
          </li>
          {locales.map((l) => (
            <li key={l} className="border-b border-white/10 last:border-0">
              <Link
                href={buildLocalePath(pathname, l)}
                className={`flex items-center gap-4 py-5 text-[12px] font-light uppercase tracking-[0.28em] transition hover:text-wp-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold ${
                  l === currentLocale ? "text-wp-gold" : "text-white/70"
                }`}
              >
                <span
                  className="inline-block h-[13px] w-[19px] shrink-0 bg-contain bg-center bg-no-repeat opacity-90"
                  style={{ backgroundImage: `url('${localeMeta[l].flag}')`, marginRight: "10px" }}
                  aria-hidden
                />
                {localeMeta[l].label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
