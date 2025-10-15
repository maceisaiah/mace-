'use client';

import { useState } from 'react';

const PASSWORD = 'muha';

export function UltraSimplePassword({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password submitted:', password);
    
    if (password === PASSWORD) {
      console.log('Password correct!');
      setIsAuthenticated(true);
    } else {
      console.log('Password incorrect!');
      setError('Wrong password!');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    console.log('Rendering protected content');
    return <>{children}</>;
  }

  console.log('Rendering password screen');

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '40px',
        borderRadius: '10px',
        border: '2px solid #ef4444',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: 'white'
        }}>
          KRYPTIC STUDIOS
        </h1>
        
        <p style={{
          color: '#ef4444',
          marginBottom: '20px'
        }}>
          Enter password to access
        </p>

        {error && (
          <p style={{
            color: '#ef4444',
            marginBottom: '20px'
          }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'black',
              border: '2px solid #ef4444',
              borderRadius: '5px',
              color: 'white',
              marginBottom: '20px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
}
