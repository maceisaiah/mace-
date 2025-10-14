import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }} 
      whileTap={{ scale: 0.98 }}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-sm transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-[1.05] transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"/>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
          
          {/* Hover overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"/>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white/95 font-semibold text-lg group-hover:text-white transition-colors duration-300">
              {product.name}
            </h3>
            <span className="text-white/90 text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {formatPrice(product.priceCents)}
            </span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/85 transition-colors duration-300">
            {product.shortDescription}
          </p>
          
          {/* Subtle accent line */}
          <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
        </div>
      </Link>
    </motion.div>
  );
}


