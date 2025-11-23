import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jules Toussenel - Portfolio",
    short_name: "Jules Toussenel",
    description: "Portfolio de Jules Toussenel, développeur web",
    start_url: "/",
    display: "standalone",
    background_color: "#222428",
    theme_color: "#222428",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
