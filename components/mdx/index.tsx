"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo, type ReactNode } from "react";
import { Callout } from "./callout";
import { MdxImage } from "./mdx-image";
import { Gallery } from "./gallery";

function useMDXContent(code: string, mdxComponents: Record<string, unknown>) {
  return useMemo(() => {
    const fn = new Function(code);
    const Component = fn({ ...runtime }).default;
    return <Component components={mdxComponents} />;
  }, [code, mdxComponents]);
}

const components = {
  Callout,
  MdxImage,
  Gallery,
  h2: ({ children, ...props }: { children: ReactNode; id?: string }) => (
    <h2
      className="mb-5 mt-16 font-serif font-normal leading-[1.1] tracking-[-0.02em] text-ink"
      style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: { children: ReactNode; id?: string }) => (
    <h3
      className="mb-3 mt-12 font-serif font-normal leading-[1.15] tracking-[-0.015em] text-ink"
      style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)" }}
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="my-5 font-sans text-base leading-[1.8] text-ink/80">
      {children}
    </p>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }: { children: ReactNode }) => (
    <em className="font-serif italic text-ink">{children}</em>
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <a
      href={href}
      className="text-ochre underline decoration-ochre/40 underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-ink/60"
      style={{ transitionTimingFunction: "var(--ease-hover)" }}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="my-5 ml-5 list-disc space-y-2 font-sans text-base leading-[1.8] text-ink/80 marker:text-stone">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="my-5 ml-5 list-decimal space-y-2 font-sans text-base leading-[1.8] text-ink/80 marker:text-stone marker:font-mono marker:text-sm">
      {children}
    </ol>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="my-10 border-l-2 border-ochre pl-6 font-serif text-lg font-light italic leading-[1.4] tracking-[-0.01em] text-ink/80">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-14 h-px border-0 bg-mist" />,
  img: ({ src, alt }: { src?: string; alt?: string }) =>
    src ? <MdxImage src={src} alt={alt ?? ""} /> : null,

  /* ── Table components ────────────────────────────────── */
  table: ({ children }: { children: ReactNode }) => (
    <div className="mdx-table-wrap my-10 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
      <table className="w-full border-collapse font-sans text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children: ReactNode }) => (
    <thead className="border-b border-ink/20">{children}</thead>
  ),
  tbody: ({ children }: { children: ReactNode }) => (
    <tbody className="divide-y divide-mist">{children}</tbody>
  ),
  tr: ({ children }: { children: ReactNode }) => (
    <tr className="transition-colors">{children}</tr>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="whitespace-nowrap px-3 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-stone first:pl-0 last:pr-0">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="px-3 py-4 text-ink/80 first:pl-0 last:pr-0">
      {children}
    </td>
  ),
};

interface MdxContentProps {
  code: string;
}

export function MdxContent({ code }: MdxContentProps) {
  return useMDXContent(code, components);
}
