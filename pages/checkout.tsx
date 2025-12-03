import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CheckoutForm from '@/components/CheckoutForm'
import { ShoppingCart, Trash2, Plus, Minus, Sparkles } from 'lucide-react'
import { useScrollAnimation } from '../components/UniqueEffects'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

interface CartItem {
  product: {
    id: number
    name: string
    image: string
  }
  quantity: number
  price: number
  weight: string
  message?: string
}

export default function Checkout() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'cart' | 'details' | 'payment'>('cart')

  useScrollAnimation()
  
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    city: '',
    pincode: '',
    date: '',
    time: '',
  })

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const updateQuantity = (index: number, change: number) => {
    const newCart = [...cart]
    newCart[index].quantity = Math.max(1, newCart[index].quantity + change)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const removeItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleProceedToDetails = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }
    setStep('details')
  }

  const handleProceedToPayment = async () => {
    // Validate customer and delivery details
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      alert('Please fill in all customer details')
      return
    }

    if (!deliveryDetails.address || !deliveryDetails.city || !deliveryDetails.pincode || !deliveryDetails.date || !deliveryDetails.time) {
      alert('Please fill in all delivery details')
      return
    }

    setLoading(true)

    try {
      // Create payment intent
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: calculateTotal(),
          currency: 'inr',
          orderData: {
            customer: customerDetails,
            delivery: deliveryDetails,
            items: cart.map(item => ({
              product: item.product.id.toString(),
              name: item.product.name,
              price: item.price,
              quantity: item.quantity,
              weight: item.weight,
              customMessage: item.message,
            })),
          },
        }),
      })

      const data = await response.json()

      if (data.clientSecret) {
        setClientSecret(data.clientSecret)
        setStep('payment')
      } else {
        throw new Error('Failed to create payment intent')
      }
    } catch (error) {
      console.error('Payment setup error:', error)
      alert('Failed to initialize payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#ef4444',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#dc2626',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <>
      <Head>
        <title>Checkout - TheCakeTime</title>
        <meta name="description" content="Complete your order" />
      </Head>

      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        {/* Progress Steps */}
        <div className="mb-8 scroll-animate">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center transition-all duration-300 ${step === 'cart' ? 'text-pink-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md transition-all duration-300 ${step === 'cart' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-110' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-bold">Cart</span>
            </div>
            <div className={`w-20 h-1 rounded-full transition-all duration-500 ${step !== 'cart' ? 'bg-gradient-to-r from-pink-400 to-purple-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center transition-all duration-300 ${step === 'details' ? 'text-pink-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md transition-all duration-300 ${step === 'details' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-110' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-bold">Details</span>
            </div>
            <div className={`w-20 h-1 rounded-full transition-all duration-500 ${step === 'payment' ? 'bg-gradient-to-r from-pink-400 to-purple-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center transition-all duration-300 ${step === 'payment' ? 'text-pink-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md transition-all duration-300 ${step === 'payment' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-110' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 font-bold">Payment</span>
            </div>
          </div>
        </div>

        {/* Cart Step */}
        {step === 'cart' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-display font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent scroll-animate">
                <Sparkles className="inline-block mr-2 text-pink-600" size={28} />
                Shopping Cart
              </h1>
              
              {cart.length === 0 ? (
                <div className="card text-center py-12 scroll-animate">
                  <ShoppingCart size={64} className="mx-auto text-pink-300 mb-4" />
                  <p className="text-xl text-gray-600 mb-4 font-semibold">Your cart is empty</p>
                  <button onClick={() => router.push('/products')} className="btn-primary bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="card hover:shadow-lg transition-all duration-300 scroll-animate" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center space-x-4">
                        <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-xl shadow-md" />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{item.product.name}</h3>
                          <p className="text-gray-600 text-sm font-medium">Weight: {item.weight}</p>
                          {item.message && <p className="text-gray-600 text-sm">Message: {item.message}</p>}
                          <p className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent font-bold text-lg mt-1">₹{item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => updateQuantity(index, -1)} className="p-1 rounded hover:bg-gray-100">
                            <Minus size={20} />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(index, 1)} className="p-1 rounded hover:bg-gray-100">
                            <Plus size={20} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(index)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-4 scroll-animate border-2 border-pink-100">
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-semibold">₹{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Delivery</span>
                    <span className="text-green-600 font-bold">✨ FREE</span>
                  </div>
                  <div className="border-t-2 border-pink-100 pt-3 flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">₹{calculateTotal()}</span>
                  </div>
                </div>
                <button 
                  onClick={handleProceedToDetails}
                  disabled={cart.length === 0}
                  className="btn-primary w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Proceed to Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Details Step */}
        {step === 'details' && (
          <div className="max-w-3xl mx-auto">
            <button onClick={() => setStep('cart')} className="text-pink-600 mb-4 flex items-center hover:text-purple-600 font-semibold transition-colors">
              ← Back to Cart
            </button>
            <h1 className="text-3xl font-display font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent scroll-animate">
              <Sparkles className="inline-block mr-2 text-pink-600" size={28} />
              Delivery Details
            </h1>
            
            <div className="card space-y-6 scroll-animate">
              <div>
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Address *</label>
                    <textarea
                      value={deliveryDetails.address}
                      onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City *</label>
                      <input
                        type="text"
                        value={deliveryDetails.city}
                        onChange={(e) => setDeliveryDetails({ ...deliveryDetails, city: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pincode *</label>
                      <input
                        type="text"
                        value={deliveryDetails.pincode}
                        onChange={(e) => setDeliveryDetails({ ...deliveryDetails, pincode: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Delivery Schedule</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Delivery Date *</label>
                    <input
                      type="date"
                      value={deliveryDetails.date}
                      onChange={(e) => setDeliveryDetails({ ...deliveryDetails, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Delivery Time *</label>
                    <select
                      value={deliveryDetails.time}
                      onChange={(e) => setDeliveryDetails({ ...deliveryDetails, time: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="">Select time</option>
                      <option value="10:00-12:00">10:00 AM - 12:00 PM</option>
                      <option value="12:00-14:00">12:00 PM - 2:00 PM</option>
                      <option value="14:00-16:00">2:00 PM - 4:00 PM</option>
                      <option value="16:00-18:00">4:00 PM - 6:00 PM</option>
                      <option value="18:00-20:00">6:00 PM - 8:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleProceedToPayment}
                  disabled={loading}
                  className="btn-primary w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  {loading ? '⏳ Processing...' : `✨ Proceed to Payment (₹${calculateTotal()})`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === 'payment' && clientSecret && (
          <div className="max-w-2xl mx-auto">
            <button onClick={() => setStep('details')} className="text-primary-600 mb-4 flex items-center hover:underline">
              ← Back to Details
            </button>
            <h1 className="text-3xl font-display font-bold mb-6">Payment</h1>
            
            <div className="card">
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-bold text-lg">₹{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Items:</span>
                    <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} item(s)</span>
                  </div>
                </div>
              </div>

              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm 
                  amount={calculateTotal()}
                  orderData={{
                    customer: customerDetails,
                    delivery: deliveryDetails,
                    items: cart.map(item => ({
                      product: item.product.id.toString(),
                      name: item.product.name,
                      price: item.price,
                      quantity: item.quantity,
                      weight: item.weight,
                      customMessage: item.message,
                    })),
                  }}
                />
              </Elements>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
