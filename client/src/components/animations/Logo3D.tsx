import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedLogoProps {
  rotation?: number;
}

function AnimatedLogo({ rotation = 0 }: AnimatedLogoProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      // Floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      
      // Rotation animation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, rotation, 0]}>
      {/* Main circular logo sphere */}
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#FF6B35"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Glow effect - outer sphere */}
      <Sphere args={[1.15, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#FF6B35"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Point lights for glow */}
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#FF6B35" distance={5} />
      <pointLight position={[2, 2, 2]} intensity={0.8} color="#F7931E" distance={3} />
      <pointLight position={[-2, -2, -2]} intensity={0.8} color="#FF8C42" distance={3} />
    </group>
  );
}

interface Logo3DProps {
  className?: string;
  height?: string;
}

export const Logo3D: React.FC<Logo3DProps> = ({ 
  className = '', 
  height = '400px' 
}) => {
  return (
    <div className={className} style={{ height }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <AnimatedLogo />
      </Canvas>
    </div>
  );
};
