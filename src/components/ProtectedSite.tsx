'use client';

import React, { useState, useEffect } from 'react';
import { PasswordProtection } from './PasswordProtection';

interface ProtectedSiteProps {
  children: React.ReactNode;
}

export function ProtectedSite({ children }: ProtectedSiteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('krypticAuth');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
    }
    setIsLoading(false);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PasswordProtection onSuccess={handleAuthSuccess} />;
  }

  return <>{children}</>;
}

