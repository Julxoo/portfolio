interface ProjectJsonLdProps {
  title: string;
  description: string;
  slug: string;
  locale: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectJsonLd({
  title,
  description,
  slug,
  locale,
  tags,
  githubUrl,
  liveUrl,
}: ProjectJsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: description,
    author: {
      "@type": "Person",
      name: "Jules Toussenel",
      url: "https://julestoussenel.com",
      email: "toussenelj@gmail.com",
      jobTitle: "Développeur Full-Stack",
      sameAs: [
        "https://github.com/Julxoo",
        "https://www.linkedin.com/in/julestoussenel/",
      ],
    },
    creator: {
      "@type": "Person",
      name: "Jules Toussenel",
    },
    url: liveUrl || `https://julestoussenel.com/${locale}/projects/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://julestoussenel.com/${locale}/projects/${slug}`,
    },
    keywords: tags.join(", "),
    inLanguage: locale === "en" ? "en-US" : "fr-FR",
    ...(githubUrl && {
      codeRepository: githubUrl,
    }),
    image: {
      "@type": "ImageObject",
      url: "https://julestoussenel.com/og-image.png",
      width: 1200,
      height: 630,
    },
    programmingLanguage: tags
      .filter((tag) =>
        [
          "TypeScript",
          "JavaScript",
          "Python",
          "Java",
          "C",
          "C++",
          "Go",
          "Rust",
        ].includes(tag)
      )
      .map((lang) => ({
        "@type": "ComputerLanguage",
        name: lang,
      })),
    about: tags.map((tag) => ({
      "@type": "Thing",
      name: tag,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
