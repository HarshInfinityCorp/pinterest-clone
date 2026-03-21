'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

<<<<<<< HEAD
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
=======
const CloseIcon = () => (
  <svg height="16" width="16" viewBox="0 0 24 24" aria-hidden="true" role="img" className="text-black">
    <path fill="currentColor" d="M22.8 3.5 20.5 1.2 12 9.7 3.5 1.2 1.2 3.5l8.5 8.5-8.5 8.5 2.3 2.3 8.5-8.5 8.5 8.5 2.3-2.3-8.5-8.5z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg height="14" width="14" viewBox="0 0 24 24" aria-hidden="true" role="img" className="text-[#111]">
    <path fill="currentColor" d="M10 22H2V2h12v5h-2V4H4v16h4v2zm12-16v10h-2V5.41l-9.29 9.3-1.42-1.42L18.59 4H12V2h10z" />
  </svg>
)

// Pinterest exact SVG icons from example.html
const PinterestIcons = {
  Logo: ({ className }: { className?: string }) => (
    <svg aria-hidden="true" aria-label="" className={className} height="24" role="img" viewBox="0 0 24 24" width="24">
      <path fill="#e60023" d="M7.54 23.15q-.2-2.05.26-3.93L9 14.04a7 7 0 0 1-.35-2.07c0-1.68.81-2.88 2.09-2.88.88 0 1.53.62 1.53 1.8q0 .57-.23 1.28l-.52 1.72q-.15.5-.15.92c0 1.2.91 1.87 2.08 1.87 2.09 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.12-5.05-5.12-3.36 0-5.49 2.19-5.49 5.24 0 1.22.38 2.36 1.11 3.14-.24.41-.5.48-.88.48-1.2 0-2.34-1.69-2.34-4 0-4 3.2-7.17 7.68-7.17 4.7 0 7.66 3.29 7.66 7.33s-2.88 7.15-5.98 7.15a3.8 3.8 0 0 1-3.06-1.48l-.62 2.5a11 11 0 0 1-1.62 3.67A11.98 11.98 0 0 0 24 12a11.99 11.99 0 1 0-24 0 12 12 0 0 0 7.54 11.15"></path>
    </svg>
  ),
  Home: ({ className }: { className?: string }) => (
    <svg aria-hidden="true" aria-label="" className={className} height="24" role="img" viewBox="0 0 24 24" width="24">
      <path fill="currentColor" d="M9.59.92a3.63 3.63 0 0 1 4.82 0l7.25 6.44A4 4 0 0 1 23 10.35v8.46a3.9 3.9 0 0 1-3.6 3.92 106 106 0 0 1-14.8 0A3.9 3.9 0 0 1 1 18.8v-8.46a4 4 0 0 1 1.34-3zM12 16a5 5 0 0 1-3.05-1.04l-1.23 1.58a7 7 0 0 0 8.56 0l-1.23-1.58A5 5 0 0 1 12 16"></path>
    </svg>
  ),
  Explore: ({ className }: { className?: string }) => (
    <svg aria-hidden="true" aria-label="" className={className} height="24" role="img" viewBox="0 0 24 24" width="24">
      <path fill="currentColor" d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4M9.42 7.24a3 3 0 0 0-2.18 2.18L5.7 15.57a2.25 2.25 0 0 0 2.73 2.73l6.15-1.54a3 3 0 0 0 2.18-2.18l1.54-6.15a2.25 2.25 0 0 0-2.73-2.73zm6.94.7-1.54 6.15a1 1 0 0 1-.73.73l-6.15 1.54a.25.25 0 0 1-.3-.3L9.18 9.9a1 1 0 0 1 .73-.73l6.15-1.54a.25.25 0 0 1 .3.3M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0"></path>
    </svg>
  ),
  Boards: ({ className }: { className?: string }) => (
    <svg aria-hidden="true" aria-label="" className={className} height="24" role="img" viewBox="0 0 24 24" width="24">
      <path fill="currentColor" d="M23 5a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4zm-10 6V3h6a2 2 0 0 1 2 2v6zm8 8a2 2 0 0 1-2 2h-6v-8h8zM5 3h6v18H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2"></path>
    </svg>
  ),
  Create: ({ className }: { className?: string }) => (
    <svg aria-hidden="true" aria-label="" className={className} height="24" role="img" viewBox="0 0 24 24" width="24">
      <path fill="currentColor" d="M11 11H6v2h5v5h2v-5h5v-2h-5V6h-2zM5 1a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4zm16 4v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2"></path>
    </svg>
  ),
  Notifications: ({ className }: { className?: string }) => (
    <svg aria-hidden="true" aria-label="" className={className} height="24" role="img" viewBox="0 0 24 24" width="24">
      <path fill="currentColor" d="M16 19h8v-2h-.34a3.15 3.15 0 0 1-3.12-2.76l-.8-6.41a7.8 7.8 0 0 0-15.48 0l-.8 6.41A3.15 3.15 0 0 1 .34 17H0v2h8v1h.02a3.4 3.4 0 0 0 3.38 3h1.2a3.4 3.4 0 0 0 3.38-3H16zm1.75-10.92.8 6.4c.12.95.5 1.81 1.04 2.52H4.4c.55-.7.92-1.57 1.04-2.51l.8-6.41a5.8 5.8 0 0 1 11.5 0M13.4 19c.33 0 .6.27.6.6 0 .77-.63 1.4-1.4 1.4h-1.2a1.4 1.4 0 0 1-1.4-1.4c0-.33.27-.6.6-.6z"></path>
    </svg>
  ),
  Messages: ({ className }: { className?: string }) => (
    <svg aria-hidden="true" aria-label="" className={className} height="24" role="img" viewBox="0 0 24 24" width="24">
      <path fill="currentColor" d="M7 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m5 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-5 10c1.8 0 3.5-.41 5-1.15l3.69.65A2 2 0 0 0 23 20.7l-.65-3.7A11.5 11.5 0 1 0 12 23.5m8.55-7.36-.28.58.76 4.31-4.31-.76-.58.28q-1.89.93-4.14.95a9.5 9.5 0 1 1 8.55-5.36"></path>
    </svg>
  ),
  Settings: ({ className }: { className?: string }) => (
    <svg aria-hidden="true" aria-label="" className={className} height="24" role="img" viewBox="0 0 24 24" width="24">
      <path fill="currentColor" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10m3 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m1.13-10.29A2 2 0 0 0 14.7.31a12 12 0 0 0-5.4 0c-.73.17-1.26.74-1.43 1.4l-.58 2.14-2.14-.57a2 2 0 0 0-1.93.54 12 12 0 0 0-2.7 4.67c-.22.72.01 1.46.5 1.95L2.59 12l-1.57 1.56a2 2 0 0 0-.5 1.95 12 12 0 0 0 2.7 4.68c.51.54 1.27.72 1.93.54l2.14-.58.58 2.14c.17.67.7 1.24 1.43 1.4a12 12 0 0 0 5.4 0 2 2 0 0 0 1.43-1.4l.58-2.14 2.13.58c.67.18 1.43 0 1.94-.55a12 12 0 0 0 2.7-4.67 2 2 0 0 0-.5-1.94L21.4 12l1.57-1.56c.49-.5.71-1.23.5-1.95a12 12 0 0 0-2.7-4.67 2 2 0 0 0-1.93-.54l-2.14.57zm-6.34.54a10 10 0 0 1 4.42 0l.56 2.12a2 2 0 0 0 2.45 1.41l2.13-.57a10 10 0 0 1 2.2 3.83L20 10.59a2 2 0 0 0 0 2.83l1.55 1.55a10 10 0 0 1-2.2 3.82l-2.13-.57a2 2 0 0 0-2.44 1.42l-.57 2.12a10 10 0 0 1-4.42 0l-.57-2.12a2 2 0 0 0-2.45-1.42l-2.12.57a10 10 0 0 1-2.2-3.82L4 13.42a2 2 0 0 0 0-2.83L2.45 9.03a10 10 0 0 1 2.2-3.82l2.13.57a2 2 0 0 0 2.44-1.41z"></path>
>>>>>>> dd5bbd3eca874db92ad0a096a09c58395f462e2d
    </svg>
  ),
}

<<<<<<< HEAD
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
=======
const topNavItems = [
  { icon: PinterestIcons.Home, label: 'Home', href: '/home' },
  { icon: PinterestIcons.Explore, label: 'Explore', href: '/explore' },
  { icon: PinterestIcons.Boards, label: 'Your boards', href: '/profile' },
  { icon: PinterestIcons.Create, label: 'Create', href: '/create' },
  { icon: PinterestIcons.Notifications, label: 'Notifications', href: '/notifications' },
  { icon: PinterestIcons.Messages, label: 'Messages', href: '/messages' },
]

const settingsTopLinks = [
  { label: 'Settings', href: '/settings', external: false, outline: true },
  { label: 'Refine your recommendations', href: '/edit/recommendations', external: false },
  { label: 'Link to Pinterest', href: '/link-to-pinterest', external: false },
  { label: 'Reports and violations center', href: '/reports', external: false },
  { label: 'Install the Chrome app', href: '#', external: false },
  { label: 'Be a beta tester', href: '#', external: true },
]

const supportLinks = [
  { label: 'Help center', href: 'https://help.pinterest.com', external: true },
  { label: 'Create widget', href: '/widgets', external: true },
  { label: 'Removals', href: '/removals', external: true },
  { label: 'Personalized Ads', href: '/personalized-ads', external: true },
  { label: 'Your privacy rights', href: '/privacy-rights', external: false },
  { label: 'Privacy policy', href: '/privacy-policy', external: true },
  { label: 'Terms of service', href: '/tos', external: true },
>>>>>>> dd5bbd3eca874db92ad0a096a09c58395f462e2d
]

export function Sidebar() {
  const pathname = usePathname()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

<<<<<<< HEAD
  // Close settings panel when clicking outside
=======
>>>>>>> dd5bbd3eca874db92ad0a096a09c58395f462e2d
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
<<<<<<< HEAD
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
=======
    <nav aria-label="primary" className="fixed left-0 top-0 h-screen w-[72px] bg-white z-50 hidden lg:flex flex-col border-r border-gray-200 overflow-visible">
      <div className="flex flex-col justify-between h-full pt-6 pb-6 relative" style={{ minHeight: 'max-content' }}>
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/home"
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Pinterest"
          >
            <PinterestIcons.Logo className="w-6 h-6" />
          </Link>

          {topNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center transition-colors outline-none cursor-pointer"
                aria-label={item.label}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${isActive ? 'bg-black text-white' : 'text-[#767676] hover:bg-gray-100 hover:text-black'}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="flex flex-col items-center mt-6 relative" ref={settingsRef}>
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="flex flex-col items-center justify-center transition-colors outline-none w-full cursor-pointer"
            aria-label="Settings & Support"
            aria-expanded={isSettingsOpen}
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${pathname === '/settings' || isSettingsOpen ? 'bg-black text-white' : 'text-[#767676] hover:bg-gray-100 hover:text-black'}`}>
              <PinterestIcons.Settings className="w-6 h-6" />
            </div>
          </button>

          {/* Settings Click Modal */}
          {isSettingsOpen && (
            <div className="absolute left-[70px] bottom-[-20px] z-[100] pl-2 cursor-default">
              <div className="bg-white rounded-[16px] shadow-[0_2px_16px_rgba(0,0,0,0.15)] w-[392px] max-w-[392px] flex flex-col border border-gray-100 pb-2">
                
                {/* Header */}
                <div className="flex items-center gap-2 px-4 py-3 shrink-0 mt-1">
                  <div className="p-2 -ml-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => setIsSettingsOpen(false)}>
                    <CloseIcon />
                  </div>
                  <h2 className="text-[16px] font-semibold text-black tracking-tight ml-1">Settings & Support</h2>
                </div>

                <div className="px-2">
                  <div className="flex flex-col space-y-[2px]">
                    {settingsTopLinks.map((item, index) => (
                      <Link 
                        key={index} 
                        href={item.href} 
                        target={item.external ? "_blank" : undefined}
                        onClick={() => setIsSettingsOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-[8px] hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0060df] font-medium text-[15px] text-[#111] ${item.outline ? 'ring-1 ring-[#0060df]' : ''}`}
                      >
                        <span>{item.label}</span>
                        {item.external && <ExternalLinkIcon />}
                      </Link>
                    ))}
                  </div>

                  {/* Support Section */}
                  <div className="mt-4 mb-2 px-3">
                    <h3 className="text-[12px] text-[#767676] font-normal leading-tight">Support</h3>
                  </div>
                  <div className="flex flex-col space-y-[2px]">
                    {supportLinks.map((item, index) => (
                      <Link 
                        key={index} 
                        href={item.href} 
                        target={item.external ? "_blank" : undefined}
                        onClick={() => setIsSettingsOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-[8px] hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0060df] font-medium text-[15px] text-[#111]"
                      >
                        <span>{item.label}</span>
                        {item.external && <ExternalLinkIcon />}
                      </Link>
                    ))}
                  </div>

                  {/* Resources Section */}
                  <div className="mt-4 mb-2 px-3">
                    <h3 className="text-[12px] text-[#767676] font-normal mb-3 leading-tight">Resources</h3>
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex gap-[14px]">
                        <Link href="/about" className="text-[14px] text-[#0060df] hover:underline font-medium" onClick={() => setIsSettingsOpen(false)}>About</Link>
                        <Link href="/blog" className="text-[14px] text-[#0060df] hover:underline font-medium" onClick={() => setIsSettingsOpen(false)}>Blog</Link>
                        <Link href="/business" className="text-[14px] text-[#0060df] hover:underline font-medium" onClick={() => setIsSettingsOpen(false)}>Businesses</Link>
                      </div>
                      <div className="flex gap-[14px]">
                        <Link href="/careers" className="text-[14px] text-[#0060df] hover:underline font-medium" onClick={() => setIsSettingsOpen(false)}>Careers</Link>
                        <Link href="/developers" className="text-[14px] text-[#0060df] hover:underline font-medium" onClick={() => setIsSettingsOpen(false)}>Developers</Link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </nav>
>>>>>>> dd5bbd3eca874db92ad0a096a09c58395f462e2d
  )
}


