import * as React from "react";
import { useRef } from "react";
import { Html } from "@react-three/drei";

interface TableProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  scale?: number;
  selected?: boolean;
  onClick?: (e: any) => void;
  metalness?: number;
  roughness?: number;
}

export function Table({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#A1887F",
  scale = 1,
  selected = false,
  onClick,
  metalness = 0,
  roughness = 0.5,
}: TableProps) {
  const groupRef = useRef();

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
  );
}