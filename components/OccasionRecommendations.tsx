import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cake, Heart, Briefcase, Baby, GraduationCap, Gift, Users, ChevronRight, Filter, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Occasion {
  id: string
  name: string
  icon: any
  color: string
  gradient: string
}

interface AgeGroup {
  id: string
  name: string
  range: string
}

interface Recommendation {
  id: number
  name: string
  price: number
  image: string
  occasion: string
  ageGroup: string
  serves: string
  popular: boolean
  bestseller: boolean
  dietary: string[]
  matchScore: number
}

const occasions: Occasion[] = [
  { id: 'birthday', name: 'Birthday', icon: Cake, color: 'pink', gradient: 'from-pink-500 to-pink-600' },
  { id: 'anniversary', name: 'Anniversary', icon: Heart, color: 'red', gradient: 'from-red-500 to-red-600' },
  { id: 'wedding', name: 'Wedding', icon: Heart, color: 'purple', gradient: 'from-purple-500 to-purple-600' },
  { id: 'corporate', name: 'Corporate', icon: Briefcase, color: 'blue', gradient: 'from-blue-500 to-blue-600' },
  { id: 'baby-shower', name: 'Baby Shower', icon: Baby, color: 'green', gradient: 'from-green-500 to-green-600' },
  { id: 'graduation', name: 'Graduation', icon: GraduationCap, color: 'indigo', gradient: 'from-indigo-500 to-indigo-600' },
  { id: 'other', name: 'Other Celebration', icon: Gift, color: 'orange', gradient: 'from-orange-500 to-orange-600' },
]

const ageGroups: AgeGroup[] = [
  { id: 'kids', name: 'Kids', range: '1-12 years' },
  { id: 'teen', name: 'Teen', range: '13-19 years' },
  { id: 'adult', name: 'Adult', range: '20-59 years' },
  { id: 'senior', name: 'Senior', range: '60+ years' },
]

const guestCounts = ['8-12', '15-20', '25-30', '35-40', '50+']

const dietaryOptions = ['Regular', 'Eggless', 'Sugar-free', 'Vegan', 'Gluten-free']

const allRecommendations: Recommendation[] = [
  {
    id: 1,
    name: 'Unicorn Fantasy Cake',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80',
    occasion: 'birthday',
    ageGroup: 'kids',
    serves: '8-12',
    popular: true,
    bestseller: true,
    dietary: ['Regular', 'Eggless'],
    matchScore: 98,
  },
  {
    id: 2,
    name: 'Red Velvet Romance',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80',
    occasion: 'anniversary',
    ageGroup: 'adult',
    serves: '15-20',
    popular: true,
    bestseller: true,
    dietary: ['Regular', 'Eggless'],
    matchScore: 96,
  },
  {
    id: 3,
    name: 'Elegant Tiered Wedding Cake',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    occasion: 'wedding',
    ageGroup: 'adult',
    serves: '50+',
    popular: true,
    bestseller: false,
    dietary: ['Regular'],
    matchScore: 95,
  },
  {
    id: 4,
    name: 'Corporate Logo Cake',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    occasion: 'corporate',
    ageGroup: 'adult',
    serves: '25-30',
    popular: false,
    bestseller: false,
    dietary: ['Regular', 'Eggless', 'Vegan'],
    matchScore: 92,
  },
  {
    id: 5,
    name: 'Baby Blue Celebration',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1602351447937-745cb720612f?w=800&q=80',
    occasion: 'baby-shower',
    ageGroup: 'adult',
    serves: '15-20',
    popular: true,
    bestseller: false,
    dietary: ['Regular', 'Eggless'],
    matchScore: 94,
  },
  {
    id: 6,
    name: 'Graduation Cap Cake',
    price: 999,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80',
    occasion: 'graduation',
    ageGroup: 'teen',
    serves: '8-12',
    popular: false,
    bestseller: false,
    dietary: ['Regular', 'Eggless', 'Sugar-free'],
    matchScore: 90,
  },
  {
    id: 7,
    name: 'Chocolate Truffle Delight',
    price: 899,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    occasion: 'birthday',
    ageGroup: 'adult',
    serves: '8-12',
    popular: true,
    bestseller: true,
    dietary: ['Regular', 'Eggless'],
    matchScore: 93,
  },
  {
    id: 8,
    name: 'Black Forest Classic',
    price: 849,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80',
    occasion: 'birthday',
    ageGroup: 'senior',
    serves: '8-12',
    popular: true,
    bestseller: false,
    dietary: ['Regular'],
    matchScore: 91,
  },
]

export default function OccasionRecommendations() {
  const [step, setStep] = useState(1)
  const [selectedOccasion, setSelectedOccasion] = useState<string>('')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('')
  const [selectedGuestCount, setSelectedGuestCount] = useState<string>('')
  const [selectedDietary, setSelectedDietary] = useState<string>('Regular')
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  const getRecommendations = () => {
    let filtered = allRecommendations.filter((rec) => {
      const matchesOccasion = !selectedOccasion || rec.occasion === selectedOccasion
      const matchesAge = !selectedAgeGroup || rec.ageGroup === selectedAgeGroup
      const matchesGuests = !selectedGuestCount || rec.serves === selectedGuestCount
      const matchesDietary = rec.dietary.includes(selectedDietary)
      return matchesOccasion && matchesAge && matchesGuests && matchesDietary
    })

    // Sort by match score
    filtered.sort((a, b) => b.matchScore - a.matchScore)

    // Add similar items if not enough results
    if (filtered.length < 3) {
      const additional = allRecommendations
        .filter((rec) => !filtered.includes(rec) && rec.dietary.includes(selectedDietary))
        .slice(0, 6 - filtered.length)
      filtered = [...filtered, ...additional]
    }

    setRecommendations(filtered)
    setStep(4)
  }

  const resetWizard = () => {
    setStep(1)
    setSelectedOccasion('')
    setSelectedAgeGroup('')
    setSelectedGuestCount('')
    setSelectedDietary('Regular')
    setRecommendations([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Cake
          </h1>
          <p className="text-gray-600 text-lg">Answer 3 questions and get personalized recommendations</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= num
                      ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`flex-1 h-2 mx-2 rounded-full transition-all ${
                      step > num ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span className={step >= 1 ? 'font-semibold text-pink-600' : ''}>Occasion</span>
            <span className={step >= 2 ? 'font-semibold text-pink-600' : ''}>Details</span>
            <span className={step >= 3 ? 'font-semibold text-pink-600' : ''}>Preferences</span>
          </div>
        </div>

        {/* Wizard Steps */}
        <AnimatePresence mode="wait">
          {/* Step 1: Occasion */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">What's the occasion?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {occasions.map((occasion) => {
                  const Icon = occasion.icon
                  return (
                    <button
                      key={occasion.id}
                      onClick={() => {
                        setSelectedOccasion(occasion.id)
                        setStep(2)
                      }}
                      className={`p-6 rounded-xl border-2 transition-all group hover:shadow-lg ${
                        selectedOccasion === occasion.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${occasion.gradient} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <p className="font-bold text-gray-800 text-lg">{occasion.name}</p>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Age Group & Guest Count */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Tell us more</h2>

              {/* Age Group */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Who's the cake for?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {ageGroups.map((age) => (
                    <button
                      key={age.id}
                      onClick={() => setSelectedAgeGroup(age.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedAgeGroup === age.id
                          ? 'border-pink-500 bg-pink-50 shadow-lg'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <p className="font-bold text-gray-800">{age.name}</p>
                      <p className="text-sm text-gray-600">{age.range}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-700 mb-4">How many guests?</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  {guestCounts.map((count) => (
                    <button
                      key={count}
                      onClick={() => setSelectedGuestCount(count)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedGuestCount === count
                          ? 'border-purple-500 bg-purple-50 shadow-lg'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <Users className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                      <p className="font-bold text-gray-800">{count}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedAgeGroup || !selectedGuestCount}
                  className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedAgeGroup && selectedGuestCount
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Dietary Preferences */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Any dietary preferences?</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {dietaryOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedDietary(option)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedDietary === option
                        ? 'border-green-500 bg-green-50 shadow-lg'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <p className="font-bold text-gray-800 text-lg">{option}</p>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={getRecommendations}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Get Recommendations
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Perfect Matches for You!</h2>
                <p className="text-gray-600">Based on your preferences, here are our top recommendations</p>
                <button
                  onClick={resetWizard}
                  className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Start Over
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((cake, index) => (
                  <motion.div
                    key={cake.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={cake.image}
                        alt={cake.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Match Score Badge */}
                      <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold shadow-lg flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        {cake.matchScore}% Match
                      </div>
                      {/* Tags */}
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        {cake.bestseller && (
                          <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                            Bestseller
                          </span>
                        )}
                        {cake.popular && (
                          <span className="px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{cake.name}</h3>
                      <p className="text-2xl font-bold text-pink-600 mb-4">₹{cake.price}</p>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p>Serves: {cake.serves} people</p>
                        <p>Dietary: {cake.dietary.join(', ')}</p>
                      </div>

                      <Link href={`/products/${cake.id}`}>
                        <button className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
                          View Details
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {recommendations.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🎂</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No exact matches found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your preferences or contact us for custom orders!</p>
                  <button
                    onClick={resetWizard}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-shadow"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
