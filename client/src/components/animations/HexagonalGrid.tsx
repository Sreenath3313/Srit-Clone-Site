import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Canvas3DErrorBoundary } from './Canvas3DErrorBoundary';
import { RENDER_TIMEOUT_MS } from './constants3D';

interface HexGridProps {
  count?: number;
  isMobile?: boolean;
}

function HexGrid({ count = 50, isMobile = false }: HexGridProps) {
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
        
        // Simplified animation on mobile
        const animationSpeed = isMobile ? 0.3 : 0.5;
        const rotationSpeed = isMobile ? 0.05 : 0.1;
        
        // Floating animation
        const floatY = hex.y + Math.sin(time * animationSpeed + i * 0.1) * 0.2;
        
        // Rotation animation
        const rotation = hex.rotation + time * rotationSpeed;
        
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
  isMobile?: boolean;
}

export const HexagonalGrid: React.FC<HexagonalGridProps> = ({ 
  className = '', 
  gridCount = 50,
  isMobile = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    // Timeout fallback after configured timeout
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setHasTimedOut(true);
      }
    }, RENDER_TIMEOUT_MS);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  // Show CSS fallback if timed out
  if (hasTimedOut && !isLoaded) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 107, 53, 0.3) 2px, rgba(255, 107, 53, 0.3) 3px),
                             repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 107, 53, 0.3) 2px, rgba(255, 107, 53, 0.3) 3px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas3DErrorBoundary>
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 75 }}
          dpr={isMobile ? [1, 1] : [1, 2]}
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: !isMobile,
            powerPreference: "high-performance"
          }}
          onCreated={() => setIsLoaded(true)}
        >
          <HexGrid count={gridCount} isMobile={isMobile} />
        </Canvas>
      </Canvas3DErrorBoundary>
    </div>
  );
};
