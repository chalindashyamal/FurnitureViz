"use client";

import { useEffect, useState } from "react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RoomPreview from "@/components/ui/RoomPreview";

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

export default function EditDesign({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state for editing
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [wallColor, setWallColor] = useState("");
  const [furniture, setFurniture] = useState<FurnitureItem[]>([]);
  const [sceneAmbientLight, setSceneAmbientLight] = useState(0.5);
  const [sceneShadowIntensity, setSceneShadowIntensity] = useState(0.8);
  const [showShading, setShowShading] = useState(true);

  // Fetch the design data when the component mounts
  useEffect(() => {
    const fetchDesign = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/designs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch design");
        }
        const data = await response.json();
        setDesign(data);

        // Populate the form with the fetched data
        setRoomName(data.roomName);
        setRoomType(data.roomType);
        setWidth(data.roomDimensions.width.toString());
        setLength(data.roomDimensions.length.toString());
        setHeight(data.roomDimensions.height.toString());
        setWallColor(data.wallColor);
        // Convert the old furniture format to the new format if necessary
        const convertedFurniture = (data.furniture || []).map((item: any) => ({
          type: item.type || "chair",
          position: item.position || [0, 0, 0],
          rotation: item.rotation || [0, 0, 0],
          scale: item.scale || 1,
          color: item.color || "#A1887F",
          metalness: item.metalness || 0,
          roughness: item.roughness || 0.5,
        }));
        setFurniture(convertedFurniture);
        setSceneAmbientLight(data.sceneAmbientLight || 0.5);
        setSceneShadowIntensity(data.sceneShadowIntensity || 0.8);
        setShowShading(data.showShading !== undefined ? data.showShading : true);
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

  // Handle form submission to update the design
  const handleUpdateDesign = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedDesign = {
        roomName,
        roomType,
        roomDimensions: {
          width: parseFloat(width),
          length: parseFloat(length),
          height: parseFloat(height),
        },
        wallColor,
        furniture,
        sceneAmbientLight,
        sceneShadowIntensity,
        showShading,
        thumbnail: design?.thumbnail,
      };

      const response = await fetch(`/api/design/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDesign),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update design");
      }

      const notification = document.createElement("div");
      notification.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50";
      notification.textContent = "Design updated successfully!";
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transition = "opacity 0.5s";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 2000);

      router.push("/dashboard");
    } catch (error) {
      const notification = document.createElement("div");
      notification.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50";
      notification.textContent = `Error updating design: ${(error as Error).message}`;
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

  // Handle furniture updates from RoomPreview
  const handleFurnitureUpdate = (newFurniture: FurnitureItem[]) => {
    setFurniture(newFurniture);
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
            <span className="text-xl">Edit Design: {design.roomName}</span>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 3D Preview Section */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">Room Preview</h2>
            <RoomPreview
              roomDimensions={design.roomDimensions}
              wallColor={wallColor}
              roomType={roomType}
              furniture={furniture}
              sceneAmbientLight={sceneAmbientLight}
              sceneShadowIntensity={sceneShadowIntensity}
              showShading={showShading}
              onFurnitureUpdate={handleFurnitureUpdate}
            />
          </div>

          {/* Controls and Form Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-2">Design Settings</h2>
            <form onSubmit={handleUpdateDesign} className="space-y-6">
              {/* Room Details */}
              <div>
                <Label htmlFor="roomName">Room Name</Label>
                <Input
                  id="roomName"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="roomType">Room Type</Label>
                <Input
                  id="roomType"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="width">Width (m)</Label>
                <Input
                  id="width"
                  type="number"
                  step="0.1"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="length">Length (m)</Label>
                <Input
                  id="length"
                  type="number"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="height">Height (m)</Label>
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="wallColor">Wall Color</Label>
                <Input
                  id="wallColor"
                  type="color"
                  value={wallColor}
                  onChange={(e) => setWallColor(e.target.value)}
                  required
                />
              </div>

              {/* Lighting and Shading Controls */}
              <div>
                <Label htmlFor="sceneAmbientLight">Ambient Light Intensity</Label>
                <Slider
                  id="sceneAmbientLight"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[sceneAmbientLight]}
                  onValueChange={(value) => setSceneAmbientLight(value[0])}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="sceneShadowIntensity">Shadow Intensity</Label>
                <Slider
                  id="sceneShadowIntensity"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[sceneShadowIntensity]}
                  onValueChange={(value) => setSceneShadowIntensity(value[0])}
                  className="mt-2"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="showShading"
                  checked={showShading}
                  onCheckedChange={setShowShading}
                />
                <Label htmlFor="showShading">Show Shading</Label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  Save Changes
                </Button>
                <Button asChild variant="outline">
                  <Link href="/dashboard">Cancel</Link>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}