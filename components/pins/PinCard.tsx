'use client'

import { useState, useRef } from 'react'

interface Pin {
  id: string
  image: string
  video?: string
  title: string
  author: {
    name: string
    avatar: string
  }
  height: number
}

interface PinCardProps {
  pin: Pin
}

export function PinCard({ pin }: PinCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current && pin.video) {
      videoRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setShowMenu(false)
    if (videoRef.current && pin.video) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div 
      className="masonry-item relative group cursor-zoom-in"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image/Video Container - Pinterest uses 16px border-radius */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        style={{ aspectRatio: `236 / ${pin.height}` }}
      >
        <img
          src={pin.image}
          alt={pin.title}
          className={`w-full h-full object-cover transition-opacity duration-200 ${
            pin.video && isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />
        
        {pin.video && (
          <video
            ref={videoRef}
            src={pin.video}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Hover Overlay - Pinterest style */}
        <div 
          className={`absolute inset-0 bg-black/30 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Save Button - Pinterest Red */}
          <button className="absolute top-3 right-3 bg-[#E60023] hover:bg-[#AD081B] text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-colors shadow-lg">
            Save
          </button>

          {/* Bottom Actions */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
            
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(!showMenu)
                }}
                className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="19" cy="12" r="1"/>
                  <circle cx="5" cy="12" r="1"/>
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 bottom-full mb-2 bg-white rounded-2xl shadow-2xl py-2 min-w-[200px] z-20 border border-gray-100">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3 text-black">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                    Copy link
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black">
                    Hide Pin
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black">
                    Report Pin
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pin Info - Pinterest Style */}
      <div className="mt-2 px-1">
        <p className="text-sm font-semibold text-black truncate leading-tight">{pin.title}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <img 
              src={pin.author.avatar} 
              alt={pin.author.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <span className="text-xs text-gray-600 truncate">{pin.author.name}</span>
        </div>
      </div>
    </div>
  )
}
