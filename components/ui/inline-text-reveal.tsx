"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const InlineTextReveal = ({
  beforeText,
  revealText,
  afterText = "",
  className,
}: {
  beforeText: string;
  revealText: string;
  afterText?: string;
  className?: string;
}) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.getBoundingClientRect();
    }
  }, []);

  return (
    <h1 className={cn("relative", className)}>
      {beforeText}{" "}
      <span
        ref={textRef}
        className="relative inline-block"
        style={{ display: "inline-block" }}
      >
        {/* Revealed text with gradient - automatic animation */}
        <motion.span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            whiteSpace: "nowrap",
          }}
          animate={{
            clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 100% 0 0)"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent font-display font-bold"
        >
          {revealText}
        </motion.span>

        {/* Animated divider line */}
        <motion.span
          animate={{
            left: ["0%", "100%", "0%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            height: "120%",
            width: "3px",
            background: "linear-gradient(to bottom, transparent, #fbbf24, transparent)",
            zIndex: 50,
            pointerEvents: "none",
          }}
        />

        {/* Default text */}
        <span className="relative">{revealText}</span>
      </span>
      {afterText && ` ${afterText}`}
    </h1>
  );
};
