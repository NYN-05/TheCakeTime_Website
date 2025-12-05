import BeforeAfterGallery from '../components/BeforeAfterGallery'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function CustomOrdersPage() {
  return (
    <>
      <Head>
        <title>Custom Order Gallery | TheCakeTime</title>
        <meta name="description" content="See how we transform customer visions into stunning cakes. 99.8% accuracy rate!" />
      </Head>
      <Header />
      <BeforeAfterGallery />
      <Footer />
    </>
  )
}
