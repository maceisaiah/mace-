'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShoppingBag, Search, Gift } from 'lucide-react';

interface MobileShopTabProps {
  cartItemCount: number;
  onSearchClick: () => void;
  onDiscountClick: () => void;
}

export function MobileShopTab({ cartItemCount, onSearchClick, onDiscountClick }: MobileShopTabProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shopItems = [
    { href: '/hoodies', label: 'Hoodies', icon: '🔥' },
    { href: '/tees', label: 'T-Shirts', icon: '👕' },
    { href: '/accessories', label: 'Accessories', icon: '🎒' },
    { href: '/products', label: 'All Products', icon: '📦' },
  ];

  return (
    <div className="md:hidden">
      {/* Mobile Shop Tab */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-black border-t-2 border-red-500">
        <div className="flex items-center justify-around py-3">
          <Link href="/" className="flex flex-col items-center space-y-1 text-gray-300 hover:text-white transition-colors">
            <span className="text-lg">🏠</span>
            <span className="text-xs font-medium">Home</span>
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col items-center space-y-1 text-white hover:text-red-400 transition-colors"
          >
            <span className="text-lg">🛍️</span>
            <span className="text-xs font-medium">Shop</span>
            <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <Link href="/cart" className="flex flex-col items-center space-y-1 text-gray-300 hover:text-white transition-colors relative">
            <ShoppingBag size={20} />
            <span className="text-xs font-medium">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          <button
            onClick={onSearchClick}
            className="flex flex-col items-center space-y-1 text-gray-300 hover:text-white transition-colors"
          >
            <Search size={20} />
            <span className="text-xs font-medium">Search</span>
          </button>
          
          <button
            onClick={onDiscountClick}
            className="flex flex-col items-center space-y-1 text-red-400 hover:text-red-300 transition-colors"
          >
            <Gift size={20} />
            <span className="text-xs font-medium">Spin</span>
          </button>
        </div>
      </div>

      {/* Shop Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-16 left-0 right-0 z-20 bg-gray-900 border-t-2 border-red-500"
          >
            <div className="p-4 space-y-3">
              <h3 className="text-white font-bold text-lg mb-3 text-center">SHOP CATEGORIES</h3>
              <div className="grid grid-cols-2 gap-3">
                {shopItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-white font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
              
              <div className="pt-3 border-t border-gray-700">
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
