import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { X, Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useScrollAnimation, FloatingCart } from '../components/UniqueEffects'
import { useCart } from '../contexts/CartContext'

const galleryImages = [
  { id: 1, url: 'https://via.placeholder.com/400x500/4a2c2a/ffffff?text=Birthday+Cake+1', category: 'birthday', title: 'Birthday Celebration' },
  { id: 2, url: 'https://via.placeholder.com/400x300/8b1538/ffffff?text=Wedding+Cake', category: 'wedding', title: 'Wedding Masterpiece' },
  { id: 3, url: 'https://via.placeholder.com/400x400/f5f5dc/000000?text=Designer+1', category: 'designer', title: 'Designer Creation' },
  { id: 4, url: 'https://via.placeholder.com/400x450/2c1810/ffffff?text=Kids+1', category: 'kids', title: 'Kids Special' },
  { id: 5, url: 'https://via.placeholder.com/400x350/d2691e/ffffff?text=Anniversary', category: 'anniversary', title: 'Anniversary Delight' },
  { id: 6, url: 'https://via.placeholder.com/400x500/ff69b4/ffffff?text=Birthday+2', category: 'birthday', title: 'Birthday Joy' },
  { id: 7, url: 'https://via.placeholder.com/400x400/ffd700/000000?text=Designer+2', category: 'designer', title: 'Elegant Design' },
  { id: 8, url: 'https://via.placeholder.com/400x450/ffb347/000000?text=Kids+2', category: 'kids', title: 'Cartoon Character' },
  { id: 9, url: 'https://via.placeholder.com/400x300/dc3b27/ffffff?text=Wedding+2', category: 'wedding', title: 'Tiered Beauty' },
  { id: 10, url: 'https://via.placeholder.com/400x500/ca8a04/ffffff?text=Birthday+3', category: 'birthday', title: 'Celebration Time' },
  { id: 11, url: 'https://via.placeholder.com/400x400/a16207/ffffff?text=Designer+3', category: 'designer', title: 'Artistic Touch' },
  { id: 12, url: 'https://via.placeholder.com/400x350/854d0e/ffffff?text=Anniversary+2', category: 'anniversary', title: 'Love Celebration' },
]

const categories = ['all', 'birthday', 'wedding', 'designer', 'kids', 'anniversary']

export default function Gallery() {
  const { cartCount, cartTotal } = useCart()
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null)

  useScrollAnimation()

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <>
      <Head>
        <title>Gallery - TheCakeTime</title>
        <meta name="description" content="Browse our beautiful collection of custom cakes and creations" />
      </Head>

      <Header />
      {mounted && <FloatingCart count={cartCount} total={cartTotal} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 scroll-animate">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-pink-500 animate-pulse" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Our Gallery</h1>
          <p className="text-gray-600 text-lg">
            Explore our beautiful creations and get inspired for your next celebration
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 scroll-animate">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg scale-110'
                  : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:scale-105'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((image, idx) => (
            <div
              key={image.id}
              className="break-inside-avoid cursor-pointer group scroll-animate"
              onClick={() => setLightboxImage(image)}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <Image
                  src={image.url}
                  alt={image.title}
                  width={400}
                  height={400}
                  className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 via-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                  <p className="text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {image.title}
                  </p>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="text-pink-600" size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
              onClick={() => setLightboxImage(null)}
            >
              <X className="text-white" size={24} />
            </button>
            <div className="max-w-4xl max-h-full">
              <Image
                src={lightboxImage.url}
                alt={lightboxImage.title}
                width={800}
                height={800}
                className="max-w-full max-h-[90vh] object-contain"
              />
              <p className="text-white text-center mt-4 text-xl font-semibold">
                {lightboxImage.title}
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
