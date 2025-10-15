# 🔑 Your Stripe Configuration

## ✅ What You Have
- **Publishable Key**: `pk_test_51SIKsaFvnCBKZeBhDFs8S355lSQMKtYbexoeIqFZUHxBHkpCILIOwHjiNCiJvO94JdZjX9q1qrcpn8kI1NSMP458001L2lupES`

## 🔍 What You Still Need

### 1. Secret Key
1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy the **Secret Key** (starts with `sk_test_`)
3. Keep this private - never share it publicly!

### 2. Webhook Secret
1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set URL: `https://noir-shop.vercel.app/api/stripe/webhook`
4. Select events: `payment_intent.succeeded` and `payment_intent.payment_failed`
5. Copy the **Webhook Secret** (starts with `whsec_`)

### 3. Email Setup (for notifications)
You'll need a Gmail account for order notifications:

1. **Enable 2-Factor Authentication** on your Gmail
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Copy the 16-character password

## 🚀 Quick Setup Options

### Option A: Use the Setup Page
1. Go to: `https://noir-shop.vercel.app/setup`
2. Enter your Stripe keys
3. Configure email
4. Copy the generated configuration

### Option B: Manual Setup
Create a file called `.env.local` in your project root:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SIKsaFvnCBKZeBhDFs8S355lSQMKtYbexoeIqFZUHxBHkpCILIOwHjiNCiJvO94JdZjX9q1qrcpn8kI1NSMP458001L2lupES
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_FROM=your_email@gmail.com
BUSINESS_EMAIL=your_email@gmail.com

# NextAuth Configuration
NEXTAUTH_URL=https://noir-shop.vercel.app
NEXTAUTH_SECRET=generate_a_random_string_here
```

## 🎯 Next Steps

1. **Get your Secret Key** from Stripe dashboard
2. **Set up webhook** with the URL above
3. **Configure email** (Gmail recommended)
4. **Create .env.local** file with your keys
5. **Redeploy** your site

## 💰 How You Get Paid

Once set up:
- ✅ **Real payments** processed through Stripe
- ✅ **Instant notifications** to your email
- ✅ **Automatic payouts** to your bank account
- ✅ **Customer confirmations** sent automatically

## 🧪 Test Your Setup

Use this test card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

---

**You're almost ready to start accepting real payments!** 🚀




