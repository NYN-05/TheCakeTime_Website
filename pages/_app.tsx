import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState, useEffect } from 'react'
import { CartProvider } from '../contexts/CartContext'
import ErrorBoundary from '../components/ErrorBoundary'
import { ToastProvider } from '../components/ToastNotification'
import dynamic from 'next/dynamic'

// Dynamic imports for client-only components to prevent SSR hydration issues
// These components use browser APIs (window, document, localStorage) that aren't available on server
const ScrollProgress = dynamic(
  () => import('../components/ScrollEnhancements').then(mod => ({ default: mod.ScrollProgress })),
  { ssr: false }
)
const BackToTop = dynamic(
  () => import('../components/ScrollEnhancements').then(mod => ({ default: mod.BackToTop })),
  { ssr: false }
)
const GlobalCursor = dynamic(
  () => import('../components/GlobalCursor').then(mod => ({ default: mod.GlobalCursor })),
  { ssr: false }
)
const FloatingActionButtons = dynamic(
  () => import('../components/FloatingActionButtons').then(mod => ({ default: mod.FloatingActionButtons })),
  { ssr: false }
)
const CookieConsent = dynamic(
  () => import('../components/CookieConsent').then(mod => ({ default: mod.CookieConsent })),
  { ssr: false }
)
const NewsletterPopup = dynamic(
  () => import('../components/NewsletterPopup').then(mod => ({ default: mod.NewsletterPopup })),
  { ssr: false }
)
const PageLoader = dynamic(
  () => import('../components/PageLoader').then(mod => ({ default: mod.PageLoader })),
  { ssr: false }
)

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 10 * 60 * 1000, // 10 minutes
        cacheTime: 15 * 60 * 1000, // 15 minutes
      },
    },
  }))

  // Preconnect to external domains
  useEffect(() => {
    const preconnectLinks = [
      'https://images.unsplash.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ]

    preconnectLinks.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = url
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
  }, [])

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <CartProvider>
            <ScrollProgress />
            <GlobalCursor />
            <FloatingActionButtons />
            <BackToTop />
            <CookieConsent />
            <NewsletterPopup />
            <Component {...pageProps} />
          </CartProvider>
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

// Report web vitals
export { reportWebVitals } from '../lib/performance'
