'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { EmailPopup } from '@/components/EmailPopup';
import { GalaxyEffects } from '@/components/GalaxyEffects';
import { SearchModal } from '@/components/SearchModal';
// import { useCart } from '@/contexts/CartContext';
// import { MusicPlayer } from '@/components/MusicPlayer';

export default function TeesPage() {
  const [showDiscountWheel, setShowDiscountWheel] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white pt-20 relative">
      {/* Text readability overlay */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
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
                <Link href="/tees" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
                  T-Shirts
                </Link>
                <Link href="/accessories" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  Accessories
                </Link>
                <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowSearch(true)}
                className="text-gray-300 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link href="/cart" className="relative text-gray-300 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
              <button 
                onClick={() => setShowDiscountWheel(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
              >
                🎯 SPIN TO WIN
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-wider mb-4 text-white drop-shadow-2xl">T-SHIRTS</h1>
          <p className="text-gray-200 text-lg drop-shadow-lg">Essential basics for the creative mind. Made by artists for artists who aren&apos;t afraid to dream.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-12 border border-gray-700">
              <h2 className="text-6xl font-bold tracking-wider mb-6 text-white drop-shadow-2xl">COMING SOON</h2>
              <p className="text-gray-200 text-xl mb-8 leading-relaxed drop-shadow-lg">
                We&apos;re crafting something special for the creative community. 
                New t-shirt designs are in the works and will be dropping soon.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-200 drop-shadow-lg">Premium quality materials</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-200 drop-shadow-lg">Limited edition designs</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-200 drop-shadow-lg">Made by artists for artists</span>
                </div>
              </div>
              <div className="mt-8">
                <button 
                  onClick={() => setShowDiscountWheel(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors"
                >
                  🎯 SPIN TO WIN DISCOUNT
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />

      {/* Discount Wheel Popup */}
      {showDiscountWheel && (
        <EmailPopup onClose={() => setShowDiscountWheel(false)} />
      )}
    </div>
  );
}
