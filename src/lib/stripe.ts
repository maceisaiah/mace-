import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_demo', {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const formatAmountForStripe = (amount: number, currency: string): number => {
  return Math.round(amount * 100); // Convert to cents
}

export const formatAmountFromStripe = (amount: number, currency: string): number => {
  return amount / 100; // Convert from cents
}

// Stripe configuration validation
export const validateStripeConfig = () => {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_demo') {
    console.warn('⚠️ Stripe not configured. Please add your Stripe keys to .env.local');
    return false;
  }
  return true;
}