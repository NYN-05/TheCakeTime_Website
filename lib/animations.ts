// Utility to check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Optimized animation variants for better performance
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
}

export const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.4 }
}

export const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3 }
}

// Optimized stagger container
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Reduce animations if user prefers
export const getOptimizedVariant = (variant: any) => {
  if (prefersReducedMotion()) {
    return {
      initial: variant.animate,
      animate: variant.animate
    }
  }
  return variant
}

// Simple CSS animations (no JS needed)
export const cssAnimations = {
  fadeIn: 'animate-fadeIn',
  fadeInUp: 'animate-fadeInUp',
  slideInLeft: 'animate-slideInLeft',
  slideInRight: 'animate-slideInRight',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  bounce: 'animate-bounce'
}

// Intersection Observer config for better performance
export const optimizedInViewConfig = {
  once: true,
  margin: '-50px'
}
