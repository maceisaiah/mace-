'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
// import { useCart } from '@/contexts/CartContext';
import { GalaxyEffects } from '@/components/GalaxyEffects';
import { MobileShopTab } from '@/components/MobileShopTab';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const items = JSON.parse(localStorage.getItem('kryptic-cart') || '[]');
      setCartItems(items);
    }
  }, []);

  const removeFromCart = (id: string) => {
    if (typeof window !== 'undefined') {
      const items = JSON.parse(localStorage.getItem('kryptic-cart') || '[]');
      const newItems = items.filter((item: CartItem) => item.id !== id);
      localStorage.setItem('kryptic-cart', JSON.stringify(newItems));
      setCartItems(newItems);
      console.log('Removed item:', id, 'Remaining items:', newItems); // Debug log
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (typeof window !== 'undefined') {
      const items = JSON.parse(localStorage.getItem('kryptic-cart') || '[]');
      console.log('Updating quantity for:', id, 'to:', quantity, 'Current items:', items); // Debug log
      const newItems = items.map((item: CartItem) => 
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter((item: CartItem) => item.quantity > 0);
      localStorage.setItem('kryptic-cart', JSON.stringify(newItems));
      setCartItems(newItems);
      console.log('Updated items:', newItems); // Debug log
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kryptic-cart', '[]');
      setCartItems([]);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 relative">
        <GalaxyEffects />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-wider mb-8">YOUR CART</h1>
            <div className="bg-gray-800 rounded-lg p-12 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-400 mb-8">Add some items to get started!</p>
              <Link
                href="/hoodies"
                className="inline-block bg-white text-black px-8 py-4 font-bold tracking-wider hover:bg-gray-100 transition-colors"
              >
                SHOP HOODIES
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 relative pb-20 md:pb-0">
      <GalaxyEffects />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold tracking-wider">
                KRYPTIC STUDIOS
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/hoodies" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  Hoodies
                </Link>
                <Link href="/tees" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  T-Shirts
                </Link>
                <Link href="/accessories" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  Accessories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-wider mb-4">YOUR CART</h1>
          <p className="text-gray-400 text-lg">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </motion.div>

        <div className="space-y-6">
          {cartItems.map((item) => (
            <motion.div
              key={`${item.id}-${item.size}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-full sm:w-24 h-48 sm:h-24 relative flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-400 mb-2">Size: {item.size}</p>
                  <p className="text-2xl font-bold">${item.price}</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(`${item.id}-${item.size}`, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(`${item.id}-${item.size}`, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(`${item.id}-${item.size}`)}
                    className="text-red-400 hover:text-red-300 px-4 py-2 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-gray-800 rounded-lg p-8 border border-gray-700"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Total: ${getTotalPrice()}</h2>
            <button
              onClick={clearCart}
              className="text-gray-400 hover:text-white px-4 py-2"
            >
              Clear Cart
            </button>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/checkout"
              className="block w-full bg-white text-black py-4 font-bold tracking-wider hover:bg-gray-100 transition-colors text-lg text-center rounded-lg"
            >
              PROCEED TO CHECKOUT
            </Link>
            <Link
              href="/hoodies"
              className="block w-full border-2 border-white text-white py-4 font-bold tracking-wider hover:bg-white hover:text-black transition-colors text-lg text-center"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Mobile Shop Tab */}
      <MobileShopTab 
        cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onSearchClick={() => {}}
        onDiscountClick={() => {}}
      />
    </div>
  );
}