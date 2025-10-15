'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VIPPage() {
  const router = useRouter();

  useEffect(() => {
    // Set VIP customer status with special privileges
    if (typeof window !== 'undefined') {
      localStorage.setItem('kryptic-authenticated', 'true');
      localStorage.setItem('kryptic-auth-expiry', new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()); // 1 year
      localStorage.setItem('kryptic-vip', 'true');
      localStorage.setItem('kryptic-first-time', 'true');
      
      // Redirect to home page
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6">👑</div>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
          VIP ACCESS GRANTED
        </h1>
        <p className="text-gray-400 mb-8">Welcome to the inner circle of KRYPTIC STUDIOS...</p>
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
