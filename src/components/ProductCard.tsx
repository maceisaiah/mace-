import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="group rounded-lg border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-colors overflow-hidden">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white/90 font-medium">{product.name}</h3>
            <span className="text-white/80 text-sm">{formatPrice(product.priceCents)}</span>
          </div>
          <p className="text-white/60 text-sm mt-1">{product.shortDescription}</p>
        </div>
      </Link>
    </motion.div>
  );
}


