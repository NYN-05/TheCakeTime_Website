const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Authenticate JWT token
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    const user = await User.findById(decoded.userId)
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }
    
    req.user = user
    req.userId = user._id
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Authorize user role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' })
    }
    next()
  }
}

module.exports = { authenticate, authorize }
