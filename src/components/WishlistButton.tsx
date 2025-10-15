'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WishlistButtonProps {
  productId: string;
  productName: string;
  className?: string;
}

export function WishlistButton({ productId, productName, className = '' }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('kryptic-wishlist') || '[]');
      setIsWishlisted(wishlist.includes(productId));
    }
  }, [productId]);

  const toggleWishlist = () => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('kryptic-wishlist') || '[]');
      let newWishlist;
      
      if (isWishlisted) {
        newWishlist = wishlist.filter((id: string) => id !== productId);
      } else {
        newWishlist = [...wishlist, productId];
      }
      
      localStorage.setItem('kryptic-wishlist', JSON.stringify(newWishlist));
      setIsWishlisted(!isWishlisted);
    }
  };

  return (
    <motion.button
      onClick={toggleWishlist}
      className={`p-2 rounded-full transition-colors ${
        isWishlisted 
          ? 'bg-red-600 text-white' 
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      } ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg 
        className="h-5 w-5" 
        fill={isWishlisted ? 'currentColor' : 'none'} 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </motion.button>
  );
}



