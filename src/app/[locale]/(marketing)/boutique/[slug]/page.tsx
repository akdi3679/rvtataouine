import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { getProductBySlug, formatPrice } from "@/data/products";
import { AddToCartButton } from "@/components/interactive/add-to-cart-button";
import Image from "next/image";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product ? product.name + " | Boutique ARV" : "Produit",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const firstVariant = product.variants[0];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8 lg:py-16">
        <Link
          href="/boutique"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à la boutique
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
         <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary/60">
  {product.images[0] ? (
    <Image
      src={product.images[0]}
      alt={product.name}
      fill
      sizes="(max-width: 1024px) 100vw, 50vw"
      className="object-cover"
      priority
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center">
      <ShoppingBag className="h-24 w-24 text-foreground/15" />
    </div>
  )}
  {product.isNew && (
    <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
      Nouveau
    </span>
  )}
</div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {product.categoryLabel}
            </p>
            <h1 className="mt-2 text-3xl font-black text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <p className="mt-6 text-3xl font-black tabular-nums text-foreground">
              {formatPrice(product.price)}
            </p>

            {product.variants.length > 1 && (
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Variantes disponibles
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <span
                      key={v.id}
                      className="rounded-md border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground"
                    >
                      {v.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <AddToCartButton
                productId={product.slug}
                variantId={firstVariant.id}
                className="w-full"
              />
            </div>

            <div className="mt-8 space-y-3 border-t border-border pt-6">
              <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-foreground" />
                Livraison partout en Tunisie
              </p>
              <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-foreground" />
                Produit officiel de l&apos;académie
              </p>
              <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <RotateCcw className="h-4 w-4 text-foreground" />
                Retour sous 14 jours
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Détails du produit
              </h2>
              <ul className="mt-4 space-y-2">
                {product.details.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            {product.care && (
              <div>
                <h2 className="text-lg font-bold text-foreground">Entretien</h2>
                <ul className="mt-4 space-y-2">
                  {product.care.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}