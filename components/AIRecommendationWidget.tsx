"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type RecommendationData = {
  name: string
  score: number
}

export function AIRecommendationWidget() {
  const [weight, setWeight] = useState("")
  const [milkFat, setMilkFat] = useState("")
  const [recommendations, setRecommendations] = useState<RecommendationData[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulating AI recommendation
    const simulatedRecommendations: RecommendationData[] = [
      { name: "Gir Bull A", score: Math.random() * 100 },
      { name: "Sahiwal Bull B", score: Math.random() * 100 },
      { name: "Red Sindhi Bull C", score: Math.random() * 100 },
    ]
    setRecommendations(simulatedRecommendations)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="font-indianic text-2xl text-center gradient-text">AI Breeding Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <Label htmlFor="weight">Cow Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              className="input"
            />
          </div>
          <div>
            <Label htmlFor="milkFat">Milk Fat Percentage</Label>
            <Input
              id="milkFat"
              type="number"
              step="0.1"
              value={milkFat}
              onChange={(e) => setMilkFat(e.target.value)}
              required
              className="input"
            />
          </div>
          <Button type="submit" className="btn w-full">
            Get Recommendations
          </Button>
        </form>

        {recommendations.length > 0 && (
          <div className="mt-6 animate-slide-in">
            <h3 className="text-lg font-semibold mb-4 gradient-text">Recommended Breeding Pairs</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={recommendations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

