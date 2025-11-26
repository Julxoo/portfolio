import { ImageResponse } from "next/og";

export const alt = "Blog Post";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

// Note: We use static generation for OG images to avoid Edge runtime limitations
// The title and description are passed via URL params handled by Next.js

export default async function BlogOGImage({
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
              "radial-gradient(circle at 15% 80%, rgba(255, 162, 0, 0.08) 0%, transparent 40%)",
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
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                color: "#FFA200",
                fontSize: "20px",
                fontFamily: "monospace",
              }}
            >
              BLOG
            </div>
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
          {/* Post title */}
          <div
            style={{
              color: "#f5f5f5",
              fontSize: "52px",
              fontWeight: "bold",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "-1px",
              lineHeight: 1.15,
              maxWidth: "950px",
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
              ? "Technical article on web development"
              : "Article technique sur le développement web"}
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
