"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Live Stock Indicator
export const LiveStockIndicator = ({ stock }: { stock: number }) => {
  const isLowStock = stock <= 5;
  const isOutOfStock = stock === 0;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
        isOutOfStock
          ? "bg-red-500 text-white"
          : isLowStock
          ? "bg-orange-500 text-white"
          : "bg-green-500 text-white"
      }`}
    >
      <motion.span
        animate={isLowStock ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        {isOutOfStock ? "❌" : isLowStock ? "⚠️" : "✅"}
      </motion.span>
      <span>{isOutOfStock ? "Out of Stock" : isLowStock ? `Only ${stock} left!` : `${stock} in stock`}</span>
    </motion.div>
  );
};

// Countdown Timer
export const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-2xl shadow-lg">
      <span className="text-2xl">⏰</span>
      <div className="flex gap-2">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <motion.div
            key={unit}
            className="text-center"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold">{String(value).padStart(2, "0")}</div>
            <div className="text-xs uppercase">{unit}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Social Proof Popup
export const SocialProofPopup = () => {
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);

  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad"];
  const cakes = ["Chocolate Cake", "Red Velvet", "Black Forest", "Vanilla Dream", "Strawberry Delight"];
  const names = ["Raj", "Priya", "Amit", "Sneha", "Vikram", "Anjali", "Rohan", "Diya"];

  useEffect(() => {
    const interval = setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const cake = cakes[Math.floor(Math.random() * cakes.length)];
      const time = Math.floor(Math.random() * 30) + 1;

      const newNotification = {
        id: Date.now(),
        message: `${name} from ${city} just ordered ${cake} (${time} min ago)`,
      };

      setNotifications((prev) => [...prev.slice(-2), newNotification]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
      }, 5000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-[9999] space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl p-4 max-w-sm flex items-start gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-xl flex-shrink-0">
              🛒
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800 font-medium">{notification.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Trending Badge
export const TrendingBadge = ({ isTrending = false }: { isTrending?: boolean }) => {
  if (!isTrending) return null;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      className="absolute -top-2 -right-2 z-10"
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            🔥
          </motion.span>
          TRENDING
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-50"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>
    </motion.div>
  );
};

// Delivery ETA Calculator
export const DeliveryETACalculator = ({ distance }: { distance: number }) => {
  const [eta, setEta] = useState(0);
  const [isCalculating, setIsCalculating] = useState(true);

  useEffect(() => {
    setIsCalculating(true);
    setTimeout(() => {
      // Simulate calculation: 5 min per km + 10 min prep time
      const calculatedEta = Math.round(distance * 5 + 10);
      setEta(calculatedEta);
      setIsCalculating(false);
    }, 1500);
  }, [distance]);

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          animate={{ rotate: isCalculating ? 360 : 0 }}
          transition={{ repeat: isCalculating ? Infinity : 0, duration: 1, ease: "linear" }}
          className="text-4xl"
        >
          🚚
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Delivery Estimate</h3>
          <p className="text-sm text-gray-600">{distance.toFixed(1)} km away</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isCalculating ? (
          <motion.div
            key="calculating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-4"
          >
            <div className="text-gray-600">Calculating route...</div>
            <div className="mt-2 flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              {eta} min
            </div>
            <div className="text-gray-600">Estimated delivery time</div>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600 font-semibold">
              <span>✓</span>
              <span>Fast delivery available</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Route */}
      <div className="mt-6 relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: isCalculating ? "100%" : "100%" }}
          transition={{ duration: isCalculating ? 1.5 : 0.5 }}
        />
      </div>
    </div>
  );
};

// Urgency Banner
export const UrgencyBanner = ({ stock, expiresIn }: { stock: number; expiresIn: number }) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-4 rounded-2xl shadow-xl"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-3xl"
          >
            ⚡
          </motion.span>
          <div>
            <div className="font-bold text-lg">Limited Time Offer!</div>
            <div className="text-sm opacity-90">Only {stock} left at this price</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
          <span>⏰</span>
          <span className="font-bold">{expiresIn} min left</span>
        </div>
      </div>
    </motion.div>
  );
};
