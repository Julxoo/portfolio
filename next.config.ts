import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Performance & SEO optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security
  reactStrictMode: true, // Enable React strict mode for better error detection

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"], // Modern formats for better performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Common breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Icon sizes
    minimumCacheTTL: 60 * 60 * 24 * 365, // Cache images for 1 year
  },

  // Bundle optimization
  experimental: {
    optimizePackageImports: ["lucide-react"], // Tree-shake lucide-react icons
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remove console.logs in production
  },
};

export default withNextIntl(nextConfig);
