'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { MoreHorizontal, Upload, Link2 } from 'lucide-react'

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
    <Link 
      href={`/pin/${pin.id}`}
      className="masonry-item relative group cursor-zoom-in block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image/Video Container - Pinterest uses 16px border-radius */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-pinterest-lightGray"
      >
        <img
          src={pin.image}
          alt={pin.title}
          className={`w-full h-auto block transition-opacity duration-200 ${
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

        {/* Hover Overlay - Pinterest uses dark overlay on hover */}
        <div 
          className={`absolute inset-0 bg-black/30 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Save Button - Pinterest Red, top-right */}
          <button 
            className="absolute top-3 right-3 bg-pinterest-red hover:bg-pinterest-darkRed text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Save
          </button>

          {/* Bottom Actions */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button 
              className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <Upload size={16} className="text-pinterest-black" strokeWidth={2} />
            </button>
            
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowMenu(!showMenu)
                }}
                className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
              >
                <MoreHorizontal size={16} className="text-pinterest-black" strokeWidth={2} />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 bottom-full mb-2 bg-white rounded-2xl shadow-2xl py-2 min-w-[200px] z-20 border border-gray-100"
                >
                  <button 
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3 text-pinterest-black"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Link2 size={16} />
                    Copy link
                  </button>
                  <button 
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-pinterest-black"
                    onClick={(e) => e.preventDefault()}
                  >
                    Hide Pin
                  </button>
                  <button 
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-pinterest-black"
                    onClick={(e) => e.preventDefault()}
                  >
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
        <p className="text-sm font-semibold text-pinterest-black truncate leading-tight">{pin.title}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <div className="w-5 h-5 rounded-full bg-pinterest-lightGray overflow-hidden flex-shrink-0">
            <img 
              src={pin.author.avatar} 
              alt={pin.author.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <span className="text-xs text-pinterest-darkGray truncate">{pin.author.name}</span>
        </div>
      </div>
    </Link>
  )
}
