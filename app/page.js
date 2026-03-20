import Header from "@/components/Header";
import MasonryGrid from "@/components/MasonryGrid";
import { mockPins } from "@/lib/data";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get your next
            </h1>
            <div className="text-4xl md:text-6xl font-bold text-[#E60023] mb-8">
              idea
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover recipes, home ideas, style inspiration and other ideas to try.
            </p>

            <div className="flex justify-center gap-4">
              <Link
                href="/login"
                className="px-8 py-3 bg-[#E60023] text-white font-semibold rounded-full hover:bg-[#ad081b] transition-colors"
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 bg-gray-100 text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition-colors"
              >
                Log in
              </Link>
            </div>
          </div>

          {/* Preview Grid */}
          <div className="mt-16">
            <MasonryGrid pins={mockPins.slice(0, 12)} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E60023] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Search for an idea</h3>
              <p className="text-gray-600">What do you want to try next? Think of something you love.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#E60023] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Save what you like</h3>
              <p className="text-gray-600">Collect your favorites so you can easily find them later.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#E60023] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Share with others</h3>
              <p className="text-gray-600">See what others are saving and get inspired together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <svg className="w-8 h-8 text-[#E60023]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
              <span className="text-xl font-bold">Pinterest Clone</span>
            </div>
            <p className="text-gray-500">© 2025 Pinterest Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
