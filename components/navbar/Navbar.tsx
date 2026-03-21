'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'

// Pinterest uses custom SVG icons - these are the exact ones
const PinterestIcons = {
  // Pinterest logo
  Logo: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#E60023">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  ),

  // Notification bell (outline style Pinterest uses)
  Notification: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),

  // Message bubble (outline style)
  Message: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),

  // Chevron down small
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),

  // Search icon
  Search: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),

  // Close X icon
  Close: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// Mock data for search dropdown
const recentSearches = [
  'radha krishna with radhe mantra wallpaper',
  'radha krishna with mantra wallpaper',
  'radha krishna with mantra dark background wallpaper',
]

const ideasForYou = [
  { name: 'Education', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop' },
  { name: 'Krishna', image: 'https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=100&h=100&fit=crop' },
  { name: 'Nature pictures', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop' },
  { name: 'Galaxy wallpaper', image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=100&h=100&fit=crop' },
  { name: 'Subjects', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=100&h=100&fit=crop' },
  { name: 'Landscape photography', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop' },
]

const popularOnPinterest = [
  { name: 'Night rain', image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=100&h=100&fit=crop' },
  { name: 'Laptop wallpaper', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop' },
  { name: 'Tattoo ideas', image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=100&h=100&fit=crop' },
  { name: 'Easy drawings', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100&h=100&fit=crop' },
  { name: 'My photo gallery', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=100&h=100&fit=crop' },
  { name: 'Pink background', image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=100&h=100&fit=crop' },
  { name: 'Mehendi designs for eid', image: 'https://images.unsplash.com/photo-1590235530620-9973a4519c90?w=100&h=100&fit=crop' },
  { name: 'Aesthetic pictures', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
]

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 lg:left-16 right-0 h-16 bg-white z-40 px-4 flex items-center gap-2">

      {/* Navigation Tabs - Exact Pinterest Style */}
      {/* <nav className="hidden md:flex items-center gap-0">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`px-4 py-3 rounded-full font-semibold text-sm transition-all duration-75 ${
                isActive 
                  ? 'bg-pinterest-black text-white' 
                  : 'text-pinterest-black hover:bg-pinterest-hoverGray'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav> */}

      {/* Search Bar with Dropdown */}
      <div className="flex-1 min-w-0 relative" ref={searchRef}>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-pinterest-mediumGray">
            <PinterestIcons.Search />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            className={`w-full h-12 pl-12 pr-12 rounded-xl border-none outline-none transition-all text-base font-semibold placeholder:text-pinterest-mediumGray ${isSearchOpen
              ? 'bg-white ring-4 ring-blue-100/50 shadow-lg'
              : 'bg-[#e5e5e0] focus:ring-4 focus:ring-blue-100/50'
              }`}
          />
          {/* Mic icon on right — hidden when there's typed text */}
          {!searchQuery ? (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pinterest-black hover:opacity-70 transition-opacity"
              aria-label="Search by voice"
            >
              <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
                <path d="M12 0a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V5a5 5 0 0 0-5-5m0 14a3 3 0 0 1-3-3V5a3 3 0 1 1 6 0v6a3 3 0 0 1-3 3M3 9v2a9 9 0 0 0 8 8.95V24h2v-4.05A9 9 0 0 0 21 11V9h-2v2a7 7 0 1 1-14 0V9z" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-pinterest-mediumGray hover:text-pinterest-black transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Search Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[80vh] overflow-y-auto">
            {/* Recent searches */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-pinterest-black mb-3">Recent searches</h3>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(search)
                      setIsSearchOpen(false)
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-pinterest-lightGray flex items-center justify-center flex-shrink-0">
                      <Search size={18} className="text-pinterest-mediumGray" />
                    </div>
                    <span className="text-sm text-pinterest-black line-clamp-2">{search}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ideas for you */}
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-pinterest-black mb-3">Ideas for you</h3>
              <div className="grid grid-cols-2 gap-2">
                {ideasForYou.map((idea, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(idea.name)
                      setIsSearchOpen(false)
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors text-left"
                  >
                    <img
                      src={idea.image}
                      alt={idea.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <span className="text-sm text-pinterest-black truncate">{idea.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular on Pinterest */}
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-pinterest-black mb-3">Popular on Pinterest</h3>
              <div className="grid grid-cols-2 gap-2">
                {popularOnPinterest.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(item.name)
                      setIsSearchOpen(false)
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors text-left"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <span className="text-sm text-pinterest-black truncate">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Profile only */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-1 p-1.5 rounded-full hover:bg-pinterest-hoverGray transition-colors"
        >
          {/* Avatar circle — pink bg with initial letter */}
          <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center text-sm font-bold text-pink-700 overflow-hidden flex-shrink-0">
            <img
              src="https://i.pravatar.cc/150?u=pinterestuser"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-pinterest-mediumGray">
            <PinterestIcons.ChevronDown />
          </div>
        </button>
      </div>
    </header>
  )
}
