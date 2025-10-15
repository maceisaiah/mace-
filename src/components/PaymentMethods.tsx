'use client';

import React from 'react';

export function PaymentMethods() {
  const paymentMethods = [
    { name: 'Visa', icon: '💳', color: 'text-blue-400' },
    { name: 'Mastercard', icon: '💳', color: 'text-red-400' },
    { name: 'American Express', icon: '💳', color: 'text-green-400' },
    { name: 'Discover', icon: '💳', color: 'text-orange-400' },
    { name: 'PayPal', icon: '🅿️', color: 'text-blue-300' },
    { name: 'Apple Pay', icon: '🍎', color: 'text-gray-300' },
    { name: 'Google Pay', icon: 'G', color: 'text-green-300' },
    { name: 'Shop Pay', icon: '🛍️', color: 'text-purple-300' },
    { name: 'Klarna', icon: 'K', color: 'text-pink-300' },
    { name: 'Afterpay', icon: 'A', color: 'text-cyan-300' },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-bold mb-4 text-center">We Accept</h3>
      <div className="grid grid-cols-5 gap-4">
        {paymentMethods.map((method, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <div className="text-2xl mb-1">{method.icon}</div>
            <div className={`text-xs font-medium ${method.color}`}>
              {method.name}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-gray-400">
        <div className="flex items-center justify-center space-x-4">
          <span>🔒 SSL Secured</span>
          <span>•</span>
          <span>🛡️ PCI Compliant</span>
          <span>•</span>
          <span>✅ 256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
}



