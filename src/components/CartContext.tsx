"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { CartContextValue, CartItem, CartState } from "@/lib/types";
import { products } from "@/lib/products";

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] });

  const addItem = useCallback((item: CartItem) => {
    setState((prev) => {
      const existingIndex = prev.items.findIndex((i) =>
        i.productId === item.productId && i.selectedColor === item.selectedColor && i.selectedSize === item.selectedSize
      );
      if (existingIndex !== -1) {
        const updated = [...prev.items];
        updated[existingIndex] = { ...updated[existingIndex], quantity: updated[existingIndex].quantity + item.quantity };
        return { items: updated };
      }
      return { items: [...prev.items, item] };
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, options?: { color?: string; size?: string }) => {
    setState((prev) => {
      const updated = prev.items
        .map((i) => {
          const match = i.productId === productId && i.selectedColor === options?.color && i.selectedSize === options?.size;
          return match ? { ...i, quantity } : i;
        })
        .filter((i) => i.quantity > 0);
      return { items: updated };
    });
  }, []);

  const removeItem = useCallback((productId: string, options?: { color?: string; size?: string }) => {
    setState((prev) => ({
      items: prev.items.filter(
        (i) => !(i.productId === productId && i.selectedColor === options?.color && i.selectedSize === options?.size)
      ),
    }));
  }, []);

  const clear = useCallback(() => setState({ items: [] }), []);

  const getSubtotalCents = useCallback(() => {
    return state.items.reduce((sum, i) => {
      const product = products.find((p) => p.id === i.productId);
      if (!product) return sum;
      return sum + product.priceCents * i.quantity;
    }, 0);
  }, [state.items]);

  const value = useMemo<CartContextValue>(
    () => ({ state, addItem, updateQuantity, removeItem, clear, getSubtotalCents }),
    [state, addItem, updateQuantity, removeItem, clear, getSubtotalCents]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}






