"use client";

import { useState } from "react";

interface CollapsibleListProps {
  items: string[];
  previewCount?: number;
}

export function CollapsibleList({
  items,
  previewCount = 4,
}: CollapsibleListProps) {
  const [expanded, setExpanded] = useState(false);
  const needsCollapse = items.length > previewCount;
  const visible = expanded ? items : items.slice(0, previewCount);

  return (
    <div>
      <ul className="space-y-2">
        {visible.map((item, j) => (
          <li
            key={j}
            className="font-sans text-sm leading-[1.7] text-ink/70"
          >
            {item}
          </li>
        ))}
      </ul>

      {needsCollapse && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-stone transition-colors duration-300 hover:text-ochre"
          style={{ transitionTimingFunction: "var(--ease-hover)" }}
        >
          {expanded ? "Réduire" : `Voir tout (${items.length})`}
        </button>
      )}
    </div>
  );
}
