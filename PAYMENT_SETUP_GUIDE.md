# 💳 Payment & Notification Setup Guide

## 🚀 Quick Setup (5 minutes)

### 1. Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete business verification
3. Get your API keys from the dashboard

### 2. Get Your Stripe Keys
1. Go to [Stripe Dashboard > Developers > API Keys](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable Key** (starts with `pk_test_`)
3. Copy your **Secret Key** (starts with `sk_test_`)

### 3. Set Up Webhooks
1. Go to [Stripe Dashboard > Developers > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set URL to: `https://noir-shop.vercel.app/api/stripe/webhook`
4. Select events: `payment_intent.succeeded` and `payment_intent.payment_failed`
5. Copy the **Webhook Secret** (starts with `whsec_`)

### 4. Set Up Email Notifications
1. Use Gmail (recommended for simplicity)
2. Enable 2-factor authentication on your Gmail account
3. Generate an "App Password":
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"

### 5. Create Environment File
Create a file called `.env.local` in your project root with:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
EMAIL_FROM=your_email@gmail.com

# Your business email (where you want notifications)
BUSINESS_EMAIL=your_business_email@gmail.com

# NextAuth Configuration
NEXTAUTH_URL=https://noir-shop.vercel.app
NEXTAUTH_SECRET=generate_a_random_string_here

# Database (optional - for order tracking)
DATABASE_URL=your_database_url_here
```

## 🔧 Advanced Setup

### Real Database (Optional)
If you want to track orders in a database:
1. Set up a PostgreSQL database (recommended: [Supabase](https://supabase.com) or [Railway](https://railway.app))
2. Add the database URL to your `.env.local`
3. Run `npx prisma db push` to create tables

### Custom Domain (Optional)
1. Buy a domain from [Namecheap](https://namecheap.com) or [GoDaddy](https://godaddy.com)
2. Point it to your Vercel deployment
3. Update `NEXTAUTH_URL` in your environment variables

## 💰 How You Get Paid

### Stripe Payouts
- **Automatic**: Stripe automatically transfers money to your bank account
- **Schedule**: Daily, weekly, or monthly (your choice)
- **Fees**: 2.9% + $0.30 per transaction
- **Minimum**: $1 payout threshold

### When You Get Paid
- **Test Mode**: No real money (for testing)
- **Live Mode**: Real payments, deposited to your bank account
- **Timeline**: 2-7 business days after sale

## 📧 Email Notifications

### What You'll Receive
1. **Order Alert**: Immediate notification when someone buys
2. **Customer Details**: Name, email, shipping address
3. **Order Summary**: Items, quantities, total amount
4. **Payment Info**: Transaction ID, amount paid

### What Customers Receive
1. **Order Confirmation**: Immediate confirmation email
2. **Order Details**: What they bought and total paid
3. **Next Steps**: When to expect shipping info

## 🛡️ Security Features

### Payment Security
- ✅ PCI DSS compliant (handled by Stripe)
- ✅ 256-bit SSL encryption
- ✅ Fraud detection
- ✅ 3D Secure authentication

### Data Protection
- ✅ Customer data encrypted
- ✅ No card numbers stored on your server
- ✅ GDPR compliant
- ✅ Secure webhook verification

## 🚨 Important Notes

### Before Going Live
1. **Test Everything**: Use test mode first
2. **Verify Webhooks**: Make sure notifications work
3. **Check Email**: Ensure you receive order alerts
4. **Test Payments**: Try buying something yourself

### Legal Requirements
1. **Business License**: Make sure you have proper business registration
2. **Tax ID**: You'll need this for Stripe
3. **Terms of Service**: Add to your website
4. **Privacy Policy**: Required for GDPR compliance

## 🆘 Troubleshooting

### Common Issues
1. **Webhook not working**: Check URL and secret key
2. **Emails not sending**: Verify Gmail app password
3. **Payment failing**: Check Stripe dashboard for errors
4. **Database errors**: Ensure DATABASE_URL is correct

### Support
- **Stripe Support**: [support.stripe.com](https://support.stripe.com)
- **Vercel Support**: [vercel.com/help](https://vercel.com/help)
- **Email Issues**: Check Gmail settings and app password

## 📊 Monitoring

### Stripe Dashboard
- View all transactions
- Monitor failed payments
- Track payout schedule
- Access detailed reports

### Email Logs
- Check your email for order notifications
- Monitor customer confirmations
- Verify all orders are being processed

## 🎯 Next Steps

1. **Set up your environment variables**
2. **Test with a small purchase**
3. **Verify you receive notifications**
4. **Start selling!**

---

**Need help?** Check the troubleshooting section or reach out for support!



