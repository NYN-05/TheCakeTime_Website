const express = require('express')
const router = express.Router()
const Review = require('../models/Review')
const Product = require('../models/Product')
const { authenticate, authorize } = require('../middleware/auth')

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ 
      product: req.params.productId,
      approved: true 
    })
    .populate('user', 'name')
    .sort({ createdAt: -1 })
    
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create review
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body)
    await review.save()
    
    // Update product rating
    const reviews = await Review.find({ product: review.product, approved: true })
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    
    await Product.findByIdAndUpdate(review.product, {
      rating: avgRating,
      $push: { reviews: review._id }
    })
    
    res.status(201).json({
      message: 'Review submitted for approval',
      review
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Approve review (Admin only)
router.patch('/:id/approve', authenticate, authorize('admin'), async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    )
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' })
    }
    
    res.json(review)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get all reviews (Admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('product', 'name')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
    
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete review (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id)
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' })
    }
    
    res.json({ message: 'Review deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
