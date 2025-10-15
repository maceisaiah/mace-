"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/CartContext";

export function AddToCart({ productId, colors, sizes }: { productId: string; colors?: string[]; sizes?: string[] }) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<string | undefined>(colors?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(sizes?.[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="space-y-4">
      {colors && colors.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/60">Color:</span>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`px-3 py-1 rounded-md border ${selectedColor === c ? "bg-white/10 border-white/20" : "border-white/10 hover:bg-white/5"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {sizes && sizes.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/60">Size:</span>
          <div className="flex gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-3 py-1 rounded-md border ${selectedSize === s ? "bg-white/10 border-white/20" : "border-white/10 hover:bg-white/5"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          className="w-20 rounded-md bg-transparent border border-white/10 px-3 py-2"
        />
        <Button onClick={() => addItem({ productId, quantity: qty, selectedColor, selectedSize })}>Add to Cart</Button>
      </div>
    </div>
  );
}












