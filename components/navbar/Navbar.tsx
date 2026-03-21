'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Search, X, Check } from 'lucide-react'


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

// Mock data for search dropdown - AI themed
const recentSearches = [
  'AI art generator stable diffusion',
  'Midjourney prompts for interior design',
  'Generative AI coding assistants',
]

const ideasForYou = [
  { name: 'AI Avatars', image: 'https://images.unsplash.com/photo-1675271591211-126ad94e1d7d?w=200&h=200&fit=crop' },
  { name: 'Deep Learning', image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c6a20?w=200&h=200&fit=crop' },
  { name: 'Neural Networks', image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=200&h=200&fit=crop' },
  { name: 'Future Robotics', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=200&fit=crop' },
  { name: 'AI Architecture', image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=200&h=200&fit=crop' },
  { name: 'Machine Learning', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=200&h=200&fit=crop' },
]

const popularOnPinterest = [
  { name: 'AI Digital Art', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop' },
  { name: 'Future Cities', image: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?w=200&h=200&fit=crop' },
  { name: 'Cyberpunk Aesthetic', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=200&h=200&fit=crop' },
  { name: 'Tech Innovations', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop' },
  { name: 'Smart Home Tech', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=200&h=200&fit=crop' },
  { name: 'Virtual Reality', image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=200&h=200&fit=crop' },
  { name: 'Coding with AI', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=200&h=200&fit=crop' },
  { name: 'Data Visualization', image: 'https://images.unsplash.com/photo-1551288049-bbbda536ad0a?w=200&h=200&fit=crop' },
]

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
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
      <div className="flex-1 min-w-0 relative px-2" ref={searchRef}>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767676]">
            <PinterestIcons.Search />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            className={`w-full h-12 pl-12 pr-12 rounded-xl border-none outline-none transition-all text-[16px] font-medium placeholder:text-[#767676] ${isSearchOpen
              ? 'bg-white ring-[4px] ring-[#3b82f6]/30 shadow-lg'
              : 'bg-[#E9E9E9] hover:bg-[#DCDCDC]'
              }`}
          />
          {/* Mic icon & Close icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {!searchQuery ? (
              <button
                type="button"
                className="w-9 h-9 flex items-center justify-center text-black hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Search by voice"
              >
                <svg height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
                  <path d="M12 0a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V5a5 5 0 0 0-5-5m0 14a3 3 0 0 1-3-3V5a3 3 0 1 1 6 0v6a3 3 0 0 1-3 3M3 9v2a9 9 0 0 0 8 8.95V24h2v-4.05A9 9 0 0 0 21 11V9h-2v2a7 7 0 1 1-14 0V9z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setSearchQuery('')}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-200 text-black transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        {/* Search Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[32px] shadow-[0_4px_30px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden max-h-[85vh] overflow-y-auto z-50 animate-in fade-in zoom-in-95 duration-200">
            {/* Recent searches */}
            <div className="px-6 pt-6 pb-4">
              <h3 className="text-[16px] font-bold text-black mb-4 ml-1">Recent searches</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(search)
                      setIsSearchOpen(false)
                    }}
                    className="flex items-center gap-3 p-1.5 pr-4 rounded-[20px] bg-[#F0F0F0] hover:bg-[#E2E2E2] transition-colors text-left w-[300px]"
                  >
                    <div className="w-[60px] h-[60px] rounded-[16px] bg-[#DCDCDC] flex items-center justify-center flex-shrink-0">
                      <Search size={24} className="text-black" strokeWidth={2.5} />
                    </div>
                    <span className="text-[14px] font-bold text-black leading-tight line-clamp-2 pr-1">{search}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ideas for you */}
            <div className="px-6 pt-4 pb-4">
              <h3 className="text-[16px] font-bold text-black mb-4 ml-1">Ideas for you</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {ideasForYou.map((idea, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(idea.name)
                      setIsSearchOpen(false)
                    }}
                    className="flex items-center gap-3 p-1.5 rounded-[16px] bg-[#F0F0F0] hover:bg-[#E2E2E2] transition-colors text-left overflow-hidden group"
                  >
                    <img
                      src={idea.image}
                      alt={idea.name}
                      className="w-14 h-14 rounded-[12px] object-cover flex-shrink-0"
                    />
                    <span className="text-[15px] font-bold text-black truncate pr-2 group-hover:text-black">{idea.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular on Pinterest */}
            <div className="px-6 pt-4 pb-8">
              <h3 className="text-[16px] font-bold text-black mb-4 ml-1">Popular on Pinterest</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {popularOnPinterest.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(item.name)
                      setIsSearchOpen(false)
                    }}
                    className="flex items-center gap-3 p-1.5 rounded-[16px] bg-[#F0F0F0] hover:bg-[#E2E2E2] transition-colors text-left overflow-hidden group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-[12px] object-cover flex-shrink-0"
                    />
                    <span className="text-[15px] font-bold text-black truncate pr-2 group-hover:text-black">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Profile only */}
      <div className="flex items-center gap-2 flex-shrink-0 relative" ref={dropdownRef}>

        {/* 1. Avatar button → navigates to /profile */}
        <Link
          href="/profile"
          className="w-10 h-10 rounded-full bg-[#fbd4d6] flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          <span className="text-black font-semibold text-sm">H</span>
        </Link>

        {/* 2. Chevron button → opens account dropdown */}
        <button
          id="profile-dropdown-trigger"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-200 transition-colors text-black"
          aria-label="Account options"
        >
          <PinterestIcons.ChevronDown />
        </button>

        {/* Account dropdown */}
        {isProfileOpen && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">

            {/* Currently in section */}
            <div className="px-5 pt-4 pb-2">
              <p className="text-xs text-gray-400 font-medium mb-3">Currently in</p>
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#fbd4d6] flex items-center justify-center text-base font-bold text-black flex-shrink-0">
                  H
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-gray-900">Harsh Vaddoriya</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-gray-500">Personal</p>
                    <Check size={13} className="text-gray-700 flex-shrink-0" strokeWidth={2.5} />
                  </div>
                  <p className="text-xs text-gray-400 truncate">harshvaddoriya0319@gm...</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 my-1 mx-5" />

            {/* Convert to business */}
            <button className="w-full text-left px-5 py-3 text-base font-bold text-gray-900 hover:bg-gray-50 transition-colors">
              Convert to business
            </button>

            <div className="h-px bg-gray-100 my-1 mx-5" />

            {/* Your accounts */}
            <div className="px-5 pt-3 pb-1">
              <p className="text-xs text-gray-400 font-medium mb-1">Your accounts</p>
            </div>
            <button className="w-full text-left px-5 py-3 text-base font-bold text-gray-900 hover:bg-gray-50 transition-colors">
              Add Pinterest account
            </button>
            <button className="w-full text-left px-5 py-3 mb-2 text-base font-bold text-gray-900 hover:bg-gray-50 transition-colors">
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
