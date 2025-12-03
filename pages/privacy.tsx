import { useEffect } from 'react'
import Head from 'next/head'
import { Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useScrollAnimation, FloatingCart } from '../components/UniqueEffects'
import { useCart } from '../contexts/CartContext'

export default function Privacy() {
  const { cart } = useCart()
  useScrollAnimation()

  return (
    <>
      <Head>
        <title>Privacy Policy - TheCakeTime</title>
        <meta name="description" content="Privacy policy for TheCakeTime bakery services" />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 scroll-animate">
          <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            <Sparkles className="inline-block mr-3" size={32} />
            Privacy Policy
            <Sparkles className="inline-block ml-3" size={32} />
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: December 4, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="card mb-6 scroll-animate">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We collect information to provide better services to our customers. The types of information we collect include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address</li>
              <li><strong>Order Information:</strong> Products ordered, preferences, custom requirements</li>
              <li><strong>Payment Information:</strong> Billing details (processed securely through payment gateways)</li>
              <li><strong>Usage Data:</strong> How you interact with our website</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '100ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Processing and fulfilling your orders</li>
              <li>Communicating with you about orders and deliveries</li>
              <li>Sending promotional offers and updates (with your consent)</li>
              <li>Improving our products and services</li>
              <li>Preventing fraud and ensuring security</li>
              <li>Complying with legal obligations</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">3. Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We do not sell or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Delivery Partners:</strong> To fulfill your orders</li>
              <li><strong>Payment Processors:</strong> To process transactions securely</li>
              <li><strong>Service Providers:</strong> Who assist in operating our business</li>
              <li><strong>Legal Authorities:</strong> When required by law</li>
            </ul>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '300ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">4. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes SSL encryption for data transmission and secure storage systems.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">5. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Improve user experience</li>
              <li>Provide personalized content</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              You can control cookies through your browser settings, but disabling them may affect functionality.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '500ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '600ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">7. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law. Order history is typically retained for accounting and legal purposes.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '700ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">8. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '800ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">9. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected such information, please contact us immediately.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '900ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">10. Changes to Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of significant changes by posting the new policy on our website with an updated effective date.
            </p>
          </div>

          <div className="card mb-6 scroll-animate" style={{ animationDelay: '1000ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">11. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have questions or concerns about this privacy policy, please contact us:
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
