"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

import { dict, type Locale } from "@/lib/i18n";

const RAW_GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PBSB8XVM";
const GTM_ID = /^GTM-[A-Z0-9]+$/i.test(RAW_GTM_ID) ? RAW_GTM_ID : "GTM-PBSB8XVM";
const STORAGE_KEY = "lcsp_consent_v1";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

function applyConsentUpdate(granted: boolean) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function () {
      // GTM attend un objet Arguments (et non un Array) dans dataLayer
      // eslint-disable-next-line prefer-rest-params
      (window.dataLayer as unknown[]).push(arguments);
    };
  }
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.dataLayer.push({
    event: "consent_update",
    analytics_storage: granted ? "granted" : "denied",
  });
}

export function GoogleTagManager({ locale }: Readonly<{ locale: Locale }>) {
  const pathname = usePathname();
  const t = dict[locale];
  const [bannerOpen, setBannerOpen] = useState(false);

  // Vérifie le choix mémorisé + écoute le lien "Cookies" du pied de page
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved !== "granted" && saved !== "denied") {
        setBannerOpen(true);
      }
    } catch {
      setBannerOpen(true);
    }

    const onReopen = () => setBannerOpen(true);
    window.addEventListener("lcsp:open-consent", onReopen);
    return () => window.removeEventListener("lcsp:open-consent", onReopen);
  }, []);

  // Remonte les navigations SPA et la langue active dans dataLayer
  useEffect(() => {
    if (typeof window === "undefined" || !pathname) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: pathname,
      page_locale: locale,
    });
  }, [pathname, locale]);

  // Remonte les clics clés du bistrot (Appel téléphonique & Itinéraire Google Maps)
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "click_phone", page_locale: locale });
      } else if (href.includes("google.com/maps") || href.includes("google.fr/maps")) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "click_directions", page_locale: locale });
      }
    };
    document.addEventListener("click", onDocClick, { passive: true });
    return () => document.removeEventListener("click", onDocClick);
  }, [locale]);

  const handleChoice = (granted: boolean) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      /* navigation privée stricte */
    }
    applyConsentUpdate(granted);
    setBannerOpen(false);
  };

  return (
    <>
      <Script
        id="gtm-consent-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            var savedConsent = null;
            try { savedConsent = localStorage.getItem('${STORAGE_KEY}'); } catch (e) {}
            gtag('consent', 'default', {
              analytics_storage: savedConsent === 'granted' ? 'granted' : 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
            gtag('js', new Date());
            window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          `,
        }}
      />
      <Script
        id="gtm-loader"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>

      {bannerOpen && (
        <aside
          role="region"
          aria-label={t.cookies.bannerAria}
          className="fixed inset-x-0 bottom-0 z-[110] border-t border-wp-ornament/55 bg-wp-panel/95 px-4 py-3.5 text-white shadow-2xl backdrop-blur-sm sm:px-6"
        >
          <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-3 sm:flex-row sm:gap-6">
            <p className="text-center font-body text-[13.5px] leading-[1.5] text-white/88 sm:text-left">
              {t.cookies.message}
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => handleChoice(false)}
                className="border border-wp-ornament/75 px-4 py-2 font-cta text-[11px] uppercase tracking-[0.22em] text-white/90 transition hover:border-wp-gold hover:text-wp-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold"
              >
                {t.cookies.decline}
              </button>
              <button
                type="button"
                onClick={() => handleChoice(true)}
                className="border border-wp-gold bg-wp-gold/15 px-4 py-2 font-cta text-[11px] uppercase tracking-[0.22em] text-wp-gold transition hover:bg-wp-gold hover:text-wp-panel focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold"
              >
                {t.cookies.accept}
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
