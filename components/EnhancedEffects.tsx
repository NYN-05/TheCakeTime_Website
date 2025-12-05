"use client";
import { useEffect, useRef, useState } from "react";

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
      <span
        className={`inline-block w-1 h-[1em] bg-current ml-1 animate-pulse ${cursorClassName}`}
      />
    </span>
  );
};

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
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl select-none cursor-ew-resize"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image */}
      <img src={afterImage} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" />

      {/* Before Image Overlay */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-1 h-4 bg-gray-400 rounded" />
            <div className="w-1 h-4 bg-gray-400 rounded" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
        {afterLabel}
      </div>
    </div>
  );
};
