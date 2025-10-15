'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { EmailPopup } from '@/components/EmailPopup';
import { GalaxyEffects } from '@/components/GalaxyEffects';
import { SearchModal } from '@/components/SearchModal';

export default function AboutPage() {
  const [showDiscountWheel, setShowDiscountWheel] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 relative">
      <GalaxyEffects />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold tracking-wider hover:text-gray-300 transition-colors">
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
                <Link href="/about" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-wider mb-4">ABOUT US</h1>
          <p className="text-gray-400 text-lg">Creative studio for creators and misfits. Made by artists for artists who aren&apos;t afraid to dream.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold tracking-wider mb-6">OUR STORY</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Born from a creative mind, our brand is more than just clothing — it&apos;s a statement. 
                Inspired by the art of individuality and driven by a passion for design, every piece 
                we create tells a story.
              </p>
              <p>
                We believe fashion should be fearless, personal, and unapologetically original. 
                From bold staples to subtle essentials, our collections are crafted to help you 
                express who you are — without saying a word.
              </p>
              <p>
                Welcome to a space where creativity meets confidence. Welcome to your new favorite wardrobe.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="aspect-[4/5] relative rounded-lg overflow-hidden">
              <Image
                src="/products/art-in-motion-hoodie.jpg"
                alt="Kryptic Studios - Art in Motion"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">CREATIVE VISION</h3>
              <p className="text-gray-400 text-sm">
                Every design starts with a vision. We push boundaries and challenge conventions 
                to create pieces that stand out from the crowd.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">QUALITY CRAFT</h3>
              <p className="text-gray-400 text-sm">
                Premium materials and attention to detail. We believe in creating pieces that 
                last and look better with time.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">COMMUNITY FIRST</h3>
              <p className="text-gray-400 text-sm">
                Made by artists for artists. We&apos;re building a community of creators who 
                aren&apos;t afraid to dream and express themselves.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center bg-gray-800 rounded-lg p-12 border border-gray-700"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold tracking-wider mb-6">JOIN THE MOVEMENT</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Ready to express your creativity? Join thousands of artists, creators, and misfits 
              who choose Kryptic Studios for their wardrobe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/hoodies"
                className="bg-white text-black px-8 py-4 font-bold tracking-wider hover:bg-gray-100 transition-colors text-lg"
              >
                SHOP NOW
              </Link>
              <button 
                onClick={() => setShowDiscountWheel(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold tracking-wider transition-colors text-lg"
              >
                🎯 SPIN TO WIN
              </button>
            </div>
          </motion.div>
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