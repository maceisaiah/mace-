"use client";

import React from "react";
import { motion } from "framer-motion";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ className = "", variant = "primary", children, ...props }: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center rounded-md px-4 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 shadow-[0_0_0_0_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_10px_rgba(99,102,241,0.15)]",
    ghost:
      "bg-transparent text-foreground border border-white/10 hover:bg-white/5",
  };

  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </motion.button>
  );
}


