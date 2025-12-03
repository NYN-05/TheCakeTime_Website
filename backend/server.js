require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

// Import routes
const authRoutes = require('./routes/auth')
const adminAuthRoutes = require('./routes/adminAuth')
const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/orders')
const reviewRoutes = require('./routes/reviews')
const customOrderRoutes = require('./routes/customOrders')
const paymentRoutes = require('./routes/payment')

const app = express()

// Security middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use('/api/', limiter)

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bakery')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err))

// Routes
app.use('/api/auth', authRoutes) // Customer authentication only
app.use('/api/admin/auth', adminAuthRoutes) // Admin authentication only
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/custom-orders', customOrderRoutes)
app.use('/api/payment', paymentRoutes) // Payment routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
