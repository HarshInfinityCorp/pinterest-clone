'use client'

import { useState, useMemo } from 'react'
import { PinGrid } from '@/components/pins/PinGrid'
import { pins } from '@/lib/data/pins'

const categories = [
  'All',
  'Home',
  'Fashion',
  'Food',
  'Travel',
  'Art',
  'DIY',
  'Quotes',
  'Photography',
  'Design',
  'Nature',
  'Wedding',
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPins = useMemo(() => {
    if (activeCategory === 'All') return pins
    // For now, since lib/data/pins doesn't have categories, 
    // we'll just mock the filtering by slicing or keep it as is.
    // In a real app, pins would have a category field.
    return pins
  }, [activeCategory])

  return (
    <div className="py-4">
      {/* Category Pills */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md mb-6 py-2 -mx-4 px-4 overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex gap-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-pinterest-black text-white'
                  : 'bg-transparent text-pinterest-black hover:bg-pinterest-hoverGray'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <PinGrid pins={filteredPins} />
    </div>
  )
}
