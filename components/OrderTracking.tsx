import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, ChefHat, Flame, Paintbrush, Truck, CheckCircle2, Clock, MapPin, Phone } from 'lucide-react'

interface OrderStatus {
  id: string
  customerName: string
  cakeName: string
  status: 'received' | 'preparing' | 'baking' | 'decorating' | 'quality-check' | 'out-for-delivery' | 'delivered'
  orderTime: string
  estimatedDelivery: string
  currentStep: number
  deliveryAddress: string
  phoneNumber: string
}

const orderSteps = [
  {
    id: 'received',
    title: 'Order Received',
    icon: Package,
    description: 'Your order is confirmed and queued',
    color: 'from-blue-500 to-blue-600',
    estimatedTime: '0 min',
  },
  {
    id: 'preparing',
    title: 'Preparing Ingredients',
    icon: ChefHat,
    description: 'Selecting premium ingredients',
    color: 'from-purple-500 to-purple-600',
    estimatedTime: '10-15 min',
  },
  {
    id: 'baking',
    title: 'Baking',
    icon: Flame,
    description: 'Your cake is in the oven',
    color: 'from-orange-500 to-orange-600',
    estimatedTime: '30-45 min',
  },
  {
    id: 'decorating',
    title: 'Decorating',
    icon: Paintbrush,
    description: 'Adding artistic touches',
    color: 'from-pink-500 to-pink-600',
    estimatedTime: '20-30 min',
  },
  {
    id: 'quality-check',
    title: 'Quality Check',
    icon: CheckCircle2,
    description: 'Final inspection before delivery',
    color: 'from-green-500 to-green-600',
    estimatedTime: '5-10 min',
  },
  {
    id: 'out-for-delivery',
    title: 'Out for Delivery',
    icon: Truck,
    description: 'On the way to you!',
    color: 'from-indigo-500 to-indigo-600',
    estimatedTime: '15-30 min',
  },
]

export default function OrderTracking({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<OrderStatus>({
    id: orderId,
    customerName: 'Priya Sharma',
    cakeName: 'Chocolate Truffle Delight (2 Tier)',
    status: 'decorating',
    orderTime: '10:30 AM',
    estimatedDelivery: '2:30 PM',
    currentStep: 3,
    deliveryAddress: '123, MG Road, Bangalore - 560001',
    phoneNumber: '+91 98765 43210',
  })

  // Simulate order progression (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => {
        const steps = ['received', 'preparing', 'baking', 'decorating', 'quality-check', 'out-for-delivery', 'delivered']
        const currentIndex = steps.indexOf(prev.status)
        if (currentIndex < steps.length - 1) {
          return {
            ...prev,
            status: steps[currentIndex + 1] as any,
            currentStep: prev.currentStep + 1,
          }
        }
        return prev
      })
    }, 8000) // Progress every 8 seconds for demo

    return () => clearInterval(interval)
  }, [])

  const getCurrentStepIndex = () => {
    return orderSteps.findIndex((step) => step.id === order.status)
  }

  const isStepCompleted = (stepIndex: number) => {
    return stepIndex < getCurrentStepIndex()
  }

  const isStepActive = (stepIndex: number) => {
    return stepIndex === getCurrentStepIndex()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Track Your Order
          </h1>
          <p className="text-gray-600 text-lg">Order ID: #{order.id}</p>
        </motion.div>

        {/* Order Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{order.cakeName}</h2>
              <p className="text-gray-600">For: {order.customerName}</p>
            </div>
            <motion.div
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {order.status === 'delivered' ? 'Delivered!' : 'In Progress'}
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-pink-600" />
              <div>
                <p className="text-xs text-gray-600">Order Time</p>
                <p className="font-semibold">{order.orderTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-xs text-gray-600">Estimated Delivery</p>
                <p className="font-semibold">{order.estimatedDelivery}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-600">Delivery Address</p>
                <p className="font-semibold text-sm">{order.deliveryAddress.split(',')[0]}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Order Progress</h3>

          <div className="space-y-8">
            {orderSteps.map((step, index) => {
              const StepIcon = step.icon
              const completed = isStepCompleted(index)
              const active = isStepActive(index)

              return (
                <div key={step.id} className="relative">
                  {/* Connecting Line */}
                  {index < orderSteps.length - 1 && (
                    <div
                      className={`absolute left-8 top-16 w-1 h-20 transition-all duration-1000 ${
                        completed ? 'bg-gradient-to-b from-green-500 to-green-400' : 'bg-gray-200'
                      }`}
                    />
                  )}

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start gap-6 p-6 rounded-xl transition-all ${
                      active
                        ? 'bg-gradient-to-r from-pink-50 to-purple-50 shadow-lg scale-105'
                        : completed
                        ? 'bg-green-50'
                        : 'bg-gray-50'
                    }`}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`relative flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                        completed
                          ? 'bg-gradient-to-br from-green-500 to-green-600'
                          : active
                          ? `bg-gradient-to-br ${step.color}`
                          : 'bg-gray-300'
                      }`}
                      animate={
                        active
                          ? {
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <StepIcon className="w-8 h-8 text-white" />
                      
                      {completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </motion.div>
                      )}

                      {active && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{
                            background: `linear-gradient(135deg, ${step.color.split(' ')[1]} 0%, ${step.color.split(' ')[2]} 100%)`,
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`text-xl font-bold ${active ? 'text-pink-600' : completed ? 'text-green-600' : 'text-gray-600'}`}>
                          {step.title}
                        </h4>
                        <span className="text-sm text-gray-500">{step.estimatedTime}</span>
                      </div>
                      <p className={`text-sm mb-3 ${active || completed ? 'text-gray-700' : 'text-gray-500'}`}>
                        {step.description}
                      </p>

                      {/* Progress Bar for Active Step */}
                      {active && (
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${step.color} rounded-full`}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 8, ease: 'linear' }}
                          />
                        </div>
                      )}

                      {/* Special Messages */}
                      {active && step.id === 'baking' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 p-3 bg-white rounded-lg text-sm text-gray-700 flex items-center gap-2"
                        >
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span>Your cake is baking at the perfect temperature! 🔥</span>
                        </motion.div>
                      )}

                      {active && step.id === 'decorating' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 p-3 bg-white rounded-lg text-sm text-gray-700 flex items-center gap-2"
                        >
                          <Paintbrush className="w-4 h-4 text-pink-500" />
                          <span>Our artist is adding the final decorative touches! 🎨</span>
                        </motion.div>
                      )}

                      {active && step.id === 'out-for-delivery' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 p-3 bg-white rounded-lg"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Truck className="w-4 h-4 text-indigo-500" />
                            <span className="text-sm font-semibold text-gray-700">Delivery Partner: Rahul Kumar</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-green-500" />
                            <a href={`tel:${order.phoneNumber}`} className="text-sm text-blue-600 hover:underline">
                              {order.phoneNumber}
                            </a>
                          </div>
                        </motion.div>
                      )}

                      {completed && (
                        <div className="flex items-center gap-2 mt-2 text-green-600 text-sm font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Completed</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>

          {/* Delivered Message */}
          <AnimatePresence>
            {order.status === 'delivered' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-8 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl text-white text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="text-3xl font-bold mb-2">Order Delivered!</h3>
                <p className="text-lg opacity-90">We hope you enjoy your {order.cakeName}!</p>
                <div className="mt-6 flex gap-4 justify-center">
                  <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-bold hover:shadow-lg transition-shadow">
                    Rate Your Experience
                  </button>
                  <button className="px-6 py-3 bg-green-700 text-white rounded-lg font-bold hover:bg-green-800 transition-colors">
                    Order Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-white rounded-xl shadow-lg text-center"
        >
          <p className="text-gray-600 mb-4">Need help with your order?</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Support
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-3 gap-4"
        >
          <div className="p-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl text-white text-center">
            <p className="text-3xl font-bold mb-1">99.2%</p>
            <p className="text-sm opacity-90">On-Time Delivery</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white text-center">
            <p className="text-3xl font-bold mb-1">10K+</p>
            <p className="text-sm opacity-90">Happy Customers</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl text-white text-center">
            <p className="text-3xl font-bold mb-1">4.9★</p>
            <p className="text-sm opacity-90">Average Rating</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
