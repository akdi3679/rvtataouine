"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart";

export function CartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
      aria-label={`Panier (${totalItems} articles)`}
    >
      <ShoppingBag className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}