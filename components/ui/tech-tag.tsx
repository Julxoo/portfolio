"use client";

interface TechTagProps {
  tag: string;
  className?: string;
}

const TECH_LINKS: Record<string, string> = {
  "Next.js": "https://nextjs.org",
  "React": "https://react.dev",
  "React 19": "https://react.dev",
  "Node.js": "https://nodejs.org",
  "Express": "https://expressjs.com",
  "Supabase": "https://supabase.com",
  "TypeScript": "https://www.typescriptlang.org",
  "Tailwind CSS": "https://tailwindcss.com",
  "Material-UI": "https://mui.com",
  "Zod": "https://zod.dev",
  "Telegram Bot API": "https://core.telegram.org/bots/api",
  "Mistral AI": "https://mistral.ai",
  "Mapbox": "https://www.mapbox.com",
  "PM2": "https://pm2.keymetrics.io",
  "MDX": "https://mdxjs.com",
  "SEO": "https://developers.google.com/search/docs",
  "CRM": "",
  "Automatisation": "",
  "Multilingue": "",
};

export function TechTag({ tag, className = "" }: TechTagProps) {
  const url = TECH_LINKS[tag];

  if (!url) {
    return (
      <span className={`text-xs text-muted-foreground/70 ${className}`}>
        {tag}
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`text-xs text-muted-foreground/70 hover:text-foreground transition-colors underline decoration-muted-foreground/30 hover:decoration-foreground ${className}`}
    >
      {tag}
    </a>
  );
}
