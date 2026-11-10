"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, FileText, Newspaper, ArrowUpRight } from "lucide-react";
import { articles, type Article } from "@/data/news";

const FILTERS = [
  { id: "all", label: "Tout" },
  { id: "match", label: "Compétition" },
  { id: "stage", label: "Stage" },
  { id: "academie", label: "Académie" },
  { id: "alumni", label: "Alumni" },
  { id: "conseil", label: "Conseil" },
] as const;

const CATEGORY: Record<
  string,
  { gradient: string; badge: string }
> = {
  match: {
    gradient: "from-accent via-accent/85 to-accent-dark",
    badge: "bg-accent text-white",
  },
  stage: {
    gradient: "from-primary via-primary/85 to-primary-dark",
    badge: "bg-primary text-white",
  },
  academie: {
    gradient: "from-info via-info/85 to-primary/70",
    badge: "bg-info text-white",
  },
  alumni: {
    gradient: "from-warning via-warning/85 to-accent/70",
    badge: "bg-warning text-white",
  },
  conseil: {
    gradient: "from-success via-success/85 to-primary/70",
    badge: "bg-success text-white",
  },
};

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function FeaturedHero({ article }: { article: Article }) {
  const c = CATEGORY[article.category] ?? CATEGORY.match;

  return (
    <Link href={`/actualites/${article.slug}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:aspect-[21/9]">
        {/* Gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${c.gradient} transition-transform duration-700 group-hover:scale-105`}
        />

        {/* Decorative icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <FileText className="h-48 w-48 text-white" />
        </div>

        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
          <div className="max-w-2xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
                {article.categoryLabel}
              </span>
              <span className="text-[11px] font-medium text-white/85">
                {shortDate(article.publishedAt)}
              </span>
              <span className="text-[11px] text-white/40">·</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/85">
                <Clock className="h-3 w-3" />
                {article.readTime} min
              </span>
            </div>

            <h2 className="text-2xl font-black leading-[1.05] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {article.title}
            </h2>

            <p className="mt-3 hidden text-sm leading-relaxed text-white/85 md:line-clamp-2 md:block md:text-base">
              {article.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-[11px] font-bold text-white backdrop-blur">
                {article.author.initials}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  {article.author.name}
                </p>
                <p className="text-[10px] text-white/70">
                  {article.author.role}
                </p>
              </div>
              <span className="ml-auto hidden items-center gap-1 text-xs font-semibold text-white transition-all group-hover:gap-2 md:flex">
                Lire l&apos;article
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const c = CATEGORY[article.category] ?? CATEGORY.match;

  return (
    <Link
      href={`/actualites/${article.slug}`}
      className="group flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${c.gradient} transition-transform duration-500 group-hover:scale-105`}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <FileText className="h-16 w-16 text-white" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <span
          className={`absolute left-3 top-3 inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${c.badge}`}
        >
          {article.categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-base font-bold leading-snug text-foreground line-clamp-2 transition-colors group-hover:text-accent">
          {article.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px]">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-foreground">
              {article.author.initials}
            </div>
            <span className="font-medium text-foreground">
              {article.author.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>{shortDate(article.publishedAt)}</span>
            <span className="text-muted-foreground/40">·</span>
            <Clock className="h-3 w-3" />
            <span>{article.readTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ActualitesView() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? articles
        : articles.filter((a) => a.category === filter),
    [filter],
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const countFor = (id: string) =>
    id === "all"
      ? articles.length
      : articles.filter((a) => a.category === id).length;

  return (
    <div className="bg-white">
      {/* Page header */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                Le journal de l&apos;académie
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Actualités
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Résultats, événements, coulisses et conseils — tout ce qui se
                passe à l&apos;académie, mis à jour chaque semaine.
              </p>
            </div>
            <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground sm:flex">
              <Newspaper className="h-3.5 w-3.5" />
              {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {/* Filters */}
          <div className="-mx-6 mt-8 overflow-x-auto scrollbar-hide px-6 lg:-mx-8 lg:px-8">
            <ul className="flex gap-1.5 whitespace-nowrap">
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <li key={f.id}>
                    <button
                      onClick={() => setFilter(f.id)}
                      className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold transition-colors ${
                        active
                          ? "bg-foreground text-background"
                          : "border border-border bg-white text-foreground hover:border-foreground/30 hover:bg-secondary/50"
                      }`}
                    >
                      {f.label}
                      <span
                        className={`text-[10px] tabular-nums ${
                          active
                            ? "text-background/60"
                            : "text-muted-foreground"
                        }`}
                      >
                        {countFor(f.id)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Newspaper className="mx-auto h-12 w-12 text-muted-foreground/30" />
              <p className="mt-4 text-base font-semibold text-foreground">
                Aucun article
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Aucun article publié dans cette catégorie pour le moment.
              </p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <div className="mb-14">
                  <FeaturedHero article={featured} />
                </div>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <>
                  <div className="mb-8 flex items-center gap-3">
                    <h2 className="text-lg font-black text-foreground">
                      Plus d&apos;articles
                    </h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((a) => (
                      <ArticleCard key={a.slug} article={a} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}