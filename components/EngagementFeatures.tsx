"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Scratch Card Discount
export const ScratchCard = ({ couponCode }: { couponCode: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw scratch layer
    ctx.fillStyle = "#d946ef";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal", canvas.width / 2, canvas.height / 2);

    ctx.globalCompositeOperation = "destination-out";
  }, []);

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    const percentage = (transparent / (pixels.length / 4)) * 100;
    setScratchPercentage(percentage);

    if (percentage > 60) {
      setIsRevealed(true);
    }
  };

  return (
    <div className="relative w-80 h-48 mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl shadow-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {couponCode}
          </div>
          <div className="text-xl text-gray-700 font-semibold">20% OFF</div>
        </div>
      </div>
      <AnimatePresence>
        {!isRevealed && (
          <motion.canvas
            ref={canvasRef}
            width={320}
            height={192}
            className="absolute inset-0 cursor-pointer rounded-2xl"
            onMouseMove={scratch}
            onTouchMove={scratch}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      {isRevealed && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-3xl"
        >
          ✓
        </motion.div>
      )}
    </div>
  );
};

// Spin the Wheel
export const SpinWheel = ({ prizes, onWin }: { prizes: string[]; onWin: (prize: string) => void }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const spins = 5 + Math.random() * 5;
    const degrees = spins * 360 + Math.random() * 360;
    setRotation(rotation + degrees);

    setTimeout(() => {
      const finalAngle = degrees % 360;
      const segmentAngle = 360 / prizes.length;
      const prizeIndex = Math.floor((360 - finalAngle) / segmentAngle) % prizes.length;
      onWin(prizes[prizeIndex]);
      setIsSpinning(false);
    }, 4000);
  };

  const segmentAngle = 360 / prizes.length;
  const colors = ["#ec4899", "#a855f7", "#f97316", "#fbbf24", "#10b981", "#3b82f6"];

  return (
    <div className="relative w-96 h-96 mx-auto">
      <motion.div
        className="w-full h-full rounded-full relative shadow-2xl"
        animate={{ rotate: rotation }}
        transition={{ duration: 4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {prizes.map((prize, i) => {
            const startAngle = i * segmentAngle;
            const endAngle = (i + 1) * segmentAngle;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const x1 = 50 + 50 * Math.cos(startRad);
            const y1 = 50 + 50 * Math.sin(startRad);
            const x2 = 50 + 50 * Math.cos(endRad);
            const y2 = 50 + 50 * Math.sin(endRad);

            return (
              <g key={i}>
                <path
                  d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                  fill={colors[i % colors.length]}
                  stroke="white"
                  strokeWidth="0.5"
                />
                <text
                  x="50"
                  y="25"
                  transform={`rotate(${startAngle + segmentAngle / 2} 50 50)`}
                  textAnchor="middle"
                  fill="white"
                  fontSize="5"
                  fontWeight="bold"
                >
                  {prize}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg" />
        </div>
      </motion.div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-red-500 z-10" />
      <motion.button
        onClick={spin}
        disabled={isSpinning}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-bold shadow-xl disabled:opacity-50 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        SPIN
      </motion.button>
    </div>
  );
};

// Daily Check-in Calendar
export const CheckInCalendar = () => {
  const [checkedDays, setCheckedDays] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleCheckIn = (day: number) => {
    if (!checkedDays.includes(day)) {
      setCheckedDays([...checkedDays, day]);
      setStreak(streak + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Daily Check-In
        </h2>
        <div className="text-xl font-semibold text-gray-700">
          🔥 Streak: {streak} days
        </div>
      </div>
      <div className="grid grid-cols-7 gap-3">
        {days.map((day) => {
          const isChecked = checkedDays.includes(day);
          return (
            <motion.button
              key={day}
              onClick={() => handleCheckIn(day)}
              className={`aspect-square rounded-xl flex items-center justify-center text-lg font-bold ${
                isChecked
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: day * 0.02 }}
            >
              {isChecked ? "✓" : day}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

// Reviews Wall of Love
export const ReviewsWall = ({
  reviews,
}: {
  reviews: { name: string; text: string; rating: number; image: string }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 p-6">
      {reviews.map((review, i) => (
        <motion.div
          key={i}
          className="break-inside-avoid mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.random() * 0.5 }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl">
                {review.name[0]}
              </div>
              <div>
                <div className="font-semibold text-gray-800">{review.name}</div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className={j < review.rating ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="text-gray-600 overflow-hidden"
                >
                  {review.text}
                </motion.p>
              )}
            </AnimatePresence>
            {hoveredIndex !== i && (
              <p className="text-gray-600 line-clamp-3">{review.text}</p>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Live Order Counter
export const LiveOrderCounter = () => {
  const [count, setCount] = useState(247);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, Math.random() * 10000 + 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={count}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.2, 1] }}
      className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg"
    >
      <motion.span
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-2xl"
      >
        🎂
      </motion.span>
      <div>
        <div className="text-3xl font-bold">{count}</div>
        <div className="text-sm opacity-90">Orders Today</div>
      </div>
    </motion.div>
  );
};
