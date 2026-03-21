"use client";

import { useState } from "react";
import { ChevronDown, Plus, ChevronsRight, ChevronsLeft } from "lucide-react";

export default function PinCreationTool() {
  const [isDraftsOpen, setIsDraftsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex w-full font-sans text-black overflow-hidden relative">
      {/* Main Content (Left) */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div className="h-[72px] border-b border-t border-gray-200 flex items-center px-6 sticky top-0 bg-white z-10 shrink-0">
          <h1 className="text-xl font-bold tracking-tight">Create Pin</h1>
        </div>

        {/* Scrollable form area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-white">
          <div className="max-w-[850px] w-full flex flex-col md:flex-row gap-10 mt-2">
            {/* Image Upload Column */}
            <div className="w-full md:w-[320px] shrink-0">
              <div className="w-full h-[450px] bg-[#e9e9e9] rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:bg-[#e0e0e0] transition-colors px-6 text-center border-2 border-dashed border-transparent hover:border-gray-300">
                <div className="mb-4 mt-8">
                  {/* Arrow up in circle icon matching the design */}
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
                    <path d="M12 16V8M12 8L8 12M12 8L16 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[15px] font-semibold leading-tight text-gray-900 drop-shadow-sm">Choose a file or drag and<br />drop it here</p>

                <div className="mt-auto pt-8 pb-4">
                  <p className="text-[12px] text-gray-700 px-2 leading-relaxed">We recommend using high quality .jpg files less than 20 MB or .mp4 files less than 200 MB.</p>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full py-3 bg-[#e9e9e9] text-black text-[15px] font-bold rounded-full hover:bg-[#e0e0e0] transition-colors shadow-sm">
                  Save from URL
                </button>
              </div>
            </div>

            {/* Form Column */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Title */}
              <div className="flex flex-col">
                <label className="text-[12px] font-medium text-gray-800 ml-4 mb-2">Title</label>
                <input type="text" placeholder="Add a title" className="w-full px-5 py-[14px] bg-[#e9e9e9] border-transparent rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-[17px] font-bold placeholder:text-gray-500 placeholder:font-normal focus:outline-none focus:bg-white transition-all shadow-sm" />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="text-[12px] font-medium text-gray-800 ml-4 mb-2">Description</label>
                <textarea placeholder="Add a detailed description" rows={4} className="w-full px-5 py-[14px] bg-[#e9e9e9] border-transparent rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-[15px] placeholder:text-gray-500 focus:outline-none focus:bg-white resize-none transition-all shadow-sm" />
              </div>

              {/* Link */}
              <div className="flex flex-col">
                <label className="text-[12px] font-medium text-gray-800 ml-4 mb-2">Link</label>
                <input type="text" placeholder="Add a link" className="w-full px-5 py-[14px] bg-[#e9e9e9] border-transparent rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-[15px] placeholder:text-gray-500 focus:outline-none focus:bg-white transition-all shadow-sm" />
              </div>

              {/* Board */}
              <div className="flex flex-col">
                <label className="text-[12px] font-medium text-gray-800 ml-4 mb-2">Board</label>
                <div className="relative">
                  <select className="w-full px-5 py-[14px] bg-[#e9e9e9] border-transparent rounded-2xl appearance-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-[15px] text-gray-500 focus:outline-none focus:bg-white cursor-pointer transition-all shadow-sm">
                    <option>Choose a board</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Tagged topics */}
              <div className="flex flex-col">
                <label className="text-[12px] font-medium text-gray-800 ml-4 mb-2">Tagged topics (0)</label>
                <input type="text" placeholder="Search for a tag" className="w-full px-5 py-[14px] bg-[#e9e9e9] border-transparent rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-[15px] placeholder:text-gray-500 focus:outline-none focus:bg-white transition-all shadow-sm" />
              </div>

              {/* Tag Products */}
              <div className="flex flex-col">
                <p className="text-[12px] font-medium text-gray-800 ml-4 mb-2">Tag Products</p>
                <button className="self-start px-5 py-[10px] bg-[#e9e9e9] shadow-sm text-gray-500 font-bold rounded-full hover:bg-[#e0e0e0] transition-colors text-[13px]">
                  Add products
                </button>
              </div>

              {/* More options */}
              <div className="flex items-center gap-1 mt-2 cursor-pointer w-max hover:opacity-80 transition-opacity">
                <p className="text-[15px] font-semibold text-gray-700">More options</p>
                <ChevronDown className="w-[18px] h-[18px] text-gray-700" />
              </div>

              <div className="h-10"></div> {/* Spacer */}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className={`flex flex-col bg-white border-l border-gray-200 transition-all duration-300 ease-in-out ${isDraftsOpen ? 'w-[320px]' : 'w-[80px]'} shrink-0 z-20`}>

        {/* Top section of right sidebar */}
        <div className="h-[72px] flex items-center justify-between px-4 border-b border-gray-200 shrink-0">
          {isDraftsOpen && (
            <h2 className="text-[16px] font-bold text-black pl-2">Pin drafts</h2>
          )}
          <button
            onClick={() => setIsDraftsOpen(!isDraftsOpen)}
            className={`w-[44px] h-[44px] flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors ${!isDraftsOpen ? 'mx-auto' : ''}`}
          >
            {isDraftsOpen ? <ChevronsRight className="w-6 h-6 text-black" /> : <ChevronsLeft className="w-6 h-6 text-black" />}
          </button>
        </div>

        {/* Second section */}
        {!isDraftsOpen ? (
          <div className="flex items-center justify-center py-4 border-b border-gray-200">
            <button className="w-[44px] h-[44px] flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
              <Plus className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        ) : (
          <div className="p-4 bg-white flex-1">
            <button className="w-full py-2.5 bg-[#e9e9e9] text-gray-400 text-[13px] font-bold rounded-lg transition-colors text-center hover:bg-[#e0e0e0]">
              Create new
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
