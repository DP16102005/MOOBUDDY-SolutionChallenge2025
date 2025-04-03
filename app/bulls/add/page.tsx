"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { bullBreeds } from "@/lib/breeds"
import { Switch } from "@/components/ui/switch"

export default function AddBull() {
  const router = useRouter()
  const [bullData, setBullData] = useState({
    name: "",
    breed: "",
    age: "",
    health: "",
    location: "",
    availableForAI: false,
    price: "",
    contactInfo: "",
    additionalInfo: "",
    serviceType: "",
  })
  const [image, setImage] = useState<File | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBullData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setBullData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setBullData((prev) => ({ ...prev, availableForAI: checked }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to add new bull
    console.log("New bull data:", bullData)
    console.log("Image:", image)
    // Redirect to bull list
    router.push("/bulls")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 gradient-text">List Your Bull for Breeding</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Bull Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={bullData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="breed">Breed</Label>
              <Select onValueChange={(value) => handleSelectChange("breed", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select breed" />
                </SelectTrigger>
                <SelectContent>
                  {bullBreeds.map((breed) => (
                    <SelectItem key={breed.id} value={breed.id}>
                      {breed.name} ({breed.localName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input id="age" name="age" type="number" value={bullData.age} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="health">Health Status</Label>
              <Input id="health" name="health" value={bullData.health} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={bullData.location} onChange={handleInputChange} required />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="availableForAI" checked={bullData.availableForAI} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="availableForAI">Available for AI (Artificial Insemination)</Label>
            </div>
            <div>
              <Label htmlFor="serviceType">Service Type</Label>
              <Select onValueChange={(value) => handleSelectChange("serviceType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural Service</SelectItem>
                  <SelectItem value="ai">Artificial Insemination (AI)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={bullData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="contactInfo">Contact Information</Label>
              <Input
                id="contactInfo"
                name="contactInfo"
                value={bullData.contactInfo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={bullData.additionalInfo}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="image">Upload Photo or Video</Label>
              <Input id="image" type="file" accept="image/*,video/*" onChange={handleImageChange} />
            </div>
            <Button type="submit" className="w-full">
              List Bull
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

