const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Customer authentication middleware
const authenticateCustomer = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    const user = await User.findById(decoded.userId)
    
    if (!user || user.role !== 'customer') {
      return res.status(401).json({ error: 'Invalid customer credentials' })
    }
    
    req.user = user
    req.userId = user._id
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Admin authentication middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: 'Admin authentication required' })
    }
    
    const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'admin-super-secret-key-change-in-production'
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET)
    const user = await User.findById(decoded.userId)
    
    if (!user || !['admin', 'staff'].includes(user.role)) {
      return res.status(401).json({ error: 'Invalid admin credentials' })
    }
    
    req.user = user
    req.userId = user._id
    req.isAdmin = true
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid admin token' })
  }
}

// Admin authorization - check specific roles
const authorizeAdmin = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied - insufficient permissions' })
    }
    next()
  }
}

module.exports = { 
  authenticateCustomer, 
  authenticateAdmin, 
  authorizeAdmin,
  // Keep old exports for backward compatibility temporarily
  authenticate: authenticateCustomer,
  authorize: authorizeAdmin
}
