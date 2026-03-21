"use client";

import { useState } from "react";
import { ChevronDown, Plus, ChevronsRight, ChevronsLeft } from "lucide-react";

export default function PinCreationTool() {
  const [isDraftsOpen, setIsDraftsOpen] = useState(false);

  return (
    <div className="flex w-[calc(100%+32px)] -ml-4 h-[calc(100vh-64px)] bg-white font-sans text-[#111] overflow-hidden relative border-t border-gray-200">

      {/* Main Content (Left) */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar for Create Pin */}
        <div className="h-[72px] border-y border-gray-200 flex items-center px-8 bg-white z-10 shrink-0">
          <h1 className="text-xl font-bold tracking-tight">Create Pin</h1>
        </div>

        {/* Scrollable form area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-white border-t-transparent">
          <div className="max-w-[850px] w-full flex flex-col md:flex-row gap-10 mt-2 pb-10">

            {/* Image Upload Column */}
            <div className="w-full md:w-[320px] shrink-0">
              <div className="w-full h-[450px] bg-[#E9E9E9] rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-colors px-6 text-center border border-transparent hover:border-[#d3d3d3]">
                <div className="mb-4 mt-8">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#111" strokeWidth="1.5" />
                    <path d="M12 16V8M12 8L8 12M12 8L16 12" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[15px] font-medium leading-tight text-[#111]">Choose a file or drag and<br />drop it here</p>

                <div className="mt-auto pt-8 pb-4">
                  <p className="text-[12px] text-[#555] px-2 leading-[1.4]">We recommend using high quality .jpg files less than 20 MB or .mp4 files less than 200 MB.</p>
                </div>
              </div>

              <hr className="w-full border-t border-gray-200 my-6" />

              <div>
                <button className="w-full py-3 bg-[#E9E9E9] text-[#111] text-[15px] font-bold rounded-full transition-colors hover:bg-[#E0E0E0]">
                  Save from URL
                </button>
              </div>
            </div>

            {/* Form Column */}
            <div className="flex-1 flex flex-col pl-0 md:pl-2">

              {/* Title (Floating inner label) */}
              <div className="flex flex-col bg-[#E9E9E9] border border-[#d3d3d3] rounded-2xl px-4 py-3 min-h-[72px]">
                <label className="text-[11px] font-normal text-[#767676] mb-1">Title</label>
                <input type="text" placeholder="Add a title" className="w-full bg-transparent border-none p-0 focus:ring-0 text-[18px] md:text-[22px] font-bold placeholder-[#767676] text-[#111] outline-none" />
              </div>

              {/* Description (Outer label) */}
              <div className="flex flex-col mt-6">
                <label className="text-[12px] font-normal text-[#111] mb-2 px-1">Description</label>
                <div className="flex flex-col bg-[#E9E9E9] border border-[#d3d3d3] rounded-2xl h-[120px] px-4 py-4">
                  <textarea placeholder="Add a detailed description" className="w-full h-full bg-transparent border-none p-0 focus:ring-0 text-[15px] placeholder-[#767676] text-[#111] outline-none resize-none" />
                </div>
              </div>

              {/* Link (Outer label) */}
              <div className="flex flex-col mt-6">
                <label className="text-[12px] font-normal text-[#111] mb-2 px-1">Link</label>
                <div className="flex flex-col bg-[#E9E9E9] border border-[#d3d3d3] rounded-2xl px-4 py-3.5">
                  <input type="text" placeholder="Add a link" className="w-full bg-transparent border-none p-0 focus:ring-0 text-[15px] placeholder-[#767676] text-[#111] outline-none" />
                </div>
              </div>

              {/* Board (Outer label) */}
              <div className="flex flex-col mt-6">
                <label className="text-[12px] font-normal text-[#111] mb-2 px-1">Board</label>
                <div className="relative">
                  <select className="w-full bg-[#E9E9E9] border border-[#d3d3d3] rounded-2xl px-4 py-3.5 appearance-none focus:outline-none text-[15px] text-[#767676] cursor-pointer">
                    <option>Choose a board</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676] pointer-events-none" />
                </div>
              </div>

              {/* Tagged topics (Floating inner label) */}
              <div className="flex flex-col bg-[#E9E9E9] border border-[#d3d3d3] rounded-2xl px-4 py-3 mt-6 min-h-[64px]">
                <label className="text-[11px] font-normal text-[#767676] mb-1">Tagged topics (0)</label>
                <input type="text" placeholder="Search for a tag" className="w-full bg-transparent border-none p-0 focus:ring-0 text-[15px] placeholder-[#767676] text-[#111] outline-none" />
              </div>

              {/* Tag Products */}
              <div className="flex flex-col mt-6">
                <p className="text-[12px] font-normal text-[#111] mb-2 px-1">Tag Products</p>
                <button className="self-start px-4 py-[10px] bg-[#E9E9E9] text-[#767676] font-semibold rounded-lg text-[13px] hover:bg-[#E0E0E0]">
                  Add products
                </button>
              </div>

              {/* More options */}
              <div className="flex items-center gap-1 mt-6 cursor-pointer w-max hover:opacity-80 transition-opacity">
                <p className="text-[13px] font-bold text-[#555]">More options</p>
                <ChevronDown className="w-[18px] h-[18px] text-[#555]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Drafts Panel */}
      <div className={`flex flex-col bg-white border-l border-[#d3d3d3] transition-all duration-300 ease-in-out ${isDraftsOpen ? 'w-[320px]' : 'w-[80px]'} shrink-0 z-20 h-full overflow-hidden`}>

        {/* Top section of right sidebar */}
        <div className="h-[72px] flex items-center justify-between px-4 border-b border-gray-200 shrink-0">
          {isDraftsOpen && (
            <h2 className="text-[16px] font-bold text-black pl-2 whitespace-nowrap">Pin drafts</h2>
          )}
          <button
            onClick={() => setIsDraftsOpen(!isDraftsOpen)}
            className={`w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors shrink-0 ${!isDraftsOpen ? 'mx-auto' : ''}`}
          >
            {isDraftsOpen ? <ChevronsRight className="w-[22px] h-[22px] text-black" /> : <ChevronsLeft className="w-[22px] h-[22px] text-black" />}
          </button>
        </div>

        {/* Content area of right sidebar */}
        {!isDraftsOpen ? (
          <div className="flex items-center justify-center py-4 border-b border-gray-200">
            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors shrink-0">
              <Plus className="w-[22px] h-[22px] text-gray-500" />
            </button>
          </div>
        ) : (
          <div className="p-4 bg-white flex-1 flex flex-col gap-2">
            <button className="w-full py-2.5 bg-[#E9E9E9] text-[#767676] text-[13px] font-bold rounded-lg transition-colors text-center hover:bg-[#E0E0E0]">
              Create new
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
