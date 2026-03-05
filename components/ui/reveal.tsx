"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "wipe";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the animation starts */
  delay?: number;
  /** Direction the element reveals from. Default: "up" */
  direction?: RevealDirection;
  /** HTML element to render. Default: "div" */
  as?: ElementType;
}

const TRANSFORMS: Record<Exclude<RevealDirection, "wipe">, string> = {
  up: "translateY(20px)",
  down: "translateY(-20px)",
  left: "translateX(-30px)",
  right: "translateX(30px)",
  scale: "scale(0.95)",
};

function getStyles(
  visible: boolean,
  direction: RevealDirection,
  delay: number
): React.CSSProperties {
  if (direction === "wipe") {
    return {
      clipPath: visible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
      transition: `clip-path 1000ms var(--ease-luxury) ${delay}ms`,
    };
  }

  const hiddenTransform = TRANSFORMS[direction];
  const visibleTransform = direction === "scale" ? "scale(1)" : "translate(0)";

  return {
    opacity: visible ? 1 : 0,
    transform: visible ? visibleTransform : hiddenTransform,
    transition: `opacity 800ms var(--ease-enter) ${delay}ms, transform 800ms var(--ease-enter) ${delay}ms`,
  };
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={getStyles(visible, direction, delay)}
    >
      {children}
    </Tag>
  );
}
