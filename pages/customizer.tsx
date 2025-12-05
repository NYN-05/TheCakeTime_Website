import CakeCustomizer from '../components/CakeCustomizer'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function CustomizerPage() {
  return (
    <>
      <Head>
        <title>Design Your Cake | TheCakeTime</title>
        <meta name="description" content="Create your dream cake with our interactive customizer. Choose tiers, flavors, frostings, and toppings in real-time!" />
      </Head>
      <Header />
      <CakeCustomizer />
      <Footer />
    </>
  )
}
