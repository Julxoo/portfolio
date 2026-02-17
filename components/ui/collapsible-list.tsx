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
            className="font-sans text-sm leading-[1.6] text-dark-chocolate/70"
          >
            {item}
          </li>
        ))}
      </ul>

      {needsCollapse && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 font-sans text-xs uppercase tracking-[0.1em] text-taupe transition-colors duration-300 hover:text-camel"
        >
          {expanded ? "Réduire" : `Voir tout (${items.length})`}
        </button>
      )}
    </div>
  );
}
