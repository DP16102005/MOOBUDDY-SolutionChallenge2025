"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MilkIcon as Cow, Pill, Calendar, Settings, BellIcon as Bull, Camera, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar"
import { useSafeMount } from "@/hooks/use-safe-mount"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Database, label: "Cow Management", href: "/cow-management" },
  { icon: Cow, label: "Cows", href: "/cows" },
  { icon: Bull, label: "Bulls", href: "/bulls" },
  { icon: Camera, label: "Breed Recognition", href: "/breed-recognition" },
  { icon: Pill, label: "Pharmacy", href: "/pharmacy" },
  { icon: Calendar, label: "Vet Booking", href: "/vet/book" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const { isOpen, setIsOpen } = useSidebar()
  const mounted = useSafeMount()

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <SidebarContent>
        <h2 className="text-lg font-semibold">MooBuddy</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </SidebarContent>
    </Sidebar>
  )
}

