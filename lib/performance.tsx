import { useEffect, useState, useRef, ComponentType } from 'react'
import dynamic from 'next/dynamic'

// Lazy load images with intersection observer
export function useLazyLoad(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '50px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return { ref, isVisible }
}

// Optimized image component with lazy loading
interface LazyImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export function LazyImage({ src, alt, className = '', width, height, priority = false }: LazyImageProps) {
  const { ref, isVisible } = useLazyLoad()
  const [loaded, setLoaded] = useState(false)

  if (priority) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading="eager"
        decoding="async"
      />
    )
  }

  return (
    <div ref={ref} className={className}>
      {isVisible && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {!isVisible && (
        <div className="bg-gray-200 animate-pulse" style={{ width, height }} />
      )}
    </div>
  )
}

// Debounce hook for search and filters
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Throttle hook for scroll events
export function useThrottle<T>(value: T, limit: number = 100): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRan = useRef(Date.now())

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value)
        lastRan.current = Date.now()
      }
    }, limit - (Date.now() - lastRan.current))

    return () => {
      clearTimeout(handler)
    }
  }, [value, limit])

  return throttledValue
}

// Preload critical images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Preload multiple images
export async function preloadImages(srcs: string[]): Promise<void> {
  await Promise.all(srcs.map(preloadImage))
}

// Dynamic component loader with loading state
export function loadComponent<P = {}>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  options = {}
) {
  return dynamic(importFunc, {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    ),
    ...options,
  })
}

// Memoized scroll handler
export function useOptimizedScroll(callback: () => void, deps: any[] = []) {
  const frameRef = useRef<number>()
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        frameRef.current = requestAnimationFrame(() => {
          callbackRef.current()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, deps)
}

// Performance monitoring
export function usePerformanceMonitor(componentName: string) {
  useEffect(() => {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime

      if (process.env.NODE_ENV === 'development' && renderTime > 16.67) {
        console.warn(
          `⚠️ ${componentName} took ${renderTime.toFixed(2)}ms to render (target: 16.67ms for 60fps)`
        )
      }
    }
  }, [componentName])
}

// Web Vitals reporter
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'development') {
    const { id, name, label, value } = metric
    console.log(`[Web Vital] ${name}: ${value.toFixed(2)}ms (${label})`)
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // window.gtag?.('event', name, {
    //   value: Math.round(name === 'CLS' ? value * 1000 : value),
    //   event_label: id,
    //   non_interaction: true,
    // })
  }
}
