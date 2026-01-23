import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Sphere, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShape3DProps {
  position: [number, number, number];
  rotation?: number;
  type: 'sphere' | 'torus' | 'octahedron';
}

function FloatingShape3D({ position, rotation = 0, type }: FloatingShape3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotation animation
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
      
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + rotation) * 0.5;
    }
  });

  const commonProps = {
    ref: meshRef,
    position,
  };

  return (
    <group>
      {type === 'sphere' && (
        <Sphere {...commonProps} args={[0.5, 32, 32]}>
          <meshStandardMaterial
            color="#FF6B35"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.6}
            emissive="#FF6B35"
            emissiveIntensity={0.3}
          />
        </Sphere>
      )}
      
      {type === 'torus' && (
        <Torus {...commonProps} args={[0.4, 0.15, 16, 32]}>
          <meshStandardMaterial
            color="#F7931E"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7}
            emissive="#F7931E"
            emissiveIntensity={0.4}
          />
        </Torus>
      )}
      
      {type === 'octahedron' && (
        <Octahedron {...commonProps} args={[0.6, 0]}>
          <meshStandardMaterial
            color="#FF8C42"
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.5}
            emissive="#FF8C42"
            emissiveIntensity={0.2}
          />
        </Octahedron>
      )}
    </group>
  );
}

function Scene() {
  const shapes = useMemo(() => [
    { type: 'sphere' as const, position: [-3, 2, -2] as [number, number, number], rotation: 0 },
    { type: 'torus' as const, position: [3, -1, -3] as [number, number, number], rotation: 1 },
    { type: 'octahedron' as const, position: [-2, -2, -1] as [number, number, number], rotation: 2 },
    { type: 'sphere' as const, position: [2, 3, -4] as [number, number, number], rotation: 3 },
    { type: 'torus' as const, position: [-4, 0, -2] as [number, number, number], rotation: 4 },
    { type: 'octahedron' as const, position: [4, 1, -1] as [number, number, number], rotation: 5 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#FF6B35" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#F7931E" />
      
      {shapes.map((shape, index) => (
        <FloatingShape3D
          key={index}
          type={shape.type}
          position={shape.position}
          rotation={shape.rotation}
        />
      ))}
    </>
  );
}

interface GeometricShapes3DProps {
  className?: string;
}

export const GeometricShapes3D: React.FC<GeometricShapes3DProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  );
};
