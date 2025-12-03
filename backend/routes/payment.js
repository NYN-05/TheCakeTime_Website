const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'inr', orderData } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to smallest currency unit (paise for INR)
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customerName: orderData?.customer?.name || 'Guest',
        customerEmail: orderData?.customer?.email || '',
        orderItems: JSON.stringify(orderData?.items || []),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create checkout session (alternative method)
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, customer, delivery } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    // Convert items to Stripe line items
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.product.name,
          description: `Weight: ${item.weight || 'N/A'}`,
          images: item.product.image ? [item.product.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Convert to paise
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout?cancelled=true`,
      customer_email: customer?.email,
      metadata: {
        customerName: customer?.name || '',
        customerPhone: customer?.phone || '',
        deliveryAddress: delivery?.address || '',
        deliveryCity: delivery?.city || '',
        deliveryPincode: delivery?.pincode || '',
        deliveryDate: delivery?.date || '',
        deliveryTime: delivery?.time || '',
      },
    });

    res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout session creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify payment and create order
router.post('/verify-payment', async (req, res) => {
  try {
    const { paymentIntentId, orderData } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: 'Payment intent ID required' });
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not completed', status: paymentIntent.status });
    }

    // Create order in database
    const order = new Order({
      ...orderData,
      payment: {
        ...orderData.payment,
        status: 'paid',
        stripePaymentIntentId: paymentIntentId,
        amount: paymentIntent.amount / 100, // Convert back to rupees
      },
      status: 'confirmed',
    });

    await order.save();

    res.json({
      success: true,
      order: {
        id: order._id,
        orderNumber: order._id.toString().slice(-8).toUpperCase(),
        status: order.status,
        payment: order.payment,
      },
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get payment status
router.get('/payment-status/:paymentIntentId', async (req, res) => {
  try {
    const { paymentIntentId } = req.params;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    console.error('Payment status error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent.id);
      // Update order status in database
      await Order.findOneAndUpdate(
        { 'payment.stripePaymentIntentId': paymentIntent.id },
        { 
          'payment.status': 'paid',
          status: 'confirmed',
        }
      );
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      await Order.findOneAndUpdate(
        { 'payment.stripePaymentIntentId': failedPayment.id },
        { 'payment.status': 'failed' }
      );
      break;

    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Checkout session completed:', session.id);
      // Create order from checkout session
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Get order by ID
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all orders for a user
router.get('/orders/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
