"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, createContext, useContext } from "react";

// Theme Context
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "pink",
  setTheme: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("pink");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, toggleDarkMode }}>
      <div className={isDarkMode ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
};

// Dynamic Theme Generator
export const DynamicThemeGenerator = ({
  cakes,
}: {
  cakes: { name: string; color: string; emoji: string }[];
}) => {
  const { setTheme } = useTheme();
  const [selectedCake, setSelectedCake] = useState(cakes[0]);

  const handleSelectCake = (cake: typeof cakes[0]) => {
    setSelectedCake(cake);
    setTheme(cake.color);

    // Apply theme to root
    document.documentElement.style.setProperty("--theme-primary", cake.color);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        Choose Your Favorite Cake
      </h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {cakes.map((cake, i) => (
          <motion.button
            key={i}
            onClick={() => handleSelectCake(cake)}
            className={`p-6 rounded-xl border-4 transition-all ${
              selectedCake.name === cake.name ? "border-pink-500 shadow-lg" : "border-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: `${cake.color}20` }}
          >
            <div className="text-5xl mb-2">{cake.emoji}</div>
            <div className="font-semibold text-gray-800">{cake.name}</div>
          </motion.button>
        ))}
      </div>
      <div className="text-center">
        <div className="text-lg text-gray-600 mb-2">Your personalized theme:</div>
        <div
          className="inline-block px-8 py-4 rounded-full text-white font-bold text-xl shadow-lg"
          style={{ backgroundColor: selectedCake.color }}
        >
          {selectedCake.name} Theme
        </div>
      </div>
    </div>
  );
};

// Seasonal Mode Auto-Switch
export const SeasonalTheme = () => {
  const [season, setSeason] = useState<"default" | "halloween" | "christmas" | "diwali">("default");

  useEffect(() => {
    const month = new Date().getMonth();
    const day = new Date().getDate();

    // October - Halloween
    if (month === 9) {
      setSeason("halloween");
    }
    // December - Christmas
    else if (month === 11) {
      setSeason("christmas");
    }
    // November (approximate Diwali)
    else if (month === 10) {
      setSeason("diwali");
    } else {
      setSeason("default");
    }
  }, []);

  const themes = {
    default: {
      bg: "from-pink-50 via-purple-50 to-pink-100",
      accent: "from-pink-600 to-purple-600",
      emoji: "🎂",
    },
    halloween: {
      bg: "from-orange-50 via-purple-900 to-black",
      accent: "from-orange-600 to-purple-900",
      emoji: "🎃",
    },
    christmas: {
      bg: "from-red-50 via-green-50 to-white",
      accent: "from-red-600 to-green-600",
      emoji: "🎄",
    },
    diwali: {
      bg: "from-yellow-50 via-orange-50 to-red-50",
      accent: "from-yellow-600 to-orange-600",
      emoji: "🪔",
    },
  };

  const currentTheme = themes[season];

  return (
    <motion.div
      key={season}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed top-4 right-4 p-4 rounded-2xl shadow-xl bg-gradient-to-r ${currentTheme.bg} z-50`}
    >
      <div className="flex items-center gap-3">
        <div className="text-4xl">{currentTheme.emoji}</div>
        <div>
          <div className={`font-bold text-lg bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
            {season.charAt(0).toUpperCase() + season.slice(1)} Theme
          </div>
          <div className="text-sm text-gray-600">Auto-activated!</div>
        </div>
      </div>
    </motion.div>
  );
};

// Reading Mode
export const ReadingMode = () => {
  const [isReadingMode, setIsReadingMode] = useState(false);

  useEffect(() => {
    if (isReadingMode) {
      document.body.classList.add("reading-mode");
    } else {
      document.body.classList.remove("reading-mode");
    }
  }, [isReadingMode]);

  return (
    <motion.button
      onClick={() => setIsReadingMode(!isReadingMode)}
      className={`fixed left-4 bottom-24 p-4 rounded-full shadow-lg z-50 ${
        isReadingMode ? "bg-amber-100 text-amber-800" : "bg-white text-gray-800"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Toggle Reading Mode"
    >
      <span className="text-2xl">📖</span>
    </motion.button>
  );
};

// Accessibility Toolbar
export const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState("normal");
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    document.body.classList.toggle("high-contrast", contrast === "high");
    document.body.classList.toggle("dyslexia-font", dyslexiaFont);
  }, [fontSize, contrast, dyslexiaFont]);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-24 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Accessibility Tools"
      >
        <span className="text-2xl">♿</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed right-4 bottom-44 bg-white rounded-2xl shadow-2xl p-6 z-50 w-80"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Accessibility</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Font Size: {fontSize}%
                </label>
                <input
                  type="range"
                  min="80"
                  max="150"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contrast</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setContrast("normal")}
                    className={`flex-1 py-2 rounded-lg ${
                      contrast === "normal" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setContrast("high")}
                    className={`flex-1 py-2 rounded-lg ${
                      contrast === "high" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    High
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={dyslexiaFont}
                    onChange={(e) => setDyslexiaFont(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-semibold text-gray-700">Dyslexia-Friendly Font</span>
                </label>
              </div>

              <button
                onClick={() => {
                  setFontSize(100);
                  setContrast("normal");
                  setDyslexiaFont(false);
                }}
                className="w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Reset All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
