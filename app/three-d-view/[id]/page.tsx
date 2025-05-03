"use client";

import { useEffect, useState } from "react";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Move, RotateCcw, Scaling } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Scene3D } from "@/components/three-d/Scene3D";

interface FurnitureItem {
  type: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
}

interface Design {
  id: string;
  roomName: string;
  roomType: string;
  roomDimensions: { width: number; length: number; height: number };
  wallColor: string;
  furniture: FurnitureItem[];
  sceneAmbientLight: number;
  sceneShadowIntensity: number;
  showShading: boolean;
  thumbnail?: string;
}

export default function ThreeDView({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFurniture, setSelectedFurniture] = useState<number | null>(null);
  const [transformMode, setTransformMode] = useState<"translate" | "rotate" | "scale">("translate");

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/designs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch design");
        }
        const data = await response.json();
        setDesign({
          ...data,
          furniture: (data.furniture || []).map((item: any) => ({
            type: item.type || "chair",
            position: item.position || [0, 0, 0],
            rotation: item.rotation || [0, 0, 0],
            scale: item.scale || 1,
            color: item.color || "#A1887F",
            metalness: item.metalness || 0,
            roughness: item.roughness || 0.5,
          })),
        });
      } catch (err) {
        setError((err as Error).message || "An error occurred while fetching the design");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDesign();
    }
  }, [id]);

  const handleSetFurniture = (newFurniture: FurnitureItem[]) => {
    if (design) {
      setDesign({ ...design, furniture: newFurniture });
    }
  };

  if (loading) {
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
              <span className="text-xl">Loading...</span>
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <p>Loading design...</p>
        </main>
      </div>
    );
  }

  if (error || !design) {
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
              <span className="text-xl">Error</span>
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Error</h2>
            <p className="text-slate-600 mb-6">{error || "Design not found"}</p>
            <Button asChild variant="outline">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </main>
      </div>
    );
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
            <span className="text-xl">{design.roomName} - 3D View</span>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-8">
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-gray-100">
          <Canvas shadows>
            <Scene3D
              roomDimensions={design.roomDimensions}
              wallColor={design.wallColor}
              roomType={design.roomType}
              furniture={design.furniture}
              setFurniture={handleSetFurniture}
              selectedFurniture={selectedFurniture}
              setSelectedFurniture={setSelectedFurniture}
              sceneAmbientLight={design.sceneAmbientLight}
              sceneShadowIntensity={design.sceneShadowIntensity}
              showShading={design.showShading}
            />
            <OrbitControls enableDamping dampingFactor={0.1} />
          </Canvas>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant={transformMode === "translate" ? "default" : "outline"}
              size="icon"
              onClick={() => setTransformMode("translate")}
            >
              <Move className="h-4 w-4" />
            </Button>
            <Button
              variant={transformMode === "rotate" ? "default" : "outline"}
              size="icon"
              onClick={() => setTransformMode("rotate")}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant={transformMode === "scale" ? "default" : "outline"}
              size="icon"
              onClick={() => setTransformMode("scale")}
            >
              <Scaling className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}