const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Admin-only secret key (should be different from customer JWT secret in production)
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'admin-super-secret-key-change-in-production'

// Admin Login - ONLY allows admin/staff accounts
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Find user and verify it's an admin or staff member
    const user = await User.findOne({ 
      email, 
      role: { $in: ['admin', 'staff'] } 
    })
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid admin credentials' })
    }
    
    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid admin credentials' })
    }
    
    // Generate admin token with separate secret
    const token = jwt.sign(
      { userId: user._id, role: user.role, isAdmin: true },
      ADMIN_JWT_SECRET,
      { expiresIn: '8h' } // Shorter expiry for admin sessions
    )
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Create Admin User - Protected route, only existing admins can create new admins
router.post('/create-admin', async (req, res) => {
  try {
    // Verify admin token
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }
    
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET)
    const requestingUser = await User.findById(decoded.userId)
    
    if (!requestingUser || requestingUser.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can create admin accounts' })
    }
    
    // Create new admin/staff user
    const { name, email, password, phone, role } = req.body
    
    if (!['admin', 'staff'].includes(role)) {
      return res.status(400).json({ error: 'Role must be admin or staff' })
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }
    
    // Create admin user
    const user = new User({ 
      name, 
      email, 
      password, 
      phone,
      role // admin or staff
    })
    await user.save()
    
    res.status(201).json({
      message: 'Admin user created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' })
    }
    res.status(400).json({ error: error.message })
  }
})

// Get current admin user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }
    
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET)
    const user = await User.findById(decoded.userId).select('-password')
    
    if (!user || !['admin', 'staff'].includes(user.role)) {
      return res.status(404).json({ error: 'Admin user not found' })
    }
    
    res.json(user)
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

// Admin logout (optional - mainly for client-side token clearing)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

module.exports = router
