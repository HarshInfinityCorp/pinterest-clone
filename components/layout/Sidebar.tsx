'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CloseIcon = () => (
  <svg height="16" width="16" viewBox="0 0 24 24" aria-hidden="true" role="img" className="text-black">
    <path fill="currentColor" d="M22.8 3.5 20.5 1.2 12 9.7 3.5 1.2 1.2 3.5l8.5 8.5-8.5 8.5 2.3 2.3 8.5-8.5 8.5 8.5 2.3-2.3-8.5-8.5z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" /><path d="m21 3-9 9" /><path d="M15 3h6v6" /></svg>
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
    </svg>
  ),
}

const topNavItems = [
  { icon: PinterestIcons.Home, label: 'Home', href: '/' },
  { icon: PinterestIcons.Explore, label: 'Explore', href: '/today' },
  { icon: PinterestIcons.Boards, label: 'Your boards', href: '/profile' },
  { icon: PinterestIcons.Create, label: 'Create', href: '/pin-creation-tool', isCreate: true },
  { icon: PinterestIcons.Notifications, label: 'Notifications', href: '/notifications', isNotifications: true },
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
]

export function Sidebar() {
  const pathname = usePathname()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [loadingNotifications, setLoadingNotifications] = useState(true)
  const [activeNotificationMenu, setActiveNotificationMenu] = useState<number | null>(null)
  const [isMessagesOpen, setIsMessagesOpen] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(true)
  
  // Larger pool of potential notifications
  const notificationPool = [
    { title: "Your style is iconic", time: "1h", image: '1556912172-45b7abe8b7e1' },
    { title: "Spotted: new design trends", time: "3h", image: '1470075801047-af8601f74936' },
    { title: "You're picking up new skills!", time: "5h", image: '1506744038136-46273834b3fb' },
    { title: "Weekly design insights for you", time: "12h", image: '1483985988355-763728e1935b' },
    { title: "Your latest board is trending", time: "1d", image: '1504674900247-0877df9cc836' },
    { title: "New AI tools discovered", time: "2d", image: '1474511320309-1455a73b2c42' },
  ]

  const [notificationsList, setNotificationsList] = useState([
    { title: "You’re so good at curating...", time: "20h", image: '1535713875002-d1d0cf377fde' },
    { title: "Your taste is excellent", time: "2d", image: '1506794778202-cad84cf45f1d' },
    { title: "So you", time: "3d", image: '1534528741775-53994a69daeb' },
    { title: "Your taste is excellent", time: "4d", image: '1507003211169-0a1dd7228f2d' },
    { title: "You’re so good at curating...", time: "5d", image: '1539327232231-150700321116' },
    { title: "Your taste is excellent", time: "6d", image: '1474511320309-1455a73b2c42' },
  ])

  const [poolIndex, setPoolIndex] = useState(0)

  const handleDeleteNotification = (index: number) => {
    setNotificationsList(prev => {
      const filtered = prev.filter((_, i) => i !== index)
      if (poolIndex < notificationPool.length) {
        const withNewOne = [...filtered, notificationPool[poolIndex]]
        setPoolIndex(prevPool => prevPool + 1)
        return withNewOne
      }
      return filtered
    })
    setActiveNotificationMenu(null)
  }

  useEffect(() => {
    if (isNotificationsOpen) {
      setLoadingNotifications(true)
      const timer = setTimeout(() => {
        setLoadingNotifications(false)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setActiveNotificationMenu(null)
    }
  }, [isNotificationsOpen])

  useEffect(() => {
    if (isMessagesOpen) {
      setLoadingMessages(true)
      const timer = setTimeout(() => {
        setLoadingMessages(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isMessagesOpen])

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false)
  const [boardName, setBoardName] = useState('')
  const [isSecret, setIsSecret] = useState(false)

  const settingsRef = useRef<HTMLDivElement>(null)
  const createRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false)
      }
      if (createRef.current && !createRef.current.contains(event.target as Node)) {
        setIsCreateOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setIsMessagesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <nav aria-label="primary" className="fixed left-0 top-0 h-screen w-[72px] bg-white z-50 hidden lg:flex flex-col border-r border-gray-200 overflow-visible">
        <div className="flex flex-col justify-between h-full pt-6 pb-6 relative" style={{ minHeight: 'max-content' }}>
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/"
              className="flex items-center justify-center w-15 h-15 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Pinterest"
            >
              <PinterestIcons.Logo className="w-6 h-6" />
            </Link>

            {topNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.isCreate && isCreateOpen) || (item.isNotifications && isNotificationsOpen)

              if (item.isCreate) {
                return (
                  <div key={item.href} className="relative" ref={createRef}>
                    <button
                      onClick={() => {
                        setIsCreateOpen(!isCreateOpen);
                        setIsNotificationsOpen(false);
                        setIsSettingsOpen(false);
                      }}
                      className="flex flex-col items-center justify-center transition-colors outline-none cursor-pointer"
                      aria-label={item.label}
                    >
                      <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${isActive ? 'bg-black text-white' : 'text-[#767676] hover:bg-gray-100 hover:text-black'}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </button>

                    {/* Create Popover */}
                    {isCreateOpen && (
                      <div className="absolute left-[64px] top-0 z-[100] pl-2 cursor-default">
                        <div className="bg-white rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.15)] w-[360px] flex flex-col p-4 border border-gray-100">
                          <h2 className="text-[18px] font-bold text-black mb-2 px-2">Create</h2>

                          <div className="flex flex-col gap-1">
                            <Link
                              href="/pin-creation-tool"
                              onClick={() => setIsCreateOpen(false)}
                              className="flex items-center gap-4 p-2 rounded-2xl hover:bg-gray-100 transition-colors border-2 border-transparent focus:border-blue-600"
                            >
                              <div className="w-14 h-14 bg-[#E9E9E9] rounded-2xl flex items-center justify-center shrink-0">
                                <PinterestIcons.Create className="w-6 h-6 text-black" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[16px] font-bold text-black">Pin</span>
                                <span className="text-[14px] text-gray-500 leading-tight">Post your photos or videos and add links, stickers, effects and more</span>
                              </div>
                            </Link>

                            <button
                              onClick={() => { setIsBoardModalOpen(true); setIsCreateOpen(false); }}
                              className="flex items-center gap-4 p-2 rounded-2xl hover:bg-gray-100 transition-colors text-left"
                            >
                              <div className="w-14 h-14 bg-[#E9E9E9] rounded-2xl flex items-center justify-center shrink-0">
                                <PinterestIcons.Boards className="w-6 h-6 text-black" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[16px] font-bold text-black">Board</span>
                                <span className="text-[14px] text-gray-500 leading-tight">Organize a collection of your favorite Pins by creating a board</span>
                              </div>
                            </button>

                            <button
                              className="flex items-center gap-4 p-2 rounded-2xl hover:bg-gray-100 transition-colors text-left"
                            >
                              <div className="w-14 h-14 bg-[#E9E9E9] rounded-2xl flex items-center justify-center shrink-0">
                                <svg height="24" width="24" viewBox="0 0 24 24"><path d="M12 2a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm6.5 1.5a1 1 0 0 1 0 1.41l-4.24 4.25a1 1 0 1 1-1.42-1.42l4.25-4.24a1 1 0 0 1 1.41 0zM22 12a1 1 0 0 1-1 1h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1zm-3.5 6.5a1 1 0 0 1-1.41 0l-4.25-4.24a1 1 0 1 1 1.42-1.42l4.24 4.25a1 1 0 0 1 0 1.41zM12 22a1 1 0 0 1-1-1v-6a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1zm-6.5-1.5a1 1 0 0 1 0-1.41l4.24-4.25a1 1 0 1 1 1.42 1.42l-4.25 4.24a1 1 0 0 1-1.41 0zM2 12a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm1.5-6.5a1 1 0 0 1 1.41 0l4.25 4.24a1 1 0 1 1-1.42 1.42L3.5 6.91a1 1 0 0 1 0-1.41z" fill="currentColor" /></svg>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[16px] font-bold text-black">Collage</span>
                                <span className="text-[14px] text-gray-500 leading-tight">Mix and match ideas to build your vision and create something new</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              if (item.isNotifications) {
                return (
                  <div key={item.href} className="relative" ref={notificationsRef}>
                    <button
                      onClick={() => {
                        setIsNotificationsOpen(!isNotificationsOpen);
                        setIsCreateOpen(false);
                        setIsSettingsOpen(false);
                      }}
                      className="flex flex-col items-center justify-center transition-colors outline-none cursor-pointer"
                      aria-label={item.label}
                    >
                      <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${isActive ? 'bg-black text-white' : 'text-[#767676] hover:bg-gray-100 hover:text-black'}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </button>

                    {/* Notifications (Updates) Popover */}
                    {isNotificationsOpen && (
                      <div className="fixed left-[84px] top-3 bottom-3 z-[100] cursor-default animate-in slide-in-from-left duration-300">
                        <div className="bg-white shadow-[0_10px_60px_rgba(0,0,0,0.15)] w-[380px] h-full flex flex-col rounded-[32px] border border-gray-100 pb-4 overflow-hidden">
                          <div className="px-8 pt-10 pb-4">
                            <h2 className="text-[20px] font-bold text-black text-center">Updates</h2>
                          </div>
                           <div className="flex-1 overflow-hidden flex flex-col">
                                 {loadingNotifications ? (
                                    <div className="flex-1 flex flex-col items-center justify-center">
                                       <div className="flex items-center gap-2">
                                          <div className="w-2.5 h-2.5 bg-[#767676] rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
                                          <div className="w-2.5 h-2.5 bg-[#767676] rounded-full animate-[pulse_1.5s_ease-in-out_0.2s_infinite]"></div>
                                          <div className="w-2.5 h-2.5 bg-[#767676] rounded-full animate-[pulse_1.5s_ease-in-out_0.4s_infinite]"></div>
                                       </div>
                                    </div>
                                 ) : (
                                    <div className="flex-1 overflow-y-auto scroll-smooth px-2 pb-6">
                                       <div className="px-4 py-2">
                                          <h3 className="text-[16px] font-bold text-black">Seen</h3>
                                       </div>
                                       {notificationsList.length > 0 ? (
                                          notificationsList.map((item, i) => (
                                             <div key={i} className={`relative flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer group rounded-2xl ${activeNotificationMenu === i ? 'bg-[#E9E9E9]' : 'hover:bg-gray-50'}`}>
                                                <div className="w-16 h-16 rounded-[12px] overflow-hidden shrink-0 bg-[#E9E9E9]">
                                                   <img 
                                                      src={`https://images.unsplash.com/photo-${item.image}?w=150&h=150&fit=crop`} 
                                                      alt="" 
                                                      className="w-full h-full object-cover" 
                                                   />
                                                </div>
                                                <div className="flex-1 min-w-0 pr-2">
                                                   <span className="text-[15px] leading-tight text-black font-semibold line-clamp-2">
                                                      {item.title}
                                                   </span>
                                                </div>
                                                <div className="flex flex-col items-end gap-1 shrink-0 relative">
                                                   <span className="text-[12px] text-[#767676]">{item.time}</span>
                                                   <button 
                                                      onClick={(e) => {
                                                         e.stopPropagation();
                                                         setActiveNotificationMenu(activeNotificationMenu === i ? null : i);
                                                      }}
                                                      className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${activeNotificationMenu === i ? 'bg-white shadow-sm' : 'text-[#111] hover:bg-gray-200'}`}
                                                   >
                                                      <span className="text-xl font-bold mb-3">...</span>
                                                   </button>

                                                   {/* Action Popup */}
                                                   {activeNotificationMenu === i && (
                                                      <div className="absolute top-10 right-0 z-[110] bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.15)] py-2 w-[220px] animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                                         <button 
                                                            onClick={(e) => {
                                                               e.stopPropagation();
                                                               handleDeleteNotification(i);
                                                            }}
                                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[15px] font-bold text-black group/item"
                                                         >
                                                            Delete update
                                                         </button>
                                                         <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[15px] font-bold text-black group/item">
                                                            View notification settings
                                                         </button>
                                                      </div>
                                                   )}
                                                </div>
                                             </div>
                                          ))
                                       ) : (
                                          <div className="flex-1 flex items-center justify-center pt-20 text-[#767676] font-medium">
                                             No more updates!
                                          </div>
                                       )}
                                    </div>
                                 )}
                              </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

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
                          className={`flex items-center justify-between px-3 py-2 rounded-[8px] hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0060df] font-medium text-[15px] text-[#111]`}
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

      {/* Create Board Modal */}
      {isBoardModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
          <div className="bg-white rounded-[32px] w-[700px] max-w-[90vw] overflow-hidden flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-8 py-6 flex items-center justify-center relative border-b border-transparent">
              <h2 className="text-[28px] font-bold text-[#111] tracking-tight text-center">Create a board</h2>
              <button
                onClick={() => setIsBoardModalOpen(false)}
                className="absolute right-6 top-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <PinterestIcons.Settings className="w-5 h-5 hidden" /> {/* dummy icon to find correct one */}
                <svg height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" role="img" className="text-black">
                  <path fill="currentColor" d="M22.8 3.5 20.5 1.2 12 9.7 3.5 1.2 1.2 3.5l8.5 8.5-8.5 8.5 2.3 2.3 8.5-8.5 8.5 8.5 2.3-2.3-8.5-8.5z" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-8 pt-4 pb-10 flex flex-col gap-8 overflow-y-auto max-h-[80vh] mb-10">
              {/* Board Preview Placeholder */}
              <div className="flex justify-center">
                <div className="w-[200px] h-[160px] bg-[#E9E9E9] rounded-[24px] flex">
                  <div className="flex-1 border-r border-white"></div>
                  <div className="w-1/3 flex flex-col">
                    <div className="flex-1 border-b border-white"></div>
                    <div className="flex-1"></div>
                  </div>
                </div>
              </div>

              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] text-[#111] font-medium ml-4">Board name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Name your board"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    className="w-full px-6 py-4 rounded-[20px] border-2 border-[#CDCDCD] focus:border-[#0060df] outline-none transition-colors text-[16px] text-[#111] placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Secret Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-[#111]">Make this board secret</span>
                  <span className="text-[14px] text-[#767676]">Only you and collaborators will see this board</span>
                </div>
                <button
                  onClick={() => setIsSecret(!isSecret)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isSecret ? 'bg-[#111]' : 'bg-[#E9E9E9]'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isSecret ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Group Board Option */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-[#111]">Group board</span>
                  <span className="text-[14px] text-[#767676]">Invite others to collaborate on this board</span>
                </div>
                <button className="w-10 h-10 bg-[#E9E9E9] rounded-full flex items-center justify-center hover:bg-[#dcdcdc] transition-colors">
                  <svg height="18" width="18" viewBox="0 0 24 24" aria-hidden="true" role="img"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm11-4v2h-2v2h-2v-2h-2v-2h2V8h2v2h2z" fill="currentColor" /></svg>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 pb-8 pt-4">
              <button
                disabled={!boardName.trim()}
                onClick={() => setIsBoardModalOpen(false)}
                className={`w-full py-4 rounded-[20px] font-bold text-[16px] transition-colors ${boardName.trim() ? 'bg-[#E60023] text-white hover:bg-[#ad081b]' : 'bg-[#E9E9E9] text-gray-400 cursor-not-allowed'}`}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
