'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Pinterest exact SVG icons
const SidebarIcons = {
  // Pinterest P logo
  Logo: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#E60023">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  ),

  // Home icon
  Home: ({ active }: { active?: boolean }) => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),

  // Explore/Compass icon
  Explore: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),

  // Boards/Grid icon (the 4-square layout icon from Pinterest)
  Boards: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),

  // Create/Plus icon (plus in square)
  Create: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),

  // Notification bell
  Notification: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),

  // Message/Chat bubble
  Message: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),

  // Settings gear
  Settings: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),

  // Close X
  Close: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),

  // External link icon
  ExternalLink: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
}

// Navigation items for the sidebar
const navItems = [
  { icon: SidebarIcons.Home, label: 'Home', href: '/home', hasActiveState: true },
  { icon: SidebarIcons.Explore, label: 'Explore', href: '/explore', hasActiveState: false },
  { icon: SidebarIcons.Boards, label: 'Boards', href: '/boards', hasActiveState: false },
  { icon: SidebarIcons.Create, label: 'Create', href: '/create', hasActiveState: false },
]

// Settings menu items
const settingsItems = [
  { label: 'Settings', href: '/settings' },
  { label: 'Refine your recommendations', href: '/settings/recommendations' },
  { label: 'Link to Pinterest', href: '/settings/link' },
  { label: 'Reports and violations center', href: '/settings/reports' },
  { label: 'Be a beta tester', href: '#', external: true },
]

const supportItems = [
  { label: 'Help center', href: '#', external: true },
  { label: 'Create widget', href: '#', external: true },
  { label: 'Removals', href: '#', external: true },
  { label: 'Personalized Ads', href: '#', external: true },
  { label: 'Your privacy rights', href: '/privacy-rights' },
  { label: 'Privacy policy', href: '#', external: true },
  { label: 'Terms of service', href: '#', external: true },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

  // Close settings panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[72px] bg-white z-40 hidden lg:flex flex-col items-center py-5 border-r border-gray-100">
      {/* Pinterest Logo */}
      <Link 
        href="/home" 
        className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-pinterest-hoverGray transition-colors mb-2"
      >
        <SidebarIcons.Logo />
      </Link>

      {/* Main Navigation Icons */}
      <nav className="flex flex-col items-center gap-1 mt-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                isActive 
                  ? 'text-pinterest-black bg-pinterest-hoverGray' 
                  : 'text-pinterest-mediumGray hover:bg-pinterest-hoverGray hover:text-pinterest-black'
              }`}
              title={item.label}
            >
              <Icon active={isActive && item.hasActiveState} />
            </Link>
          )
        })}
      </nav>

      {/* Notification & Message Icons */}
      <div className="flex flex-col items-center gap-1 mt-2">
        {/* Notification Bell with red dot */}
        <button 
          className="relative flex items-center justify-center w-12 h-12 rounded-full text-pinterest-mediumGray hover:bg-pinterest-hoverGray hover:text-pinterest-black transition-colors"
          title="Notifications"
        >
          <SidebarIcons.Notification />
          {/* Red notification dot */}
          <span className="absolute top-2.5 right-2.5 w-[10px] h-[10px] bg-pinterest-red rounded-full border-2 border-white" />
        </button>

        {/* Messages */}
        <button 
          className="flex items-center justify-center w-12 h-12 rounded-full text-pinterest-mediumGray hover:bg-pinterest-hoverGray hover:text-pinterest-black transition-colors"
          title="Messages"
        >
          <SidebarIcons.Message />
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Settings Gear at Bottom */}
      <div className="relative" ref={settingsRef}>
        <button 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
            isSettingsOpen 
              ? 'text-pinterest-black bg-pinterest-hoverGray' 
              : 'text-pinterest-mediumGray hover:bg-pinterest-hoverGray hover:text-pinterest-black'
          }`}
          title="Settings & Support"
        >
          <SidebarIcons.Settings />
        </button>

        {/* Settings & Support Panel */}
        {isSettingsOpen && (
          <div className="absolute left-[72px] bottom-0 w-[360px] bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50 animate-in">
            {/* Scrollable content */}
            <div className="max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white z-10 px-5 py-4 flex items-center gap-3">
                <button 
                  onClick={() => setIsSettingsOpen(false)} 
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-pinterest-hoverGray transition-colors text-pinterest-black"
                >
                  <SidebarIcons.Close />
                </button>
                <h2 className="text-base font-semibold text-pinterest-black">Settings & Support</h2>
              </div>

              {/* Settings Links */}
              <div className="px-2 pb-1">
                {settingsItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-pinterest-lightGray transition-colors group"
                    onClick={() => !item.external && setIsSettingsOpen(false)}
                  >
                    <span className="text-[15px] text-pinterest-black">{item.label}</span>
                    {item.external && (
                      <span className="text-pinterest-mediumGray group-hover:text-pinterest-black transition-colors">
                        <SidebarIcons.ExternalLink />
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Support Section */}
              <div className="px-6 pt-4 pb-1">
                <p className="text-xs font-semibold text-pinterest-mediumGray uppercase tracking-wide">Support</p>
              </div>
              <div className="px-2 pb-1">
                {supportItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-pinterest-lightGray transition-colors group"
                    onClick={() => !item.external && setIsSettingsOpen(false)}
                  >
                    <span className="text-[15px] text-pinterest-black">{item.label}</span>
                    {item.external && (
                      <span className="text-pinterest-mediumGray group-hover:text-pinterest-black transition-colors">
                        <SidebarIcons.ExternalLink />
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Resources Section */}
              <div className="px-6 pt-4 pb-2">
                <p className="text-xs font-semibold text-pinterest-mediumGray uppercase tracking-wide">Resources</p>
              </div>
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-x-2 gap-y-1 mb-1">
                  <Link href="#" className="text-sm font-semibold text-pinterest-black hover:underline">About</Link>
                  <Link href="#" className="text-sm font-semibold text-pinterest-black hover:underline">Blog</Link>
                  <Link href="#" className="text-sm font-semibold text-pinterest-black hover:underline">Businesses</Link>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <Link href="#" className="text-sm font-semibold text-pinterest-black hover:underline">Careers</Link>
                  <Link href="#" className="text-sm font-semibold text-pinterest-black hover:underline">Developers</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
