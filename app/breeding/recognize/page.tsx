"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function AIBreedRecognition() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [recognizedBreed, setRecognizedBreed] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleRecognize = () => {
    // TODO: Implement actual AI recognition
    // For now, we'll just set a random breed
    const breeds = ["Holstein", "Jersey", "Angus", "Hereford", "Simmental"]
    setRecognizedBreed(breeds[Math.floor(Math.random() * breeds.length)])
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">AI Breed Recognition</h1>
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <Label htmlFor="cow-image">Upload Cow Image</Label>
          <Input id="cow-image" type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {previewUrl && (
          <div className="mb-4">
            <Image
              src={previewUrl || "/placeholder.svg"}
              alt="Cow preview"
              width={300}
              height={300}
              className="rounded-md"
            />
          </div>
        )}
        <Button onClick={handleRecognize} disabled={!selectedFile}>
          Recognize Breed
        </Button>
        {recognizedBreed && (
          <div className="mt-4">
            <p>
              <strong>Recognized Breed:</strong> {recognizedBreed}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

