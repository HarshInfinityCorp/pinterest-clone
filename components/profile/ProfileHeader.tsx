'use client'

import { Share2, SlidersHorizontal } from 'lucide-react'

export function ProfileHeader() {
  return (
    <div className="py-8 flex flex-col items-center">
      {/* Avatar - Pinterest uses 120px */}
      <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-pinterest-lightGray mb-4">
        <img
          src="https://i.pravatar.cc/300?u=profile"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Username */}
      <h1 className="text-4xl font-bold text-pinterest-black mb-1">John Doe</h1>
      <p className="text-sm text-pinterest-darkGray mb-4">@johndoe</p>

      {/* Stats */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="font-semibold text-pinterest-black">2.5k</span>
        <span className="text-pinterest-darkGray">followers ·</span>
        <span className="font-semibold text-pinterest-black">856</span>
        <span className="text-pinterest-darkGray">following</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="px-4 py-2.5 bg-pinterest-lightGray hover:bg-pinterest-hoverGray rounded-full font-semibold text-sm text-pinterest-black transition-colors">
          Share
        </button>
        
        <button className="px-4 py-2.5 bg-pinterest-lightGray hover:bg-pinterest-hoverGray rounded-full font-semibold text-sm text-pinterest-black transition-colors">
          Edit profile
        </button>

        <button className="w-10 h-10 flex items-center justify-center bg-pinterest-lightGray hover:bg-pinterest-hoverGray rounded-full transition-colors">
          <SlidersHorizontal size={18} className="text-pinterest-black" />
        </button>
      </div>
    </div>
  )
}
