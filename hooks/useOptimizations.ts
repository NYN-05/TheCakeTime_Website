import { useState, useEffect, useRef, useCallback } from 'react'

// Preload critical resources
export function useResourcePreloader() {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80', // Hero image
      'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80', // Featured cake
    ]

    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })

    // Prefetch next pages
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const router = require('next/router').default
        router.prefetch('/products')
        router.prefetch('/about')
      })
    }
  }, [])
}

// Memory cleanup for unmounted components
export function useMemoryCleanup(cleanupFn?: () => void) {
  useEffect(() => {
    return () => {
      if (cleanupFn) cleanupFn()
    }
  }, [cleanupFn])
}

// Optimize event listeners
export function useOptimizedEventListener(
  eventName: string,
  handler: EventListener,
  element: HTMLElement | Window | Document = window,
  options: AddEventListenerOptions = { passive: true }
) {
  useEffect(() => {
    if (!element) return

    element.addEventListener(eventName, handler, options)

    return () => {
      element.removeEventListener(eventName, handler)
    }
  }, [eventName, handler, element, options])
}

// Batch state updates for better performance
export function useBatchedState<T extends Record<string, any>>(initialState: T) {
  const [state, setState] = useState(initialState)
  const pendingUpdates = useRef<Partial<T>[]>([])
  const timeoutRef = useRef<NodeJS.Timeout>()

  const batchedSetState = useCallback((update: Partial<T>) => {
    pendingUpdates.current.push(update)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setState(prev => {
        let newState = { ...prev }
        pendingUpdates.current.forEach(u => {
          newState = { ...newState, ...u }
        })
        pendingUpdates.current = []
        return newState
      })
    }, 0)
  }, [])

  return [state, batchedSetState] as const
}
