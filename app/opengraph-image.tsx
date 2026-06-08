import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// OG image globale (1200×630) — la signature du site, façon hero : la phrase
// « Des sites dessinés, pas décorés. » en Clash Display, « dessinés » en kaki
// sur la toile de lin. Fontes Clash chargées en TTF (Satori ne lit pas le woff2).

export const alt =
  "Jules Toussenel — Des sites dessinés, pas décorés. Développeur freelance à Aix-en-Provence.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CREAM = "#F4F1E8";
const INK = "#1F1F1B";
const KAKI = "#535040";

export default async function OpengraphImage() {
  const [medium, bold] = await Promise.all([
    readFile(join(process.cwd(), "app/_fonts/ClashDisplay-Medium.ttf")),
    readFile(join(process.cwd(), "app/_fonts/ClashDisplay-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: CREAM,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 84,
          fontFamily: "Clash",
        }}
      >
        {/* Signature */}
        <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: KAKI }}>
          Jules Toussenel
        </div>

        {/* Le titre — la phrase signature, « dessinés » en kaki */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: 700,
            fontSize: 100,
            lineHeight: 0.98,
            letterSpacing: -3,
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ color: INK }}>Des sites&nbsp;</span>
            <span style={{ color: KAKI }}>{" "}dessinés,</span>
          </div>
          <div style={{ display: "flex", color: INK }}>pas décorés.</div>
        </div>

        {/* Pied — filet kaki + rôle / url */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              height: 1,
              background: "rgba(83,80,64,0.3)",
              marginBottom: 24,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 27,
              fontWeight: 500,
              color: KAKI,
            }}
          >
            <span>Développeur freelance · Aix-en-Provence</span>
            <span>julestoussenel.com</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Clash", data: medium, weight: 500, style: "normal" },
        { name: "Clash", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
