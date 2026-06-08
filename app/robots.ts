import type { MetadataRoute } from "next";

// robots.ts — stratégie 2026 : bloquer les bots de training IA (aucun retour
// SEO, on donne gratuitement son travail pour entraîner des modèles), autoriser
// les bots de retrieval/search (ils citent et envoient du trafic).
//
// Distinction Anthropic : ClaudeBot = training (bloqué), Claude-User = retrieval
// temps réel (autorisé), Claude-SearchBot = indexation search (autorisé).
// Même logique côté OpenAI : GPTBot (bloqué) ≠ OAI-SearchBot, ChatGPT-User.

const AI_TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "Bytespider",
  "Applebot-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
  "cohere-ai",
  "Omgilibot",
  "FacebookBot",
];

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview";

  // Preview deployments — tout bloquer pour éviter l'indexation accidentelle
  if (isPreview) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      // Tous les bots : autorisés, sauf pages internes
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/design/", "/client/"],
      },
      // Bots de training IA : bloqués entièrement
      { userAgent: AI_TRAINING_BOTS, disallow: "/" },
    ],
    sitemap: "https://julestoussenel.com/sitemap.xml",
    host: "https://julestoussenel.com",
  };
}
