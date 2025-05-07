import * as React from "react";
import { useRef } from "react";
import { Html } from "@react-three/drei";

interface CabinetProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  scale?: number;
  selected?: boolean;
  onClick?: (e: any) => void;
  metalness?: number;
  roughness?: number;
}

export function Cabinet({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#D7CCC8",
  scale = 1,
  selected = false,
  onClick,
  metalness = 0,
  roughness = 0.5,
}: CabinetProps) {
  const groupRef = useRef();

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
  );
}
