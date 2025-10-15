'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function GalaxyEffects() {
  // Detect if device is mobile
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Galaxy background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-indigo-900/20"></div>
      
      {/* Twinkling stars - reduced on mobile */}
      {Array.from({ length: isMobile ? 20 : 50 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={isMobile ? {} : {
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={isMobile ? {} : {
            duration: Math.random() * 3 + 1,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Floating nebula clouds - reduced on mobile */}
      {Array.from({ length: isMobile ? 2 : 6 }).map((_, i) => (
        <motion.div
          key={`nebula-${i}`}
          className="absolute w-64 h-64 rounded-full blur-3xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              ['rgba(147, 51, 234, 0.1)', 'rgba(59, 130, 246, 0.1)', 'rgba(168, 85, 247, 0.1)'][i % 3]
            } 0%, transparent 70%)`,
          }}
          animate={isMobile ? {} : {
            x: [0, Math.random() * 200 - 100, Math.random() * 300 - 150],
            y: [0, Math.random() * 200 - 100, Math.random() * 300 - 150],
            scale: [0.5, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={isMobile ? {} : {
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Enhanced Shooting stars with trails - reduced on mobile */}
      {Array.from({ length: isMobile ? 3 : 8 }).map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={isMobile ? {} : {
            x: [0, 400],
            y: [0, 400],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={isMobile ? {} : {
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: "easeOut",
          }}
        >
          <div className="w-1 h-8 bg-gradient-to-r from-transparent via-white to-transparent rounded-full blur-sm"></div>
          <div className="w-2 h-2 bg-white rounded-full absolute -top-1 -left-0.5"></div>
        </motion.div>
      ))}
      
      {/* Red Shooting Stars - reduced on mobile */}
      {Array.from({ length: isMobile ? 2 : 6 }).map((_, i) => (
        <motion.div
          key={`red-shooting-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={isMobile ? {} : {
            x: [0, 350],
            y: [0, 350],
            opacity: [0, 0.9, 0],
            scale: [0, 1.3, 0],
          }}
          transition={isMobile ? {} : {
            duration: Math.random() * 2.5 + 1.8,
            repeat: Infinity,
            delay: Math.random() * 12,
            ease: "easeOut",
          }}
        >
          <div className="w-1 h-6 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full blur-sm"></div>
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute -top-0.75 -left-0.25"></div>
        </motion.div>
      ))}
      
      
      
      {/* Cosmic dust particles - reduced on mobile */}
      {Array.from({ length: isMobile ? 10 : 30 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={isMobile ? {} : {
            y: [0, -100, -200],
            x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
            opacity: [0, 0.6, 0],
            scale: [0.2, 1, 0.2],
          }}
          transition={isMobile ? {} : {
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Distant Sun in Background - simplified on mobile */}
      <motion.div
        className="absolute top-1/3 right-1/6 w-24 h-24 rounded-full"
        animate={isMobile ? {} : {
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={isMobile ? {} : {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Sun Core */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-300 via-orange-400 to-red-500 rounded-full blur-sm"></div>
        
        {/* Sun Corona */}
        <div className="absolute -inset-4 bg-gradient-radial from-yellow-200/30 via-orange-300/20 to-transparent rounded-full blur-md"></div>
        <div className="absolute -inset-8 bg-gradient-radial from-yellow-100/20 via-orange-200/10 to-transparent rounded-full blur-lg"></div>
        
        {/* Subtle Sun Rays */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute w-0.5 h-12 bg-gradient-to-t from-yellow-300/50 to-transparent"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: '50% 0%',
              transform: `rotate(${i * 45}deg) translateY(-50%)`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleY: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
      
      {/* Smokey Effects - reduced on mobile */}
      {Array.from({ length: isMobile ? 4 : 12 }).map((_, i) => (
        <motion.div
          key={`smoke-${i}`}
          className="absolute w-32 h-32 bg-gray-600/20 rounded-full blur-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={isMobile ? {} : {
            y: [0, -200, -400],
            x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100],
            opacity: [0, 0.3, 0],
            scale: [0.5, 1.5, 0.8],
          }}
          transition={isMobile ? {} : {
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Additional Smoke Wisps - reduced on mobile */}
      {Array.from({ length: isMobile ? 3 : 8 }).map((_, i) => (
        <motion.div
          key={`wisp-${i}`}
          className="absolute w-16 h-16 bg-gray-500/15 rounded-full blur-xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={isMobile ? {} : {
            y: [0, -150, -300],
            x: [0, Math.random() * 80 - 40, Math.random() * 160 - 80],
            opacity: [0, 0.4, 0],
            scale: [0.3, 1.2, 0.6],
          }}
          transition={isMobile ? {} : {
            duration: Math.random() * 15 + 12,
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Aurora-like light streaks */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/5 to-transparent"></div>
    </div>
  );
}
