"use client"

import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet"

type Location = {
  id: number
  name: string
  type: "breeder" | "clinic" | "pharmacy" | "community"
  lat: number
  lng: number
}

const locations: Location[] = [
  { id: 1, name: "Gir Breeder", type: "breeder", lat: 21.5222, lng: 70.4579 },
  { id: 2, name: "Sahiwal Clinic", type: "clinic", lat: 30.6668, lng: 73.1092 },
  { id: 3, name: "Cow Pharmacy", type: "pharmacy", lat: 28.6139, lng: 77.209 },
  { id: 4, name: "Breeding Community Center", type: "community", lat: 26.8467, lng: 80.9462 },
]

const customIcon = new Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export function InteractiveMap() {
  const [filter, setFilter] = useState<string>("all")

  const filteredLocations = locations.filter((location) => filter === "all" || location.type === filter)

  return (
    <div className="h-[400px] w-full">
      <div className="mb-4">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
          <option value="all">All</option>
          <option value="breeder">Breeders</option>
          <option value="clinic">Clinics</option>
          <option value="pharmacy">Pharmacies</option>
          <option value="community">Community Centers</option>
        </select>
      </div>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredLocations.map((location) => (
          <Marker key={location.id} position={[location.lat, location.lng]} icon={customIcon}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

