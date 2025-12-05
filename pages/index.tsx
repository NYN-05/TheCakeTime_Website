import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Cake, Heart, Truck, Award, Star, ChevronRight, Sparkles, Calendar } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductImage from '../components/ProductImage'
import { useScrollAnimation, useParallax, FloatingCart } from '../components/UniqueEffects'
import { useCart } from '../contexts/CartContext'
import { useEffect, useState } from 'react'
import { InfiniteMovingCardsDemo } from '../components/InfiniteMovingCardsDemo'
import { CardContainer, CardBody, CardItem } from '../components/ui/3d-card'
import WobbleCardDemo from '../components/wobble-card-demo'
import { InlineTextReveal } from '../components/ui/inline-text-reveal'
import { FollowingPointerDemo } from '../components/FollowingPointerDemo'
import { StatsSection } from '../components/AnimatedCounter'
import { useToast } from '../components/ToastNotification'
import { QuickViewModal, useQuickView } from '../components/QuickViewModal'
import { FAQAccordion } from '../components/FAQAccordion'
import { TypewriterEffect, ImageComparisonSlider } from '../components/EnhancedEffects'
import { ParticleButton } from '../components/Confetti'
import { 
  StorySection, 
  JourneyTimeline, 
  SensoryCard, 
  CustomerStory, 
  BehindTheScenes,
  AnimatedStat,
  FlavorJourney
} from '../components/StorytellingComponents'
import { ScrollProgressBar, ScrollToTopButton } from '../components/ScrollProgress'
import { Eye, Waves, Coffee, Wind, Users, Sparkles as SparklesIcon } from 'lucide-react'

const categories = [
  { name: 'Birthday Cakes', image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80', link: '/products?category=birthday' },
  { name: 'Custom Cakes', image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=80', link: '/custom-order' },
  { name: 'Pastries', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80', link: '/products?category=pastries' },
  { name: 'Seasonal Specials', image: 'https://images.unsplash.com/photo-1602351447937-745cb720612f?w=800&q=80', link: '/products?category=seasonal' },
]

const bestSellers = [
  { id: 1, name: 'Chocolate Truffle Delight', price: 899, rating: 4.8, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80' },
  { id: 2, name: 'Red Velvet Romance', price: 799, rating: 4.9, image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80' },
  { id: 3, name: 'Vanilla Dream', price: 699, rating: 4.7, image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80' },
  { id: 4, name: 'Black Forest Classic', price: 849, rating: 4.8, image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80' },
]

const testimonials = [
  { name: 'Priya Sharma', text: 'Best cakes in town! The chocolate truffle was absolutely divine.', rating: 5 },
  { name: 'Rahul Verma', text: 'Amazing custom cake for my daughter\'s birthday. Everyone loved it!', rating: 5 },
  { name: 'Anita Desai', text: 'Fresh ingredients and beautiful presentation. Highly recommend!', rating: 5 },
]

const usps = [
  { icon: Cake, title: 'Fresh Daily', description: 'Made fresh with premium ingredients every day' },
  { icon: Heart, title: 'Made with Love', description: 'Every cake crafted with passion and care' },
  { icon: Truck, title: 'Fast Delivery', description: 'Same-day delivery available in select areas' },
  { icon: Award, title: 'Certified Bakers', description: 'Experienced professionals with awards' },
]

const journeyMilestones = [
  { year: '2020', title: 'The Dream Begins', description: 'Started in a small home kitchen with a passion for creating perfect cakes', icon: Sparkles },
  { year: '2021', title: '1000 Sweet Celebrations', description: 'Reached our first milestone - 1000 happy customers and countless memories', icon: Heart },
  { year: '2022', title: 'Award-Winning Excellence', description: 'Recognized as "Best Local Bakery" by food critics and loved by the community', icon: Award },
  { year: '2023', title: 'Growing Together', description: 'Expanded our team and delivery reach to serve more neighborhoods', icon: Users },
  { year: '2024', title: 'Digital Innovation', description: 'Launched online platform making cake ordering easier than ever', icon: Sparkles },
]

const sensoryExperiences = [
  { sense: 'Sight', icon: Eye, title: 'Feast for the Eyes', description: 'Each cake is a masterpiece, adorned with intricate designs, vibrant colors, and artistic decorations that captivate before the first bite.' },
  { sense: 'Aroma', icon: Waves, title: 'Irresistible Fragrance', description: 'The sweet scent of vanilla, rich chocolate, and freshly baked goodness fills the air, awakening your senses and building anticipation.' },
  { sense: 'Taste', icon: Coffee, title: 'Flavor Symphony', description: 'Premium Belgian chocolate, Madagascar vanilla, and fresh cream dance on your palate in perfect harmony, creating unforgettable moments.' },
  { sense: 'Texture', icon: Wind, title: 'Velvety Perfection', description: 'From light, fluffy sponge to silky smooth frosting - every layer offers a different textural delight that melts in your mouth.' },
]

const customerStories = [
  {
    name: 'Priya',
    occasion: 'Daughter\'s 5th Birthday',
    quote: 'This wasn\'t just a cake, it was magic wrapped in frosting',
    story: 'When my daughter saw her unicorn cake, her eyes lit up like stars. The cake was exactly what she had drawn in her little notebook - down to the rainbow mane and golden horn. But what made it truly special was watching her face as she made her wish. TheCakeTime didn\'t just deliver a cake; they delivered a memory that will last forever. Every guest at the party couldn\'t stop talking about how beautiful and delicious it was. Three weeks later, my daughter still talks about her "magical unicorn cake" and has already started planning next year\'s cake with me!',
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80'
  },
  {
    name: 'Rahul & Anjali',
    occasion: '10th Anniversary',
    quote: 'They captured our love story in layers of perfection',
    story: 'For our 10th anniversary, we wanted something special that told our story. The team at TheCakeTime sat with us, listened to our journey, and created a three-tier masterpiece. The bottom tier represented our first date at a coffee shop with coffee-flavored sponge, the middle tier had red velvet for our wedding, and the top tier was vanilla - our daughter\'s favorite. Each layer was a chapter of our life together. When we cut into it at our anniversary party, we weren\'t just cutting a cake - we were celebrating a decade of memories. It was moist, flavorful, and absolutely stunning. Our guests were amazed, and we were in tears. Thank you for making our anniversary unforgettable!',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80'
  }
]

const bakingProcess = [
  { 
    step: 'Selection', 
    title: 'Handpicking Premium Ingredients', 
    description: 'Every morning begins with carefully selecting the finest ingredients. We source Belgian chocolate, farm-fresh eggs, pure vanilla extract, and organic flour. Quality ingredients are the foundation of exceptional taste.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'
  },
  { 
    step: 'Crafting', 
    title: 'Expert Hands at Work', 
    description: 'Our master bakers, each with over 10 years of experience, carefully measure, mix, and prepare each batter. Every cake is made from scratch - no preservatives, no shortcuts, just pure craftsmanship.',
    image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=800&q=80'
  },
  { 
    step: 'Baking', 
    title: 'Perfection in the Oven', 
    description: 'Temperature, timing, and technique - these three elements must align perfectly. We monitor each cake, ensuring it rises beautifully and develops that golden perfection. The aroma that fills our bakery is pure magic.',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80'
  },
  { 
    step: 'Decorating', 
    title: 'Artistry Meets Flavor', 
    description: 'This is where your vision comes to life. Our decorators transform cakes into edible art, carefully piping, sculpting, and placing each element. Whether it\'s delicate sugar flowers or intricate patterns, every detail matters.',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80'
  },
  { 
    step: 'Delivery', 
    title: 'Bringing Joy to Your Door', 
    description: 'Your cake is carefully packaged in special boxes that maintain freshness and protect the design. Our delivery team treats each cake like the precious cargo it is, ensuring it arrives perfect and on time for your celebration.',
    image: 'https://images.unsplash.com/photo-1513396954618-c43b7c2e9d8a?w=800&q=80'
  }
]

const signatureFlavors = [
  { name: 'Rich Chocolate', color: '#4a2c2a', description: 'Indulge in layers of moist chocolate sponge infused with premium Belgian cocoa, filled with silky ganache and topped with chocolate shavings. Pure decadence in every bite.' },
  { name: 'Vanilla Dream', color: '#f4e4c1', description: 'Experience the elegance of Madagascar vanilla - light, aromatic sponge layered with smooth vanilla buttercream. Simple yet sophisticated, this timeless classic never disappoints.' },
  { name: 'Red Velvet Romance', color: '#8b1538', description: 'Fall in love with the perfect balance of cocoa and vanilla, creating that iconic red hue and velvety texture. Crowned with tangy cream cheese frosting for the ultimate indulgence.' },
  { name: 'Tropical Mango', color: '#ffa500', description: 'Escape to paradise with fresh mango pulp folded into fluffy sponge and mango mousse. Bursting with tropical sunshine and natural sweetness in every layer.' },
  { name: 'Coffee Delight', color: '#6f4e37', description: 'For coffee lovers - espresso-infused sponge paired with mocha buttercream. The perfect balance of bold coffee flavor and sweet indulgence that energizes and satisfies.' }
]

export default function Home() {
  const { cartCount, cartTotal, addToCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const { showToast } = useToast()
  const { selectedProduct, isOpen, openQuickView, closeQuickView } = useQuickView()

  useScrollAnimation()
  useParallax()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = (product: any) => {
    addToCart(product)
    showToast(`${product.name} added to cart! 🎂`, 'cake')
  }

  return (
    <>
      <Head>
        <title>TheCakeTime - Premium Cakes & Pastries</title>
        <meta name="description" content="Order premium custom cakes, birthday cakes, and pastries. Same-day delivery available." />
      </Head>

      <ScrollProgressBar />
      <ScrollToTopButton />
      <Header />

      {/* Floating Cart Preview */}
      {mounted && <FloatingCart count={cartCount} total={cartTotal} />}

      {/* Hero Section with Parallax */}
      <section className="relative h-[700px] overflow-hidden">
        {/* Animated Background with Parallax */}
        <div className="absolute inset-0 parallax" data-speed="0.5">
          <Image 
            src="/images/hero-banner-chocolate-cake.jpg" 
            alt="Premium Chocolate Cake"
            fill
            className="object-cover scale-110"
            priority
          />
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-pink-900/50 to-black/60 animate-gradient"></div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 animate-float-slow">
            <Sparkles className="text-pink-300 opacity-60" size={40} />
          </div>
          <div className="absolute top-40 right-20 animate-float-delay">
            <Sparkles className="text-yellow-300 opacity-50" size={30} />
          </div>
          <div className="absolute bottom-32 left-1/4 animate-float">
            <Sparkles className="text-pink-400 opacity-40" size={35} />
          </div>
        </div>
        
        {/* Content with entrance animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl animate-fade-in-up">
            <div className="mb-4 inline-block">
              <span className="px-4 py-2 bg-pink-500/20 backdrop-blur-sm border border-pink-300/30 rounded-full text-pink-200 text-sm font-semibold animate-pulse-slow">
                ✨ Premium Handcrafted Cakes
              </span>
            </div>
            <InlineTextReveal
              beforeText="Celebrate Every Moment with"
              revealText="TheCakeTime"
              className="text-5xl md:text-7xl font-display font-bold text-white mb-6 animate-text-shimmer bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent bg-[length:200%_auto]"
            />
            <p className="text-xl md:text-2xl text-pink-100 mb-8 animate-fade-in-up animation-delay-200">
              {!mounted && "Premium custom cakes crafted with love"}
              {mounted && (
                <TypewriterEffect 
                  words={[
                    "Premium custom cakes crafted with love",
                    "Fresh ingredients, unforgettable taste",
                    "Making your celebrations sweeter",
                    "Baked fresh daily with passion"
                  ]}
                  className="text-pink-100"
                />
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link href="/products" className="btn-primary group relative overflow-hidden">
                <span className="relative z-10">View Products</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>
              <Link href="/custom-order" className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full font-semibold transition-all hover:shadow-xl hover:scale-105 border-2 border-pink-200">
                Custom Order ✨
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories with Hover Effects */}
      <section className="section-padding bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Our Categories
            </h2>
            <p className="text-gray-600 text-lg">Discover your perfect cake from our curated collection</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, idx) => (
              <Link key={category.name} href={category.link} className="group scroll-animate" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="card overflow-hidden relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <ProductImage 
                      src={category.image} 
                      alt={category.name} 
                      fill 
                      className="object-cover group-hover:scale-125 group-hover:rotate-3 transition-transform duration-500"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 text-center relative">
                    <h3 className="text-xl font-semibold group-hover:text-pink-600 transition-colors">{category.name}</h3>
                    <div className="mt-2 text-pink-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore →
                    </div>
                  </div>
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500 transform rotate-45 translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Wobble Cards */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose TheCakeTime
            </h2>
            <p className="text-gray-600 text-lg">Experience excellence in every bite</p>
          </div>
          <div className="scroll-animate">
            <WobbleCardDemo />
          </div>
        </div>
      </section>

      {/* 5 Pitch-Winning Features */}
      <section className="section-padding bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Premium Features That Set Us Apart
            </h2>
            <p className="text-xl text-pink-100">Experience the future of cake ordering</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Cake Customizer */}
            <Link href="/customizer" className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  <Cake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Interactive Cake Customizer</h3>
                <p className="text-pink-100 mb-4">Design your dream cake in 3D with real-time preview. Choose tiers, flavors, and decorations.</p>
                <div className="flex items-center text-pink-300 font-semibold group-hover:text-white transition-colors">
                  Try It Now <ChevronRight className="ml-1 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Feature 2: Live Order Tracking */}
            <Link href="/track-order" className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Live Order Tracking</h3>
                <p className="text-pink-100 mb-4">Track your cake from oven to doorstep. Real-time updates at every stage.</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/30 rounded-full text-sm font-bold mb-4">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  99.2% On-Time Delivery
                </div>
                <div className="flex items-center text-pink-300 font-semibold group-hover:text-white transition-colors">
                  Track Demo <ChevronRight className="ml-1 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Feature 3: Before/After Gallery */}
            <Link href="/custom-orders-gallery" className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Vision to Reality Gallery</h3>
                <p className="text-pink-100 mb-4">See 500+ customer sketches transformed into stunning cakes. Proof of our perfection.</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/30 rounded-full text-sm font-bold mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  99.8% Accuracy Rate
                </div>
                <div className="flex items-center text-pink-300 font-semibold group-hover:text-white transition-colors">
                  View Gallery <ChevronRight className="ml-1 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Feature 4: Smart Delivery Slots */}
            <Link href="/delivery" className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Smart Delivery Booking</h3>
                <p className="text-pink-100 mb-4">Choose your exact delivery time. See available slots in real-time with priority options.</p>
                <div className="flex items-center text-pink-300 font-semibold group-hover:text-white transition-colors">
                  Book Slot <ChevronRight className="ml-1 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Feature 5: AI Recommendations */}
            <Link href="/find-cake" className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">AI-Powered Recommendations</h3>
                <p className="text-pink-100 mb-4">Answer 3 questions, get the perfect cake. Smart suggestions based on occasion, age & guests.</p>
                <div className="flex items-center text-pink-300 font-semibold group-hover:text-white transition-colors">
                  Find My Cake <ChevronRight className="ml-1 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/30 flex flex-col justify-center items-center text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to Experience?</h3>
              <p className="text-pink-100 mb-6">Start designing your perfect cake today</p>
              <Link href="/customizer" className="px-8 py-4 bg-white text-pink-600 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all">
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers with Unique Card Design */}
      <section className="section-padding bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-12 scroll-animate">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                Best Sellers
              </h2>
              <p className="text-gray-600 mt-2">Our customers' favorite cakes</p>
            </div>
            <Link href="/products" className="group flex items-center text-pink-600 hover:text-pink-700 font-semibold bg-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
              View All 
              <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((cake, idx) => (
              <div key={cake.id} className="scroll-animate" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardContainer className="inter-var w-full h-full" containerClassName="py-0 p-0">
                  <CardBody className="bg-white/90 backdrop-blur-sm relative group/card border border-pink-200 w-full h-full rounded-2xl p-0 shadow-lg hover:shadow-2xl transition-all overflow-hidden glassmorphism hover-zoom">
                    {/* Bestseller badge */}
                    <div className="absolute top-4 -left-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-1 text-xs font-bold rotate-[-45deg] z-20 shadow-lg">
                      POPULAR
                    </div>
                    
                    {/* Gradient hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover/card:from-pink-500/10 group-hover/card:to-purple-500/10 transition-all duration-300 rounded-2xl"></div>
                    
                    <CardItem translateZ="100" className="w-full">
                      <div className="relative h-56 overflow-hidden rounded-t-2xl">
                        <ProductImage 
                          src={cake.image} 
                          alt={cake.name} 
                          fill 
                          className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                        />
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-700"></div>
                      </div>
                    </CardItem>
                    
                    <div className="p-5 relative z-10">
                      <CardItem translateZ="50" className="text-lg font-bold mb-2 text-gray-900 group-hover/card:text-pink-600 transition-colors">
                        {cake.name}
                      </CardItem>
                      <CardItem translateZ="60" className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Starting from</div>
                          <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                            ₹{cake.price}
                          </span>
                        </div>
                        <div className="flex items-center bg-gradient-to-br from-yellow-50 to-orange-50 px-3 py-1.5 rounded-full shadow-sm">
                          <Star size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-sm font-bold text-yellow-700">{cake.rating}</span>
                        </div>
                      </CardItem>
                      
                      {/* Quick add button */}
                      <CardItem translateZ="80" className="w-full">
                        <ParticleButton
                          onClick={() => openQuickView(cake)}
                          className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white py-2.5 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all transform hover:scale-[1.02]"
                        >
                          Quick View
                        </ParticleButton>
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USPs with Interactive Cards */}
      <section className="section-padding bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg">Excellence in every bite, care in every creation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {usps.map((usp, idx) => (
              <div 
                key={usp.title} 
                className="group text-center scroll-animate hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative">
                  {/* Animated circle background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 scale-0 group-hover:scale-150 transition-all duration-500 blur-xl"></div>
                  </div>
                  
                  {/* Icon container with gradient border */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mb-6 shadow-lg group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-300 relative">
                    <div className="absolute inset-0.5 bg-white rounded-2xl"></div>
                    <usp.icon size={36} className="text-pink-600 relative z-10 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-pink-600 transition-colors">{usp.title}</h3>
                <p className="text-gray-600 leading-relaxed">{usp.description}</p>
                
                {/* Decorative line */}
                <div className="mt-4 h-1 w-0 group-hover:w-16 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto transition-all duration-300 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey - Immersive Timeline */}
      <section className="section-padding bg-gradient-to-b from-white via-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          <StorySection>
            <div className="text-center mb-4">
              <div className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-bold mb-4">
                ✨ OUR STORY
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                A Journey Baked with Love
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Every great cake has a story. Ours began with a simple dream: to bring joy to every celebration. 
                Here's how we grew from a small kitchen to your trusted bakery.
              </p>
            </div>
          </StorySection>
          
          <JourneyTimeline milestones={journeyMilestones} />
        </div>
      </section>

      {/* Sensory Experience Section */}
      <section className="section-padding bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <StorySection>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold mb-4">
                🎂 EXPERIENCE THE MAGIC
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
                A Symphony for Your Senses
              </h2>
              <p className="text-xl text-pink-100 max-w-3xl mx-auto leading-relaxed">
                A truly exceptional cake engages all your senses. Let us take you on a sensory journey 
                that begins long before the first bite.
              </p>
            </div>
          </StorySection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sensoryExperiences.map((exp, idx) => (
              <StorySection key={exp.sense} delay={idx * 0.1}>
                <SensoryCard {...exp} />
              </StorySection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="section-padding bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <StorySection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Our Sweet Success Story
              </h2>
              <p className="text-gray-700 text-lg">Numbers that speak louder than words</p>
            </div>
          </StorySection>
          
          {mounted && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <AnimatedStat value={15000} suffix="+" label="Happy Customers" icon={Users} delay={0} />
              <AnimatedStat value={25000} suffix="+" label="Cakes Created" icon={Cake} delay={0.1} />
              <AnimatedStat value={4.9} suffix="/5" label="Average Rating" icon={Star} delay={0.2} />
              <AnimatedStat value={100} suffix="%" label="Fresh Daily" icon={Heart} delay={0.3} />
            </div>
          )}
          
          {mounted && <StatsSection />}
        </div>
      </section>

      {/* Customer Stories - Emotional Connection */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <StorySection>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-bold mb-4">
                ❤️ REAL STORIES
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Celebrations We've Made Special
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Behind every cake is a celebration, and behind every celebration is a story. 
                Here are just a few of the thousands of moments we've been honored to be part of.
              </p>
            </div>
          </StorySection>
          
          <div className="space-y-12">
            {customerStories.map((story, idx) => (
              <StorySection key={story.name} delay={idx * 0.2}>
                <CustomerStory {...story} />
              </StorySection>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes - Building Trust */}
      <section className="section-padding bg-gradient-to-b from-white via-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          <StorySection>
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-bold mb-4">
                🔍 BEHIND THE SCENES
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                How We Craft Your Perfect Cake
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Ever wondered what goes into making a TheCakeTime masterpiece? 
                Let us take you behind the scenes of our baking process.
              </p>
            </div>
          </StorySection>
          
          {bakingProcess.map((process, idx) => (
            <BehindTheScenes key={process.step} {...process} number={idx + 1} />
          ))}
        </div>
      </section>

      {/* Interactive Flavor Journey */}
      <section className="section-padding bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
        <div className="max-w-6xl mx-auto">
          <StorySection>
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-white text-pink-600 rounded-full text-sm font-bold mb-4">
                🍰 FLAVOR DISCOVERY
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Discover Your Perfect Flavor
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Each flavor tells a different story. Click to explore the unique character and taste profile 
                of our signature creations.
              </p>
            </div>
            
            <FlavorJourney flavors={signatureFlavors} />
          </StorySection>
        </div>
      </section>

      {/* Image Comparison Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Our Transformation Magic
            </h2>
            <p className="text-gray-700 text-lg">See how we turn dreams into delicious reality</p>
          </div>
          <div className="max-w-4xl mx-auto scroll-animate">
            <ImageComparisonSlider
              beforeImage="/images/products/vanilla-dream.jpg"
              afterImage="/images/products/chocolate-truffle-delight.jpg"
              beforeLabel="Concept"
              afterLabel="Final Creation"
            />
          </div>
        </div>
      </section>

      {/* Featured Blog with Following Pointer */}
      <section className="section-padding bg-gradient-to-b from-white to-pink-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Featured Article
            </h2>
            <p className="text-gray-700 text-lg">Explore our latest insights on cake artistry and baking tips</p>
          </div>
          
          {mounted && (
            <div className="flex justify-center scroll-animate">
              <FollowingPointerDemo />
            </div>
          )}
        </div>
      </section>

      {/* Testimonials with 3D Cards */}
      <section className="section-padding bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-gray-700 text-lg">Real stories from real people who love our cakes</p>
          </div>
          
          {/* Infinite Moving Cards Component */}
          {mounted && (
            <div className="scroll-animate">
              <InfiniteMovingCardsDemo />
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-700 text-lg">Everything you need to know about our cakes and services</p>
          </div>
          <div className="scroll-animate">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* CTA Section with Wave Animation */}
      <section className="relative section-padding bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700 text-white overflow-hidden">
        {/* Animated wave background */}
        <div className="absolute inset-0">
          <svg className="absolute bottom-0 w-full h-32 animate-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="rgba(255,255,255,0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border-4 border-white/20 rounded-full animate-spin-slow animation-delay-2000"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 scroll-animate">
          <div className="inline-block mb-6">
            <Sparkles className="text-yellow-300 animate-pulse" size={48} />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-text-shimmer bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent bg-[length:200%_auto]">
            Ready to Order Your Perfect Cake?
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 text-pink-100">
            Contact us via WhatsApp or phone for quick orders and custom requests
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://wa.me/1234567890" 
              className="group bg-white text-pink-600 hover:bg-pink-50 px-10 py-4 rounded-full font-bold text-lg transition-all hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
            
            <a 
              href="tel:+911234567890" 
              className="group border-3 border-white text-white hover:bg-white hover:text-pink-600 px-10 py-4 rounded-full font-bold text-lg transition-all hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </div>
          
          <div className="mt-10 pt-10 border-t border-white/20">
            <p className="text-pink-100 text-sm">
              🎂 Over 10,000+ Happy Customers | ⭐ 4.9 Average Rating | 🚚 Same-Day Delivery Available
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isOpen}
        onClose={closeQuickView}
        onAddToCart={handleAddToCart}
      />
    </>
  )
}
