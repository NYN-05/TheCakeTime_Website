import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2, TrendingUp, Zap } from 'lucide-react'

interface DeliverySlot {
  id: string
  time: string
  available: boolean
  popular?: boolean
  priority?: boolean
}

interface DeliveryZone {
  name: string
  pincode: string[]
  available: boolean
}

const deliveryZones: DeliveryZone[] = [
  { name: 'Central Bangalore', pincode: ['560001', '560002', '560003', '560004', '560005'], available: true },
  { name: 'North Bangalore', pincode: ['560013', '560016', '560024', '560032', '560045'], available: true },
  { name: 'South Bangalore', pincode: ['560029', '560030', '560034', '560068', '560076'], available: true },
  { name: 'East Bangalore', pincode: ['560008', '560037', '560038', '560066', '560075'], available: true },
  { name: 'West Bangalore', pincode: ['560010', '560020', '560040', '560058', '560077'], available: true },
]

const generateSlots = (date: Date): DeliverySlot[] => {
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  const currentHour = now.getHours()

  const slots = [
    { id: '1', time: '9:00 AM - 11:00 AM', hour: 9 },
    { id: '2', time: '11:00 AM - 1:00 PM', hour: 11, popular: true },
    { id: '3', time: '1:00 PM - 3:00 PM', hour: 13 },
    { id: '4', time: '3:00 PM - 5:00 PM', hour: 15, popular: true },
    { id: '5', time: '5:00 PM - 7:00 PM', hour: 17, popular: true },
    { id: '6', time: '7:00 PM - 9:00 PM', hour: 19 },
    { id: '7', time: 'Priority (1 Hour)', hour: 0, priority: true },
  ]

  return slots.map((slot) => ({
    ...slot,
    available: isToday ? (slot.priority ? true : slot.hour > currentHour + 2) : true,
  }))
}

export default function DeliverySlotBooking() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [pincode, setPincode] = useState('')
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const slots = generateSlots(selectedDate)

  // Generate next 7 days
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  const checkPincode = () => {
    const zone = deliveryZones.find((z) => z.pincode.includes(pincode))
    setDeliveryZone(zone || null)
  }

  const handleBooking = () => {
    if (selectedSlot && deliveryZone) {
      setShowConfirmation(true)
    }
  }

  const isToday = selectedDate.toDateString() === new Date().toDateString()
  const selectedSlotData = slots.find((s) => s.id === selectedSlot)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Schedule Your Delivery
          </h1>
          <p className="text-gray-600 text-lg">Choose your perfect delivery time - we never miss a celebration!</p>
          <div className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold">99.2% On-Time Delivery Rate</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pincode Check */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl font-bold text-gray-800">Delivery Location</h2>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter your pincode"
                  maxLength={6}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                />
                <button
                  onClick={checkPincode}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-shadow"
                >
                  Check
                </button>
              </div>

              {deliveryZone && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-bold text-green-800">Great news! We deliver to your area</p>
                    <p className="text-sm text-green-600">{deliveryZone.name}</p>
                  </div>
                </motion.div>
              )}

              {pincode.length === 6 && !deliveryZone && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="font-bold text-red-800">Sorry, we don't deliver to this area yet</p>
                    <p className="text-sm text-red-600">Contact us for special arrangements</p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Date Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl font-bold text-gray-800">Select Date</h2>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {availableDates.map((date, index) => {
                  const isSelected = date.toDateString() === selectedDate.toDateString()
                  const isCurrentDay = date.toDateString() === new Date().toDateString()

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDate(date)
                        setSelectedSlot(null)
                      }}
                      className={`p-3 rounded-xl text-center transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <p className="text-xs font-semibold mb-1">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                      <p className="text-lg font-bold">{date.getDate()}</p>
                      {isCurrentDay && !isSelected && (
                        <p className="text-xs text-pink-600 font-semibold mt-1">Today</p>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>

            {/* Time Slot Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl font-bold text-gray-800">Choose Time Slot</h2>
              </div>

              {isToday && (
                <div className="mb-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    <span className="font-bold">Same-day delivery:</span> Order before 2 PM for delivery today. Priority delivery available for urgent orders.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {slots.map((slot) => (
                  <motion.button
                    key={slot.id}
                    onClick={() => slot.available && setSelectedSlot(slot.id)}
                    disabled={!slot.available}
                    whileHover={slot.available ? { scale: 1.02 } : {}}
                    whileTap={slot.available ? { scale: 0.98 } : {}}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      selectedSlot === slot.id
                        ? 'border-pink-500 bg-pink-50 shadow-lg'
                        : slot.available
                        ? 'border-gray-200 hover:border-pink-300 hover:shadow-md'
                        : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            slot.priority
                              ? 'bg-gradient-to-br from-orange-500 to-red-600'
                              : selectedSlot === slot.id
                              ? 'bg-gradient-to-br from-pink-500 to-purple-600'
                              : 'bg-gray-200'
                          }`}
                        >
                          {slot.priority ? (
                            <Zap className="w-6 h-6 text-white" />
                          ) : (
                            <Clock className={`w-6 h-6 ${selectedSlot === slot.id ? 'text-white' : 'text-gray-600'}`} />
                          )}
                        </div>
                        <div>
                          <p className={`font-bold ${slot.priority ? 'text-orange-600' : 'text-gray-800'}`}>
                            {slot.time}
                          </p>
                          {slot.priority && (
                            <p className="text-sm text-orange-600 font-semibold">Guaranteed delivery in 60 minutes</p>
                          )}
                          {slot.popular && slot.available && (
                            <div className="flex items-center gap-1 mt-1">
                              <TrendingUp className="w-3 h-3 text-green-600" />
                              <span className="text-xs text-green-600 font-semibold">Popular slot</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        {slot.priority ? (
                          <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">
                            +₹150
                          </span>
                        ) : slot.available ? (
                          <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full">
                            Available
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-200 text-gray-500 text-xs font-bold rounded-full">
                            Unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Delivery Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Delivery Date</p>
                  <p className="font-bold text-gray-800">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {selectedSlotData && (
                  <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Time Slot</p>
                    <p className="font-bold text-gray-800">{selectedSlotData.time}</p>
                    {selectedSlotData.priority && (
                      <p className="text-sm text-orange-600 font-semibold mt-1">Express Delivery</p>
                    )}
                  </div>
                )}

                {deliveryZone && (
                  <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Delivery Zone</p>
                    <p className="font-bold text-gray-800">{deliveryZone.name}</p>
                    <p className="text-sm text-gray-600">Pincode: {pincode}</p>
                  </div>
                )}
              </div>

              {selectedSlotData?.priority && (
                <div className="mb-6 p-4 bg-orange-50 border-2 border-orange-200 rounded-xl">
                  <p className="text-sm font-semibold text-orange-800">Priority Delivery Fee</p>
                  <p className="text-2xl font-bold text-orange-600">+₹150</p>
                </div>
              )}

              <button
                onClick={handleBooking}
                disabled={!selectedSlot || !deliveryZone}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  selectedSlot && deliveryZone
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm Delivery Slot
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t-2 border-gray-100 space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-700">99.2% on-time delivery</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-700">SMS/Email notifications</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-700">Live order tracking</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-700">Contactless delivery</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Coverage Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Delivery Zones</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {deliveryZones.map((zone) => (
              <div key={zone.name} className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-2">{zone.name}</h4>
                <p className="text-sm text-gray-600">Pincodes: {zone.pincode.slice(0, 3).join(', ')}...</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirmation(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                ✅
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Slot Confirmed!</h2>
              <p className="text-gray-600 mb-2">Your delivery is scheduled for</p>
              <p className="text-xl font-bold text-pink-600 mb-1">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-lg font-semibold text-purple-600 mb-6">{selectedSlotData?.time}</p>
              <div className="p-4 bg-green-50 rounded-xl mb-6">
                <p className="text-sm text-green-800 font-semibold">You'll receive SMS & Email confirmation shortly</p>
              </div>
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-shadow"
              >
                Continue Shopping
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
