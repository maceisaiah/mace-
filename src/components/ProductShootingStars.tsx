'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function ProductShootingStars() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Shooting stars around the product */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1.5,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeOut",
          }}
        >
          <div className="w-0.5 h-6 bg-gradient-to-r from-transparent via-white to-transparent rounded-full blur-sm"></div>
          <div className="w-1 h-1 bg-white rounded-full absolute -top-0.5 -left-0.25"></div>
        </motion.div>
      ))}
      
      {/* Floating stars around product */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Cosmic particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-blue-400/50 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, Math.random() * 15 - 7.5, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [0.3, 1.2, 0.3],
          }}
          transition={{
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
