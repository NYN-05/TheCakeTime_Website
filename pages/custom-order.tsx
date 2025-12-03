import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Upload, Calendar, MessageSquare, Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useScrollAnimation, FloatingCart } from '../components/UniqueEffects'
import { useCart } from '../contexts/CartContext'

export default function CustomOrder() {
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
    cakeType: '',
    flavor: '',
    weight: '',
    shape: '',
    theme: '',
    message: '',
    deliveryDate: '',
    deliveryTime: '',
    additionalNotes: '',
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData, imageFile)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <Head>
          <title>Order Submitted - TheCakeTime</title>
        </Head>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl text-center animate-bounce-in">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-in">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-display font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              <Sparkles className="inline-block mr-2" size={28} />
              Order Submitted Successfully!
              <Sparkles className="inline-block ml-2" size={28} />
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Thank you for your custom order request. Our team will review your requirements and contact you within 24 hours.
            </p>
            <button onClick={() => setSubmitted(false)} className="btn-primary bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-300 mb-3">
              Submit Another Order
            </button>
            <br />
            <a href="/" className="text-pink-600 hover:text-purple-600 font-semibold hover:underline transition-colors">
              Back to Home
            </a>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Custom Order - TheCakeTime</title>
        <meta name="description" content="Create your perfect custom cake with TheCakeTime" />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 scroll-animate">
          <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            <Sparkles className="inline-block mr-3" size={32} />
            Custom Cake Order
            <Sparkles className="inline-block ml-3" size={32} />
          </h1>
          <p className="text-gray-600 text-lg">
            Let us create the perfect cake for your special occasion. Fill out the form below with your requirements.
          </p>
        </div>

        {/* Instruction Banner */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-l-4 border-pink-500 p-6 rounded-xl mb-8 shadow-md scroll-animate">
          <h3 className="font-bold mb-2 flex items-center text-lg">
            <MessageSquare className="mr-2 text-pink-600" size={24} />
            How It Works
          </h3>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Fill out the customization form with your preferences</li>
            <li>Upload a reference image if you have one (optional)</li>
            <li>Our team will review and contact you within 24 hours</li>
            <li>We'll confirm the design and provide a price estimate</li>
            <li>Your cake will be freshly prepared and delivered on time</li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8">
          {/* Contact Information */}
          <div className="mb-8 scroll-animate">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="+91 1234567890"
                />
              </div>
            </div>
          </div>

          {/* Cake Specifications */}
          <div className="mb-8 scroll-animate" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Cake Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Cake Type *</label>
                <select
                  name="cakeType"
                  value={formData.cakeType}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select type</option>
                  <option value="regular">Regular Cake</option>
                  <option value="photo">Photo Cake</option>
                  <option value="tiered">Multi-Tiered</option>
                  <option value="designer">Designer Cake</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Flavor *</label>
                <select
                  name="flavor"
                  value={formData.flavor}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select flavor</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="vanilla">Vanilla</option>
                  <option value="red-velvet">Red Velvet</option>
                  <option value="butterscotch">Butterscotch</option>
                  <option value="strawberry">Strawberry</option>
                  <option value="pineapple">Pineapple</option>
                  <option value="black-forest">Black Forest</option>
                  <option value="mango">Mango</option>
                  <option value="other">Other (specify in notes)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Weight *</label>
                <select
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select weight</option>
                  <option value="500g">500g</option>
                  <option value="1kg">1kg</option>
                  <option value="1.5kg">1.5kg</option>
                  <option value="2kg">2kg</option>
                  <option value="3kg">3kg</option>
                  <option value="4kg">4kg</option>
                  <option value="5kg">5kg+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Shape *</label>
                <select
                  name="shape"
                  value={formData.shape}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select shape</option>
                  <option value="round">Round</option>
                  <option value="square">Square</option>
                  <option value="heart">Heart</option>
                  <option value="rectangle">Rectangle</option>
                  <option value="custom">Custom Shape</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customization Details */}
          <div className="mb-8 scroll-animate" style={{ animationDelay: '300ms' }}>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Customization Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Theme / Occasion</label>
                <input
                  type="text"
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Birthday, Anniversary, Wedding"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message on Cake</label>
                <input
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Happy Birthday Sarah!"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Upload Reference Image</label>
                <div className="border-2 border-dashed border-pink-300 rounded-xl p-6 text-center hover:border-purple-400 hover:bg-gradient-to-br hover:from-pink-50 hover:to-purple-50 transition-all duration-300">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="mx-auto mb-2 text-pink-500" size={40} />
                    <p className="text-sm text-gray-600 font-medium">
                      {imageFile ? imageFile.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="mb-8 scroll-animate" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-bold mb-4 flex items-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              <Calendar className="mr-2 text-pink-600" size={24} />
              Delivery Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Delivery Date *</label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Preferred Time *</label>
                <select
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select time slot</option>
                  <option value="10am-12pm">10:00 AM - 12:00 PM</option>
                  <option value="12pm-2pm">12:00 PM - 2:00 PM</option>
                  <option value="2pm-4pm">2:00 PM - 4:00 PM</option>
                  <option value="4pm-6pm">4:00 PM - 6:00 PM</option>
                  <option value="6pm-8pm">6:00 PM - 8:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2">Additional Notes / Special Requirements</label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={4}
              className="input-field"
              placeholder="Any special instructions, dietary requirements, or additional details..."
            />
          </div>

          {/* Submit Button */}
          <div className="text-center scroll-animate" style={{ animationDelay: '500ms' }}>
            <button type="submit" className="btn-primary text-lg px-12 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
              Submit Custom Order Request
            </button>
            <p className="text-sm text-gray-600 mt-4">
              ✨ We'll contact you within 24 hours to confirm your order and provide a quote.
            </p>
          </div>
        </form>
      </div>

      <Footer />
    </>
  )
}
