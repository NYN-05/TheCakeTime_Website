const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Customer Register - ONLY creates customer accounts
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body
    
    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }
    
    // Create customer user - FORCE role to be 'customer'
    const user = new User({ 
      name, 
      email, 
      password, 
      phone,
      role: 'customer' // Always customer for this route
    })
    await user.save()
    
    // Generate token with customer role
    const token = jwt.sign(
      { userId: user._id, role: 'customer' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: 'customer'
      }
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Customer Login - ONLY allows customer accounts
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Find user and verify it's a customer
    const user = await User.findOne({ email, role: 'customer' })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    
    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: 'customer' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: 'customer'
      }
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    const user = await User.findById(decoded.userId).select('-password')
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

module.exports = router
