"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { getImageUrl } from "@/utils/placeholders"

interface ImageUploadProps {
  name: string
  id?: number | string
  type: "cow" | "bull"
  existingUrl?: string | null
  onImageChange?: (file: File) => void
  className?: string
  width?: number
  height?: number
}

export default function ImageUpload({
  name,
  id,
  type,
  existingUrl = null,
  onImageChange,
  className = "",
  width = 300,
  height = 300,
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string>(() => getImageUrl(existingUrl, name, type, id))
  const [file, setFile] = useState<File | null>(null)

  // Update image URL when props change
  useEffect(() => {
    if (!file) {
      setImageUrl(getImageUrl(existingUrl, name, type, id))
    }
  }, [existingUrl, name, type, id, file])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setImageUrl(URL.createObjectURL(selectedFile))

      if (onImageChange) {
        onImageChange(selectedFile)
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={name}
        width={width}
        height={height}
        className="rounded-md object-cover"
      />
      <label htmlFor={`upload-${id || name}`} className="absolute bottom-2 right-2 cursor-pointer">
        <Button size="sm" variant="secondary" className="opacity-80 hover:opacity-100">
          <Upload className="h-4 w-4 mr-1" />
          Upload
        </Button>
        <input
          id={`upload-${id || name}`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  )
}

