'use client';

// Temporarily disable NextAuth to fix authentication errors
// import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  // return <SessionProvider>{children}</SessionProvider>;
  return <>{children}</>;
}
