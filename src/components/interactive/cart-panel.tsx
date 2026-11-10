"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart";
import { formatPrice } from "@/data/products";

export function CartPanel() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key closes cart
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className="fixed top-0 right-0 z-[90] h-full w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col"
        aria-label="Panier"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Votre Panier</h2>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {totalItems} {totalItems > 1 ? "articles" : "article"}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-lg font-semibold text-foreground">Votre panier est vide</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Découvrez nos produits officiels
              </p>
              <Link
                href="/boutique"
                onClick={closeCart}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
              >
                Voir la boutique
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4"
                >
                  {/* Product image placeholder */}
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                    <ShoppingBag className="h-8 w-8 text-primary/40" />
                  </div>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground line-clamp-1">{item.product.name}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.variant.name}</p>
                    <p className="mt-2 text-sm font-bold text-primary">
                      {formatPrice(item.variant.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-secondary transition-colors"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-secondary transition-colors"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.productId, item.variantId)}
                        className="ml-auto text-xs text-muted-foreground hover:text-destructive transition-colors"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="font-semibold text-foreground">{formatPrice(totalPrice)}</span>
            </div>

            {/* Shipping note */}
            <p className="text-xs text-muted-foreground text-center">
              Livraison calculée au checkout
            </p>

            {/* Checkout button */}
            <Link
              href="/panier"
              onClick={closeCart}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
            >
              Voir le panier
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Continue shopping */}
            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </aside>
    </>
  );
}