"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Flavor Wheel Selector
export const FlavorWheelSelector = ({
  flavors,
  onSelect,
}: {
  flavors: { name: string; color: string; icon: string }[];
  onSelect: (flavor: string) => void;
}) => {
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const segmentAngle = 360 / flavors.length;

  const handleSelect = (index: number) => {
    const targetRotation = -(index * segmentAngle);
    setRotation(targetRotation);
    setSelectedIndex(index);
    onSelect(flavors[index].name);
  };

  return (
    <div className="relative w-80 h-80 mx-auto">
      <motion.div
        className="w-full h-full rounded-full relative"
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {flavors.map((flavor, index) => {
          const angle = (index * segmentAngle * Math.PI) / 180;
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.button
              key={index}
              onClick={() => handleSelect(index)}
              className="absolute w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                backgroundColor: flavor.color,
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {flavor.icon}
            </motion.button>
          );
        })}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-xl">
            {flavors[selectedIndex].icon}
          </div>
        </div>
      </motion.div>
      <div className="text-center mt-4">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          {flavors[selectedIndex].name}
        </h3>
      </div>
    </div>
  );
};

// Voice Search Component
export const VoiceSearch = ({ onResult }: { onResult: (text: string) => void }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice search not supported in this browser");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      onResult(text);
    };

    recognition.start();
  };

  return (
    <div className="flex items-center gap-3">
      <motion.button
        onClick={startListening}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
          isListening
            ? "bg-gradient-to-r from-pink-500 to-purple-500"
            : "bg-white border-2 border-pink-300"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl">{isListening ? "🎤" : "🔍"}</span>
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-pink-400"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )}
      </motion.button>
      {transcript && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-gray-700 font-medium"
        >
          "{transcript}"
        </motion.div>
      )}
    </div>
  );
};

// Live Cake Decorator
export const LiveCakeDecorator = () => {
  const [toppings, setToppings] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const [totalPrice, setTotalPrice] = useState(500);
  const canvasRef = useRef<HTMLDivElement>(null);

  const availableToppings = [
    { emoji: "🍓", name: "Strawberry", price: 50 },
    { emoji: "🍫", name: "Chocolate", price: 40 },
    { emoji: "🌸", name: "Flower", price: 30 },
    { emoji: "⭐", name: "Star", price: 20 },
    { emoji: "🎀", name: "Ribbon", price: 35 },
  ];

  const handleDrop = (e: React.DragEvent, topping: any) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setToppings([...toppings, { id: Date.now(), x, y, emoji: topping.emoji }]);
    setTotalPrice(totalPrice + topping.price);
  };

  const removeToping = (id: number, price: number) => {
    setToppings(toppings.filter((t) => t.id !== id));
    setTotalPrice(totalPrice - price);
  };

  return (
    <div className="flex gap-6 flex-wrap">
      <div className="flex-1 min-w-[300px]">
        <div
          ref={canvasRef}
          onDrop={(e) => {
            const topping = availableToppings[parseInt(e.dataTransfer.getData("toppingIndex"))];
            handleDrop(e, topping);
          }}
          onDragOver={(e) => e.preventDefault()}
          className="relative w-full h-96 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full border-8 border-white shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center text-6xl">🎂</div>
          <AnimatePresence>
            {toppings.map((topping) => (
              <motion.div
                key={topping.id}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="absolute text-4xl cursor-pointer"
                style={{ left: topping.x - 20, top: topping.y - 20 }}
                whileHover={{ scale: 1.3 }}
                onClick={() => removeToping(topping.id, 30)}
              >
                {topping.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-4 text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            ₹{totalPrice}
          </div>
        </div>
      </div>
      <div className="w-full md:w-48">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Drag Toppings</h3>
        <div className="space-y-3">
          {availableToppings.map((topping, index) => (
            <motion.div
              key={index}
              draggable
              onDragStart={(e: any) => {
                e.dataTransfer.setData("toppingIndex", index.toString());
              }}
              className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md cursor-move hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-3xl">{topping.emoji}</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{topping.name}</div>
                <div className="text-sm text-pink-600">₹{topping.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Gesture Controls Hook
export const useGestureControls = (ref: React.RefObject<HTMLElement>) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const handleTouchEnd = (e: TouchEvent) => {
      setTouchEnd({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
    };

    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [ref]);

  const swipeDirection = () => {
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 50 ? "right" : deltaX < -50 ? "left" : null;
    } else {
      return deltaY > 50 ? "down" : deltaY < -50 ? "up" : null;
    }
  };

  return { swipeDirection };
};
