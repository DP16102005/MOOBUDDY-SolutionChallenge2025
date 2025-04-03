"use client"

import { useState, useEffect } from "react"

export function useSafeMount() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setMounted(true)
    }
    return () => {
      isMounted = false
    }
  }, [])

  return mounted
}

