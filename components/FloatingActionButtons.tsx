"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export const FloatingActionButtons = () => {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [mounted, setMounted] = useState(false);

  const whatsappNumber = "1234567890";
  const phoneNumber = "+911234567890";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server to avoid hydration issues with animations
  if (!mounted) return null;

  return (
    <div className="fixed bottom-24 right-8 z-[9998] flex flex-col gap-4">
      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowWhatsApp(true)}
        onMouseLeave={() => setShowWhatsApp(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-shadow"
      >
        <MessageCircle size={24} />
        
        {/* Ripple Effect */}
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-green-500 rounded-full"
        />

        {/* Tooltip */}
        <AnimatePresence>
          {showWhatsApp && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 whitespace-nowrap bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Chat on WhatsApp
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>

      {/* Call Button */}
      <motion.a
        href={`tel:${phoneNumber}`}
        onMouseEnter={() => setShowCall(true)}
        onMouseLeave={() => setShowCall(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-shadow"
      >
        <Phone size={24} />
        
        {/* Ripple Effect */}
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="absolute inset-0 bg-pink-500 rounded-full"
        />

        {/* Tooltip */}
        <AnimatePresence>
          {showCall && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 whitespace-nowrap bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Call Us Now
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>
    </div>
  );
};
