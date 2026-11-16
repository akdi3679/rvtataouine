import type { Metadata } from "next";
import { cookiePolicy as data } from "@/data/legal";

export const metadata: Metadata = { title: "Politique de cookies | ARV Tataouine" };

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {data.title}
      </h1>
      <p className="mt-2 text-xs text-muted-foreground">
        Dernière mise à jour : {data.lastUpdated}
      </p>
      <div className="mt-10 space-y-8">
        {data.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-lg font-bold text-foreground">{s.heading}</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {s.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}