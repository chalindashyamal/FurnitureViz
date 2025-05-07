import * as React from "react";
import { useRef } from "react";
import { Html } from "@react-three/drei";

interface SofaProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  scale?: number;
  selected?: boolean;
  onClick?: (e: any) => void;
  metalness?: number;
  roughness?: number;
}

export function Sofa({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#78909C",
  scale = 1,
  selected = false,
  onClick,
  metalness = 0,
  roughness = 0.5,
}: SofaProps) {
  const groupRef = useRef();

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[scale, scale, scale]} onClick={onClick}>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.8, 0.4, 0.8]} />
        <meshStandardMaterial
          color={color === "#78909C" ? "#546E7A" : color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[-0.45, 0.35, 0]}>
        <boxGeometry args={[0.85, 0.1, 0.75]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.45, 0.35, 0]}>
        <boxGeometry args={[0.85, 0.1, 0.75]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <boxGeometry args={[0.05, 0.12, 0.75]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.45, 0.36, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75, 8, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.45, 0.36, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75, 8, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.6, -0.35]}>
        <boxGeometry args={[1.8, 0.7, 0.1]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.45, 0.6, -0.3]}>
        <boxGeometry args={[0.85, 0.6, 0.15]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.45, 0.6, -0.3]}>
        <boxGeometry args={[0.85, 0.6, 0.15]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, 0.6, -0.3]}>
        <boxGeometry args={[0.05, 0.6, 0.15]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.45, 0.6, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.45, 0.6, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.85, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.8]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.85, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.8]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.85, 0.55, 0.1]}>
        <boxGeometry args={[0.12, 0.1, 0.6]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.85, 0.55, 0.1]}>
        <boxGeometry args={[0.12, 0.1, 0.6]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.8, 0.1, 0.3]}>
        <cylinderGeometry args={[0.04, 0.05, 0.2]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.8, 0.1, 0.3]}>
        <cylinderGeometry args={[0.04, 0.05, 0.2]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.8, 0.1, -0.3]}>
        <cylinderGeometry args={[0.04, 0.05, 0.2]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.8, 0.1, -0.3]}>
        <cylinderGeometry args={[0.04, 0.05, 0.2]} />
        <meshStandardMaterial color="#5D4037" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.8, 0.01, 0.3]}>
        <sphereGeometry args={[0.05, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.8, 0.01, 0.3]}>
        <sphereGeometry args={[0.05, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0.8, 0.01, -0.3]}>
        <sphereGeometry args={[0.05, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-0.8, 0.01, -0.3]}>
        <sphereGeometry args={[0.05, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3E2723" metalness={metalness} roughness={roughness} />
      </mesh>
      {selected && (
        <Html>
          <div className="px-2 py-1 bg-primary text-white text-xs rounded-md whitespace-nowrap">Sofa</div>
        </Html>
      )}
    </group>
  );
}
