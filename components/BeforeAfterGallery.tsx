import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronRight, Filter, Search } from 'lucide-react'
import Image from 'next/image'

interface CustomOrder {
  id: number
  customer: string
  occasion: string
  sketchImage: string
  finalImage: string
  rating: number
  review: string
  date: string
  category: string
}

const customOrders: CustomOrder[] = [
  {
    id: 1,
    customer: 'Priya S.',
    occasion: 'Daughter\'s 5th Birthday',
    sketchImage: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80',
    finalImage: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80',
    rating: 5,
    review: 'The unicorn cake was exactly like the drawing my daughter made! She was speechless when she saw it.',
    date: 'Nov 2024',
    category: 'Birthday',
  },
  {
    id: 2,
    customer: 'Rahul & Anjali',
    occasion: '10th Anniversary',
    sketchImage: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&q=80',
    finalImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    rating: 5,
    review: 'Three-tier masterpiece that told our love story. Each layer represented a different chapter of our life.',
    date: 'Oct 2024',
    category: 'Anniversary',
  },
  {
    id: 3,
    customer: 'Neha M.',
    occasion: 'Corporate Event',
    sketchImage: 'https://images.unsplash.com/photo-1588195538326-c5b1e5b80857?w=400&q=80',
    finalImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    rating: 5,
    review: 'Perfect company logo recreation! Professional and delicious. All 100 employees were impressed.',
    date: 'Nov 2024',
    category: 'Corporate',
  },
  {
    id: 4,
    customer: 'Amit K.',
    occasion: 'Son\'s Graduation',
    sketchImage: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80',
    finalImage: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80',
    rating: 5,
    review: 'The graduation cap design was flawless. So happy we chose TheCakeTime for this milestone!',
    date: 'Sept 2024',
    category: 'Celebration',
  },
  {
    id: 5,
    customer: 'Sarah P.',
    occasion: 'Wedding',
    sketchImage: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&q=80',
    finalImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    rating: 5,
    review: 'Our wedding cake was the centerpiece of our reception. Guests are still talking about it!',
    date: 'Oct 2024',
    category: 'Wedding',
  },
  {
    id: 6,
    customer: 'Karthik R.',
    occasion: 'Baby Shower',
    sketchImage: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&q=80',
    finalImage: 'https://images.unsplash.com/photo-1602351447937-745cb720612f?w=800&q=80',
    rating: 5,
    review: 'The baby-themed cake exceeded our expectations! So cute and tasted amazing too.',
    date: 'Nov 2024',
    category: 'Baby Shower',
  },
]

const categories = ['All', 'Birthday', 'Wedding', 'Anniversary', 'Corporate', 'Celebration', 'Baby Shower']

export default function BeforeAfterGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedOrder, setSelectedOrder] = useState<CustomOrder | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sliderPosition, setSliderPosition] = useState(50)

  const filteredOrders = customOrders.filter((order) => {
    const matchesCategory = selectedCategory === 'All' || order.category === selectedCategory
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.occasion.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            From Vision to Reality
          </h1>
          <p className="text-gray-600 text-lg mb-2">See how we transform rough sketches into stunning cakes</p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg">
            <span className="text-2xl font-bold">99.8%</span>
            <span className="text-sm">Order Accuracy Rate</span>
          </div>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="mb-6 relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer or occasion..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Filter className="w-5 h-5 text-gray-600" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedOrder(order)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow group"
            >
              {/* Before/After Preview */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2">
                  {/* Before (Sketch) */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={order.sketchImage}
                      alt="Sketch"
                      fill
                      className="object-cover filter grayscale group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 px-3 py-1 bg-black/70 text-white text-xs rounded-full">
                      Before
                    </div>
                  </div>
                  {/* After (Final) */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={order.finalImage}
                      alt="Final Cake"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 px-3 py-1 bg-pink-600 text-white text-xs rounded-full">
                      After
                    </div>
                  </div>
                </div>
                {/* Divider */}
                <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-lg -translate-x-1/2" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <span className="text-white font-semibold flex items-center gap-2">
                    View Details <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{order.occasion}</h3>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <span className="px-3 py-1 bg-pink-100 text-pink-600 text-xs font-semibold rounded-full">
                    {order.category}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < order.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({order.rating}.0)</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{order.review}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{order.date}</span>
                  <span className="text-pink-600 font-semibold cursor-pointer hover:underline">
                    See Full Story →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 grid md:grid-cols-4 gap-6"
        >
          <div className="p-6 bg-white rounded-xl shadow-lg text-center">
            <p className="text-4xl font-bold text-pink-600 mb-2">500+</p>
            <p className="text-gray-600">Custom Cakes Made</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg text-center">
            <p className="text-4xl font-bold text-purple-600 mb-2">99.8%</p>
            <p className="text-gray-600">Accuracy Rate</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">4.9★</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg text-center">
            <p className="text-4xl font-bold text-indigo-600 mb-2">24hrs</p>
            <p className="text-gray-600">Design Response</p>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOrder(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Image Comparison Slider */}
              <div className="relative h-96 bg-gray-900 overflow-hidden">
                {/* After Image (Background) */}
                <Image
                  src={selectedOrder.finalImage}
                  alt="Final Cake"
                  fill
                  className="object-cover"
                />

                {/* Before Image (Clipped) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <Image
                    src={selectedOrder.sketchImage}
                    alt="Sketch"
                    fill
                    className="object-cover filter grayscale"
                  />
                </div>

                {/* Slider Control */}
                <div className="absolute inset-0">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-0 cursor-ew-resize z-10"
                  />
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                      <div className="flex gap-1">
                        <div className="w-1 h-6 bg-gray-400 rounded" />
                        <div className="w-1 h-6 bg-gray-400 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/70 text-white rounded-full text-sm font-semibold">
                  BEFORE (Sketch)
                </div>
                <div className="absolute bottom-4 right-4 px-4 py-2 bg-pink-600 text-white rounded-full text-sm font-semibold">
                  AFTER (Final)
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedOrder.occasion}</h2>
                    <p className="text-gray-600">Customer: {selectedOrder.customer} • {selectedOrder.date}</p>
                  </div>
                  <span className="px-4 py-2 bg-pink-100 text-pink-600 font-semibold rounded-full">
                    {selectedOrder.category}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < selectedOrder.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-lg font-semibold text-gray-700 ml-2">{selectedOrder.rating}.0</span>
                </div>

                {/* Review */}
                <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl mb-6">
                  <p className="text-gray-700 text-lg italic leading-relaxed">"{selectedOrder.review}"</p>
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-shadow">
                    Order Similar Cake
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
