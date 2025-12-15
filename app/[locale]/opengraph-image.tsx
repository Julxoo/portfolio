import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jules Toussenel - Développeur Full-Stack";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #222428 0%, #1a1a1e 50%, #222428 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255, 162, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 162, 0, 0.05) 0%, transparent 50%)",
          }}
        />

        {/* Accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#FFA200",
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "24px",
          }}
        >
          {/* Terminal-style bracket */}
          <div
            style={{
              color: "#FFA200",
              fontSize: "48px",
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
          >
            {"</>"}
          </div>

          {/* Name */}
          <div
            style={{
              color: "#f5f5f5",
              fontSize: "72px",
              fontWeight: "bold",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "-2px",
            }}
          >
            Jules Toussenel
          </div>

          {/* Title */}
          <div
            style={{
              color: "#FFA200",
              fontSize: "32px",
              fontFamily: "monospace",
            }}
          >
            {isEn
              ? "Full-Stack Developer • EPITECH Student"
              : "Développeur Full-Stack • Étudiant EPITECH"}
          </div>

          {/* Tech stack */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {["Next.js", "Node.js", "Supabase", "TypeScript"].map((tech) => (
              <div
                key={tech}
                style={{
                  color: "#a3a3a3",
                  fontSize: "20px",
                  fontFamily: "monospace",
                  padding: "8px 16px",
                  border: "1px solid #404040",
                  background: "rgba(255, 255, 255, 0.02)",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Website URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            color: "#666",
            fontSize: "20px",
            fontFamily: "monospace",
          }}
        >
          julestoussenel.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}




