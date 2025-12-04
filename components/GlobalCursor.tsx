"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const GlobalCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor pointer */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="1"
          viewBox="0 0 16 16"
          className="h-6 w-6 -translate-x-[2px] -translate-y-[2px] -rotate-[70deg] transform stroke-pink-500 text-pink-500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
        </svg>
      </motion.div>

      {/* Cursor follower circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-pink-400/50 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </>
  );
};
