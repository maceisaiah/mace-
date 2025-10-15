'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function SmokeEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background atmospheric gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-transparent to-gray-800/40"></div>
      
      {/* Large atmospheric smoke clouds */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute w-48 h-48 bg-gray-700/20 rounded-full blur-3xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -300, -600],
            x: [0, Math.random() * 150 - 75, Math.random() * 300 - 150],
            opacity: [0, 0.4, 0],
            scale: [0.3, 1.8, 0.6],
          }}
          transition={{
            duration: Math.random() * 25 + 25,
            repeat: Infinity,
            delay: Math.random() * 25,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Medium smoke wisps */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`wisp-${i}`}
          className="absolute w-24 h-24 bg-gray-600/15 rounded-full blur-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -200, -400],
            x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100],
            opacity: [0, 0.3, 0],
            scale: [0.4, 1.4, 0.7],
          }}
          transition={{
            duration: Math.random() * 18 + 18,
            repeat: Infinity,
            delay: Math.random() * 18,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Small floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-gray-500/25 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -120, -240],
            x: [0, Math.random() * 60 - 30, Math.random() * 120 - 60],
            opacity: [0, 0.5, 0],
            scale: [0.2, 1.1, 0.4],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Subtle atmospheric layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-gray-800/8 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/15 via-transparent to-gray-800/15"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/5 to-transparent"></div>
    </div>
  );
}

