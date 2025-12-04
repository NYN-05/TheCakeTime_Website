"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// AI Cake Recommendation Quiz
export const AIRecommendationQuiz = ({
  onComplete,
}: {
  onComplete: (recommendation: string) => void;
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: "What's the occasion?",
      options: ["Birthday", "Anniversary", "Wedding", "Just Because"],
    },
    {
      question: "Preferred flavor profile?",
      options: ["Sweet & Rich", "Light & Fruity", "Chocolate Lover", "Classic Vanilla"],
    },
    {
      question: "Size needed?",
      options: ["Small (2-4)", "Medium (6-8)", "Large (10-15)", "Extra Large (20+)"],
    },
  ];

  const recommendations: Record<string, string> = {
    "Birthday-Sweet & Rich-Medium": "Triple Chocolate Fudge Cake",
    "Anniversary-Light & Fruity-Small": "Strawberry Champagne Cake",
    "Wedding-Classic Vanilla-Extra Large": "Classic Vanilla Wedding Tier",
    default: "Signature Red Velvet Cake",
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const key = newAnswers.join("-");
      const recommendation = recommendations[key] || recommendations.default;
      onComplete(recommendation);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 mx-1 rounded-full ${
                i <= step ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <div className="text-sm text-gray-600 text-center">
          Question {step + 1} of {questions.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {questions[step].question}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {questions[step].options.map((option, i) => (
              <motion.button
                key={i}
                onClick={() => handleAnswer(option)}
                className="p-6 rounded-2xl border-2 border-gray-200 hover:border-pink-500 transition-all bg-gradient-to-br from-pink-50 to-purple-50 hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-lg font-semibold text-gray-800">{option}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// AI Recommendation Result
export const AIRecommendationResult = ({
  recommendation,
  onReset,
}: {
  recommendation: string;
  onReset: () => void;
}) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", duration: 0.8 }}
      className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-2xl text-center"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-8xl mb-6"
      >
        🎂
      </motion.div>

      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        Perfect Match!
      </h2>

      <div className="text-2xl font-semibold text-gray-800 mb-6">{recommendation}</div>

      <p className="text-gray-600 mb-8">
        Based on your preferences, this is our AI-powered recommendation just for you!
      </p>

      <div className="flex gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full shadow-lg"
        >
          View Cake Details
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="px-8 py-4 bg-white text-gray-800 font-bold rounded-full shadow-lg"
        >
          Take Quiz Again
        </motion.button>
      </div>
    </motion.div>
  );
};

// Price Comparison Tool
export const PriceComparisonTool = ({
  cakes,
}: {
  cakes: { name: string; price: number; features: string[]; rating: number }[];
}) => {
  const [selectedCakes, setSelectedCakes] = useState<number[]>([0, 1]);

  const toggleCake = (index: number) => {
    if (selectedCakes.includes(index)) {
      setSelectedCakes(selectedCakes.filter((i) => i !== index));
    } else if (selectedCakes.length < 3) {
      setSelectedCakes([...selectedCakes, index]);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        Compare Cakes
      </h2>

      <div className="mb-6 flex flex-wrap gap-3 justify-center">
        {cakes.map((cake, i) => (
          <motion.button
            key={i}
            onClick={() => toggleCake(i)}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              selectedCakes.includes(i)
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cake.name}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {selectedCakes.map((cakeIndex, i) => {
            const cake = cakes[cakeIndex];
            return (
              <motion.div
                key={cakeIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 text-center">
                  <div className="text-4xl mb-2">🎂</div>
                  <h3 className="text-xl font-bold">{cake.name}</h3>
                </div>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-800 mb-2">₹{cake.price}</div>
                    <div className="flex justify-center">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span
                          key={j}
                          className={j < cake.rating ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {cake.features.map((feature, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + j * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-lg shadow-lg"
                  >
                    Choose This Cake
                  </motion.button>
                </div>

                {/* Highlight Best Value */}
                {i === 0 && (
                  <motion.div
                    initial={{ rotate: -45, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg"
                  >
                    BEST VALUE
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {selectedCakes.length === 0 && (
        <div className="text-center text-gray-500 mt-8">Select cakes to compare</div>
      )}
    </div>
  );
};
