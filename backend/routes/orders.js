const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const { sendEmail } = require('../utils/emailService')
const { orderSchema, validate } = require('../utils/validators')

// Get all orders (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { status, userId, email, page = 1, limit = 20 } = req.query
    let query = {}
    
    if (status) query.status = status
    if (userId) query.userId = userId
    if (email) query['customer.email'] = email
    
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Order.countDocuments(query)
    ])
    
    res.json({ 
      orders, 
      count: orders.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit))
    })
  } catch (error) {
    console.error('Get orders error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    
    res.json({ order })
  } catch (error) {
    console.error('Get order error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Create new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body)
    await order.save()
    
    // Send confirmation email to customer
    sendEmail(order.customer.email, 'orderConfirmation', order)
    
    // Send notification to admin
    if (process.env.ADMIN_EMAIL) {
      sendEmail(process.env.ADMIN_EMAIL, 'adminNewOrder', order)
    }
    
    res.status(201).json({
      success: true,
      order: {
        id: order._id,
        orderNumber: order._id.toString().slice(-8).toUpperCase(),
        status: order.status,
      },
    })
  } catch (error) {
    console.error('Create order error:', error)
    res.status(400).json({ error: error.message })
  }
})

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    const validStatuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    )
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    
    // Send status update email to customer
    sendEmail(order.customer.email, 'orderStatusUpdate', order, status)
    
    res.json({ success: true, order })
  } catch (error) {
    console.error('Update order error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Delete order (soft delete - mark as cancelled)
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', updatedAt: Date.now() },
      { new: true }
    )
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    
    res.json({ success: true, message: 'Order cancelled' })
  } catch (error) {
    console.error('Cancel order error:', error)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
