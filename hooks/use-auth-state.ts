"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"

export function useAuthState() {
  const { isAuthenticated, loading, user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  return {
    isAuthenticated,
    loading: loading || !mounted,
    user,
    isReady: mounted && !loading,
  }
}

