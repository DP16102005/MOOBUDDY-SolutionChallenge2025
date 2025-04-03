"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useSafeMount } from "@/hooks/use-safe-mount"

export default function PreLoginNavBar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const mounted = useSafeMount()

  // Basic version for SSR
  if (!mounted) {
    return (
      <header className="bg-gradient-to-r from-teal-500 to-indigo-600 text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Moo<span className="text-teal-200">Buddy</span>
          </Link>
          <div className="space-x-2">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Login
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white/20">
              Register
            </Button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-gradient-to-r from-teal-500 to-indigo-600 text-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Moo<span className="text-teal-200">Buddy</span>
        </Link>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white hover:bg-white/20"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/20" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="outline" className="text-white border-white hover:bg-white/20" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

