import { useEffect, useRef, useState } from 'react'

/**
 * Hook for scroll-based animations with SSR safety
 * Only runs on client-side after component mounts
 */
export const useScrollAnimation = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Skip if not mounted (SSR) or window is not available
    if (!mounted || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [mounted])
}

/**
 * Hook for parallax scrolling effects with SSR safety
 * Only runs on client-side after component mounts
 */
export const useParallax = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Skip if not mounted (SSR) or window is not available
    if (!mounted || typeof window === 'undefined') return

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll('.parallax')
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5')
        const yPos = -(scrolled * speed)
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])
}

/**
 * Hook for custom mouse cursor effects with SSR safety
 * Only runs on client-side after component mounts
 */
export const useMouseEffect = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Skip if not mounted (SSR) or window/document is not available
    if (!mounted || typeof window === 'undefined' || typeof document === 'undefined') return

    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    document.body.appendChild(cursor)

    const follower = document.createElement('div')
    follower.className = 'custom-cursor-follower'
    document.body.appendChild(follower)

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0
    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const animateFollower = () => {
      const dx = mouseX - followerX
      const dy = mouseY - followerY
      
      followerX += dx * 0.1
      followerY += dy * 0.1
      
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`
      animationFrameId = requestAnimationFrame(animateFollower)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animateFollower()

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive')
    const hoverHandlers = new Map<Element, { enter: () => void; leave: () => void }>()
    
    interactiveElements.forEach((el) => {
      const enterHandler = () => {
        cursor.classList.add('cursor-hover')
        follower.classList.add('cursor-hover')
      }
      const leaveHandler = () => {
        cursor.classList.remove('cursor-hover')
        follower.classList.remove('cursor-hover')
      }
      
      hoverHandlers.set(el, { enter: enterHandler, leave: leaveHandler })
      el.addEventListener('mouseenter', enterHandler)
      el.addEventListener('mouseleave', leaveHandler)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      
      // Clean up hover listeners
      hoverHandlers.forEach((handlers, el) => {
        el.removeEventListener('mouseenter', handlers.enter)
        el.removeEventListener('mouseleave', handlers.leave)
      })
      
      cursor.remove()
      follower.remove()
    }
  }, [mounted])
}

export const FloatingCart = ({ count, total }: { count: number; total: number }) => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Only render on client side to avoid hydration mismatch
  if (!mounted || count === 0) return null

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-bounce-in">
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-2xl shadow-2xl p-4 min-w-[200px]">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Cart</span>
          <span className="bg-white text-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {count}
          </span>
        </div>
        <div className="text-2xl font-bold mb-3">₹{total}</div>
        <a
          href="/checkout"
          className="block text-center bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
        >
          Checkout
        </a>
      </div>
    </div>
  )
}
