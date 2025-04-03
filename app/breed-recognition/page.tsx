"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { cowBreeds, bullBreeds } from "@/lib/breeds"
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"

export default function BreedRecognition() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [recognizedBreed, setRecognizedBreed] = useState<string | null>(null)
  const [compatibleBreeds, setCompatibleBreeds] = useState<string[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const suggestCompatibleBreeds = (recognizedBreed: string) => {
    // This is a simplified suggestion logic. In a real application, you'd use more sophisticated matching algorithms.
    const allBreeds = [...cowBreeds, ...bullBreeds]
    return allBreeds
      .filter((breed) => breed.name !== recognizedBreed)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((breed) => breed.name)
  }

  const handleRecognize = async () => {
    if (!selectedFile) return

    // TODO: Implement actual AI/ML model for breed recognition
    // For now, we'll simulate the recognition process
    const simulateRecognition = () => {
      const allBreeds = [...cowBreeds, ...bullBreeds]
      const randomBreed = allBreeds[Math.floor(Math.random() * allBreeds.length)]
      return randomBreed.name
    }

    const recognizedBreed = simulateRecognition()
    setRecognizedBreed(recognizedBreed)

    const compatibleBreeds = suggestCompatibleBreeds(recognizedBreed)
    setCompatibleBreeds(compatibleBreeds)
  }

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 gradient-text">AI Breed Recognition</h1>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Upload an Image for Breed Recognition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
            {previewUrl && (
              <div className="mt-4">
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Preview"
                  width={300}
                  height={300}
                  className="rounded-md object-cover"
                />
              </div>
            )}
            <Button onClick={handleRecognize} disabled={!selectedFile} className="w-full">
              Recognize Breed
            </Button>
            {recognizedBreed && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Recognized Breed:</h2>
                <p className="text-lg">{recognizedBreed}</p>
              </div>
            )}
            {compatibleBreeds.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Compatible Breeding Partners:</h2>
                <ul className="list-disc list-inside">
                  {compatibleBreeds.map((breed, index) => (
                    <li key={index}>{breed}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  )
}

