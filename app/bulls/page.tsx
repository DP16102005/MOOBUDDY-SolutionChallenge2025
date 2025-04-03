"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getBullPlaceholder } from "@/utils/placeholders"
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"

const bulls = [
  {
    id: 1,
    name: "Shiva",
    breed: "Gir",
    age: 5,
    health: "Excellent",
    location: "Ahmedabad, Gujarat",
    availableForAI: true,
    price: 10000,
    owner: {
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      email: "rajesh@example.com",
      location: "Ahmedabad, Gujarat",
    },
  },
  {
    id: 2,
    name: "Krishna",
    breed: "Sahiwal",
    age: 4,
    health: "Good",
    location: "Jaipur, Rajasthan",
    availableForAI: false,
    price: 8000,
    owner: { name: "Priya Sharma", phone: "+91 9876543211", email: "priya@example.com", location: "Jaipur, Rajasthan" },
  },
  {
    id: 3,
    name: "Indra",
    breed: "Kankrej",
    age: 6,
    health: "Excellent",
    location: "Vadodara, Gujarat",
    availableForAI: true,
    price: 12000,
    owner: { name: "Amit Patel", phone: "+91 9876543212", email: "amit@example.com", location: "Vadodara, Gujarat" },
  },
]

function OwnerDetails({ owner }: { owner: { name: string; phone: string; email: string; location: string } }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Owner Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Owner Details</DialogTitle>
          <DialogDescription>Contact information for the bull's owner</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {owner.name}
          </p>
          <p>
            <strong>Phone:</strong> {owner.phone}
          </p>
          <p>
            <strong>Email:</strong> {owner.email}
          </p>
          <p>
            <strong>Location:</strong> {owner.location}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function BullManagement() {
  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold gradient-text">Bull Management</h1>
          <Button asChild>
            <Link href="/bulls/add">
              <Plus className="mr-2 h-4 w-4" /> List New Bull
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bulls.map((bull) => (
            <Card key={bull.id} className="card-hover">
              <CardHeader>
                <CardTitle>{bull.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative mb-4">
                  <Image
                    src={getBullPlaceholder(bull.name, bull.id) || "/placeholder.svg"}
                    alt={bull.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <p>
                  <strong>Breed:</strong> {bull.breed}
                </p>
                <p>
                  <strong>Age:</strong> {bull.age} years
                </p>
                <p>
                  <strong>Health:</strong> {bull.health}
                </p>
                <p>
                  <strong>Location:</strong> {bull.location}
                </p>
                <p>
                  <strong>Available for AI:</strong> {bull.availableForAI ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Price:</strong> ₹{bull.price.toLocaleString("en-IN")}
                </p>
                <div className="mt-4 space-x-2">
                  <Button variant="outline" asChild>
                    <Link href={`/bulls/${bull.id}`}>View Details</Link>
                  </Button>
                  <OwnerDetails owner={bull.owner} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

