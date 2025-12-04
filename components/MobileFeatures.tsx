"use client";
import { motion, AnimatePresence, useMotionValue, PanInfo } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Pull to Refresh
export const PullToRefresh = ({
  onRefresh,
  children,
}: {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = async (_: any, info: PanInfo) => {
    if (info.offset.y > 100) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setPullDistance(0);
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 150 }}
        dragElastic={0.5}
        onDrag={(_, info) => setPullDistance(Math.max(0, info.offset.y))}
        onDragEnd={handleDragEnd}
        className="touch-pan-y"
      >
        <div className="h-20 flex items-center justify-center">
          <AnimatePresence>
            {pullDistance > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                {isRefreshing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="text-4xl"
                  >
                    🎂
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-4xl"
                  >
                    ⬇️
                  </motion.div>
                )}
                <div className="text-sm text-gray-600 mt-2">
                  {isRefreshing ? "Refreshing..." : pullDistance > 100 ? "Release to refresh" : "Pull down"}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

// Bottom Sheet Modal
export const BottomSheet = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const y = useMotionValue(0);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 150) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[9998]"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ y }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[9999] max-h-[80vh] overflow-auto"
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Haptic Feedback Hook
export const useHapticFeedback = () => {
  const triggerHaptic = (style: "light" | "medium" | "heavy" = "medium") => {
    if ("vibrate" in navigator) {
      const duration = style === "light" ? 10 : style === "medium" ? 20 : 50;
      navigator.vibrate(duration);
    }
  };

  return { triggerHaptic };
};

// Shake to Show Deals
export const useShakeDetection = (onShake: () => void, threshold = 15) => {
  const lastX = useRef(0);
  const lastY = useRef(0);
  const lastZ = useRef(0);

  useEffect(() => {
    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const deltaX = Math.abs((acceleration.x || 0) - lastX.current);
      const deltaY = Math.abs((acceleration.y || 0) - lastY.current);
      const deltaZ = Math.abs((acceleration.z || 0) - lastZ.current);

      if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
        onShake();
      }

      lastX.current = acceleration.x || 0;
      lastY.current = acceleration.y || 0;
      lastZ.current = acceleration.z || 0;
    };

    if (typeof window !== "undefined" && "DeviceMotionEvent" in window) {
      window.addEventListener("devicemotion", handleMotion);
      return () => window.removeEventListener("devicemotion", handleMotion);
    }
  }, [onShake, threshold]);
};

export const ShakeDealsBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useShakeDetection(() => {
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 5000);
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-20 left-0 right-0 mx-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-2xl shadow-2xl z-[9999]"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">🎉</div>
            <div className="text-2xl font-bold mb-2">Secret Deal Unlocked!</div>
            <div className="text-lg">Get 30% OFF with code: SHAKE30</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Double Tap Like
export const DoubleTapLike = ({
  onLike,
  children,
}: {
  onLike: () => void;
  children: React.ReactNode;
}) => {
  const [showHeart, setShowHeart] = useState(false);
  const lastTap = useRef(0);

  const handleTap = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTap.current;

    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      setShowHeart(true);
      onLike();
      setTimeout(() => setShowHeart(false), 1000);
    }

    lastTap.current = now;
  };

  return (
    <div onClick={handleTap} className="relative select-none">
      {children}
      <AnimatePresence>
        {showHeart && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.5, 1.2], opacity: [1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-9xl">❤️</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Swipe Gallery
export const SwipeGallery = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -100 && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-2xl">
      <motion.div
        className="flex h-full"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        {images.map((image, i) => (
          <div key={i} className="min-w-full h-full">
            <img src={image} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === currentIndex ? "bg-white w-6" : "bg-white/50"
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
};
