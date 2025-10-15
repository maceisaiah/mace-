'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { formatPrice } from '@/lib/types';
import { useCart } from '@/components/CartContext';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('kryptic-wishlist') || '[]');
      setWishlistItems(wishlist);
    }
  }, []);

  const removeFromWishlist = (productId: string) => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('kryptic-wishlist') || '[]');
      const newWishlist = wishlist.filter((id: string) => id !== productId);
      localStorage.setItem('kryptic-wishlist', JSON.stringify(newWishlist));
      setWishlistItems(newWishlist);
    }
  };

  const addToCartFromWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.priceCents / 100,
        size: product.sizes?.[0] || 'M',
        image: product.image,
      });
    }
  };

  const wishlistProducts = products.filter(product => wishlistItems.includes(product.id));

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl mb-6"
            >
              ❤️
            </motion.div>
            <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-400 mb-8">Start adding items you love to your wishlist!</p>
            <Link
              href="/products"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Your Wishlist</h1>
          <p className="text-gray-400">{wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-red-500/50 transition-colors"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWishlist(product.id);
                      }}
                      className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </Link>
              
              <div className="p-6">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-red-400 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-400 text-sm mb-4">{product.shortDescription}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-red-500">
                    {formatPrice(product.priceCents)}
                  </span>
                  <div className="flex gap-2">
                    {product.colors.slice(0, 2).map((color, idx) => (
                      <span key={idx} className="text-xs bg-gray-700 px-2 py-1 rounded">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => addToCartFromWishlist(product.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="px-4 py-2 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {wishlistProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link
              href="/products"
              className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
