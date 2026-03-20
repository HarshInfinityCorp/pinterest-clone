'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Pinterest exact SVG icons
const PinterestIcons = {
  // Home icon - Pinterest uses filled version when active
  Home: ({ className, fill = false }: { className?: string; fill?: boolean }) => (
    <svg viewBox="0 0 24 24" className={className} fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),

  // Compass/Explore icon
  Explore: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),

  // Plus/Create icon
  Create: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),

  // Profile/User icon
  Profile: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
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
    <aside className="fixed left-0 top-20 bottom-0 w-16 bg-white z-40 hidden lg:flex flex-col items-center py-4">
      <div className="flex flex-col items-center gap-6">
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

      <Link
        href="/profile"
        className={`mt-auto flex flex-col items-center gap-1 transition-colors ${
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
    </aside>
  )
}
