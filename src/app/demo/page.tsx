'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DemoPage() {
  const router = useRouter();

  useEffect(() => {
    // Set first-time customer status
    if (typeof window !== 'undefined') {
      localStorage.setItem('kryptic-authenticated', 'true');
      localStorage.setItem('kryptic-auth-expiry', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()); // 30 days
      localStorage.setItem('kryptic-first-time', 'true');
      
      // Redirect to home page
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6">🚀</div>
        <h1 className="text-3xl font-bold mb-4">Welcome to KRYPTIC STUDIOS!</h1>
        <p className="text-gray-400 mb-8">Preparing your exclusive underground experience...</p>
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
