'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'

// Pinterest icons
const PinterestIcons = {
  Logo: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#E60023">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  ),
  Notification: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  Message: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Logout: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
}

// Mock data
const recentSearches = [
  'home decor ideas',
  'fashion trends 2024',
  'recipe ideas',
  'travel destinations',
]

const ideasForYou = [
  { name: 'Home', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=100' },
  { name: 'Food', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100' },
  { name: 'Travel', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100' },
]

const popularOnPinterest = [
  { name: 'Wallpapers', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100' },
  { name: 'Quotes', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=100' },
  { name: 'Art', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100' },
  { name: 'Photography', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=100' },
]

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { logout } = useAuth()

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Today', href: '/today' },
  ]

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
    <header className="sticky top-0 h-20 bg-white z-30 px-4 flex items-center gap-2">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0">
        <PinterestIcons.Logo />
      </Link>

      {/* Navigation Tabs */}
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`px-4 py-3 rounded-full font-semibold text-sm transition-all duration-75 ${
                isActive 
                  ? 'bg-black text-white' 
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Search Bar */}
      <div className="flex-1 max-w-[800px] mx-auto" ref={searchRef}>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <PinterestIcons.Search />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            className={`w-full h-12 pl-12 pr-10 rounded-full border-none outline-none transition-all text-base placeholder:text-gray-500 ${
              isSearchOpen 
                ? 'bg-white ring-4 ring-blue-100 shadow-lg' 
                : 'bg-gray-100 focus:ring-4 focus:ring-blue-100'
            }`}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
            >
              <PinterestIcons.Close />
            </button>
          )}
        </div>

        {/* Search Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-[80px] left-4 right-4 max-w-[800px] mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-black mb-3">Recent searches</h3>
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
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <PinterestIcons.Search />
                    </div>
                    <span className="text-sm text-black line-clamp-2">{search}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-black mb-3">Ideas for you</h3>
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
                    <img src={idea.image} alt={idea.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <span className="text-sm text-black truncate">{idea.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-black mb-3">Popular on Pinterest</h3>
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
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <span className="text-sm text-black truncate">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
          <PinterestIcons.Notification />
        </button>
        
        <button className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
          <PinterestIcons.Message />
        </button>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
              <img 
                src="https://i.pravatar.cc/150?u=pinterestuser" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-gray-600">
              <PinterestIcons.ChevronDown />
            </div>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl py-2 min-w-[200px] z-50 border border-gray-100">
              <Link 
                href="/profile"
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3"
                onClick={() => setIsProfileOpen(false)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/150?u=pinterestuser" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                Your profile
              </Link>
              
              <div className="border-t border-gray-100 my-2" />
              
              <button 
                onClick={() => {
                  logout()
                  setIsProfileOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3 text-red-600"
              >
                <PinterestIcons.Logout />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
