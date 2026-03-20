'use client'

import { useState, useRef, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { pins } from '@/lib/data/pins'
import { PinGrid } from '@/components/pins/PinGrid'

// Pinterest icons
const PinterestIcons = {
  Close: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  MoreHorizontal: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1"/>
      <circle cx="19" cy="12" r="1"/>
      <circle cx="5" cy="12" r="1"/>
    </svg>
  ),
  Upload: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  Link: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Hide: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ),
  Report: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),
  CopyLink: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  Fullscreen: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
    </svg>
  ),
  Emoji: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Heart: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
}

// Get related pins (different images from current pin)
function getRelatedPins(currentPinId: string, currentImage: string) {
  return pins
    .filter(p => p.id !== currentPinId && p.image !== currentImage)
    .slice(0, 20)
}

export default function PinDetailPage() {
  const params = useParams()
  const router = useRouter()
  const pinId = params.id as string
  
  const pin = pins.find(p => p.id === pinId) || pins[0]
  const [isSaved, setIsSaved] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [comment, setComment] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  
  // Get related pins (ensure no duplicate images)
  const relatedPins = getRelatedPins(pin.id, pin.image)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [router])

  return (
    <div className="min-h-screen bg-black/50 fixed inset-0 z-50 overflow-y-auto">
      {/* Close button */}
      <button
        onClick={() => router.back()}
        className="fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
      >
        <PinterestIcons.Close />
      </button>

      <div className="min-h-screen py-8 px-4 flex items-start justify-center">
        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden max-w-[1200px] w-full flex flex-col md:flex-row">
          {/* Left - Image Section */}
          <div className="flex-1 bg-[#EFEFEF] flex items-center justify-center p-4 min-h-[400px] md:min-h-[600px] relative">
            <img
              src={pin.image}
              alt={pin.title}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
            />
            
            {/* Fullscreen button */}
            <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-lg">
              <PinterestIcons.Fullscreen />
            </button>
          </div>

          {/* Right - Info Section */}
          <div className="w-full md:w-[450px] flex flex-col h-full max-h-[90vh] overflow-y-auto">
            {/* Top Actions */}
            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                    <PinterestIcons.MoreHorizontal />
                  </button>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <PinterestIcons.Upload />
                    </button>
                    
                    {showShareMenu && (
                      <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl py-2 min-w-[200px] z-20 border border-gray-100">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3">
                          <PinterestIcons.CopyLink />
                          Copy link
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3">
                          <PinterestIcons.Download />
                          Download image
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3">
                          <PinterestIcons.Hide />
                          Hide Pin
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3">
                          <PinterestIcons.Report />
                          Report Pin
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                    <PinterestIcons.Link />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsSaved(!isSaved)}
                    className={`px-6 py-3 rounded-full font-semibold text-sm transition-colors ${
                      isSaved
                        ? 'bg-black text-white'
                        : 'bg-[#E60023] hover:bg-[#AD081B] text-white'
                    }`}
                  >
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4">
              <!-- Title -->
              <h1 className="text-xl font-bold text-black mb-2">{pin.title}</h1>
              
              <!-- Description placeholder -->
              <p className="text-sm text-gray-600 mb-4">
                This is a beautiful pin with amazing content. Click Save to add it to your collection.
              </p>

              <!-- Author Section -->
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={pin.author.avatar}
                    alt={pin.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-black text-sm">{pin.author.name}</p>
                    <p className="text-xs text-gray-500">1.2k followers</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                    isFollowing
                      ? 'bg-gray-200 text-black'
                      : 'bg-gray-100 hover:bg-gray-200 text-black'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>

              <!-- Comments Section -->
              <div className="mt-4">
                <h3 className="font-semibold text-black mb-3">Comments</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold">JD</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">Jane Doe</p>
                      <p className="text-sm text-gray-600">Love this! So inspiring 🎉</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold">MS</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">Mike Smith</p>
                      <p className="text-sm text-gray-600">Saved to my collection!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment Input */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img 
                    src="https://i.pravatar.cc/150?u=me" 
                    alt="Me"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full h-10 pl-4 pr-20 bg-gray-100 rounded-full border-none outline-none text-sm"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
                      <PinterestIcons.Emoji />
                    </button>
                    
                    {comment && (
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E60023] text-white">
                        <PinterestIcons.Send />
                      </button>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                    isLiked ? 'text-[#E60023]' : 'hover:bg-gray-100'
                  }`}
                >
                  <PinterestIcons.Heart className={isLiked ? 'fill-[#E60023]' : ''} />
                </button>
              </div>            </div>
          </div>
        </div>

        {/* More like this */}
        {relatedPins.length > 0 && (
          <div className="max-w-[1800px] mx-auto mt-12 px-4">
            <h2 className="text-xl font-bold text-white mb-6">More to explore</h2>
            <div className="masonry-grid">
              {relatedPins.map((relatedPin) => (
                <Link
                  key={relatedPin.id}
                  href={`/pin/${relatedPin.id}`}
                  className="masonry-item relative group cursor-zoom-in"
                >
                  <div 
                    className="relative rounded-2xl overflow-hidden bg-gray-100"
                    style={{ aspectRatio: `236 / ${relatedPin.height}` }}
                  >
                    <img
                      src={relatedPin.image}
                      alt={relatedPin.title}
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="absolute top-3 right-3 bg-[#E60023] hover:bg-[#AD081B] text-white font-semibold px-4 py-2 rounded-full text-sm transition-colors">
                        Save
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-2 px-1">
                    <p className="text-sm font-semibold text-white truncate">{relatedPin.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
