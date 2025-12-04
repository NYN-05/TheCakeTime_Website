import Head from 'next/head'
import Image from 'next/image'
import { Award, Heart, Users, TrendingUp, Sparkles, ChefHat, Star, Target } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useScrollAnimation, FloatingCart } from '../components/UniqueEffects'
import { useCart } from '../contexts/CartContext'
import { useState, useEffect } from 'react'
import { StorySection, JourneyTimeline, AnimatedStat } from '../components/StorytellingComponents'

const milestones = [
  { year: '2020', title: 'TheCakeTime Founded', description: 'Started with a small kitchen and big dreams', icon: Sparkles },
  { year: '2021', title: 'First 1000 Customers', description: 'Reached our first milestone with overwhelming support', icon: Heart },
  { year: '2022', title: 'Awards & Recognition', description: 'Awarded Best Local Bakery by Delhi Food Critics', icon: Award },
  { year: '2023', title: 'Expansion', description: 'Opened second location and expanded delivery radius', icon: TrendingUp },
  { year: '2024', title: 'Going Digital', description: 'Launched online platform for easier ordering', icon: Star },
]

const values = [
  { icon: Heart, title: 'Quality First', description: 'We never compromise on ingredients or craftsmanship' },
  { icon: Users, title: 'Customer Focused', description: 'Every cake is made with your happiness in mind' },
  { icon: Award, title: 'Excellence', description: 'Continuous improvement and innovation in every creation' },
  { icon: TrendingUp, title: 'Growth Together', description: 'We grow by making your celebrations special' },
]

const team = [
  { name: 'Chef Rajesh Kumar', role: 'Head Baker & Founder', image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&q=80' },
  { name: 'Priya Sharma', role: 'Creative Designer', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  { name: 'Amit Patel', role: 'Pastry Specialist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
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

      {/* Our Story with Enhanced Narrative */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <StorySection>
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-bold mb-4">
                📖 OUR STORY
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                From a Dream to Your Table
              </h2>
            </div>
          </StorySection>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <StorySection delay={0.2}>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p className="text-2xl font-semibold text-pink-600">
                  It all started with a simple belief...
                </p>
                <p>
                  Every celebration deserves a perfect cake. In 2020, in a small home kitchen filled with the aroma 
                  of vanilla and chocolate, Chef Rajesh Kumar turned this belief into reality. Armed with years of 
                  culinary training and an unwavering passion for baking, he founded TheCakeTime.
                </p>
                <p>
                  The first cake we made was for a neighbor's daughter's birthday. When we saw her face light up, 
                  we knew we had found our calling. That moment - that pure joy - became our mission.
                </p>
                <p>
                  Today, we're not just a bakery. We're memory makers, celebration creators, and dream bakers. 
                  Each cake tells a story, and we're honored to be part of yours.
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-pink-200">
                  <ChefHat className="text-pink-600" size={32} />
                  <div>
                    <p className="font-bold text-gray-900">Chef Rajesh Kumar</p>
                    <p className="text-sm text-gray-600">Founder & Head Baker</p>
                  </div>
                </div>
              </div>
            </StorySection>
            
            <StorySection delay={0.4}>
              <div className="relative">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                  <Image
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                    alt="Our Bakery"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/30 to-purple-600/30"></div>
                  
                  {/* Floating stats on image */}
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-pink-600">2020</div>
                    <div className="text-sm text-gray-600">Est.</div>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <Heart className="text-pink-600 fill-pink-600" size={24} />
                      <div>
                        <div className="text-2xl font-bold text-pink-600">15K+</div>
                        <div className="text-xs text-gray-600">Happy Customers</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl opacity-30 -z-10"></div>
              </div>
            </StorySection>
          </div>
          
          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <StorySection delay={0.3}>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl border-2 border-pink-200 hover:shadow-xl transition-all">
                <Target className="text-pink-600 mb-4" size={40} />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To create exceptional cakes that transform ordinary moments into extraordinary celebrations. 
                  We believe every cake should be a masterpiece - beautiful, delicious, and made with love.
                </p>
              </div>
            </StorySection>
            
            <StorySection delay={0.4}>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all">
                <Sparkles className="text-purple-600 mb-4" size={40} />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To be the most trusted name in celebration cakes, known for quality, creativity, and care. 
                  We aspire to be part of every special moment, spreading joy one cake at a time.
                </p>
              </div>
            </StorySection>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700 text-white">
        <div className="max-w-6xl mx-auto">
          <StorySection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
                By the Numbers
              </h2>
              <p className="text-pink-100 text-lg">Our journey in statistics</p>
            </div>
          </StorySection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <AnimatedStat value={15000} suffix="+" label="Happy Customers" icon={Users} />
            </div>
            <div className="text-center">
              <AnimatedStat value={25000} suffix="+" label="Cakes Baked" icon={Heart} />
            </div>
            <div className="text-center">
              <AnimatedStat value={98} suffix="%" label="Satisfaction Rate" icon={Star} />
            </div>
            <div className="text-center">
              <AnimatedStat value={12} suffix="+" label="Master Bakers" icon={Award} />
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

      {/* Timeline with Enhanced Design */}
      <section className="section-padding bg-gradient-to-b from-white via-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          <StorySection>
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-bold mb-4">
                🎂 MILESTONES
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Our Journey Through Time
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every milestone tells a story of growth, passion, and the amazing community that supported us
              </p>
            </div>
          </StorySection>
          
          <JourneyTimeline milestones={milestones} />
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
