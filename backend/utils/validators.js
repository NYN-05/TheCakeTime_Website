const Joi = require('joi')

// User validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 50 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).max(100).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required'
  }),
  phone: Joi.string().pattern(/^[0-9]{10}$/).messages({
    'string.pattern.base': 'Phone number must be 10 digits'
  })
})

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
})

// Product validation schema
const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().valid('birthday', 'wedding', 'anniversary', 'custom', 'pastries', 'seasonal').required(),
  flavor: Joi.string().required(),
  weight: Joi.string().required(),
  shape: Joi.string().default('round'),
  occasion: Joi.string().required(),
  ingredients: Joi.string().required(),
  image: Joi.string().uri().required(),
  images: Joi.array().items(Joi.string().uri()),
  eggless: Joi.boolean().default(false),
  inStock: Joi.boolean().default(true),
  featured: Joi.boolean().default(false),
  tags: Joi.array().items(Joi.string())
})

// Order validation schema
const orderSchema = Joi.object({
  customer: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required()
  }).required(),
  items: Joi.array().items(
    Joi.object({
      product: Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        image: Joi.string()
      }).required(),
      quantity: Joi.number().min(1).required(),
      price: Joi.number().min(0).required(),
      weight: Joi.string(),
      message: Joi.string().max(200),
      customizations: Joi.string().max(500)
    })
  ).min(1).required(),
  delivery: Joi.object({
    address: Joi.string().min(10).max(200).required(),
    city: Joi.string().required(),
    pincode: Joi.string().pattern(/^[0-9]{6}$/).required(),
    date: Joi.date().min('now').required(),
    time: Joi.string().required()
  }).required(),
  payment: Joi.object({
    method: Joi.string().valid('card', 'upi', 'cash').default('card'),
    amount: Joi.number().min(0).required()
  }).required(),
  notes: Joi.string().max(500)
})

// Custom order validation schema
const customOrderSchema = Joi.object({
  customer: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required()
  }).required(),
  cakeDetails: Joi.object({
    type: Joi.string().valid('regular', 'photo', 'tiered', 'designer').required(),
    flavor: Joi.string().required(),
    weight: Joi.string().required(),
    shape: Joi.string().required(),
    theme: Joi.string().max(100),
    message: Joi.string().max(200)
  }).required(),
  delivery: Joi.object({
    date: Joi.date().min('now').required(),
    time: Joi.string().required()
  }).required(),
  referenceImage: Joi.string().uri(),
  additionalNotes: Joi.string().max(500)
})

// Review validation schema
const reviewSchema = Joi.object({
  product: Joi.string().required(),
  name: Joi.string().min(2).max(50).required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().min(10).max(500).required()
})

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false })
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors 
      })
    }
    
    req.body = value // Use sanitized values
    next()
  }
}

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  orderSchema,
  customOrderSchema,
  reviewSchema,
  validate
}
