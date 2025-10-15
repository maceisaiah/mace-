'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GalaxyEffects } from '@/components/GalaxyEffects';
import { DemoCheckout } from '@/components/DemoCheckout';
import { useSession } from 'next-auth/react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

export default function CheckoutPage() {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedPayment, setSelectedPayment] = useState('stripe');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: '',
    saveInfo: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Load cart on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const items = JSON.parse(localStorage.getItem('kryptic-cart') || '[]');
      setCartItems(items);
    }
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // State-based shipping rates
  const getShipping = () => {
    const subtotal = getTotalPrice();
    
    // Free shipping over $50
    if (subtotal > 50) return 0;
    
    // State-based shipping rates
    const shippingRates: { [key: string]: number } = {
      'CA': 6.99,  // California - West Coast
      'NY': 8.99,  // New York - East Coast
      'TX': 7.99,  // Texas - Central
      'FL': 9.99,  // Florida - Southeast
      'IL': 8.49,  // Illinois - Midwest
      'WA': 6.99,  // Washington - West Coast
      'OR': 6.99,  // Oregon - West Coast
      'NV': 7.49,  // Nevada - West
      'AZ': 7.49,  // Arizona - Southwest
      'CO': 7.99,  // Colorado - Mountain
      'UT': 7.99,  // Utah - Mountain
      'NM': 8.49,  // New Mexico - Southwest
      'ND': 9.99,  // North Dakota - Remote
      'SD': 9.99,  // South Dakota - Remote
      'MT': 9.99,  // Montana - Remote
      'WY': 9.99,  // Wyoming - Remote
      'AK': 12.99, // Alaska - Remote
      'HI': 15.99, // Hawaii - Remote
    };
    
    return shippingRates[formData.state] || 8.99; // Default rate
  };

  // State-based tax rates
  const getTax = () => {
    const subtotal = getTotalPrice();
    
    // State tax rates (including local taxes for major states)
    const taxRates: { [key: string]: number } = {
      'CA': 0.0875,  // California - 7.25% + local
      'NY': 0.08,    // New York - 8%
      'TX': 0.0625,  // Texas - 6.25%
      'FL': 0.06,    // Florida - 6%
      'IL': 0.0625,  // Illinois - 6.25%
      'WA': 0.065,   // Washington - 6.5%
      'OR': 0,       // Oregon - No sales tax
      'NV': 0.0685,  // Nevada - 6.85%
      'AZ': 0.056,   // Arizona - 5.6%
      'CO': 0.029,   // Colorado - 2.9%
      'UT': 0.047,   // Utah - 4.7%
      'NM': 0.05125, // New Mexico - 5.125%
      'ND': 0.05,    // North Dakota - 5%
      'SD': 0.045,   // South Dakota - 4.5%
      'MT': 0,       // Montana - No sales tax
      'WY': 0.04,    // Wyoming - 4%
      'AK': 0,       // Alaska - No state sales tax
      'HI': 0.04,    // Hawaii - 4%
    };
    
    const taxRate = taxRates[formData.state] || 0.06; // Default 6%
    return subtotal * taxRate;
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getShipping() + getTax();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handlePaymentSuccess = async () => {
    setIsProcessing(true);
    try {
      // Clear cart
      localStorage.setItem('kryptic-cart', '[]');
      setCartItems([]);
      
      // Show success
      setOrderSuccess(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        window.location.href = '/orders';
      }, 3000);
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Order processed but there was an error. Please contact support.');
    }
  };

  const handlePaymentError = (error: string) => {
    alert(`Payment failed: ${error}`);
    setIsProcessing(false);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 relative">
        <GalaxyEffects />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-lg p-12 border border-gray-700"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-bold mb-4">ORDER CONFIRMED!</h1>
            <p className="text-gray-400 text-lg mb-8">
              Thank you for your order. You&apos;ll receive a confirmation email shortly.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to your orders...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 relative">
        <GalaxyEffects />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/hoodies" className="bg-white text-black px-8 py-4 font-bold tracking-wider hover:bg-gray-100 transition-colors">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 relative">
      <GalaxyEffects />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold tracking-wider hover:text-gray-300 transition-colors">
                KRYPTIC STUDIOS
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="text-gray-300 hover:text-white">
                ← Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-wider mb-4">CHECKOUT</h1>
          <p className="text-gray-400 text-lg">Complete your order securely</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors rounded-lg"
                    required
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors rounded-lg"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors rounded-lg"
                    required
                  />
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-white transition-colors rounded-lg"
                    required
                  >
                    <option value="">State</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    <option value="IL">Illinois</option>
                    <option value="WA">Washington</option>
                    <option value="OR">Oregon</option>
                    <option value="NV">Nevada</option>
                    <option value="AZ">Arizona</option>
                    <option value="CO">Colorado</option>
                    <option value="UT">Utah</option>
                    <option value="NM">New Mexico</option>
                    <option value="ND">North Dakota</option>
                    <option value="SD">South Dakota</option>
                    <option value="MT">Montana</option>
                    <option value="WY">Wyoming</option>
                    <option value="AK">Alaska</option>
                    <option value="HI">Hawaii</option>
                  </select>
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP code"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors rounded-lg"
                    required
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                
                <DemoCheckout
                  cartItems={cartItems}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  totalAmount={getFinalTotal() * 100}
                />
                
                {false && (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">
                      {selectedPayment === 'paypal' && '🅿️'}
                      {selectedPayment === 'apple' && '🍎'}
                      {selectedPayment === 'google' && 'G'}
                    </div>
                    <p className="text-gray-400 mb-4">
                      {selectedPayment === 'paypal' && 'You will be redirected to PayPal to complete your payment'}
                      {selectedPayment === 'apple' && 'Use Touch ID or Face ID to pay with Apple Pay'}
                      {selectedPayment === 'google' && 'Complete your payment with Google Pay'}
                    </p>
                    <button
                      onClick={() => setSelectedPayment('stripe')}
                      className="text-red-400 hover:text-red-300 underline"
                    >
                      Use Card Instead
                    </button>
                  </div>
                )}

                {/* Security Badges */}
                <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-400">
                  <span>🔒 SSL Secured</span>
                  <span>•</span>
                  <span>🛡️ PCI Compliant</span>
                  <span>•</span>
                  <span>✅ 256-bit Encryption</span>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-400">Size: {item.size} • Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t border-gray-700 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Shipping {formData.state && (
                      <span className="text-xs text-gray-400">
                        to {formData.state}
                      </span>
                    )}
                  </span>
                  <span>{getShipping() === 0 ? 'FREE' : `$${getShipping().toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Tax {formData.state && (
                      <span className="text-xs text-gray-400">
                        ({formData.state === 'OR' || formData.state === 'MT' || formData.state === 'AK' ? '0%' : 
                          formData.state === 'HI' ? '4%' : 
                          formData.state === 'CO' ? '2.9%' :
                          formData.state === 'WY' ? '4%' :
                          formData.state === 'SD' ? '4.5%' :
                          formData.state === 'ND' ? '5%' :
                          formData.state === 'NM' ? '5.125%' :
                          formData.state === 'UT' ? '4.7%' :
                          formData.state === 'AZ' ? '5.6%' :
                          formData.state === 'NV' ? '6.85%' :
                          formData.state === 'WA' ? '6.5%' :
                          formData.state === 'FL' ? '6%' :
                          formData.state === 'TX' || formData.state === 'IL' ? '6.25%' :
                          formData.state === 'NY' ? '8%' :
                          formData.state === 'CA' ? '8.75%' :
                          '6%'})
                      </span>
                    )}
                  </span>
                  <span>${getTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-2">
                  <span>Total</span>
                  <span>${getFinalTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {getTotalPrice() < 50 && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-300">
                    Add ${(50 - getTotalPrice()).toFixed(2)} more for FREE shipping!
                  </p>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold mb-4">Why Shop With Us?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Made by artists for artists</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



