"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="fr">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
          <h2 className="text-3xl font-bold text-destructive">Erreur système</h2>
          <p className="mt-2 text-muted-foreground">
            Une erreur critique est survenue. Veuillez rafraîchir la page.
          </p>
          <button
            onClick={() => reset()}
            className="mt-6 rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Rafraîchir la page
          </button>
        </div>
      </body>
    </html>
  );
}