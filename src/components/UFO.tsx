'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function UFO() {
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    // Show UFO every 2 minutes (120 seconds)
    const showUFO = () => {
      setDirection(Math.random() > 0.5 ? 'left' : 'right');
      setIsVisible(true);
      
      // Hide after animation completes (3 seconds)
      setTimeout(() => setIsVisible(false), 3000);
    };

    // Initial delay, then every 2 minutes
    const initialDelay = setTimeout(() => {
      showUFO();
      const interval = setInterval(showUFO, 120000); // 2 minutes
      return () => clearInterval(interval);
    }, 5000); // Start after 5 seconds

    return () => {
      clearTimeout(initialDelay);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        x: direction === 'right' ? -200 : (typeof window !== 'undefined' ? window.innerWidth + 200 : 1200),
        y: Math.random() * 200 + 50, // Random height between 50-250px
      }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        x: direction === 'right' ? (typeof window !== 'undefined' ? window.innerWidth + 200 : 1200) : -200,
        y: Math.random() * 200 + 50, // Slight vertical movement
      }}
      transition={{ 
        duration: 3,
        ease: "easeInOut",
        opacity: {
          times: [0, 0.1, 0.9, 1],
          duration: 3
        }
      }}
      className="fixed z-50 pointer-events-none"
    >
      <div className="relative">
        {/* UFO Glow Effect */}
        <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute inset-0 bg-blue-500/15 rounded-full blur-2xl" />
        
        {/* UFO Body */}
        <div className="relative w-20 h-10 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-full border-2 border-red-500/40 shadow-2xl">
          {/* UFO Dome */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-14 h-7 bg-gradient-to-br from-red-500/30 to-red-600/40 rounded-full border border-red-400/50" />
          
          {/* UFO Lights */}
          <div className="absolute -bottom-1 left-2 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          <div className="absolute -bottom-1 left-4 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-100" />
          <div className="absolute -bottom-1 left-6 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-200" />
          <div className="absolute -bottom-1 left-8 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse delay-300" />
          <div className="absolute -bottom-1 left-10 w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse delay-400" />
          <div className="absolute -bottom-1 left-12 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-500" />
          <div className="absolute -bottom-1 left-14 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse delay-600" />
          
          {/* UFO Details */}
          <div className="absolute top-1 left-3 w-2 h-2 bg-gray-600 rounded-full" />
          <div className="absolute top-1 right-3 w-2 h-2 bg-gray-600 rounded-full" />
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-red-400 rounded-full" />
          
          {/* Speed Lines */}
          <motion.div
            animate={{ 
              opacity: [0, 1, 0],
              x: direction === 'right' ? [0, 20] : [0, -20]
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 0.2
            }}
            className="absolute top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-white/30"
            style={{ 
              left: direction === 'right' ? '-20px' : 'auto',
              right: direction === 'left' ? '-20px' : 'auto'
            }}
          />
        </div>
        
        {/* UFO Beam Effect */}
        <motion.div
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scaleY: [0.3, 1, 0.3]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-red-500/40 to-transparent"
        />
      </div>
    </motion.div>
  );
}
