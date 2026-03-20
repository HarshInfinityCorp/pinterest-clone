"use client";

import { useState } from "react";
import Header from "@/components/Header";
import MasonryGrid from "@/components/MasonryGrid";
import { mockPins, categories } from "@/lib/data";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPins =
    activeCategory === "All"
      ? mockPins
      : mockPins.filter((pin) => pin.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={true} />

      {/* Category Pills */}
      <div className="sticky top-[72px] z-40 bg-white border-b">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Feed */}
      <main className="py-6">
        <MasonryGrid pins={filteredPins} />
      </main>
    </div>
  );
}
