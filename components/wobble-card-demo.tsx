"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import Image from "next/image";

export default function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-gradient-to-br from-pink-600 to-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Premium Cakes Made Fresh Daily
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            With over 10,000+ satisfied customers, TheCakeTime is the most trusted bakery for custom cakes and celebrations.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
          width={500}
          height={500}
          alt="Premium chocolate cake"
          className="absolute -right-4 lg:-right-[40%] filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gradient-to-br from-purple-600 to-pink-600">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Same-Day Delivery Available
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Order before 2 PM and get your cake delivered fresh the same day. Available in select areas.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-gradient-to-br from-orange-600 to-pink-700 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Custom Cakes for Every Special Occasion
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            From birthdays to weddings, our expert bakers craft personalized cakes that make your celebration unforgettable.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80"
          width={500}
          height={500}
          alt="Custom celebration cake"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
