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
    <nav aria-label="Sommaire" className="mb-10 border-b border-rule-light pb-8">
      {/* Mobile: collapsible */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between md:hidden"
        aria-expanded={open}
      >
        <span className="font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
          Sommaire
        </span>
        <span
          className="text-taupe transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {/* Desktop: always visible label */}
      <p className="mb-4 hidden font-sans text-[13px] uppercase tracking-[0.15em] text-taupe md:block">
        Sommaire
      </p>

      {/* List */}
      <ol
        className="space-y-1.5 overflow-hidden border-l border-rule-light pl-4 transition-all duration-300 md:!max-h-none md:!mt-0 md:!opacity-100"
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
              className="font-sans text-sm leading-relaxed text-dark-chocolate/60 transition-colors duration-300 hover:text-camel"
            >
              {item.title}
            </a>
            {item.items && item.items.length > 0 && (
              <ol className="mt-1 space-y-1 pl-4">
                {item.items.map((sub) => (
                  <li key={sub.url}>
                    <a
                      href={sub.url}
                      className="font-sans text-xs leading-relaxed text-dark-chocolate/40 transition-colors duration-300 hover:text-camel"
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
