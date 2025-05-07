import * as React from "react";
import { useRef } from "react";
import { Html } from "@react-three/drei";

interface ChairProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  scale?: number;
  selected?: boolean;
  metalness?: number;
  roughness?: number;
  onClick?: (e: any) => void;
}

export function Chair({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#8B4513",
  scale = 1,
  selected = false,
  metalness = 0,
  roughness = 0.5,
  onClick,
}: ChairProps) {
  const groupRef = useRef();

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
  );
}