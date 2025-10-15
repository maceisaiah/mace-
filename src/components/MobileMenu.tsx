'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';

interface MobileMenuProps {
  cartItemCount: number;
  onSearchClick: () => void;
  onDiscountClick: () => void;
}

export function MobileMenu({ cartItemCount, onSearchClick, onDiscountClick }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/hoodies', label: 'Hoodies' },
    { href: '/tees', label: 'T-Shirts' },
    { href: '/accessories', label: 'Accessories' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/90"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-gray-900 border-l-2 border-red-500 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b-2 border-red-500 bg-gray-800">
                <Link href="/" className="text-xl font-bold tracking-wider text-white">
                  KRYPTIC STUDIOS
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-300 hover:text-white transition-colors bg-gray-700 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Menu Items */}
              <div className="p-6 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 px-4 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t-2 border-red-500 bg-gray-800 space-y-4">
                <button
                  onClick={() => {
                    onSearchClick();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600"
                >
                  <Search size={20} />
                  <span className="font-medium">Search</span>
                </button>

                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors relative border border-gray-600"
                >
                  <ShoppingBag size={20} />
                  <span className="font-medium">Cart</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => {
                    onDiscountClick();
                    setIsOpen(false);
                  }}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold tracking-wider rounded-lg transition-colors border-2 border-red-500"
                >
                  🎯 SPIN TO WIN
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
