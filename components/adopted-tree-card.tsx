import Image from "next/image"
import { Calendar, MapPin, Ruler, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface AdoptedTreeProps {
  tree: {
    id: string
    name: string
    species: string
    location: string
    adoptedDate: string
    lastUpdate: string
    height: string
    co2Absorbed: string
    image: string
    coordinates: { lat: number; lng: number }
    healthStatus: string
  }
}

export default function AdoptedTreeCard({ tree }: AdoptedTreeProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Calculate days since adoption
  const daysSinceAdoption = () => {
    const adoptedDate = new Date(tree.adoptedDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - adoptedDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Get health status color
  const getHealthColor = () => {
    switch (tree.healthStatus) {
      case "Excellent":
        return "bg-green-500 text-white"
      case "Good":
        return "bg-blue-500 text-white"
      case "Fair":
        return "bg-yellow-500 text-white"
      case "Poor":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48">
        <Image src={tree.image || "/placeholder.svg"} alt={tree.name} fill className="object-cover" />
        <div className="absolute top-2 right-2">
          <Badge className={`${getHealthColor()}`}>{tree.healthStatus}</Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{tree.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Leaf className="h-3 w-3 mr-1" />
              {tree.species}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-2">
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>{tree.location}</span>
        </div>
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>Adopted on {formatDate(tree.adoptedDate)}</span>
        </div>
        <div className="flex items-center text-sm">
          <Ruler className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>Current height: {tree.height}</span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Growth progress</span>
            <span className="text-primary font-medium">{daysSinceAdoption()} days</span>
          </div>
          <Progress value={Math.min((daysSinceAdoption() / 365) * 100, 100)} className="h-2" />
          <p className="text-xs text-muted-foreground">CO₂ absorbed: {tree.co2Absorbed}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full group transition-all duration-300">
          View Details
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

