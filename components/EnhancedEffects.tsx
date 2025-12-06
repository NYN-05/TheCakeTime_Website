"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// ============================================
// TYPEWRITER EFFECT - Enhanced with gradient cursor
// ============================================
export const TypewriterEffect = ({
  words,
  className = "",
  cursorClassName = "",
}: {
  words: string[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState(words[0] || "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const word = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < word.length) {
            setCurrentText(word.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, mounted]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className={`inline-block w-1 h-[1em] bg-gradient-to-b from-pink-500 to-purple-600 ml-1 rounded-full ${cursorClassName}`}
      />
    </span>
  );
};

// ============================================
// IMAGE COMPARISON SLIDER - Enhanced with smooth animations
// ============================================
interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const ImageComparisonSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: ImageComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl select-none cursor-ew-resize shadow-2xl"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* After Image */}
      <img src={afterImage} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" />

      {/* Before Image Overlay */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover grayscale" />
      </motion.div>

      {/* Slider Line with Glow Effect */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-pink-500"
        style={{ left: `${sliderPosition}%` }}
        animate={{ boxShadow: isHovered ? "0 0 20px rgba(236, 72, 153, 0.8)" : "0 0 10px rgba(236, 72, 153, 0.5)" }}
      >
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center"
          whileHover={{ scale: 1.2 }}
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-1">
            <motion.div 
              className="w-1 h-5 bg-white rounded-full" 
              animate={{ x: isHovered ? -2 : 0 }}
            />
            <motion.div 
              className="w-1 h-5 bg-white rounded-full" 
              animate={{ x: isHovered ? 2 : 0 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Labels with animation */}
      <motion.div 
        className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        ✨ {beforeLabel}
      </motion.div>
      <motion.div 
        className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        🎂 {afterLabel}
      </motion.div>
    </motion.div>
  );
};

// ============================================
// FLOATING PARTICLES - Decorative background effect
// ============================================
export const FloatingParticles = ({ count = 20 }: { count?: number }) => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; size: number; x: number; delay: number; duration: number }>>([]);
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    setMounted(true);
    setWindowHeight(window.innerHeight);
    // Generate particles only on client side
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 10 + 5,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
      }))
    );
  }, [count]);

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            bottom: "-20px",
          }}
          animate={{
            y: [0, -windowHeight - 100],
            x: [0, Math.sin(particle.id) * 50],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// ============================================
// MAGNETIC BUTTON - Interactive button with magnetic effect
// ============================================
export const MagneticButton = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// ============================================
// REVEAL TEXT - Text that reveals on scroll/hover
// ============================================
export const RevealText = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const words = text.split(" ");

  return (
    <div className={`flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// ============================================
// GLOWING CARD - Card with animated glow effect
// ============================================
export const GlowingCard = ({
  children,
  className = "",
  glowColor = "pink",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: "pink" | "purple" | "blue" | "orange";
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const glowColors = {
    pink: "rgba(236, 72, 153, 0.4)",
    purple: "rgba(168, 85, 247, 0.4)",
    blue: "rgba(59, 130, 246, 0.4)",
    orange: "rgba(249, 115, 22, 0.4)",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl bg-white ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColors[glowColor]} 0%, transparent 70%)`,
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// ============================================
// ANIMATED COUNTER - Number counting animation
// ============================================
export const AnimatedCounter = ({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isVisible, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// ============================================
// SHIMMER TEXT - Text with shimmer effect
// ============================================
export const ShimmerText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`relative inline-block bg-gradient-to-r from-pink-600 via-purple-500 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer ${className}`}
      style={{
        animation: "shimmer 3s linear infinite",
      }}
    >
      {children}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
    </span>
  );
};

// ============================================
// MORPHING SHAPE - Animated background shape
// ============================================
export const MorphingShape = ({
  className = "",
  color = "pink",
}: {
  className?: string;
  color?: "pink" | "purple" | "gradient";
}) => {
  const colors = {
    pink: "from-pink-400 to-pink-600",
    purple: "from-purple-400 to-purple-600",
    gradient: "from-pink-400 via-purple-500 to-indigo-500",
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br ${colors[color]} blur-3xl opacity-30 ${className}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70%/60% 30% 70% 40%",
          "30% 60% 70% 40%/50% 60% 30% 60%",
          "60% 40% 30% 70%/60% 30% 70% 40%",
        ],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// ============================================
// TILT CARD - 3D tilt effect card
// ============================================
export const TiltCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// SPOTLIGHT EFFECT - Spotlight following cursor
// ============================================
export const SpotlightCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(236, 72, 153, 0.15), transparent 40%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      {children}
    </motion.div>
  );
};

// ============================================
// STAGGERED LIST - List items with staggered animation
// ============================================
export const StaggeredList = ({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
}) => {
  return (
    <motion.div className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: i * staggerDelay,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// ============================================
// PULSE RING - Animated pulse ring effect
// ============================================
export const PulseRing = ({
  children,
  className = "",
  color = "pink",
}: {
  children: React.ReactNode;
  className?: string;
  color?: "pink" | "purple" | "blue";
}) => {
  const colors = {
    pink: "border-pink-500",
    purple: "border-purple-500",
    blue: "border-blue-500",
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute inset-0 rounded-full border-2 ${colors[color]}`}
          animate={{
            scale: [1, 2],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
      {children}
    </div>
  );
};
