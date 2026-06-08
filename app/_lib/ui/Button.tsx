import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary";
type Size = "default" | "sm";

type SharedProps = {
  variant?: Variant;
  size?: Size;
  /** Affiche une flèche → à droite du texte. Réservé au primary "progresser". */
  trailingArrow?: boolean;
  children: ReactNode;
  className?: string;
};

// --- Classes partagées ---
// Les états reposent sur le motion token `duration-quick` (180ms) + ease-out-quint,
// l'outline focus sur accent-deep (décisions déjà actées dans /design/mouvements).
const base =
  "group/btn inline-flex items-center gap-2 font-sans font-medium leading-none " +
  "transition-colors duration-quick ease-out-quint " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent-deep " +
  "disabled:opacity-40 disabled:pointer-events-none " +
  "aria-disabled:opacity-40 aria-disabled:pointer-events-none " +
  "motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-bg hover:bg-accent-deep hover:-translate-y-[1px] " +
    "transition-[background-color,transform] duration-quick ease-out-quint",
  secondary:
    "bg-bg text-ink border border-rule-strong hover:border-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  default: "px-5 py-3 text-[15px]",
  sm: "px-3.5 py-2 text-[13px]",
};

function cls(variant: Variant, size: Size, extra?: string) {
  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(" ");
}

function Arrow() {
  // Flèche Instrument Serif italique — glisse de 2px à droite au hover.
  return (
    <span
      aria-hidden
      className="font-display italic transition-transform duration-quick ease-out-quint group-hover/btn:translate-x-0.5"
    >
      →
    </span>
  );
}

// =====================================================================
// Button — bouton d'action (submit, click). Ne navigue pas.
// =====================================================================
type ButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

export function Button({
  variant = "primary",
  size = "default",
  trailingArrow = false,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cls(variant, size, className)} {...rest}>
      {children}
      {trailingArrow && <Arrow />}
    </button>
  );
}

// =====================================================================
// ButtonLink — même apparence que Button mais navigue. Utilise next/link.
// Si `external` est true, on passe par <a> natif avec target+rel sécurisés.
// =====================================================================
type ButtonLinkProps = SharedProps & {
  href: string;
  external?: boolean;
} & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "children" | "className"
  >;

export function ButtonLink({
  variant = "primary",
  size = "default",
  trailingArrow = false,
  href,
  external,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cls(variant, size, className);
  const content = (
    <>
      {children}
      {trailingArrow && <Arrow />}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
