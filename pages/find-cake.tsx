import OccasionRecommendations from '../components/OccasionRecommendations'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function FindCakePage() {
  return (
    <>
      <Head>
        <title>Find Your Perfect Cake | TheCakeTime</title>
        <meta name="description" content="Answer 3 questions and get personalized cake recommendations powered by AI!" />
      </Head>
      <Header />
      <OccasionRecommendations />
      <Footer />
    </>
  )
}
