"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

// 3D Flip Card
export const FlipCard = ({
  front,
  back,
  className = "",
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};

// Liquid Button Effect
export const LiquidButton = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [fillProgress, setFillProgress] = useState(0);

  const handleClick = () => {
    setFillProgress(100);
    setTimeout(() => {
      onClick?.();
      setFillProgress(0);
    }, 800);
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
        initial={{ y: "100%" }}
        animate={{
          y: fillProgress > 0 ? "0%" : isHovered ? "70%" : "100%",
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

// Elastic Search Bar
export const ElasticSearchBar = ({
  onSearch,
  placeholder = "Search...",
}: {
  onSearch: (query: string) => void;
  placeholder?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const mockSuggestions = [
    "Chocolate Cake",
    "Strawberry Delight",
    "Vanilla Dream",
    "Red Velvet",
    "Black Forest",
  ];

  const handleFocus = () => {
    setIsExpanded(true);
    if (query.length > 0) {
      setSuggestions(mockSuggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())));
    }
  };

  const handleChange = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      setSuggestions(mockSuggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative">
      <motion.div
        className="relative"
        animate={{ width: isExpanded ? 400 : 250 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
          placeholder={placeholder}
          className="w-full px-6 py-3 rounded-full border-2 border-pink-300 focus:border-pink-500 outline-none transition-colors bg-white shadow-lg"
        />
        <motion.button
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSearch(query)}
        >
          🔍
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {suggestions.length > 0 && isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl overflow-hidden z-50"
          >
            {suggestions.map((suggestion, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="px-6 py-3 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  setQuery(suggestion);
                  onSearch(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Floating Label Input
export const FloatingLabelInput = ({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-pink-500 transition-colors bg-white"
      />
      <motion.label
        animate={{
          top: isFocused || hasValue ? -10 : 12,
          fontSize: isFocused || hasValue ? "0.75rem" : "1rem",
          color: isFocused ? "#ec4899" : "#6b7280",
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 bg-white px-2 pointer-events-none"
      >
        {label}
      </motion.label>
    </div>
  );
};

// Progress Ring
export const ProgressRing = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = "#ec4899",
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        {Math.round(progress)}%
      </div>
    </div>
  );
};
