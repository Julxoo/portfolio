import React from "react";
import { TECH_LINKS } from "@/lib/constants";

interface RichTextProps {
  children: string;
  className?: string;
}

export function RichText({ children, className = "" }: RichTextProps) {
  // Split text by potential links, maintaining the original text structure
  const parts = children.split(/(\n)/);

  const processLine = (line: string) => {
    let remaining = line;
    const elements: (string | React.ReactElement)[] = [];
    let key = 0;

    // Sort tech terms by length (descending) to match longest first
    const sortedTerms = Object.keys(TECH_LINKS).sort((a, b) => b.length - a.length);

    while (remaining.length > 0) {
      let matched = false;

      for (const tech of sortedTerms) {
        const index = remaining.indexOf(tech);
        if (index !== -1) {
          // Add text before the match
          if (index > 0) {
            elements.push(remaining.substring(0, index));
          }

          // Add the link
          elements.push(
            <a
              key={`link-${key++}`}
              href={TECH_LINKS[tech]}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              {tech}
            </a>
          );

          // Update remaining text
          remaining = remaining.substring(index + tech.length);
          matched = true;
          break;
        }
      }

      // If no match found, add remaining text and break
      if (!matched) {
        if (remaining.length > 0) {
          elements.push(remaining);
        }
        break;
      }
    }

    return elements;
  };

  return (
    <div className={className}>
      {parts.map((part, i) => {
        if (part === "\n") {
          return <br key={`br-${i}`} />;
        }
        return <span key={`line-${i}`}>{processLine(part)}</span>;
      })}
    </div>
  );
}
