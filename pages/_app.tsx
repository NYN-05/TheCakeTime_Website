import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { CartProvider } from '../contexts/CartContext'
import ErrorBoundary from '../components/ErrorBoundary'

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
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
