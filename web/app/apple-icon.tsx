import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1315",
          border: "4px solid #9C7C57",
          color: "#c9ab81",
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: "0.14em",
        }}
      >
        LCSP
      </div>
    ),
    { ...size },
  );
}
