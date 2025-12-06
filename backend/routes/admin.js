const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const CustomOrder = require('../models/CustomOrder')
const Product = require('../models/Product')
const User = require('../models/User')
const Review = require('../models/Review')
const jwt = require('jsonwebtoken')

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'admin-super-secret-key-change-in-production'

// Admin authentication middleware
const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }
    
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET)
    const user = await User.findById(decoded.userId)
    
    if (!user || !['admin', 'staff'].includes(user.role)) {
      return res.status(403).json({ error: 'Admin access required' })
    }
    
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Dashboard Statistics
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)

    // Order statistics
    const [
      totalOrders,
      todayOrders,
      monthOrders,
      lastMonthOrders,
      pendingOrders,
      preparingOrders,
      deliveryOrders,
      completedOrders
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.countDocuments({ createdAt: { $gte: thisMonth } }),
      Order.countDocuments({ createdAt: { $gte: lastMonth, $lte: lastMonthEnd } }),
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ status: 'preparing' }),
      Order.countDocuments({ status: 'out_for_delivery' }),
      Order.countDocuments({ status: 'delivered' })
    ])

    // Revenue statistics
    const revenueAggregation = await Order.aggregate([
      { $match: { 'payment.status': 'paid' } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$payment.amount' },
          avgOrderValue: { $avg: '$payment.amount' }
        }
      }
    ])

    const monthlyRevenue = await Order.aggregate([
      { 
        $match: { 
          'payment.status': 'paid',
          createdAt: { $gte: thisMonth }
        } 
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: '$payment.amount' }
        }
      }
    ])

    const lastMonthRevenue = await Order.aggregate([
      { 
        $match: { 
          'payment.status': 'paid',
          createdAt: { $gte: lastMonth, $lte: lastMonthEnd }
        } 
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: '$payment.amount' }
        }
      }
    ])

    // Product statistics
    const [totalProducts, inStockProducts, featuredProducts] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ inStock: true }),
      Product.countDocuments({ featured: true })
    ])

    // Top selling products (based on order items)
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product.id',
          name: { $first: '$items.product.name' },
          totalSold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ])

    // Customer statistics
    const [totalCustomers, newCustomersThisMonth] = await Promise.all([
      User.countDocuments({ role: 'customer' }),
      User.countDocuments({ role: 'customer', createdAt: { $gte: thisMonth } })
    ])

    // Custom orders statistics
    const [totalCustomOrders, pendingCustomOrders] = await Promise.all([
      CustomOrder.countDocuments(),
      CustomOrder.countDocuments({ status: { $in: ['pending', 'reviewing'] } })
    ])

    // Review statistics
    const [totalReviews, pendingReviews, avgRating] = await Promise.all([
      Review.countDocuments(),
      Review.countDocuments({ approved: false }),
      Review.aggregate([
        { $match: { approved: true } },
        { $group: { _id: null, avg: { $avg: '$rating' } } }
      ])
    ])

    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('customer.name items payment.amount status createdAt')

    // Daily orders chart data (last 7 days)
    const sevenDaysAgo = new Date(today)
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const dailyOrders = await Order.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
          revenue: { $sum: '$payment.amount' }
        }
      },
      { $sort: { _id: 1 } }
    ])

    // Calculate growth percentages
    const orderGrowth = lastMonthOrders > 0 
      ? ((monthOrders - lastMonthOrders) / lastMonthOrders * 100).toFixed(1)
      : 100

    const revenueGrowth = lastMonthRevenue[0]?.revenue > 0
      ? ((monthlyRevenue[0]?.revenue - lastMonthRevenue[0]?.revenue) / lastMonthRevenue[0]?.revenue * 100).toFixed(1)
      : 100

    res.json({
      success: true,
      stats: {
        orders: {
          total: totalOrders,
          today: todayOrders,
          thisMonth: monthOrders,
          growth: `${orderGrowth > 0 ? '+' : ''}${orderGrowth}%`,
          byStatus: {
            pending: pendingOrders,
            preparing: preparingOrders,
            outForDelivery: deliveryOrders,
            completed: completedOrders
          }
        },
        revenue: {
          total: revenueAggregation[0]?.totalRevenue || 0,
          thisMonth: monthlyRevenue[0]?.revenue || 0,
          avgOrderValue: Math.round(revenueAggregation[0]?.avgOrderValue || 0),
          growth: `${revenueGrowth > 0 ? '+' : ''}${revenueGrowth}%`
        },
        products: {
          total: totalProducts,
          inStock: inStockProducts,
          featured: featuredProducts,
          topSelling: topProducts
        },
        customers: {
          total: totalCustomers,
          newThisMonth: newCustomersThisMonth
        },
        customOrders: {
          total: totalCustomOrders,
          pending: pendingCustomOrders
        },
        reviews: {
          total: totalReviews,
          pending: pendingReviews,
          avgRating: avgRating[0]?.avg?.toFixed(1) || 0
        },
        recentOrders,
        dailyChart: dailyOrders
      }
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Sales Report
router.get('/reports/sales', adminAuth, async (req, res) => {
  try {
    const { startDate, endDate, groupBy = 'day' } = req.query
    
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const end = endDate ? new Date(endDate) : new Date()

    let dateFormat
    switch (groupBy) {
      case 'month':
        dateFormat = '%Y-%m'
        break
      case 'week':
        dateFormat = '%Y-W%V'
        break
      default:
        dateFormat = '%Y-%m-%d'
    }

    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          'payment.status': 'paid'
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: '$createdAt' } },
          orders: { $sum: 1 },
          revenue: { $sum: '$payment.amount' },
          items: { $sum: { $size: '$items' } }
        }
      },
      { $sort: { _id: 1 } }
    ])

    // Category breakdown
    const categoryBreakdown = await Order.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product.name',
          count: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 10 }
    ])

    res.json({
      success: true,
      report: {
        period: { start, end },
        salesData,
        categoryBreakdown,
        summary: {
          totalOrders: salesData.reduce((sum, d) => sum + d.orders, 0),
          totalRevenue: salesData.reduce((sum, d) => sum + d.revenue, 0),
          totalItems: salesData.reduce((sum, d) => sum + d.items, 0)
        }
      }
    })
  } catch (error) {
    console.error('Sales report error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Customer Insights
router.get('/reports/customers', adminAuth, async (req, res) => {
  try {
    // Top customers by order value
    const topCustomers = await Order.aggregate([
      { $match: { 'payment.status': 'paid' } },
      {
        $group: {
          _id: '$customer.email',
          name: { $first: '$customer.name' },
          phone: { $first: '$customer.phone' },
          orderCount: { $sum: 1 },
          totalSpent: { $sum: '$payment.amount' },
          lastOrder: { $max: '$createdAt' }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 }
    ])

    // Customer acquisition over time
    const customerGrowth = await User.aggregate([
      { $match: { role: 'customer' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          newCustomers: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 12 }
    ])

    res.json({
      success: true,
      report: {
        topCustomers,
        customerGrowth
      }
    })
  } catch (error) {
    console.error('Customer report error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Export orders data
router.get('/export/orders', adminAuth, async (req, res) => {
  try {
    const { startDate, endDate, format = 'json' } = req.query
    
    let query = {}
    if (startDate || endDate) {
      query.createdAt = {}
      if (startDate) query.createdAt.$gte = new Date(startDate)
      if (endDate) query.createdAt.$lte = new Date(endDate)
    }

    const orders = await Order.find(query).sort({ createdAt: -1 })

    if (format === 'csv') {
      const csv = orders.map(o => ({
        orderId: o._id,
        date: o.createdAt.toISOString(),
        customer: o.customer.name,
        email: o.customer.email,
        phone: o.customer.phone,
        amount: o.payment.amount,
        status: o.status,
        paymentStatus: o.payment.status,
        city: o.delivery.city
      }))
      
      const headers = Object.keys(csv[0] || {}).join(',')
      const rows = csv.map(row => Object.values(row).join(','))
      const csvContent = [headers, ...rows].join('\n')
      
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=orders-export.csv')
      return res.send(csvContent)
    }

    res.json({ success: true, orders })
  } catch (error) {
    console.error('Export error:', error)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
