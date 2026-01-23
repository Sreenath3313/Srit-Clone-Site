import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Canvas3DErrorBoundary } from './Canvas3DErrorBoundary';
import { LOGO_SEGMENTS, RENDER_TIMEOUT_MS } from './constants3D';

interface AnimatedLogoProps {
  rotation?: number;
  isMobile?: boolean;
}

function AnimatedLogo({ rotation = 0, isMobile = false }: AnimatedLogoProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      // Simplified animation on mobile
      const floatSpeed = isMobile ? 0.3 : 0.5;
      const rotationSpeed = isMobile ? 0.003 : 0.005;
      
      // Floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * floatSpeed) * 0.3;
      
      // Rotation animation
      if (!isMobile) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.1;
      }
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  // Reduce segments on mobile
  const segments = isMobile ? LOGO_SEGMENTS.MOBILE_SPHERE : LOGO_SEGMENTS.DESKTOP_SPHERE;
  const glowSegments = isMobile ? LOGO_SEGMENTS.MOBILE_GLOW : LOGO_SEGMENTS.DESKTOP_GLOW;

  return (
    <group ref={groupRef} rotation={[0, rotation, 0]}>
      {/* Main circular logo sphere */}
      <Sphere ref={meshRef} args={[1, segments, segments]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#FF6B35"
          attach="material"
          distort={isMobile ? 0.2 : 0.3}
          speed={isMobile ? 1.5 : 2}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Glow effect - outer sphere */}
      <Sphere args={[1.15, glowSegments, glowSegments]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#FF6B35"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Point lights for glow */}
      <pointLight position={[0, 0, 0]} intensity={isMobile ? 1.2 : 1.5} color="#FF6B35" distance={5} />
      {!isMobile && (
        <>
          <pointLight position={[2, 2, 2]} intensity={0.8} color="#F7931E" distance={3} />
          <pointLight position={[-2, -2, -2]} intensity={0.8} color="#FF8C42" distance={3} />
        </>
      )}
    </group>
  );
}

interface Logo3DProps {
  className?: string;
  height?: string;
  isMobile?: boolean;
}

export const Logo3D: React.FC<Logo3DProps> = ({ 
  className = '', 
  height = '400px',
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
      <div className={className} style={{ height }}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-xl shadow-orange-500/50" />
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={{ height }}>
      <Canvas3DErrorBoundary>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={isMobile ? [1, 1] : [1, 2]}
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: !isMobile,
            powerPreference: "high-performance"
          }}
          onCreated={() => setIsLoaded(true)}
        >
          <ambientLight intensity={0.3} />
          <AnimatedLogo isMobile={isMobile} />
        </Canvas>
      </Canvas3DErrorBoundary>
    </div>
  );
};
