import { useId } from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 32, className }: LogoProps) {
  const id = useId();
  const maskId = `logo-m-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <mask id={maskId}>
          <rect width="32" height="32" fill="white" />
          <circle cx="16" cy="16" r="3" fill="black" />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        <circle cx="16" cy="11.5" r="8" fill="currentColor" fillOpacity="0.28" />
        <circle cx="19.9" cy="18.25" r="8" fill="currentColor" fillOpacity="0.28" />
        <circle cx="12.1" cy="18.25" r="8" fill="currentColor" fillOpacity="0.28" />
      </g>
      <circle cx="16" cy="16" r="1.3" fill="currentColor" />
    </svg>
  );
}
