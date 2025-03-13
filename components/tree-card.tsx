import Image from "next/image"
import { MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TreeCardProps {
  name: string
  location: string
  image: string
  price: number
  co2: string
  lifespan: string
}

export default function TreeCard({ name, location, image, price, co2, lifespan }: TreeCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              {location}
            </div>
          </div>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">${price}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted p-2 rounded-md">
            <div className="text-xs text-muted-foreground">CO₂ Absorption</div>
            <div className="font-medium">{co2}</div>
          </div>
          <div className="bg-muted p-2 rounded-md">
            <div className="text-xs text-muted-foreground">Lifespan</div>
            <div className="font-medium">{lifespan}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full group transition-all duration-300">
          Adopt This Tree
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

