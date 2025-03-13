"use client"

import { useEffect, useState } from "react"

interface CounterAnimationProps {
  target: number
  duration?: number
}

export default function CounterAnimation({ target, duration = 2000 }: CounterAnimationProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrameId: number

    const startValue = 0
    const endValue = target

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp

      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easedProgress = easeOutQuart(progress)

      setCount(Math.floor(startValue + easedProgress * (endValue - startValue)))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [target, duration])

  // Easing function for smoother animation
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4)
  }

  return <>{count.toLocaleString()}</>
}

