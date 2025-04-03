import "./globals.css"
import { Inter } from "next/font/google"
import ClientLayout from "@/components/layouts/ClientLayout"
import type React from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "MooBuddy - Cow Breeding Platform",
  description: "A comprehensive platform for cow breeding and management",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}



import './globals.css'