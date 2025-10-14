import { products } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}


