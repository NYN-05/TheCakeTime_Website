import Head from 'next/head'
import Image from 'next/image'
import { Award, Heart, Users, TrendingUp, Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useScrollAnimation, FloatingCart } from '../components/UniqueEffects'
import { useCart } from '../contexts/CartContext'
import { useState, useEffect } from 'react'

const milestones = [
  { year: '2020', event: 'TheCakeTime Founded', description: 'Started with a small kitchen and big dreams' },
  { year: '2021', event: 'First 1000 Customers', description: 'Reached our first milestone with overwhelming support' },
  { year: '2022', event: 'Awards & Recognition', description: 'Awarded Best Local Bakery by Delhi Food Critics' },
  { year: '2023', event: 'Expansion', description: 'Opened second location and expanded delivery radius' },
  { year: '2024', event: 'Going Digital', description: 'Launched online platform for easier ordering' },
]

const values = [
  { icon: Heart, title: 'Quality First', description: 'We never compromise on ingredients or craftsmanship' },
  { icon: Users, title: 'Customer Focused', description: 'Every cake is made with your happiness in mind' },
  { icon: Award, title: 'Excellence', description: 'Continuous improvement and innovation in every creation' },
  { icon: TrendingUp, title: 'Growth Together', description: 'We grow by making your celebrations special' },
]

const team = [
  { name: 'Chef Rajesh Kumar', role: 'Head Baker & Founder', image: 'https://via.placeholder.com/300x300/4a2c2a/ffffff?text=Chef+Rajesh' },
  { name: 'Priya Sharma', role: 'Creative Designer', image: 'https://via.placeholder.com/300x300/8b1538/ffffff?text=Priya' },
  { name: 'Amit Patel', role: 'Pastry Specialist', image: 'https://via.placeholder.com/300x300/d2691e/ffffff?text=Amit' },
]

export default function About() {
  const { cartCount, cartTotal } = useCart()
  const [mounted, setMounted] = useState(false)

  useScrollAnimation()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Head>
        <title>About Us - TheCakeTime</title>
        <meta name="description" content="Learn about TheCakeTime's journey, mission, and the team behind your favorite cakes" />
      </Head>

      <Header />
      {mounted && <FloatingCart count={cartCount} total={cartTotal} />}

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        <div className="text-center px-4 relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-pink-500 animate-pulse" size={32} />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">About TheCakeTime</h1>
          <p className="text-xl text-gray-700">Crafting Sweet Memories Since 2020</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate">
              <h2 className="text-4xl font-display font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  TheCakeTime began in 2020 with a simple belief: every celebration deserves a perfect cake. 
                  What started as a small home kitchen operation has grown into one of Delhi's most loved bakeries.
                </p>
                <p>
                  Our founder, Chef Rajesh Kumar, brought together a passion for baking with years of 
                  professional training from culinary institutes. His vision was to create cakes that 
                  not only taste amazing but also look like works of art.
                </p>
                <p>
                  Today, we serve hundreds of happy customers every month, creating custom cakes for 
                  birthdays, weddings, anniversaries, and every celebration in between. Each cake is 
                  made fresh daily with the finest ingredients and loads of love.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl scroll-animate hover:scale-105 transition-transform duration-500">
              <Image
                src="https://via.placeholder.com/600x600/ef5844/ffffff?text=Our+Bakery"
                alt="Our Bakery"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/20 to-purple-600/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center mb-12 scroll-animate bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={value.title} className="text-center scroll-animate hover:scale-105 transition-transform duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 scale-0 group-hover:scale-150 transition-all duration-500 blur-xl"></div>
                  </div>
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mb-6 shadow-lg hover:shadow-2xl hover:rotate-6 transition-all duration-300 relative">
                    <div className="absolute inset-0.5 bg-white rounded-2xl"></div>
                    <value.icon size={36} className="text-pink-600 relative z-10" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center mb-12 scroll-animate bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-6 scroll-animate" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">{milestone.year}</span>
                </div>
                <div className="flex-grow pb-8 border-l-2 border-gradient-to-b from-pink-400 to-purple-400 pl-6 relative">
                  <div className="absolute w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full -left-[9px] top-2 shadow-lg animate-pulse" />
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{milestone.event}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-display font-bold text-center mb-12 scroll-animate bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={member.name} className="card overflow-hidden text-center scroll-animate hover:shadow-2xl transition-all duration-500 hover:-translate-y-3" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="relative h-80 group overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-600/80 via-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-pink-600 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-display font-bold mb-6 scroll-animate bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Certified & Trusted</h2>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
            We maintain the highest standards of food safety and hygiene. Our bakery is certified 
            by FSSAI and follows strict quality control measures to ensure every cake meets our 
            premium standards.
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="card p-6 w-48">
              <Award size={48} className="mx-auto mb-3 text-primary-600" />
              <p className="font-semibold">FSSAI Certified</p>
            </div>
            <div className="card p-6 w-48">
              <Award size={48} className="mx-auto mb-3 text-primary-600" />
              <p className="font-semibold">Best Bakery 2022</p>
            </div>
            <div className="card p-6 w-48">
              <Award size={48} className="mx-auto mb-3 text-primary-600" />
              <p className="font-semibold">ISO Certified</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
