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

  const loadMorePins = useCallback(() => {
    if (loading || visiblePins.length >= pins.length) return
    
    setLoading(true)
    
    setTimeout(() => {
      const nextBatch = pins.slice(visiblePins.length, visiblePins.length + 20)
      setVisiblePins(prev => [...prev, ...nextBatch])
      setLoading(false)
    }, 500)
  }, [loading, visiblePins.length, pins])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
        loadMorePins()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMorePins])

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
