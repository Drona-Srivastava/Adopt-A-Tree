"use client"

import { useEffect, useRef, useState } from "react"
import { Leaf } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Tree {
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

interface MyForestAnimationProps {
  trees: Tree[]
}

export default function MyForestAnimation({ trees }: MyForestAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null)
  const [treePositions, setTreePositions] = useState<{ id: string; x: number; y: number; height: number }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Tree class
    class TreeGraphic {
      id: string
      x: number
      y: number
      height: number
      width: number
      color: string
      swayOffset: number
      swaySpeed: number
      species: string

      constructor(id: string, x: number, y: number, height: number, species: string) {
        this.id = id
        this.x = x
        this.y = y
        this.height = height
        this.width = height / 3
        this.color = this.getTreeColor(species)
        this.swayOffset = Math.random() * Math.PI * 2
        this.swaySpeed = 0.3 + Math.random() * 0.7
        this.species = species
      }

      getTreeColor(species: string) {
        // Different colors based on tree species
        if (species.includes("Oak")) {
          return "#2d6a4f" // Dark green for Oak
        } else if (species.includes("Pine")) {
          return "#40916c" // Medium green for Pine
        } else if (species.includes("Baobab")) {
          return "#52b788" // Light green for Baobab
        } else {
          // Default green with some randomness
          const hue = 100 + Math.floor(Math.random() * 40) // Green hues
          const saturation = 40 + Math.floor(Math.random() * 30)
          const lightness = 20 + Math.floor(Math.random() * 30)
          return `hsl(${hue}, ${saturation}%, ${lightness}%)`
        }
      }

      draw(ctx: CanvasRenderingContext2D, time: number, isSelected: boolean) {
        const sway = Math.sin(time * 0.001 * this.swaySpeed + this.swayOffset) * 5

        // Draw tree trunk
        ctx.fillStyle = "#8B4513"
        ctx.fillRect(this.x - this.width / 6 + sway, this.y - this.height / 4, this.width / 3, this.height / 2)

        // Draw tree top based on species
        if (this.species.includes("Pine")) {
          // Pine tree (triangular layers)
          const layers = 3
          const layerHeight = this.height / 2 / layers

          for (let i = 0; i < layers; i++) {
            const layerWidth = this.width * (1 - i * 0.2)
            const layerY = this.y - this.height / 2 - i * layerHeight

            ctx.fillStyle = this.color
            ctx.beginPath()
            ctx.moveTo(this.x + sway, layerY - layerHeight)
            ctx.lineTo(this.x - layerWidth / 2 + sway, layerY)
            ctx.lineTo(this.x + layerWidth / 2 + sway, layerY)
            ctx.closePath()
            ctx.fill()
          }
        } else if (this.species.includes("Baobab")) {
          // Baobab tree (wide trunk, small canopy)
          // Wider trunk
          ctx.fillStyle = "#A0522D"
          ctx.fillRect(this.x - this.width / 4 + sway, this.y - this.height / 3, this.width / 2, this.height / 2)

          // Small round canopy
          ctx.fillStyle = this.color
          ctx.beginPath()
          ctx.arc(this.x + sway, this.y - this.height / 2.5, this.width / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Default tree (oak-like with rounded top)
          ctx.fillStyle = this.color
          ctx.beginPath()
          ctx.arc(this.x + sway, this.y - this.height / 1.5, this.width / 2, 0, Math.PI * 2)
          ctx.fill()
        }

        // If selected, draw a highlight around the tree
        if (isSelected) {
          ctx.strokeStyle = "#f59e0b"
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.arc(this.x, this.y - this.height / 3, this.width * 1.2, 0, Math.PI * 2)
          ctx.stroke()

          // Draw name label
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
          ctx.fillRect(this.x - 50, this.y - this.height - 30, 100, 25)
          ctx.fillStyle = "#000"
          ctx.font = "14px Arial"
          ctx.textAlign = "center"
          ctx.fillText(this.id, this.x, this.y - this.height - 12)
        }
      }

      // Check if a point is inside this tree (for click detection)
      isPointInside(x: number, y: number) {
        const distance = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - (this.y - this.height / 3), 2))
        return distance < this.width
      }
    }

    // Create tree graphics
    const treeGraphics: TreeGraphic[] = []
    const newTreePositions: { id: string; x: number; y: number; height: number }[] = []

    trees.forEach((tree, index) => {
      // Create a somewhat random but spaced out position
      const x = 100 + ((canvas.width - 200) * (index + 0.5)) / trees.length + (Math.random() * 100 - 50)
      const y = canvas.height - 50 + Math.random() * 50
      const height = 100 + Math.random() * 150

      treeGraphics.push(new TreeGraphic(tree.id, x, y, height, tree.species))
      newTreePositions.push({ id: tree.id, x, y, height })
    })

    setTreePositions(newTreePositions)

    // Handle click events
    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Check if any tree was clicked
      for (const tree of treeGraphics) {
        if (tree.isPointInside(x, y)) {
          const selectedTreeData = trees.find((t) => t.id === tree.id) || null
          setSelectedTree(selectedTreeData)
          return
        }
      }

      // If clicked outside any tree, deselect
      setSelectedTree(null)
    }

    canvas.addEventListener("click", handleCanvasClick)

    // Animation loop
    let animationId: number
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#1a4855") // Dark blue-green at top
      gradient.addColorStop(1, "#2d6a4f") // Forest green at bottom
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw ground
      ctx.fillStyle = "#3a5a40"
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50)

      // Draw trees
      treeGraphics.forEach((tree) => {
        const isSelected = selectedTree?.id === tree.id
        tree.draw(ctx, time, isSelected)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("click", handleCanvasClick)
    }
  }, [trees])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ filter: "brightness(0.9)" }} />

      {selectedTree && (
        <div className="absolute top-4 right-4 z-10">
          <Card className="w-72 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                {selectedTree.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                <span className="font-medium">Species:</span> {selectedTree.species}
              </p>
              <p>
                <span className="font-medium">Location:</span> {selectedTree.location}
              </p>
              <p>
                <span className="font-medium">Height:</span> {selectedTree.height}
              </p>
              <p>
                <span className="font-medium">CO₂ Absorbed:</span> {selectedTree.co2Absorbed}
              </p>
              <p>
                <span className="font-medium">Health:</span> {selectedTree.healthStatus}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

