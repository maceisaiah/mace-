"use client";

import { motion } from "framer-motion";

export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0f] to-[#05050a]" />
      
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Primary glow */}
      <motion.div
        className="absolute -top-32 left-1/2 h-[800px] w-[1400px] -translate-x-1/2 rounded-full opacity-40"
        style={{ 
          background: "radial-gradient(closest-side, rgba(99,102,241,0.3), rgba(99,102,241,0.1) 40%, transparent 70%)",
          filter: "blur(40px)"
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Secondary glow */}
      <motion.div
        className="absolute top-1/3 -right-32 h-[600px] w-[1000px] rounded-full opacity-20"
        style={{ 
          background: "radial-gradient(closest-side, rgba(139,92,246,0.2), transparent 60%)",
          filter: "blur(60px)"
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Tertiary accent */}
      <motion.div
        className="absolute bottom-1/4 -left-24 h-[400px] w-[800px] rounded-full opacity-15"
        style={{ 
          background: "radial-gradient(closest-side, rgba(236,72,153,0.15), transparent 50%)",
          filter: "blur(50px)"
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}


