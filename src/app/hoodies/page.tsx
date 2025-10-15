'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { EmailPopup } from '@/components/EmailPopup';
import { GalaxyEffects } from '@/components/GalaxyEffects';
import { ProductZoom } from '@/components/ProductZoom';
import { SearchModal } from '@/components/SearchModal';
import { WishlistButton } from '@/components/WishlistButton';
import { SizeGuide } from '@/components/SizeGuide';
import { MobileShopTab } from '@/components/MobileShopTab';
import { useCart } from '@/components/CartContext';
import { getProductBySlug } from '@/lib/products';

export default function HoodiesPage() {
  const { addItem, state } = useCart();
  const [showDiscountWheel, setShowDiscountWheel] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [showBack, setShowBack] = useState(false);
  const [isAutoSwapping, setIsAutoSwapping] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  // Hoodie data
  const hoodieData = {
    id: "art-in-motion-hoodie",
    name: "ART IN MOTION Hoodie", 
    price: 35, 
    frontImage: "/products/art-in-motion-hoodie.jpg", 
    backImage: "/products/graffiti-rebel-hoodie.jpg",
    description: "Distressed black hoodie with vintage wash featuring 'ART IN MOTION' graphic on the front and vibrant graffiti-style emoji design on the back. Features paint splatter details and oversized fit for the creative rebel.",
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black']
  };

  const sizes = hoodieData.sizes;
  const colors = hoodieData.colors;
  
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Auto-swap images every 3 seconds (5 seconds on mobile)
  useEffect(() => {
    if (!isAutoSwapping) return;
    
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const interval = setInterval(() => {
      setShowBack(prev => !prev);
    }, isMobile ? 5000 : 3000);

    return () => clearInterval(interval);
  }, [isAutoSwapping]);


  const handleAddToCart = () => {
    addItem({
      id: hoodieData.id,
      name: hoodieData.name,
      price: hoodieData.price,
      size: selectedSize,
      image: hoodieData.frontImage,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 relative pb-20 md:pb-0">
      {/* Text readability overlay */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
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
                <Link href="/hoodies" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
                  Hoodies
                </Link>
                <Link href="/tees" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
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
                className="hidden md:block text-gray-300 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link href="/cart" className="hidden md:block relative text-gray-300 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setShowDiscountWheel(true)}
                className="hidden md:block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-wider mb-4 text-white drop-shadow-2xl">HOODIES</h1>
          <p className="text-gray-200 text-lg drop-shadow-lg">Essential pieces for creators and misfits. Made by artists for artists who aren&apos;t afraid to dream.</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
          >
            <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-700/95 transition-colors">
              <div className="aspect-[4/5] relative">
                <ProductZoom
                  src={showBack ? hoodieData.backImage : hoodieData.frontImage}
                  alt={showBack ? `${hoodieData.name} - Back` : `${hoodieData.name} - Front`}
                  className="w-full h-full"
                />
                
                {/* Auto-swap Toggle */}
                <div className="absolute top-4 left-4">
                  <button
                    onClick={() => setIsAutoSwapping(!isAutoSwapping)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      isAutoSwapping 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-600 text-white hover:bg-gray-500'
                    }`}
                  >
                    {isAutoSwapping ? 'Auto ON' : 'Auto OFF'}
                  </button>
                </div>
                
                {/* Front/Back Toggle Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => {
                      setShowBack(false);
                      setIsAutoSwapping(false);
                    }}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      !showBack 
                        ? 'bg-white text-black' 
                        : 'bg-black/50 text-white hover:bg-black/70'
                    }`}
                  >
                    Front
                  </button>
                  <button
                    onClick={() => {
                      setShowBack(true);
                      setIsAutoSwapping(false);
                    }}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      showBack 
                        ? 'bg-white text-black' 
                        : 'bg-black/50 text-white hover:bg-black/70'
                    }`}
                  >
                    Back
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-xl text-white drop-shadow-lg">{hoodieData.name}</h3>
                  <WishlistButton productId={hoodieData.id} productName={hoodieData.name} />
                </div>
                <p className="text-gray-200 mb-3 text-sm leading-relaxed drop-shadow-lg">{hoodieData.description}</p>
                <p className="text-white text-2xl font-bold mb-3">${hoodieData.price}</p>
                
                {/* Size Selection */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white drop-shadow-lg">Size</h4>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="text-xs text-gray-200 hover:text-white underline drop-shadow-lg"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-1 px-2 rounded text-xs border transition-colors ${
                          selectedSize === size
                            ? 'bg-white text-black border-white'
                            : 'bg-gray-700 text-white border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className={`w-full py-2 font-bold tracking-wider transition-colors text-sm ${
                    addedToCart 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {addedToCart ? '✓ ADDED TO CART!' : `ADD TO CART - ${selectedSize}`}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />

      {/* Size Guide Modal */}
      <SizeGuide isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />


      {/* Discount Wheel Popup */}
      {showDiscountWheel && (
        <EmailPopup onClose={() => setShowDiscountWheel(false)} />
      )}

      {/* Mobile Shop Tab */}
      <MobileShopTab 
        cartItemCount={getTotalItems()}
        onSearchClick={() => setShowSearch(true)}
        onDiscountClick={() => setShowDiscountWheel(true)}
      />
    </div>
  );
}
