import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://julestoussenel.com";

  return {
    rules: [
      // Main rule for all crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/static/",
          "/*.json$",
          "/*?*", // Prevent crawling URL parameters
        ],
      },
      // Specific rules for Googlebot - full access
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Google Images bot - allow OG images
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/og-image.png", "/*/opengraph-image"],
        disallow: ["/api/"],
      },
      // Bingbot
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // LinkedIn bot for sharing
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
      // Twitter/X bot for cards
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      // Facebook bot
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      // Block aggressive scrapers and AI training bots
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "PerplexityBot",
        disallow: "/",
      },
      // Block known bad bots
      {
        userAgent: "AhrefsBot",
        crawlDelay: 10,
      },
      {
        userAgent: "SemrushBot",
        crawlDelay: 10,
      },
      {
        userAgent: "MJ12bot",
        disallow: "/",
      },
      {
        userAgent: "DotBot",
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
