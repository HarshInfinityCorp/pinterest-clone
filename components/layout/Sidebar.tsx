'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
    </svg>
  ),
}

const topNavItems = [
  { icon: PinterestIcons.Home, label: 'Home', href: '/home' },
  { icon: PinterestIcons.Explore, label: 'Explore', href: '/explore' },
  { icon: PinterestIcons.Boards, label: 'Your boards', href: '/profile' },
  { icon: PinterestIcons.Create, label: 'Create', href: '/create' },
  { icon: PinterestIcons.Notifications, label: 'Notifications', href: '/notifications' },
  { icon: PinterestIcons.Messages, label: 'Messages', href: '/messages' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav aria-label="primary" className="fixed left-0 top-0 h-screen w-[72px] bg-white z-50 hidden lg:flex flex-col border-r border-gray-200 overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col justify-between h-full pt-6 pb-6" style={{ minHeight: 'max-content' }}>
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
                className="flex flex-col items-center justify-center transition-colors outline-none"
                aria-label={item.label}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${isActive ? 'bg-black text-white' : 'text-[#767676] hover:bg-gray-100 hover:text-black'}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="flex flex-col items-center mt-6">
          <Link
            href="/settings"
            className="flex flex-col items-center justify-center transition-colors outline-none"
            aria-label="Settings & Support"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${pathname === '/settings' ? 'bg-black text-white' : 'text-[#767676] hover:bg-gray-100 hover:text-black'}`}>
              <PinterestIcons.Settings className="w-6 h-6" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

