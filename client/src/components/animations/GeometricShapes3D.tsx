import React, { useRef, useMemo, useState, useEffect, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Sphere, Octahedron } from '@react-three/drei';
import * as THREE from 'three';
import { Canvas3DErrorBoundary } from './Canvas3DErrorBoundary';
import { CyberFallbackBackground } from './CyberFallbackBackground';
import { SHAPE_COUNT, SPHERE_SEGMENTS, TORUS_SEGMENTS, RENDER_TIMEOUT_MS } from './constants3D';

interface FloatingShape3DProps {
  position: [number, number, number];
  rotation?: number;
  type: 'sphere' | 'torus' | 'octahedron';
  isMobile?: boolean;
}

const FloatingShape3D = memo(function FloatingShape3D({ position, rotation = 0, type, isMobile = false }: FloatingShape3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Simplified rotation on mobile
      if (isMobile) {
        meshRef.current.rotation.y += 0.01;
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + rotation) * 0.3;
      } else {
        // Full rotation animation
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.015;
        
        // Floating animation
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + rotation) * 0.5;
      }
    }
  });

  const commonProps = {
    ref: meshRef,
    position,
  };

  // Reduce polygon count on mobile
  const sphereSegments = isMobile ? SPHERE_SEGMENTS.MOBILE : SPHERE_SEGMENTS.DESKTOP;
  const torusSegments = isMobile ? TORUS_SEGMENTS.MOBILE : TORUS_SEGMENTS.DESKTOP;

  return (
    <group>
      {type === 'sphere' && (
        <Sphere {...commonProps} args={[0.5, sphereSegments, sphereSegments]}>
          <meshStandardMaterial
            color="#FF6B35"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.6}
            emissive="#FF6B35"
            emissiveIntensity={isMobile ? 0.2 : 0.3}
          />
        </Sphere>
      )}
      
      {type === 'torus' && (
        <Torus {...commonProps} args={[0.4, 0.15, torusSegments[0], torusSegments[1]]}>
          <meshStandardMaterial
            color="#F7931E"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7}
            emissive="#F7931E"
            emissiveIntensity={isMobile ? 0.3 : 0.4}
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
            emissiveIntensity={isMobile ? 0.15 : 0.2}
          />
        </Octahedron>
      )}
    </group>
  );
});

interface SceneProps {
  isMobile?: boolean;
}

const Scene = memo(function Scene({ isMobile = false }: SceneProps) {
  const shapes = useMemo(() => {
    // Reduce shapes on mobile (3 vs 6)
    if (isMobile) {
      return [
        { type: 'sphere' as const, position: [-2, 1, -2] as [number, number, number], rotation: 0 },
        { type: 'torus' as const, position: [2, -1, -2] as [number, number, number], rotation: 1 },
        { type: 'octahedron' as const, position: [0, 0, -3] as [number, number, number], rotation: 2 },
      ];
    }
    
    return [
      { type: 'sphere' as const, position: [-3, 2, -2] as [number, number, number], rotation: 0 },
      { type: 'torus' as const, position: [3, -1, -3] as [number, number, number], rotation: 1 },
      { type: 'octahedron' as const, position: [-2, -2, -1] as [number, number, number], rotation: 2 },
      { type: 'sphere' as const, position: [2, 3, -4] as [number, number, number], rotation: 3 },
      { type: 'torus' as const, position: [-4, 0, -2] as [number, number, number], rotation: 4 },
      { type: 'octahedron' as const, position: [4, 1, -1] as [number, number, number], rotation: 5 },
    ];
  }, [isMobile]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={isMobile ? 0.6 : 0.8} color="#FF6B35" />
      <pointLight position={[-10, -10, -5]} intensity={isMobile ? 0.4 : 0.5} color="#F7931E" />
      
      {shapes.map((shape, index) => (
        <FloatingShape3D
          key={index}
          type={shape.type}
          position={shape.position}
          rotation={shape.rotation}
          isMobile={isMobile}
        />
      ))}
    </>
  );
});

interface GeometricShapes3DProps {
  className?: string;
  isMobile?: boolean;
}

export const GeometricShapes3D: React.FC<GeometricShapes3DProps> = memo(function GeometricShapes3D({ 
  className = '',
  isMobile = false
}) {
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
        <CyberFallbackBackground />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas3DErrorBoundary>
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={isMobile ? [1, 1] : [1, 2]}
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: !isMobile,
            powerPreference: "high-performance"
          }}
          onCreated={() => setIsLoaded(true)}
          frameloop="demand"
        >
          <Scene isMobile={isMobile} />
        </Canvas>
      </Canvas3DErrorBoundary>
    </div>
  );
});
