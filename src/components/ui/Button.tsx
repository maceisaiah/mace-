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
      "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 active:from-indigo-700 active:to-purple-700 shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 border border-indigo-500/20",
    ghost:
      "bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm",
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


