"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"

const vets = [
  { id: 1, name: "Dr. Yash Oza", specialty: "General" },
  { id: 2, name: "Dr. Harsh Dudh", specialty: "Surgery" },
  { id: 3, name: "Dr. Man Gajjar", specialty: "Nutrition" },
  { id: 4, name: "Dr. Devarsh Panchal", specialty: "Reproduction" },
  { id: 5, name: "Dr. Rudra Patel", specialty: "Nutrition" },
]

export default function VetBooking() {
  const [selectedVet, setSelectedVet] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [reason, setReason] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to book appointment
    console.log("Appointment details:", { selectedVet, selectedDate, selectedTime, reason })
    // Reset form or show confirmation
  }

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Book a Veterinary Appointment</h1>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="vet-select">Select a Veterinarian</Label>
                  <Select onValueChange={setSelectedVet} value={selectedVet}>
                    <SelectTrigger id="vet-select">
                      <SelectValue placeholder="Choose a vet" />
                    </SelectTrigger>
                    <SelectContent>
                      {vets.map((vet) => (
                        <SelectItem key={vet.id} value={vet.id.toString()}>
                          {vet.name} ({vet.specialty})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Appointment Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Appointment Time</Label>
                  <Input type="time" id="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="reason">Reason for Visit</Label>
                  <Input
                    type="text"
                    id="reason"
                    placeholder="Brief description of the issue"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Book Appointment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

