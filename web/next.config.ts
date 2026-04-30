import type { NextConfig } from "next";

// Sources CSP autorisées pour le site principal
const CSP_DIRECTIVES = [
  "default-src 'self'",
  // Next.js App Router injecte des scripts inline pour l'hydratation
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  // Styles inline (Tailwind JIT) + Google Fonts
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Polices locales + Google Fonts CDN
  "font-src 'self' https://fonts.gstatic.com",
  // Images : Sanity CDN, Unsplash, blobs (next/image)
  "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com",
  // Appels réseau : API Sanity (REST + WebSocket pour le Studio live)
  "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://api.sanity.io",
  // Le Studio Sanity peut iframe des previews
  "frame-src 'self' https://*.sanity.io",
  // Web workers (Next.js build chunks)
  "worker-src 'self' blob:",
  // Empêche le framing par des tiers (redondant avec X-Frame-Options mais recommandé)
  "frame-ancestors 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
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
