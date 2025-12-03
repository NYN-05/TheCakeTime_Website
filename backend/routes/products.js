const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { authenticate, authorize } = require('../middleware/auth')

// Get all products with filtering and sorting
router.get('/', async (req, res) => {
  try {
    const { category, flavor, weight, occasion, eggless, sort, search } = req.query
    
    let query = {}
    
    if (category) query.category = category
    if (flavor) query.flavor = flavor
    if (weight) query.weight = weight
    if (occasion) query.occasion = occasion
    if (eggless !== undefined) query.eggless = eggless === 'true'
    if (search) query.name = { $regex: search, $options: 'i' }
    
    let sortOptions = {}
    if (sort === 'price-low') sortOptions.price = 1
    else if (sort === 'price-high') sortOptions.price = -1
    else if (sort === 'rating') sortOptions.rating = -1
    else sortOptions.createdAt = -1
    
    const products = await Product.find(query)
      .sort(sortOptions)
      .populate('reviews')
    
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: 'reviews',
        populate: { path: 'user', select: 'name' }
      })
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create product (Admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update product (Admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete product (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
