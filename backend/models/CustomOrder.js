const mongoose = require('mongoose')

const customOrderSchema = new mongoose.Schema({
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  cakeDetails: {
    type: {
      type: String,
      required: true,
      enum: ['regular', 'photo', 'tiered', 'designer']
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
      required: true
    },
    theme: String,
    message: String
  },
  delivery: {
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  referenceImage: {
    type: String
  },
  additionalNotes: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  estimatedPrice: {
    type: Number
  },
  finalPrice: {
    type: Number
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('CustomOrder', customOrderSchema)
