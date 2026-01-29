import React, { useRef, useMemo, useState, useEffect, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Canvas3DErrorBoundary } from './Canvas3DErrorBoundary';
import { CyberFallbackBackground } from './CyberFallbackBackground';
import { RENDER_TIMEOUT_MS } from './constants3D';

interface ParticlesProps {
  count?: number;
  isMobile?: boolean;
}

const Particles = memo(function Particles({ count = 5000, isMobile = false }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      
      positions.set([x, y, z], i * 3);
    }
    
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      // Simplify animation on mobile
      if (isMobile) {
        ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      } else {
        ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      }
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff6b35"
        size={isMobile ? 0.015 : 0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isMobile ? 0.5 : 0.6}
      />
    </Points>
  );
});

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  isMobile?: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = memo(function ParticleBackground({ 
  className = '', 
  particleCount = 5000,
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
          camera={{ position: [0, 0, 3], fov: 75 }}
          dpr={isMobile ? [1, 1] : [1, 2]}
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: !isMobile,
            powerPreference: "high-performance"
          }}
          onCreated={() => setIsLoaded(true)}
          frameloop="demand"
        >
          <Particles count={particleCount} isMobile={isMobile} />
        </Canvas>
      </Canvas3DErrorBoundary>
    </div>
  );
});
