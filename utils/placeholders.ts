// Generate different placeholder images for cows and bulls
export function getCowPlaceholder(name: string, id?: number | string): string {
  const identifier = id ? id.toString() : name
  // Use different colors for cow placeholders
  return `/placeholder.svg?height=300&width=300&text=${name}&background=teal&color=white&id=${identifier}`
}

export function getBullPlaceholder(name: string, id?: number | string): string {
  const identifier = id ? id.toString() : name
  // Use different colors for bull placeholders
  return `/placeholder.svg?height=300&width=300&text=${name}&background=indigo&color=white&id=${identifier}`
}

// Function to handle user-provided images
export function getImageUrl(
  providedUrl: string | null,
  name: string,
  type: "cow" | "bull",
  id?: number | string,
): string {
  if (providedUrl) {
    return providedUrl
  }

  return type === "cow" ? getCowPlaceholder(name, id) : getBullPlaceholder(name, id)
}

