"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundFX() {
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, brightness: number, twinkle: number, color: string, layer: number}>>([]);
  const [constellations, setConstellations] = useState<Array<{id: number, points: Array<{x: number, y: number}>, visible: boolean}>>([]);

  useEffect(() => {
    // Generate ultra-realistic starfield with multiple layers
    const generateStars = () => {
      const newStars = [];
      const newConstellations = [];
      
      // Background stars (distant)
      for (let i = 0; i < 200; i++) {
        const brightness = Math.random() * 0.6 + 0.1;
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 1.5 + 0.3,
          brightness: brightness,
          twinkle: Math.random() * 6 + 3,
          color: Math.random() > 0.8 ? 
            (Math.random() > 0.5 ? 'rgb(147, 197, 253)' : 'rgb(251, 191, 36)') : 
            'rgb(255, 255, 255)',
          layer: 1
        });
      }
      
      // Foreground stars (brighter)
      for (let i = 200; i < 280; i++) {
        const brightness = Math.random() * 0.8 + 0.3;
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2.5 + 1,
          brightness: brightness,
          twinkle: Math.random() * 4 + 2,
          color: Math.random() > 0.7 ? 
            (Math.random() > 0.5 ? 'rgb(147, 197, 253)' : 'rgb(251, 191, 36)') : 
            'rgb(255, 255, 255)',
          layer: 2
        });
      }
      
      // Generate constellations
      for (let c = 0; c < 5; c++) {
        const points = [];
        const centerX = Math.random() * 80 + 10;
        const centerY = Math.random() * 60 + 20;
        
        for (let p = 0; p < 4 + Math.floor(Math.random() * 4); p++) {
          points.push({
            x: centerX + (Math.random() - 0.5) * 15,
            y: centerY + (Math.random() - 0.5) * 15
          });
        }
        
        newConstellations.push({
          id: c,
          points: points,
          visible: Math.random() > 0.5
        });
      }
      
      setStars(newStars);
      setConstellations(newConstellations);
    };

    generateStars();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Ultra-realistic deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-indigo-900" />
      
      {/* Multiple nebula layers for depth */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 15% 25%, rgba(138, 43, 226, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 85% 75%, rgba(75, 0, 130, 0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 50%, rgba(139, 0, 0, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse at 70% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 65%)
          `
        }}
      />
      
      {/* Ultra-realistic layered starfield */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.brightness,
            boxShadow: `
              0 0 ${star.size * 2}px ${star.color},
              0 0 ${star.size * 4}px ${star.color}40,
              0 0 ${star.size * 8}px ${star.color}20
            `,
            zIndex: star.layer
          }}
          animate={{
            opacity: [
              star.brightness * 0.3, 
              star.brightness, 
              star.brightness * 0.7, 
              star.brightness * 0.4,
              star.brightness
            ],
            scale: [0.8, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: star.twinkle,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Constellation lines */}
      {constellations.map((constellation) => (
        constellation.visible && (
          <motion.div
            key={`constellation-${constellation.id}`}
            className="absolute"
            style={{
              width: '100%',
              height: '100%',
              zIndex: 1
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {constellation.points.map((point, index) => {
              if (index === constellation.points.length - 1) return null;
              const nextPoint = constellation.points[index + 1];
              const distance = Math.sqrt(
                Math.pow(nextPoint.x - point.x, 2) + Math.pow(nextPoint.y - point.y, 2)
              );
              const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
              
              return (
                <div
                  key={`line-${index}`}
                  className="absolute bg-white/20"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    width: `${distance}%`,
                    height: '1px',
                    transformOrigin: '0 50%',
                    transform: `rotate(${angle}deg)`,
                    boxShadow: '0 0 2px rgba(255, 255, 255, 0.3)'
                  }}
                />
              );
            })}
          </motion.div>
        )
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
      
      {/* Ultra-realistic cosmic dust particles */}
      {[...Array(25)].map((_, i) => {
        const particleType = Math.random();
        const color = particleType > 0.7 ? 'rgb(251, 191, 36)' : 
                     particleType > 0.4 ? 'rgb(147, 197, 253)' : 
                     particleType > 0.2 ? 'rgb(139, 69, 19)' : 'rgb(255, 255, 255)';
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 0.5}px`,
              height: `${Math.random() * 3 + 0.5}px`,
              backgroundColor: color,
              opacity: Math.random() * 0.6 + 0.1,
              boxShadow: `0 0 ${Math.random() * 8 + 2}px ${color}40`
            }}
            animate={{
              y: [0, -60 - Math.random() * 40, -120 - Math.random() * 80],
              x: [0, Math.random() * 30 - 15, Math.random() * 60 - 30],
              opacity: [0.1, Math.random() * 0.7 + 0.3, 0],
              scale: [0.3, Math.random() * 1.5 + 0.8, 0.2],
              rotate: [0, Math.random() * 360, Math.random() * 720],
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        );
      })}
      
      {/* Shooting stars with realistic trails */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 400 + Math.random() * 200],
            y: [0, 400 + Math.random() * 200],
            opacity: [0, 1, 0.8, 0],
            scale: [0, 1.5, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1.5,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "easeOut"
          }}
        >
          <div 
            className="absolute w-1 h-16 bg-gradient-to-r from-transparent via-white to-transparent rounded-full blur-sm"
            style={{
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)'
            }}
          />
          <div 
            className="absolute w-2 h-2 bg-white rounded-full -top-1 -left-0.5"
            style={{
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(255, 255, 255, 0.5)'
            }}
          />
        </motion.div>
      ))}
      
      {/* Underground energy particles (keeping the vibe) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`energy-${i}`}
          className={`absolute w-1 h-1 rounded-full ${
            i % 3 === 0 ? 'bg-red-400' : 
            i % 3 === 1 ? 'bg-yellow-400' : 'bg-purple-400'
          }`}
          style={{
            left: `${10 + i * 6}%`,
            top: `${20 + i * 5}%`,
            opacity: 0.6,
            boxShadow: `0 0 ${6 + i * 0.3}px currentColor`
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.8, 0.8],
            x: [0, Math.random() * 25 - 12.5, 0],
          }}
          transition={{
            duration: 7 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
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


