"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4"
        >
          <div className="max-w-7xl mx-auto bg-gradient-to-r from-pink-50 to-purple-50 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-200 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl">
                  <Cookie className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">🍪 We Value Your Privacy</h4>
                  <p className="text-sm text-gray-600">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                    By clicking "Accept", you consent to our use of cookies.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={declineCookies}
                  className="px-6 py-3 rounded-full border-2 border-pink-300 text-pink-600 hover:bg-pink-50 transition-colors font-semibold"
                >
                  Decline
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:shadow-xl hover:scale-105 transition-all font-semibold"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
