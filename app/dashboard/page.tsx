"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { MilkIcon as Cow, Calendar, Bell, TrendingUp, Leaf, Heart } from "lucide-react"
import { AIRecommendationWidget } from "@/components/AIRecommendationWidget"
import ErrorBoundary from "@/components/ErrorBoundary"
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"

export default function Dashboard() {
  return (
    <ErrorBoundary>
      <AuthenticatedLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold gradient-text">Welcome, Farmer</h1>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-hover animate-slide-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cows</CardTitle>
                <Cow className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card className="card-hover animate-slide-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Breeding Pairs</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 from last month</p>
              </CardContent>
            </Card>
            <Card className="card-hover animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Next: Tomorrow, 10:00 AM</p>
              </CardContent>
            </Card>
            <Card className="card-hover animate-slide-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">3 new since last login</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold gradient-text">Quick Actions</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button asChild className="btn animate-slide-in" style={{ animationDelay: "0.4s" }}>
                  <Link href="/cow-management">
                    <Cow className="mr-2 h-4 w-4" /> Cow Management
                  </Link>
                </Button>
                <Button asChild className="btn animate-slide-in" style={{ animationDelay: "0.5s" }}>
                  <Link href="/breeding/match">
                    <TrendingUp className="mr-2 h-4 w-4" /> Find Breeding Match
                  </Link>
                </Button>
                <Button asChild className="btn animate-slide-in" style={{ animationDelay: "0.6s" }}>
                  <Link href="/vet/book">
                    <Calendar className="mr-2 h-4 w-4" /> Book Vet Appointment
                  </Link>
                </Button>
                <Button asChild className="btn animate-slide-in" style={{ animationDelay: "0.7s" }}>
                  <Link href="/pharmacy">
                    <Cow className="mr-2 h-4 w-4" /> Shop Pharmacy
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 gradient-text">Recent Activity</h2>
              <Card className="card animate-fade-in">
                <CardContent className="p-0">
                  <ul className="divide-y divide-gray-200">
                    <li className="p-4 hover:bg-muted/50 transition-colors duration-200">
                      Added new cow: Lakshmi (Gir)
                    </li>
                    <li className="p-4 hover:bg-muted/50 transition-colors duration-200">
                      Scheduled vet appointment for Nandini
                    </li>
                    <li className="p-4 hover:bg-muted/50 transition-colors duration-200">
                      Purchased calcium supplements from pharmacy
                    </li>
                    <li className="p-4 hover:bg-muted/50 transition-colors duration-200">
                      Found breeding match for Ganga
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 gradient-text font-indianic">Nearby Resources</h2>
              <Card className="card animate-fade-in">
                <CardContent className="p-4">
                  <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500 rounded-lg">
                    Google Maps Integration Placeholder
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 gradient-text font-indianic">AI Breeding Recommendations</h2>
              <AIRecommendationWidget />
            </div>
          </div>

          <div className="mt-12 pb-16 md:pb-0">
            <h2 className="text-2xl font-semibold mb-6 gradient-text font-indianic">Kamdhenu Program Initiative</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="card animate-slide-in" style={{ animationDelay: "0.8s" }}>
                <CardHeader>
                  <Cow className="h-12 w-12 mb-2 text-teal-500 mx-auto" />
                  <CardTitle className="text-center font-indianic">Raising Awareness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-foreground">
                    Educating communities about the importance of indigenous cow breeds and their cultural significance.
                  </p>
                </CardContent>
              </Card>
              <Card className="card animate-slide-in" style={{ animationDelay: "0.9s" }}>
                <CardHeader>
                  <Leaf className="h-12 w-12 mb-2 text-green-500 mx-auto" />
                  <CardTitle className="text-center font-indianic">Enhancing Breeding Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-foreground">
                    Implementing advanced breeding techniques to improve the genetic quality of Indian cow breeds.
                  </p>
                </CardContent>
              </Card>
              <Card className="card animate-slide-in" style={{ animationDelay: "1s" }}>
                <CardHeader>
                  <Heart className="h-12 w-12 mb-2 text-red-500 mx-auto" />
                  <CardTitle className="text-center font-indianic">Promoting Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-foreground">
                    Highlighting the socio-economic and environmental advantages of maintaining indigenous cow breeds.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </ErrorBoundary>
  )
}

