import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { products, formatPrice, productCategories } from "@/data/products";
import { wallpaperTemplates } from "@/data/wallpapers";
import { WallpaperGenerator } from "@/components/interactive/wallpaper-generator";

export const metadata: Metadata = {
  title: "Boutique | ARV Tataouine",
  description: "Maillots et équipements officiels de l'académie.",
};

export default function BoutiquePage() {
  return (
    <div className="flex flex-col bg-white">
      <section className="pt-16 lg:pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Boutique officielle
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Portez les couleurs de l&apos;académie avec nos maillots,
            équipements et merchandising officiels.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-16">
            {productCategories
              .filter((c) => c.id !== "all")
              .map((cat) => {
                const catProducts = products.filter(
                  (p) => p.category === cat.id,
                );
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
                          href={"/boutique/" + p.slug}
                          className="group flex flex-col"
                        >
                          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/60">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ShoppingBag className="h-16 w-16 text-foreground/15 transition-transform duration-500 group-hover:scale-105" />
                            </div>
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