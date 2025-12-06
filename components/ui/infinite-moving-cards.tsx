"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useMemo } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Duplicate items in React instead of DOM manipulation to avoid hydration mismatch
  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  const getSpeedDuration = () => {
    if (speed === "fast") return "20s";
    if (speed === "normal") return "40s";
    return "80s";
  };

  const animationDirection = direction === "left" ? "forwards" : "reverse";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      style={{
        ["--animation-direction" as string]: animationDirection,
        ["--animation-duration" as string]: getSpeedDuration(),
      }}
    >
      <ul
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          mounted && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {duplicatedItems.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-pink-200 flex-shrink-0 px-8 py-8 md:w-[450px] bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
            key={`${item.name}-${idx}`}
          >
            <blockquote>
              {/* Quote mark decoration */}
              <div className="absolute top-4 right-4 text-7xl text-pink-100 font-serif leading-none opacity-50">
                &quot;
              </div>
              
              {/* Gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/10 group-hover:to-purple-500/10 transition-all duration-300 rounded-2xl"></div>
              
              <p className="relative z-20 text-gray-700 italic text-base leading-relaxed mb-6">
                &quot;{item.quote}&quot;
              </p>
              <div className="relative z-20 flex flex-row items-center">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3 shadow-lg">
                  {item.name.charAt(0)}
                </div>
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-gray-900 font-bold">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-gray-500 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
