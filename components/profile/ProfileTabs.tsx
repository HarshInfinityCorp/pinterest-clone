'use client'

import { useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'

const tabs = [
  { id: 'created', label: 'Created' },
  { id: 'saved', label: 'Saved' },
]

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState('created')
  const [showBoardsMenu, setShowBoardsMenu] = useState(false)

  return (
    <div className="sticky top-20 bg-white z-30 border-b border-pinterest-lightGray">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto px-4">
        {/* Tabs */}
        <div className="flex items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === tab.id 
                  ? 'text-pinterest-black' 
                  : 'text-pinterest-darkGray hover:text-pinterest-black'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-pinterest-black rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Board Selector */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setShowBoardsMenu(!showBoardsMenu)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-pinterest-lightGray rounded-full text-sm font-semibold hover:bg-pinterest-hoverGray transition-colors text-pinterest-black"
            >
              All Pins
              <ChevronDown size={16} className="text-pinterest-mediumGray" />
            </button>

            {showBoardsMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl py-2 min-w-[200px] z-20 border border-gray-100">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 font-semibold text-pinterest-black">
                  All Pins
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-pinterest-black">
                  Wall Decor
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-pinterest-black">
                  Fashion Ideas
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-pinterest-black">
                  Food & Recipes
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-pinterest-black">
                  Travel
                </button>
              </div>
            )}
          </div>

          <button className="w-10 h-10 flex items-center justify-center bg-pinterest-lightGray hover:bg-pinterest-hoverGray rounded-full transition-colors">
            <Plus size={20} className="text-pinterest-black" />
          </button>
        </div>
      </div>
    </div>
  )
}
