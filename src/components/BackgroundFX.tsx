"use client";

import { motion } from "framer-motion";

export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0b12] to-black" />
      <motion.div
        className="absolute -top-32 left-1/2 h-[600px] w-[1200px] -translate-x-1/2 rounded-full opacity-30"
        style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.25), transparent 70%)" }}
        animate={{
          scale: [1, 1.05, 1],
          filter: ["blur(24px)", "blur(30px)", "blur(24px)"],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}


