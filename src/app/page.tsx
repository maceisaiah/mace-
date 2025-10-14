"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-32 text-center">
        {/* Main heading with enhanced typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 gothic-text">
            <span className="bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent gothic-pulse">
              KRYPTIK
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text text-transparent">
              STREETWEAR
            </span>
          </h1>
          
          {/* Gothic decorative line */}
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mt-8 opacity-80 gothic-glow" />
        </motion.div>

        {/* Subtitle with gothic styling */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-12 text-white/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Streetwear for creators and misfits. Made by artists for artists who aren&apos;t afraid to dream.
        </motion.p>

        {/* Enhanced CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/products">
            <Button className="px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-indigo-500/25">
              Shop Collection
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="px-8 py-4 text-lg font-medium border-2 border-white/20 hover:border-white/40">
              Our Story
            </Button>
          </Link>
        </motion.div>

        {/* Floating elements for depth */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-40"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-50"
          animate={{
            y: [0, -25, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </section>
    </div>
  );
}
