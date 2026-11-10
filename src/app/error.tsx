"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service (e.g., Sentry)
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
      <h2 className="text-2xl font-bold text-destructive">Une erreur est survenue</h2>
      <p className="mt-2 text-muted-foreground">
        Nous n'avons pas pu charger cette page. Veuillez réessayer ou contacter le support si le problème persiste.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Réessayer
      </button>
    </div>
  );
}