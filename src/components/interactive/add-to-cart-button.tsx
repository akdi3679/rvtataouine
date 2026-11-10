"use client";

import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/cart";
import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
  variantId: string;
  quantity?: number;
  className?: string;
}

export function AddToCartButton({ productId, variantId, quantity = 1, className = "" }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(productId, variantId, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={added}
      className={`flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90 disabled:opacity-60 ${className}`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          Ajouté !
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          Ajouter au panier
        </>
      )}
    </button>
  );
}