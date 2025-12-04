"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description?: string;
}

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product) => void;
}

export const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }: QuickViewModalProps) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative p-8">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                >
                  <X size={20} />
                </button>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      {product.name}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            {i < Math.floor(product.rating) ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-600">{product.rating}</span>
                    </div>

                    {/* Price */}
                    <div className="text-4xl font-bold text-pink-600 mb-6">
                      ₹{product.price}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6">
                      {product.description || "A delicious handcrafted cake made with premium ingredients and lots of love. Perfect for any celebration!"}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span> Fresh ingredients
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span> Same-day delivery
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span> Customizable
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          onAddToCart?.(product);
                          onClose();
                        }}
                        className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all"
                      >
                        Add to Cart
                      </button>
                      <button className="px-6 py-4 border-2 border-pink-600 text-pink-600 rounded-full font-bold hover:bg-pink-50 transition-colors">
                        ❤️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const useQuickView = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeQuickView = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return { selectedProduct, isOpen, openQuickView, closeQuickView };
};
