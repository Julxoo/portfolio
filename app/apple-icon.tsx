import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A1714",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#F0E6D9",
            letterSpacing: "-0.02em",
          }}
        >
          JT
        </div>
      </div>
    ),
    { ...size }
  );
}
