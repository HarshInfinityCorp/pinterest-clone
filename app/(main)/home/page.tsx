'use client'

import { useMemo } from 'react'
import { PinGrid } from '@/components/pins/PinGrid'
import { pins } from '@/lib/data/pins'

export default function HomePage() {

  const filteredPins = useMemo(() => {
    return pins
  }, [])

  return (
    <div className="py-4">
      <PinGrid pins={filteredPins} />
    </div>
  )
}
