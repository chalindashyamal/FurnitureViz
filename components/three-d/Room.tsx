import * as React from "react";

interface RoomProps {
  width?: number;
  length?: number;
  height?: number;
  wallColor?: string;
  roomType?: string;
}

export function Room({
  width = 5,
  length = 7,
  height = 2.8,
  wallColor = "#F5F5F5",
  roomType = "LIVING_ROOM",
}: RoomProps) {
  const renderRoomSpecificElements = () => {
    switch (roomType) {
      case "BATHROOM":
        return (
          <>
            <mesh position={[width / 2 - 0.8, 0.3, -length / 2 + 1]} rotation={[0, 0, 0]}>
              <boxGeometry args={[1.5, 0.6, 0.8]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[-width / 2 + 0.8, 0.9, -length / 2 + 0.8]} rotation={[0, 0, 0]}>
              <boxGeometry args={[1.5, 1.8, 1.5]} />
              <meshStandardMaterial color="#B3E5FC" transparent opacity={0.5} />
            </mesh>
            <mesh position={[-width / 2 + 0.8, 1.8, -length / 2 + 0.2]} rotation={[Math.PI / 4, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.3]} />
              <meshStandardMaterial color="#CFD8DC" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-width / 2 + 0.8, 0.01, -length / 2 + 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
              <meshStandardMaterial color="#90A4AE" metalness={0.8} roughness={0.2} />
            </mesh>
          </>
        );
      case "KITCHEN":
        return (
          <>
            <mesh position={[0, 0.5, -length / 2 + 0.4]} rotation={[0, 0, 0]}>
              <boxGeometry args={[width - 1, 1, 0.8]} />
              <meshStandardMaterial color="#ECEFF1" />
            </mesh>
            <mesh position={[1, 0.6, -length / 2 + 0.4]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.8, 0.1, 0.6]} />
              <meshStandardMaterial color="#CFD8DC" />
            </mesh>
            <group position={[1, 0.7, -length / 2 + 0.2]}>
              <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.2]} />
                <meshStandardMaterial color="#CFD8DC" metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.2, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.2]} />
                <meshStandardMaterial color="#CFD8DC" metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
            <mesh position={[-1, 0.55, -length / 2 + 0.4]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.8, 0.1, 0.6]} />
              <meshStandardMaterial color="#263238" />
            </mesh>
            <mesh position={[-1.2, 0.56, -length / 2 + 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
              <meshStandardMaterial color="#37474F" />
            </mesh>
            <mesh position={[-0.8, 0.56, -length / 2 + 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
              <meshStandardMaterial color="#37474F" />
            </mesh>
          </>
        );
      case "BEDROOM":
        return (
          <>
            <mesh position={[0, height / 2, -length / 2 + 0.01]} rotation={[0, 0, 0]}>
              <planeGeometry args={[2, 1.5]} />
              <meshStandardMaterial color="#B3E5FC" transparent opacity={0.5} />
            </mesh>
            <mesh position={[0, height / 2, -length / 2 + 0.005]} rotation={[0, 0, 0]}>
              <boxGeometry args={[2.1, 1.6, 0.05]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, height / 2, -length / 2 + 0.02]} rotation={[0, 0, 0]}>
              <boxGeometry args={[2, 0.05, 0.03]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, height / 2, -length / 2 + 0.02]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.05, 1.5, 0.03]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
          </>
        );
      case "LIVING_ROOM":
        return (
          <>
            <mesh position={[width / 2 - 0.01, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[3, 1.8]} />
              <meshStandardMaterial color="#B3E5FC" transparent opacity={0.5} />
            </mesh>
            <mesh position={[width / 2 - 0.02, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <boxGeometry args={[3.1, 1.9, 0.05]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, height / 2, -length / 2 + 0.01]} rotation={[0, 0, 0]}>
              <boxGeometry args={[2, 1.2, 0.1]} />
              <meshStandardMaterial color="#263238" />
            </mesh>
          </>
        );
      case "DINING_ROOM":
        return (
          <>
            <group position={[0, height - 0.5, 0]}>
              <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.1]} />
                <meshStandardMaterial color="#CFD8DC" metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh position={[0, -0.2, 0]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#ECEFF1" transparent opacity={0.7} />
              </mesh>
              <mesh position={[0.15, -0.3, 0]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#FFECB3" emissive="#FFECB3" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[-0.15, -0.3, 0]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#FFECB3" emissive="#FFECB3" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0, -0.3, 0.15]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#FFECB3" emissive="#FFECB3" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0, -0.3, -0.15]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#FFECB3" emissive="#FFECB3" emissiveIntensity={0.5} />
              </mesh>
            </group>
            <mesh position={[0, height / 2, -length / 2 + 0.01]} rotation={[0, 0, 0]}>
              <boxGeometry args={[1.5, 1, 0.05]} />
              <meshStandardMaterial color="#FFCC80" />
            </mesh>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#E0E0E0" />
      </mesh>
      <mesh position={[0, 0.05, -length / 2 + 0.025]} rotation={[0, 0, 0]}>
        <boxGeometry args={[width, 0.1, 0.05]} />
        <meshStandardMaterial color="#BDBDBD" />
      </mesh>
      <mesh position={[-width / 2 + 0.025, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[length, 0.1, 0.05]} />
        <meshStandardMaterial color="#BDBDBD" />
      </mesh>
      <mesh position={[width / 2 - 0.025, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[length, 0.1, 0.05]} />
        <meshStandardMaterial color="#BDBDBD" />
      </mesh>
      <mesh position={[0, height / 2, -length / 2]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      <mesh position={[-width / 2, height / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      <mesh position={[width / 2, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
      {renderRoomSpecificElements()}
    </group>
  );
}
