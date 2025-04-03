"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cowBreeds } from "@/lib/breeds"
import { Plus, MoreVertical, Edit, Trash, Filter, Download, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"

// Define cow type
type Cow = {
  id: number
  name: string
  breed: string
  age: number
  weight: number
  milkFat: number
  health: string
  value: number
  lastCheckup: string
  status: "active" | "sold" | "deceased"
}

// Sample data
const initialCows: Cow[] = [
  {
    id: 1,
    name: "Lakshmi",
    breed: "Gir",
    age: 4,
    weight: 400,
    milkFat: 4.5,
    health: "Excellent",
    value: 75000,
    lastCheckup: "2023-10-15",
    status: "active",
  },
  {
    id: 2,
    name: "Nandini",
    breed: "Sahiwal",
    age: 3,
    weight: 450,
    milkFat: 4.2,
    health: "Good",
    value: 80000,
    lastCheckup: "2023-11-02",
    status: "active",
  },
  {
    id: 3,
    name: "Ganga",
    breed: "Red Sindhi",
    age: 5,
    weight: 380,
    milkFat: 4.0,
    health: "Fair",
    value: 70000,
    lastCheckup: "2023-09-20",
    status: "active",
  },
  {
    id: 4,
    name: "Saraswati",
    breed: "Tharparkar",
    age: 6,
    weight: 420,
    milkFat: 4.3,
    health: "Good",
    value: 85000,
    lastCheckup: "2023-10-28",
    status: "active",
  },
  {
    id: 5,
    name: "Kamdhenu",
    breed: "Kankrej",
    age: 4,
    weight: 430,
    milkFat: 4.7,
    health: "Excellent",
    value: 90000,
    lastCheckup: "2023-11-10",
    status: "active",
  },
]

export default function CowManagement() {
  const [cows, setCows] = useState<Cow[]>(initialCows)
  const [filteredCows, setFilteredCows] = useState<Cow[]>(initialCows)
  const [breedFilter, setBreedFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCow, setCurrentCow] = useState<Cow | null>(null)
  const [newCow, setNewCow] = useState({
    name: "",
    breed: "",
    age: "",
    weight: "",
    milkFat: "",
    health: "Good",
    value: "",
    lastCheckup: new Date().toISOString().split("T")[0],
    status: "active" as const,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const { toast } = useToast()

  // Apply filters
  useEffect(() => {
    let result = cows

    // Apply breed filter
    if (breedFilter !== "all") {
      result = result.filter((cow) => cow.breed === breedFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((cow) => cow.status === statusFilter)
    }

    setFilteredCows(result)
  }, [cows, breedFilter, statusFilter])

  // Pagination
  const indexOfLastCow = currentPage * itemsPerPage
  const indexOfFirstCow = indexOfLastCow - itemsPerPage
  const currentCows = filteredCows.slice(indexOfFirstCow, indexOfLastCow)
  const totalPages = Math.ceil(filteredCows.length / itemsPerPage)

  const handleAddCow = () => {
    const id = cows.length > 0 ? Math.max(...cows.map((cow) => cow.id)) + 1 : 1

    const newCowData: Cow = {
      id,
      name: newCow.name,
      breed: newCow.breed,
      age: Number.parseInt(newCow.age),
      weight: Number.parseInt(newCow.weight),
      milkFat: Number.parseFloat(newCow.milkFat),
      health: newCow.health,
      value: Number.parseInt(newCow.value),
      lastCheckup: newCow.lastCheckup,
      status: newCow.status,
    }

    setCows([...cows, newCowData])
    setIsAddDialogOpen(false)

    // Reset form
    setNewCow({
      name: "",
      breed: "",
      age: "",
      weight: "",
      milkFat: "",
      health: "Good",
      value: "",
      lastCheckup: new Date().toISOString().split("T")[0],
      status: "active",
    })

    toast({
      title: "Cow Added",
      description: `${newCowData.name} has been added successfully.`,
    })
  }

  const handleEditCow = () => {
    if (!currentCow) return

    const updatedCows = cows.map((cow) => (cow.id === currentCow.id ? currentCow : cow))

    setCows(updatedCows)
    setIsEditDialogOpen(false)
    setCurrentCow(null)

    toast({
      title: "Cow Updated",
      description: `${currentCow.name} has been updated successfully.`,
    })
  }

  const handleDeleteCow = () => {
    if (!currentCow) return

    const updatedCows = cows.filter((cow) => cow.id !== currentCow.id)
    setCows(updatedCows)
    setIsDeleteDialogOpen(false)

    toast({
      title: "Cow Deleted",
      description: `${currentCow.name} has been deleted successfully.`,
    })

    setCurrentCow(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCow((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentCow) return

    const { name, value } = e.target
    setCurrentCow((prev) => {
      if (!prev) return prev
      return { ...prev, [name]: value }
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewCow((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSelectChange = (name: string, value: string) => {
    if (!currentCow) return

    setCurrentCow((prev) => {
      if (!prev) return prev
      return { ...prev, [name]: value }
    })
  }

  const openEditDialog = (cow: Cow) => {
    setCurrentCow(cow)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (cow: Cow) => {
    setCurrentCow(cow)
    setIsDeleteDialogOpen(true)
  }

  const resetFilters = () => {
    setBreedFilter("all")
    setStatusFilter("all")
  }

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8 pb-16 md:pb-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold gradient-text mb-4 md:mb-0">Cow Management</h1>
          <Button onClick={() => setIsAddDialogOpen(true)} className="gradient-bg text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Cow
          </Button>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>
                    All Cows
                  </TabsTrigger>
                  <TabsTrigger value="active" onClick={() => setStatusFilter("active")}>
                    Active
                  </TabsTrigger>
                  <TabsTrigger value="sold" onClick={() => setStatusFilter("sold")}>
                    Sold
                  </TabsTrigger>
                  <TabsTrigger value="deceased" onClick={() => setStatusFilter("deceased")}>
                    Deceased
                  </TabsTrigger>
                </TabsList>

                <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" /> Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <div className="p-2">
                        <Label htmlFor="breed-filter" className="text-xs">
                          Breed
                        </Label>
                        <Select value={breedFilter} onValueChange={(value) => setBreedFilter(value)}>
                          <SelectTrigger id="breed-filter">
                            <SelectValue placeholder="All Breeds" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Breeds</SelectItem>
                            {cowBreeds.map((breed) => (
                              <SelectItem key={breed.id} value={breed.name}>
                                {breed.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="p-2 pt-0">
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={resetFilters}>
                          <RefreshCw className="mr-2 h-3 w-3" /> Reset Filters
                        </Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" /> Export
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" /> Export as CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" /> Export as PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <TabsContent value="all" className="space-y-4">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Breed</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Weight (kg)</TableHead>
                        <TableHead>Milk Fat %</TableHead>
                        <TableHead>Health</TableHead>
                        <TableHead>Value (₹)</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentCows.length > 0 ? (
                        currentCows.map((cow) => (
                          <TableRow key={cow.id}>
                            <TableCell className="font-medium">{cow.name}</TableCell>
                            <TableCell>{cow.breed}</TableCell>
                            <TableCell>{cow.age} years</TableCell>
                            <TableCell>{cow.weight}</TableCell>
                            <TableCell>{cow.milkFat}%</TableCell>
                            <TableCell>{cow.health}</TableCell>
                            <TableCell>₹{cow.value.toLocaleString("en-IN")}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  cow.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : cow.status === "sold"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {cow.status.charAt(0).toUpperCase() + cow.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => openEditDialog(cow)}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => openDeleteDialog(cow)} className="text-red-600">
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-4">
                            No cows found. Try adjusting your filters or add a new cow.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {filteredCows.length > itemsPerPage && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Add Cow Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Cow</DialogTitle>
              <DialogDescription>Enter the details of the new cow. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newCow.name}
                    onChange={handleInputChange}
                    placeholder="Enter cow name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breed">Breed</Label>
                  <Select
                    name="breed"
                    value={newCow.breed}
                    onValueChange={(value) => handleSelectChange("breed", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select breed" />
                    </SelectTrigger>
                    <SelectContent>
                      {cowBreeds.map((breed) => (
                        <SelectItem key={breed.id} value={breed.name}>
                          {breed.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={newCow.age}
                    onChange={handleInputChange}
                    placeholder="Enter age"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={newCow.weight}
                    onChange={handleInputChange}
                    placeholder="Enter weight"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="milkFat">Milk Fat %</Label>
                  <Input
                    id="milkFat"
                    name="milkFat"
                    type="number"
                    step="0.1"
                    value={newCow.milkFat}
                    onChange={handleInputChange}
                    placeholder="Enter milk fat percentage"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="health">Health Status</Label>
                  <Select
                    name="health"
                    value={newCow.health}
                    onValueChange={(value) => handleSelectChange("health", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select health status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Value (₹)</Label>
                  <Input
                    id="value"
                    name="value"
                    type="number"
                    value={newCow.value}
                    onChange={handleInputChange}
                    placeholder="Enter value"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastCheckup">Last Checkup Date</Label>
                  <Input
                    id="lastCheckup"
                    name="lastCheckup"
                    type="date"
                    value={newCow.lastCheckup}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  value={newCow.status}
                  onValueChange={(value: "active" | "sold" | "deceased") => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="deceased">Deceased</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCow}>Save Cow</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Cow Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Cow</DialogTitle>
              <DialogDescription>Update the details of the cow. Click save when you're done.</DialogDescription>
            </DialogHeader>
            {currentCow && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Name</Label>
                    <Input
                      id="edit-name"
                      name="name"
                      value={currentCow.name}
                      onChange={handleEditInputChange}
                      placeholder="Enter cow name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-breed">Breed</Label>
                    <Select
                      name="breed"
                      value={currentCow.breed}
                      onValueChange={(value) => handleEditSelectChange("breed", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select breed" />
                      </SelectTrigger>
                      <SelectContent>
                        {cowBreeds.map((breed) => (
                          <SelectItem key={breed.id} value={breed.name}>
                            {breed.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-age">Age (years)</Label>
                    <Input
                      id="edit-age"
                      name="age"
                      type="number"
                      value={currentCow.age}
                      onChange={(e) => handleEditSelectChange("age", e.target.value)}
                      placeholder="Enter age"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-weight">Weight (kg)</Label>
                    <Input
                      id="edit-weight"
                      name="weight"
                      type="number"
                      value={currentCow.weight}
                      onChange={(e) => handleEditSelectChange("weight", e.target.value)}
                      placeholder="Enter weight"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-milkFat">Milk Fat %</Label>
                    <Input
                      id="edit-milkFat"
                      name="milkFat"
                      type="number"
                      step="0.1"
                      value={currentCow.milkFat}
                      onChange={(e) => handleEditSelectChange("milkFat", e.target.value)}
                      placeholder="Enter milk fat percentage"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-health">Health Status</Label>
                    <Select
                      name="health"
                      value={currentCow.health}
                      onValueChange={(value) => handleEditSelectChange("health", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select health status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-value">Value (₹)</Label>
                    <Input
                      id="edit-value"
                      name="value"
                      type="number"
                      value={currentCow.value}
                      onChange={(e) => handleEditSelectChange("value", e.target.value)}
                      placeholder="Enter value"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      name="status"
                      value={currentCow.status}
                      onValueChange={(value: "active" | "sold" | "deceased") => handleEditSelectChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                        <SelectItem value="deceased">Deceased</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditCow}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Cow Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {currentCow?.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteCow}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AuthenticatedLayout>
  )
}

