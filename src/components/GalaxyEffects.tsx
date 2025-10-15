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
      {/* Enhanced Galaxy background gradients - darker space vibe */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-blue-900/50 to-indigo-900/60"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/30 via-purple-800/25 to-cyan-900/35"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/25 via-indigo-800/30 to-blue-900/40"></div>
      {/* Additional dark space layer */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Ultra-optimized twinkling stars - minimal for performance */}
      {Array.from({ length: isMobile ? 20 : 40 }).map((_, i) => {
        const starSize = Math.random() * 2 + 0.5;
        const starBrightness = Math.random() * 0.8 + 0.2;
        const starColor = Math.random() > 0.7 ? 
          (Math.random() > 0.5 ? 'rgb(147, 197, 253)' : 'rgb(251, 191, 36)') : 
          'rgb(255, 255, 255)';
        
        return (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${starSize}px`,
              height: `${starSize}px`,
              backgroundColor: starColor,
              opacity: starBrightness,
              boxShadow: `0 0 ${starSize * 3}px ${starColor}, 0 0 ${starSize * 6}px ${starColor}40`
            }}
            animate={isMobile ? {} : {
              opacity: [starBrightness * 0.6, starBrightness],
            }}
            transition={isMobile ? {} : {
              duration: Math.random() * 2 + 1.5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* Reduced floating nebula clouds - less intense */}
      {Array.from({ length: isMobile ? 2 : 6 }).map((_, i) => (
        <motion.div
          key={`nebula-${i}`}
          className="absolute w-32 h-32 rounded-full blur-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              ['rgba(147, 51, 234, 0.1)', 'rgba(59, 130, 246, 0.08)', 'rgba(168, 85, 247, 0.12)', 'rgba(236, 72, 153, 0.08)', 'rgba(14, 165, 233, 0.1)', 'rgba(139, 92, 246, 0.08)'][i % 6]
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
      
      {/* Full-Page Multi-Color Shooting Stars - enhanced for full coverage */}
      {Array.from({ length: isMobile ? 8 : 15 }).map((_, i) => {
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
            key={`shooting-${i}`}
            className="absolute z-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={isMobile ? {} : {
              x: [0, window.innerWidth + 200],
              y: [0, window.innerHeight + 200],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={isMobile ? {} : {
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 25,
              ease: "easeOut",
            }}
          >
            <div className={`w-1 h-10 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses].trail} rounded-full blur-sm`}></div>
            <div className={`w-2 h-2 ${colorClasses[color as keyof typeof colorClasses].head} rounded-full absolute -top-1 -left-0.5`}></div>
          </motion.div>
        );
      })}
      
      
      
      {/* Optimized cosmic dust particles - reduced for performance */}
      {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
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
      
      {/* Distant Sun in Background - much smaller and subtle */}
      <motion.div
        className="absolute top-1/3 right-1/6 w-12 h-12 rounded-full"
        animate={isMobile ? {} : {
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={isMobile ? {} : {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Sun Core - smaller */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-300/50 via-orange-400/30 to-red-500/20 rounded-full blur-sm"></div>
        
        {/* Sun Corona - reduced */}
        <div className="absolute -inset-2 bg-gradient-radial from-yellow-200/15 via-orange-300/10 to-transparent rounded-full blur-md"></div>
        
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
      
      {/* Enhanced Aurora-like light streaks */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-pink-500/8 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-cyan-500/8 to-transparent"></div>
      
      {/* Additional Galaxy Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/15 via-transparent to-blue-900/15"></div>
      
      {/* Optimized Meteors - reduced for performance */}
      {Array.from({ length: isMobile ? 2 : 6 }).map((_, i) => {
        const colors = ['white', 'orange', 'yellow', 'blue'];
        const color = colors[i % 4];
        const colorClasses = {
          white: 'from-transparent via-white to-transparent',
          orange: 'from-transparent via-orange-400 to-transparent',
          yellow: 'from-transparent via-yellow-400 to-transparent',
          blue: 'from-transparent via-blue-400 to-transparent'
        };
        
        return (
          <motion.div
            key={`meteor-${i}`}
            className="absolute z-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={isMobile ? {} : {
              x: [0, 400],
              y: [0, 400],
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
            }}
            transition={isMobile ? {} : {
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "easeOut",
            }}
          >
            {/* Meteor Trail - smaller */}
            <div className={`w-1 h-6 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-full blur-sm`}></div>
            {/* Meteor Head - smaller */}
            <div className={`w-1.5 h-1.5 ${color === 'white' ? 'bg-white' : color === 'orange' ? 'bg-orange-400' : color === 'yellow' ? 'bg-yellow-400' : 'bg-blue-400'} rounded-full absolute -top-0.75 -left-0.25`}></div>
          </motion.div>
        );
      })}
      
      {/* Enhanced Energy Waves */}
      {Array.from({ length: isMobile ? 2 : 5 }).map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
          style={{
            top: `${Math.random() * 100}%`,
          }}
          animate={isMobile ? {} : {
            x: ['-100%', '100%'],
            opacity: [0, 0.6, 0],
          }}
          transition={isMobile ? {} : {
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
