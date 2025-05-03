"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, TransformControls, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, RotateCcw, MoveHorizontal, SunMedium, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { HexColorPicker } from "react-colorful"
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter"
import html2canvas from "html2canvas";

// Define furniture types
const FURNITURE_TYPES = {
  CHAIR: "chair",
  TABLE: "table",
  SOFA: "sofa",
  CABINET: "cabinet",
  BED: "bed",
}

// Room type definitions
const ROOM_TYPES = {
  LIVING_ROOM: {
    name: "Living Room",
    defaultDimensions: { width: 5, length: 7, height: 2.8 },
    defaultColor: "#F5F5F5",
    suggestedFurniture: [
      { type: "sofa", name: "Sofa", color: "#78909C" },
      { type: "table", name: "Coffee Table", color: "#A1887F" },
      { type: "cabinet", name: "TV Stand", color: "#D7CCC8" },
      { type: "chair", name: "Armchair", color: "#8B4513" },
      { type: "table", name: "Side Table", color: "#A1887F" },
    ],
  },
  BEDROOM: {
    name: "Bedroom",
    defaultDimensions: { width: 4.5, length: 5.5, height: 2.8 },
    defaultColor: "#F8F9FA",
    suggestedFurniture: [
      { type: "bed", name: "Bed", color: "#BBDEFB" },
      { type: "cabinet", name: "Wardrobe", color: "#D7CCC8" },
      { type: "table", name: "Nightstand", color: "#A1887F" },
      { type: "cabinet", name: "Dresser", color: "#D7CCC8" },
      { type: "table", name: "Vanity", color: "#A1887F" },
    ],
  },
  BATHROOM: {
    name: "Bathroom",
    defaultDimensions: { width: 3, length: 4, height: 2.8 },
    defaultColor: "#E3F2FD",
    suggestedFurniture: [
      { type: "cabinet", name: "Vanity", color: "#D7CCC8" },
      { type: "cabinet", name: "Shower", color: "#B3E5FC" },
      { type: "cabinet", name: "Bathtub", color: "#FFFFFF" },
      { type: "cabinet", name: "Toilet", color: "#FFFFFF" },
      { type: "cabinet", name: "Storage Cabinet", color: "#D7CCC8" },
    ],
  },
  KITCHEN: {
    name: "Kitchen",
    defaultDimensions: { width: 4, length: 5, height: 2.8 },
    defaultColor: "#FAFAFA",
    suggestedFurniture: [
      { type: "table", name: "Kitchen Island", color: "#ECEFF1" },
      { type: "cabinet", name: "Cabinets", color: "#D7CCC8" },
      { type: "table", name: "Dining Table", color: "#A1887F" },
      { type: "chair", name: "Chair", color: "#8B4513" },
      { type: "cabinet", name: "Refrigerator", color: "#CFD8DC" },
    ],
  },
  DINING_ROOM: {
    name: "Dining Room",
    defaultDimensions: { width: 4.5, length: 6, height: 2.8 },
    defaultColor: "#FFF8E1",
    suggestedFurniture: [
      { type: "table", name: "Dining Table", color: "#A1887F" },
      { type: "chair", name: "Dining Chair", color: "#8B4513" },
      { type: "cabinet", name: "Buffet", color: "#D7CCC8" },
      { type: "cabinet", name: "China Cabinet", color: "#D7CCC8" },
      { type: "table", name: "Bar Cart", color: "#90A4AE" },
    ],
  },
}

// Function to export the complete scene
function exportCompleteScene(scene, roomName) {
  return new Promise((resolve, reject) => {
    try {
      const exporter = new GLTFExporter()
      const options = {
        binary: true,
        includeCustomExtensions: true,
        onlyVisible: true,
        embedImages: true,
        maxTextureSize: 4096,
        forceIndices: true,
        truncateDrawRange: true,
      }

      exporter.parse(
        scene,
        (result) => {
          const blob = new Blob([result], { type: "model/gltf-binary" })
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = `${roomName.replace(/\s+/g, "_")}_3D_model.glb`
          link.click()
          URL.revokeObjectURL(url)
          resolve(true)
        },
        (error) => {
          console.error("Error exporting 3D model:", error)
          reject(error)
        },
        options
      )
    } catch (error) {
      console.error("Error preparing scene for export:", error)
      reject(error)
    }
  })
}

// SceneExporter component to handle 3D export
function SceneExporter({ roomName }) {
  const { scene } = useThree()

  const exportScene = useCallback(() => {
    const loadingNotification = document.createElement("div")
    loadingNotification.className = "fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50"
    loadingNotification.textContent = "Preparing 3D model for export..."
    document.body.appendChild(loadingNotification)

    exportCompleteScene(scene, roomName)
      .then(() => {
        document.body.removeChild(loadingNotification)
        const notification = document.createElement("div")
        notification.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50"
        notification.textContent = "3D model exported successfully!"
        document.body.appendChild(notification)

        setTimeout(() => {
          notification.style.opacity = "0"
          notification.style.transition = "opacity 0.5s"
          setTimeout(() => {
            document.body.removeChild(notification)
          }, 500)
        }, 2000)
      })
      .catch((error) => {
        document.body.removeChild(loadingNotification)
        const notification = document.createElement("div")
        notification.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50"
        notification.textContent = "Error exporting 3D model. Please try again."
        document.body.appendChild(notification)

        setTimeout(() => {
          notification.style.opacity = "0"
          notification.style.transition = "opacity 0.5s"
          setTimeout(() => {
            document.body.removeChild(notification)
          }, 500)
        }, 2000)
      })
  }, [scene, roomName])

  useEffect(() => {
    window.exportScene = exportScene
  }, [exportScene])

  return null
}

// Room component to render the room based on type
function Room({ width = 5, length = 7, height = 2.8, wallColor = "#F5F5F5", roomType = "LIVING_ROOM" }) {
  const renderRoomSpecificElements = () => {
    switch (roomType) {
      case "BATHROOM":
        return (
          <>
            <mesh position={[width / 2 - 0.8, 0.3, -length / 2 + 1]} rotation={[0, 0, 0]}>
              <boxGeometry args={[1.5, 0.6, 0.8]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[-width / 2 + 0.8, 0.9, -length / 2 + 0.8]} rotation={[0, 0, 0]}>
              <boxGeometry args={[1.5, 1.8, 1.5]} />
              <meshStandardMaterial color="#B3E5FC" transparent opacity={0.5} />
            </mesh>
            <mesh position={[-width / 2 + 0.8, 1.8, -length / 2 + 0.2]} rotation={[Math.PI / 4, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.3]} />
              <meshStandardMaterial color="#CFD8DC" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-width / 2 + 0.8, 0.01, -length / 2 + 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
              <meshStandardMaterial color="#90A4AE" metalness={0.8} roughness={0.2} />
            </mesh>
          </>
        )
      case "KITCHEN":
        return (
          <>
            <mesh position={[0, 0.5, -length / 2 + 0.4]} rotation={[0, 0, 0]}>
              <boxGeometry args={[width - 1, 1, 0.8]} />
              <meshStandardMaterial color="#ECEFF1" />
            </mesh>
            <mesh position={[1, 0.6, -length / 2 + 0.4]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.8, 0.1, 0.6]} />
              <meshStandardMaterial color="#CFD8DC" />
            </mesh>
            <group position={[1, 0.7, -length / 2 + 0.2]}>
              <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.2]} />
                <meshStandardMaterial color="#CFD8DC" metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.2, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.2]} />
                <meshStandardMaterial color="#CFD8DC" metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
            <mesh position={[-1, 0.55, -length / 2 + 0.4]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.8, 0.1, 0.6]} />
              <meshStandardMaterial color="#263238" />
            </mesh>
            <mesh position={[-1.2, 0.56, -length / 2 + 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
              <meshStandardMaterial color="#37474F" />
            </mesh>
            <mesh position={[-0.8, 0.56, -length / 2 + 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
              <meshStandardMaterial color="#37474F" />
            </mesh>
          </>
        )
      case "BEDROOM":
        return (
          <>
            <mesh position={[0, height / 2, -length / 2 + 0.01]} rotation={[0, 0, 0]}>
              <planeGeometry args={[2, 1.5]} />
              <meshStandardMaterial color="#B3E5FC" transparent opacity={0.5} />
            </mesh>
            <mesh position={[0, height / 2, -length / 2 + 0.005]} rotation={[0, 0, 0]}>
              <boxGeometry args={[2.1, 1.6, 0.05]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, height / 2, -length / 2 + 0.02]} rotation={[0, 0, 0]}>
              <boxGeometry args={[2, 0.05, 0.03]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, height / 2, -length / 2 + 0.02]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.05, 1.5, 0.03]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
          </>
        )
      case "LIVING_ROOM":
        return (
          <>
            <mesh position={[width / 2 - 0.01, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[3, 1.8]} />
              <meshStandardMaterial color="#B3E5FC" transparent opacity={0.5} />
            </mesh>
            <mesh position={[width / 2 - 0.02, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <boxGeometry args={[3.1, 1.9, 0.05]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, height / 2, -length / 2 + 0.01]} rotation={[0, 0, 0]}>
              <boxGeometry args={[2, 1.2, 0.1]} />
              <meshStandardMaterial color="#263238" />
            </mesh>
          </>
        )
      case "DINING_ROOM":
        return (
          <>
            <group position={[0, height - 0.5, 0]}>
              <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.1]} />
                <meshStandardMaterial color="#CFD8DC" metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh position={[0, -0.2, 0]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#ECEFF1" transparent opacity={0.7} />
              </mesh>
              <mesh position={[0.15, -0.3, 0]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#FFECB3" emissive="#FFECB3" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[-0.15, -0.3, 0]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#FFECB3" emissive="#FFECB3" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0, -0.3, 0.15]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#FFECB3" emissive="#FFECB3" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0, -0.3, -0.15]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#FFECB3" emissive="#FFECB3" emissiveIntensity={0.5} />
              </mesh>
            </group>
            <mesh position={[0, height / 2, -length / 2 + 0.01]} rotation={[0, 0, 0]}>
              <boxGeometry args={[1.5, 1, 0.05]} />
              <meshStandardMaterial color="#FFCC80" />
            </mesh>
          </>
        )
      default:
        return null
    }
  }

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#E0E0E0" />
      </mesh>
      <mesh position={[0, 0.05, -length / 2 + 0.025]} rotation={[0, 0, 0]}>
        <boxGeometry args={[width, 0.1, 0.05]} />
        <meshStandardMaterial color="#BDBDBD" />
      </mesh>
      <mesh position={[-width / 2 + 0.025, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[length, 0.1, 0.05]} />
        <meshStandardMaterial color="#BDBDBD" />
      </mesh>
      <mesh position={[width / 2 - 0.025, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[length, 0.1, 0.05]} />
        <meshStandardMaterial color="#BDBDBD" />
      </mesh>
      <mesh position={[0, height / 2, -length / 2]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      <mesh position={[-width / 2, height / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      <mesh position={[width / 2, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
      {renderRoomSpecificElements()}
    </group>
  )
}

// Helper function to prepare models for export
function prepareModelForExport(object) {
  if (object.isMesh) {
    if (Array.isArray(object.material)) {
      object.material = object.material.map((mat) => {
        const newMat = mat.clone()
        newMat.needsUpdate = true
        return newMat
      })
    } else if (object.material) {
      const newMat = object.material.clone()
      newMat.needsUpdate = true
      object.material = newMat
    }
    if (object.geometry) {
      object.geometry.computeBoundingBox()
      object.geometry.computeVertexNormals()
    }
  }
  if (object.children) {
    object.children.forEach((child) => prepareModelForExport(child))
  }
  return object
}

// Scene3D component to render the 3D scene
function Scene3D({
  furniture,
  setFurniture,
  selectedFurniture,
  setSelectedFurniture,
  transformMode,
  roomDimensions,
  wallColor,
  roomType,
  sceneAmbientLight,
  sceneShadowIntensity,
  showShading,
  roomName,
}) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 3, 5)
    camera.lookAt(0, 0, 0)
  }, [camera])

  useEffect(() => {
    if (selectedFurniture !== null && furniture.length > 0) {
      const selectedItem = furniture[selectedFurniture]
      if (selectedItem && selectedItem.position) {
        camera.lookAt(selectedItem.position[0], selectedItem.position[1] + 0.5, selectedItem.position[2])
      }
    }
  }, [selectedFurniture, furniture, camera])

  return (
    <>
      <Room
        width={roomDimensions.width}
        length={roomDimensions.length}
        height={roomDimensions.height}
        wallColor={wallColor}
        roomType={roomType}
      />
      {furniture.map((item, index) => {
        const isSelected = selectedFurniture === index
        let FurnitureComponent
        switch (item.type) {
          case "chair":
            FurnitureComponent = Chair
            break
          case "table":
            FurnitureComponent = Table
            break
          case "sofa":
            FurnitureComponent = Sofa
            break
          case "cabinet":
            FurnitureComponent = Cabinet
            break
          case "bed":
            FurnitureComponent = Bed
            break
          default:
            FurnitureComponent = Chair
        }

        return (
          <group key={index}>
            {isSelected ? (
              <TransformControls
                mode={transformMode}
                position={item.position || [0, 0, 0]}
                rotation={item.rotation || [0, 0, 0]}
                scale={[item.scale || 1, item.scale || 1, item.scale || 1]}
                onObjectChange={(e) => {
                  const newFurniture = [...furniture]
                  if (e.target.object) {
                    newFurniture[index].position = [
                      e.target.object.position.x,
                      e.target.object.position.y,
                      e.target.object.position.z,
                    ]
                    newFurniture[index].rotation = [
                      e.target.object.rotation.x,
                      e.target.object.rotation.y,
                      e.target.object.rotation.z,
                    ]
                    if (transformMode === "scale") {
                      newFurniture[index].scale = e.target.object.scale.x
                    }
                    setFurniture(newFurniture)
                  }
                }}
              >
                <FurnitureComponent
                  position={[0, 0, 0]}
                  rotation={[0, 0, 0]}
                  color={item.color || "#A1887F"}
                  scale={1}
                  selected={isSelected}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedFurniture(index)
                  }}
                  metalness={item.metalness || 0}
                  roughness={item.roughness || 0.5}
                />
              </TransformControls>
            ) : (
              <FurnitureComponent
                position={item.position || [0, 0, 0]}
                rotation={item.rotation || [0, 0, 0]}
                color={item.color || "#A1887F"}
                scale={item.scale || 1}
                selected={isSelected}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedFurniture(index)
                }}
                metalness={item.metalness || 0}
                roughness={item.roughness || 0.5}
              />
            )}
          </group>
        )
      })}
      <ambientLight intensity={sceneAmbientLight} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow={showShading}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <Environment preset="apartment" />
      <SceneExporter roomName={roomName} />
    </>
  )
}

// Chair component
function Chair({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#8B4513",
  scale = 1,
  selected = false,
  metalness = 0,
  roughness = 0.5,
  onClick,
}) {
  const groupRef = useRef()

  useEffect(() => {
    if (groupRef.current) {
      prepareModelForExport(groupRef.current)
    }
  }, [position, rotation, color, scale, metalness, roughness])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[scale, scale, scale]} onClick={onClick}>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.5, 0.05, 0.5]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[0.48, 0.06, 0.48]} />
        <meshStandardMaterial color={color} roughness={Math.min(roughness + 0.2, 1)} metalness={metalness} />
      </mesh>
      <mesh position={[0, 0.6, -0.24]}>
        <boxGeometry args={[0.5, 0.7, 0.04]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.6, -0.21]}>
        <boxGeometry args={[0.45, 0.65, 0.06]} />
        <meshStandardMaterial color={color} roughness={Math.min(roughness + 0.2, 1)} metalness={metalness} />
      </mesh>
      <mesh position={[-0.23, 0.6, -0.24]}>
        <boxGeometry args={[0.04, 0.7, 0.04]} />
        <meshStandardMaterial
          color={color === "#8B4513" ? "#5D4037" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0.23, 0.6, -0.24]}>
        <boxGeometry args={[0.04, 0.7, 0.04]} />
        <meshStandardMaterial
          color={color === "#8B4513" ? "#5D4037" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0, 0.3, -0.24]}>
        <boxGeometry args={[0.5, 0.04, 0.04]} />
        <meshStandardMaterial
          color={color === "#8B4513" ? "#5D4037" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0, 0.9, -0.24]}>
        <boxGeometry args={[0.5, 0.04, 0.04]} />
        <meshStandardMaterial
          color={color === "#8B4513" ? "#5D4037" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0.22, 0.125, 0.22]}>
        <cylinderGeometry args={[0.025, 0.03, 0.25]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.22, 0.125, 0.22]}>
        <cylinderGeometry args={[0.025, 0.03, 0.25]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.22, 0.125, -0.22]}>
        <cylinderGeometry args={[0.025, 0.03, 0.25]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.22, 0.125, -0.22]}>
        <cylinderGeometry args={[0.025, 0.03, 0.25]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.22, 0.01, 0.22]}>
        <sphereGeometry args={[0.03, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.22, 0.01, 0.22]}>
        <sphereGeometry args={[0.03, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.22, 0.01, -0.22]}>
        <sphereGeometry args={[0.03, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.22, 0.01, -0.22]}>
        <sphereGeometry args={[0.03, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      {selected && (
        <Html>
          <div className="px-2 py-1 bg-primary text-white text-xs rounded-md whitespace-nowrap">Chair</div>
        </Html>
      )}
    </group>
  )
}

// Table component
function Table({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#A1887F",
  scale = 1,
  selected = false,
  onClick,
  metalness = 0,
  roughness = 0.5,
}) {
  const groupRef = useRef()

  useEffect(() => {
    if (groupRef.current) {
      prepareModelForExport(groupRef.current)
    }
  }, [position, rotation, color, scale, metalness, roughness])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[scale, scale, scale]} onClick={onClick}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.375, 0]}>
        <boxGeometry args={[1.22, 0.05, 0.82]} />
        <meshStandardMaterial
          color={color === "#A1887F" ? "#8D6E63" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0, 0.43, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.18, 0.78]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={metalness} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.1, 0.05, 0.7]} />
        <meshStandardMaterial
          color={color === "#A1887F" ? "#795548" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0.5, 0.2, 0.3]}>
        <cylinderGeometry args={[0.04, 0.05, 0.4]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.5, 0.2, 0.3]}>
        <cylinderGeometry args={[0.04, 0.05, 0.4]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.5, 0.2, -0.3]}>
        <cylinderGeometry args={[0.04, 0.05, 0.4]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.5, 0.2, -0.3]}>
        <cylinderGeometry args={[0.04, 0.05, 0.4]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.5, 0.01, 0.3]}>
        <sphereGeometry args={[0.05, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.5, 0.01, 0.3]}>
        <sphereGeometry args={[0.05, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.5, 0.01, -0.3]}>
        <sphereGeometry args={[0.05, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.5, 0.01, -0.3]}>
        <sphereGeometry args={[0.05, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.15, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.4, 0.04, 0.04]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.15, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[1.4, 0.04, 0.04]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      {selected && (
        <Html>
          <div className="px-2 py-1 bg-primary text-white text-xs rounded-md whitespace-nowrap">Table</div>
        </Html>
      )}
    </group>
  )
}

// Sofa component
function Sofa({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#78909C",
  scale = 1,
  selected = false,
  onClick,
  metalness = 0,
  roughness = 0.5,
}) {
  const groupRef = useRef()

  useEffect(() => {
    if (groupRef.current) {
      prepareModelForExport(groupRef.current)
    }
  }, [position, rotation, color, scale, metalness, roughness])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[scale, scale, scale]} onClick={onClick}>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.8, 0.4, 0.8]} />
        <meshStandardMaterial
          color={color === "#78909C" ? "#546E7A" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[-0.45, 0.35, 0]}>
        <boxGeometry args={[0.85, 0.1, 0.75]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.45, 0.35, 0]}>
        <boxGeometry args={[0.85, 0.1, 0.75]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <boxGeometry args={[0.05, 0.12, 0.75]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.45, 0.36, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75, 8, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.45, 0.36, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75, 8, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.6, -0.35]}>
        <boxGeometry args={[1.8, 0.7, 0.1]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.45, 0.6, -0.3]}>
        <boxGeometry args={[0.85, 0.6, 0.15]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.45, 0.6, -0.3]}>
        <boxGeometry args={[0.85, 0.6, 0.15]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.6, -0.3]}>
        <boxGeometry args={[0.05, 0.6, 0.15]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.45, 0.6, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.45, 0.6, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.85, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.8]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.85, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.8]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.85, 0.55, 0.1]}>
        <boxGeometry args={[0.12, 0.1, 0.6]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.85, 0.55, 0.1]}>
        <boxGeometry args={[0.12, 0.1, 0.6]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.8, 0.1, 0.3]}>
        <cylinderGeometry args={[0.04, 0.05, 0.2]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.8, 0.1, 0.3]}>
        <cylinderGeometry args={[0.04, 0.05, 0.2]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.8, 0.1, -0.3]}>
        <cylinderGeometry args={[0.04, 0.05, 0.2]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.8, 0.1, -0.3]}>
        <cylinderGeometry args={[0.04, 0.05, 0.2]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.8, 0.01, 0.3]}>
        <sphereGeometry args={[0.05, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.8, 0.01, 0.3]}>
        <sphereGeometry args={[0.05, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.8, 0.01, -0.3]}>
        <sphereGeometry args={[0.05, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.8, 0.01, -0.3]}>
        <sphereGeometry args={[0.05, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      {selected && (
        <Html>
          <div className="px-2 py-1 bg-primary text-white text-xs rounded-md whitespace-nowrap">Sofa</div>
        </Html>
      )}
    </group>
  )
}

// Cabinet component
function Cabinet({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#D7CCC8",
  scale = 1,
  selected = false,
  onClick,
  metalness = 0,
  roughness = 0.5,
}) {
  const groupRef = useRef()

  useEffect(() => {
    if (groupRef.current) {
      prepareModelForExport(groupRef.current)
    }
  }, [position, rotation, color, scale, metalness, roughness])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[scale, scale, scale]} onClick={onClick}>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1, 1.2, 0.4]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 1.21, 0]}>
        <boxGeometry args={[1.05, 0.02, 0.45]} />
        <meshStandardMaterial
          color={color === "#D7CCC8" ? "#A1887F" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[1.05, 0.02, 0.45]} />
        <meshStandardMaterial
          color={color === "#D7CCC8" ? "#A1887F" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0.25, 0.6, 0.21]}>
        <boxGeometry args={[0.45, 1.1, 0.02]} />
        <meshStandardMaterial
          color={color === "#D7CCC8" ? "#BCAAA4" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[-0.25, 0.6, 0.21]}>
        <boxGeometry args={[0.45, 1.1, 0.02]} />
        <meshStandardMaterial
          color={color === "#D7CCC8" ? "#BCAAA4" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0.25, 0.6, 0.215]}>
        <boxGeometry args={[0.43, 1.08, 0.01]} />
        <meshStandardMaterial
          color={color === "#D7CCC8" ? "#D7CCC8" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[-0.25, 0.6, 0.215]}>
        <boxGeometry args={[0.43, 1.08, 0.01]} />
        <meshStandardMaterial
          color={color === "#D7CCC8" ? "#D7CCC8" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0.45, 0.6, 0.23]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.45, 0.6, 0.23]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.95, 0.02, 0.38]} />
        <meshStandardMaterial
          color={color === "#D7CCC8" ? "#BCAAA4" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.95, 0.02, 0.38]} />
        <meshStandardMaterial
          color={color === "#D7CCC8" ? "#BCAAA4" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0.4, 0.05, 0.15]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial
          color={color === "#D7CCC8" ? "#8D6E63" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[-0.4, 0.05, 0.15]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial
          color={color === "#D7CCC8" ? "#8D6E63" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0.4, 0.05, -0.15]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial
          color={color === "#D7CCC8" ? "#8D6E63" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[-0.4, 0.05, -0.15]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial
          color={color === "#D7CCC8" ? "#8D6E63" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      {selected && (
        <Html>
          <div className="px-2 py-1 bg-primary text-white text-xs rounded-md whitespace-nowrap">Cabinet</div>
        </Html>
      )}
    </group>
  )
}

// Bed component
function Bed({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#BBDEFB",
  scale = 1,
  selected = false,
  onClick,
  metalness = 0,
  roughness = 0.5,
}) {
  const groupRef = useRef()

  useEffect(() => {
    if (groupRef.current) {
      prepareModelForExport(groupRef.current)
    }
  }, [position, rotation, color, scale, metalness, roughness])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[scale, scale, scale]} onClick={onClick}>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[1.8, 0.3, 2.2]} />
        <meshStandardMaterial color="#A1887F" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.15, 0]} scale={[0.99, 0.99, 0.99]}>
        <boxGeometry args={[1.8, 0.3, 2.2]} />
        <meshStandardMaterial color="#8D6E63" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[1.85, 0.02, 2.25]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.7, 0.25, 2.1]} />
        <meshStandardMaterial color="#ECEFF1" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.68, 2.08]} />
        <meshStandardMaterial color="#ECEFF1" roughness={0.9} metalness={metalness} />
      </mesh>
      <mesh position={[0, 0.35, 0]} scale={[0.99, 0.95, 0.99]}>
        <boxGeometry args={[1.7, 0.25, 2.1]} />
        <meshStandardMaterial color="#CFD8DC" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.4, 0.5, -0.8]}>
        <boxGeometry args={[0.6, 0.15, 0.4]} />
        <meshStandardMaterial color="#FFFFFF" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.4, 0.5, -0.8]}>
        <boxGeometry args={[0.6, 0.15, 0.4]} />
        <meshStandardMaterial color="#FFFFFF" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.4, 0.5, -0.8]} scale={[0.95, 0.9, 0.95]}>
        <boxGeometry args={[0.6, 0.15, 0.4]} />
        <meshStandardMaterial color="#F5F5F5" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.4, 0.5, -0.8]} scale={[0.95, 0.9, 0.95]}>
        <boxGeometry args={[0.6, 0.15, 0.4]} />
        <meshStandardMaterial color="#F5F5F5" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.4, 0.53, -0.8]}>
        <boxGeometry args={[0.55, 0.05, 0.35]} />
        <meshStandardMaterial color="#FFFFFF" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.4, 0.53, -0.8]}>
        <boxGeometry args={[0.55, 0.05, 0.35]} />
        <meshStandardMaterial color="#FFFFFF" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.45, 0.2]}>
        <boxGeometry args={[1.6, 0.1, 1.5]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.46, 0.5]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[1.58, 0.08, 0.8]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.45, 0]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[1.59, 0.09, 0.7]} />
        <meshStandardMaterial
          color={color === "#BBDEFB" ? "#90CAF9" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0, 0.7, -1.05]}>
        <boxGeometry args={[1.8, 0.8, 0.1]} />
        <meshStandardMaterial color="#A1887F" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.7, -1.04]} scale={[0.95, 0.9, 1]}>
        <boxGeometry args={[1.8, 0.8, 0.05]} />
        <meshStandardMaterial color="#8D6E63" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 1.05, -1.05]}>
        <boxGeometry args={[1.85, 0.1, 0.15]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.85, 0.7, -1.05]}>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.85, 0.7, -1.05]}>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.8, 0.07, 1]}>
        <boxGeometry args={[0.1, 0.14, 0.1]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.8, 0.07, 1]}>
        <boxGeometry args={[0.1, 0.14, 0.1]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.8, 0.07, -1]}>
        <boxGeometry args={[0.1, 0.14, 0.1]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.8, 0.07, -1]}>
        <boxGeometry args={[0.1, 0.14, 0.1]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      {selected && (
        <Html>
          <div className="px-2 py-1 bg-primary text-white text-xs rounded-md whitespace-nowrap">Bed</div>
        </Html>
      )}
    </group>
  )
}

// Main ThreeDView component
export default function ThreeDView() {
  const [roomName, setRoomName] = useState("Room Design");
  const [roomType, setRoomType] = useState("LIVING_ROOM");
  const [roomDimensions, setRoomDimensions] = useState({ width: 5, length: 7, height: 2.8 });
  const [wallColor, setWallColor] = useState("#F5F5F5");
  const [furniture, setFurniture] = useState([]);
  const [suggestedFurniture, setSuggestedFurniture] = useState([]);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [transformMode, setTransformMode] = useState("translate");
  const [activeTab, setActiveTab] = useState("furniture");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(0.5);
  const [newFurnitureType, setNewFurnitureType] = useState("chair");
  const [designLoaded, setDesignLoaded] = useState(false);
  const [showShading, setShowShading] = useState(true);
  const [sceneAmbientLight, setSceneAmbientLight] = useState(0.5);
  const [sceneShadowIntensity, setSceneShadowIntensity] = useState(0.8);
  const [color, setColor] = useState("#A1887F");

  // Load design data from localStorage on component mount
  useEffect(() => {
    const loadDesign = () => {
      try {
        const savedDesign = localStorage.getItem("currentDesign")
        if (savedDesign) {
          const designData = JSON.parse(savedDesign)

          setRoomName(designData.roomName || "Room Design")
          setRoomType(designData.roomType || "LIVING_ROOM")
          setRoomDimensions({
            width: designData.roomWidth / 100 || 5,
            length: designData.roomLength / 100 || 7,
            height: designData.roomHeight / 100 || 2.8,
          })
          setWallColor(designData.roomColor || "#F5F5F5")
          setSuggestedFurniture(
            designData.suggestedFurniture || ROOM_TYPES[designData.roomType || "LIVING_ROOM"].suggestedFurniture
          )

          if (designData.furniture && designData.furniture.length > 0) {
            setFurniture(designData.furniture)
          } else {
            setDefaultFurniture(designData.roomType || "LIVING_ROOM")
          }

          setDesignLoaded(true)
        } else {
          setDefaultFurniture("LIVING_ROOM")
          setSuggestedFurniture(ROOM_TYPES.LIVING_ROOM.suggestedFurniture)
        }
      } catch (error) {
        console.error("Error loading design:", error)
        setDefaultFurniture("LIVING_ROOM")
        setSuggestedFurniture(ROOM_TYPES.LIVING_ROOM.suggestedFurniture)
      }
    }

    loadDesign()
  }, [])

  // Set default furniture based on room type
  const setDefaultFurniture = (type) => {
    let defaultFurniture = []

    switch (type) {
      case "LIVING_ROOM":
        defaultFurniture = [
          { type: "sofa", name: "Sofa", position: [0, 0, 0], rotation: [0, 0, 0], color: "#78909C", scale: 1 },
          { type: "table", name: "Coffee Table", position: [0, 0, 0.8], rotation: [0, 0, 0], color: "#A1887F", scale: 0.8 },
          { type: "cabinet", name: "TV Stand", position: [0, 0, -1.5], rotation: [0, 0, 0], color: "#D7CCC8", scale: 1.2 },
        ]
        break
      case "BEDROOM":
        defaultFurniture = [
          { type: "bed", name: "Bed", position: [0, 0, 0], rotation: [0, 0, 0], color: "#BBDEFB", scale: 1 },
          { type: "table", name: "Nightstand", position: [1.2, 0, -0.5], rotation: [0, 0, 0], color: "#A1887F", scale: 0.5 },
          { type: "cabinet", name: "Wardrobe", position: [-1.5, 0, -1], rotation: [0, 0, 0], color: "#D7CCC8", scale: 1.2 },
        ]
        break
      case "BATHROOM":
        defaultFurniture = [
          { type: "cabinet", name: "Vanity", position: [1, 0, 1], rotation: [0, 0, 0], color: "#D7CCC8", scale: 0.8 },
        ]
        break
      case "KITCHEN":
        defaultFurniture = [
          { type: "table", name: "Kitchen Island", position: [0, 0, 0], rotation: [0, 0, 0], color: "#ECEFF1", scale: 1.2 },
          { type: "chair", name: "Chair 1", position: [0.8, 0, 0], rotation: [0, -Math.PI / 2, 0], color: "#8B4513", scale: 0.9 },
          { type: "chair", name: "Chair 2", position: [-0.8, 0, 0], rotation: [0, Math.PI / 2, 0], color: "#8B4513", scale: 0.9 },
        ]
        break
      case "DINING_ROOM":
        defaultFurniture = [
          { type: "table", name: "Dining Table", position: [0, 0, 0], rotation: [0, 0, 0], color: "#A1887F", scale: 1.2 },
          { type: "chair", name: "Chair 1", position: [0, 0, 0.8], rotation: [0, Math.PI, 0], color: "#8B4513", scale: 0.9 },
          { type: "chair", name: "Chair 2", position: [0.8, 0, 0], rotation: [0, Math.PI / 2, 0], color: "#8B4513", scale: 0.9 },
          { type: "chair", name: "Chair 3", position: [-0.8, 0, 0], rotation: [0, -Math.PI / 2, 0], color: "#8B4513", scale: 0.9 },
          { type: "chair", name: "Chair 4", position: [0, 0, -0.8], rotation: [0, 0, 0], color: "#8B4513", scale: 0.9 },
          { type: "cabinet", name: "Buffet", position: [2, 0, -1.5], rotation: [0, 0, 0], color: "#D7CCC8", scale: 1 },
        ]
        break
      default:
        defaultFurniture = []
    }

    setFurniture(defaultFurniture)
  }

  // Add furniture with notification
  const handleAddFurniture = (item) => {
    const newPosition = [
      Math.random() * 2 - 1,
      0,
      Math.random() * 2 - 1,
    ]

    const newFurniture = {
      type: item.type || newFurnitureType,
      name: item.name || `New ${newFurnitureType.charAt(0).toUpperCase() + newFurnitureType.slice(1)}`,
      position: newPosition,
      rotation: [0, 0, 0],
      color: item.color || color,
      scale: 1,
      metalness: 0,
      roughness: 0.5,
    }

    const updatedFurniture = [...furniture, newFurniture]
    setFurniture(updatedFurniture)
    setSelectedFurniture(updatedFurniture.length - 1)

    const notification = document.createElement("div")
    notification.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50"
    notification.textContent = `Added ${newFurniture.name} to room`
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.opacity = "0"
      notification.style.transition = "opacity 0.5s"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 500)
    }, 2000)
  }

  // Save design to MongoDB
  const handleSaveDesign = async () => {
    try {
      // Capture the screenshot of the canvas
      const canvas = document.querySelector("canvas");
      if (!canvas) {
        throw new Error("Canvas not found");
      }

      const screenshot = await html2canvas(canvas, {
        backgroundColor: null,
        scale: 1,
      });
      const thumbnail = screenshot.toDataURL("image/png");

      const designData = {
        roomName,
        roomType,
        roomDimensions,
        wallColor,
        furniture,
        sceneAmbientLight,
        sceneShadowIntensity,
        showShading,
        thumbnail, // Include the thumbnail in the design data
      };

      const response = await fetch("/api/design/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(designData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save design");
      }

      // Show success notification
      const notification = document.createElement("div");
      notification.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50";
      notification.textContent = "Design saved successfully!";
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transition = "opacity 0.5s";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 2000);

      // Optionally, clear localStorage if you don't need to keep the design there
      localStorage.removeItem("currentDesign");
    } catch (error) {
      // Show error notification
      const notification = document.createElement("div");
      notification.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50";
      notification.textContent = `Error saving design: ${(error as Error).message}`;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transition = "opacity 0.5s";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 2000);
    }
  };

  // Export 2D design
  const handle2DExport = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 1200
    canvas.height = 900
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      console.error("Failed to get 2D context for canvas")
      return
    }

    ctx.fillStyle = wallColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#E0E0E0"
    const roomWidthPx = roomDimensions.width * 100
    const roomLengthPx = roomDimensions.length * 100
    const offsetX = (canvas.width - roomWidthPx) / 2
    const offsetY = (canvas.height - roomLengthPx) / 2
    ctx.fillRect(offsetX, offsetY, roomWidthPx, roomLengthPx)

    // Draw furniture
    furniture.forEach((item) => {
      ctx.fillStyle = item.color || "#A1887F"
      const x = offsetX + ((item.position ? item.position[0] : 0) + roomDimensions.width / 2) * 100
      const z = offsetY + ((item.position ? item.position[2] : 0) + roomDimensions.length / 2) * 100
      const itemScale = item.scale || 1

      // Draw based on furniture type
      switch (item.type) {
        case "sofa":
          ctx.save()
          ctx.translate(x, z)
          ctx.rotate(item.rotation ? item.rotation[1] : 0)
          ctx.fillRect(-80 * itemScale, -40 * itemScale, 160 * itemScale, 80 * itemScale)
          ctx.restore()
          break
        case "table":
          ctx.save()
          ctx.translate(x, z)
          ctx.rotate(item.rotation ? item.rotation[1] : 0)
          ctx.fillRect(-60 * itemScale, -40 * itemScale, 120 * itemScale, 80 * itemScale)
          ctx.restore()
          break
        case "chair":
          ctx.save()
          ctx.translate(x, z)
          ctx.rotate(item.rotation ? item.rotation[1] : 0)
          ctx.fillRect(-25 * itemScale, -25 * itemScale, 50 * itemScale, 50 * itemScale)
          ctx.restore()
          break
        case "bed":
          ctx.save()
          ctx.translate(x, z)
          ctx.rotate(item.rotation ? item.rotation[1] : 0)
          ctx.fillRect(-90 * itemScale, -110 * itemScale, 180 * itemScale, 220 * itemScale)
          ctx.restore()
          break
        case "cabinet":
          ctx.save()
          ctx.translate(x, z)
          ctx.rotate(item.rotation ? item.rotation[1] : 0)
          ctx.fillRect(-50 * itemScale, -20 * itemScale, 100 * itemScale, 40 * itemScale)
          ctx.restore()
          break
        default:
          ctx.fillRect(x - 25, z - 25, 50, 50)
      }
    })

    // Create a download link
    const link = document.createElement("a")
    link.download = `${roomName.replace(/\s+/g, "_")}_2D_design.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  // Add a function to handle 3D export
  const handle3DExport = () => {
    try {
      // Use the global function exposed by the SceneExporter component
      if (window.exportScene) {
        window.exportScene()
      } else {
        console.error("Export function not available")

        // Show error notification
        const notification = document.createElement("div")
        notification.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50"
        notification.textContent = "Export function not available. Please try again."
        document.body.appendChild(notification)

        setTimeout(() => {
          notification.style.opacity = "0"
          notification.style.transition = "opacity 0.5s"
          setTimeout(() => {
            document.body.removeChild(notification)
          }, 500)
        }, 2000)
      }
    } catch (error) {
      console.error("Error during 3D export:", error)

      // Show error notification
      const notification = document.createElement("div")
      notification.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50"
      notification.textContent = "Error during 3D export. Please try again."
      document.body.appendChild(notification)

      setTimeout(() => {
        notification.style.opacity = "0"
        notification.style.transition = "opacity 0.5s"
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 500)
      }, 2000)
    }
  }

  const handleDeleteFurniture = () => {
    if (selectedFurniture === null) return

    const newFurniture = [...furniture]
    newFurniture.splice(selectedFurniture, 1)
    setFurniture(newFurniture)
    setSelectedFurniture(null)
  }

  const updateFurnitureProperty = (property, value) => {
    if (selectedFurniture === null) return

    const newFurniture = [...furniture]
    newFurniture[selectedFurniture] = {
      ...newFurniture[selectedFurniture],
      [property]: value,
    }
    setFurniture(newFurniture)
  }

  const updateFurniturePosition = (axis, value) => {
    if (selectedFurniture === null) return

    const newFurniture = [...furniture]
    const newPosition = [...(newFurniture[selectedFurniture].position || [0, 0, 0])]

    switch (axis) {
      case "x":
        newPosition[0] = value
        break
      case "y":
        newPosition[1] = value
        break
      case "z":
        newPosition[2] = value
        break
    }

    newFurniture[selectedFurniture].position = newPosition
    setFurniture(newFurniture)
  }

  const updateFurnitureRotation = (axis, value) => {
    if (selectedFurniture === null) return

    const newFurniture = [...furniture]
    const newRotation = [...(newFurniture[selectedFurniture].rotation || [0, 0, 0])]

    switch (axis) {
      case "x":
        newRotation[0] = (value * Math.PI) / 180
        break
      case "y":
        newRotation[1] = (value * Math.PI) / 180
        break
      case "z":
        newRotation[2] = (value * Math.PI) / 180
        break
    }

    newFurniture[selectedFurniture].rotation = newRotation
    setFurniture(newFurniture)
  }

  const resetCamera = () => {
    // This will be handled by the OrbitControls reset
    const canvas = document.querySelector("canvas")
    if (canvas) {
      canvas.focus()
    }
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
            <span className="text-xl">3D Visualization: {roomName}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button onClick={handleSaveDesign}>Save Design</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-6 h-[calc(100vh-12rem)] overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="furniture">Furniture</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>

              <TabsContent value="furniture" className="space-y-6 mt-6 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Room Type: {ROOM_TYPES[roomType]?.name || "Custom Room"}</CardTitle>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Suggested Furniture</CardTitle>
                    <CardDescription>Click on an item to add it to your room</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-[200px] overflow-y-auto pr-2">
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
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Add Custom Furniture</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 py-6">
                    <div className="space-y-3">
                      <Label htmlFor="furniture-type">Furniture Type</Label>
                      <Select value={newFurnitureType} onValueChange={setNewFurnitureType}>
                        <SelectTrigger id="furniture-type" className="h-12">
                          <SelectValue placeholder="Select furniture" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chair">Chair</SelectItem>
                          <SelectItem value="table">Table</SelectItem>
                          <SelectItem value="sofa">Sofa</SelectItem>
                          <SelectItem value="cabinet">Cabinet</SelectItem>
                          <SelectItem value="bed">Bed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="furniture-name">Furniture Name</Label>
                      <Input id="furniture-name" placeholder="Enter a name for your furniture" className="h-12" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="furniture-color">Initial Color</Label>
                      <div className="flex gap-2">
                        <div className="w-12 h-12 rounded border" style={{ backgroundColor: color }}></div>
                        <Input
                          id="furniture-color"
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-full h-12"
                        />
                      </div>
                    </div>
                    <Button className="w-full h-12 text-base" onClick={() => handleAddFurniture({})}>
                      Add to Room
                    </Button>
                  </CardContent>
                </Card>

                {selectedFurniture !== null && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Furniture Properties</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="max-h-[300px] overflow-y-auto pr-2">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="furniture-name">Name</Label>
                            <Input
                              id="furniture-name"
                              value={furniture[selectedFurniture]?.name || ""}
                              onChange={(e) => updateFurnitureProperty("name", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="furniture-color">Color</Label>
                              <Button variant="outline" size="sm" onClick={() => setShowColorPicker(!showColorPicker)}>
                                {showColorPicker ? "Close" : "Pick Color"}
                              </Button>
                            </div>
                            <div className="flex gap-2">
                              <div
                                className="w-10 h-10 rounded border"
                                style={{ backgroundColor: furniture[selectedFurniture]?.color || "#A1887F" }}
                              />
                              <Input
                                id="furniture-color"
                                value={furniture[selectedFurniture]?.color || "#A1887F"}
                                onChange={(e) => updateFurnitureProperty("color", e.target.value)}
                              />
                            </div>

                            {showColorPicker && (
                              <div className="mt-2 p-3 border rounded-md">
                                <HexColorPicker
                                  color={furniture[selectedFurniture]?.color || "#A1887F"}
                                  onChange={(color) => updateFurnitureProperty("color", color)}
                                />
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="furniture-scale">
                              Scale: {(furniture[selectedFurniture]?.scale || 1).toFixed(2)}
                            </Label>
                            <Slider
                              id="furniture-scale"
                              min={0.5}
                              max={2}
                              step={0.1}
                              value={[furniture[selectedFurniture]?.scale || 1]}
                              onValueChange={(value) => updateFurnitureProperty("scale", value[0])}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <Label htmlFor="pos-x" className="text-xs">
                                X Position
                              </Label>
                              <Input
                                id="pos-x"
                                type="number"
                                value={(furniture[selectedFurniture]?.position?.[0] || 0).toFixed(2)}
                                onChange={(e) => updateFurniturePosition("x", Number.parseFloat(e.target.value))}
                                className="h-8 text-xs"
                                step={0.1}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="pos-y" className="text-xs">
                                Y Position
                              </Label>
                              <Input
                                id="pos-y"
                                type="number"
                                value={(furniture[selectedFurniture]?.position?.[1] || 0).toFixed(2)}
                                onChange={(e) => updateFurniturePosition("y", Number.parseFloat(e.target.value))}
                                className="h-8 text-xs"
                                step={0.1}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="pos-z" className="text-xs">
                                Z Position
                              </Label>
                              <Input
                                id="pos-z"
                                type="number"
                                value={(furniture[selectedFurniture]?.position?.[2] || 0).toFixed(2)}
                                onChange={(e) => updateFurniturePosition("z", Number.parseFloat(e.target.value))}
                                className="h-8 text-xs"
                                step={0.1}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <Label htmlFor="rot-x" className="text-xs">
                                X Rotation (°)
                              </Label>
                              <Input
                                id="rot-x"
                                type="number"
                                value={(((furniture[selectedFurniture]?.rotation?.[0] || 0) * 180) / Math.PI).toFixed(
                                  0,
                                )}
                                onChange={(e) => updateFurnitureRotation("x", Number.parseFloat(e.target.value))}
                                className="h-8 text-xs"
                                step={15}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="rot-y" className="text-xs">
                                Y Rotation (°)
                              </Label>
                              <Input
                                id="rot-y"
                                type="number"
                                value={(((furniture[selectedFurniture]?.rotation?.[1] || 0) * 180) / Math.PI).toFixed(
                                  0,
                                )}
                                onChange={(e) => updateFurnitureRotation("y", Number.parseFloat(e.target.value))}
                                className="h-8 text-xs"
                                step={15}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="rot-z" className="text-xs">
                                Z Rotation (°)
                              </Label>
                              <Input
                                id="rot-z"
                                type="number"
                                value={(((furniture[selectedFurniture]?.rotation?.[2] || 0) * 180) / Math.PI).toFixed(
                                  0,
                                )}
                                onChange={(e) => updateFurnitureRotation("z", Number.parseFloat(e.target.value))}
                                className="h-8 text-xs"
                                step={15}
                              />
                            </div>
                          </div>

                          {/* Add shading controls for individual furniture */}
                          <div className="space-y-2 pt-2">
                            <Label htmlFor="furniture-shade">Shading</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <Label htmlFor="metalness" className="text-xs">
                                  Metalness: {(furniture[selectedFurniture]?.metalness || 0).toFixed(2)}
                                </Label>
                                <Slider
                                  id="metalness"
                                  min={0}
                                  max={1}
                                  step={0.05}
                                  value={[furniture[selectedFurniture]?.metalness || 0]}
                                  onValueChange={(value) => updateFurnitureProperty("metalness", value[0])}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label htmlFor="roughness" className="text-xs">
                                  Roughness: {(furniture[selectedFurniture]?.roughness || 0.5).toFixed(2)}
                                </Label>
                                <Slider
                                  id="roughness"
                                  min={0}
                                  max={1}
                                  step={0.05}
                                  value={[furniture[selectedFurniture]?.roughness || 0.5]}
                                  onValueChange={(value) => updateFurnitureProperty("roughness", value[0])}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="pt-2">
                            <Button variant="destructive" className="w-full" onClick={handleDeleteFurniture}>
                              Delete Furniture
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="design" className="space-y-6 mt-6 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Room Design</CardTitle>
                    <CardDescription>Customize the overall look of your space</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="wall-color">Wall Color</Label>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded border" style={{ backgroundColor: wallColor }} />
                        <Input
                          id="wall-color"
                          type="text"
                          value={wallColor}
                          onChange={(e) => setWallColor(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="room-type">Room Type</Label>
                      <Select value={roomType} onValueChange={setRoomType}>
                        <SelectTrigger id="room-type">
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
                      <div className="flex items-center justify-between">
                        <Label htmlFor="room-width">Room Width: {roomDimensions.width.toFixed(1)}m</Label>
                      </div>
                      <Slider
                        id="room-width"
                        min={3}
                        max={10}
                        step={0.5}
                        value={[roomDimensions.width]}
                        onValueChange={(value) => setRoomDimensions({ ...roomDimensions, width: value[0] })}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="room-length">Room Length: {roomDimensions.length.toFixed(1)}m</Label>
                      </div>
                      <Slider
                        id="room-length"
                        min={3}
                        max={10}
                        step={0.5}
                        value={[roomDimensions.length]}
                        onValueChange={(value) => setRoomDimensions({ ...roomDimensions, length: value[0] })}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="room-height">Room Height: {roomDimensions.height.toFixed(1)}m</Label>
                      </div>
                      <Slider
                        id="room-height"
                        min={2.2}
                        max={4}
                        step={0.1}
                        value={[roomDimensions.height]}
                        onValueChange={(value) => setRoomDimensions({ ...roomDimensions, height: value[0] })}
                      />
                    </div>

                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle>Export Design</CardTitle>
                        <CardDescription>Download your design in different formats</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            variant="outline"
                            onClick={handle2DExport}
                            className="flex flex-col items-center gap-2 h-auto py-4"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-square-dashed"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                              <path d="M3 9h18" />
                              <path d="M3 15h18" />
                              <path d="M9 3v18" />
                              <path d="M15 3v18" />
                            </svg>
                            <div className="text-sm">2D Floor Plan</div>
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handle3DExport}
                            className="flex flex-col items-center gap-2 h-auto py-4 relative"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-box"
                            >
                              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                              <path d="m3.3 7 8.7 5 8.7-5" />
                              <path d="M12 22V12" />
                            </svg>
                            <div className="text-sm">3D Model (GLB)</div>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Lighting & Shading</CardTitle>
                    <CardDescription>Adjust lighting and shadows for your scene</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ambient-light">Ambient Light: {sceneAmbientLight.toFixed(1)}</Label>
                        <SunMedium className="h-5 w-5 text-amber-500" />
                      </div>
                      <Slider
                        id="ambient-light"
                        min={0.1}
                        max={1.0}
                        step={0.1}
                        value={[sceneAmbientLight]}
                        onValueChange={(value) => setSceneAmbientLight(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shadow-intensity">Shadow Intensity: {sceneShadowIntensity.toFixed(1)}</Label>
                      <Slider
                        id="shadow-intensity"
                        min={0}
                        max={1.0}
                        step={0.1}
                        value={[sceneShadowIntensity]}
                        onValueChange={(value) => setSceneShadowIntensity(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="show-shadows"
                          checked={showShading}
                          onCheckedChange={(checked) => setShowShading(checked === true)}
                        />
                        <label
                          htmlFor="show-shadows"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Enable shadows and reflections
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tools" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Transform Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={transformMode === "translate" ? "default" : "outline"}
                        onClick={() => setTransformMode("translate")}
                      >
                        Move
                      </Button>
                      <Button
                        variant={transformMode === "rotate" ? "default" : "outline"}
                        onClick={() => setTransformMode("rotate")}
                      >
                        Rotate
                      </Button>
                      <Button
                        variant={transformMode === "scale" ? "default" : "outline"}
                        onClick={() => setTransformMode("scale")}
                      >
                        Scale
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Lighting</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="light-intensity">Intensity: {lightIntensity.toFixed(1)}</Label>
                        <SunMedium className="h-5 w-5 text-amber-500" />
                      </div>
                      <Slider
                        id="light-intensity"
                        min={0.1}
                        max={1.0}
                        step={0.1}
                        value={[lightIntensity]}
                        onValueChange={(value) => setLightIntensity(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Shadows</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="shadows" defaultChecked />
                        <label
                          htmlFor="shadows"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Enable shadows
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Camera Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" onClick={resetCamera}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset View
                      </Button>
                      <Button variant="outline">
                        <MoveHorizontal className="mr-2 h-4 w-4" />
                        Top View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="h-[calc(100vh-12rem)] bg-gray-100 rounded-lg overflow-hidden">
            <Canvas shadows>
              <Scene3D
                furniture={furniture}
                setFurniture={setFurniture}
                selectedFurniture={selectedFurniture}
                setSelectedFurniture={setSelectedFurniture}
                transformMode={transformMode}
                roomDimensions={roomDimensions}
                wallColor={wallColor}
                roomType={roomType}
                sceneAmbientLight={sceneAmbientLight}
                sceneShadowIntensity={sceneShadowIntensity}
                showShading={showShading}
                roomName={roomName}
              />
              <OrbitControls enableDamping dampingFactor={0.1} />
            </Canvas>
          </div>
        </div>
      </main>
    </div>
  )
}
