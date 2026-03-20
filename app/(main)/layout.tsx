import { Navbar } from '@/components/navbar/Navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-[80px] px-4">
        {children}
      </main>
    </div>
  )
}
