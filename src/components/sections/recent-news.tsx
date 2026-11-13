import Link from "next/link";
import { FileText, Clock, ArrowRight } from "lucide-react";
import { articles } from "@/data/news";
import { formatDate, getCategoryColor } from "@/lib/utils";

export function RecentNewsSection() {
  const recent = articles.slice(0, 3);

  return (
    <section className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <FileText className="h-4 w-4" />
              Actualités
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Les dernières nouvelles
            </h2>
          </div>
          <Link href="/valladolid/actualites" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
            Toutes les actualités <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {recent.map((article) => (
            <Link
              key={article.slug}
              href={`/valladolid/actualites/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="flex h-full items-center justify-center">
                  <FileText className="h-12 w-12 text-primary/40 transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(article.category)}`}>
                  {article.categoryLabel}
                </div>
                <h3 className="mt-3 font-bold text-foreground transition-colors group-hover:text-primary line-clamp-2">
                  {article.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                      {article.author.initials}
                    </div>
                    <span className="font-medium text-foreground">{article.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime} min</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/valladolid/actualites" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Toutes les actualités <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}