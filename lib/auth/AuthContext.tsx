'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for auth state
    const stored = localStorage.getItem('pinterest-auth')
    if (stored === 'true') {
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, [])

  const login = () => {
    setIsLoggedIn(true)
    localStorage.setItem('pinterest-auth', 'true')
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.setItem('pinterest-auth', 'false')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#E60023] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
