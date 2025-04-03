"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import MobileNavBar from "@/components/MobileNavBar"
import ErrorBoundary from "@/components/ErrorBoundary"
import { isAuthenticated } from "@/utils/auth"

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check authentication on client side
    const checkAuth = () => {
      const authenticated = isAuthenticated()
      setIsLoggedIn(authenticated)
      setLoading(false)

      if (!authenticated) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return null // Will redirect to login
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background pb-16 md:pb-0">{children}</main>
          <MobileNavBar />
        </div>
      </div>
    </ErrorBoundary>
  )
}

