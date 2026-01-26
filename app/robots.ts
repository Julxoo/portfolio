import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url;

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
      // Allow AI bots for GEO (Generative Engine Optimization)
      // These bots can cite and reference content in AI responses
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      // Rate limit SEO tools
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
