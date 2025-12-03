import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart, User } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartCount } = useCart()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-display font-bold text-gradient">TheCakeTime</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Products
            </Link>
            <Link href="/custom-order" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Custom Order
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Gallery
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/checkout" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart size={24} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User size={24} className="text-gray-700" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Home
            </Link>
            <Link href="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Products
            </Link>
            <Link href="/custom-order" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Custom Order
            </Link>
            <Link href="/gallery" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Gallery
            </Link>
            <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              About
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Contact
            </Link>
            <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Admin
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
