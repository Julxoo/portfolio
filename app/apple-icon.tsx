import { ImageResponse } from "next/og";

// Icône Apple (home screen iOS / iPadOS) — même composition que le favicon
// mais 180×180, padding ajusté pour laisser iOS appliquer son corner radius.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#535040",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          fontStyle: "italic",
          fontSize: 140,
          color: "#F4F1E8",
          lineHeight: 1,
          paddingBottom: 10,
        }}
      >
        J
      </div>
    ),
    size,
  );
}
