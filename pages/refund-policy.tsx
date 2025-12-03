import { useEffect } from 'react'
import Head from 'next/head'
import { Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useScrollAnimation, FloatingCart } from '../components/UniqueEffects'
import { useCart } from '../contexts/CartContext'

export default function RefundPolicy() {
  const { cart } = useCart()
  useScrollAnimation()

  return (
    <>
      <Head>
        <title>Refund Policy - TheCakeTime</title>
        <meta name="description" content="Refund and cancellation policy for TheCakeTime bakery" />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 scroll-animate">
          <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            <Sparkles className="inline-block mr-3" size={32} />
            Refund Policy
            <Sparkles className="inline-block ml-3" size={32} />
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: December 4, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="card mb-6 scroll-animate">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">1. Cancellation Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We understand that plans can change. Our cancellation policy is designed to be fair to both our customers and our business.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>24+ Hours Before Delivery:</strong> Full refund (100%)</li>
              <li><strong>12-24 Hours Before Delivery:</strong> 50% refund</li>
              <li><strong>Less than 12 Hours:</strong> No refund (order already prepared)</li>
              <li><strong>Custom/Designer Cakes:</strong> 50% advance non-refundable after design confirmation</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '100ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">2. How to Cancel</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              To cancel your order, please contact us immediately through:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Phone: +91 123 456 7890</li>
              <li>Email: info@thecaketime.com</li>
              <li>WhatsApp: +91 123 456 7890</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Please provide your order number and reason for cancellation. Cancellation requests must be confirmed by our team.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">3. Refund Eligibility</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You are eligible for a refund in the following situations:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Order was cancelled within the eligible timeframe</li>
              <li>Product received is significantly different from what was ordered</li>
              <li>Product is damaged or spoiled upon delivery</li>
              <li>Wrong product was delivered</li>
              <li>Order was not delivered on the scheduled date/time</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '300ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">4. Non-Refundable Situations</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Refunds will NOT be provided in the following cases:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Change of mind after delivery</li>
              <li>Minor variations in taste or appearance (inherent to handmade products)</li>
              <li>Damage caused by improper storage or handling after delivery</li>
              <li>Delay in consumption leading to quality degradation</li>
              <li>Customer unavailability for delivery at scheduled time</li>
              <li>Incorrect address provided by customer</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">5. Damaged or Defective Products</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you receive a damaged or defective product:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Contact us immediately (within 2 hours of delivery)</li>
              <li>Provide clear photos of the product and packaging</li>
              <li>Do not consume or dispose of the product until we respond</li>
              <li>We will offer a replacement or full refund at our discretion</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '500ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">6. Refund Process</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Once your refund is approved:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Refunds will be processed within 5-7 business days</li>
              <li>Refund will be credited to the original payment method</li>
              <li>For cash payments, refund will be via bank transfer</li>
              <li>You will receive a confirmation email once processed</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Please note: Bank processing times may vary and can take an additional 5-10 business days for the refund to reflect in your account.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '600ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">7. Partial Refunds</h2>
            <p className="text-gray-700 leading-relaxed">
              Partial refunds may be granted in cases where only some items in a multi-item order are affected, or when there are minor issues that do not warrant a full refund.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '700ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">8. Custom Orders</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Custom and designer cakes have special refund terms:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>50% advance payment is non-refundable after design confirmation</li>
              <li>Cancellations after production begins: No refund</li>
              <li>Minor design variations: Not eligible for refund</li>
              <li>Major design discrepancies: Full refund or replacement</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '800ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">9. Promotional Discounts</h2>
            <p className="text-gray-700 leading-relaxed">
              If you received a promotional discount on your order, the refund amount will be calculated based on the discounted price paid, not the original price.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '900ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">10. Exceptions</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to make exceptions to this policy in extraordinary circumstances. All refund decisions made by TheCakeTime management are final.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '1000ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">11. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              For refund inquiries or concerns, please contact us:
            </p>
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
              <p className="font-semibold">TheCakeTime</p>
              <p>Email: info@thecaketime.com</p>
              <p>Phone: +91 123 456 7890</p>
              <p>WhatsApp: +91 123 456 7890</p>
              <p>Address: 123 Bakery Street, Delhi, India 110001</p>
            </div>
          </div>
        </div>
      </div>

      <FloatingCart count={cart.length} total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} />
      <Footer />
    </>
  )
}
