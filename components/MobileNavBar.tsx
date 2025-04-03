"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MilkIcon as Cow, Pill, Calendar, Database } from "lucide-react"
import { useSafeMount } from "@/hooks/use-safe-mount"

const navItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Database, label: "Manage", href: "/cow-management" },
  { icon: Cow, label: "Cows", href: "/cows" },
  { icon: Pill, label: "Pharmacy", href: "/pharmacy" },
  { icon: Calendar, label: "Vet", href: "/vet/book" },
]

export default function MobileNavBar() {
  const pathname = usePathname()
  const mounted = useSafeMount()

  if (!mounted) {
    return null
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-indigo-600 text-white z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center py-2 px-3 ${
              pathname === item.href ? "text-teal-200" : "text-white"
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

