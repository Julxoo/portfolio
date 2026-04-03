import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jules Toussenel",
    short_name: "Jules T.",
    description:
      "AI-Augmented Software Engineer à Aix-en-Provence. Applications web sur-mesure, CRM métier, SaaS et automatisation.",
    start_url: "/",
    display: "standalone",
    theme_color: "#F0E6D9",
    background_color: "#F0E6D9",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
