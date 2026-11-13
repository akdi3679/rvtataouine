import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  FileText,
  Quote,
} from "lucide-react";
import { getArticleBySlug, getRelatedArticles } from "@/data/news";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
const CATEGORY: Record<
  string,
  { gradient: string; badge: string; bullet: string }
> = {
  match: {
    gradient: "from-accent via-accent/85 to-accent-dark",
    badge: "bg-accent text-white",
    bullet: "bg-accent",
  },
  stage: {
    gradient: "from-primary via-primary/85 to-primary-dark",
    badge: "bg-primary text-white",
    bullet: "bg-primary",
  },
  academie: {
    gradient: "from-info via-info/85 to-primary/70",
    badge: "bg-info text-white",
    bullet: "bg-info",
  },
  alumni: {
    gradient: "from-warning via-warning/85 to-accent/70",
    badge: "bg-warning text-white",
    bullet: "bg-warning",
  },
  conseil: {
    gradient: "from-success via-success/85 to-primary/70",
    badge: "bg-success text-white",
    bullet: "bg-success",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return {
    title: article ? `${article.title} | ARV Tataouine` : "Article",
    description: article?.excerpt,
    openGraph: article
      ? {
          title: article.title,
          description: article.excerpt,
          type: "article",
          publishedTime: article.publishedAt,
        }
      : undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);
  const c = CATEGORY[article.category] ?? CATEGORY.match;

  return (
    <article className="bg-white">
      {/* Header — narrow column */}
      <header className="mx-auto max-w-3xl px-6 pt-10 pb-8 lg:pt-16">
        <Link
          href="/valladolid/actualites"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux actualités
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${c.badge}`}
          >
            {article.categoryLabel}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDate(article.publishedAt)}
          </span>
          <span className="text-xs text-muted-foreground/40">·</span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {article.readTime} min de lecture
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-black leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
          {article.title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {article.excerpt}
        </p>

        <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-sm font-bold text-foreground">
            {article.author.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {article.author.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {article.author.role}
            </p>
          </div>
        </div>
      </header>

      {/* Hero cover — wider than the text */}
      <div className="mx-auto max-w-5xl px-6">
  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
    <Image
      src={article.image}
      alt={article.title}
      fill
      sizes="(max-width: 1024px) 100vw, 1024px"
      className="object-cover"
      priority
    />
  </div>
</div>

      {/* Body — narrow column, editorial typography */}
      <div className="mx-auto max-w-3xl px-6 py-10 lg:py-14">
        <div className="space-y-6">
          {article.content.map((block, i) => {
            if (block.type === "paragraph")
              return (
                <p
                  key={i}
                  className="text-[17px] leading-[1.75] text-foreground"
                >
                  {block.text}
                </p>
              );

            if (block.type === "heading")
              return (
                <h2
                  key={i}
                  className="pt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  {block.text}
                </h2>
              );

            if (block.type === "quote")
              return (
                <blockquote
                  key={i}
                  className="my-8 border-l-4 border-accent pl-6"
                >
                  <Quote className="h-6 w-6 text-accent/30" />
                  <p className="mt-2 text-lg font-medium italic leading-relaxed text-foreground sm:text-xl">
                    {block.text}
                  </p>
                </blockquote>
              );

            if (block.type === "list")
              return (
                <div key={i}>
                  <p className="mb-3 text-base font-semibold text-foreground">
                    {block.text}
                  </p>
                  <ul className="space-y-2.5">
                    {block.items?.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-base leading-relaxed text-foreground"
                      >
                        <span
                          className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${c.bullet}`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );

            return null;
          })}
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author card */}
        <div className="mt-10 rounded-2xl border border-border bg-secondary/30 p-6">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            À propos de l&apos;auteur
          </p>
          <div className="mt-4 flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-foreground text-base font-bold text-background">
              {article.author.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-foreground">
                {article.author.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {article.author.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="border-t border-border bg-secondary/20">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="text-2xl font-black text-foreground">
                À lire aussi
              </h2>
              <Link
                href="/valladolid/actualites"
                className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-accent sm:inline-flex"
              >
                Tous les articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const rc = CATEGORY[r.category] ?? CATEGORY.match;
                return (
                  <Link
                    key={r.slug}
                    href={`/valladolid/actualites/${r.slug}`}
                    className="group flex flex-col"
                  >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
  <Image
    src={r.image}
    alt={r.title}
    fill
    sizes="(max-width: 640px) 100vw, 33vw"
    className="object-cover transition-transform duration-500 group-hover:scale-105"
  />
  <span className={`absolute left-3 top-3 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${rc.badge}`}>
    {r.categoryLabel}
  </span>
</div>
                    <div className="mt-3">
                      <h3 className="line-clamp-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                        {r.title}
                      </h3>
                      <p className="mt-2 text-[11px] text-muted-foreground">
                        {formatDate(r.publishedAt)} · {r.readTime} min
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}