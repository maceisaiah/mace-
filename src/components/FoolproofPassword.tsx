'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PASSWORD = 'muha';

export function FoolproofPassword({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password submitted:', password);
    console.log('Expected password:', PASSWORD);
    console.log('Match:', password === PASSWORD);
    
    if (password.trim() === PASSWORD) {
      console.log('Password correct! Setting authenticated to true');
      setIsAuthenticated(true);
      setError('');
    } else {
      console.log('Password incorrect!');
      setError('Wrong password!');
      setPassword('');
    }
  };

  if (!mounted) {
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
        color: 'white'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

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
      {/* Red Shooting Stars Background */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 400],
            y: [0, 400],
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: "easeOut",
          }}
        >
          <div style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(to right, transparent, #ef4444, transparent)',
            borderRadius: '1px',
            filter: 'blur(1px)'
          }}></div>
          <div style={{
            width: '4px',
            height: '4px',
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            position: 'absolute',
            top: '-2px',
            left: '-1.5px'
          }}></div>
        </motion.div>
      ))}
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
          Enter password to unlock greatness
        </p>

        {error && (
          <div style={{
            color: '#ef4444',
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: '#ef444410',
            border: '1px solid #ef4444',
            borderRadius: '5px'
          }}>
            {error}
          </div>
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
            autoComplete="off"
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

        <div style={{
          marginTop: '20px',
          fontSize: '12px',
          color: '#666'
        }}>
          There is no hint. Good luck!
        </div>
      </div>
    </div>
  );
}


