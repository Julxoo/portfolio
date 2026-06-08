import NextLink from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type CommonProps = {
  href: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
};

type LinkRest = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "className"
>;

function resolveAnchor(
  href: string,
  external: boolean | undefined,
  className: string,
  children: ReactNode,
  rest: LinkRest,
) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} className={className} {...rest}>
      {children}
    </NextLink>
  );
}

// =====================================================================
// InlineLink — pour la prose d'article et tout contenu long-form.
// Soulignement permanent 1px ink/40 (WCAG 1.4.1 Use of Color), offset 3px.
// Hover : la couleur du soulignement passe à accent-deep.
// =====================================================================
type InlineLinkProps = CommonProps & LinkRest;

export function InlineLink({
  href,
  external,
  children,
  className,
  ...rest
}: InlineLinkProps) {
  const classes = [
    "text-ink underline underline-offset-[3px] decoration-1 decoration-ink/40",
    "hover:decoration-accent-deep transition-[text-decoration-color] duration-quick ease-out-quint",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-deep",
    "motion-reduce:transition-none",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return resolveAnchor(href, external, classes, children, rest);
}

// =====================================================================
// SlideLink — pour la navigation, les cards, les CTA secondaires.
// Pas de soulignement par défaut. Au hover, un filet 1px grandit de gauche
// à droite (background-size trick). Référence motion #5 "hover lien texte".
// =====================================================================
type SlideLinkProps = CommonProps & LinkRest;

export function SlideLink({
  href,
  external,
  children,
  className,
  ...rest
}: SlideLinkProps) {
  // Technique : un linear-gradient posé en background-image, bg-size 0% au repos,
  // 100% au hover. Animation propre, composite-friendly.
  const classes = [
    "relative inline-block text-ink pb-0.5",
    "bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-left-bottom",
    "bg-[length:0%_1px] hover:bg-[length:100%_1px]",
    "transition-[background-size] duration-quick ease-out-quint",
    "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent-deep",
    "motion-reduce:transition-none",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return resolveAnchor(href, external, classes, children, rest);
}
