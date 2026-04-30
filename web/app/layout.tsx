import type { Metadata } from "next";
import { Arsenal, Josefin_Sans, Miniver } from "next/font/google";
import localFont from "next/font/local";

import { site, siteUrl } from "@/lib/site";

import "./globals.css";

/* ── Polices locales (extraites du thème WordPress Laurent) ── */
/* weight "100 900" = un seul fichier bold répond à tous les font-weight (pas de variante) */
const caviarDreams = localFont({
  src: [
    { path: "../public/fonts/caviardreams_bold-webfont.woff2", weight: "100 900", style: "normal" },
    { path: "../public/fonts/caviardreams_bold-webfont.woff", weight: "100 900", style: "normal" },
  ],
  variable: "--font-caviar",
  display: "swap",
});

const metropolis = localFont({
  src: [
    { path: "../public/fonts/metropolis1920-regular-webfont.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/metropolis1920-regular-webfont.woff", weight: "400", style: "normal" },
  ],
  variable: "--font-metropolis",
  display: "swap",
});

/* ── Google Fonts ── */
const josefin = Josefin_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-josefin",
  weight: ["300", "400"],
  display: "swap",
});

const arsenal = Arsenal({
  subsets: ["latin"],
  variable: "--font-arsenal",
  weight: ["400", "700"],
  display: "swap",
});

const miniver = Miniver({
  subsets: ["latin"],
  variable: "--font-miniver",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.welcome,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: site.name,
    title: site.name,
    description: site.welcome,
    images: [
      { url: "/assets/hero-cover.jpg", width: 2560, height: 1263, alt: site.name },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.welcome,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${caviarDreams.variable} ${metropolis.variable} ${josefin.variable} ${arsenal.variable} ${miniver.variable} font-nav min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
