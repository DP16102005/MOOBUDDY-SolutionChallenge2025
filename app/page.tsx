"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MilkIcon as Cow, Stethoscope, Pill, Calendar, Leaf, Heart } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import PreLoginNavBar from "@/components/PreLoginNavBar"

export default function Home() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, loading, router])

  return (
    <div className="min-h-screen overflow-y-auto">
      <PreLoginNavBar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center gradient-text">Welcome to MooBuddy</h1>
        <p className="text-xl mb-8 text-center">Your comprehensive platform for cow breeding and management</p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="gradient-text">For Breeders</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside mb-4">
                <li>Manage your cow inventory</li>
                <li>Find optimal breeding pairs</li>
                <li>Access AI-powered breed recognition</li>
              </ul>
              <Button asChild className="w-full gradient-bg text-white hover:opacity-90">
                <Link href="/register">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="gradient-text">For Cow Owners</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside mb-4">
                <li>Book veterinary appointments</li>
                <li>Shop for cow pharmaceuticals and equipment</li>
                <li>Get personalized breeding recommendations</li>
              </ul>
              <Button asChild className="w-full gradient-bg text-white hover:opacity-90">
                <Link href="/register">Join Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-semibold mb-6 text-center gradient-text">Our Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="card-hover">
            <CardHeader>
              <Cow className="h-12 w-12 mb-2 text-teal-500" />
              <CardTitle>Cow Management</CardTitle>
            </CardHeader>
            <CardContent>Easily manage your cow inventory and track important data.</CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader>
              <Stethoscope className="h-12 w-12 mb-2 text-indigo-500" />
              <CardTitle>AI Breed Recognition</CardTitle>
            </CardHeader>
            <CardContent>Use AI to recognize cow breeds and get breeding recommendations.</CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader>
              <Pill className="h-12 w-12 mb-2 text-teal-500" />
              <CardTitle>Pharmacy</CardTitle>
            </CardHeader>
            <CardContent>Shop for cow pharmaceuticals and equipment in our online store.</CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader>
              <Calendar className="h-12 w-12 mb-2 text-indigo-500" />
              <CardTitle>Vet Booking</CardTitle>
            </CardHeader>
            <CardContent>Easily schedule appointments with veterinarians through our platform.</CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-semibold mb-6 text-center gradient-text font-indianic">
          Kamdhenu Program Initiative
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="card-hover">
            <CardHeader>
              <Cow className="h-12 w-12 mb-2 text-teal-500 mx-auto" />
              <CardTitle className="text-center font-indianic">Raising Awareness</CardTitle>
            </CardHeader>
            <CardContent>
              Educating communities about the importance of indigenous cow breeds and their cultural significance.
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader>
              <Leaf className="h-12 w-12 mb-2 text-green-500 mx-auto" />
              <CardTitle className="text-center font-indianic">Enhancing Breeding Programs</CardTitle>
            </CardHeader>
            <CardContent>
              Implementing advanced breeding techniques to improve the genetic quality of Indian cow breeds.
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader>
              <Heart className="h-12 w-12 mb-2 text-red-500 mx-auto" />
              <CardTitle className="text-center font-indianic">Promoting Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              Highlighting the socio-economic and environmental advantages of maintaining indigenous cow breeds.
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="mb-4">Already have an account?</p>
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

