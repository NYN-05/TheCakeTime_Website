import OrderTracking from '../components/OrderTracking'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'

export default function TrackOrderPage() {
  const router = useRouter()
  const orderId = (router.query.id as string) || 'ORD-12345'

  return (
    <>
      <Head>
        <title>Track Your Order | TheCakeTime</title>
        <meta name="description" content="Track your cake order in real-time with live updates at every stage!" />
      </Head>
      <Header />
      <OrderTracking orderId={orderId} />
      <Footer />
    </>
  )
}
