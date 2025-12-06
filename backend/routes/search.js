const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// Global search endpoint
router.get('/', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, eggless, sort, page = 1, limit = 12 } = req.query
    
    if (!q && !category) {
      return res.status(400).json({ error: 'Search query or category required' })
    }

    let query = {}
    
    // Text search
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { flavor: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    }
    
    // Filters
    if (category) query.category = category
    if (eggless !== undefined) query.eggless = eggless === 'true'
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = parseFloat(minPrice)
      if (maxPrice) query.price.$lte = parseFloat(maxPrice)
    }
    
    // Only show in-stock items
    query.inStock = true
    
    // Sorting
    let sortOptions = {}
    switch (sort) {
      case 'price-low':
        sortOptions.price = 1
        break
      case 'price-high':
        sortOptions.price = -1
        break
      case 'rating':
        sortOptions.rating = -1
        break
      case 'newest':
        sortOptions.createdAt = -1
        break
      default:
        // Relevance sorting - featured first, then by rating
        sortOptions = { featured: -1, rating: -1, createdAt: -1 }
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      Product.countDocuments(query)
    ])
    
    // Get facets for filters
    const facets = await Product.aggregate([
      { $match: { inStock: true } },
      {
        $facet: {
          categories: [
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          flavors: [
            { $group: { _id: '$flavor', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          priceRange: [
            {
              $group: {
                _id: null,
                min: { $min: '$price' },
                max: { $max: '$price' },
                avg: { $avg: '$price' }
              }
            }
          ]
        }
      }
    ])
    
    res.json({
      success: true,
      query: q,
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      },
      facets: {
        categories: facets[0].categories,
        flavors: facets[0].flavors,
        priceRange: facets[0].priceRange[0]
      }
    })
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Search suggestions / autocomplete
router.get('/suggestions', async (req, res) => {
  try {
    const { q } = req.query
    
    if (!q || q.length < 2) {
      return res.json({ suggestions: [] })
    }
    
    const suggestions = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { flavor: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ],
      inStock: true
    })
    .select('name category flavor image price')
    .limit(5)
    
    // Also get matching categories
    const categoryMatches = await Product.distinct('category', {
      category: { $regex: q, $options: 'i' }
    })
    
    // Get matching flavors
    const flavorMatches = await Product.distinct('flavor', {
      flavor: { $regex: q, $options: 'i' }
    })
    
    res.json({
      suggestions: {
        products: suggestions,
        categories: categoryMatches,
        flavors: flavorMatches.slice(0, 5)
      }
    })
  } catch (error) {
    console.error('Suggestions error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Popular searches / trending
router.get('/popular', async (req, res) => {
  try {
    // Get featured products
    const featured = await Product.find({ featured: true, inStock: true })
      .select('name category image price rating')
      .limit(4)
    
    // Get top-rated products
    const topRated = await Product.find({ inStock: true })
      .sort({ rating: -1, reviews: -1 })
      .select('name category image price rating')
      .limit(4)
    
    // Popular categories
    const popularCategories = await Product.aggregate([
      { $match: { inStock: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 }
    ])
    
    res.json({
      success: true,
      featured,
      topRated,
      popularCategories,
      trendingSearches: [
        'Chocolate Cake',
        'Birthday Cake',
        'Red Velvet',
        'Eggless',
        'Anniversary',
        'Custom Cake'
      ]
    })
  } catch (error) {
    console.error('Popular search error:', error)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
