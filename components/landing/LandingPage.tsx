'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Pinterest landing page images - different heights for masonry effect
const landingImages = [
  { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', height: 'h-64', delay: '0s' },
  { url: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400', height: 'h-80', delay: '0.1s' },
  { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', height: 'h-56', delay: '0.2s' },
  { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', height: 'h-72', delay: '0.3s' },
  { url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', height: 'h-96', delay: '0.4s' },
  { url: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400', height: 'h-60', delay: '0.5s' },
  { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', height: 'h-80', delay: '0.6s' },
  { url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400', height: 'h-64', delay: '0.7s' },
  { url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400', height: 'h-72', delay: '0.8s' },
  { url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', height: 'h-56', delay: '0.9s' },
  { url: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400', height: 'h-80', delay: '1s' },
  { url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', height: 'h-64', delay: '1.1s' },
]

const keywords = ['meal', 'home', 'outfit', 'idea', 'weekend']

export function LandingPage() {
  const [currentKeyword, setCurrentKeyword] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % keywords.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-white/95 backdrop-blur-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#E60023">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
          <span className="text-xl font-bold text-[#E60023]">Pinterest</span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Link 
            href="/login"
            className="px-4 py-2 rounded-full font-semibold text-sm text-black hover:bg-gray-100 transition-colors"
          >
            Log in
          </Link>
          <Link 
            href="/signup"
            className="px-4 py-2 rounded-full font-semibold text-sm bg-[#E60023] hover:bg-[#AD081B] text-white transition-colors"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 min-h-screen flex flex-col">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white z-10 pointer-events-none" 
             style={{ top: '40%' }} />

        {/* Animated Masonry Grid Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="flex gap-4 justify-center px-4 animate-scroll-up">
            {/* Column 1 */}
            <div className="flex flex-col gap-4 mt-20">
              {landingImages.slice(0, 4).map((img, i) => (
                <div 
                  key={i}
                  className={`w-48 ${img.height} rounded-2xl overflow-hidden shadow-lg opacity-80`}
                  style={{ animationDelay: img.delay }}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-4 mt-0">
              {landingImages.slice(4, 8).map((img, i) => (
                <div 
                  key={i}
                  className={`w-48 ${img.height} rounded-2xl overflow-hidden shadow-lg opacity-80`}
                  style={{ animationDelay: img.delay }}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            {/* Column 3 */}
            <div className="flex flex-col gap-4 mt-32">
              {landingImages.slice(8, 12).map((img, i) => (
                <div 
                  key={i}
                  className={`w-48 ${img.height} rounded-2xl overflow-hidden shadow-lg opacity-80`}
                  style={{ animationDelay: img.delay }}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 mt-32">
          <h1 className="text-6xl md:text-8xl font-bold text-[#C28E00] mb-4">
            Get your next
          </h1>
          
          {/* Animated Keyword */}
          <div className="h-20 md:h-28 overflow-hidden">
            {keywords.map((keyword, index) => (
              <div
                key={keyword}
                className={`text-5xl md:text-7xl font-bold transition-all duration-500 ${
                  index === currentKeyword 
                    ? 'text-[#C28E00] translate-y-0 opacity-100' 
                    : 'text-[#C28E00]/30 -translate-y-full opacity-0'
                }`}
                style={{ 
                  position: index === currentKeyword ? 'relative' : 'absolute',
                  transform: index === currentKeyword ? 'translateY(0)' : 'translateY(100%)'
                }}
              >
                {keyword}
              </div>
            ))}
          </div>

          <p className="text-lg text-gray-600 mt-8 max-w-md">
            Join Pinterest to discover and save creative ideas
          </p>

          {/* CTA Button */}
          <Link 
            href="/signup"
            className="mt-8 px-8 py-4 rounded-full font-semibold text-lg bg-[#E60023] hover:bg-[#AD081B] text-white transition-colors shadow-lg"
          >
            Explore
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-20 pb-8 flex justify-center">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* How it works Section */}
      <section className="py-20 px-6 bg-[#FFFD92]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#C28E00] mb-6">
                Search for an idea
              </h2>
              <p className="text-lg text-gray-700">
                What do you want to try next? Think of something you&apos;re into—
                like &quot;easy chicken dinner&quot;—and see what you find.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300" 
                alt="Food"
                className="rounded-2xl shadow-lg w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300" 
                alt="Cooking"
                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Save ideas Section */}
      <section className="py-20 px-6 bg-[#DAFFF6]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300" 
                alt="Plant"
                className="rounded-2xl shadow-lg w-full h-56 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300" 
                alt="Monstera"
                className="rounded-2xl shadow-lg w-full h-48 object-cover mt-12"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-[#006B6B] mb-6">
                Save ideas you like
              </h2>
              <p className="text-lg text-gray-700">
                Collect your favorites so you can get back to them later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#E60023">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
            <span className="text-xl font-bold text-[#E60023]">Pinterest</span>
          </div>
          <p className="text-gray-600 text-sm">
            © 2024 Pinterest Clone. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
