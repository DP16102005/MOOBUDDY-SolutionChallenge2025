"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"

const products = [
  { id: 1, name: "Cow Vitamin Supplement", price: 2199, category: "Pharmaceuticals" },
  { id: 2, name: "Automatic Milking Machine", price: 149999, category: "Equipment" },
  { id: 3, name: "Hoof Trimmer", price: 11999, category: "Equipment" },
  { id: 4, name: "Antibiotic Ointment", price: 1099, category: "Pharmaceuticals" },
  { id: 5, name: "Cow Brush", price: 5999, category: "Equipment" },
  { id: 6, name: "Calcium Supplement", price: 2999, category: "Pharmaceuticals" },
]

export default function Pharmacy() {
  const [cart, setCart] = useState<{ [key: number]: number }>({})

  const addToCart = (productId: number) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }))
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[productId] > 1) {
        newCart[productId]--
      } else {
        delete newCart[productId]
      }
      return newCart
    })
  }

  const cartTotal = Object.entries(cart).reduce((total, [productId, quantity]) => {
    const product = products.find((p) => p.id === Number(productId))
    return total + (product ? product.price * quantity : 0)
  }, 0)

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Cow Pharmacy & Equipment</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="card-hover">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative mb-4">
                  <Image
                    src={`/placeholder.svg?height=200&width=200&text=${product.name}`}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>
                <p>
                  <strong>Price:</strong> ₹{product.price.toLocaleString("en-IN")}
                </p>
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                <Button className="mt-4 w-full" onClick={() => addToCart(product.id)}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Shopping Cart</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(cart).map(([productId, quantity]) => {
              const product = products.find((p) => p.id === Number(productId))
              return product ? (
                <div key={productId} className="flex justify-between items-center mb-2">
                  <span>{product.name}</span>
                  <div className="flex items-center">
                    <Button variant="outline" size="icon" onClick={() => removeFromCart(product.id)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => addToCart(product.id)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : null
            })}
            <div className="flex justify-between items-center mt-4 font-bold">
              <span>Total:</span>
              <span>₹{cartTotal.toLocaleString("en-IN")}</span>
            </div>
            <Button className="w-full mt-4">
              <ShoppingCart className="mr-2 h-4 w-4" /> Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  )
}

