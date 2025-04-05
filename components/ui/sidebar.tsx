"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarVariants = cva(
  "fixed left-0 top-0 z-40 h-screen bg-background flex flex-col transition-all duration-300 ease-in-out",
  {
    variants: {
      isOpen: {
        true: "translate-x-0",
        false: "-translate-x-full",
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  },
)

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(({ className, isOpen, onClose, ...props }, ref) => {
  return (
    <>
      <div className={cn(sidebarVariants({ isOpen }), "w-64 p-4", className)} ref={ref} {...props}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">MooBuddy</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close sidebar">
            <X className="h-6 w-6" />
          </Button>
        </div>
        {props.children}
      </div>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30" onClick={onClose} aria-hidden="true" />}
    </>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex-1 overflow-auto", className)} {...props} />,
)
SidebarContent.displayName = "SidebarContent"

// Create a context with a default value
const SidebarContext = React.createContext<{
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
  isOpen: false,
  setIsOpen: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  // Handle client-side mounting
  React.useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setMounted(true)
    }
    return () => {
      isMounted = false
    }
  }, [])

  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
    }),
    [isOpen],
  )

  // Only render children after mounting to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    return { isOpen: false, setIsOpen: () => {} }
  }
  return context
}

export { Sidebar, SidebarContent }

