import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export const ScrollProgressBar = () => {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 transform origin-left z-50"
      style={{ scaleX }}
    />
  )
}

export const ScrollToTopButton = () => {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const [isVisible, setIsVisible] = React.useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) return
    return scrollY.onChange((latest) => {
      setIsVisible(latest > 500)
    })
  }, [scrollY, mounted])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!mounted || !isVisible) return null

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center z-40 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg 
        className="w-6 h-6 group-hover:-translate-y-1 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </motion.button>
  )
}
