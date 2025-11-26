import { ImageResponse } from "next/og";

export const alt = "Project";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

// Note: We use static generation for OG images to avoid Edge runtime limitations

export default async function ProjectOGImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isEn = locale === "en";

  // Create a readable title from the slug
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

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
          padding: "60px",
          position: "relative",
        }}
      >
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

        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 85% 20%, rgba(255, 162, 0, 0.08) 0%, transparent 40%)",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              color: "#FFA200",
              fontSize: "20px",
              fontFamily: "monospace",
            }}
          >
            {isEn ? "PROJECT" : "PROJET"}
          </div>
          <div
            style={{
              color: "#666",
              fontSize: "18px",
              fontFamily: "monospace",
            }}
          >
            julestoussenel.com
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: "24px",
          }}
        >
          {/* Project title */}
          <div
            style={{
              color: "#f5f5f5",
              fontSize: "56px",
              fontWeight: "bold",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "-1px",
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>

          {/* Description placeholder */}
          <div
            style={{
              color: "#a3a3a3",
              fontSize: "24px",
              fontFamily: "system-ui, sans-serif",
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            {isEn
              ? "Web development project by Jules Toussenel"
              : "Projet de développement web par Jules Toussenel"}
          </div>

          {/* Tech stack indicators */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "16px",
            }}
          >
            {["Next.js", "TypeScript", "Supabase"].map((tag) => (
              <div
                key={tag}
                style={{
                  color: "#FFA200",
                  fontSize: "16px",
                  fontFamily: "monospace",
                  padding: "8px 16px",
                  border: "1px solid #FFA200",
                  background: "rgba(255, 162, 0, 0.1)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              color: "#FFA200",
              fontSize: "28px",
              fontFamily: "monospace",
            }}
          >
            {"</>"}
          </div>
          <div
            style={{
              color: "#f5f5f5",
              fontSize: "20px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Jules Toussenel
          </div>
        </div>
      </div>
    ),
    size
  );
}
