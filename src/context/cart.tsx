"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { products, type Product, type ProductVariant } from "@/data/products";

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, variantId: string, quantity?: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("arv-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load cart:", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("arv-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (productId: string, variantId: string, quantity = 1) => {
    const product = products.find((p) => p.slug === productId);
    const variant = product?.variants.find((v) => v.id === variantId);
    if (!product || !variant) return;

    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId && item.variantId === variantId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, variantId, quantity, product, variant }];
    });

    setIsOpen(true); // Open cart panel after adding
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setItems((prev) => prev.filter((item) => !(item.productId === productId && item.variantId === variantId)));
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}