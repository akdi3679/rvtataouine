import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import {
  products,
  formatPrice,
  productCategories,
  type Product,
} from "@/data/products";
import { wallpaperTemplates } from "@/data/wallpapers";
import { WallpaperGenerator } from "@/components/interactive/wallpaper-generator";
import { TeamFilter } from "@/components/global/team-filter";
import type { TeamId } from "@/data/team-theme";

export const metadata: Metadata = {
  title: "Boutique | ARV Tataouine",
  description: "Maillots et équipements officiels de l'académie.",
};

type SearchParams = Promise<{ team?: string }>;

function parseTeam(value: string | undefined): TeamId | "all" {
  if (value === "valladolid" || value === "ennour" || value === "avenir") return value;
  return "all";
}

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const team = parseTeam(params.team);

  const filtered: Product[] =
    team === "all" ? products : products.filter((p) => p.team === team);

  return (
    <div className="flex flex-col bg-white">
      <section className="pt-10 lg:pt-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Boutique officielle
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Portez les couleurs de l&apos;académie avec nos maillots,
            équipements et merchandising officiels.
          </p>
          <div className="mt-6">
            <TeamFilter currentTeam={team} />
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/30" />
              <p className="mt-4 text-base font-semibold text-foreground">
                Aucun produit pour cette équipe
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Les produits de cette entité seront bientôt disponibles.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {productCategories
                .filter((c) => c.id !== "all")
                .map((cat) => {
                  const catProducts = filtered.filter((p) => p.category === cat.id);
                  if (!catProducts.length) return null;
                  return (
                    <div key={cat.id}>
                      <h2 className="mb-6 text-2xl font-black text-foreground sm:text-3xl">
                        {cat.label}
                      </h2>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {catProducts.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/boutique/${p.slug}${team !== "all" ? `?team=${team}` : ""}`}
                            className="group flex flex-col"
                          >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/60">
                              {p.images[0] ? (
                                <Image
                                  src={p.images[0]}
                                  alt={p.name}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <ShoppingBag className="h-16 w-16 text-foreground/15" />
                                </div>
                              )}
                              {p.isNew && (
                                <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                                  Nouveau
                                </span>
                              )}
                            </div>
                            <div className="mt-3 flex items-start justify-between gap-3 px-1">
                              <div className="min-w-0">
                                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                                  {p.categoryLabel}
                                </p>
                                <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-foreground transition-opacity group-hover:opacity-60">
                                  {p.name}
                                </h3>
                              </div>
                              <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                                {formatPrice(p.price)}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-secondary/30 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-black text-foreground sm:text-3xl">
              Générateur de wallpapers
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Personnalisez un wallpaper aux couleurs de l&apos;académie.
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-lg">
              {wallpaperTemplates.map((t) => (
                <WallpaperGenerator key={t.id} template={t} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}