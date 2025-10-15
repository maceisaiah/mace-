"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundFX() {
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, brightness: number, twinkle: number}>>([]);

  useEffect(() => {
    // Generate realistic starfield
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          brightness: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * 4 + 2
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient - deep space black with subtle blue tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-800" />
      
      {/* Atmospheric dust and nebula layers */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(75, 0, 130, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(139, 0, 0, 0.05) 0%, transparent 70%)
          `
        }}
      />
      
      {/* Realistic starfield */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.brightness,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.brightness * 0.5})`
          }}
          animate={{
            opacity: [star.brightness * 0.3, star.brightness, star.brightness * 0.7, star.brightness],
            scale: [0.8, 1.2, 0.9, 1],
          }}
          transition={{
            duration: star.twinkle,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Distant galaxy/nebula glow */}
      <motion.div
        className="absolute top-1/4 left-1/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15"
        style={{ 
          background: "radial-gradient(ellipse, rgba(138, 43, 226, 0.2), rgba(75, 0, 130, 0.1), transparent 70%)",
          filter: "blur(40px)"
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Underground red glow - more atmospheric */}
      <motion.div
        className="absolute -top-32 left-1/2 h-[800px] w-[1400px] -translate-x-1/2 rounded-full opacity-25"
        style={{ 
          background: "radial-gradient(ellipse, rgba(139, 0, 0, 0.3), rgba(139, 0, 0, 0.1) 40%, transparent 70%)",
          filter: "blur(80px)"
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Secondary atmospheric glow */}
      <motion.div
        className="absolute top-1/3 -right-32 h-[600px] w-[1000px] rounded-full opacity-15"
        style={{ 
          background: "radial-gradient(ellipse, rgba(184, 134, 11, 0.2), transparent 60%)",
          filter: "blur(100px)"
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 25, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Gothic grid pattern - more subtle */}
      <div className="absolute inset-0 gothic-grid opacity-20" />
      
      {/* Atmospheric red accent lines - more realistic */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent opacity-30" />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent opacity-30" />
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-600/30 to-transparent opacity-30" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-600/30 to-transparent opacity-30" />
      
      {/* Floating atmospheric particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            i % 4 === 0 ? 'bg-red-400' : 
            i % 4 === 1 ? 'bg-yellow-400' : 
            i % 4 === 2 ? 'bg-purple-400' : 'bg-white'
          }`}
          style={{
            left: `${10 + i * 7}%`,
            top: `${20 + i * 6}%`,
            opacity: 0.4,
            boxShadow: `0 0 ${4 + i * 0.5}px currentColor`
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.5, 0.8],
            x: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 6 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Deep space dust overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 98px,
              rgba(255, 255, 255, 0.02) 100px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 98px,
              rgba(255, 255, 255, 0.02) 100px
            )
          `
        }}
      />
    </div>
  );
}


