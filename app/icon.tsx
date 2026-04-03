import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon(): ImageResponse {
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
          borderRadius: 6,
          position: "relative",
        }}
      >
        {/* Circle top */}
        <div
          style={{
            position: "absolute",
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: "rgba(196, 168, 130, 0.28)",
            left: 8,
            top: 3.5,
          }}
        />
        {/* Circle bottom-right */}
        <div
          style={{
            position: "absolute",
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: "rgba(196, 168, 130, 0.28)",
            left: 11.9,
            top: 10.25,
          }}
        />
        {/* Circle bottom-left */}
        <div
          style={{
            position: "absolute",
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: "rgba(196, 168, 130, 0.28)",
            left: 4.1,
            top: 10.25,
          }}
        />
        {/* Center cutout */}
        <div
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#1A1714",
            left: 13,
            top: 13,
          }}
        />
        {/* Center dot */}
        <div
          style={{
            position: "absolute",
            width: 2.6,
            height: 2.6,
            borderRadius: "50%",
            backgroundColor: "#C4A882",
            left: 14.7,
            top: 14.7,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
