'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GalaxyEffects } from '@/components/GalaxyEffects';

export default function SetupPage() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    stripePublishableKey: '',
    stripeSecretKey: '',
    stripeWebhookSecret: '',
    emailHost: 'smtp.gmail.com',
    emailPort: '587',
    emailUser: '',
    emailPass: '',
    businessEmail: '',
    nextAuthSecret: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const generateNextAuthSecret = () => {
    const secret = Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => 
      byte.toString(16).padStart(2, '0')
    ).join('');
    setConfig(prev => ({ ...prev, nextAuthSecret: secret }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Create .env.local content
      const envContent = `
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${config.stripePublishableKey}
STRIPE_SECRET_KEY=${config.stripeSecretKey}
STRIPE_WEBHOOK_SECRET=${config.stripeWebhookSecret}

# Email Configuration
EMAIL_HOST=${config.emailHost}
EMAIL_PORT=${config.emailPort}
EMAIL_USER=${config.emailUser}
EMAIL_PASS=${config.emailPass}
EMAIL_FROM=${config.emailUser}
BUSINESS_EMAIL=${config.businessEmail}

# NextAuth Configuration
NEXTAUTH_URL=https://noir-shop.vercel.app
NEXTAUTH_SECRET=${config.nextAuthSecret}
`;

      // In a real app, you'd save this to .env.local
      // For now, we'll show the user what to do
      setResult({
        success: true,
        message: 'Configuration ready! Copy the environment variables below.'
      });

    } catch (error) {
      setResult({
        success: false,
        message: 'Error creating configuration. Please try again.'
      });
    }
    setIsSubmitting(false);
  };

  const copyToClipboard = () => {
    const envContent = `
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${config.stripePublishableKey}
STRIPE_SECRET_KEY=${config.stripeSecretKey}
STRIPE_WEBHOOK_SECRET=${config.stripeWebhookSecret}

# Email Configuration
EMAIL_HOST=${config.emailHost}
EMAIL_PORT=${config.emailPort}
EMAIL_USER=${config.emailUser}
EMAIL_PASS=${config.emailPass}
EMAIL_FROM=${config.emailUser}
BUSINESS_EMAIL=${config.businessEmail}

# NextAuth Configuration
NEXTAUTH_URL=https://noir-shop.vercel.app
NEXTAUTH_SECRET=${config.nextAuthSecret}
`;

    navigator.clipboard.writeText(envContent.trim());
    setResult({
      success: true,
      message: 'Configuration copied to clipboard! Paste it into your .env.local file.'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 relative">
      <GalaxyEffects />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-wider mb-4">SETUP</h1>
          <p className="text-gray-400 text-lg">Configure your payment system in minutes</p>
        </motion.div>

        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Setup Progress</span>
              <span className="text-sm text-gray-400">Step {step} of 4</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Stripe Keys */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">🔑 Stripe Configuration</h2>
                <p className="text-gray-400 mb-6">
                  Get these from your <a href="https://dashboard.stripe.com/apikeys" target="_blank" className="text-red-400 hover:text-red-300 underline">Stripe Dashboard</a>
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Publishable Key</label>
                  <input
                    type="text"
                    placeholder="pk_test_..."
                    value={config.stripePublishableKey}
                    onChange={(e) => handleInputChange('stripePublishableKey', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Secret Key</label>
                  <input
                    type="password"
                    placeholder="sk_test_..."
                    value={config.stripeSecretKey}
                    onChange={(e) => handleInputChange('stripeSecretKey', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Webhook Secret</label>
                  <input
                    type="password"
                    placeholder="whsec_..."
                    value={config.stripeWebhookSecret}
                    onChange={(e) => handleInputChange('stripeWebhookSecret', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors rounded-lg"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Set webhook URL to: https://noir-shop.vercel.app/api/stripe/webhook
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!config.stripePublishableKey || !config.stripeSecretKey || !config.stripeWebhookSecret}
                className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
              >
                Next: Email Setup
              </button>
            </motion.div>
          )}

          {/* Step 2: Email Configuration */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">📧 Email Configuration</h2>
                <p className="text-gray-400 mb-6">
                  Set up Gmail for order notifications
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Gmail Address</label>
                  <input
                    type="email"
                    placeholder="your_email@gmail.com"
                    value={config.emailUser}
                    onChange={(e) => handleInputChange('emailUser', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">App Password</label>
                  <input
                    type="password"
                    placeholder="16-character app password"
                    value={config.emailPass}
                    onChange={(e) => handleInputChange('emailPass', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors rounded-lg"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Generate this in Google Account &gt; Security &gt; App passwords
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Business Email (for notifications)</label>
                  <input
                    type="email"
                    placeholder="business@example.com"
                    value={config.businessEmail}
                    onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors rounded-lg"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!config.emailUser || !config.emailPass || !config.businessEmail}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                >
                  Next: Security
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Security */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">🔐 Security Configuration</h2>
                <p className="text-gray-400 mb-6">
                  Generate secure authentication keys
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">NextAuth Secret</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Auto-generated secret"
                      value={config.nextAuthSecret}
                      onChange={(e) => handleInputChange('nextAuthSecret', e.target.value)}
                      className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors rounded-lg"
                    />
                    <button
                      onClick={generateNextAuthSecret}
                      className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!config.nextAuthSecret}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                >
                  Next: Complete
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Complete */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">✅ Setup Complete</h2>
                <p className="text-gray-400 mb-6">
                  Your configuration is ready. Follow the steps below to activate it.
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-bold mb-2">Environment Variables (.env.local)</h3>
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${config.stripePublishableKey}
STRIPE_SECRET_KEY=${config.stripeSecretKey}
STRIPE_WEBHOOK_SECRET=${config.stripeWebhookSecret}

# Email Configuration
EMAIL_HOST=${config.emailHost}
EMAIL_PORT=${config.emailPort}
EMAIL_USER=${config.emailUser}
EMAIL_PASS=${config.emailPass}
EMAIL_FROM=${config.emailUser}
BUSINESS_EMAIL=${config.businessEmail}

# NextAuth Configuration
NEXTAUTH_URL=https://noir-shop.vercel.app
NEXTAUTH_SECRET=${config.nextAuthSecret}`}
                </pre>
              </div>

              <div className="space-y-4">
                <button
                  onClick={copyToClipboard}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
                >
                  📋 Copy Configuration
                </button>

                <div className="text-sm text-gray-400">
                  <p className="mb-2"><strong>Next Steps:</strong></p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Create a file called <code>.env.local</code> in your project root</li>
                    <li>Paste the configuration into that file</li>
                    <li>Redeploy your site to Vercel</li>
                    <li>Test with a small purchase</li>
                  </ol>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                >
                  {isSubmitting ? 'Processing...' : 'Finish Setup'}
                </button>
              </div>
            </motion.div>
          )}

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-lg ${
                result.success ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'
              }`}
            >
              <p className={result.success ? 'text-green-300' : 'text-red-300'}>
                {result.message}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
