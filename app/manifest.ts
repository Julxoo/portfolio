import type { MetadataRoute } from "next";

// PWA manifest — installable mais minimal.
// On évite `display: "standalone"` qui cache la barre d'URL (le site est un
// portfolio, pas une app). `minimal-ui` conserve la barre pour rester honnête.
//
// theme_color = kaki (#535040) colore la barre d'adresse Chrome Android.
// background_color = lin (#F4F1E8) — fond du splash screen PWA.

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jules Toussenel",
    short_name: "Jules T.",
    description:
      "Développeur freelance — sites sur-mesure pour artisans et commerces premium.",
    start_url: "/",
    display: "minimal-ui",
    background_color: "#F4F1E8",
    theme_color: "#535040",
    lang: "fr",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
