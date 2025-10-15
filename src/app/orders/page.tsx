'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { GalaxyEffects } from '@/components/GalaxyEffects';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    images: Array<{ url: string; alt?: string }>;
  };
  variant?: {
    id: string;
    name: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchOrders();
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-yellow-400';
      case 'confirmed':
        return 'text-blue-400';
      case 'processing':
        return 'text-purple-400';
      case 'shipped':
        return 'text-green-400';
      case 'delivered':
        return 'text-green-500';
      case 'cancelled':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 relative">
        <GalaxyEffects />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-black text-white pt-20 relative">
        <GalaxyEffects />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Sign in to view orders</h1>
          <p className="text-gray-400 mb-8">You need to be signed in to view your order history.</p>
          <Link href="/auth/signin" className="bg-white text-black px-8 py-4 font-bold tracking-wider hover:bg-gray-100 transition-colors">
            SIGN IN
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
              <Link href="/" className="text-2xl font-bold tracking-wider">
                KRYPTIC STUDIOS
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="text-gray-300 hover:text-white">
                Cart
              </Link>
              <Link href="/hoodies" className="text-gray-300 hover:text-white">
                Shop
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-wider mb-4">YOUR ORDERS</h1>
          <p className="text-gray-400 text-lg">Track your orders and view order history</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
              <p className="text-gray-400 mb-8">Start shopping to see your orders here!</p>
              <Link
                href="/hoodies"
                className="inline-block bg-white text-black px-8 py-4 font-bold tracking-wider hover:bg-gray-100 transition-colors"
              >
                SHOP NOW
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Order #{order.orderNumber}</h3>
                    <p className="text-gray-400">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    <span className={`font-semibold ${getStatusColor(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                    <span className="text-2xl font-bold">
                      ${(order.total / 100).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                          src={item.product.images[0]?.url || '/placeholder.jpg'}
                          alt={item.product.images[0]?.alt || item.product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.product.name}</h4>
                        {item.variant && (
                          <p className="text-sm text-gray-400">Variant: {item.variant.name}</p>
                        )}
                        <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price / 100).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">
                        Subtotal: ${(order.subtotal / 100).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-400">
                        Shipping: ${(order.shipping / 100).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-400">
                        Tax: ${(order.tax / 100).toFixed(2)}
                      </div>
                      <div className="text-lg font-bold mt-2">
                        Total: ${(order.total / 100).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
