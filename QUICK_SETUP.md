# 🚀 Quick Setup (5 Minutes)

## Option 1: Automated Setup (Easiest)

### 1. Run Setup Script
```bash
npm run setup
```
This will guide you through the entire process and create your `.env.local` file automatically.

### 2. Set Up Stripe Webhook
1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set URL: `https://noir-shop.vercel.app/api/stripe/webhook`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the webhook secret (starts with `whsec_`)

### 3. Redeploy
```bash
npm run build
npx vercel --prod
```

## Option 2: Visual Setup (Web Interface)

### 1. Visit Setup Page
Go to: `https://noir-shop.vercel.app/setup`

### 2. Follow the 4-Step Process
- **Step 1**: Enter your Stripe keys
- **Step 2**: Configure email notifications
- **Step 3**: Generate security keys
- **Step 4**: Copy configuration

### 3. Create .env.local File
Create a file called `.env.local` in your project root and paste the configuration.

### 4. Redeploy
```bash
npm run build
npx vercel --prod
```

## Option 3: Manual Setup

### 1. Get Your Keys
- **Stripe**: [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
- **Gmail**: Enable 2FA and generate App Password

### 2. Create .env.local
```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
BUSINESS_EMAIL=your_business_email@gmail.com

# NextAuth Configuration
NEXTAUTH_URL=https://noir-shop.vercel.app
NEXTAUTH_SECRET=your_generated_secret
```

### 3. Set Up Webhook
Same as Option 1, Step 2.

### 4. Redeploy
```bash
npm run build
npx vercel --prod
```

## 🎯 What Happens Next

Once configured:
- ✅ **Real payments** processed through Stripe
- ✅ **Instant notifications** sent to your email
- ✅ **Automatic payouts** to your bank account
- ✅ **Customer confirmations** sent automatically
- ✅ **Order tracking** in your Stripe dashboard

## 🧪 Test Your Setup

1. **Add items to cart**
2. **Go to checkout**
3. **Use test card**: `4242 4242 4242 4242`
4. **Complete purchase**
5. **Check your email** for notification
6. **Check Stripe dashboard** for transaction

## 🆘 Need Help?

- **Setup Issues**: Check the troubleshooting guide
- **Stripe Help**: [support.stripe.com](https://support.stripe.com)
- **Email Issues**: Verify Gmail app password settings

---

**You're 5 minutes away from accepting real payments!** 🚀💳

