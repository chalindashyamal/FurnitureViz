"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Scene3D } from "@/components/three-d/Scene3D";
import { useInView } from "react-intersection-observer";

interface FurnitureItem {
  type: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
}

interface DesignPreviewProps {
  roomDimensions: { width: number; length: number; height: number };
  wallColor: string;
  roomType: string;
  furniture: FurnitureItem[];
  sceneAmbientLight: number;
  sceneShadowIntensity: number;
  showShading: boolean;
}

export default function DesignPreview({
  roomDimensions,
  wallColor,
  roomType,
  furniture,
  sceneAmbientLight,
  sceneShadowIntensity,
  showShading,
}: DesignPreviewProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false, // Keep checking visibility
    threshold: 0.1, // Render when 10% of the component is visible
  });

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleSetFurniture = () => {};
  const handleSetSelectedFurniture = () => {};

  if (!isMounted) {
    return <div className="aspect-video w-full bg-gray-200 rounded-t-lg" />;
  }

  return (
    <div ref={ref} className="aspect-video w-full rounded-t-lg">
      {inView ? (
        <Canvas shadows className="rounded-t-lg">
          <Scene3D
            roomDimensions={roomDimensions}
            wallColor={wallColor}
            roomType={roomType}
            furniture={furniture}
            setFurniture={handleSetFurniture}
            selectedFurniture={null}
            setSelectedFurniture={handleSetSelectedFurniture}
            sceneAmbientLight={sceneAmbientLight}
            sceneShadowIntensity={sceneShadowIntensity}
            showShading={showShading}
            transformMode="translate"
            previewMode={true}
          />
          <OrbitControls
            enableDamping
            dampingFactor={0.1}
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
            target={[0, 0, 0]}
          />
        </Canvas>
      ) : (
        <div className="aspect-video w-full bg-gray-200 rounded-t-lg" />
      )}
    </div>
  );
}