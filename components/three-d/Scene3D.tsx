import * as React from "react";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { TransformControls, Environment } from "@react-three/drei";
import { Room } from "./Room";
import { Chair } from "./Chair";
import { Table } from "./Table";
import { Sofa } from "./Sofa";
import { Cabinet } from "./Cabinet";
import { Bed } from "./Bed";

interface FurnitureItem {
  type: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
}

interface Scene3DProps {
  roomDimensions: { width: number; length: number; height: number };
  wallColor: string;
  roomType: string;
  furniture: FurnitureItem[];
  setFurniture: (furniture: FurnitureItem[]) => void;
  selectedFurniture: number | null;
  setSelectedFurniture: (index: number | null) => void;
  sceneAmbientLight: number;
  sceneShadowIntensity: number;
  showShading: boolean;
  transformMode?: "translate" | "rotate" | "scale";
  previewMode?: boolean;
}

export function Scene3D({
  roomDimensions,
  wallColor,
  roomType,
  furniture,
  setFurniture,
  selectedFurniture,
  setSelectedFurniture,
  sceneAmbientLight,
  sceneShadowIntensity,
  showShading,
  transformMode = "translate",
  previewMode = false,
}: Scene3DProps) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 3, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useEffect(() => {
    if (selectedFurniture !== null && furniture.length > 0) {
      const selectedItem = furniture[selectedFurniture];
      if (selectedItem && selectedItem.position) {
        camera.lookAt(selectedItem.position[0], selectedItem.position[1] + 0.5, selectedItem.position[2]);
      }
    }
  }, [selectedFurniture, furniture, camera]);

  return (
    <>
      <Room
        width={roomDimensions.width}
        length={roomDimensions.length}
        height={roomDimensions.height}
        wallColor={wallColor}
        roomType={roomType}
      />
      {furniture.length === 0 ? (
        // Display a placeholder if no furniture is present
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
      ) : (
        furniture.map((item, index) => {
          const isSelected = selectedFurniture === index;
          let FurnitureComponent;
          switch (item.type) {
            case "chair":
              FurnitureComponent = Chair;
              break;
            case "table":
              FurnitureComponent = Table;
              break;
            case "sofa":
              FurnitureComponent = Sofa;
              break;
            case "cabinet":
              FurnitureComponent = Cabinet;
              break;
            case "bed":
              FurnitureComponent = Bed;
              break;
            default:
              FurnitureComponent = Chair;
          }

          return (
            <group key={index}>
              {isSelected && !previewMode ? (
                <TransformControls
                  mode={transformMode}
                  position={item.position || [0, 0, 0]}
                  rotation={item.rotation || [0, 0, 0]}
                  scale={[item.scale || 1, item.scale || 1, item.scale || 1]}
                  onObjectChange={(e) => {
                    const newFurniture = [...furniture];
                    if (e.target.object) {
                      newFurniture[index].position = [
                        e.target.object.position.x,
                        e.target.object.position.y,
                        e.target.object.position.z,
                      ];
                      newFurniture[index].rotation = [
                        e.target.object.rotation.x,
                        e.target.object.rotation.y,
                        e.target.object.rotation.z,
                      ];
                      newFurniture[index].scale = e.target.object.scale.x;
                      setFurniture(newFurniture);
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
                      e.stopPropagation();
                      setSelectedFurniture(index);
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
                    e.stopPropagation();
                    setSelectedFurniture(index);
                  }}
                  metalness={item.metalness || 0}
                  roughness={item.roughness || 0.5}
                />
              )}
            </group>
          );
        })
      )}
      <ambientLight intensity={sceneAmbientLight} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={sceneShadowIntensity}
        castShadow={showShading && !previewMode}
        shadow-mapSize-width={previewMode ? 256 : 1024}
        shadow-mapSize-height={previewMode ? 256 : 1024}
        shadow-bias={-0.0001}
      />
      <Environment preset="apartment" />
    </>
  );
}
