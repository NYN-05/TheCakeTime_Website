import { useState, useEffect } from 'react'
import Head from 'next/head'
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useScrollAnimation, FloatingCart } from '../components/UniqueEffects'
import { useCart } from '../contexts/CartContext'

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What are your operating hours?',
        a: 'We are open Monday to Saturday from 9:00 AM to 9:00 PM, and Sunday from 10:00 AM to 6:00 PM.'
      },
      {
        q: 'Do you use fresh ingredients?',
        a: 'Yes, we use only the freshest and highest quality ingredients. Our cakes are made fresh daily with no preservatives.'
      },
      {
        q: 'Are your products vegetarian?',
        a: 'Yes, all our products are 100% vegetarian. We offer both egg and eggless options.'
      },
    ]
  },
  {
    category: 'Orders & Delivery',
    questions: [
      {
        q: 'How do I place an order?',
        a: 'You can place an order through our website, call us directly, or message us on WhatsApp. For custom orders, please use our Custom Order form.'
      },
      {
        q: 'What is the minimum advance time required for orders?',
        a: 'Regular cakes require 24 hours advance notice. Custom and designer cakes need 48-72 hours depending on complexity.'
      },
      {
        q: 'Do you offer same-day delivery?',
        a: 'Yes, same-day delivery is available for select areas and products if ordered before 12 PM. Additional charges may apply.'
      },
      {
        q: 'What is your delivery area?',
        a: 'We deliver across Delhi NCR. Delivery charges vary based on location. Contact us to check if we deliver to your area.'
      },
      {
        q: 'Can I pick up my order from the store?',
        a: 'Yes, you can pick up your order from our store. Please inform us in advance and arrive during business hours.'
      },
    ]
  },
  {
    category: 'Custom Cakes',
    questions: [
      {
        q: 'Can you create custom designs?',
        a: 'Absolutely! We specialize in custom cakes. Share your design ideas, themes, or reference images, and our team will create something special for you.'
      },
      {
        q: 'How much do custom cakes cost?',
        a: 'Custom cake prices vary based on size, design complexity, and flavors. After you submit your requirements, we will provide a detailed quote.'
      },
      {
        q: 'Can you make photo cakes?',
        a: 'Yes, we can print edible images on cakes. Please provide high-resolution photos at least 48 hours in advance.'
      },
      {
        q: 'Do you make sugar-free or vegan cakes?',
        a: 'Yes, we offer sugar-free and vegan options. Please specify your requirements when placing the order.'
      },
    ]
  },
  {
    category: 'Payment & Pricing',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept cash, UPI, credit/debit cards, and online bank transfers.'
      },
      {
        q: 'Do I need to pay in advance?',
        a: 'For custom orders, we require 50% advance payment. Regular orders can be paid on delivery or pickup.'
      },
      {
        q: 'Are there any additional charges?',
        a: 'Delivery charges apply based on location. Custom designs and special dietary requirements may have additional costs.'
      },
    ]
  },
  {
    category: 'Cancellation & Refunds',
    questions: [
      {
        q: 'Can I cancel my order?',
        a: 'Orders can be cancelled up to 24 hours before delivery for a full refund. Cancellations within 24 hours may incur charges.'
      },
      {
        q: 'What is your refund policy?',
        a: 'If you are not satisfied with your cake, please contact us immediately. We will work to resolve the issue or provide a refund as per our policy.'
      },
      {
        q: 'What if my cake arrives damaged?',
        a: 'Please contact us immediately with photos. We will either replace the cake or provide a full refund.'
      },
    ]
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)
  const { cart } = useCart()
  useScrollAnimation()

  const toggleFAQ = (category: string, index: number) => {
    const key = `${category}-${index}`
    setOpenIndex(openIndex === key ? null : key)
  }

  return (
    <>
      <Head>
        <title>FAQ - TheCakeTime</title>
        <meta name="description" content="Frequently asked questions about TheCakeTime orders, delivery, and custom cakes" />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 scroll-animate">
          <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            <Sparkles className="inline-block mr-3" size={32} />
            Frequently Asked Questions
            <Sparkles className="inline-block ml-3" size={32} />
          </h1>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our products and services
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent scroll-animate">
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.questions.map((faq, idx) => {
                  const key = `${section.category}-${idx}`
                  const isOpen = openIndex === key

                  return (
                    <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 scroll-animate" style={{ animationDelay: `${idx * 50}ms` }}>
                      <button
                        onClick={() => toggleFAQ(section.category, idx)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-300"
                      >
                        <span className="font-bold pr-8">{faq.q}</span>
                        {isOpen ? (
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                            <ChevronUp className="text-white" size={20} />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 transition-all duration-300">
                            <ChevronDown className="text-gray-600 group-hover:text-white" size={20} />
                          </div>
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-gray-700 leading-relaxed animate-fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-8 text-center shadow-xl scroll-animate">
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Still have questions?</h3>
          <p className="text-gray-700 mb-6 text-lg">
            Can't find what you're looking for? Our team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
              Contact Us
            </a>
            <a href="https://wa.me/1234567890" className="btn-outline border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <FloatingCart cart={cart} />
      <Footer />
    </>
  )
}
