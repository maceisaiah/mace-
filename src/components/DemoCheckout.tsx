'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
  variantId?: string;
}

interface DemoCheckoutProps {
  cartItems: CartItem[];
  onSuccess: (orderId: string) => void;
  onError: (error: string) => void;
  totalAmount: number;
}

export function DemoCheckout({ cartItems, onSuccess, onError, totalAmount }: DemoCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('card');

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success
    const orderId = `KS-${Date.now()}`;
    onSuccess(orderId);
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🟦' },
    { id: 'apple', name: 'Apple Pay', icon: '🍎' },
    { id: 'google', name: 'Google Pay', icon: '🅖' },
    { id: 'crypto', name: 'Bitcoin', icon: '₿' },
  ];

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Choose Payment Method</h3>
        <div className="grid grid-cols-1 gap-3">
          {paymentMethods.map((method) => (
            <motion.button
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedMethod === method.id
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{method.icon}</span>
                <span className="text-white font-medium">{method.name}</span>
                {selectedMethod === method.id && (
                  <span className="ml-auto text-red-400">✓</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Demo Payment Form */}
      {selectedMethod === 'card' && (
        <div className="space-y-4">
          <h4 className="text-white font-medium">Card Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Card Number"
              defaultValue="4242 4242 4242 4242"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Expiry Date"
              defaultValue="12/25"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="CVV"
              defaultValue="123"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Name on Card"
              defaultValue="John Doe"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
        <h4 className="text-white font-medium mb-3">Order Summary</h4>
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-300">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity / 100).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between text-white font-medium pt-2 border-t border-gray-600">
            <span>Total</span>
            <span>${(totalAmount / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <motion.button
        onClick={handlePayment}
        disabled={isProcessing}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold text-lg rounded-lg transition-all duration-300"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Processing Payment...
          </div>
        ) : (
          `Pay $${(totalAmount / 100).toFixed(2)} with ${paymentMethods.find(m => m.id === selectedMethod)?.name}`
        )}
      </motion.button>

      <p className="text-xs text-gray-400 text-center">
        🔒 This is a demo checkout. No real payments will be processed.
      </p>
    </div>
  );
}



