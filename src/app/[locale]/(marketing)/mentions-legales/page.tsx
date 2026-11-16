import type { Metadata } from "next";
import { mentionsLegales as data } from "@/data/legal";

export const metadata: Metadata = { title: "Mentions légales | ARV Tataouine" };

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {data.title}
      </h1>
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