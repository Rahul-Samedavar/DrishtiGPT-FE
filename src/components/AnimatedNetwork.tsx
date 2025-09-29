"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface Node {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
}

interface AnimatedNetworkProps {
  nodeCount?: number
  maxConnections?: number
  animationSpeed?: number
}

const AnimatedNetwork: React.FC<AnimatedNetworkProps> = ({
  nodeCount = 50,
  maxConnections = 3,
  animationSpeed = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<Node[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return

    const newNodes: Node[] = []
    for (let i = 0; i < nodeCount; i++) {
      newNodes.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * animationSpeed,
        vy: (Math.random() - 0.5) * animationSpeed,
        connections: [],
      })
    }

    // nearest connections
    newNodes.forEach((node, i) => {
      const nearest = newNodes
        .map((other, j) => ({ index: j, distance: Math.hypot(node.x - other.x, node.y - other.y) }))
        .filter((d) => d.index !== i)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxConnections)
      node.connections = nearest.map((d) => d.index)
    })

    nodesRef.current = newNodes
  }, [dimensions, nodeCount, maxConnections, animationSpeed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      const nodes = nodesRef.current

      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy
        if (node.x <= 0 || node.x >= dimensions.width) node.vx *= -1
        if (node.y <= 0 || node.y >= dimensions.height) node.vy *= -1
      })

      // draw connections
      ctx.strokeStyle = "rgba(147, 51, 234, 0.25)"
      ctx.lineWidth = 1
      nodes.forEach((node) => {
        node.connections.forEach((id) => {
          const other = nodes[id]
          const distance = Math.hypot(node.x - other.x, node.y - other.y)
          if (distance < 150) {
            ctx.strokeStyle = `rgba(147, 51, 234, ${(150 - distance) / 150 * 0.3})`
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })
      })

      // draw nodes
      nodes.forEach((node) => {
        ctx.fillStyle = "rgba(147, 51, 234, 0.8)"
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "rgba(147, 51, 234, 0.15)"
        ctx.beginPath()
        ctx.arc(node.x, node.y, 5, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationRef.current!)
  }, [dimensions])

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

export default AnimatedNetwork
