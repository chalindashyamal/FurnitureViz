"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Save, EyeIcon as Eye3d, LayoutGrid, Plus } from "lucide-react"

// Room type definitions with suggested furniture
const ROOM_TYPES = {
  LIVING_ROOM: {
    name: "Living Room",
    suggestedFurniture: [
      { type: "sofa", name: "Sofa", color: "#78909C" },
      { type: "table", name: "Coffee Table", color: "#A1887F" },
      { type: "cabinet", name: "TV Stand", color: "#D7CCC8" },
      { type: "chair", name: "Armchair", color: "#8B4513" },
      { type: "table", name: "Side Table", color: "#A1887F", width: 50, height: 50 },
    ],
    defaultDimensions: { width: 500, length: 700, height: 280 },
    defaultColor: "#F5F5F5",
  },
  BEDROOM: {
    name: "Bedroom",
    suggestedFurniture: [
      { type: "bed", name: "Bed", color: "#BBDEFB" },
      { type: "cabinet", name: "Wardrobe", color: "#D7CCC8" },
      { type: "table", name: "Nightstand", color: "#A1887F", width: 50, height: 50 },
      { type: "cabinet", name: "Dresser", color: "#D7CCC8" },
      { type: "table", name: "Vanity", color: "#A1887F" },
    ],
    defaultDimensions: { width: 450, length: 550, height: 280 },
    defaultColor: "#F8F9FA",
  },
  BATHROOM: {
    name: "Bathroom",
    suggestedFurniture: [
      { type: "cabinet", name: "Vanity", color: "#D7CCC8" },
      { type: "cabinet", name: "Shower", color: "#B3E5FC" },
      { type: "cabinet", name: "Bathtub", color: "#FFFFFF" },
      { type: "cabinet", name: "Toilet", color: "#FFFFFF" },
      { type: "cabinet", name: "Storage Cabinet", color: "#D7CCC8" },
    ],
    defaultDimensions: { width: 300, length: 400, height: 280 },
    defaultColor: "#E3F2FD",
  },
  KITCHEN: {
    name: "Kitchen",
    suggestedFurniture: [
      { type: "table", name: "Kitchen Island", color: "#ECEFF1" },
      { type: "cabinet", name: "Cabinets", color: "#D7CCC8" },
      { type: "table", name: "Dining Table", color: "#A1887F" },
      { type: "chair", name: "Chair", color: "#8B4513" },
      { type: "cabinet", name: "Refrigerator", color: "#CFD8DC" },
    ],
    defaultDimensions: { width: 400, length: 500, height: 280 },
    defaultColor: "#FAFAFA",
  },
  DINING_ROOM: {
    name: "Dining Room",
    suggestedFurniture: [
      { type: "table", name: "Dining Table", color: "#A1887F" },
      { type: "chair", name: "Dining Chair", color: "#8B4513" },
      { type: "cabinet", name: "Buffet", color: "#D7CCC8" },
      { type: "cabinet", name: "China Cabinet", color: "#D7CCC8" },
      { type: "table", name: "Bar Cart", color: "#90A4AE" },
    ],
    defaultDimensions: { width: 450, length: 600, height: 280 },
    defaultColor: "#FFF8E1",
  },
}

export default function CreateDesign() {
  const router = useRouter()
  const [roomName, setRoomName] = useState("New Room Design")
  const [roomType, setRoomType] = useState("LIVING_ROOM")
  const [roomWidth, setRoomWidth] = useState(500)
  const [roomLength, setRoomLength] = useState(700)
  const [roomHeight, setRoomHeight] = useState(280)
  const [roomColor, setRoomColor] = useState("#F5F5F5")
  const [furniture, setFurniture] = useState([])
  const [selectedFurniture, setSelectedFurniture] = useState(null)
  const [suggestedFurniture, setSuggestedFurniture] = useState(ROOM_TYPES.LIVING_ROOM.suggestedFurniture)

  // Update room properties when room type changes
  useEffect(() => {
    const selectedRoom = ROOM_TYPES[roomType]
    setRoomWidth(selectedRoom.defaultDimensions.width)
    setRoomLength(selectedRoom.defaultDimensions.length)
    setRoomHeight(selectedRoom.defaultDimensions.height)
    setRoomColor(selectedRoom.defaultColor)
    setSuggestedFurniture(selectedRoom.suggestedFurniture)
    setRoomName(`New ${selectedRoom.name} Design`)
  }, [roomType])

  const showNotification = (message: string, isError = false) => {
    const notification = document.createElement("div")
    notification.className = `fixed top-4 right-4 ${isError ? "bg-red-500" : "bg-green-500"} text-white px-4 py-2 rounded shadow-lg z-50`
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.opacity = "0"
      notification.style.transition = "opacity 0.5s"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 500)
    }, 2000)
  }

  const handleSave = async () => {
    try {
      const designData = {
        roomName,
        roomType: ROOM_TYPES[roomType].name,
        roomDimensions: {
          width: roomWidth / 100, // Convert cm to m
          length: roomLength / 100, // Convert cm to m
          height: roomHeight / 100, // Convert cm to m
        },
        wallColor: roomColor,
        furniture: furniture.map(item => ({
          type: item.type,
          name: item.name,
          color: item.color,
          dimensions: {
            width: item.width / 100,
            height: item.height / 100,
            depth: Math.min(item.width, item.height) / 100 // Approximate depth
          },
          position: {
            x: (item.x - roomWidth / 2) / 100, // Convert to meters and center
            y: 0,
            z: (item.y - roomLength / 2) / 100 // Convert to meters and center
          },
          rotation: item.rotation
        })),
        sceneAmbientLight: 0.5,
        sceneShadowIntensity: 0.8,
        showShading: true,
        thumbnail: "/placeholder.svg?height=100&width=200",
      }

      const response = await fetch("/api/design/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(designData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to save design")
      }

      showNotification("Design created successfully!")
      router.push("/dashboard")
    } catch (error) {
      showNotification(`Error creating design: ${(error as Error).message}`, true)
    }
  }

  const handleAddFurniture = (furnitureItem) => {
    const newFurniture = {
      id: Date.now(),
      type: furnitureItem.type,
      name: furnitureItem.name,
      x: roomWidth / 4,
      y: roomLength / 4,
      width: furnitureItem.width || (furnitureItem.type === "table" ? 120 : 50),
      height: furnitureItem.height || (furnitureItem.type === "table" ? 80 : 50),
      color: furnitureItem.color,
      rotation: 0,
    }

    setFurniture([...furniture, newFurniture])
    setSelectedFurniture(newFurniture.id)
  }

  const handleDeleteFurniture = () => {
    if (!selectedFurniture) return
    setFurniture(furniture.filter((item) => item.id !== selectedFurniture))
    setSelectedFurniture(null)
  }

  const handleView3D = () => {
    // Save the current design data to localStorage before navigating
    const designData = {
      roomName,
      roomType,
      roomWidth,
      roomLength,
      roomHeight,
      roomColor,
      suggestedFurniture: ROOM_TYPES[roomType].suggestedFurniture,
      furniture: furniture.map((item) => ({
        id: item.id,
        type: item.type,
        name: item.name,
        color: item.color,
        // Convert 2D coordinates to 3D coordinates
        position: [
          (item.x - roomWidth / 4) / 100, // Center and scale
          0, // Place on the floor
          (item.y - roomLength / 4) / 100, // Center and scale
        ],
        rotation: [0, (item.rotation * Math.PI) / 180, 0],
        scale: Math.max(item.width, item.height) / 100, // Scale based on the larger dimension
      })),
    }

    localStorage.setItem("currentDesign", JSON.stringify(designData))
    router.push("/dashboard/3d-view")
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
            <span className="text-xl">Create New Design</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Design
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Room Properties</CardTitle>
                <CardDescription>Define the size and appearance of your room</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="room-type">Room Type</Label>
                  <Select id="room-type" value={roomType} onValueChange={setRoomType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LIVING_ROOM">Living Room</SelectItem>
                      <SelectItem value="BEDROOM">Bedroom</SelectItem>
                      <SelectItem value="BATHROOM">Bathroom</SelectItem>
                      <SelectItem value="KITCHEN">Kitchen</SelectItem>
                      <SelectItem value="DINING_ROOM">Dining Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="room-name">Room Name</Label>
                  <Input id="room-name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-width">Width (cm): {roomWidth}</Label>
                  <Slider
                    id="room-width"
                    min={200}
                    max={1000}
                    step={10}
                    value={[roomWidth]}
                    onValueChange={(value) => setRoomWidth(value[0])}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-length">Length (cm): {roomLength}</Label>
                  <Slider
                    id="room-length"
                    min={200}
                    max={1000}
                    step={10}
                    value={[roomLength]}
                    onValueChange={(value) => setRoomLength(value[0])}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-height">Height (cm): {roomHeight}</Label>
                  <Slider
                    id="room-height"
                    min={200}
                    max={400}
                    step={10}
                    value={[roomHeight]}
                    onValueChange={(value) => setRoomHeight(value[0])}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-color">Wall Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="room-color"
                      type="color"
                      value={roomColor}
                      onChange={(e) => setRoomColor(e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input value={roomColor} onChange={(e) => setRoomColor(e.target.value)} className="flex-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggested Furniture</CardTitle>
                <CardDescription>Recommended furniture for {ROOM_TYPES[roomType].name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  {suggestedFurniture.map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start"
                      onClick={() => handleAddFurniture(item)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {item.name}
                      <div className="ml-auto w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                    </Button>
                  ))}
                </div>

                {selectedFurniture && (
                  <div className="mt-4 space-y-4 p-4 border rounded-md">
                    <h3 className="font-medium">Selected Furniture</h3>
                    <Button variant="destructive" size="sm" onClick={handleDeleteFurniture} className="w-full">
                      Delete Selected
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="2d" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="2d">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  2D View
                </TabsTrigger>
                <TabsTrigger value="3d" onClick={handleView3D}>
                  <Eye3d className="mr-2 h-4 w-4" />
                  3D View
                </TabsTrigger>
              </TabsList>
              <TabsContent value="2d" className="mt-4">
                <Card>
                  <CardContent className="p-0">
                    <div
                      className="w-full aspect-[4/3] bg-gray-100 border flex items-center justify-center relative"
                      style={{ backgroundColor: roomColor }}
                    >
                      <div
                        className="relative border border-gray-400 bg-white/10"
                        style={{
                          width: `${roomWidth / 2}px`,
                          height: `${roomLength / 2}px`,
                          maxWidth: "100%",
                          maxHeight: "100%",
                        }}
                      >
                        <div className="absolute top-0 left-0 text-xs text-gray-700 bg-white/70 px-1">
                          {roomWidth} x {roomLength} cm
                        </div>

                        {/* Render furniture items */}
                        {furniture.map((item) => (
                          <div
                            key={item.id}
                            className={`absolute cursor-pointer ${selectedFurniture === item.id ? "ring-2 ring-primary" : ""}`}
                            style={{
                              left: `${item.x - item.width / 2}px`,
                              top: `${item.y - item.height / 2}px`,
                              width: `${item.width}px`,
                              height: `${item.height}px`,
                              backgroundColor: item.color,
                              transform: `rotate(${item.rotation}deg)`,
                            }}
                            onClick={() => setSelectedFurniture(item.id)}
                          >
                            {selectedFurniture === item.id && (
                              <div className="absolute -top-5 left-0 text-xs bg-primary text-white px-1 rounded">
                                {item.name}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="3d" className="mt-4">
                <Card>
                  <CardContent className="p-0">
                    <div className="w-full aspect-[4/3] bg-gray-800 flex items-center justify-center text-white">
                      <div className="text-center p-4">
                        <p className="mb-2">3D Visualization</p>
                        <p className="text-sm text-gray-400">Click the 3D View tab to open the full 3D editor</p>
                        <Button className="mt-4" onClick={handleView3D}>
                          Open 3D View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle>Design Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (selectedFurniture) {
                        const updatedFurniture = furniture.map((item) => {
                          if (item.id === selectedFurniture) {
                            return { ...item, width: item.width * 1.1, height: item.height * 1.1 }
                          }
                          return item
                        })
                        setFurniture(updatedFurniture)
                      }
                    }}
                    disabled={!selectedFurniture}
                  >
                    Scale Up
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (selectedFurniture) {
                        const updatedFurniture = furniture.map((item) => {
                          if (item.id === selectedFurniture) {
                            return { ...item, width: item.width * 0.9, height: item.height * 0.9 }
                          }
                          return item
                        })
                        setFurniture(updatedFurniture)
                      }
                    }}
                    disabled={!selectedFurniture}
                  >
                    Scale Down
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (selectedFurniture) {
                        const updatedFurniture = furniture.map((item) => {
                          if (item.id === selectedFurniture) {
                            return { ...item, rotation: item.rotation + 45 }
                          }
                          return item
                        })
                        setFurniture(updatedFurniture)
                      }
                    }}
                    disabled={!selectedFurniture}
                  >
                    Rotate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (selectedFurniture) {
                        const colorOptions = ["#8B4513", "#A1887F", "#78909C", "#D7CCC8", "#BBDEFB"]
                        const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)]

                        const updatedFurniture = furniture.map((item) => {
                          if (item.id === selectedFurniture) {
                            return { ...item, color: randomColor }
                          }
                          return item
                        })
                        setFurniture(updatedFurniture)
                      }
                    }}
                    disabled={!selectedFurniture}
                  >
                    Change Color
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}