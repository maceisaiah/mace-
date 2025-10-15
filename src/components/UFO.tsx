'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function UFO() {
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [flightPath, setFlightPath] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    // Show UFO every 90 seconds for more frequent sightings
    const showUFO = () => {
      setDirection(Math.random() > 0.5 ? 'left' : 'right');
      
      // Generate realistic flight path
      const path = [];
      const startY = Math.random() * 300 + 100;
      const midY = startY + (Math.random() - 0.5) * 100;
      const endY = startY + (Math.random() - 0.5) * 80;
      
      path.push({ x: direction === 'right' ? -100 : 110, y: startY });
      path.push({ x: 50, y: midY });
      path.push({ x: direction === 'right' ? 110 : -100, y: endY });
      
      setFlightPath(path);
      setIsVisible(true);
      
      // Hide after animation completes (4 seconds)
      setTimeout(() => setIsVisible(false), 4000);
    };

    // Initial delay, then every 90 seconds
    const initialDelay = setTimeout(() => {
      showUFO();
      const interval = setInterval(showUFO, 90000); // 90 seconds
      return () => clearInterval(interval);
    }, 8000); // Start after 8 seconds

    return () => {
      clearTimeout(initialDelay);
    };
  }, []);

  if (!isVisible || flightPath.length === 0) return null;

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        x: flightPath[0].x,
        y: flightPath[0].y,
        scale: 0.5,
        rotate: direction === 'right' ? -15 : 15,
      }}
      animate={{ 
        opacity: [0, 0.3, 1, 1, 0.7, 0],
        x: flightPath.map(p => p.x),
        y: flightPath.map(p => p.y),
        scale: [0.5, 0.8, 1, 1, 0.8, 0.5],
        rotate: [direction === 'right' ? -15 : 15, 0, 0, 0, direction === 'right' ? 15 : -15],
      }}
      transition={{ 
        duration: 4,
        ease: "easeInOut",
        opacity: {
          times: [0, 0.1, 0.2, 0.7, 0.9, 1],
          duration: 4
        },
        scale: {
          times: [0, 0.1, 0.2, 0.7, 0.9, 1],
          duration: 4
        }
      }}
      className="fixed z-50 pointer-events-none"
    >
      <div className="relative">
        {/* Enhanced UFO Glow Effects */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-red-500/40 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1.5, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.5, 2, 1.5],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-purple-500/15 rounded-full blur-[40px]"
        />
        
        {/* Main UFO Body with Enhanced Details */}
        <div className="relative w-24 h-12 bg-gradient-to-br from-slate-800 via-gray-700 to-slate-900 rounded-full border-2 border-red-500/60 shadow-2xl">
          {/* Enhanced UFO Dome with glass effect */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-br from-red-500/40 via-red-400/30 to-red-600/50 rounded-full border border-red-300/60 shadow-lg">
            {/* Dome reflections */}
            <div className="absolute top-1 left-2 w-3 h-3 bg-white/20 rounded-full blur-sm" />
            <div className="absolute top-2 left-4 w-2 h-2 bg-white/30 rounded-full blur-sm" />
            <div className="absolute top-3 left-6 w-1 h-1 bg-white/40 rounded-full" />
          </div>
          
          {/* Enhanced UFO Navigation Lights */}
          <div className="absolute -bottom-1 left-1.5 w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 bg-red-400 rounded-full blur-sm"
            />
          </div>
          <div className="absolute -bottom-1 left-4 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.1 }}
              className="absolute inset-0 bg-blue-400 rounded-full blur-sm"
            />
          </div>
          <div className="absolute -bottom-1 left-6.5 w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
              className="absolute inset-0 bg-green-400 rounded-full blur-sm"
            />
          </div>
          <div className="absolute -bottom-1 left-9 w-2 h-2 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              className="absolute inset-0 bg-yellow-400 rounded-full blur-sm"
            />
          </div>
          <div className="absolute -bottom-1 left-11.5 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }}
              className="absolute inset-0 bg-purple-400 rounded-full blur-sm"
            />
          </div>
          <div className="absolute -bottom-1 left-14 w-2 h-2 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 bg-cyan-400 rounded-full blur-sm"
            />
          </div>
          
          {/* Enhanced UFO Body Details */}
          <div className="absolute top-1 left-3 w-2.5 h-2.5 bg-gray-500 rounded-full shadow-inner">
            <div className="absolute inset-0.5 bg-gray-400 rounded-full" />
          </div>
          <div className="absolute top-1 right-3 w-2.5 h-2.5 bg-gray-500 rounded-full shadow-inner">
            <div className="absolute inset-0.5 bg-gray-400 rounded-full" />
          </div>
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-400 rounded-full shadow-lg">
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute inset-0 bg-red-300 rounded-full blur-sm"
            />
          </div>
          
          {/* UFO Hull Panels */}
          <div className="absolute top-2 left-2 w-1 h-4 bg-gray-600 rounded-sm" />
          <div className="absolute top-2 right-2 w-1 h-4 bg-gray-600 rounded-sm" />
          <div className="absolute bottom-2 left-4 w-3 h-1 bg-gray-600 rounded-sm" />
          <div className="absolute bottom-2 right-4 w-3 h-1 bg-gray-600 rounded-sm" />
          
          {/* Enhanced Speed Lines with Particle Effects */}
          <motion.div
            animate={{ 
              opacity: [0, 1, 0],
              x: direction === 'right' ? [0, 30] : [0, -30],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 0.1
            }}
            className="absolute top-1/2 transform -translate-y-1/2 w-12 h-0.5 bg-white/40 rounded-full"
            style={{ 
              left: direction === 'right' ? '-30px' : 'auto',
              right: direction === 'left' ? '-30px' : 'auto'
            }}
          />
          
          {/* Particle trail effects */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0, 0.8, 0],
                x: direction === 'right' ? [0, 20 + i * 5] : [0, -20 - i * 5],
                y: [0, Math.sin(i) * 10, 0],
                scale: [0.5, 1, 0.3]
              }}
              transition={{ 
                duration: 0.4 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 0.05,
                delay: i * 0.1
              }}
              className="absolute top-1/2 transform -translate-y-1/2 w-1 h-1 bg-white/60 rounded-full"
              style={{ 
                left: direction === 'right' ? '-25px' : 'auto',
                right: direction === 'left' ? '-25px' : 'auto'
              }}
            />
          ))}
        </div>
        
        {/* Enhanced UFO Beam Effect with Multiple Rays */}
        <motion.div
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scaleY: [0.5, 1.2, 0.5],
            rotate: [-2, 2, -2]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-12 left-1/2 transform -translate-x-1/2 w-1.5 h-24 bg-gradient-to-b from-red-500/60 via-red-400/40 to-transparent rounded-full"
        />
        
        {/* Secondary beam rays */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              scaleY: [0.3, 1, 0.3],
              x: [(i - 2) * 8, (i - 2) * 12, (i - 2) * 8]
            }}
            transition={{ 
              duration: 2.5 + i * 0.2, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1
            }}
            className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-red-400/40 via-red-300/30 to-transparent rounded-full"
          />
        ))}
        
        {/* Energy field around UFO */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 border-2 border-red-400/30 rounded-full blur-sm"
        />
      </div>
    </motion.div>
  );
}
