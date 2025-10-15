'use client';

import { useState } from 'react';

interface SimplePasswordProtectionProps {
  children: React.ReactNode;
}

export function SimplePasswordProtection({ children }: SimplePasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'muha') {
      setIsAuthenticated(true);
    } else {
      alert('Wrong password!');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg border border-red-500">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          KRYPTIC STUDIOS
        </h1>
        <p className="text-gray-400 mb-6 text-center">
          Enter password to access
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            className="w-full px-4 py-2 bg-black border border-red-500 rounded text-white mb-4"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
