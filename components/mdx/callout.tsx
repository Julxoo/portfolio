import type { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "tip";
  children: ReactNode;
}

const styles: Record<string, string> = {
  info: "border-ochre bg-ochre/5",
  warning: "border-clay bg-clay/5",
  tip: "border-moss bg-moss/5",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <aside
      className={`my-10 border-l-2 py-4 pl-6 pr-5 font-sans text-sm leading-[1.8] text-ink/80 ${styles[type]}`}
    >
      {children}
    </aside>
  );
}
