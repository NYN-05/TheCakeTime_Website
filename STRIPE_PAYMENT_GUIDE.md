# Stripe Payment Integration Guide

## Overview

TheCakeTime now supports online payments through Stripe, allowing customers to purchase cakes securely with credit/debit cards.

---

## Features

✅ **Secure Payment Processing** - PCI-compliant Stripe integration  
✅ **Shopping Cart** - Add multiple items, adjust quantities  
✅ **Customer Details** - Collect delivery information  
✅ **Order Management** - Track orders in database  
✅ **Payment Verification** - Server-side payment confirmation  
✅ **Order Success Page** - Beautiful confirmation with order details  
✅ **Cart Persistence** - Cart saved in localStorage  
✅ **Real-time Cart Count** - Badge shows items in header  

---

## Setup Instructions

### 1. Get Stripe API Keys

1. Sign up at [https://stripe.com](https://stripe.com)
2. Go to **Developers → API Keys**
3. Copy your **Publishable key** and **Secret key**
4. For testing, use **Test mode** keys (start with `pk_test_` and `sk_test_`)

### 2. Configure Environment Variables

Update `.env` file in the project root:

```env
# Stripe Payment Configuration
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE

# Frontend URL (for Stripe redirects)
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Install Dependencies (Already Done)

```bash
# Frontend packages
npm install @stripe/stripe-js @stripe/react-stripe-js

# Backend package
cd backend
npm install stripe
```

### 4. Start Servers

```bash
# Terminal 1 - Backend
cd bakery-website/backend
npm run dev

# Terminal 2 - Frontend
cd bakery-website
npm run dev
```

---

## How It Works

### Customer Flow

1. **Browse Products** → Customer views cakes on `/products`
2. **Add to Cart** → Click "Add to Cart" on product details page
3. **View Cart** → Cart icon in header shows item count
4. **Checkout** → Click cart icon or visit `/checkout`
5. **Enter Details** → Fill customer and delivery information
6. **Payment** → Enter card details (Stripe hosted form)
7. **Confirmation** → Order created, payment verified, success page shown

### Payment Flow Diagram

```
Customer                 Frontend                Backend                 Stripe
   |                        |                      |                       |
   |--Browse Products------>|                      |                       |
   |                        |                      |                       |
   |--Add to Cart---------->|                      |                       |
   |  (stored locally)      |                      |                       |
   |                        |                      |                       |
   |--Proceed to Checkout-->|                      |                       |
   |                        |                      |                       |
   |--Enter Details-------->|                      |                       |
   |                        |                      |                       |
   |--Proceed to Payment--->|--Create Payment----->|--Create Payment------>|
   |                        |  Intent Request      |  Intent               |
   |                        |<-Client Secret-------|<-Client Secret--------|
   |                        |                      |                       |
   |--Enter Card Details--->|                      |                       |
   |                        |                      |                       |
   |--Submit Payment------->|--Confirm Payment---->|--Process Payment----->|
   |                        |                      |                       |
   |                        |<-Payment Success-----|<-Payment Confirmed----|
   |                        |                      |                       |
   |                        |--Verify & Create---->|                       |
   |                        |  Order               |                       |
   |                        |<-Order Created-------|                       |
   |                        |                      |                       |
   |<-Redirect to Success---|                      |                       |
   |                        |                      |                       |
```

---

## API Endpoints

### 1. Create Payment Intent

**Endpoint:** `POST /api/payment/create-payment-intent`

**Request Body:**
```json
{
  "amount": 1500,
  "currency": "inr",
  "orderData": {
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210"
    },
    "delivery": {
      "address": "123 Main St",
      "city": "Mumbai",
      "pincode": "400001",
      "date": "2025-12-10",
      "time": "14:00-16:00"
    },
    "items": [...]
  }
}
```

**Response:**
```json
{
  "clientSecret": "pi_xxx_secret_yyy",
  "paymentIntentId": "pi_xxx"
}
```

### 2. Verify Payment

**Endpoint:** `POST /api/payment/verify-payment`

**Request Body:**
```json
{
  "paymentIntentId": "pi_xxx",
  "orderData": { ... }
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_id",
    "orderNumber": "ABC12345",
    "status": "confirmed",
    "payment": { ... }
  }
}
```

### 3. Get Order Details

**Endpoint:** `GET /api/payment/order/:orderId`

**Response:**
```json
{
  "order": {
    "_id": "order_id",
    "customer": { ... },
    "items": [ ... ],
    "delivery": { ... },
    "payment": { ... },
    "status": "confirmed"
  }
}
```

### 4. Stripe Webhook (for production)

**Endpoint:** `POST /api/payment/webhook`

**Headers:** `stripe-signature`

Handles events:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `checkout.session.completed`

---

## Database Schema

### Order Model

```javascript
{
  customer: {
    name: String,
    email: String,
    phone: String
  },
  items: [{
    product: {
      id: Number,
      name: String,
      image: String
    },
    quantity: Number,
    price: Number,
    weight: String,
    message: String
  }],
  delivery: {
    address: String,
    city: String,
    pincode: String,
    date: Date,
    time: String
  },
  payment: {
    method: String, // 'card', 'upi', 'cash'
    status: String, // 'pending', 'paid', 'failed', 'refunded'
    stripePaymentIntentId: String,
    amount: Number,
    currency: String
  },
  status: String, // 'pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'
  createdAt: Date,
  updatedAt: Date
}
```

---

## Testing

### Test Card Numbers (Stripe Test Mode)

| Card Number          | Description                  |
|---------------------|------------------------------|
| 4242 4242 4242 4242 | Successful payment           |
| 4000 0025 0000 3155 | Requires authentication (3D Secure) |
| 4000 0000 0000 9995 | Declined (insufficient funds)|
| 4000 0000 0000 0002 | Declined (generic decline)   |

**Expiry:** Any future date (e.g., 12/30)  
**CVC:** Any 3 digits (e.g., 123)  
**ZIP:** Any 5 digits (e.g., 12345)

### Testing Flow

1. Add products to cart
2. Proceed to checkout
3. Enter customer details:
   - Name: Test User
   - Email: test@example.com
   - Phone: 1234567890
4. Enter delivery details
5. Use test card: `4242 4242 4242 4242`
6. Complete payment
7. Verify order created in database

---

## Pages & Components

### Pages

1. **`/checkout`** - Complete checkout flow with 3 steps
   - Step 1: Shopping cart
   - Step 2: Customer and delivery details
   - Step 3: Payment (Stripe Elements)

2. **`/order-success`** - Order confirmation page
   - Shows order number
   - Displays order details
   - Order status tracking

3. **`/products/[id]`** - Product detail page
   - Add to cart functionality
   - Weight selection
   - Custom message input

### Components

1. **`CheckoutForm.tsx`** - Stripe payment form
   - PaymentElement integration
   - Payment confirmation
   - Error handling

2. **`Header.tsx`** - Updated with cart badge
   - Shows cart item count
   - Links to checkout

3. **`CartContext.tsx`** - Cart state management
   - Add/remove items
   - Update quantities
   - Persist to localStorage

---

## Security Features

✅ **PCI Compliance** - No card details stored on your server  
✅ **Stripe.js Tokenization** - Cards tokenized before transmission  
✅ **HTTPS Required** - All payment data encrypted in transit  
✅ **Server-side Verification** - Payment status verified on backend  
✅ **Webhook Signatures** - Stripe events cryptographically signed  
✅ **Amount Validation** - Server validates payment amounts  

---

## Production Checklist

Before going live:

- [ ] Replace test API keys with live keys
- [ ] Set up Stripe webhooks in dashboard
- [ ] Add webhook endpoint: `https://yourdomain.com/api/payment/webhook`
- [ ] Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
- [ ] Update `FRONTEND_URL` in .env
- [ ] Enable 3D Secure for Indian cards (required by RBI)
- [ ] Set up proper error logging
- [ ] Add email notifications for orders
- [ ] Test with real card in test mode first
- [ ] Configure business settings in Stripe dashboard
- [ ] Add refund functionality (admin panel)

---

## Currency & Pricing

- **Currency:** INR (Indian Rupees)
- **Amount Format:** Stripe expects amounts in paise (smallest unit)
  - ₹100 = 10000 paise
  - Conversion: `amount * 100`
- **Display Format:** ₹ symbol with comma separators (e.g., ₹1,500)

---

## Common Issues & Solutions

### Issue: "Stripe has not been initialized"
**Solution:** Check `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set in `.env`

### Issue: Payment fails with "Invalid API Key"
**Solution:** Verify `STRIPE_SECRET_KEY` in backend `.env` file

### Issue: Cart not persisting
**Solution:** Check localStorage is enabled in browser

### Issue: Webhook events not received
**Solution:** 
- For local testing, use Stripe CLI: `stripe listen --forward-to localhost:5000/api/payment/webhook`
- For production, configure webhook in Stripe dashboard

### Issue: Order not created after payment
**Solution:** Check backend logs, verify MongoDB connection, ensure payment verification endpoint is working

---

## Monitoring & Analytics

### Stripe Dashboard

View real-time data:
- Total payments
- Success/failure rates
- Payment methods used
- Customer details
- Refunds and disputes

### MongoDB Orders

Query orders:
```javascript
// Get all paid orders
db.orders.find({ "payment.status": "paid" })

// Get orders by status
db.orders.find({ "status": "confirmed" })

// Get recent orders
db.orders.find().sort({ createdAt: -1 }).limit(10)
```

---

## Future Enhancements

- [ ] UPI payment support
- [ ] Cash on delivery option
- [ ] Saved payment methods
- [ ] Subscription for regular orders
- [ ] Gift cards and coupons
- [ ] Split payments
- [ ] Invoice generation (PDF)
- [ ] Email order confirmations
- [ ] SMS notifications
- [ ] Order tracking page
- [ ] Admin order management dashboard

---

## Support & Documentation

- **Stripe Docs:** https://stripe.com/docs
- **Stripe.js Reference:** https://stripe.com/docs/js
- **React Stripe Elements:** https://stripe.com/docs/stripe-js/react
- **Stripe Testing:** https://stripe.com/docs/testing

---

## Contact

For payment integration issues:
- Check Stripe dashboard logs
- Review backend server logs
- Contact: support@thecaketime.com

**Last Updated:** December 3, 2025
