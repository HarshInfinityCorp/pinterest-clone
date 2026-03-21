import { Navbar } from '@/components/navbar/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed full-height sidebar on the left */}
      <Sidebar />

      {/* Right-side content: navbar + page content, offset from sidebar */}
      <div className="lg:ml-[72px] flex flex-col min-h-screen">
        {/* Fixed navbar spans the right side */}
        <Navbar />
        {/* Page content sits below the navbar */}
        <main className="flex-1 pt-16 px-4">
          {children}
        </main>
      </div>
    </div>
  )
}
