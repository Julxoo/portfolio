import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "Référentiel visuel interne : palette, typographie, composants, animations.",
  alternates: { canonical: "/design-system" },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
