const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String },
  },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  weight: { type: String },
  message: { type: String },
  customizations: { type: String },
});

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  items: [orderItemSchema],
  delivery: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  },
  payment: {
    method: { type: String, enum: ['card', 'upi', 'cash'], default: 'card' },
    status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    stripePaymentIntentId: { type: String },
    stripeSessionId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'inr' },
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending',
  },
  notes: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', orderSchema);
