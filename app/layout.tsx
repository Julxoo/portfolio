import type { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

// Root layout minimal - le vrai layout localisé est dans app/[locale]/layout.tsx
export default function RootLayout({ children }: Props) {
  return children;
}
