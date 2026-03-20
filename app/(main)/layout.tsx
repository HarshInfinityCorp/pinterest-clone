import { Navbar } from '@/components/navbar/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-16 pt-20 px-4">
          {children}
        </main>
      </div>
    </div>
  )
}
