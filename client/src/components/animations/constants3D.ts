/**
 * Configuration constants for 3D component rendering
 * Defines optimized values for mobile vs desktop rendering
 */

// Particle counts
export const PARTICLE_COUNT = {
  HERO_CYBER_MOBILE: 300,
  HERO_CYBER_DESKTOP: 2000,
  ABOUT_MOBILE: 500,
  ABOUT_DESKTOP: 1500,
  STATISTICS_MOBILE: 500,
  STATISTICS_DESKTOP: 1500,
  QUICKLINKS_MOBILE: 500,
  QUICKLINKS_DESKTOP: 1500,
  HERO_MOBILE: 800,
  HERO_DESKTOP: 3000,
} as const;

// Grid counts for hexagonal grids
export const GRID_COUNT = {
  HERO_CYBER_MOBILE: 20,
  HERO_CYBER_DESKTOP: 40,
  ABOUT_MOBILE: 15,
  ABOUT_DESKTOP: 40,
  STATISTICS_MOBILE: 15,
  STATISTICS_DESKTOP: 40,
  QUICKLINKS_MOBILE: 15,
  QUICKLINKS_DESKTOP: 40,
} as const;

// Geometric shapes counts
export const SHAPE_COUNT = {
  MOBILE: 3,
  DESKTOP: 6,
} as const;

// Logo3D polygon counts
export const LOGO_SEGMENTS = {
  MOBILE_SPHERE: 32,
  DESKTOP_SPHERE: 64,
  MOBILE_GLOW: 16,
  DESKTOP_GLOW: 32,
} as const;

// Torus segments [radial, tubular]
export const TORUS_SEGMENTS = {
  MOBILE: [8, 16],
  DESKTOP: [16, 32],
} as const;

// Sphere segments for geometric shapes
export const SPHERE_SEGMENTS = {
  MOBILE: 16,
  DESKTOP: 32,
} as const;

// 3D rendering timeouts
export const RENDER_TIMEOUT_MS = 2000;
