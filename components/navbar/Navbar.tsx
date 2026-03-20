'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Bell, MessageCircle, ChevronDown } from 'lucide-react'

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: 'Home', href: '/home' },
    { label: 'Explore', href: '/explore' },
    { label: 'Create', href: '/create' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white z-50 px-4 flex items-center gap-2">
      {/* Logo */}
      <Link href="/home" className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-pinterest-hoverGray transition-colors flex-shrink-0">
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#E60023">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
        </svg>
      </Link>

      {/* Navigation Tabs - Exact Pinterest Style */}
      <nav className="hidden md:flex items-center gap-0">
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
      </nav>

      {/* Search Bar - Exact Pinterest Style */}
      <div className="flex-1 min-w-0">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-pinterest-mediumGray">
            <Search size={20} strokeWidth={2.5} />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-pinterest-lightGray rounded-full border-none outline-none focus:ring-4 focus:ring-blue-100/50 transition-all text-base placeholder:text-pinterest-mediumGray"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-pinterest-hoverGray transition-colors">
          <Bell size={24} className="text-pinterest-mediumGray" strokeWidth={1.5} />
        </button>
        
        <button className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-pinterest-hoverGray transition-colors">
          <MessageCircle size={24} className="text-pinterest-mediumGray" strokeWidth={1.5} />
        </button>

        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-1 p-2 rounded-full hover:bg-pinterest-hoverGray transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-pinterest-lightGray overflow-hidden">
            <img 
              src="https://i.pravatar.cc/150?u=pinterestuser" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <ChevronDown size={16} className="text-pinterest-mediumGray" />
        </button>
      </div>
    </header>
  )
}
