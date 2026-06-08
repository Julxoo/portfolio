// Set custom minimaliste — 3 SVG dessinés main sur grille 24×24.
// Specs strictes : trait 1px, linecap square, linejoin miter, fill none, currentColor.
// Cohérence avec la DA Pinède sur toile : angles vifs, filets honnêtes, zéro arrondi.
// Tout le reste de l'iconographie du site passe par les caractères Unicode
// (→ ↓ ↗ × + − ·) — voir /design/signes.

type IconProps = {
  size?: number | string;
  className?: string;
  "aria-label"?: string;
};

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

function a11y(label?: string) {
  return label
    ? { role: "img", "aria-label": label }
    : { "aria-hidden": true, focusable: false };
}

export function IconSearch({
  size = "1em",
  className,
  "aria-label": label,
}: IconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      className={className}
      {...a11y(label)}
    >
      <circle cx="10" cy="10" r="5.5" />
      <line x1="14" y1="14" x2="20" y2="20" />
    </svg>
  );
}

export function IconPlay({
  size = "1em",
  className,
  "aria-label": label,
}: IconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      className={className}
      {...a11y(label)}
    >
      <polygon points="7,4 7,20 20,12" />
    </svg>
  );
}

export function IconMenu({
  size = "1em",
  className,
  "aria-label": label,
}: IconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      className={className}
      {...a11y(label)}
    >
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
    </svg>
  );
}
