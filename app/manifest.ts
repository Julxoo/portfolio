import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jules Toussenel",
    short_name: "Jules T.",
    description:
      "AI-Augmented Software Engineer a Aix-en-Provence. Applications web sur-mesure, CRM metier, SaaS et automatisation.",
    start_url: "/",
    display: "standalone",
    theme_color: "#F0E6D9",
    background_color: "#F0E6D9",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
