'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'

const todayItems = [
  {
    subtitle: "Brewed bites",
    title: "Creative recipes with coffee",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
  },
  {
    subtitle: "Celebrate in style",
    title: "Your Navratri kurta edit",
    image: "https://i.pinimg.com/474x/e8/b9/c3/e8b9c3fbcee9fa76bc361f211305f7a6.jpg",
  },
  {
    subtitle: "Designed by you",
    title: "Make your own belts",
    image: "https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa?auto=format&fit=crop&q=80&w=800",
  },
  {
    subtitle: "Keep that smile on",
    title: "Quotes filled with positive vibes",
    image: "https://images.unsplash.com/photo-1554147090-e1221a04a025?auto=format&fit=crop&q=80&w=800",
  },
  {
    subtitle: "Festive preparations",
    title: "Eid celebration ideas",
    image: "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?auto=format&fit=crop&q=80&w=800",
  },
  {
    subtitle: "New season styles",
    title: "Your spring mani",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800",
  },
  {
    subtitle: "Chic & elegant",
    title: "Tassel aesthetic",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800",
  }
];

export default function TodayPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="pt-10 pb-16 min-h-screen bg-white">
      <div className="text-center mb-10">
        <p className="text-sm font-bold text-gray-900">{currentDate}</p>
        <h1 className="text-[32px] font-bold mt-1 text-black tracking-tight">Stay Inspired</h1>
      </div>

      {/* Grid wrapper centered */}
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-[20px]">
          {todayItems.map((item, index) => (
            <div
              key={index}
              className="relative rounded-[32px] overflow-hidden w-[335px] h-[335px] cursor-pointer group shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end items-center pb-8 px-6">
                <p className="text-white/90 text-[13px] font-medium mb-1 opacity-90">{item.subtitle}</p>
                <h2 className="text-white text-[22px] font-bold leading-[1.2] text-center">{item.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-28 flex flex-col items-center">
        <div className="w-8 h-8 rounded-full border-[2.5px] border-black flex items-center justify-center mb-4">
          <Check strokeWidth={3} className="w-6 h-6 text-black" />
        </div>
        <p className="text-[15px] font-medium text-gray-800 mb-1">That's all for today!</p>
        <h3 className="text-[22px] font-bold text-black mb-8 text-center max-w-sm">Come back tomorrow for more inspiration</h3>
        <Link
          href="/"
          className="px-4 py-2 bg-[#e9e9e9] hover:bg-[#dcdcdc] rounded-xl font-semibold text-[14px] text-black transition-colors"
        >
          Go to home feed
        </Link>
      </div>
    </div>
  )
}
