import { useState } from 'react'
import { Star, ThumbsUp } from 'lucide-react'

interface Review {
  name: string
  rating: number
  date: string
  comment: string
  helpful?: number
}

interface ReviewSectionProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

export default function ReviewSection({ reviews, averageRating, totalReviews }: ReviewSectionProps) {
  const [helpfulClicks, setHelpfulClicks] = useState<Record<number, boolean>>({})

  const handleHelpful = (index: number) => {
    setHelpfulClicks(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="scroll-animate">
      {/* Rating Summary */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-900 mb-2">{averageRating}</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < Math.floor(averageRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-gray-600">{totalReviews} reviews</div>
          </div>
          
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const percentage = Math.random() * 100 // Replace with actual data
              return (
                <div key={star} className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600 w-8">{star}★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">{Math.round(percentage)}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 scroll-animate"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              </div>
              <div className="flex">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
            
            <button
              onClick={() => handleHelpful(idx)}
              className={`flex items-center gap-2 text-sm font-medium transition-all ${
                helpfulClicks[idx]
                  ? 'text-pink-600'
                  : 'text-gray-500 hover:text-pink-600'
              }`}
            >
              <ThumbsUp
                size={16}
                className={`transition-transform ${
                  helpfulClicks[idx] ? 'fill-pink-600 scale-110' : ''
                }`}
              />
              <span>{helpfulClicks[idx] ? 'Helpful!' : 'Helpful?'}</span>
              {review.helpful && (
                <span className="text-gray-400">
                  ({review.helpful + (helpfulClicks[idx] ? 1 : 0)})
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
