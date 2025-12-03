import { useEffect } from 'react'
import Head from 'next/head'
import { Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useScrollAnimation, FloatingCart } from '../components/UniqueEffects'
import { useCart } from '../contexts/CartContext'

export default function DeliveryPolicy() {
  const { cart } = useCart()
  useScrollAnimation()

  return (
    <>
      <Head>
        <title>Delivery Policy - TheCakeTime</title>
        <meta name="description" content="Delivery policy and information for TheCakeTime bakery" />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 scroll-animate">
          <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            <Sparkles className="inline-block mr-3" size={32} />
            Delivery Policy
            <Sparkles className="inline-block ml-3" size={32} />
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: December 4, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="card mb-6 scroll-animate">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">1. Delivery Areas</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We currently deliver to the following areas:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Within Delhi:</strong> Free delivery on orders above ₹500</li>
              <li><strong>Delhi NCR:</strong> Gurgaon, Noida, Ghaziabad, Faridabad</li>
              <li><strong>Extended Areas:</strong> Please contact us to check availability</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Delivery charges vary based on distance. Please check at checkout for exact charges.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '100ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">2. Delivery Timeframes</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Order processing and delivery times:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Standard Cakes:</strong> 24 hours advance notice required</li>
              <li><strong>Custom/Designer Cakes:</strong> 48-72 hours advance notice</li>
              <li><strong>Same-Day Delivery:</strong> Available for select products if ordered before 12 PM</li>
              <li><strong>Photo Cakes:</strong> Minimum 48 hours required</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">3. Delivery Slots</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Choose from the following delivery time slots:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                <p className="font-semibold">Morning: 10:00 AM - 12:00 PM</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                <p className="font-semibold">Afternoon: 12:00 PM - 2:00 PM</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                <p className="font-semibold">Evening: 2:00 PM - 4:00 PM</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                <p className="font-semibold">Late Evening: 4:00 PM - 6:00 PM</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                <p className="font-semibold">Night: 6:00 PM - 8:00 PM</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                <p className="font-semibold">Midnight: 11:00 PM - 12:00 AM (Extra charges)</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mt-3">
              Please note: Delivery times are approximate. We strive to deliver within the selected slot but cannot guarantee exact timing.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '300ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">4. Delivery Charges</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Delivery charges are calculated based on:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Distance from our store</li>
              <li>Order value (free delivery on orders above ₹500 within Delhi)</li>
              <li>Time slot (midnight deliveries have additional charges)</li>
              <li>Same-day delivery requests (₹100 extra)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Exact delivery charges will be displayed at checkout before payment.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">5. Order Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Stay updated on your order:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Order confirmation SMS/Email upon placing order</li>
              <li>Preparation update notification</li>
              <li>Out for delivery notification with delivery partner details</li>
              <li>Delivery confirmation</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '500ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">6. Delivery Instructions</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              To ensure smooth delivery:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide complete and accurate address with landmarks</li>
              <li>Ensure someone is available to receive the order</li>
              <li>Provide an alternate contact number if possible</li>
              <li>For apartments/societies, mention gate/tower details</li>
              <li>For contactless delivery, specify instructions in notes</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '600ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">7. Failed Delivery</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If delivery cannot be completed due to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Customer unavailability</li>
              <li>Incorrect address provided</li>
              <li>Refusal to accept delivery</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              We will make one additional delivery attempt. Redelivery charges may apply. No refund will be provided for customer-side issues.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '700ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">8. Product Care on Delivery</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Upon receiving your order:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Inspect the product immediately before the delivery person leaves</li>
              <li>Report any damage or discrepancies immediately</li>
              <li>Store cakes in refrigeration as recommended</li>
              <li>Consume within recommended timeframe for best quality</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '800ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">9. Store Pickup</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Prefer to pick up your order? You can:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Select store pickup option at checkout (no delivery charges)</li>
              <li>Receive notification when order is ready</li>
              <li>Collect from our store during business hours</li>
              <li>Bring order confirmation and valid ID</li>
            </ul>
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
              <p className="font-semibold">Store Location:</p>
              <p>123 Bakery Street, Delhi, India 110001</p>
              <p className="mt-2 font-semibold">Store Hours:</p>
              <p>Mon-Sat: 9:00 AM - 9:00 PM</p>
              <p>Sunday: 10:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '900ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">10. Special Delivery Requests</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We accommodate special requests when possible:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Surprise deliveries with specific instructions</li>
              <li>Delivery to office/hotel reception</li>
              <li>Gift messages and greeting cards</li>
              <li>Specific delivery timing for events</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Please mention special requests in order notes or contact us directly.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '1000ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">11. Delivery Issues</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              For any delivery-related concerns, contact us immediately:
            </p>
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
              <p className="font-semibold">TheCakeTime</p>
              <p>Email: info@thecaketime.com</p>
              <p>Phone: +91 123 456 7890</p>
              <p>WhatsApp: +91 123 456 7890</p>
              <p className="mt-2 text-sm">We aim to resolve all delivery issues within 24 hours</p>
            </div>
          </div>
        </div>
      </div>

      <FloatingCart count={cart.length} total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} />
      <Footer />
    </>
  )
}
