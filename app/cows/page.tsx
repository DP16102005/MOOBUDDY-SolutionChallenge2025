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
import { getCowPlaceholder } from "@/utils/placeholders"
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"

const cows = [
  {
    id: 1,
    name: "Lakshmi",
    breed: "Gir",
    weight: 400,
    milkFat: 4.5,
    value: 75000,
    owner: {
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      email: "rajesh@example.com",
      location: "Ahmedabad, Gujarat",
    },
  },
  {
    id: 2,
    name: "Nandini",
    breed: "Sahiwal",
    weight: 450,
    milkFat: 4.2,
    value: 80000,
    owner: { name: "Priya Sharma", phone: "+91 9876543211", email: "priya@example.com", location: "Jaipur, Rajasthan" },
  },
  {
    id: 3,
    name: "Ganga",
    breed: "Red Sindhi",
    weight: 380,
    milkFat: 4.0,
    value: 70000,
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
          <DialogDescription>Contact information for the cow's owner</DialogDescription>
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

export default function CowManagement() {
  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold gradient-text">Cow Management</h1>
          <Button asChild>
            <Link href="/cows/add">
              <Plus className="mr-2 h-4 w-4" /> Add New Cow
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cows.map((cow) => (
            <Card key={cow.id} className="card-hover">
              <CardHeader>
                <CardTitle>{cow.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative mb-4">
                  <Image
                    src={getCowPlaceholder(cow.name, cow.id) || "/placeholder.svg"}
                    alt={cow.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <p>
                  <strong>Breed:</strong> {cow.breed}
                </p>
                <p>
                  <strong>Weight:</strong> {cow.weight} kg
                </p>
                <p>
                  <strong>Milk Fat %:</strong> {cow.milkFat}%
                </p>
                <p>
                  <strong>Value:</strong> ₹{cow.value.toLocaleString("en-IN")}
                </p>
                <div className="mt-4 space-x-2">
                  <Button variant="outline" asChild>
                    <Link href={`/cows/${cow.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/breeding/match/${cow.id}`}>Find Match</Link>
                  </Button>
                  <OwnerDetails owner={cow.owner} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

