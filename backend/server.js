require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

// Import routes
const authRoutes = require('./routes/auth')
const adminAuthRoutes = require('./routes/adminAuth')
const adminRoutes = require('./routes/admin')
const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/orders')
const reviewRoutes = require('./routes/reviews')
const customOrderRoutes = require('./routes/customOrders')
const paymentRoutes = require('./routes/payment')
const searchRoutes = require('./routes/search')

const app = express()

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging in development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`)
    next()
  })
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
})

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 login attempts per 15 minutes
  message: { error: 'Too many login attempts, please try again later.' }
})

app.use('/api/', limiter)
app.use('/api/auth/login', authLimiter)
app.use('/api/admin/auth/login', authLimiter)

// MongoDB connection with retry logic
let dbConnected = false
let retryCount = 0
const MAX_RETRIES = 3

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bakery', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    })
    dbConnected = true
    retryCount = 0
    console.log(`✅ MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    dbConnected = false
    retryCount++
    
    if (retryCount <= MAX_RETRIES) {
      console.log(`⚠️  MongoDB connection attempt ${retryCount}/${MAX_RETRIES} failed`)
      console.log('   Retrying in 5 seconds...')
      setTimeout(connectDB, 5000)
    } else {
      console.log('')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('⚠️  MongoDB not available - Running in LIMITED MODE')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('')
      console.log('   The API will return mock/demo data.')
      console.log('   To enable full functionality:')
      console.log('')
      console.log('   Option 1: Install MongoDB locally')
      console.log('   Option 2: Use MongoDB Atlas (free cloud)')
      console.log('             Update MONGODB_URI in .env file')
      console.log('')
    }
  }
}

// Make db status available to routes
app.use((req, res, next) => {
  req.dbConnected = dbConnected
  next()
})
connectDB()

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected')
})

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err)
})

// Routes
app.use('/api/auth', authRoutes) // Customer authentication only
app.use('/api/admin/auth', adminAuthRoutes) // Admin authentication only
app.use('/api/admin', adminRoutes) // Admin dashboard routes
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/custom-orders', customOrderRoutes)
app.use('/api/payment', paymentRoutes) // Payment routes
app.use('/api/search', searchRoutes) // Search routes

// Health check with detailed status
app.get('/api/health', async (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    mongodb: mongoStatus,
    mode: mongoStatus === 'connected' ? 'full' : 'limited',
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders', 
      search: '/api/search',
      auth: '/api/auth',
      admin: '/api/admin'
    }
  })
})

// Demo/mock data endpoint when DB is not connected
app.get('/api/demo/products', (req, res) => {
  res.json({
    message: 'Demo products (MongoDB not connected)',
    products: [
      { id: 1, name: 'Chocolate Truffle Cake', price: 899, category: 'birthday', rating: 4.8, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
      { id: 2, name: 'Red Velvet Delight', price: 799, category: 'anniversary', rating: 4.9, image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400' },
      { id: 3, name: 'Vanilla Dream', price: 699, category: 'birthday', rating: 4.7, image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400' },
      { id: 4, name: 'Black Forest Classic', price: 849, category: 'custom', rating: 4.8, image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400' },
      { id: 5, name: 'Strawberry Bliss', price: 749, category: 'pastries', rating: 4.6, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400' },
      { id: 6, name: 'Mango Mousse', price: 899, category: 'seasonal', rating: 4.9, image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=400' }
    ]
  })
})

// 404 handler
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' })
})

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack)
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ error: 'Validation failed', details: errors })
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(400).json({ error: `${field} already exists` })
  }
  
  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' })
  }
  
  // JWT expired
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' })
  }
  
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  await mongoose.connection.close()
  console.log('MongoDB connection closed.')
  process.exit(0)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`)
})
