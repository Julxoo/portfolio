import type { NextConfig } from "next";

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler: {
    options: { mode: string };
    hooks: {
      beforeCompile: {
        tapPromise: (name: string, fn: () => Promise<void>) => void;
      };
    };
  }) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      const { build } = await import("velite");
      await build({ watch: dev, clean: !dev });
    });
  }
}

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      /* www → apex is handled at the Vercel Domains level (avoids redirect
         loops with the platform-provided redirect). Do not re-add here. */

      /* ── Retired i18n prefixes · site is fr-only now ── */
      { source: "/fr", destination: "/", permanent: true },
      { source: "/fr/:path*", destination: "/", permanent: true },
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/", permanent: true },

      /* ── /projects/ (old slug) → /realisations/ (new) · slugs match ── */
      { source: "/projects", destination: "/realisations", permanent: true },
      { source: "/projects/:slug*", destination: "/realisations/:slug*", permanent: true },

      /* ── Deleted service pages → homepage services section ── */
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/services/site-vitrine", destination: "/#services", permanent: true },
      { source: "/services/site-annonces", destination: "/#services", permanent: true },
      { source: "/services/bot-affiliation", destination: "/#services", permanent: true },
      { source: "/services/identite-visuelle", destination: "/#services", permanent: true },
      { source: "/services/:slug*", destination: "/#services", permanent: true },

      /* ── Deleted blog → homepage ── */
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:slug*", destination: "/", permanent: true },

      /* ── Deleted /a-propos → homepage approche section ── */
      { source: "/a-propos", destination: "/#approche-heading", permanent: true },

      /* ── Removed feeds ── */
      { source: "/feed.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/atom.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/rss.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

export default nextConfig;
