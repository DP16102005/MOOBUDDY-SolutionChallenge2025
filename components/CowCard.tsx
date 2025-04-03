import ImageUpload from "@/components/ImageUpload"
import { Card, CardContent } from "@mui/material"

export default function CowCard({ cow }) {
  return (
    <Card>
      <CardContent>
        <ImageUpload
          name={cow.name}
          id={cow.id}
          type="cow"
          existingUrl={cow.imageUrl}
          width={300}
          height={200}
          className="rounded-md object-cover"
        />
        {/* ... (rest of the card content) */}
      </CardContent>
    </Card>
  )
}

