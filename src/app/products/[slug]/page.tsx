import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/types";
// import { Button } from "@/components/ui/Button";
import { AddToCart } from "./parts";

type Props = { params: { slug: string } };

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold">{product.name}</h1>
        <p className="text-white/70 mt-2">{product.shortDescription}</p>
        <p className="text-xl mt-4">{formatPrice(product.priceCents)}</p>
        <div className="mt-6 space-y-4">
          <AddToCart productId={product.id} colors={product.colors} sizes={product.sizes} />
        </div>
      </div>
    </div>
  );
}



