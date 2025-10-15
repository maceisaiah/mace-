#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setup() {
  console.log('🚀 Kryptic Studios Payment Setup\n');
  console.log('This script will help you configure your payment system.\n');

  try {
    // Collect configuration
    console.log('📋 Stripe Configuration:');
    console.log('Get these from: https://dashboard.stripe.com/apikeys\n');
    
    const stripePublishableKey = await question('Stripe Publishable Key (pk_test_...): ');
    const stripeSecretKey = await question('Stripe Secret Key (sk_test_...): ');
    const stripeWebhookSecret = await question('Stripe Webhook Secret (whsec_...): ');

    console.log('\n📧 Email Configuration:');
    console.log('For Gmail: Enable 2FA and generate an App Password\n');
    
    const emailUser = await question('Gmail Address: ');
    const emailPass = await question('Gmail App Password (16 characters): ');
    const businessEmail = await question('Business Email (for notifications): ');

    // Generate NextAuth secret
    const nextAuthSecret = Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => 
      byte.toString(16).padStart(2, '0')
    ).join('');

    // Create .env.local content
    const envContent = `# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${stripePublishableKey}
STRIPE_SECRET_KEY=${stripeSecretKey}
STRIPE_WEBHOOK_SECRET=${stripeWebhookSecret}

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=${emailUser}
EMAIL_PASS=${emailPass}
EMAIL_FROM=${emailUser}
BUSINESS_EMAIL=${businessEmail}

# NextAuth Configuration
NEXTAUTH_URL=https://noir-shop.vercel.app
NEXTAUTH_SECRET=${nextAuthSecret}

# Database (optional)
# DATABASE_URL=your_database_url_here
`;

    // Write .env.local file
    const envPath = path.join(process.cwd(), '.env.local');
    fs.writeFileSync(envPath, envContent);

    console.log('\n✅ Configuration saved to .env.local');
    console.log('\n📋 Next Steps:');
    console.log('1. Set up Stripe webhook: https://dashboard.stripe.com/webhooks');
    console.log('   - URL: https://noir-shop.vercel.app/api/stripe/webhook');
    console.log('   - Events: payment_intent.succeeded, payment_intent.payment_failed');
    console.log('2. Redeploy your site: npm run build && npx vercel --prod');
    console.log('3. Test with a small purchase');
    console.log('\n🎉 You\'re ready to start accepting payments!');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

// Check if running directly
if (require.main === module) {
  setup();
}

module.exports = { setup };

