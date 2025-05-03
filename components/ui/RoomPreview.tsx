"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Scene3D } from "../three-d/Scene3D"; // Adjust the path to point to the correct location

interface FurnitureItem {
  type: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
}

interface RoomPreviewProps {
  roomDimensions: { width: number; length: number; height: number };
  wallColor: string;
  roomType: string;
  furniture: FurnitureItem[];
  sceneAmbientLight: number;
  sceneShadowIntensity: number;
  showShading: boolean;
  onFurnitureUpdate: (newFurniture: FurnitureItem[]) => void;
}

export default function RoomPreview({
  roomDimensions,
  wallColor,
  roomType,
  furniture: initialFurniture,
  sceneAmbientLight,
  sceneShadowIntensity,
  showShading,
  onFurnitureUpdate,
}: RoomPreviewProps) {
  const [furniture, setFurniture] = useState(initialFurniture);
  const [selectedFurniture, setSelectedFurniture] = useState<number | null>(null);
  const [transformMode, setTransformMode] = useState<"translate" | "rotate" | "scale">("translate");

  // Sync furniture state with parent and notify updates
  useEffect(() => {
    setFurniture(initialFurniture);
  }, [initialFurniture]);

  const handleSetFurniture = (newFurniture: FurnitureItem[]) => {
    setFurniture(newFurniture);
    onFurnitureUpdate(newFurniture);
  };

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100">
      <Canvas shadows>
        <Scene3D
          roomDimensions={roomDimensions}
          wallColor={wallColor}
          roomType={roomType}
          furniture={furniture}
          setFurniture={handleSetFurniture}
          selectedFurniture={selectedFurniture}
          setSelectedFurniture={setSelectedFurniture}
          sceneAmbientLight={sceneAmbientLight}
          sceneShadowIntensity={sceneShadowIntensity}
          showShading={showShading}
          transformMode={transformMode}
        />
        <OrbitControls enableDamping dampingFactor={0.1} />
      </Canvas>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          className={`p-2 rounded ${transformMode === "translate" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setTransformMode("translate")}
        >
          Move
        </button>
        <button
          className={`p-2 rounded ${transformMode === "rotate" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setTransformMode("rotate")}
        >
          Rotate
        </button>
        <button
          className={`p-2 rounded ${transformMode === "scale" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setTransformMode("scale")}
        >
          Scale
        </button>
      </div>
    </div>
  );
}