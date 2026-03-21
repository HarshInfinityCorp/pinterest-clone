'use client'

import { useState, useRef, useEffect } from 'react'
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



  useEffect(() => {
    const savedPins = JSON.parse(localStorage.getItem('savedPins') || '[]')
    if (savedPins.some((p: Pin) => p.id === pin.id)) {
      setIsSaved(true)
    }
  }, [pin.id])

  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (!showToast) return
    const timer = setTimeout(() => setShowToast(false), 4000)
    return () => clearTimeout(timer)
  }, [showToast])

  useEffect(() => {
    if (!showMenu) return

    const handleClickOutside = () => {
      setShowMenu(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showMenu])

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current && pin.video) {
      videoRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current && pin.video) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(true)
    const savedPins = JSON.parse(localStorage.getItem('savedPins') || '[]')
    if (!savedPins.some((p: Pin) => p.id === pin.id)) {
      savedPins.push(pin)
      localStorage.setItem('savedPins', JSON.stringify(savedPins))
      window.dispatchEvent(new Event('savedPinsUpdated'))
    }
  }

  const handleUnsave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(false)
    let savedPins = JSON.parse(localStorage.getItem('savedPins') || '[]')
    savedPins = savedPins.filter((p: Pin) => p.id !== pin.id)
    localStorage.setItem('savedPins', JSON.stringify(savedPins))
    window.dispatchEvent(new Event('savedPinsUpdated'))
  }

  return (
    <div
      className="masonry-item relative group cursor-zoom-in"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Toast Notification Container */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-max max-w-[90vw] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#4a4a44] text-white px-5 py-3 rounded-[20px] shadow-2xl flex items-center justify-between gap-6 pointer-events-auto overflow-hidden">
            <span className="text-[17px] font-medium leading-[1.3] text-white">Got it! We'll show you more Pins like this.</span>
            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => setShowToast(false)}
                className="bg-white text-black font-bold h-10 px-6 rounded-full text-[15px] hover:bg-gray-100 transition-colors"
              >
                Undo
              </button>
              <button
                onClick={() => setShowToast(false)}
                className="text-white hover:text-white/80 p-1"
              >
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image/Video Container - Pinterest uses 16px border-radius */}
      <div
        className="relative rounded-2xl overflow-hidden bg-[#e9e9e9]"
        style={{ aspectRatio: `400 / ${pin.height}` }}
      >
        <img
          src={pin.image}
          alt={pin.title}
          className={`w-full h-full object-cover transition-opacity duration-200 ${pin.video && isHovered ? 'opacity-0' : 'opacity-100'
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
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          />
        )}

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-200 ${isHovered || showMenu ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Subtle gradient so white buttons are visible */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Top Actions Area */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {isSaved ? (
              <>
                <div className="pointer-events-auto">
                  <button className="flex items-center justify-center text-white px-4 h-10 transition-opacity bg-black/40 hover:bg-black/60 shadow-sm" style={{ borderRadius: '16px', border: '2px solid #3b82f6' }}>
                    <span className="text-[15px] font-bold leading-none underline underline-offset-2 decoration-1">Saved to Profile</span>
                  </button>
                </div>
                <div className="pointer-events-auto">
                  <button
                    onClick={handleUnsave}
                    className="bg-[#2a2a2a] hover:bg-[#111] text-white font-bold px-5 h-10 flex items-center transition-colors shadow-sm"
                    style={{ borderRadius: '20px' }}
                  >
                    Saved
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="pointer-events-auto">
                  <button className="flex items-center justify-center font-bold px-3.5 py-2.5 text-white bg-[#111]/70 hover:bg-[#111] transition-colors shadow-sm leading-none" style={{ borderRadius: '12px' }}>
                    Profile <ChevronDown size={18} className="ml-1" />
                  </button>
                </div>
                <div className="pointer-events-auto">
                  <button
                    onClick={handleSave}
                    className="bg-[#e60023] hover:bg-[#ad081b] text-white font-bold px-4 py-3 leading-none transition-colors shadow-sm"
                    style={{ borderRadius: '16px' }}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Bottom Actions inside hover overlay */}
          <div className="absolute bottom-3 right-3 flex items-center pointer-events-auto">
            <button className="w-[36px] h-[36px] bg-white/95 hover:bg-white border-transparent rounded-[12px] flex items-center justify-center transition-colors shadow-sm">
              <Upload size={20} className="text-black shrink-0" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Outside Actions (below image) */}
      <div className="mt-1.5 flex justify-end px-1 relative z-30">
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setShowMenu(!showMenu)
          }}
          className="w-7 h-7 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors -mr-1"
        >
          <MoreHorizontal size={20} className="text-[#111]" strokeWidth={2.5} />
        </button>

        {/* Dropdown Context Menu precisely modeled after screenshot */}
        {showMenu && (
          <div className="absolute right-0 top-full mt-2 bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] py-4 min-w-[280px] w-[320px] max-w-[340px] z-50 border border-gray-100 flex flex-col pointer-events-auto cursor-default">

            <div className="px-5 mb-3">
              <p className="text-[15px] leading-tight text-[#111]">
                This Pin was inspired by your recent activity
              </p>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowMenu(false);
                setShowToast(true);
              }}
              className="w-full px-5 py-3 text-left text-[16px] font-bold hover:bg-gray-100 flex items-center gap-4 text-[#111] transition-colors"
            >
              <Heart size={22} className="shrink-0" strokeWidth={2.5} />
              See more like this
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMenu(false); }}
              className="w-full px-5 py-3 text-left text-[16px] font-bold hover:bg-gray-100 flex items-center gap-4 text-[#111] transition-colors"
            >
              <EyeOff size={22} className="shrink-0" strokeWidth={2.5} />
              See less like this
            </button>
            <button
              onClick={async (e) => {
                e.preventDefault()
                e.stopPropagation()
                try {
                  const response = await fetch(pin.image)
                  const blob = await response.blob()
                  const url = window.URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.style.display = 'none'
                  a.href = url
                  a.download = `pinterest-image-${pin.id}.jpg`
                  document.body.appendChild(a)
                  a.click()
                  window.URL.revokeObjectURL(url)
                  document.body.removeChild(a)
                } catch (err) {
                  window.open(pin.image, '_blank')
                }
                setShowMenu(false)
              }}
              className="w-full px-5 py-3 text-left text-[16px] font-bold hover:bg-gray-100 flex items-center gap-4 text-[#111] transition-colors"
            >
              <Download size={22} className="shrink-0" strokeWidth={2.5} />
              Download image
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMenu(false); }}
              className="w-full px-5 py-3 text-left text-[16px] font-bold hover:bg-gray-100 flex items-center gap-4 text-[#111] transition-colors"
            >
              <Ban size={22} className="shrink-0" strokeWidth={2.5} />
              Report Pin
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
