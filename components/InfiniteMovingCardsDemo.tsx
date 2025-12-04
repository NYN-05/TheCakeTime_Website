"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="rounded-2xl flex flex-col antialiased items-center justify-center relative overflow-hidden py-12">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Best cakes in town! The chocolate truffle was absolutely divine. Fresh ingredients and beautiful presentation.",
    name: "Priya Sharma",
    title: "Verified Customer",
  },
  {
    quote:
      "Amazing custom cake for my daughter's birthday. Everyone loved it! The attention to detail was incredible.",
    name: "Rahul Verma",
    title: "Verified Customer",
  },
  {
    quote: "Fresh ingredients and beautiful presentation. Highly recommend! Will definitely order again.",
    name: "Anita Desai",
    title: "Verified Customer",
  },
  {
    quote:
      "Ordered for our anniversary and it exceeded all expectations. The taste was phenomenal and delivery was right on time!",
    name: "Vikram Singh",
    title: "Verified Customer",
  },
  {
    quote:
      "The pastries are to die for! I've been a regular customer for months now. Quality never disappoints.",
    name: "Meera Kapoor",
    title: "Verified Customer",
  },
  {
    quote:
      "Best red velvet cake I've ever had! The cream cheese frosting is perfect. Thank you TheCakeTime!",
    name: "Arjun Malhotra",
    title: "Verified Customer",
  },
];
