import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import Image from "next/image";
export function FeaturedProductsSection({ team }: { team?: string } = {}) {
  const allFeatured = products.filter((p) => p.featured);
  const filtered = team ? allFeatured.filter((p) => p.team === team) : allFeatured;
  const featured = filtered.slice(0, 3);

  if (!featured.length) {
    if (!team) return null;
    return (
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/30" />
            <p className="mt-4 text-base font-semibold text-foreground">
              La boutique arrive bientôt
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Les produits officiels de cette équipe seront disponibles prochainement.
            </p>
            <Link
              href="/boutique"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:underline"
            >
              Voir toute la boutique
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Portez les couleurs du club
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Maillots, équipements et produits officiels
            </p>
          </div>
          <Link
            href={team ? `/boutique?team=${team}` : "/boutique"}
            className="group hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-60 sm:inline-flex"
          >
            Voir la boutique
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile: horizontal scroll · sm+: grid */}
        <div className="-mx-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 sm:mx-0 sm:overflow-visible sm:px-0 sm:snap-none">
          <div className="flex gap-4 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {featured.map((product) => (
              <Link
                key={product.slug}
                href={`/boutique/${product.slug}`}
                className="group flex w-[240px] flex-shrink-0 snap-center flex-col sm:w-auto sm:flex-shrink"
              >
                {/* Image area */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/60">
  {product.images[0] ? (
    <Image
      src={product.images[0]}
      alt={product.name}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center">
      <ShoppingBag className="h-16 w-16 text-foreground/15" />
    </div>
  )}

  {product.isNew && (
    <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
      Nouveau
    </span>
  )}
</div>

                {/* Info */}
                <div className="mt-3 flex items-start justify-between gap-3 px-1">
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {product.categoryLabel}
                    </p>
                    <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-foreground transition-opacity group-hover:opacity-60">
                      {product.name}
                    </h3>
                  </div>
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile-only bottom button */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href={team ? `/boutique?team=${team}` : "/boutique"}
            className="inline-flex items-center gap-2 rounded-md border border-foreground/20 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Voir la boutique
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
} 