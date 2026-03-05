"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before animation starts, in ms */
  delay?: number;
  /** Animation duration in ms. Default: 800 */
  duration?: number;
}

export function TextReveal({
  children,
  className,
  delay = 0,
  duration = 800,
}: TextRevealProps) {
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
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <div
        style={{
          clipPath: visible ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: `clip-path ${duration}ms var(--ease-enter) ${delay}ms, transform ${duration}ms var(--ease-enter) ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
