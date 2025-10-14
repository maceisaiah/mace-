"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-56px)] bg-gradient-to-b from-black via-[#0b0b12] to-black">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px 400px at 50% 0%, rgba(99,102,241,0.12), transparent 60%)" }} />
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-20 pb-24 text-center">
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
          Crafted for the night.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mt-4 text-white/70 max-w-2xl mx-auto">
          Minimal silhouettes. Deep tones. Subtle sheen. A collection designed for the neon afterglow.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-8 flex items-center justify-center gap-3">
          <Link href="/products"><Button>Shop Now</Button></Link>
          <Link href="/about"><Button variant="ghost">About</Button></Link>
        </motion.div>
      </section>
    </div>
  );
}
