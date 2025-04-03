"use client"

import { type ReactNode, useEffect, useState } from "react"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import MobileNavBar from "@/components/MobileNavBar"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import ErrorBoundary from "@/components/ErrorBoundary"

export default function AppLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  useEffect(() => {
    // Only redirect if we're mounted, not loading, and the user is not authenticated
    if (mounted && !loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading, router, mounted])

  // Show loading state
  if (loading || !mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null
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

