import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Icône Apple (180×180, home screen iOS/iPadOS) — « J » Clash Display crème
// sur kaki, padding pour laisser iOS appliquer son corner radius.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          fontSize: 132,
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
