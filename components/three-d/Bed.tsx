import * as React from "react";
import { useRef } from "react";
import { Html } from "@react-three/drei";

interface BedProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  scale?: number;
  selected?: boolean;
  onClick?: (e: any) => void;
  metalness?: number;
  roughness?: number;
}

export function Bed({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#BBDEFB",
  scale = 1,
  selected = false,
  onClick,
  metalness = 0,
  roughness = 0.5,
}: BedProps) {
  const groupRef = useRef();

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
  );
}
