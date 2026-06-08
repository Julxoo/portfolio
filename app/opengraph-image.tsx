import { ImageResponse } from "next/og";

// OG image globale — utilisée pour toutes les routes qui ne définissent
// pas leur propre `opengraph-image.tsx` (pages projet, articles...).
//
// Composition : pure typographie éditoriale sur toile de lin.
// - Header : « JULES TOUSSENEL » small-caps kaki
// - Bloc central : titre Instrument Serif italique, ink
// - Footer : filet kaki + label gauche + URL droite
//
// Fontes : pour l'instant fallback système (serif italic + sans-serif).
// TODO : charger Instrument Serif Italic + Instrument Sans Medium en TTF
// local (via `readFile(process.cwd(), 'app/_fonts/...')`) quand on aura
// déposé les fichiers dans le repo. Satori ne peut pas fetcher Google Fonts
// directement — il faut des ArrayBuffer.

export const alt = "Jules Toussenel — Sites sur-mesure pour artisans et commerces premium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F4F1E8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Header — petite capitale */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#535040",
            fontWeight: 500,
          }}
        >
          Jules Toussenel
        </div>

        {/* Bloc central — titre Serif italique */}
        <div
          style={{
            display: "flex",
            fontFamily: "serif",
            fontStyle: "italic",
            fontSize: 104,
            lineHeight: 1.05,
            color: "#1F1F1B",
            maxWidth: 980,
            letterSpacing: -1,
          }}
        >
          Sites sur-mesure pour artisans et commerces premium.
        </div>

        {/* Footer — filet + labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#535040",
            borderTop: "1px solid rgba(83, 80, 64, 0.25)",
            paddingTop: 20,
          }}
        >
          <span style={{ letterSpacing: 2, textTransform: "uppercase" }}>
            Portfolio
          </span>
          <span>julestoussenel.com</span>
        </div>
      </div>
    ),
    size,
  );
}
