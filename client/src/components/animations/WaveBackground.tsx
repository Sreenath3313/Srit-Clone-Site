import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Wave() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const geometry = meshRef.current.geometry;
      const positions = geometry.attributes.position;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const waveX = Math.sin(x * 0.5 + time) * 0.3;
        const waveY = Math.sin(y * 0.5 + time * 1.2) * 0.3;
        positions.setZ(i, waveX + waveY);
      }

      positions.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 128, 128]} />
      <meshStandardMaterial
        color="#ff6b35"
        wireframe={false}
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={1} />
    </mesh>
  );
}

interface WaveBackgroundProps {
  className?: string;
}

export const WaveBackground: React.FC<WaveBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <Wave />
      </Canvas>
    </div>
  );
};
