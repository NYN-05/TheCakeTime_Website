import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-pink-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-float-slow">
          <Sparkles size={40} />
        </div>
        <div className="absolute bottom-20 right-20 animate-float-delay">
          <Sparkles size={30} />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-float">
          <Heart size={35} />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl font-display font-bold bg-gradient-to-r from-yellow-200 via-pink-200 to-white bg-clip-text text-transparent">
              TheCakeTime
            </h3>
            <p className="text-pink-100 text-sm leading-relaxed">
              Crafting delightful memories with premium cakes and pastries since 2020. ✨
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="group relative p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-110">
                <Facebook size={20} className="text-pink-200 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="group relative p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-110">
                <Instagram size={20} className="text-pink-200 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="group relative p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-110">
                <Twitter size={20} className="text-pink-200 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-200 font-display">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-pink-100 hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  → Products
                </Link>
              </li>
              <li>
                <Link href="/custom-order" className="text-pink-100 hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  → Custom Order
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-pink-100 hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  → Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-pink-100 hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  → About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-pink-100 hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  → FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-200 font-display">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-pink-100 hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  → Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-pink-100 hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  → Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-pink-100 hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  → Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/delivery-policy" className="text-pink-100 hover:text-white transition-colors hover:translate-x-1 inline-block transform">
                  → Delivery Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-200 font-display">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-pink-300 group-hover:text-yellow-200 transition-colors" />
                <span className="text-sm text-pink-100">123 Bakery Street, Delhi, India 110001</span>
              </li>
              <li className="flex items-center group">
                <Phone size={18} className="mr-2 flex-shrink-0 text-pink-300 group-hover:text-yellow-200 transition-colors" />
                <a href="tel:+911234567890" className="text-sm text-pink-100 hover:text-white transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center group">
                <Mail size={18} className="mr-2 flex-shrink-0 text-pink-300 group-hover:text-yellow-200 transition-colors" />
                <a href="mailto:info@thecaketime.com" className="text-sm text-pink-100 hover:text-white transition-colors">
                  info@thecaketime.com
                </a>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-pink-300/20">
              <p className="text-sm font-semibold text-yellow-200 mb-1">Business Hours:</p>
              <p className="text-sm text-pink-100">Mon-Sat: 9:00 AM - 9:00 PM</p>
              <p className="text-sm text-pink-100">Sun: 10:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-300/20 mt-8 pt-8 text-center">
          <p className="text-pink-200 text-sm">
            Made with <Heart size={14} className="inline text-red-400" /> by TheCakeTime Team
          </p>
          <p className="text-pink-300/80 text-xs mt-2">
            &copy; {new Date().getFullYear()} TheCakeTime. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
