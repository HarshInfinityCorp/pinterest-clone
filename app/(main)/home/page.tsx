'use client'

import { PinGrid } from '@/components/pins/PinGrid'
import { pins } from '@/lib/data/pins'

export default function HomePage() {
  return (
    <div className="py-2">
      <PinGrid pins={pins} />
    </div>
  )
}
