'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hey! I'm KRYPTBOT, your underground guide to Kryptic Studios! Ask me about our products, shipping, sizing, or anything else!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Intelligent response system based on keywords
  const getIntelligentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Shipping questions
    if (message.includes('shipping') || message.includes('delivery')) {
      return "🚚 We offer FREE shipping on orders over $50! Standard shipping is $8.99 and typically takes 3-5 business days. Express shipping available for $15.99.";
    }
    
    // Size questions
    if (message.includes('size') || message.includes('fit') || message.includes('small') || message.includes('large')) {
      return "📏 Check out our size guide! Our hoodies and tees run true to size. If you're between sizes, I recommend sizing up for a looser fit. Need specific measurements? Just ask!";
    }
    
    // Return/refund questions
    if (message.includes('return') || message.includes('refund') || message.includes('exchange')) {
      return "🔄 We have a 30-day return policy for unworn items with original tags. Just contact us and we'll help you with the return process. No questions asked!";
    }
    
    // Product questions
    if (message.includes('hoodie') || message.includes('hoodies')) {
      return "🔥 Our ART IN MOTION hoodie is our bestseller! It's $35 and features our signature distressed design. We also have the Graffiti Rebel hoodie for $38. Both are super comfortable!";
    }
    
    if (message.includes('tee') || message.includes('shirt') || message.includes('t-shirt')) {
      return "👕 Our Umbra Tee is $38 and perfect for everyday wear. It's made with premium cotton and has a relaxed fit. Available in multiple sizes!";
    }
    
    if (message.includes('cap') || message.includes('hat')) {
      return "🧢 Our Veil Cap is $26 and features a low-profile design with matte hardware. Perfect for completing your underground look!";
    }
    
    // Price questions
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return "💰 Our hoodies start at $35, tees at $38, and accessories at $26. We also have special discounts - spin our wheel for exclusive deals!";
    }
    
    // Order questions
    if (message.includes('order') || message.includes('track') || message.includes('status')) {
      return "📦 Check your order status in your account or email us your order number. We'll track it down for you!";
    }
    
    // Discount/promo questions
    if (message.includes('discount') || message.includes('promo') || message.includes('coupon') || message.includes('sale')) {
      return "🎯 Spin our discount wheel for exclusive deals! We also offer 10% off for first-time customers. Follow us on social media for flash sales!";
    }
    
    // General help
    if (message.includes('help') || message.includes('what') || message.includes('how')) {
      return "🤖 I'm here to help! Ask me about our products, sizing, shipping, returns, or anything else about Kryptic Studios. What would you like to know?";
    }
    
    // Fallback for unknown questions
    return "🤔 That's a great question! While I don't have a specific answer for that, our team at Kryptic Studios can help you out. You can email us at support@krypticstudios.com or try asking me about our products, shipping, sizing, or returns!";
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    setIsTyping(true);

    // Generate intelligent response based on user message
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getIntelligentResponse(currentMessage),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* KRYPTBOT Alien Button - Enhanced Visibility */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl z-[9999] border-2 border-white/20 animate-bounce"
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)" }}
        whileTap={{ scale: 0.9 }}
        style={{ 
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999
        }}
      >
        <div className="text-2xl">
          👽
        </div>
        {/* KRYPTBOT Label - Always visible */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          KRYPTBOT
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 w-80 h-96 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-red-600 p-4 rounded-t-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white">KRYPTBOT</h3>
                <p className="text-red-100 text-sm">Underground AI Assistant</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-red-200"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <button
                  onClick={sendMessage}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



