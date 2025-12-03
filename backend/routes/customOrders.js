const express = require('express')
const router = express.Router()
const CustomOrder = require('../models/CustomOrder')
const { authenticate, authorize } = require('../middleware/auth')

// Create custom order
router.post('/', async (req, res) => {
  try {
    const customOrder = new CustomOrder(req.body)
    await customOrder.save()
    
    // Here you would send email notification to admin
    
    res.status(201).json({
      message: 'Custom order submitted successfully',
      order: customOrder
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get all custom orders (Admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.query
    let query = {}
    
    if (status) query.status = status
    
    const orders = await CustomOrder.find(query).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single custom order
router.get('/:id', async (req, res) => {
  try {
    const order = await CustomOrder.findById(req.params.id)
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    
    res.json(order)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update custom order status (Admin only)
router.patch('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { status, estimatedPrice, finalPrice } = req.body
    
    const order = await CustomOrder.findByIdAndUpdate(
      req.params.id,
      { status, estimatedPrice, finalPrice },
      { new: true, runValidators: true }
    )
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    
    res.json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
