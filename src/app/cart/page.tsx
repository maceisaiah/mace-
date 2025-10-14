"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { state, updateQuantity, removeItem, clear, getSubtotalCents } = useCart();
  const items = state.items.map((i) => ({
    ...i,
    product: products.find((p) => p.id === i.productId)!,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-white/60">Cart is empty. <Link href="/products" className="underline">Shop products</Link>.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((i, idx) => (
              <div key={idx} className="flex items-center justify-between border border-white/10 rounded-md p-4">
                <div>
                  <div className="font-medium">{i.product.name}</div>
                  <div className="text-sm text-white/60">
                    {i.selectedColor && <span>{i.selectedColor}</span>} {i.selectedSize && <span className="ml-2">{i.selectedSize}</span>}
                  </div>
                  <div className="text-sm text-white/70">{formatPrice(i.product.priceCents)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={i.quantity}
                    onChange={(e) => updateQuantity(i.productId, Math.max(1, Number(e.target.value) || 1), { color: i.selectedColor, size: i.selectedSize })}
                    className="w-20 rounded-md bg-transparent border border-white/10 px-3 py-2"
                  />
                  <button
                    className="text-sm text-white/60 hover:text-white"
                    onClick={() => removeItem(i.productId, { color: i.selectedColor, size: i.selectedSize })}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-white/10 rounded-md p-4 h-max">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Subtotal</span>
              <span>{formatPrice(getSubtotalCents())}</span>
            </div>
            <Button className="w-full mt-4">Checkout</Button>
            <button className="w-full text-sm text-white/60 hover:text-white mt-3" onClick={clear}>Clear cart</button>
          </div>
        </div>
      )}
    </div>
  );
}


