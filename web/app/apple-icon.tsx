import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple Touch Icon 180x180 — Cloche de brasserie Art Déco en laiton doré
 * sur cartouche vert bouteille inspiré de la carte du Comptoir des Saints-Pères.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 32%, #1a3832 0%, #0b1715 100%)",
        }}
      >
        <svg
          width="180"
          height="180"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cartouche Art Déco à écoinçons rentrants */}
          <path
            d="M 13.5 5 H 50.5 V 9.5 H 54.5 V 13.5 H 59 V 50.5 H 54.5 V 54.5 H 50.5 V 59 H 13.5 V 54.5 H 9.5 V 50.5 H 5 V 13.5 H 9.5 V 9.5 H 13.5 Z"
            fill="none"
            stroke="#b89668"
            strokeWidth="1.35"
            strokeLinejoin="miter"
            opacity="0.88"
          />
          <rect x="5" y="5" width="2.4" height="2.4" fill="#c9ab81" opacity="0.8" />
          <rect x="56.6" y="5" width="2.4" height="2.4" fill="#c9ab81" opacity="0.8" />
          <rect x="5" y="56.6" width="2.4" height="2.4" fill="#c9ab81" opacity="0.8" />
          <rect x="56.6" y="56.6" width="2.4" height="2.4" fill="#c9ab81" opacity="0.8" />

          {/* Nervures chevrons Art Déco sous le contour du dôme */}
          <path
            d="M 26.3 24.4 L 39.5 42 M 33.8 23.6 L 47.4 41.7 M 27.7 26.3 L 15.9 42 M 33.1 33.5 L 26.7 42"
            fill="none"
            stroke="#b89668"
            strokeWidth="1.5"
            strokeLinecap="butt"
            opacity="0.85"
          />

          {/* Dôme de la cloche de brasserie */}
          <path
            d="M 13.5 42 A 18.5 18.5 0 0 1 50.5 42 Z"
            fill="rgba(229, 202, 156, 0.13)"
            stroke="#dfc396"
            strokeWidth="2.7"
            strokeLinejoin="round"
          />

          {/* Bouton / prise de cloche en laiton tourné */}
          <line x1="32" y1="20.2" x2="32" y2="23.5" stroke="#dfc396" strokeWidth="2.6" />
          <circle
            cx="32"
            cy="17.2"
            r="2.9"
            fill="#132824"
            stroke="#dfc396"
            strokeWidth="2.3"
          />

          {/* Plateau de service à rebords relevés */}
          <path
            d="M 9.5 45.8 L 12.4 47.4 H 51.6 L 54.5 45.8"
            fill="none"
            stroke="#dfc396"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
