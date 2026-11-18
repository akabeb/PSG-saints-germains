import type { NextConfig } from "next";

// Sources CSP autorisées pour le site principal
const CSP_DIRECTIVES = [
  "default-src 'self'",
  // Next.js App Router + Google Tag Manager (GTM-PBSB8XVM)
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.googletagmanager.com",
  // Styles inline (Tailwind / next/font) + Google Fonts
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Polices locales + Google Fonts CDN
  "font-src 'self' https://fonts.gstatic.com",
  // Images : Sanity CDN, Unsplash, tuiles OpenStreetMap, pixels GTM/GA4
  "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://*.tile.openstreetmap.org https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
  // Appels réseau : API Sanity + Google Tag Manager / Google Analytics (Consent Mode v2)
  "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://api.sanity.io https://www.googletagmanager.com https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net",
  // Embeds autorisés : Sanity Studio + OpenStreetMap + GTM Tag Assistant Preview
  "frame-src 'self' https://*.sanity.io https://www.openstreetmap.org https://www.googletagmanager.com",
  // Web workers (Next.js build chunks)
  "worker-src 'self' blob:",
  // Empêche le framing par des tiers
  "frame-ancestors 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: CSP_DIRECTIVES,
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  /** Sur volume réseau / externe, le cache disque Webpack corrompt les chunks (ex. ./447.js, 404 sur _next/static). */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
