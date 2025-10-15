export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  priceCents: number;
  image: string; // public path or remote URL
  colors?: string[];
  sizes?: string[];
};

export type CartItem = {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
};

export type CartState = {
  items: CartItem[];
};

export type CartContextValue = {
  state: CartState;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number, options?: { color?: string; size?: string }) => void;
  removeItem: (productId: string, options?: { color?: string; size?: string }) => void;
  clear: () => void;
  getSubtotalCents: () => number;
};

export function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(priceCents / 100);
}











