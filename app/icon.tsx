import { ImageResponse } from "next/og";

// Favicon principal — « J » italique Instrument Serif, lin sur fond kaki.
// Rendu dynamique via ImageResponse, caché au build (coût runtime : 0).
// Cohérent avec la décision « le glyphe typographique fait l'icône ».

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 26,
          color: "#F4F1E8",
          lineHeight: 1,
          paddingBottom: 2,
        }}
      >
        J
      </div>
    ),
    size,
  );
}
