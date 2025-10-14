"use client";

import { motion } from "framer-motion";

export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient - pure black */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Gothic grid pattern */}
      <div className="absolute inset-0 gothic-grid opacity-30" />
      
      {/* Red accent lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-20" />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-20" />
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-600 to-transparent opacity-20" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-600 to-transparent opacity-20" />
      
      {/* Primary red glow */}
      <motion.div
        className="absolute -top-32 left-1/2 h-[800px] w-[1400px] -translate-x-1/2 rounded-full opacity-30"
        style={{ 
          background: "radial-gradient(closest-side, rgba(255,0,0,0.2), rgba(255,0,0,0.05) 40%, transparent 70%)",
          filter: "blur(60px)"
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Secondary red glow */}
      <motion.div
        className="absolute top-1/3 -right-32 h-[600px] w-[1000px] rounded-full opacity-20"
        style={{ 
          background: "radial-gradient(closest-side, rgba(204,0,0,0.15), transparent 60%)",
          filter: "blur(80px)"
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 25, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Tertiary accent - gold */}
      <motion.div
        className="absolute bottom-1/4 -left-24 h-[400px] w-[800px] rounded-full opacity-10"
        style={{ 
          background: "radial-gradient(closest-side, rgba(255,215,0,0.1), transparent 50%)",
          filter: "blur(70px)"
        }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 50, 0],
          y: [0, -35, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Gothic floating elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full opacity-30 ${
            i % 3 === 0 ? 'bg-red-500' : i % 3 === 1 ? 'bg-yellow-500' : 'bg-white'
          }`}
          style={{
            left: `${15 + i * 12}%`,
            top: `${25 + i * 8}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}


