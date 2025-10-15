'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';

const CORRECT_PASSWORD = 'muha';

export function PhonePasswordProtection({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for URL bypass parameters
    const urlParams = new URLSearchParams(window.location.search);
    const bypass = urlParams.get('bypass');
    
    if (bypass === 'phone' || bypass === 'mobile' || bypass === 'demo') {
      console.log('Phone bypass detected!');
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password. Access denied.');
      setPassword('');
    }
    setIsLoading(false);
  };

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md mx-auto p-8 bg-black/90 border-2 border-red-500/50 rounded-2xl backdrop-blur-sm"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wider text-white gothic-text gothic-pulse">
            KRYPTIC STUDIOS
          </h1>
          <p className="text-red-400 text-sm mt-2">Enter the secret code to access the underground</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter access code..."
              className="w-full px-4 py-4 pl-12 pr-12 bg-black/50 border-2 border-red-500/30 rounded-lg text-white placeholder-red-400 focus:border-red-400 focus:outline-none text-center font-mono tracking-wider text-lg"
              required
              disabled={isLoading}
            />
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-400 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-center text-sm bg-red-900/20 border border-red-500/30 rounded-lg p-3"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold tracking-wider rounded-lg transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                UNLOCKING...
              </div>
            ) : (
              'UNLEASH THE GATES'
            )}
          </motion.button>
        </form>

        <div className="text-center mt-8 text-gray-400 text-sm space-y-2">
          <p>🔒 Secure access • Members only • Underground exclusive</p>
          <p className="text-xs text-gray-500 mt-4">
            Phone users: Add ?bypass=phone to the URL
          </p>
        </div>
      </motion.div>
    </div>
  );
}
