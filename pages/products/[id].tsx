import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, ShoppingCart, Truck, Award, Check, Sparkles } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductImage from '../../components/ProductImage'
import { useCart } from '../../contexts/CartContext'
import { useScrollAnimation, FloatingCart } from '../../components/UniqueEffects'

const products = [
  { id: 1, name: 'Chocolate Truffle Delight', price: 899, description: 'Rich chocolate cake layered with smooth truffle cream and chocolate shavings', ingredients: 'Flour, Chocolate, Cream, Sugar, Eggs, Butter', category: 'birthday', flavor: 'chocolate', occasion: 'birthday', rating: 4.8, reviews: 124, image: '/images/products/chocolate-truffle-delight.jpg', eggless: false },
  { id: 2, name: 'Red Velvet Romance', price: 799, description: 'Classic red velvet cake with cream cheese frosting', ingredients: 'Flour, Cocoa, Cream Cheese, Sugar, Eggs, Butter', category: 'birthday', flavor: 'red-velvet', occasion: 'anniversary', rating: 4.9, reviews: 156, image: '/images/products/red-velvet-romance.jpg', eggless: false },
  { id: 3, name: 'Vanilla Dream', price: 699, description: 'Light and fluffy vanilla sponge with vanilla buttercream', ingredients: 'Flour, Vanilla, Butter, Sugar, Milk', category: 'birthday', flavor: 'vanilla', occasion: 'birthday', rating: 4.7, reviews: 98, image: '/images/products/vanilla-dream.jpg', eggless: true },
  { id: 4, name: 'Black Forest Classic', price: 849, description: 'Traditional Black Forest cake with cherries and chocolate', ingredients: 'Chocolate, Cherries, Cream, Flour, Sugar, Eggs', category: 'birthday', flavor: 'chocolate', occasion: 'birthday', rating: 4.8, reviews: 187, image: '/images/products/black-forest-classic.jpg', eggless: false },
]

const relatedProducts = [
  { id: 5, name: 'Butterscotch Bliss', price: 749, rating: 4.6, image: '/images/products/butterscotch-bliss.jpg' },
  { id: 6, name: 'Strawberry Paradise', price: 799, rating: 4.7, image: '/images/products/strawberry-paradise.jpg' },
  { id: 7, name: 'Pineapple Delight', price: 699, rating: 4.5, image: '/images/products/pineapple-delight.jpg' },
]

const customerReviews = [
  { name: 'Priya Singh', rating: 5, date: '2 days ago', comment: 'Absolutely delicious! Fresh and beautifully made.' },
  { name: 'Amit Kumar', rating: 5, date: '1 week ago', comment: 'Perfect for our celebration. Everyone loved it!' },
  { name: 'Sneha Patel', rating: 4, date: '2 weeks ago', comment: 'Great taste, delivery was on time.' },
]

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const { addToCart, cart } = useCart()
  
  const [selectedWeight, setSelectedWeight] = useState('1kg')
  const [message, setMessage] = useState('')
  const [added, setAdded] = useState(false)
  const [liked, setLiked] = useState(false)
  
  useScrollAnimation()
  
  const product = products.find(p => p.id === Number(id))
  
  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Product Not Found</h1>
            <Link href="/products" className="btn-primary bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{product.name} - TheCakeTime</title>
        <meta name="description" content={product.description} />
      </Head>

      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm scroll-animate">
          <Link href="/" className="text-gray-600 hover:text-pink-600 transition-colors">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/products" className="text-gray-600 hover:text-pink-600 transition-colors">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="font-semibold text-gray-900">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-2xl scroll-animate group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <ProductImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.eggless && (
              <span className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg z-20">
                🌱 Eggless
              </span>
            )}
          </div>

          {/* Details */}
          <div className="scroll-animate">
            <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              <Sparkles className="inline-block mr-2 text-pink-600" size={32} />
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4 bg-yellow-50 px-3 py-1 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-lg font-bold">{product.rating}</span>
              <span className="text-gray-600 ml-2 font-medium">({product.reviews} reviews)</span>
            </div>

            <p className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-6">₹{product.price}</p>

            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Ingredients:</h3>
              <p className="text-gray-600">{product.ingredients}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-700 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                <Award className="mr-3 text-pink-600" size={24} />
                <span className="font-medium">Made with premium quality ingredients</span>
              </div>
              <div className="flex items-center text-gray-700 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                <Truck className="mr-3 text-pink-600" size={24} />
                <span className="font-medium">Same-day delivery available</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-3">Select Weight:</label>
              <div className="flex gap-3">
                {['500g', '1kg', '2kg'].map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-6 py-3 border-2 rounded-xl transition-all duration-300 font-semibold ${
                      selectedWeight === weight
                        ? 'border-pink-600 bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'border-gray-300 hover:border-pink-600 hover:text-pink-600 hover:scale-105'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-3">Custom Message (Optional):</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g., Happy Birthday Sarah!"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                maxLength={50}
              />
              <p className="text-sm text-gray-600 mt-2 font-medium">✨ Add a personalized message to your cake</p>
            </div>

            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => {
                  addToCart({
                    product: {
                      id: product.id,
                      name: product.name,
                      image: product.image,
                    },
                    quantity: 1,
                    price: product.price,
                    weight: selectedWeight,
                    message: message || undefined,
                  })
                  setAdded(true)
                  setTimeout(() => setAdded(false), 2000)
                }}
                className={`flex-1 btn-primary flex items-center justify-center gap-2 rounded-xl font-bold text-lg transition-all duration-300 ${
                  added ? 'bg-green-600 hover:bg-green-700' : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:shadow-xl hover:scale-105'
                }`}
              >
                {added ? (
                  <>
                    <Check size={24} className="animate-bounce" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={24} />
                    Add to Cart
                  </>
                )}
              </button>
              <button 
                onClick={() => setLiked(!liked)}
                className={`px-6 py-3 border-2 rounded-xl transition-all duration-300 ${
                  liked ? 'border-pink-600 bg-pink-50' : 'border-gray-300 hover:border-pink-600'
                }`}
              >
                <Heart size={24} className={`transition-all duration-300 ${
                  liked ? 'text-pink-600 fill-pink-600 scale-110' : 'text-gray-600'
                }`} />
              </button>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border-2 border-pink-200 shadow-md">
              <h3 className="font-bold mb-3 text-lg bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">🎨 Need customization?</h3>
              <p className="text-sm text-gray-700 mb-4 font-medium">
                Want a custom design, message, or special requirements? We can make it perfect for you!
              </p>
              <Link href="/custom-order" className="btn-secondary bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 hover:shadow-lg hover:scale-105 transition-all duration-300">
                Create Custom Order
              </Link>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent scroll-animate">
            <Sparkles className="inline-block mr-2 text-pink-600" size={28} />
            Customer Reviews
          </h2>
          <div className="space-y-6">
            {customerReviews.map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 scroll-animate" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg">{review.name}</h4>
                    <p className="text-sm text-gray-500 font-medium">{review.date}</p>
                  </div>
                  <div className="flex bg-yellow-50 px-3 py-1 rounded-full">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-display font-bold mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent scroll-animate">
            <Sparkles className="inline-block mr-2 text-pink-600" size={28} />
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct, idx) => (
              <Link key={relProduct.id} href={`/products/${relProduct.id}`} className="group scroll-animate" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="card overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-white/50 to-pink-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20"></div>
                    <ProductImage
                      src={relProduct.image}
                      alt={relProduct.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{relProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">₹{relProduct.price}</span>
                      <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm font-bold text-yellow-700">{relProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FloatingCart count={cart.length} total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} />
      <Footer />
    </>
  )
}
