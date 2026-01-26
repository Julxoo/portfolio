export const SITE_CONFIG = {
  name: "Jules Toussenel",
  title: "Jules Toussenel - Développeur Web",
  description:
    "Portfolio de Jules Toussenel, développeur web passionné. Découvrez mes projets, mon expérience et mes articles.",
  url: "https://www.julestoussenel.com",
  author: {
    name: "Jules Toussenel",
    email: "toussenelj@gmail.com",
  },
  links: {
    github: "https://github.com/Julxoo",
    linkedin: "https://www.linkedin.com/in/julestoussenel/",
    twitter: "",
    email: "mailto:toussenelj@gmail.com",
  },
} as const;

/** Technology links for auto-linking in components */
export const TECH_LINKS: Record<string, string> = {
  "Next.js": "https://nextjs.org",
  React: "https://react.dev",
  "React 19": "https://react.dev",
  "Node.js": "https://nodejs.org",
  Express: "https://expressjs.com",
  Supabase: "https://supabase.com",
  TypeScript: "https://www.typescriptlang.org",
  "Tailwind CSS": "https://tailwindcss.com",
  "Material-UI": "https://mui.com",
  Zod: "https://zod.dev",
  "Telegram Bot API": "https://core.telegram.org/bots/api",
  "API Telegram Bot": "https://core.telegram.org/bots/api",
  "Mistral AI": "https://mistral.ai",
  Mapbox: "https://www.mapbox.com",
  PM2: "https://pm2.keymetrics.io",
  MDX: "https://mdxjs.com",
  SEO: "https://developers.google.com/search/docs",
  EPITECH: "https://www.epitech.eu",
  "EPITECH Marseille": "https://www.epitech.eu/ecole-informatique-marseille/",
};
