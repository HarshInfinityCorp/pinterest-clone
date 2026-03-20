'use client'

import { useEffect, useState, useCallback } from 'react'
import { PinCard } from './PinCard'
import { pins as allPins, Pin } from '@/lib/data/pins'

interface PinGridProps {
  pins?: Pin[]
}

export function PinGrid({ pins = allPins }: PinGridProps) {
  const [visiblePins, setVisiblePins] = useState<Pin[]>(pins.slice(0, 25))
  const [loading, setLoading] = useState(false)

  const loadMorePins = useCallback(() => {
    if (loading || visiblePins.length >= pins.length) return
    
    setLoading(true)
    
    setTimeout(() => {
      const nextBatch = pins.slice(visiblePins.length, visiblePins.length + 25)
      setVisiblePins(prev => [...prev, ...nextBatch])
      setLoading(false)
    }, 800)
  }, [loading, visiblePins.length, pins])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 800) {
        loadMorePins()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMorePins])

  return (
    <div className="w-full max-w-[1800px] mx-auto">
      <div className="masonry-grid">
        {visiblePins.map((pin) => (
          <PinCard key={pin.id} pin={pin} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#E60023] rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
