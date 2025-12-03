import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Search, SlidersHorizontal, Star, Sparkles } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductImage from '../../components/ProductImage'
import { useScrollAnimation, FloatingCart } from '../../components/UniqueEffects'
import { useCart } from '../../contexts/CartContext'

const products = [
  { id: 1, name: 'Chocolate Truffle Delight', price: 899, category: 'birthday', flavor: 'chocolate', weight: '1kg', occasion: 'birthday', rating: 4.8, image: '/images/products/chocolate-truffle-delight.jpg', eggless: false },
  { id: 2, name: 'Red Velvet Romance', price: 799, category: 'birthday', flavor: 'red-velvet', weight: '1kg', occasion: 'anniversary', rating: 4.9, image: '/images/products/red-velvet-romance.jpg', eggless: false },
  { id: 3, name: 'Vanilla Dream', price: 699, category: 'birthday', flavor: 'vanilla', weight: '500g', occasion: 'birthday', rating: 4.7, image: '/images/products/vanilla-dream.jpg', eggless: true },
  { id: 4, name: 'Black Forest Classic', price: 849, category: 'birthday', flavor: 'chocolate', weight: '1kg', occasion: 'birthday', rating: 4.8, image: '/images/products/black-forest-classic.jpg', eggless: false },
  { id: 5, name: 'Butterscotch Bliss', price: 749, category: 'birthday', flavor: 'butterscotch', weight: '1kg', occasion: 'birthday', rating: 4.6, image: '/images/products/butterscotch-bliss.jpg', eggless: true },
  { id: 6, name: 'Strawberry Paradise', price: 799, category: 'birthday', flavor: 'strawberry', weight: '1kg', occasion: 'birthday', rating: 4.7, image: '/images/products/strawberry-paradise.jpg', eggless: false },
  { id: 7, name: 'Pineapple Delight', price: 699, category: 'birthday', flavor: 'pineapple', weight: '1kg', occasion: 'birthday', rating: 4.5, image: '/images/products/pineapple-delight.jpg', eggless: true },
  { id: 8, name: 'Mango Magic', price: 849, category: 'seasonal', flavor: 'mango', weight: '1kg', occasion: 'celebration', rating: 4.9, image: '/images/products/mango-magic.jpg', eggless: true },
]

export default function Products() {
  const { cartCount, cartTotal } = useCart()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFlavor, setSelectedFlavor] = useState('all')
  const [selectedWeight, setSelectedWeight] = useState('all')
  const [selectedOccasion, setSelectedOccasion] = useState('all')
  const [selectedEggless, setSelectedEggless] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)

  useScrollAnimation()

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFlavor = selectedFlavor === 'all' || product.flavor === selectedFlavor
      const matchesWeight = selectedWeight === 'all' || product.weight === selectedWeight
      const matchesOccasion = selectedOccasion === 'all' || product.occasion === selectedOccasion
      const matchesEggless = selectedEggless === 'all' || 
        (selectedEggless === 'eggless' && product.eggless) ||
        (selectedEggless === 'egg' && !product.eggless)
      
      return matchesSearch && matchesFlavor && matchesWeight && matchesOccasion && matchesEggless
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <>
      <Head>
        <title>Products - TheCakeTime</title>
        <meta name="description" content="Browse our delicious collection of cakes and pastries" />
      </Head>

      <Header />
      {mounted && <FloatingCart count={cartCount} total={cartTotal} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 scroll-animate text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-pink-500 animate-pulse" size={32} />
            <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Our Products</h1>
            <Sparkles className="text-purple-500 animate-pulse" size={32} />
          </div>
          <p className="text-gray-600 text-lg">Discover our delicious collection of premium cakes and pastries</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search cakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Toggle Filters */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline flex items-center justify-center gap-2"
            >
              <SlidersHorizontal size={20} />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-gray-50 p-6 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Flavor</label>
                <select
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Flavors</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="vanilla">Vanilla</option>
                  <option value="red-velvet">Red Velvet</option>
                  <option value="butterscotch">Butterscotch</option>
                  <option value="strawberry">Strawberry</option>
                  <option value="pineapple">Pineapple</option>
                  <option value="mango">Mango</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Weight</label>
                <select
                  value={selectedWeight}
                  onChange={(e) => setSelectedWeight(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Weights</option>
                  <option value="500g">500g</option>
                  <option value="1kg">1kg</option>
                  <option value="2kg">2kg</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Occasion</label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Occasions</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="celebration">Celebration</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Type</label>
                <select
                  value={selectedEggless}
                  onChange={(e) => setSelectedEggless(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Types</option>
                  <option value="eggless">Eggless</option>
                  <option value="egg">With Egg</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product, idx) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group scroll-animate" style={{ animationDelay: `${idx * 50}ms` }}>
              <div className="card overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-white/50 to-pink-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20"></div>
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.eggless && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-30">
                      🌱 Eggless
                    </span>
                  )}
                  <button className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white text-pink-600 font-bold px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-300 shadow-lg hover:bg-pink-600 hover:text-white z-30">
                    View Details
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 font-medium">{product.weight}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">₹{product.price}</span>
                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-bold text-yellow-700">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
