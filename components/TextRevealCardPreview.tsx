"use client";
import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./ui/text-reveal-card";

export function TextRevealCardPreview() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-pink-900 via-purple-900 to-orange-900 h-[40rem] rounded-2xl w-full">
      <TextRevealCard
        text="Sweet Moments"
        revealText="Baked with Love ❤️"
        className="bg-gradient-to-br from-pink-800/50 to-purple-800/50 backdrop-blur-sm"
      >
        <TextRevealCardTitle className="text-white text-2xl font-display">
          Discover the Magic of TheCakeTime
        </TextRevealCardTitle>
        <TextRevealCardDescription className="text-pink-200">
          Hover over the text to reveal our secret ingredient.
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  );
}
