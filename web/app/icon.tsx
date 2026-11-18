import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon 32x32 au monogramme officiel du Comptoir des Saints-Pères (LCSP)
 * sur fond sombre #0b1315 avec liseré or #c9ab81.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1315",
          border: "1px solid #9C7C57",
          color: "#c9ab81",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        LCSP
      </div>
    ),
    { ...size },
  );
}
