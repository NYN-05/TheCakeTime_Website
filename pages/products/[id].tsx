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
import { useScrollAnimation } from '../../components/UniqueEffects'

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
  const { addToCart } = useCart()
  
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
            <Link href="/products" className="btn-primary">
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
        <div className="mb-6 text-sm">
          <Link href="/" className="text-gray-600 hover:text-primary-600">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/products" className="text-gray-600 hover:text-primary-600">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="relative h-96 lg:h-full rounded-xl overflow-hidden">
            <ProductImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.eggless && (
              <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-lg font-semibold">
                Eggless
              </span>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-display font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{product.rating}</span>
              <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
            </div>

            <p className="text-3xl font-bold text-primary-600 mb-6">₹{product.price}</p>

            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Ingredients:</h3>
              <p className="text-gray-600">{product.ingredients}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-700">
                <Award className="mr-2 text-primary-600" size={20} />
                <span>Made with premium quality ingredients</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Truck className="mr-2 text-primary-600" size={20} />
                <span>Same-day delivery available</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Select Weight:</label>
              <div className="flex gap-3">
                {['500g', '1kg', '2kg'].map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-6 py-3 border-2 rounded-lg transition-all ${
                      selectedWeight === weight
                        ? 'border-primary-600 bg-primary-600 text-white'
                        : 'border-gray-300 hover:border-primary-600 hover:text-primary-600'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Custom Message (Optional):</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g., Happy Birthday Sarah!"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                maxLength={50}
              />
              <p className="text-sm text-gray-500 mt-1">Add a personalized message to your cake</p>
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
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check size={20} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-all">
                <Heart size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="bg-secondary-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Need customization?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Want a custom design, message, or special requirements? We can make it perfect for you!
              </p>
              <Link href="/custom-order" className="btn-secondary">
                Create Custom Order
              </Link>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {customerReviews.map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-display font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <Link key={relProduct.id} href={`/products/${relProduct.id}`} className="group">
                <div className="card overflow-hidden">
                  <div className="relative h-64">
                    <ProductImage
                      src={relProduct.image}
                      alt={relProduct.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{relProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">₹{relProduct.price}</span>
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-semibold">{relProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
