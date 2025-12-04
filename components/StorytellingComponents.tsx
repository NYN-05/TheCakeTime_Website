import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Sparkles, Heart, Clock, Users, Award, ChevronDown } from 'lucide-react'

// Scroll-triggered story section with parallax
export const StorySection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Interactive timeline with scroll progress
export const JourneyTimeline = ({ milestones }: { milestones: Array<{ year: string, title: string, description: string, icon?: any }> }) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  
  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-20">
      {/* Vertical timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-200 via-purple-200 to-pink-200 -translate-x-1/2">
        <motion.div 
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-pink-500 via-purple-500 to-pink-500"
          style={{ height: lineHeight }}
        />
      </div>
      
      {milestones.map((milestone, idx) => {
        const isEven = idx % 2 === 0
        const ref = useRef(null)
        const isInView = useInView(ref, { once: true, margin: "-100px" })
        
        return (
          <motion.div
            key={milestone.year}
            ref={ref}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`relative flex items-center mb-16 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
          >
            {/* Content card */}
            <div className={`w-5/12 ${isEven ? 'text-right pr-12' : 'text-left pl-12'}`}>
              <motion.div 
                className="bg-white p-6 rounded-2xl shadow-xl border-2 border-pink-200 hover:shadow-2xl transition-all group cursor-pointer"
                whileHover={{ scale: 1.05, rotate: isEven ? -2 : 2 }}
              >
                <div className="flex items-center gap-2 mb-2" style={{ justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
                  {milestone.icon && <milestone.icon className="text-pink-500" size={20} />}
                  <div className="text-sm font-bold text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                    {milestone.year}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {milestone.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {milestone.description}
                </p>
              </motion.div>
            </div>
            
            {/* Center dot */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 border-4 border-white shadow-lg z-10"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 + 0.3 }}
              whileHover={{ scale: 1.5 }}
            />
            
            {/* Empty space on other side */}
            <div className="w-5/12" />
          </motion.div>
        )
      })}
    </div>
  )
}

// Sensory experience card - engages imagination
export const SensoryCard = ({ 
  sense, 
  title, 
  description, 
  icon: Icon 
}: { 
  sense: string
  title: string
  description: string
  icon: any 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className="relative bg-gradient-to-br from-white to-pink-50 p-8 rounded-3xl shadow-lg border-2 border-pink-200 overflow-hidden group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-400/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Floating particles */}
      <motion.div
        className="absolute top-4 right-4"
        animate={{ 
          y: isHovered ? [0, -10, 0] : 0,
          rotate: isHovered ? [0, 10, 0] : 0
        }}
        transition={{ repeat: isHovered ? Infinity : 0, duration: 2 }}
      >
        <Sparkles className="text-pink-400 opacity-60" size={24} />
      </motion.div>
      
      <div className="relative z-10">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="text-pink-600 mb-4" size={48} />
        </motion.div>
        
        <div className="inline-block px-3 py-1 bg-pink-600 text-white text-xs font-bold rounded-full mb-3">
          {sense.toUpperCase()}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

// Emotional customer story with image reveal
export const CustomerStory = ({ 
  name, 
  occasion, 
  story, 
  image, 
  quote 
}: { 
  name: string
  occasion: string
  story: string
  image: string
  quote: string
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [showFullStory, setShowFullStory] = useState(false)
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-pink-200"
    >
      <div className="grid md:grid-cols-2">
        {/* Image side with overlay */}
        <div className="relative h-64 md:h-auto overflow-hidden group">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 via-pink-900/40 to-transparent" />
          
          {/* Quote overlay */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-5xl mb-2 text-pink-300">"</div>
            <p className="text-lg italic font-medium">{quote}</p>
          </motion.div>
        </div>
        
        {/* Content side */}
        <div className="p-8">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="text-pink-500 fill-pink-500" size={24} />
            <span className="text-sm font-bold text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
              {occasion}
            </span>
          </div>
          
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{name}'s Story</h3>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>{showFullStory ? story : story.substring(0, 200) + '...'}</p>
            
            {story.length > 200 && (
              <button
                onClick={() => setShowFullStory(!showFullStory)}
                className="text-pink-600 font-semibold hover:text-pink-700 transition-colors flex items-center gap-1"
              >
                {showFullStory ? 'Show less' : 'Read full story'}
                <ChevronDown className={`transform transition-transform ${showFullStory ? 'rotate-180' : ''}`} size={16} />
              </button>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t border-pink-200">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Sparkles className="text-yellow-400 fill-yellow-400" size={20} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Behind the scenes reveal on scroll
export const BehindTheScenes = ({ 
  step, 
  title, 
  description, 
  image,
  number
}: {
  step: string
  title: string
  description: string
  image: string
  number: number
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])
  
  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="grid md:grid-cols-2 gap-8 items-center mb-20"
    >
      <div className={`${number % 2 === 0 ? 'md:order-2' : ''}`}>
        <div className="text-8xl font-bold text-pink-100 mb-2">0{number}</div>
        <div className="inline-block px-3 py-1 bg-pink-600 text-white text-xs font-bold rounded-full mb-4">
          {step.toUpperCase()}
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
      </div>
      
      <motion.div 
        className={`relative h-80 rounded-2xl overflow-hidden shadow-2xl ${number % 2 === 0 ? 'md:order-1' : ''}`}
        whileHover={{ scale: 1.05, rotate: number % 2 === 0 ? 2 : -2 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-purple-600/20" />
      </motion.div>
    </motion.div>
  )
}

// Animated stat counter with icon
export const AnimatedStat = ({ 
  value, 
  suffix = '', 
  label, 
  icon: Icon,
  delay = 0
}: {
  value: number
  suffix?: string
  label: string
  icon: any
  delay?: number
}) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const duration = 2000
      const increment = end / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      
      return () => clearInterval(timer)
    }
  }, [isInView, value])
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="text-center group"
    >
      <motion.div
        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon className="text-white" size={36} />
      </motion.div>
      
      <div className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      
      <div className="text-gray-600 font-medium">{label}</div>
    </motion.div>
  )
}

// Interactive flavor journey
export const FlavorJourney = ({ flavors }: { flavors: Array<{ name: string, color: string, description: string }> }) => {
  const [selectedFlavor, setSelectedFlavor] = useState(0)
  
  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Experience Our Signature Flavors</h3>
        <p className="text-gray-600">Click to explore each unique taste</p>
      </div>
      
      {/* Flavor selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {flavors.map((flavor, idx) => (
          <motion.button
            key={flavor.name}
            onClick={() => setSelectedFlavor(idx)}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              selectedFlavor === idx
                ? 'text-white shadow-lg scale-110'
                : 'bg-white text-gray-700 hover:scale-105'
            }`}
            style={{
              backgroundColor: selectedFlavor === idx ? flavor.color : undefined
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {flavor.name}
          </motion.button>
        ))}
      </div>
      
      {/* Flavor description with animation */}
      <motion.div
        key={selectedFlavor}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl p-8 shadow-lg text-center"
      >
        <motion.div
          className="w-24 h-24 mx-auto mb-4 rounded-full"
          style={{ backgroundColor: flavors[selectedFlavor].color }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <p className="text-xl text-gray-700 leading-relaxed">
          {flavors[selectedFlavor].description}
        </p>
      </motion.div>
    </div>
  )
}
