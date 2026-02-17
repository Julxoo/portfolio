import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "edge";

export const alt = "Jules Toussenel · Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<ImageResponse> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Article";
  const category = post?.category ?? "Blog";
  const readingTime = post?.metadata?.readingTime ?? 5;
  const date = post
    ? new Date(post.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

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
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#F0E6D9",
        }}
      >
        {/* Top section */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Category */}
          <div
            style={{
              fontSize: 14,
              fontFamily: "Inter",
              fontWeight: 600,
              color: "#C4A882",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 32,
            }}
          >
            {category}
          </div>

          {/* Decorative line */}
          <div
            style={{
              width: 48,
              height: 2,
              backgroundColor: "#C4A882",
              marginBottom: 32,
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 60 ? 36 : 48,
              fontFamily: "Inter",
              fontWeight: 600,
              color: "#1A1714",
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {/* Date and reading time */}
          <div
            style={{
              display: "flex",
              gap: 24,
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: 400,
              color: "#8C7E6E",
            }}
          >
            <span>{date}</span>
            <span>·</span>
            <span>{readingTime} min de lecture</span>
          </div>

          {/* Author */}
          <div
            style={{
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
