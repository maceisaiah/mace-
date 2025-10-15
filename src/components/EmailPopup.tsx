"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Gift, Truck } from "lucide-react";
import { Button } from "./ui/Button";

const discountOptions = [
  { id: 1, text: "10% OFF", value: 10, color: "from-red-500 to-red-700" },
  { id: 2, text: "15% OFF", value: 15, color: "from-red-600 to-red-800" },
  { id: 3, text: "20% OFF", value: 20, color: "from-red-700 to-red-900" },
  { id: 4, text: "FREE SHIPPING", value: "free", color: "from-yellow-500 to-yellow-700" },
  { id: 5, text: "25% OFF", value: 25, color: "from-red-800 to-red-900" },
  { id: 6, text: "30% OFF", value: 30, color: "from-red-900 to-black" },
];

export function EmailPopup({ onClose }: { onClose: () => void }) {
  const [isOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<typeof discountOptions[0] | null>(null);
  const [borderColor, setBorderColor] = useState('from-red-500 to-red-700');
  // const [hasShown, setHasShown] = useState(false);

  // Synchronized color sequence - red, orange, yellow, pink every 3 seconds
  useEffect(() => {
    const colorSequence = [
      'from-red-500 to-red-700',      // 1. Red
      'from-orange-500 to-orange-700', // 2. Orange
      'from-yellow-500 to-yellow-700', // 3. Yellow
      'from-pink-500 to-pink-700'     // 4. Pink
    ];
    
    let currentIndex = 0;
    
    // Start immediately with first color
    setBorderColor(colorSequence[currentIndex]);
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % colorSequence.length;
      const newColor = colorSequence[currentIndex];
      setBorderColor(newColor);
      console.log('Color changing to:', newColor); // Debug log
    }, 3000); // Change every 3 seconds as requested
    
    return () => clearInterval(interval);
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * discountOptions.length);
    const prize = discountOptions[randomIndex];
    
    // Simulate spinning delay
    setTimeout(() => {
      setWonPrize(prize);
      setIsSpinning(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && wonPrize) {
      // Here you would typically send the email to your backend
      console.log("Email submitted:", email, "Prize won:", wonPrize);
      alert(`Congratulations! You won ${wonPrize.text}! Check your email for details.`);
      // Close the wheel and return to normal website
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        {/* Terrifying background effects */}
        <div className="absolute inset-0 gothic-grid opacity-20" />
        <div className={`absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-900/20 animate-pulse`} />
        
        <motion.div
          key={borderColor} // Force re-render when color changes
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className={`relative w-full max-w-md bg-gradient-to-r ${borderColor} p-1 rounded-2xl animate-pulse`}
        >
          <div className="w-full h-full bg-black/90 rounded-2xl p-8 sinister-glow">
          {/* Close button */}
          <button
            onClick={() => onClose()}
            className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors z-50"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Gift className="w-12 h-12 text-red-500 gothic-glow" />
            </motion.div>
            <motion.h2 
              animate={{ 
                filter: ['blur(0px)', 'blur(1px)', 'blur(0px)'],
                opacity: [1, 0.8, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-2xl font-bold text-white gothic-text mb-2"
            >
              UNLOCK GREATNESS
            </motion.h2>
            <p className="text-red-400 text-sm">
              Join the KRYPTIC underground. Spin for exclusive rewards.
            </p>
            <button
              onClick={() => onClose()}
              className="mt-2 text-gray-400 hover:text-white text-xs underline"
            >
              Skip for now
            </button>
          </div>

          {/* Discount Wheel */}
          <div className="mb-6">
            <div className="relative w-48 h-48 mx-auto mb-4">
              <div key={borderColor} className={`w-full h-full rounded-full bg-gradient-to-r ${borderColor} p-1 animate-pulse`}>
                <div className={`w-full h-full rounded-full bg-gray-900 relative overflow-hidden ${
                  isSpinning ? 'animate-spin' : ''
                }`} style={{ animationDuration: '2s' }}>
                {discountOptions.map((option, index) => (
                  <div
                    key={option.id}
                    className={`absolute w-1/2 h-1/2 origin-bottom-right ${
                      index % 2 === 0 ? 'bg-gray-800/80' : 'bg-gray-700/80'
                    }`}
                    style={{
                      transform: `rotate(${index * 60}deg)`,
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    }}
                  >
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold bg-black/80 px-3 py-1 rounded border border-gray-500/50">
                      {option.text}
                    </div>
                  </div>
                ))}
                </div>
              </div>
              
              {/* Center button */}
              <button
                key={`button-${borderColor}`}
                onClick={spinWheel}
                disabled={isSpinning}
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r ${borderColor} rounded-full border-4 border-white/20 flex items-center justify-center text-white font-bold text-sm hover:scale-105 transition-all duration-500 disabled:opacity-50 gothic-glow animate-pulse`}
              >
                {isSpinning ? "..." : "SPIN"}
              </button>
            </div>

            {wonPrize && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center p-6 bg-black/80 rounded-xl border-2 border-gray-500/50 shadow-2xl"
              >
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-white font-bold text-2xl mb-2 gothic-text">
                  YOU WON:
                </p>
                <div className={`inline-block px-6 py-3 rounded-lg bg-gradient-to-r ${wonPrize.color} text-white font-bold text-xl shadow-lg`}>
                  {wonPrize.text}
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  Enter your email below to claim your reward
                </p>
              </motion.div>
            )}
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
              <div className={`w-full rounded-lg bg-gradient-to-r ${borderColor} p-0.5`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="w-full pl-12 pr-4 py-3 bg-black/50 rounded-lg text-white placeholder-red-400 focus:outline-none gothic-border border-0"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={!email || !wonPrize}
              className="w-full py-4 text-lg font-bold gothic-glow"
            >
              <Truck className="w-5 h-5 mr-2" />
              CLAIM REWARD
            </Button>
          </form>

          {/* Footer */}
          <p className="text-xs text-red-400/70 text-center mt-4">
            * One-time use. Valid for 30 days. No spam, just fire drops.
          </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
