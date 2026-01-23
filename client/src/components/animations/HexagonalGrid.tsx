import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HexGridProps {
  count?: number;
}

function HexGrid({ count = 50 }: HexGridProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const hexagons = useMemo(() => {
    const temp = [];
    const hexRadius = 0.5;
    const spacing = 1.8;
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 5 - 3;
      const scale = Math.random() * 0.5 + 0.5;
      const rotation = Math.random() * Math.PI * 2;
      
      temp.push({ x, y, z, scale, rotation });
    }
    
    return temp;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      hexagons.forEach((hex, i) => {
        const matrix = new THREE.Matrix4();
        const time = state.clock.elapsedTime;
        
        // Floating animation
        const floatY = hex.y + Math.sin(time * 0.5 + i * 0.1) * 0.2;
        
        // Rotation animation
        const rotation = hex.rotation + time * 0.1;
        
        matrix.makeRotationZ(rotation);
        matrix.setPosition(hex.x, floatY, hex.z);
        matrix.scale(new THREE.Vector3(hex.scale, hex.scale, hex.scale));
        
        meshRef.current!.setMatrixAt(i, matrix);
      });
      
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const hexShape = useMemo(() => {
    const shape = new THREE.Shape();
    const radius = 1;
    
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();
    
    return new THREE.ShapeGeometry(shape);
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[hexShape, undefined, count]}>
      <meshBasicMaterial
        color="#FF6B35"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
        wireframe
      />
    </instancedMesh>
  );
}

interface HexagonalGridProps {
  className?: string;
  gridCount?: number;
}

export const HexagonalGrid: React.FC<HexagonalGridProps> = ({ 
  className = '', 
  gridCount = 50 
}) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <HexGrid count={gridCount} />
      </Canvas>
    </div>
  );
};
