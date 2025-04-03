"use client"

import type { ReactNode } from "react"
import AppLayout from "./AppLayout"

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>
}

