const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['birthday', 'wedding', 'anniversary', 'custom', 'pastries', 'seasonal']
  },
  flavor: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  shape: {
    type: String,
    default: 'round'
  },
  occasion: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  eggless: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
