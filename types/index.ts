// Cart Item Type
export interface CartItem {
  product: {
    id: number
    name: string
    image: string
  }
  quantity: number
  price: number
  weight: string
  message?: string
}

// Order Types
export interface OrderCustomer {
  name: string
  email: string
  phone: string
}

export interface OrderDelivery {
  address: string
  city: string
  pincode: string
  date: string
  time: string
}

export interface OrderItem {
  product: string
  name: string
  price: number
  quantity: number
  weight: string
  customMessage?: string
}

export interface OrderPayment {
  method: string
  status: string
  stripePaymentIntentId?: string
  amount: number
  currency: string
}

export interface Order {
  _id: string
  orderNumber: string
  customer: OrderCustomer
  items: OrderItem[]
  delivery: OrderDelivery
  payment: OrderPayment
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
}

// Product Types
export interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  ingredients?: string[]
  weight: string[]
  flavor: string
  occasion?: string[]
  eggless: boolean
  inStock: boolean
  rating: number
  reviews: number
  customizable: boolean
  preparationTime: number
}

// Review Types
export interface Review {
  _id: string
  product: string
  user: {
    _id: string
    name: string
  }
  rating: number
  comment: string
  approved: boolean
  createdAt: string
}

// User Types
export interface User {
  _id: string
  name: string
  email: string
  phone?: string
  role: 'customer' | 'admin' | 'staff'
  addresses?: Address[]
  createdAt: string
}

export interface Address {
  _id: string
  type: 'home' | 'work' | 'other'
  address: string
  city: string
  pincode: string
  isDefault: boolean
}

// Custom Order Types
export interface CustomOrder {
  _id: string
  customer: OrderCustomer
  cakeDetails: {
    type: string
    flavor: string
    weight: string
    layers: number
    shape: string
    message: string
    specialInstructions?: string
  }
  designPreferences: {
    theme: string
    colors: string[]
    images?: string[]
  }
  delivery: OrderDelivery
  status: 'inquiry' | 'quotation_sent' | 'approved' | 'in_progress' | 'completed' | 'cancelled'
  quotation?: {
    amount: number
    notes: string
    validUntil: string
  }
  createdAt: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Payment Intent Response
export interface PaymentIntentResponse {
  clientSecret: string
  paymentIntentId: string
}

// Cart Context Types
export interface CartContextType {
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (item: CartItem) => void
  removeFromCart: (index: number) => void
  updateQuantity: (index: number, quantity: number) => void
  clearCart: () => void
}
