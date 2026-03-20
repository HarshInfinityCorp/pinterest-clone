'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, PlusCircle, User } from 'lucide-react'

const sidebarItems = [
  { icon: Home, label: 'Home', href: '/home' },
  { icon: Compass, label: 'Explore', href: '/explore' },
  { icon: PlusCircle, label: 'Create', href: '/create' },
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
              <div className={`p-2 rounded-full ${isActive ? 'bg-black' : 'hover:bg-pinterest-hoverGray'}`}>
                <Icon size={24} className={isActive ? 'text-white' : 'text-current'} strokeWidth={isActive ? 2 : 1.5} />
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
        <div className={`p-2 rounded-full ${pathname === '/profile' ? 'bg-black' : 'hover:bg-pinterest-hoverGray'}`}>
          <User size={24} className={pathname === '/profile' ? 'text-white' : 'text-current'} strokeWidth={pathname === '/profile' ? 2 : 1.5} />
        </div>
        <span className="text-[10px] font-medium">Profile</span>
      </Link>
    </aside>
  )
}
