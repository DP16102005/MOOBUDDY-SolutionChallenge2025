"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

// Create a default context value
const defaultValue: AuthContextType = {
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
}

const AuthContext = createContext<AuthContextType>(defaultValue)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  // Check if user is logged in on initial load
  useEffect(() => {
    // Skip if not mounted yet (server-side)
    if (!mounted) return

    let isMounted = true
    const checkUserLoggedIn = () => {
      try {
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("moobuddy_user")
          if (storedUser && isMounted) {
            setUser(JSON.parse(storedUser))
          }
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    checkUserLoggedIn()

    return () => {
      isMounted = false
    }
  }, [mounted])

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        // In a real app, this would authenticate with your backend or Firebase
        // For demo purposes, we'll simulate a successful login
        const mockUser = {
          id: "user123",
          name: "Demo User",
          email: email,
          role: "farmer",
        }

        // Store user in localStorage for persistence
        if (typeof window !== "undefined") {
          localStorage.setItem("moobuddy_user", JSON.stringify(mockUser))
        }
        setUser(mockUser)
        router.push("/dashboard")
        return Promise.resolve()
      } catch (error) {
        console.error("Login error:", error)
        return Promise.reject(error)
      } finally {
        setLoading(false)
      }
    },
    [router],
  )

  const logout = useCallback(async () => {
    try {
      // In a real app, this would sign out from your backend or Firebase
      if (typeof window !== "undefined") {
        localStorage.removeItem("moobuddy_user")
      }
      setUser(null)
      router.push("/login")
      return Promise.resolve()
    } catch (error) {
      console.error("Logout error:", error)
      return Promise.reject(error)
    } finally {
      setLoading(false)
    }
  }, [router])

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user,
    }),
    [user, loading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

