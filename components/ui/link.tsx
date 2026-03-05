"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/* ── Navigation Link (underline slide-in on hover) ───── */

interface NavLinkProps {
  href: string;
  children: ReactNode;
  current?: boolean;
}

export function NavLink({ href, children, current }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className="group relative font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-dark-chocolate"
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-camel transition-transform duration-300 ${current ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
        style={{ transitionTimingFunction: "var(--ease-hover)" }}
      />
    </Link>
  );
}

/* ── CTA Link (text + arrow) ─────────────────────────── */

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function CtaLink({ href, children, className = "" }: CtaLinkProps) {
  const classes = `group inline-flex items-center gap-3 font-sans text-sm text-camel transition-colors duration-[400ms] hover:text-matte-gold ${className}`.trim();
  const style = {
    transitionTimingFunction: "var(--ease-hover)",
  } as React.CSSProperties;

  const content = (
    <>
      {children}
      <span
        className="inline-block transition-transform duration-[400ms] group-hover:translate-x-1"
        style={{ transitionTimingFunction: "var(--ease-hover)" }}
      >
        &rarr;
      </span>
    </>
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} style={style} data-track="cta">
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} style={style} data-track="cta">
      {content}
    </a>
  );
}
