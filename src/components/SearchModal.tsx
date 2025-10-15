'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const products = [
  {
    id: 'art-in-motion-hoodie',
    name: 'ART IN MOTION Hoodie',
    price: 35,
    image: '/products/art-in-motion-hoodie.jpg',
    category: 'Hoodies',
    description: 'Distressed black hoodie with vintage wash featuring ART IN MOTION graphic'
  }
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="max-w-2xl mx-auto mt-20 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-4">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                autoFocus
              />
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {filteredProducts.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <p className="text-lg">No products found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href="/hoodies"
                    onClick={onClose}
                    className="block"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{product.name}</h3>
                        <p className="text-gray-400 text-sm">{product.category}</p>
                        <p className="text-gray-500 text-xs">{product.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">${product.price}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-4">
              <Link
                href="/hoodies"
                onClick={onClose}
                className="text-gray-400 hover:text-white text-sm"
              >
                View All Hoodies
              </Link>
              <Link
                href="/tees"
                onClick={onClose}
                className="text-gray-400 hover:text-white text-sm"
              >
                View All T-Shirts
              </Link>
              <Link
                href="/accessories"
                onClick={onClose}
                className="text-gray-400 hover:text-white text-sm"
              >
                View All Accessories
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}



