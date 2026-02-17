"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo, type ReactNode } from "react";
import { Callout } from "./callout";
import { MdxImage } from "./mdx-image";

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
  h2: ({ children, ...props }: { children: ReactNode; id?: string }) => (
    <h2
      className="mb-4 mt-14 font-normal"
      style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: { children: ReactNode; id?: string }) => (
    <h3
      className="mb-3 mt-10 font-normal text-dark-chocolate"
      style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)" }}
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="my-5 font-sans text-base leading-[1.8] text-dark-chocolate/80">
      {children}
    </p>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-semibold text-dark-chocolate">{children}</strong>
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <a
      href={href}
      className="text-camel underline decoration-camel/30 underline-offset-4 transition-colors duration-300 hover:text-matte-gold hover:decoration-matte-gold/50"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="my-5 ml-5 list-disc space-y-2 font-sans text-base leading-[1.8] text-dark-chocolate/80">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="my-5 ml-5 list-decimal space-y-2 font-sans text-base leading-[1.8] text-dark-chocolate/80">
      {children}
    </ol>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="my-8 border-l-2 border-camel/40 pl-5 font-serif text-lg italic text-dark-chocolate/60">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 h-px border-0 bg-rule-light" />,
  img: ({ src, alt }: { src?: string; alt?: string }) =>
    src ? <MdxImage src={src} alt={alt ?? ""} /> : null,

  /* ── Table components ────────────────────────────────── */
  table: ({ children }: { children: ReactNode }) => (
    <div className="mdx-table-wrap my-8 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
      <table className="w-full border-collapse font-sans text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children: ReactNode }) => (
    <thead className="border-b border-rule-light">{children}</thead>
  ),
  tbody: ({ children }: { children: ReactNode }) => (
    <tbody className="divide-y divide-rule-light/60">{children}</tbody>
  ),
  tr: ({ children }: { children: ReactNode }) => (
    <tr className="transition-colors">{children}</tr>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="whitespace-nowrap px-3 py-3 text-left text-[13px] font-medium uppercase tracking-[0.08em] text-taupe first:pl-0 last:pr-0">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="px-3 py-3 text-dark-chocolate/80 first:pl-0 last:pr-0">
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
