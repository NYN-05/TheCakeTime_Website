import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CheckCircle, Package, Truck, Clock, Sparkles } from 'lucide-react'

export default function OrderSuccess() {
  const router = useRouter()
  const { order_id, order_number, session_id } = router.query
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (order_id) {
      fetchOrderDetails(order_id as string)
    } else if (session_id) {
      // Handle Stripe checkout session
      handleCheckoutSession(session_id as string)
    } else {
      setLoading(false)
    }
  }, [order_id, session_id])

  const fetchOrderDetails = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/order/${id}`)
      const data = await response.json()
      setOrderDetails(data.order)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckoutSession = async (sessionId: string) => {
    // Here you would verify the session and create the order
    // For now, just mark loading as complete
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Order Successful - TheCakeTime</title>
        <meta name="description" content="Your order has been placed successfully" />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-8 animate-fade-in-up">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-2xl animate-bounce-in">
                <CheckCircle size={48} className="text-white" />
              </div>
              <div className="mb-4">
                <Sparkles className="inline-block text-yellow-400 animate-pulse" size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Order Successful!
              </h1>
              <p className="text-xl text-gray-600">
                Thank you for your order. We'll start preparing your delicious cake right away!
              </p>
            </div>

            {order_number && (
              <div className="card mb-8">
                <div className="text-left">
                  <div className="mb-6 pb-6 border-b">
                    <h2 className="text-2xl font-semibold mb-2">Order Details</h2>
                    <p className="text-gray-600">Order Number: <span className="font-mono font-bold text-primary-600">#{order_number}</span></p>
                  </div>

                  {orderDetails && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Items Ordered</h3>
                        <div className="space-y-2">
                          {orderDetails.items?.map((item: any, index: number) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <div>
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity} | Weight: {item.weight}</p>
                              </div>
                              <p className="font-semibold">₹{item.price * item.quantity}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Delivery Information</h3>
                        <div className="p-4 bg-gray-50 rounded space-y-2 text-sm">
                          <p><span className="font-medium">Name:</span> {orderDetails.customer?.name}</p>
                          <p><span className="font-medium">Phone:</span> {orderDetails.customer?.phone}</p>
                          <p><span className="font-medium">Email:</span> {orderDetails.customer?.email}</p>
                          <p><span className="font-medium">Address:</span> {orderDetails.delivery?.address}, {orderDetails.delivery?.city} - {orderDetails.delivery?.pincode}</p>
                          <p><span className="font-medium">Delivery Date:</span> {new Date(orderDetails.delivery?.date).toLocaleDateString()}</p>
                          <p><span className="font-medium">Delivery Time:</span> {orderDetails.delivery?.time}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center text-xl font-bold">
                          <span>Total Paid</span>
                          <span className="text-primary-600">₹{orderDetails.payment?.amount}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card text-center">
                <Package className="mx-auto text-primary-600 mb-3" size={32} />
                <h3 className="font-semibold mb-2">Order Confirmed</h3>
                <p className="text-sm text-gray-600">Your order has been received and confirmed</p>
              </div>
              <div className="card text-center">
                <Clock className="mx-auto text-primary-600 mb-3" size={32} />
                <h3 className="font-semibold mb-2">Preparing</h3>
                <p className="text-sm text-gray-600">We're baking your cake with love</p>
              </div>
              <div className="card text-center">
                <Truck className="mx-auto text-primary-600 mb-3" size={32} />
                <h3 className="font-semibold mb-2">On Time Delivery</h3>
                <p className="text-sm text-gray-600">Fresh delivery on your selected date</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                A confirmation email has been sent to your email address with order details.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products" className="btn-primary">
                  Continue Shopping
                </Link>
                <Link href="/" className="btn-outline">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
