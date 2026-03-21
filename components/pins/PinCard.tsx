'use client'

import { useState, useRef, useEffect } from 'react'
import { MoreHorizontal, Upload, Link2, EyeOff, Heart, Minus, Download, Ban, ChevronDown, Search } from 'lucide-react'

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
  const [showSaveMenu, setShowSaveMenu] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const saveMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showSaveMenu) return
    const handleClickOutside = (e: MouseEvent) => {
      if (saveMenuRef.current && !saveMenuRef.current.contains(e.target as Node)) {
        setShowSaveMenu(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showSaveMenu])

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
                <div className="pointer-events-auto relative">
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowSaveMenu(!showSaveMenu); }}
                    className="flex items-center justify-center font-bold px-3.5 py-2.5 text-white bg-[#111]/70 hover:bg-[#111] transition-colors shadow-sm leading-none"
                    style={{ borderRadius: '12px' }}
                  >
                    Profile <ChevronDown size={18} className="ml-1" />
                  </button>

                  {/* Save Dropdown (Positioned Under Button) */}
                  {showSaveMenu && (
                    <div ref={saveMenuRef} className="absolute top-full left-0 mt-2 z-[100] animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                      <div
                        className="bg-white rounded-[32px] shadow-[0_4px_40px_rgba(0,0,0,0.15)] flex flex-col py-4 w-[380px] h-[520px] overflow-hidden cursor-default transition-all border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Header */}
                        <div className="px-5 pb-4 shrink-0">
                          <h2 className="text-[17px] font-bold text-black text-center">Save</h2>
                        </div>

                        {/* Search Bar */}
                        <div className="px-5 pb-4 shrink-0">
                          <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                              <Search size={18} />
                            </div>
                            <input
                              type="text"
                              placeholder="Search"
                              className="w-full h-12 bg-white border-2 border-[#CDCDCD] focus:border-blue-500 rounded-[20px] pl-12 pr-4 outline-none font-medium transition-colors text-[16px]"
                            />
                          </div>
                        </div>

                        {/* Scrollable List */}
                        <div className="flex-1 overflow-y-auto px-2">
                          <div className="px-6 py-2">
                            <span className="text-[14px] font-medium text-black">Save to board</span>
                          </div>

                          {[
                            { name: "Interior design", lock: true, img: '1556912172-45b7abe8b7e1' },
                            { name: "Modern Architecture", lock: false, img: '1506744038136-46273834b3fb' },
                            { name: "My Travel Goals", lock: false, img: '1533473359331-0135ef1b58bf' },
                            { name: "Tech Vibes", lock: true, img: '1519389950473-47ba0277781c' },
                            { name: "Profile", history: true, img: '1535713875002-d1d0cf377fde' },
                          ].map((board, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between mx-1.5 p-3 rounded-2xl hover:bg-[#E9E9E9] transition-colors group/item cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSave(e);
                                setShowSaveMenu(false);
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-14 h-14 bg-gray-100 rounded-[8px] overflow-hidden shrink-0">
                                  {board.history ? (
                                    <div className="w-full h-full flex items-center justify-center bg-[#E9E9E9]">
                                      <svg height="24" width="24" viewBox="0 0 24 24"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-22c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm1 5h-2v7h6v-2h-4V7z" fill="currentColor" /></svg>
                                    </div>
                                  ) : (
                                    <img src={`https://images.unsplash.com/photo-${board.img}?w=150&h=150&fit=crop`} alt="" className="w-full h-full object-cover" />
                                  )}
                                </div>
                                <span className="text-[17px] font-bold text-black">{board.name}</span>
                              </div>
                              <div className="flex items-center">
                                {board.lock && (
                                  <svg height="18" width="18" viewBox="0 0 24 24" className="text-black mr-4"><path d="M12 2C9.24 2 7 4.24 7 7v4H5v11h14V11h-2V7c0-2.76-2.24-5.5.5-5.5zM9 7c0-1.66 1.34-3 3-3s3 1.34 3 3v4H9V7zm8 13H7v-7h10v7z" fill="currentColor" /></svg>
                                )}
                                <button className="hidden group-hover/item:block bg-[#e60023] hover:bg-[#ad081b] text-white font-bold h-10 px-5 rounded-full text-[15px] transition-colors leading-none">
                                  Save
                                </button>
                              </div>
                            </div>
                          ))}

                          <div className="px-6 py-2 mt-4 border-t border-gray-50 pt-6">
                            <span className="text-[14px] font-medium text-black">Suggestions</span>
                          </div>
                          {["Healthcare", "Design Inspiration", "Art & Fashion"].map((name, i) => (
                            <div key={i} className="flex items-center mx-1.5 p-3 rounded-2xl hover:bg-[#E9E9E9] transition-colors group/item cursor-pointer">
                              <div className="w-14 h-14 bg-[#E9E9E9] rounded-[8px] flex items-center justify-center shrink-0" />
                              <span className="text-[17px] font-bold text-black ml-3">{name}</span>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Fixed Action */}
                        <div className="px-2 py-2 mt-2 border-t border-gray-100 shrink-0">
                          <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#E9E9E9] transition-colors cursor-pointer group/add mx-1">
                            <div className="w-14 h-14 bg-[#E9E9E9] rounded-[8px] flex items-center justify-center shrink-0">
                              <span className="text-3xl font-light">+</span>
                            </div>
                            <span className="text-[17px] font-bold text-black">Create board</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
