import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { CartItem, CartContextType } from '../types'

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Load cart from localStorage on mount (client-side only)
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        // Invalid cart data, reset
        localStorage.removeItem('cart')
      }
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes (only after hydration)
    if (isHydrated) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isHydrated])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      // Check if item already exists
      const existingIndex = prev.findIndex(
        i => i.product.id === item.product.id && i.weight === item.weight
      )

      if (existingIndex > -1) {
        // Update quantity if exists
        const newCart = [...prev]
        newCart[existingIndex].quantity += item.quantity
        return newCart
      } else {
        // Add new item
        return [...prev, item]
      }
    })
  }

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const updateQuantity = (index: number, quantity: number) => {
    setCart(prev => {
      const newCart = [...prev]
      newCart[index].quantity = Math.max(1, quantity)
      return newCart
    })
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
