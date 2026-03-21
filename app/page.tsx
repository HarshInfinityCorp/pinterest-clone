'use client'

import { useAuth } from '@/lib/auth/AuthContext'
import { LandingPage } from '@/components/landing/LandingPage'
import { Navbar } from '@/components/navbar/Navbar'
import { PinGrid } from '@/components/pins/PinGrid'
import { pins } from '@/lib/data/pins'
import { useState, useMemo } from 'react'

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

function LoggedInHome() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPins = useMemo(() => {
    if (activeCategory === 'All') return pins
    return pins
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-[80px]">
        {/* Category Pills */}
        <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-md py-2 px-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max max-w-[1800px] mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'bg-transparent text-black hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-4">
          <PinGrid pins={filteredPins} />
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <LandingPage />
  }

  return <LoggedInHome />
}
