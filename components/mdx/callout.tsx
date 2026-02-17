import type { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "tip";
  children: ReactNode;
}

const styles: Record<string, string> = {
  info: "border-camel/30 bg-camel/5",
  warning: "border-muted-burgundy/30 bg-muted-burgundy/5",
  tip: "border-hunter-green/30 bg-hunter-green/5",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <aside
      className={`my-8 border-l-2 py-3 pl-5 pr-4 font-sans text-sm leading-[1.7] text-dark-chocolate/80 ${styles[type]}`}
    >
      {children}
    </aside>
  );
}
