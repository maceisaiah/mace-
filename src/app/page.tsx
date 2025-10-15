'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { EmailPopup } from '@/components/EmailPopup';
import { SmokeEffects } from '@/components/SmokeEffects';
import { GalaxyEffects } from '@/components/GalaxyEffects';
import { SearchModal } from '@/components/SearchModal';
import { PaymentMethods } from '@/components/PaymentMethods';
import { MobileShopTab } from '@/components/MobileShopTab';
import { UFO } from '@/components/UFO';
// import { useCart } from '@/contexts/CartContext';
// import { MusicPlayer } from '@/components/MusicPlayer';

export default function Home() {
  const [showDiscountWheel, setShowDiscountWheel] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store in localStorage for demo
    if (typeof window !== 'undefined') {
      const subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
      subscribers.push({ email, date: new Date().toISOString() });
      localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));
    }
    
    setIsSubscribed(true);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white relative pb-20 md:pb-0">
      <SmokeEffects />
      <GalaxyEffects />
      <UFO />
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
                <Link href="/" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* Hero Section Shooting Stars - ultra-optimized */}
        {Array.from({ length: 6 }).map((_, i) => {
          const colors = ['white', 'red', 'green'];
          const color = colors[i % 3];
          const colorClasses = {
            white: {
              trail: 'from-transparent via-white to-transparent',
              head: 'bg-white'
            },
            red: {
              trail: 'from-transparent via-red-500 to-transparent',
              head: 'bg-red-500'
            },
            green: {
              trail: 'from-transparent via-green-500 to-transparent',
              head: 'bg-green-500'
            }
          };
          
          return (
            <motion.div
              key={`hero-shooting-${i}`}
              className="absolute z-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, typeof window !== 'undefined' ? window.innerWidth + 200 : 800],
                y: [0, typeof window !== 'undefined' ? window.innerHeight + 200 : 600],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 20,
                ease: "easeOut",
              }}
            >
              <div className={`w-1 h-8 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses].trail} rounded-full blur-sm`}></div>
              <div className={`w-2 h-2 ${colorClasses[color as keyof typeof colorClasses].head} rounded-full absolute -top-1 -left-0.5`}></div>
            </motion.div>
          );
        })}
        
        
        {/* Darker overlay for deeper space vibe */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Additional dark gradient for extra depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
        >
          {/* Text background for better readability */}
          <div className="absolute inset-0 bg-black/40 rounded-lg blur-sm -z-10"></div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-bold text-5xl md:text-7xl lg:text-8xl tracking-wider mb-6 text-white drop-shadow-2xl"
          >
            KRYPTIC STUDIOS
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100 drop-shadow-lg"
          >
            Creative studio for creators and misfits. Made by artists for artists who aren&apos;t afraid to dream.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-x-4"
          >
            <Link
              href="/hoodies"
              className="inline-block bg-white text-black px-8 py-4 font-bold tracking-wider hover:bg-gray-100 transition-colors text-lg"
            >
              SHOP NOW
            </Link>
            <Link
              href="/about"
              className="inline-block border-2 border-white text-white px-8 py-4 font-bold tracking-wider hover:bg-white hover:text-black transition-colors text-lg"
            >
              OUR STORY
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Best Selling & About Section - Side by Side */}
      <section className="py-20 relative overflow-hidden">
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Section Shooting Stars */}
        {Array.from({ length: 6 }).map((_, i) => {
          const colors = ['white', 'red', 'green'];
          const color = colors[i % 3];
          const colorClasses = {
            white: {
              trail: 'from-transparent via-white to-transparent',
              head: 'bg-white'
            },
            red: {
              trail: 'from-transparent via-red-500 to-transparent',
              head: 'bg-red-500'
            },
            green: {
              trail: 'from-transparent via-green-500 to-transparent',
              head: 'bg-green-500'
            }
          };

          return (
            <motion.div
              key={`section-shooting-${i}`}
              className="absolute z-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, typeof window !== 'undefined' ? window.innerWidth + 200 : 800],
                y: [0, typeof window !== 'undefined' ? window.innerHeight + 200 : 600],
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 15,
                ease: "easeOut",
              }}
            >
              <div className={`w-1 h-6 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses].trail} rounded-full blur-sm`}></div>
              <div className={`w-2 h-2 ${colorClasses[color as keyof typeof colorClasses].head} rounded-full absolute -top-1 -left-0.5`}></div>
            </motion.div>
          );
        })}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Best Selling - Left Side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="text-center lg:text-left">
                <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-wider mb-4 text-white drop-shadow-2xl">
                  BEST SELLING
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Essential pieces from our latest collection. Crafted for creators, designed for rebels.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We believe in the power of creative expression and the strength of those who dare to be different. 
                  Our mission is to provide high-quality apparel that represents the underground creative movement.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="flex justify-start"
              >
                <motion.div variants={itemVariants} className="group max-w-md mx-auto">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-700/80 transition-colors cursor-pointer">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="/products/art-in-motion-hoodie.jpg"
                        alt="ART IN MOTION Hoodie"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-white">ART IN MOTION Hoodie</h3>
                      <p className="text-gray-300 text-lg font-bold mb-4">$35</p>
                      <p className="text-gray-400 text-sm mb-4">Distressed black hoodie with vintage wash featuring 'ART IN MOTION' graphic design.</p>
                      <Link
                        href="/hoodies"
                        className="block bg-white text-black px-4 py-2 font-bold tracking-wider text-center rounded hover:bg-gray-100 transition-colors mb-3"
                      >
                        VIEW DETAILS
                      </Link>
                      <Link
                        href="/hoodies"
                        className="block bg-transparent border-2 border-white text-white px-4 py-2 font-bold tracking-wider text-center rounded hover:bg-white hover:text-black transition-colors"
                      >
                        VIEW ALL HOODIES
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* About Kryptic Studios - Right Side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-wider mb-6 text-white drop-shadow-2xl">
                  ABOUT KRYPTIC STUDIOS
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Born from a creative mind, our brand is more than just clothing — it&apos;s a statement. 
                  Inspired by the art of individuality and driven by a passion for design, every piece we create tells a story. 
                  We believe fashion should be fearless, personal, and unapologetically original.
                </p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  From the streets to the stars, we create pieces that speak to the rebel in all of us. 
                  Each design is a canvas for self-expression, a way to show the world who you really are.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="relative max-w-md mx-auto">
                <div className="aspect-[4/5] relative rounded-lg overflow-hidden">
                  <Image
                    src="/products/graffiti-rebel-hoodie.jpg"
                    alt="Kryptic Studios Brand"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                      <p className="text-white text-sm font-medium">&ldquo;The underground awaits those who dare to create&rdquo;</p>
                      <p className="text-gray-400 text-xs mt-1">- Kryptic Studios</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learn More Section - Bottom Middle */}
      <section className="py-16 relative overflow-hidden">
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Link
                href="/about"
                className="inline-block bg-white text-black px-8 py-4 font-bold tracking-wider hover:bg-gray-100 transition-colors text-lg"
              >
                LEARN MORE
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            <motion.h3
              variants={itemVariants}
              className="font-bold text-3xl md:text-4xl tracking-wider mb-4"
            >
              STAY IN THE LOOP
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-gray-400 mb-8 text-lg"
            >
              Be the first to know about new drops, exclusive releases, and behind-the-scenes content.
            </motion.p>
            <motion.form
              variants={itemVariants}
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors rounded-none"
                required
              />
              <button
                type="submit"
                disabled={isSubscribed}
                className={`px-6 py-3 font-bold tracking-wider transition-colors rounded-none ${
                  isSubscribed 
                    ? 'bg-green-600 text-white cursor-not-allowed' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {isSubscribed ? '✓ SUBSCRIBED!' : 'SUBSCRIBE'}
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-12 relative overflow-hidden">
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PaymentMethods />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800 relative">
        {/* Text readability overlay */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold tracking-wider mb-4 text-white drop-shadow-lg">KRYPTIC STUDIOS</h3>
              <p className="text-gray-200 drop-shadow-lg">
                Creative studio for creators and misfits. Made by artists for artists who aren&apos;t afraid to dream.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white drop-shadow-lg">SHOP</h4>
              <ul className="space-y-2 text-gray-200 drop-shadow-lg">
                <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="/hoodies" className="hover:text-white transition-colors">Hoodies</Link></li>
                <li><Link href="/tees" className="hover:text-white transition-colors">T-Shirts</Link></li>
                <li><Link href="/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white drop-shadow-lg">SUPPORT</h4>
              <ul className="space-y-2 text-gray-200 drop-shadow-lg">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
                <li><Link href="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white drop-shadow-lg">FOLLOW US</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-200 hover:text-white transition-colors drop-shadow-lg">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-200 hover:text-white transition-colors drop-shadow-lg">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-200 hover:text-white transition-colors drop-shadow-lg">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-200 drop-shadow-lg">
            <p>&copy; 2024 Kryptic Studios. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Search Modal */}
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />

      {/* Discount Wheel Popup */}
      {showDiscountWheel && (
        <EmailPopup onClose={() => setShowDiscountWheel(false)} />
      )}

      {/* Mobile Shop Tab */}
      <MobileShopTab 
        cartItemCount={0}
        onSearchClick={() => setShowSearch(true)}
        onDiscountClick={() => setShowDiscountWheel(true)}
      />
    </div>
  );
}
