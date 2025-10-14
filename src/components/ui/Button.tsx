"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type ButtonProps = {
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export function Button({ className = "", variant = "primary", children, ...props }: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-500 hover:to-red-700 active:from-red-700 active:to-red-900 shadow-lg hover:shadow-xl hover:shadow-red-500/25 border-2 border-red-500/30 gothic-glow",
    ghost:
      "bg-black/50 text-white border-2 border-red-500/30 hover:bg-red-900/20 hover:border-red-400/50 backdrop-blur-sm gothic-border",
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.05, y: -2 }} 
      whileTap={{ scale: 0.95 }} 
      className={`${base} ${variants[variant]} ${className}`} 
      {...props}
    >
      {/* Shimmer effect for primary button */}
      {variant === "primary" && (
        <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[200%] transition-transform duration-700 ease-out" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}


