export const SITE_CONFIG = {
  name: "Jules Toussenel",
  title: "Jules Toussenel - Développeur Web",
  description:
    "Portfolio de Jules Toussenel, développeur web passionné. Découvrez mes projets, mon expérience et mes articles.",
  url: "https://julestoussenel.com",
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

export const NAV_LINKS = [
  {
    href: "/",
    label: "accueil",
  },
  {
    href: "/projects",
    label: "projets",
  },
  {
    href: "/blog",
    label: "blog",
  },
  {
    href: "/#contact",
    label: "contact",
  },
] as const;
