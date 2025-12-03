import { useState, useEffect } from 'react'
import Head from 'next/head'
import { MapPin, Phone, Mail, Clock, Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useScrollAnimation, FloatingCart } from '../components/UniqueEffects'
import { useCart } from '../contexts/CartContext'

export default function Contact() {
  const { cartCount, cartTotal } = useCart()
  const [mounted, setMounted] = useState(false)

  useScrollAnimation()

  useEffect(() => {
    setMounted(true)
  }, [])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <Head>
        <title>Contact Us - TheCakeTime</title>
        <meta name="description" content="Get in touch with TheCakeTime for orders, inquiries, or feedback" />
      </Head>

      <Header />
      {mounted && <FloatingCart count={cartCount} total={cartTotal} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 scroll-animate">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-pink-500 animate-pulse" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Contact Us</h1>
          <p className="text-gray-600 text-lg">
            We'd love to hear from you! Reach out for orders, questions, or just to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="scroll-animate">
            <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Get in Touch</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start p-4 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MapPin className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-gray-600">
                    123 Bakery Street<br />
                    Connaught Place<br />
                    Delhi, India 110001
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Phone className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+911234567890" className="hover:text-primary-600">+91 123 456 7890</a><br />
                    <a href="tel:+919876543210" className="hover:text-primary-600">+91 987 654 3210</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <Mail className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@thecaketime.com" className="hover:text-pink-600 transition-colors">info@thecaketime.com</a><br />
                    <a href="mailto:orders@thecaketime.com" className="hover:text-pink-600 transition-colors">orders@thecaketime.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <Clock className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold mb-1">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Saturday: 9:00 AM - 9:00 PM<br />
                    Sunday: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-1 shadow-lg">
              <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                <p className="text-gray-500">Google Maps Integration</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 flex gap-4">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                WhatsApp Us
              </a>
              <a
                href="tel:+911234567890"
                className="flex-1 text-center border-2 border-pink-600 text-pink-600 px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Send Us a Message</h2>
            
            {submitted && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-800 px-4 py-3 rounded-xl mb-6 shadow-md animate-bounce-in">
                ✨ Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="scroll-animate" style={{ animationDelay: '100ms' }}>
                <label className="block text-sm font-bold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field focus:ring-2 focus:ring-pink-500 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div className="scroll-animate" style={{ animationDelay: '200ms' }}>
                <label className="block text-sm font-bold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field focus:ring-2 focus:ring-pink-500 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div className="scroll-animate" style={{ animationDelay: '300ms' }}>
                <label className="block text-sm font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field focus:ring-2 focus:ring-pink-500 transition-all"
                  placeholder="+91 1234567890"
                />
              </div>

              <div className="scroll-animate" style={{ animationDelay: '400ms' }}>
                <label className="block text-sm font-bold mb-2">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-field focus:ring-2 focus:ring-pink-500 transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="custom">Custom Cake Request</option>
                  <option value="feedback">Feedback</option>
                  <option value="complaint">Complaint</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="scroll-animate" style={{ animationDelay: '500ms' }}>
                <label className="block text-sm font-bold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-field focus:ring-2 focus:ring-pink-500 transition-all"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button type="submit" className="btn-primary w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
