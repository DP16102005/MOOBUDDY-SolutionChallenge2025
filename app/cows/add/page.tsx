"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { cowBreeds } from "@/lib/breeds"

export default function AddCow() {
  const router = useRouter()
  const [cowData, setCowData] = useState({
    name: "",
    breed: "",
    weight: "",
    milkFat: "",
    age: "",
    health: "",
    location: "",
    additionalInfo: "",
  })
  const [image, setImage] = useState<File | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCowData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setCowData((prev) => ({ ...prev, breed: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to add new cow
    console.log("New cow data:", cowData)
    console.log("Image:", image)
    // Redirect to cow list
    router.push("/cows")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 gradient-text">Add New Cow</h1>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Cow Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={cowData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="breed">Breed</Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select breed" />
                </SelectTrigger>
                <SelectContent>
                  {cowBreeds.map((breed) => (
                    <SelectItem key={breed.id} value={breed.id}>
                      {breed.name} ({breed.localName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                value={cowData.weight}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="milkFat">Milk Fat %</Label>
              <Input
                id="milkFat"
                name="milkFat"
                type="number"
                step="0.1"
                value={cowData.milkFat}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input id="age" name="age" type="number" value={cowData.age} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="health">Health Status</Label>
              <Input id="health" name="health" value={cowData.health} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={cowData.location} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={cowData.additionalInfo}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="image">Upload Photo or Video</Label>
              <Input id="image" type="file" accept="image/*,video/*" onChange={handleImageChange} />
            </div>
            <Button type="submit" className="w-full">
              Add Cow
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

