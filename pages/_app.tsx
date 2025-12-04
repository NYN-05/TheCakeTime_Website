import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState, useEffect } from 'react'
import { CartProvider } from '../contexts/CartContext'
import ErrorBoundary from '../components/ErrorBoundary'
import { GlobalCursor } from '../components/GlobalCursor'
import { ToastProvider } from '../components/ToastNotification'
import { PageLoader } from '../components/PageLoader'
import { ScrollProgress, BackToTop } from '../components/ScrollEnhancements'
import { FloatingActionButtons } from '../components/FloatingActionButtons'
import { CookieConsent } from '../components/CookieConsent'
import { NewsletterPopup } from '../components/NewsletterPopup'
import dynamic from 'next/dynamic'

// Lazy load non-critical components
const LazyGlobalCursor = dynamic(() => import('../components/GlobalCursor').then(mod => ({ default: mod.GlobalCursor })), { ssr: false })
const LazyNewsletterPopup = dynamic(() => import('../components/NewsletterPopup').then(mod => ({ default: mod.NewsletterPopup })), { ssr: false })

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
            <PageLoader />
            <ScrollProgress />
            <LazyGlobalCursor />
            <FloatingActionButtons />
            <BackToTop />
            <CookieConsent />
            <LazyNewsletterPopup />
            <Component {...pageProps} />
          </CartProvider>
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

// Report web vitals
export { reportWebVitals } from '../lib/performance'
