"use client";

import { useState } from "react";
import { Search, Bell, MessageCircle, ChevronDown, Plus } from "lucide-react";
import Link from "next/link";

export default function Header({ isLoggedIn = false }) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isLoggedIn) {
    return (
      <header className="flex items-center justify-between px-6 py-4 bg-white">
        <Link href="/" className="flex items-center gap-2">
          <svg
            className="w-8 h-8 text-[#E60023]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
          </svg>
          <span className="text-xl font-bold text-[#E60023]">Pinterest</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="font-semibold text-gray-800 hover:text-black">
            About
          </Link>
          <Link href="#" className="font-semibold text-gray-800 hover:text-black">
            Business
          </Link>
          <Link href="#" className="font-semibold text-gray-800 hover:text-black">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 font-semibold text-white bg-[#E60023] hover:bg-[#ad081b] rounded-full transition-colors"
          >
            Sign up
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 flex items-center gap-4 px-4 py-3 bg-white">
      <Link href="/home" className="flex-shrink-0">
        <svg
          className="w-8 h-8 text-[#E60023]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      </Link>

      <Link
        href="/home"
        className="px-4 py-2 font-semibold text-white bg-gray-900 rounded-full text-sm hidden sm:block"
      >
        Home
      </Link>

      <Link
        href="/create"
        className="px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100 rounded-full text-sm hidden sm:flex items-center gap-1"
      >
        Create
        <ChevronDown className="w-4 h-4" />
      </Link>

      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-6 h-6 text-gray-700" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MessageCircle className="w-6 h-6 text-gray-700" />
        </button>
        <Link href="/profile" className="ml-2">
          <img
            src="https://i.pravatar.cc/150?u=current"
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer hover:opacity-80"
          />
        </Link>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronDown className="w-4 h-4 text-gray-700" />
        </button>
      </div>
    </header>
  );
}
