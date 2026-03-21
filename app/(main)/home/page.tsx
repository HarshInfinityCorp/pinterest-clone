import { redirect } from 'next/navigation'

<<<<<<< HEAD
export default function Home() {
  redirect('/')
=======
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
>>>>>>> dd5bbd3eca874db92ad0a096a09c58395f462e2d
}
