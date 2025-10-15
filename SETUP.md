# Kryptic Studios - E-commerce Setup Guide

## 🔐 Password Protection
The site is now protected with password: `M@sonio!1`

## 🚀 Features Implemented

### ✅ Core E-commerce Features
- **Password Protection** - Site requires password to access
- **Stripe Payment Processing** - Secure checkout with real payment processing
- **User Authentication** - Sign up/Sign in with email or Google
- **Order Management** - Complete order tracking and history
- **Product Database** - Full product management with variants
- **Email Notifications** - Order confirmations and updates
- **Shopping Cart** - Persistent cart with localStorage
- **Responsive Design** - Mobile-first approach

### 🛠 Technical Stack
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **NextAuth.js** - Authentication
- **Stripe** - Payment processing
- **Framer Motion** - Animations

## 📋 Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/kryptic_studios?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"
STRIPE_SECRET_KEY="sk_test_your_secret_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"

# Email (using Gmail SMTP)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="your-email@gmail.com"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Database Setup
1. Install PostgreSQL
2. Create a database named `kryptic_studios`
3. Run Prisma migrations:
```bash
npx prisma migrate dev
npx prisma generate
```

### 3. Stripe Setup
1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Set up webhooks pointing to `/api/stripe/webhook`
4. Add the webhook secret to your environment variables

### 4. Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Use the App Password in your environment variables

### 5. Run the Application
```bash
npm run dev
```

## 🎯 Key Features

### Password Protection
- Site requires password `M@sonio!1` to access
- Stored in localStorage for session persistence
- Dark, edgy authentication UI

### Stripe Integration
- Secure payment processing
- Real-time payment confirmation
- Webhook handling for order updates
- Support for multiple payment methods

### User Authentication
- Email/password registration and login
- Google OAuth integration
- Session management with NextAuth.js
- Protected routes and API endpoints

### Order Management
- Complete order lifecycle tracking
- Order history for authenticated users
- Real-time inventory updates
- Email confirmations

### Product Management
- Full product database with variants
- Image management
- Inventory tracking
- Category organization

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order

### Stripe
- `POST /api/stripe/create-payment-intent` - Create payment intent
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## 📱 Pages

### Public Pages
- `/` - Homepage with password protection
- `/hoodies` - Product catalog
- `/tees` - T-shirt collection
- `/accessories` - Accessories
- `/about` - About page
- `/contact` - Contact information

### Protected Pages
- `/cart` - Shopping cart
- `/checkout` - Checkout with Stripe
- `/orders` - Order history (requires auth)
- `/auth/signin` - Sign in page
- `/auth/signup` - Registration page

## 🎨 Design Features

### Dark Theme
- Black background with red accents
- Gothic, underground aesthetic
- Animated background effects
- Smooth transitions and animations

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Fast loading times

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

### Other Platforms
- Ensure PostgreSQL database is available
- Set up Stripe webhooks
- Configure email service
- Update environment variables

## 🔒 Security Features

- Password protection for site access
- Secure authentication with NextAuth.js
- Encrypted password storage with bcrypt
- Stripe's PCI-compliant payment processing
- CSRF protection
- Input validation and sanitization

## 📊 Database Schema

### Key Models
- **User** - User accounts and authentication
- **Product** - Product catalog with variants
- **Order** - Order management and tracking
- **Payment** - Payment processing records
- **Review** - Product reviews and ratings
- **Wishlist** - User wishlists

## 🎯 Next Steps

### Immediate
1. Set up your database
2. Configure Stripe account
3. Set up email service
4. Deploy to production

### Future Enhancements
- Admin dashboard for product management
- Advanced analytics and reporting
- Mobile app development
- Multi-language support
- Advanced search and filtering
- Social media integration

## 🆘 Troubleshooting

### Common Issues
1. **Database connection errors** - Check DATABASE_URL
2. **Stripe errors** - Verify API keys and webhook setup
3. **Email not sending** - Check Gmail app password
4. **Authentication issues** - Verify NEXTAUTH_SECRET

### Support
- Check the console for error messages
- Verify all environment variables are set
- Ensure database is running and accessible
- Test Stripe webhooks in development mode

---

**Welcome to the KRYPTIC underground! 🔥**
