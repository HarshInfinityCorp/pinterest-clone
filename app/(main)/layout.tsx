import { Navbar } from '@/components/navbar/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="lg:ml-[72px]">
        <Navbar />
        <main className="pt-20 px-4">
          {children}
        </main>
      </div>
    </div>
  )
}

