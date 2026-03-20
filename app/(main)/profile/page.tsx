import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileTabs } from '@/components/profile/ProfileTabs'
import { PinGrid } from '@/components/pins/PinGrid'
import { pins } from '@/lib/data/pins'

export default function ProfilePage() {
  return (
    <div className="max-w-[1200px] mx-auto pb-8">
      <ProfileHeader />
      <ProfileTabs />
      <PinGrid pins={pins.slice(0, 12)} />
    </div>
  )
}
