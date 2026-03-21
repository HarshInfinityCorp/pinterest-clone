import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth/AuthContext'

export const metadata: Metadata = {
  title: 'Pinterest Clone',
  description: 'A Pinterest clone built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body className="min-h-screen bg-white">
        <AuthProvider>
          {children}
        </AuthProvider>
=======
      <body className="min-h-screen bg-white text-pinterest-black" suppressHydrationWarning={true}>
        {children}
>>>>>>> dd5bbd3eca874db92ad0a096a09c58395f462e2d
      </body>
    </html>
  )
}
