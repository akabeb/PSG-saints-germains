import type { Metadata } from "next";
import { headers } from "next/headers";
import { Arsenal, Josefin_Sans, Miniver } from "next/font/google";
import localFont from "next/font/local";

import { HeadJsonLd } from "@/components/HeadJsonLd";
import { isLocale, localeMeta } from "@/lib/i18n";
import { site, siteUrl } from "@/lib/site";

import "./globals.css";

/* Police locale de titrage (thème Laurent) */
const caviarDreams = localFont({
  src: [
    {
      path: "../public/fonts/caviardreams_bold-webfont.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-caviar",
  display: "swap",
});

/* Google Fonts */
const josefin = Josefin_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-josefin",
  weight: ["300", "400"],
  display: "swap",
});

const arsenal = Arsenal({
  subsets: ["latin", "latin-ext"],
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
  description: site.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/fr`,
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [
      { url: "/assets/hero-cover.jpg", width: 2560, height: 1262, alt: site.name },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/assets/hero-cover.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const hdrs = await headers();
  const rawLocale = hdrs.get("x-locale") ?? undefined;
  const rawPathname = hdrs.get("x-pathname") ?? "";
  const htmlLang = isLocale(rawLocale) ? localeMeta[rawLocale].htmlLang : "fr";

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        {isLocale(rawLocale) ? (
          <HeadJsonLd locale={rawLocale} pathname={rawPathname} />
        ) : null}
      </head>
      <body
        className={`${caviarDreams.variable} ${josefin.variable} ${arsenal.variable} ${miniver.variable} font-nav min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
