"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const cows = [
  { id: 1, name: "Lakshmi", breed: "Gir" },
  { id: 2, name: "Nandini", breed: "Sahiwal" },
  { id: 3, name: "Ganga", breed: "Red Sindhi" },
]

const bulls = [
  { id: 1, name: "Shiva", breed: "Gir", age: 3, weight: 550, fertilityScore: 95, breedingFee: 5000 },
  { id: 2, name: "Krishna", breed: "Sahiwal", age: 4, weight: 600, fertilityScore: 92, breedingFee: 4500 },
  { id: 3, name: "Indra", breed: "Red Sindhi", age: 3, weight: 500, fertilityScore: 90, breedingFee: 4000 },
  { id: 4, name: "Arjun", breed: "Tharparkar", age: 5, weight: 580, fertilityScore: 93, breedingFee: 5500 },
]

export default function BreedingMatch() {
  const [selectedCow, setSelectedCow] = useState("")
  const [matchedBulls, setMatchedBulls] = useState<typeof bulls>([])

  const handleCowSelect = (cowId: string) => {
    setSelectedCow(cowId)
    setMatchedBulls([])
  }

  const findMatches = () => {
    const cow = cows.find((c) => c.id.toString() === selectedCow)
    if (cow) {
      const matches = bulls.filter((bull) => bull.breed === cow.breed)
      setMatchedBulls(matches)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 gradient-text">Breeding Pairing Options</h1>

      <div className="mb-8">
        <Label htmlFor="cow-select">Select a Cow</Label>
        <Select onValueChange={handleCowSelect} value={selectedCow}>
          <SelectTrigger id="cow-select">
            <SelectValue placeholder="Choose a cow" />
          </SelectTrigger>
          <SelectContent>
            {cows.map((cow) => (
              <SelectItem key={cow.id} value={cow.id.toString()}>
                {cow.name} ({cow.breed})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={findMatches} disabled={!selectedCow} className="mb-8">
        Find Match
      </Button>

      {matchedBulls.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Potential Matches</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedBulls.map((bull) => (
              <Card key={bull.id}>
                <CardHeader>
                  <CardTitle>{bull.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Breed:</strong> {bull.breed}
                  </p>
                  <p>
                    <strong>Age:</strong> {bull.age} years
                  </p>
                  <p>
                    <strong>Weight:</strong> {bull.weight} kg
                  </p>
                  <p>
                    <strong>Fertility Score:</strong> {bull.fertilityScore}%
                  </p>
                  <p>
                    <strong>Breeding Fee:</strong> ₹{bull.breedingFee.toLocaleString("en-IN")}
                  </p>
                  <Button className="mt-4 w-full">Select Match</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-600">
            Note: As the cow owner, you are responsible for paying the breeding fee to the bull owner for natural
            breeding or artificial insemination services.
          </p>
        </>
      )}

      {matchedBulls.length === 0 && selectedCow && (
        <p>No matching bulls found. Please try a different cow or check back later for new bulls.</p>
      )}
    </div>
  )
}

