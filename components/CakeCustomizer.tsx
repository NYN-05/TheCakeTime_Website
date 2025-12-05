import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Save, Share2, Sparkles, Check } from 'lucide-react'
import Image from 'next/image'

interface CakeLayer {
  id: number
  flavor: string
  color: string
}

interface Customization {
  tiers: number
  layers: CakeLayer[]
  frosting: string
  filling: string
  toppings: string[]
  message: string
  size: string
}

const flavors = [
  { name: 'Chocolate', color: '#8B4513', price: 100 },
  { name: 'Vanilla', color: '#F5DEB3', price: 80 },
  { name: 'Red Velvet', color: '#DC143C', price: 120 },
  { name: 'Strawberry', color: '#FFB6C1', price: 110 },
  { name: 'Lemon', color: '#FFF44F', price: 90 },
  { name: 'Coffee', color: '#6F4E37', price: 95 },
]

const frostings = [
  { name: 'Buttercream', price: 50, description: 'Smooth & creamy' },
  { name: 'Cream Cheese', price: 60, description: 'Tangy & rich' },
  { name: 'Whipped Cream', price: 45, description: 'Light & fluffy' },
  { name: 'Ganache', price: 70, description: 'Rich chocolate' },
  { name: 'Fondant', price: 80, description: 'Smooth finish' },
]

const fillings = [
  { name: 'Chocolate Mousse', price: 40 },
  { name: 'Fresh Fruits', price: 50 },
  { name: 'Caramel', price: 45 },
  { name: 'Nutella', price: 55 },
  { name: 'Custard', price: 35 },
]

const toppings = [
  { name: 'Fresh Berries', price: 60, icon: '🍓' },
  { name: 'Chocolate Curls', price: 40, icon: '🍫' },
  { name: 'Edible Flowers', price: 80, icon: '🌸' },
  { name: 'Gold Leaf', price: 150, icon: '✨' },
  { name: 'Macarons', price: 100, icon: '🍪' },
  { name: 'Custom Topper', price: 120, icon: '🎂' },
]

const sizes = [
  { name: 'Small', serves: '8-12', multiplier: 1 },
  { name: 'Medium', serves: '15-20', multiplier: 1.5 },
  { name: 'Large', serves: '25-30', multiplier: 2 },
  { name: 'Extra Large', serves: '35-40', multiplier: 2.5 },
]

export default function CakeCustomizer() {
  const [customization, setCustomization] = useState<Customization>({
    tiers: 2,
    layers: [
      { id: 1, flavor: 'Chocolate', color: '#8B4513' },
      { id: 2, flavor: 'Vanilla', color: '#F5DEB3' },
    ],
    frosting: 'Buttercream',
    filling: 'Chocolate Mousse',
    toppings: [],
    message: '',
    size: 'Medium',
  })

  const [activeTab, setActiveTab] = useState<'tiers' | 'frosting' | 'filling' | 'toppings' | 'final'>('tiers')
  const [totalPrice, setTotalPrice] = useState(0)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    calculatePrice()
  }, [customization])

  const calculatePrice = () => {
    const sizeMultiplier = sizes.find(s => s.name === customization.size)?.multiplier || 1
    
    const layerPrice = customization.layers.reduce((sum, layer) => {
      const flavor = flavors.find(f => f.name === layer.flavor)
      return sum + (flavor?.price || 0)
    }, 0)

    const frostingPrice = frostings.find(f => f.name === customization.frosting)?.price || 0
    const fillingPrice = fillings.find(f => f.name === customization.filling)?.price || 0
    const toppingsPrice = customization.toppings.reduce((sum, topping) => {
      const top = toppings.find(t => t.name === topping)
      return sum + (top?.price || 0)
    }, 0)

    const basePrice = layerPrice + frostingPrice + fillingPrice + toppingsPrice
    setTotalPrice(Math.round(basePrice * sizeMultiplier))
  }

  const addTier = () => {
    if (customization.tiers < 5) {
      const newTier = customization.tiers + 1
      setCustomization({
        ...customization,
        tiers: newTier,
        layers: [
          ...customization.layers,
          { id: newTier, flavor: 'Vanilla', color: '#F5DEB3' }
        ]
      })
    }
  }

  const removeTier = () => {
    if (customization.tiers > 1) {
      const newTier = customization.tiers - 1
      setCustomization({
        ...customization,
        tiers: newTier,
        layers: customization.layers.slice(0, newTier)
      })
    }
  }

  const updateLayerFlavor = (layerId: number, flavor: string, color: string) => {
    setCustomization({
      ...customization,
      layers: customization.layers.map(layer =>
        layer.id === layerId ? { ...layer, flavor, color } : layer
      )
    })
  }

  const toggleTopping = (topping: string) => {
    if (customization.toppings.includes(topping)) {
      setCustomization({
        ...customization,
        toppings: customization.toppings.filter(t => t !== topping)
      })
    } else {
      setCustomization({
        ...customization,
        toppings: [...customization.toppings, topping]
      })
    }
  }

  const saveDesign = () => {
    localStorage.setItem('customCakeDesign', JSON.stringify(customization))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const shareDesign = () => {
    const designUrl = `${window.location.origin}/custom-order?design=${btoa(JSON.stringify(customization))}`
    navigator.clipboard.writeText(designUrl)
    alert('Design link copied! Share it with family for approval.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Design Your Dream Cake
          </h1>
          <p className="text-gray-600 text-lg">Create a unique cake in minutes - see exactly what you'll get!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 sticky top-8 h-fit"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Live Preview</h2>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={saveDesign}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {saved ? 'Saved!' : 'Save'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareDesign}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </motion.button>
              </div>
            </div>

            {/* Cake Visual */}
            <div className="relative flex flex-col items-center justify-end h-[500px] bg-gradient-to-b from-pink-50 to-white rounded-xl p-8">
              <AnimatePresence>
                {customization.layers.map((layer, index) => {
                  const tierHeight = 80 - (index * 10)
                  const tierWidth = 200 - (index * 30)
                  return (
                    <motion.div
                      key={layer.id}
                      initial={{ opacity: 0, y: 50, scale: 0.5 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative mb-2"
                      style={{
                        width: `${tierWidth}px`,
                        height: `${tierHeight}px`,
                        backgroundColor: layer.color,
                        borderRadius: '8px',
                        border: '3px solid rgba(255,255,255,0.5)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm opacity-80">
                        {layer.flavor}
                      </div>
                      {/* Frosting effect */}
                      <div 
                        className="absolute -top-2 left-0 right-0 h-4 rounded-t-lg opacity-80"
                        style={{ backgroundColor: customization.frosting === 'Buttercream' ? '#FFFACD' : '#FFF' }}
                      />
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {/* Toppings */}
              {customization.toppings.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 text-4xl"
                >
                  {customization.toppings.map((topping, idx) => {
                    const toppingData = toppings.find(t => t.name === topping)
                    return <span key={idx} className="inline-block mx-1">{toppingData?.icon}</span>
                  })}
                </motion.div>
              )}

              {/* Sparkles */}
              <Sparkles className="absolute top-8 right-8 text-yellow-400 animate-pulse" />
              <Sparkles className="absolute bottom-8 left-8 text-pink-400 animate-pulse" />
            </div>

            {/* Price Display */}
            <motion.div
              className="mt-6 p-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Price</p>
                  <p className="text-4xl font-bold">₹{totalPrice}</p>
                  <p className="text-xs opacity-75 mt-1">Size: {customization.size} ({sizes.find(s => s.name === customization.size)?.serves} people)</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-pink-600 rounded-lg font-bold hover:shadow-lg transition-shadow"
                >
                  Order Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Customization Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-2 overflow-x-auto">
              {['tiers', 'frosting', 'filling', 'toppings', 'final'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                {activeTab === 'tiers' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Cake Tiers & Flavors</h3>
                    
                    {/* Tier Control */}
                    <div className="flex items-center gap-4 mb-8 p-4 bg-pink-50 rounded-xl">
                      <span className="font-semibold text-gray-700">Number of Tiers:</span>
                      <button
                        onClick={removeTier}
                        disabled={customization.tiers <= 1}
                        className="p-2 bg-white rounded-lg hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-2xl font-bold text-pink-600">{customization.tiers}</span>
                      <button
                        onClick={addTier}
                        disabled={customization.tiers >= 5}
                        className="p-2 bg-white rounded-lg hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Flavor Selection for Each Tier */}
                    <div className="space-y-6">
                      {customization.layers.map((layer, index) => (
                        <div key={layer.id} className="p-4 border-2 border-gray-200 rounded-xl">
                          <h4 className="font-semibold mb-3 text-gray-700">Tier {index + 1}</h4>
                          <div className="grid grid-cols-3 gap-3">
                            {flavors.map((flavor) => (
                              <button
                                key={flavor.name}
                                onClick={() => updateLayerFlavor(layer.id, flavor.name, flavor.color)}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                  layer.flavor === flavor.name
                                    ? 'border-pink-500 bg-pink-50 shadow-lg scale-105'
                                    : 'border-gray-200 hover:border-pink-300 hover:shadow-md'
                                }`}
                              >
                                <div
                                  className="w-full h-12 rounded-md mb-2"
                                  style={{ backgroundColor: flavor.color }}
                                />
                                <p className="font-semibold text-sm">{flavor.name}</p>
                                <p className="text-xs text-gray-500">+₹{flavor.price}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'frosting' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Choose Frosting</h3>
                    <div className="grid gap-4">
                      {frostings.map((frosting) => (
                        <button
                          key={frosting.name}
                          onClick={() => setCustomization({ ...customization, frosting: frosting.name })}
                          className={`p-6 rounded-xl border-2 text-left transition-all ${
                            customization.frosting === frosting.name
                              ? 'border-pink-500 bg-pink-50 shadow-lg'
                              : 'border-gray-200 hover:border-pink-300 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-lg">{frosting.name}</p>
                              <p className="text-sm text-gray-600">{frosting.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-pink-600 font-bold">+₹{frosting.price}</p>
                              {customization.frosting === frosting.name && (
                                <Check className="w-6 h-6 text-pink-600 mt-2" />
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'filling' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Select Filling</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {fillings.map((filling) => (
                        <button
                          key={filling.name}
                          onClick={() => setCustomization({ ...customization, filling: filling.name })}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            customization.filling === filling.name
                              ? 'border-purple-500 bg-purple-50 shadow-lg'
                              : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                          }`}
                        >
                          <p className="font-bold">{filling.name}</p>
                          <p className="text-purple-600 font-semibold mt-2">+₹{filling.price}</p>
                          {customization.filling === filling.name && (
                            <Check className="w-5 h-5 text-purple-600 mt-2 mx-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'toppings' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Toppings</h3>
                    <p className="text-sm text-gray-600 mb-6">Select multiple toppings to make it extra special!</p>
                    <div className="grid grid-cols-2 gap-4">
                      {toppings.map((topping) => (
                        <button
                          key={topping.name}
                          onClick={() => toggleTopping(topping.name)}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            customization.toppings.includes(topping.name)
                              ? 'border-pink-500 bg-pink-50 shadow-lg'
                              : 'border-gray-200 hover:border-pink-300 hover:shadow-md'
                          }`}
                        >
                          <div className="text-4xl mb-2">{topping.icon}</div>
                          <p className="font-bold">{topping.name}</p>
                          <p className="text-pink-600 font-semibold mt-2">+₹{topping.price}</p>
                          {customization.toppings.includes(topping.name) && (
                            <Check className="w-5 h-5 text-pink-600 mt-2 mx-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'final' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Final Touches</h3>
                    
                    {/* Size Selection */}
                    <div className="mb-6">
                      <label className="block font-semibold mb-3 text-gray-700">Cake Size</label>
                      <div className="grid grid-cols-2 gap-4">
                        {sizes.map((size) => (
                          <button
                            key={size.name}
                            onClick={() => setCustomization({ ...customization, size: size.name })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              customization.size === size.name
                                ? 'border-pink-500 bg-pink-50 shadow-lg'
                                : 'border-gray-200 hover:border-pink-300'
                            }`}
                          >
                            <p className="font-bold">{size.name}</p>
                            <p className="text-sm text-gray-600">Serves {size.serves}</p>
                            <p className="text-xs text-pink-600 mt-1">{size.multiplier}x price</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Message */}
                    <div>
                      <label className="block font-semibold mb-3 text-gray-700">Custom Message (Optional)</label>
                      <input
                        type="text"
                        value={customization.message}
                        onChange={(e) => setCustomization({ ...customization, message: e.target.value })}
                        placeholder="e.g., Happy Birthday Sarah!"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                        maxLength={50}
                      />
                      <p className="text-xs text-gray-500 mt-2">{customization.message.length}/50 characters</p>
                    </div>

                    {/* Order Summary */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                      <h4 className="font-bold text-lg mb-4">Order Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Tiers:</span>
                          <span className="font-semibold">{customization.tiers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Frosting:</span>
                          <span className="font-semibold">{customization.frosting}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Filling:</span>
                          <span className="font-semibold">{customization.filling}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Toppings:</span>
                          <span className="font-semibold">{customization.toppings.length || 'None'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Size:</span>
                          <span className="font-semibold">{customization.size}</span>
                        </div>
                        {customization.message && (
                          <div className="flex justify-between">
                            <span>Message:</span>
                            <span className="font-semibold">"{customization.message}"</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              {activeTab !== 'tiers' && (
                <button
                  onClick={() => {
                    const tabs = ['tiers', 'frosting', 'filling', 'toppings', 'final']
                    const currentIndex = tabs.indexOf(activeTab)
                    setActiveTab(tabs[currentIndex - 1] as any)
                  }}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
              )}
              {activeTab !== 'final' && (
                <button
                  onClick={() => {
                    const tabs = ['tiers', 'frosting', 'filling', 'toppings', 'final']
                    const currentIndex = tabs.indexOf(activeTab)
                    setActiveTab(tabs[currentIndex + 1] as any)
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
                >
                  Next Step
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
