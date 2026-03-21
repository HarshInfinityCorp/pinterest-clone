'use client'

import { useEffect, useState } from 'react'
import { PinGrid } from '@/components/pins/PinGrid'
import { SlidersHorizontal } from 'lucide-react'
import { Pin } from '@/lib/data/pins'

export default function ProfilePage() {
  const [savedPins, setSavedPins] = useState<Pin[]>([])

  const loadSavedPins = () => {
    const pins = JSON.parse(localStorage.getItem('savedPins') || '[]')
    setSavedPins(pins)
  }

  useEffect(() => {
    loadSavedPins()
    window.addEventListener('savedPinsUpdated', loadSavedPins)
    return () => window.removeEventListener('savedPinsUpdated', loadSavedPins)
  }, [])

  return (
    <div className="w-full pt-8 pb-16 bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-[36px] font-bold text-[#111] tracking-tight">Your saved ideas</h1>
            
            {/* Tabs */}
            <div className="flex gap-6 mt-8">
              <button className="text-[16px] font-semibold text-[#111] pb-2 border-b-[3px] border-transparent hover:border-gray-200 transition-colors">Pins</button>
              <button className="text-[16px] font-bold text-[#111] pb-2 border-b-[3px] border-[#111] rounded-sm">Boards</button>
              <button className="text-[16px] font-semibold text-[#111] pb-2 border-b-[3px] border-transparent hover:border-gray-200 transition-colors">Collages</button>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full bg-[#fbd4d6] flex items-center justify-center text-xl font-bold text-black">
                 H
               </div>
               <div className="flex flex-col">
                 <span className="text-[15px] font-bold text-[#111] leading-tight">Harsh Vaddoriya</span>
                 <span className="text-[12px] text-[#555] mt-0.5">0 following</span>
               </div>
            </div>
            <button className="px-4 py-[10px] bg-[#e9e9e9] hover:bg-[#e0e0e0] rounded-full text-[15px] font-bold text-[#111] transition-colors">
              Share profile
            </button>
          </div>
        </div>

        {/* Filter and Create Row */}
        <div className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors mr-1">
                 <SlidersHorizontal size={22} className="text-[#111]" strokeWidth={2.5} />
              </button>
              <button className="px-4 py-2 bg-[#e9e9e9] hover:bg-[#e0e0e0] rounded-xl text-[14px] font-bold text-[#111] transition-colors">
                 Group
              </button>
              <button className="px-4 py-2 bg-[#e9e9e9] hover:bg-[#e0e0e0] rounded-xl text-[14px] font-bold text-[#111] transition-colors">
                 Secret
              </button>
           </div>
           
           <button className="px-5 py-2.5 bg-[#e60023] hover:bg-[#ad081b] text-white rounded-full text-[15px] font-bold transition-colors">
              Create
           </button>
        </div>

        {/* Boards Grid */}
        <div className="flex gap-6 relative">
           {/* Test Board */}
           <div className="flex flex-col gap-3 cursor-pointer group">
              <div className="w-[240px] h-[160px] rounded-3xl overflow-hidden flex gap-1 bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                 <div className="w-[160px] h-full bg-gray-200 relative">
                    <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                    {/* Private Lock Icon */}
                    <div className="absolute top-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                 </div>
                 <div className="flex flex-col gap-1 w-[80px]">
                    <div className="flex-1 bg-[#e9e9e9]"></div>
                    <div className="flex-1 bg-[#e9e9e9]"></div>
                 </div>
              </div>
              <div>
                 <p className="text-[20px] font-bold text-[#111] leading-tight">test</p>
                 <div className="flex gap-2 items-center mt-1">
                    <p className="text-[12px] text-[#767676] font-medium">1 Pin</p>
                    <p className="text-[12px] text-[#767676] font-medium">1d</p>
                 </div>
              </div>
           </div>

           {/* Create Board */}
           <div className="flex flex-col gap-2 cursor-pointer group">
              <div className="w-[240px] h-[160px] rounded-3xl flex gap-0.5 bg-[#cacaca] relative items-center justify-center p-0 overflow-hidden hover:opacity-90 transition-opacity">
                 <div className="w-[160px] h-full bg-[#cacaca]"></div>
                 <div className="flex flex-col gap-0.5 w-[80px] h-full border-l border-white/50">
                    <div className="flex-1 bg-[#cacaca] border-b border-white/50"></div>
                    <div className="flex-1 bg-[#cacaca]"></div>
                 </div>
                 {/* Create Pill */}
                 <div className="absolute px-5 py-2.5 bg-white rounded-full font-bold text-[15px] text-black shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                    Create
                 </div>
              </div>
           </div>
        </div>

        <hr className="w-full border-t border-gray-200 mt-14 mb-8" />

        {/* Unorganized Ideas Section */}
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-[20px] font-bold text-[#111]">Unorganized ideas</h2>
           <button className="px-5 py-2 bg-[#e9e9e9] hover:bg-[#e0e0e0] rounded-xl text-[14px] font-bold text-[#111] transition-colors">
              Organize
           </button>
        </div>

        {/* Saved Pins Grid */}
        <div className="min-h-[300px]">
          {savedPins.length > 0 ? (
            <PinGrid pins={savedPins} />
          ) : (
            <div className="flex flex-col items-center justify-center pt-10 text-gray-500 text-center">
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
