'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';

const CORRECT_PASSWORD = '1234321';
const SPECIAL_SESSION_PASSWORD = 'KRYPTIC2026';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

export function PasswordProtection({ children }: PasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [borderColor, setBorderColor] = useState('from-red-500 to-red-700');

  useEffect(() => {
    // Check for bypass parameter first
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const bypass = urlParams.get('bypass');
      
      if (bypass === 'demo' || bypass === 'vip' || bypass === 'access') {
        // Auto-authenticate with bypass
        const authData = {
          authenticated: true,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getTime() // 1 year
        };
        localStorage.setItem('kryptic-auth', JSON.stringify(authData));
        localStorage.setItem('kryptic-first-time', 'true');
        if (bypass === 'vip') {
          localStorage.setItem('kryptic-vip', 'true');
        }
        setIsAuthenticated(true);
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }
      
      // Check if user is already authenticated and not expired
      const authData = localStorage.getItem('kryptic-auth');
      if (authData) {
        try {
          const { authenticated, expiresAt } = JSON.parse(authData);
          const now = new Date().getTime();
          const expirationDate = new Date('2026-01-01').getTime();
          
          if (authenticated && now < expirationDate) {
            setIsAuthenticated(true);
          } else {
            // Clear expired auth
            localStorage.removeItem('kryptic-auth');
          }
        } catch (error) {
          // Clear invalid auth data
          localStorage.removeItem('kryptic-auth');
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      // Save to localStorage with expiration date (Jan 1st, 2026)
      if (typeof window !== 'undefined') {
        const authData = {
          authenticated: true,
          expiresAt: new Date('2026-01-01').getTime()
        };
        localStorage.setItem('kryptic-auth', JSON.stringify(authData));
      }
    } else if (password === SPECIAL_SESSION_PASSWORD) {
      setIsAuthenticated(true);
      // Special session password - active until Jan 1st, 2026
      if (typeof window !== 'undefined') {
        const authData = {
          authenticated: true,
          expiresAt: new Date('2026-01-01').getTime(),
          specialSession: true
        };
        localStorage.setItem('kryptic-auth', JSON.stringify(authData));
        localStorage.setItem('kryptic-special-session', 'true');
      }
    } else {
      setError('Incorrect password. Access denied.');
      setPassword('');
    }
    setIsLoading(false);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_50%)]" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            animate={{
              x: [0, Math.random() * 1000],
              y: [0, Math.random() * 1000],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md mx-auto p-8"
      >
        {/* Enhanced Pulsing Border Container */}
        <div className="relative">
          {/* Outer Glow Ring */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-red-400/30 to-red-500/20 rounded-3xl blur-lg"
          />
          
          {/* Corner Glow Effects */}
          <motion.div
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0,
            }}
            className="absolute -top-2 -left-2 w-8 h-8 bg-red-500/40 rounded-full blur-md"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.5,
            }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500/40 rounded-full blur-md"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1,
            }}
            className="absolute -bottom-2 -left-2 w-8 h-8 bg-red-500/40 rounded-full blur-md"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1.5,
            }}
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-500/40 rounded-full blur-md"
          />
          
          {/* Main Box with Enhanced Pulsing Border */}
          <motion.div
            animate={{
              borderColor: ["rgba(239, 68, 68, 0.3)", "rgba(239, 68, 68, 0.8)", "rgba(239, 68, 68, 0.3)"],
              boxShadow: [
                "0 0 20px rgba(239, 68, 68, 0.2)",
                "0 0 40px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)",
                "0 0 20px rgba(239, 68, 68, 0.2)"
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-black/90 border-2 border-red-500/50 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
          >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Lock className="w-16 h-16 text-red-500" />
            </motion.div>
            <h1 className="text-3xl font-bold tracking-wider mb-2 text-white">
              KRYPTIC STUDIOS
            </h1>
            <p className="text-red-400 text-sm">
              Enter the secret code to access the underground
            </p>
          </div>

          {/* Password Form */}
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
            disabled={isLoading || !password}
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold tracking-wider rounded-lg transition-all duration-300"
          >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  AUTHENTICATING...
                </div>
              ) : (
                'UNLEASH THE GATES'
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-red-400/70">
              🔒 Secure access • Members only • Underground exclusive
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}