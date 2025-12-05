import DeliverySlotBooking from '../components/DeliverySlotBooking'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function DeliveryPage() {
  return (
    <>
      <Head>
        <title>Schedule Delivery | TheCakeTime</title>
        <meta name="description" content="Choose your perfect delivery time slot. 99.2% on-time delivery rate!" />
      </Head>
      <Header />
      <DeliverySlotBooking />
      <Footer />
    </>
  )
}
