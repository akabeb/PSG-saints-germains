import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, locales } from "@/lib/i18n";

const PUBLIC_PREFIXES = [
  "/_next",
  "/assets",
  "/fonts",
  "/api",
  "/studio",
  "/favicon",
  "/icon",
  "/apple-icon",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    /^\/google[a-z0-9]+\.html$/i.test(pathname) ||
    PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`) || pathname.startsWith(p))
  ) {
    return NextResponse.next();
  }

  const matchedLocale = locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  if (matchedLocale) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-locale", matchedLocale);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Redirige vers la locale par défaut, en préservant le path
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|sitemap.xml|robots.txt|manifest.webmanifest|google[a-z0-9]+\\.html|assets|fonts|api|studio).*)",
  ],
};
