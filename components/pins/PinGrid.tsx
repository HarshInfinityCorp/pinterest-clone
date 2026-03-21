'use client'

import { useEffect, useState, useCallback } from 'react'
import { PinCard } from './PinCard'
import { pins as allPins, Pin } from '@/lib/data/pins'

interface PinGridProps {
  pins?: Pin[]
}

export function PinGrid({ pins = allPins }: PinGridProps) {
  const [visiblePins, setVisiblePins] = useState<Pin[]>(pins.slice(0, 20))
  const [loading, setLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1200) // 1.2s for a nice smooth transition
    return () => clearTimeout(timer)
  }, [])

  const loadMorePins = useCallback(() => {
    if (loading || visiblePins.length >= pins.length || isInitialLoading) return
    
    setLoading(true)
    
    setTimeout(() => {
      const nextBatch = pins.slice(visiblePins.length, visiblePins.length + 20)
      setVisiblePins(prev => [...prev, ...nextBatch])
      setLoading(false)
    }, 500)
  }, [loading, visiblePins.length, pins, isInitialLoading])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
        loadMorePins()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMorePins])

  if (isInitialLoading) {
    return (
      <div className="w-full">
        <div className="masonry-grid px-2">
          {[...Array(15)].map((_, i) => {
            const heights = [200, 320, 450, 240, 380, 500];
            const height = heights[i % heights.length];
            return (
              <div 
                key={i} 
                className="masonry-item mb-4 animate-pulse"
                style={{ height: `${height}px` }}
              >
                <div className="w-full h-full bg-gray-200 rounded-2xl"></div>
              </div>
            );
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="masonry-grid">
        {visiblePins.map((pin) => (
          <PinCard key={pin.id} pin={pin} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-pinterest-lightGray border-t-pinterest-red rounded-full animate-spin" />
        </div>
      )}

      {visiblePins.length >= pins.length && (
        <p className="text-center text-pinterest-darkGray py-8 text-sm">No more pins to load</p>
      )}
    </div>
  )
}
