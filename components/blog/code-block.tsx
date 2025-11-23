"use client";

import { useState, useRef } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const text = preRef.current?.textContent || '';

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group mb-6">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 text-xs bg-background border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors opacity-0 group-hover:opacity-100 rounded"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre
        ref={preRef}
        className={`overflow-x-auto rounded-lg border border-primary/20 bg-primary/5 p-4 font-mono text-xs sm:text-sm leading-relaxed ${className || ''}`}
      >
        {children}
      </pre>
    </div>
  );
}
