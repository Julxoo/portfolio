"use client";

import { useState } from "react";

interface TocEntry {
  title: string;
  url: string;
  items?: TocEntry[];
}

interface TocProps {
  items: TocEntry[];
}

export function Toc({ items }: TocProps) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Sommaire" className="mb-10 border-b border-mist pb-8">
      {/* Mobile: collapsible */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between md:hidden"
        aria-expanded={open}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
          Sommaire
        </span>
        <span
          className="text-stone transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {/* Desktop: always visible label */}
      <p className="mb-5 hidden font-mono text-[11px] uppercase tracking-[0.2em] text-stone md:block">
        Sommaire
      </p>

      {/* List */}
      <ol
        className="space-y-2 overflow-hidden border-l border-mist pl-4 transition-all duration-300 md:!max-h-none md:!mt-0 md:!opacity-100"
        style={{
          maxHeight: open ? "1000px" : "0px",
          marginTop: open ? "16px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        {items.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              className="font-sans text-sm leading-relaxed text-ink/65 transition-colors duration-300 hover:text-ochre"
              style={{ transitionTimingFunction: "var(--ease-hover)" }}
            >
              {item.title}
            </a>
            {item.items && item.items.length > 0 && (
              <ol className="mt-1.5 space-y-1.5 pl-4">
                {item.items.map((sub) => (
                  <li key={sub.url}>
                    <a
                      href={sub.url}
                      className="font-sans text-xs leading-relaxed text-ink/45 transition-colors duration-300 hover:text-ochre"
                      style={{ transitionTimingFunction: "var(--ease-hover)" }}
                    >
                      {sub.title}
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
