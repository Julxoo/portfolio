import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* Scale factor from 32x32 viewBox to 180x180 = 5.625 */
const S = 180 / 32;

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
          position: "relative",
        }}
      >
        {/* Circle top */}
        <div
          style={{
            position: "absolute",
            width: 16 * S,
            height: 16 * S,
            borderRadius: "50%",
            backgroundColor: "rgba(196, 168, 130, 0.28)",
            left: 8 * S,
            top: 3.5 * S,
          }}
        />
        {/* Circle bottom-right */}
        <div
          style={{
            position: "absolute",
            width: 16 * S,
            height: 16 * S,
            borderRadius: "50%",
            backgroundColor: "rgba(196, 168, 130, 0.28)",
            left: 11.9 * S,
            top: 10.25 * S,
          }}
        />
        {/* Circle bottom-left */}
        <div
          style={{
            position: "absolute",
            width: 16 * S,
            height: 16 * S,
            borderRadius: "50%",
            backgroundColor: "rgba(196, 168, 130, 0.28)",
            left: 4.1 * S,
            top: 10.25 * S,
          }}
        />
        {/* Center cutout */}
        <div
          style={{
            position: "absolute",
            width: 6 * S,
            height: 6 * S,
            borderRadius: "50%",
            backgroundColor: "#1A1714",
            left: 13 * S,
            top: 13 * S,
          }}
        />
        {/* Center dot */}
        <div
          style={{
            position: "absolute",
            width: 2.6 * S,
            height: 2.6 * S,
            borderRadius: "50%",
            backgroundColor: "#C4A882",
            left: 14.7 * S,
            top: 14.7 * S,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
