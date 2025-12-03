import { useEffect } from 'react'
import Head from 'next/head'
import { Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useScrollAnimation, FloatingCart } from '../components/UniqueEffects'
import { useCart } from '../contexts/CartContext'

export default function Terms() {
  const { cart } = useCart()
  useScrollAnimation()

  return (
    <>
      <Head>
        <title>Terms & Conditions - TheCakeTime</title>
        <meta name="description" content="Terms and conditions for TheCakeTime bakery services" />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 scroll-animate">
          <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            <Sparkles className="inline-block mr-3" size={32} />
            Terms & Conditions
            <Sparkles className="inline-block ml-3" size={32} />
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: December 4, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="card mb-6 scroll-animate">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using TheCakeTime website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '100ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">2. Products and Services</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              TheCakeTime offers freshly baked cakes, pastries, and custom cake design services. All products are made with high-quality ingredients and prepared fresh to order.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>All products are 100% vegetarian</li>
              <li>Eggless options are available for most products</li>
              <li>Custom designs require advance notice (48-72 hours)</li>
              <li>Product images are for reference; actual products may vary slightly</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">3. Order Placement</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Orders can be placed through our website, phone, or WhatsApp. By placing an order, you confirm that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>All information provided is accurate and complete</li>
              <li>You are authorized to use the payment method provided</li>
              <li>You accept responsibility for the order placed</li>
              <li>You have read and agree to our delivery and refund policies</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '300ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">4. Pricing and Payment</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              All prices are listed in Indian Rupees (INR) and include applicable taxes unless otherwise stated.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Prices are subject to change without notice</li>
              <li>Custom orders require 50% advance payment</li>
              <li>Final prices will be confirmed before order processing</li>
              <li>We accept cash, UPI, cards, and online transfers</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">5. Delivery and Pickup</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We strive to deliver orders on time. However, delivery times are estimates and not guaranteed. Please refer to our Delivery Policy for detailed information.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '500ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">6. Cancellations and Refunds</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Cancellation and refund requests are subject to our Refund Policy. Custom orders may have different cancellation terms due to the personalized nature of the product.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '600ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">7. Quality and Freshness</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              All products are made fresh daily. For best taste and quality:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Consume cakes within 24 hours of delivery</li>
              <li>Store products in refrigeration as recommended</li>
              <li>Check expiry dates and storage instructions provided</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '700ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">8. Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              TheCakeTime is not liable for any damages resulting from improper storage, handling, or consumption of our products after delivery. We are not responsible for allergic reactions; customers must inform us of allergies before ordering.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '800ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">9. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on this website, including images, text, logos, and designs, are the property of TheCakeTime and protected by copyright laws. Unauthorized use is prohibited.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '900ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">10. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of the modified terms.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '1000ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">11. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these terms, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
              <p className="font-semibold">TheCakeTime</p>
              <p>Email: info@thecaketime.com</p>
              <p>Phone: +91 123 456 7890</p>
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
