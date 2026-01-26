import { TECH_LINKS } from "@/lib/constants";

interface TechTagProps {
  tag: string;
  className?: string;
  variant?: "default" | "primary";
  clickable?: boolean;
}

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
