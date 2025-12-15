interface TechTagProps {
  tag: string;
  className?: string;
  variant?: "default" | "primary";
  clickable?: boolean;
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

export function TechTag({ tag, className = "", variant = "default", clickable = true }: TechTagProps) {
  const url = TECH_LINKS[tag];

  const baseClasses = "text-xs";
  const variantClasses = variant === "primary"
    ? "text-primary border-primary hover:bg-primary hover:text-background"
    : "text-muted-foreground/70 border-border hover:text-foreground";

  // Si pas cliquable ou pas d'URL, retourner un span
  if (!clickable || !url) {
    return (
      <span className={`${baseClasses} ${variant === "primary" ? "text-primary border-primary" : "text-muted-foreground/70 border-border"} ${className}`}>
        {tag}
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variantClasses} transition-colors ${className}`}
    >
      {tag}
    </a>
  );
}
