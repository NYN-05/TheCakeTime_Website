import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { CartProvider } from '../contexts/CartContext'
import ErrorBoundary from '../components/ErrorBoundary'
import { GlobalCursor } from '../components/GlobalCursor'
import { ToastProvider } from '../components/ToastNotification'
import { PageLoader } from '../components/PageLoader'
import { ScrollProgress, BackToTop } from '../components/ScrollEnhancements'
import { FloatingActionButtons } from '../components/FloatingActionButtons'
import { CookieConsent } from '../components/CookieConsent'
import { NewsletterPopup } from '../components/NewsletterPopup'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5 * 60 * 1000,
      },
    },
  }))

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <CartProvider>
            <PageLoader />
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
