'use client'

import { useState, useRef } from 'react'
import { MoreHorizontal, Upload, Link2, EyeOff, Heart, Minus, Download, Ban, ChevronDown } from 'lucide-react'

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
  const [isSaved, setIsSaved] = useState(false)
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

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(true)
  }

  const handleUnsave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(false)
  }

  return (
    <div 
      className="masonry-item relative group cursor-zoom-in"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image/Video Container - Pinterest uses 16px border-radius */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-[#e9e9e9]"
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

        {/* Hover Overlay */}
        <div 
          className={`absolute inset-0 transition-opacity duration-200 ${
            isHovered || showMenu ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Subtle gradient so white buttons are visible */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Top Actions Area */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
             {isSaved ? (
                <>
                  <div className="flex items-center gap-2 pointer-events-auto w-full justify-between">
                     <button className="flex items-center px-4 py-3 rounded-xl font-bold text-[15px] text-white transition-opacity bg-transparent ring-2 ring-[#0060df] hover:bg-white/10 ml-1">
                        Saved to Profile
                     </button>
                     <button
                        onClick={handleUnsave}
                        className="bg-[#222] hover:bg-[#111] text-white font-bold px-5 py-3.5 rounded-full text-[15px] transition-colors"
                     >
                        Saved
                     </button>
                  </div>
                </>
             ) : (
                <>
                  <div className="pointer-events-auto">
                     <button className="flex items-center justify-center font-bold px-4 py-3 text-white transition-colors bg-transparent border-none opacity-0">
                        Profile <ChevronDown size={18} className="ml-1"/>
                     </button>
                  </div>
                  <div className="pointer-events-auto">
                     <button 
                        onClick={handleSave}
                        className="bg-[#e60023] hover:bg-[#ad081b] text-white font-bold px-5 py-3.5 rounded-full text-[15px] transition-colors"
                     >
                        Save
                     </button>
                  </div>
                </>
             )}
          </div>

          {/* Bottom Actions */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 pointer-events-auto">
            <button className="w-8 h-8 bg-white/90 hover:bg-white border-transparent rounded-full flex items-center justify-center transition-colors shadow-sm">
              <Upload size={18} className="text-black shrink-0" strokeWidth={2.5} />
            </button>
            
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowMenu(!showMenu)
                }}
                className={`w-8 h-8 bg-white/90 hover:bg-white border-transparent rounded-full flex items-center justify-center transition-colors shadow-sm ${showMenu ? 'bg-white' : ''}`}
              >
                <MoreHorizontal size={18} className="text-black shrink-0" strokeWidth={2.5} />
              </button>

              {/* Dropdown Context Menu precisely modeled after screenshot */}
              {showMenu && (
                <div className="absolute right-0 bottom-full mb-3 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.2)] py-4 min-w-[280px] w-[320px] max-w-[340px] z-50 border border-gray-100 flex flex-col pointer-events-auto cursor-default">
                  
                  <div className="px-5 mb-3">
                     <p className="text-[15px] leading-tight text-[#111]">
                        This Pin was inspired by your recent activity. We believe it may have been modified with AI.
                     </p>
                  </div>
                  
                  <button className="w-full px-5 py-3 text-left text-[16px] font-bold hover:bg-gray-100 flex items-center gap-4 text-[#111] transition-colors">
                    <EyeOff size={22} className="shrink-0" strokeWidth={2} />
                    See less like this
                  </button>
                  <button className="w-full px-5 py-3 text-left text-[16px] font-bold hover:bg-gray-100 flex items-center gap-4 text-[#111] transition-colors">
                    <Heart size={22} className="shrink-0" strokeWidth={2} />
                    See more like this
                  </button>
                  <button className="w-full px-5 py-3 text-left text-[16px] font-bold hover:bg-gray-100 flex items-center gap-4 text-[#111] transition-colors">
                    <Minus size={22} className="shrink-0" strokeWidth={2} />
                    See fewer AI art Pins
                  </button>
                  <button className="w-full px-5 py-3 text-left text-[16px] font-bold hover:bg-gray-100 flex items-center gap-4 text-[#111] transition-colors">
                    <Download size={22} className="shrink-0" strokeWidth={2} />
                    Download image
                  </button>
                  <button className="w-full px-5 py-3 text-left text-[16px] font-bold hover:bg-gray-100 flex items-center gap-4 text-[#111] transition-colors">
                    <Ban size={22} className="shrink-0" strokeWidth={2} />
                    Report Pin
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
