import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Favicon (32×32) — « J » Clash Display crème sur kaki. Le glyphe typographique
// fait l'icône, dans la fonte signature du site. TTF (Satori ≠ woff2).

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const bold = await readFile(
    join(process.cwd(), "app/_fonts/ClashDisplay-Bold.ttf"),
  );

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
          fontFamily: "Clash",
          fontWeight: 700,
          fontSize: 24,
          color: "#F4F1E8",
          lineHeight: 1,
        }}
      >
        J
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Clash", data: bold, weight: 700, style: "normal" }],
    },
  );
}
