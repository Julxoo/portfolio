interface FAQItem {
  question: string;
  answer: string;
}

interface FAQJsonLdProps {
  locale: string;
}

export function FAQJsonLd({ locale }: FAQJsonLdProps) {
  const isEn = locale === "en";

  const faqItems: FAQItem[] = isEn
    ? [
        {
          question: "What is Jules Toussenel's technical stack?",
          answer:
            "Jules specializes in modern full-stack development with Next.js, React, TypeScript, Node.js, Supabase, and PostgreSQL. He also leverages AI-assisted development tools like Claude Code, Codex, and Gemini to optimize workflows.",
        },
        {
          question: "Where is Jules Toussenel currently studying?",
          answer:
            "Jules is pursuing a Master's degree in Data & Artificial Intelligence at EPITECH Marseille, one of France's leading computer science schools.",
        },
        {
          question: "Does Jules Toussenel work as a freelancer?",
          answer:
            "Jules is currently in a work-study program at ATC Immobilier in Aix-en-Provence, where he develops CRM systems and automation solutions. He is open to freelance opportunities for web development projects.",
        },
        {
          question: "What types of projects does Jules Toussenel work on?",
          answer:
            "Jules works on full-stack web applications, CRM systems, process automation, and AI-integrated solutions. His projects range from real estate management platforms to innovative mobile applications.",
        },
        {
          question: "How can I contact Jules Toussenel?",
          answer:
            "You can reach Jules via email at toussenelj@gmail.com, connect with him on LinkedIn, or check out his projects on GitHub. All contact links are available on his portfolio website.",
        },
      ]
    : [
        {
          question: "Quelle est la stack technique de Jules Toussenel ?",
          answer:
            "Jules est spécialisé dans le développement full-stack moderne avec Next.js, React, TypeScript, Node.js, Supabase et PostgreSQL. Il utilise également des outils de développement assisté par IA comme Claude Code, Codex et Gemini pour optimiser ses workflows.",
        },
        {
          question: "Où Jules Toussenel étudie-t-il actuellement ?",
          answer:
            "Jules poursuit un Master en Data & Intelligence Artificielle à EPITECH Marseille, l'une des écoles d'informatique les plus reconnues en France.",
        },
        {
          question: "Jules Toussenel travaille-t-il en freelance ?",
          answer:
            "Jules est actuellement en alternance chez ATC Immobilier à Aix-en-Provence, où il développe des systèmes CRM et des solutions d'automatisation. Il est ouvert aux opportunités freelance pour des projets de développement web.",
        },
        {
          question: "Sur quels types de projets Jules Toussenel travaille-t-il ?",
          answer:
            "Jules travaille sur des applications web full-stack, des systèmes CRM, de l'automatisation de processus et des solutions intégrant l'IA. Ses projets vont des plateformes de gestion immobilière aux applications mobiles innovantes.",
        },
        {
          question: "Comment contacter Jules Toussenel ?",
          answer:
            "Vous pouvez joindre Jules par email à toussenelj@gmail.com, le contacter sur LinkedIn ou consulter ses projets sur GitHub. Tous les liens de contact sont disponibles sur son portfolio.",
        },
      ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

