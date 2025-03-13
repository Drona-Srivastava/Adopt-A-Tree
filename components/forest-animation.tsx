"use client"

import { useEffect, useRef } from "react"

export default function ForestAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    class Tree {
      x: number
      y: number
      height: number
      width: number
      color: string
      swayOffset: number
      swaySpeed: number

      constructor(x: number, y: number, height: number) {
        this.x = x
        this.y = y
        this.height = height
        this.width = height / 3
        this.color = this.getRandomGreen()
        this.swayOffset = Math.random() * Math.PI * 2
        this.swaySpeed = 0.3 + Math.random() * 0.7
      }

      getRandomGreen() {
        const hue = 100 + Math.floor(Math.random() * 40) // Green hues
        const saturation = 40 + Math.floor(Math.random() * 30)
        const lightness = 20 + Math.floor(Math.random() * 30)
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const sway = Math.sin(time * 0.001 * this.swaySpeed + this.swayOffset) * 5

        // Draw tree trunk
        ctx.fillStyle = "#8B4513"
        ctx.fillRect(this.x - this.width / 6 + sway, this.y - this.height / 4, this.width / 3, this.height / 2)

        // Draw tree top (triangle)
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.moveTo(this.x + sway, this.y - this.height)
        ctx.lineTo(this.x - this.width / 2 + sway, this.y - this.height / 3)
        ctx.lineTo(this.x + this.width / 2 + sway, this.y - this.height / 3)
        ctx.closePath()
        ctx.fill()
      }
    }

    // Create trees
    const trees: Tree[] = []
    const treeCount = Math.floor(canvas.width / 30) // Adjust density as needed

    for (let i = 0; i < treeCount; i++) {
      const x = (canvas.width / treeCount) * i + Math.random() * 20 - 10
      const y = canvas.height - 50 + Math.random() * 100
      const height = 100 + Math.random() * 150
      trees.push(new Tree(x, y, height))
    }

    // Sort trees by y position (for proper layering)
    trees.sort((a, b) => a.y - b.y)

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

      // Draw trees
      trees.forEach((tree) => tree.draw(ctx, time))

      animationId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ filter: "brightness(0.8)" }} />
}

