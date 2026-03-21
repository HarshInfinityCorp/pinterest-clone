'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Pinterest exact SVG icons
const PinterestIcons = {
  Home: ({ className, fill = false }: { className?: string; fill?: boolean }) => (
    <svg viewBox="0 0 24 24" className={className} fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),

  Explore: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),

  Create: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),

  Profile: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),

  Logo: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#E60023">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  ),

  Settings: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
}

const sidebarItems = [
  { icon: PinterestIcons.Home, label: 'Home', href: '/home' },
  { icon: PinterestIcons.Explore, label: 'Explore', href: '/explore' },
  { icon: PinterestIcons.Create, label: 'Create', href: '/create' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-white z-50 hidden lg:flex flex-col items-center py-4 border-r border-gray-100 overflow-hidden">
      {/* Pinterest Logo at the very top */}
      <Link
        href="/home"
        className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 mb-6"
      >
        <PinterestIcons.Logo />
      </Link>

      {/* Nav icons */}
      <div className="flex flex-col items-center gap-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive
                  ? 'text-pinterest-black'
                  : 'text-pinterest-mediumGray hover:text-pinterest-black'
              }`}
            >
              <div className={`p-2 rounded-full transition-colors ${isActive ? 'bg-black' : 'hover:bg-pinterest-hoverGray'}`}>
                <Icon
                  className={`w-6 h-6 ${isActive ? 'text-white' : 'text-current'}`}
                  fill={isActive && item.label === 'Home'}
                />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Bottom icons */}
      <div className="mt-auto flex flex-col items-center gap-2">
        {/* Settings */}
        <button className="flex flex-col items-center gap-1 text-pinterest-mediumGray hover:text-pinterest-black transition-colors">
          <div className="p-2 rounded-full hover:bg-pinterest-hoverGray transition-colors">
            <PinterestIcons.Settings className="w-6 h-6" />
          </div>
        </button>

        {/* Profile */}
        <Link
          href="/profile"
          className={`flex flex-col items-center gap-1 transition-colors ${
            pathname === '/profile'
              ? 'text-pinterest-black'
              : 'text-pinterest-mediumGray hover:text-pinterest-black'
          }`}
        >
          <div className={`p-2 rounded-full transition-colors ${pathname === '/profile' ? 'bg-black' : 'hover:bg-pinterest-hoverGray'}`}>
            <PinterestIcons.Profile
              className={`w-6 h-6 ${pathname === '/profile' ? 'text-white' : 'text-current'}`}
            />
          </div>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
    </aside>
  )
}
