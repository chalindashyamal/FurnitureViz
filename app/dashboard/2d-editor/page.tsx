"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Square, Circle, Move, Trash2, Save, ZoomIn, ZoomOut, RotateCw } from "lucide-react"

export default function TwoDEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tool, setTool] = useState("select")
  const [color, setColor] = useState("#8B4513")
  const [zoom, setZoom] = useState(1)
  const [objects, setObjects] = useState([
    { type: "rect", x: 200, y: 150, width: 120, height: 80, color: "#8B4513", name: "Table" },
    { type: "rect", x: 200, y: 250, width: 50, height: 50, color: "#A1887F", name: "Chair 1" },
    { type: "rect", x: 150, y: 150, width: 50, height: 50, color: "#A1887F", name: "Chair 2" },
    { type: "rect", x: 250, y: 150, width: 50, height: 50, color: "#A1887F", name: "Chair 3" },
    { type: "rect", x: 200, y: 50, width: 50, height: 50, color: "#A1887F", name: "Chair 4" },
  ])
  const [selectedObject, setSelectedObject] = useState<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw room (background)
    ctx.fillStyle = "#F5F5F5"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#E0E0E0"
    ctx.lineWidth = 1

    // Draw vertical grid lines
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Draw horizontal grid lines
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw objects
    objects.forEach((obj, index) => {
      ctx.fillStyle = obj.color

      if (obj.type === "rect") {
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
      } else if (obj.type === "circle") {
        ctx.beginPath()
        ctx.arc(obj.x, obj.y, obj.width / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw selection outline
      if (index === selectedObject) {
        ctx.strokeStyle = "#2196F3"
        ctx.lineWidth = 2

        if (obj.type === "rect") {
          ctx.strokeRect(obj.x - 2, obj.y - 2, obj.width + 4, obj.height + 4)
        } else if (obj.type === "circle") {
          ctx.beginPath()
          ctx.arc(obj.x, obj.y, obj.width / 2 + 2, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    })
  }, [objects, selectedObject, zoom])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === "select") {
      // Check if clicked on an object
      for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i]

        if (obj.type === "rect") {
          if (x >= obj.x && x <= obj.x + obj.width && y >= obj.y && y <= obj.y + obj.height) {
            setSelectedObject(i)
            return
          }
        } else if (obj.type === "circle") {
          const distance = Math.sqrt(Math.pow(x - obj.x, 2) + Math.pow(y - obj.y, 2))
          if (distance <= obj.width / 2) {
            setSelectedObject(i)
            return
          }
        }
      }

      // If clicked outside any object, deselect
      setSelectedObject(null)
    } else if (tool === "rect") {
      // Add new rectangle
      const newObjects = [...objects]
      newObjects.push({
        type: "rect",
        x: x - 25,
        y: y - 25,
        width: 50,
        height: 50,
        color,
        name: `Furniture ${objects.length + 1}`,
      })
      setObjects(newObjects)
      setSelectedObject(newObjects.length - 1)
    } else if (tool === "circle") {
      // Add new circle
      const newObjects = [...objects]
      newObjects.push({
        type: "circle",
        x,
        y,
        width: 50,
        height: 50,
        color,
        name: `Furniture ${objects.length + 1}`,
      })
      setObjects(newObjects)
      setSelectedObject(newObjects.length - 1)
    }
  }

  const deleteSelected = () => {
    if (selectedObject === null) return

    const newObjects = [...objects]
    newObjects.splice(selectedObject, 1)
    setObjects(newObjects)
    setSelectedObject(null)
  }

  const rotateSelected = () => {
    if (selectedObject === null) return

    const newObjects = [...objects]
    const obj = newObjects[selectedObject]

    // Swap width and height for rectangles
    if (obj.type === "rect") {
      const temp = obj.width
      obj.width = obj.height
      obj.height = temp
    }

    setObjects(newObjects)
  }

  const updateSelectedColor = (newColor: string) => {
    if (selectedObject === null) return

    const newObjects = [...objects]
    newObjects[selectedObject].color = newColor
    setObjects(newObjects)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center px-4">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl">2D Editor</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Design
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_3fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={tool === "select" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTool("select")}
                  >
                    <Move className="h-4 w-4 mr-2" />
                    Select
                  </Button>
                  <Button variant={tool === "rect" ? "default" : "outline"} size="sm" onClick={() => setTool("rect")}>
                    <Square className="h-4 w-4 mr-2" />
                    Rectangle
                  </Button>
                  <Button
                    variant={tool === "circle" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTool("circle")}
                  >
                    <Circle className="h-4 w-4 mr-2" />
                    Circle
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="color"
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input value={color} onChange={(e) => setColor(e.target.value)} className="flex-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={rotateSelected} disabled={selectedObject === null}>
                    <RotateCw className="h-4 w-4 mr-2" />
                    Rotate
                  </Button>
                  <Button variant="outline" size="sm" onClick={deleteSelected} disabled={selectedObject === null}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Zoom</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <span className="text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
                      <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedObject !== null ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="obj-name">Name</Label>
                      <Input
                        id="obj-name"
                        value={objects[selectedObject].name}
                        onChange={(e) => {
                          const newObjects = [...objects]
                          newObjects[selectedObject].name = e.target.value
                          setObjects(newObjects)
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="obj-color">Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="obj-color"
                          type="color"
                          value={objects[selectedObject].color}
                          onChange={(e) => updateSelectedColor(e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={objects[selectedObject].color}
                          onChange={(e) => updateSelectedColor(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="obj-x">X Position</Label>
                        <Input
                          id="obj-x"
                          type="number"
                          value={objects[selectedObject].x}
                          onChange={(e) => {
                            const newObjects = [...objects]
                            newObjects[selectedObject].x = Number(e.target.value)
                            setObjects(newObjects)
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="obj-y">Y Position</Label>
                        <Input
                          id="obj-y"
                          type="number"
                          value={objects[selectedObject].y}
                          onChange={(e) => {
                            const newObjects = [...objects]
                            newObjects[selectedObject].y = Number(e.target.value)
                            setObjects(newObjects)
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="obj-width">Width</Label>
                        <Input
                          id="obj-width"
                          type="number"
                          value={objects[selectedObject].width}
                          onChange={(e) => {
                            const newObjects = [...objects]
                            newObjects[selectedObject].width = Number(e.target.value)
                            setObjects(newObjects)
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="obj-height">Height</Label>
                        <Input
                          id="obj-height"
                          type="number"
                          value={objects[selectedObject].height}
                          onChange={(e) => {
                            const newObjects = [...objects]
                            newObjects[selectedObject].height = Number(e.target.value)
                            setObjects(newObjects)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-500 py-4">Select an object to edit its properties</div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg overflow-hidden border">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onClick={handleCanvasClick}
              className="w-full h-auto"
              style={{
                cursor: tool === "select" ? "default" : "crosshair",
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
              }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
