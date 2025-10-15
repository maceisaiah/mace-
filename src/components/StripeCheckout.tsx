'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo');

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
  variantId?: string;
}

interface StripeCheckoutProps {
  cartItems: CartItem[];
  onSuccess: (orderId: string) => void;
  onError: (error: string) => void;
}

function CheckoutForm({ cartItems, onSuccess, onError }: StripeCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create payment intent
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems.map(item => ({
          id: item.id,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        onError('Failed to initialize payment');
      });
  }, [cartItems, onError]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (error) {
      onError(error.message || 'Payment failed');
      setIsProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-bold mb-4">Payment Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Card Information</label>
            <div className="p-4 bg-gray-700 border border-gray-600 rounded-lg">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#ffffff',
                      '::placeholder': {
                        color: '#9ca3af',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={!stripe || isProcessing || !clientSecret}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-white text-black font-bold tracking-wider hover:bg-gray-100 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-lg rounded-lg"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
            PROCESSING...
          </div>
        ) : (
          'COMPLETE ORDER'
        )}
      </motion.button>
    </form>
  );
}

export function StripeCheckout({ cartItems, onSuccess, onError }: StripeCheckoutProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cartItems={cartItems} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
}
