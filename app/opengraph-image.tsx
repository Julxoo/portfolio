import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Jules Toussenel · Développeur Web Freelance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage(): Promise<ImageResponse> {
  const interSemiBold = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hiA.woff2"
    )
  ).then((res) => res.arrayBuffer());

  const interRegular = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2"
    )
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          backgroundColor: "#F0E6D9",
        }}
      >
        {/* Top decorative line */}
        <div
          style={{
            width: 64,
            height: 2,
            backgroundColor: "#C4A882",
            marginBottom: 48,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#1A1714",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Jules Toussenel
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontFamily: "Inter",
            fontWeight: 400,
            color: "#8C7E6E",
            marginBottom: 12,
          }}
        >
          AI-Augmented Software Engineer
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: 20,
            fontFamily: "Inter",
            fontWeight: 400,
            color: "#8C7E6E",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Aix-en-Provence
        </div>

        {/* Bottom decorative line */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            width: 64,
            height: 2,
            backgroundColor: "#C4A882",
          }}
        />

        {/* URL bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            fontSize: 16,
            fontFamily: "Inter",
            fontWeight: 400,
            color: "#8C7E6E",
            letterSpacing: "0.05em",
          }}
        >
          julestoussenel.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interSemiBold,
          style: "normal",
          weight: 600,
        },
        {
          name: "Inter",
          data: interRegular,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
