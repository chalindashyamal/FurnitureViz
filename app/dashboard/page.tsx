"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2, LogOut, Home, Settings, Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DesignPreview from "@/components/ui/DesignPreview";
import debounce from "lodash/debounce";

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
  name: string;
  date: string;
  type: string;
  roomDimensions: { width: number; length: number; height: number };
  wallColor: string;
  roomType: string;
  furniture: FurnitureItem[];
  sceneAmbientLight: number;
  sceneShadowIntensity: number;
  showShading: boolean;
}

export default function Dashboard() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce the search query updates
  const debouncedSetSearchQuery = useMemo(
    () => debounce((value: string) => setSearchQuery(value), 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSetSearchQuery.cancel(); // Cleanup on unmount
    };
  }, [debouncedSetSearchQuery]);

  // Fetch designs from the API when the component mounts
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/designs");
        if (!response.ok) {
          throw new Error("Failed to fetch designs");
        }
        const data: Design[] = await response.json();
        console.log("Fetched designs:", data);
        const mappedData = data.map((design) => ({
          id: design.id,
          name: design.name || "Untitled Design",
          date: design.date || new Date().toISOString().split("T")[0],
          type: design.type || "LIVING_ROOM",
          roomDimensions: design.roomDimensions || { width: 5, length: 7, height: 2.8 },
          wallColor: design.wallColor || "#F5F5F5",
          roomType: design.roomType || "LIVING_ROOM",
          furniture: design.furniture || [
            {
              type: "chair",
              position: [1, 0, 1],
              rotation: [0, 0, 0],
              scale: 1,
              color: "#8B4513",
              metalness: 0,
              roughness: 0.5,
            },
            {
              type: "table",
              position: [0, 0, 0],
              rotation: [0, 0, 0],
              scale: 1,
              color: "#A1887F",
              metalness: 0,
              roughness: 0.5,
            },
          ],
          sceneAmbientLight: design.sceneAmbientLight || 0.5,
          sceneShadowIntensity: design.sceneShadowIntensity || 0.8,
          showShading: design.showShading !== undefined ? design.showShading : true,
        }));
        setDesigns(mappedData);
      } catch (err) {
        setError((err as Error).message || "An error occurred while fetching designs");
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const deleteDesign = async (id: string) => {
    try {
      const response = await fetch(`/api/design/delete/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete design");
      }

      setDesigns(designs.filter((design) => design.id !== id));

      const notification = document.createElement("div");
      notification.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50";
      notification.textContent = "Design deleted successfully!";
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transition = "opacity 0.5s";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 2000);
    } catch (error) {
      const notification = document.createElement("div");
      notification.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50";
      notification.textContent = `Error deleting design: ${(error as Error).message}`;
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

  const filteredDesigns = designs.filter(
    (design) =>
      design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-slate-900 text-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl">FurnitureViz</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-slate-800">
              <Link href="/dashboard">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-slate-800">
              <Link href="/dashboard/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-slate-800">
              <Link href="/">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-slate-50">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Designs</h1>
              <p className="text-slate-600 mt-1">Manage and edit your furniture designs</p>
            </div>
            <Button asChild className="bg-blue-500 hover:bg-blue-600">
              <Link href="/dashboard/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Design
              </Link>
            </Button>
          </div>

          <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Search designs..."
                className="w-full pl-9 bg-white border-slate-200"
                onChange={(e) => debouncedSetSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Tabs defaultValue="all" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="living">Living Room</TabsTrigger>
                  <TabsTrigger value="bedroom">Bedroom</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  className={`p-2 ${viewMode === "grid" ? "bg-slate-200" : "bg-white"}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  className={`p-2 ${viewMode === "list" ? "bg-slate-200" : "bg-white"}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Loading designs...</h2>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Error</h2>
              <p className="text-slate-600 mb-6">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Retry
              </Button>
            </div>
          ) : filteredDesigns.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-4">
                <Search className="h-10 w-10 text-slate-400" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">No designs found</h2>
              <p className="text-slate-600 mb-6">
                {searchQuery
                  ? "We couldn't find any designs matching your search."
                  : "You haven't created any designs yet."}
              </p>
              {searchQuery ? (
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Clear Search
                </Button>
              ) : (
                <Button asChild className="bg-blue-500 hover:bg-blue-600">
                  <Link href="/dashboard/create">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Your First Design
                  </Link>
                </Button>
              )}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDesigns.map((design) => (
                <Card key={design.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  {/* <div className="aspect-video w-full relative group">
                    <DesignPreview
                      roomDimensions={design.roomDimensions}
                      wallColor={design.wallColor}
                      roomType={design.roomType}
                      furniture={design.furniture}
                      sceneAmbientLight={design.sceneAmbientLight}
                      sceneShadowIntensity={design.sceneShadowIntensity}
                      showShading={design.showShading}
                    />
                   
                  </div> */}
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{design.name}</CardTitle>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{design.date}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {design.type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/edit/${design.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteDesign(design.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDesigns.map((design) => (
                <Card key={design.id} className="overflow-hidden">
                  <div className="flex items-center p-4">
                    <div className="h-16 w-24 rounded mr-4 overflow-hidden">
                      <DesignPreview
                        roomDimensions={design.roomDimensions}
                        wallColor={design.wallColor}
                        roomType={design.roomType}
                        furniture={design.furniture}
                        sceneAmbientLight={design.sceneAmbientLight}
                        sceneShadowIntensity={design.sceneShadowIntensity}
                        showShading={design.showShading}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{design.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-slate-500">{design.date}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {design.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/edit/${design.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteDesign(design.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="border-t py-6 bg-white">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          <p className="text-sm text-slate-600">© 2025 FurnitureViz. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/about" className="text-sm text-slate-600 hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="text-sm text-slate-600 hover:text-blue-600">
              Contact
            </Link>
            <Link href="#" className="text-sm text-slate-600 hover:text-blue-600">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-slate-600 hover:text-blue-600">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}