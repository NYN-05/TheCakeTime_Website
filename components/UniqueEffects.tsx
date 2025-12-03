import { useEffect, useRef } from 'react'

export const useScrollAnimation = () => {
  useEffect(() => {
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
  }, [])
}

export const useParallax = () => {
  useEffect(() => {
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
  }, [])
}

export const useMouseEffect = () => {
  useEffect(() => {
    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    document.body.appendChild(cursor)

    const follower = document.createElement('div')
    follower.className = 'custom-cursor-follower'
    document.body.appendChild(follower)

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

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
      requestAnimationFrame(animateFollower)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animateFollower()

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover')
        follower.classList.add('cursor-hover')
      })
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover')
        follower.classList.remove('cursor-hover')
      })
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cursor.remove()
      follower.remove()
    }
  }, [])
}

export const FloatingCart = ({ count, total }: { count: number; total: number }) => {
  if (count === 0) return null

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
