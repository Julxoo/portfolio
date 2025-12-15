import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hors ligne | Jules Toussenel",
  description: "Vous êtes actuellement hors ligne.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6" role="img" aria-label="Offline icon">
          📡
        </div>
        <h1 className="text-2xl sm:text-3xl mb-4">Hors ligne</h1>
        <p className="text-muted-foreground text-sm sm:text-base mb-6">
          Vous êtes actuellement hors ligne. Vérifiez votre connexion internet
          et réessayez.
        </p>
        <p className="text-muted-foreground text-xs">
          You are currently offline. Check your internet connection and try
          again.
        </p>
      </div>
    </div>
  );
}
