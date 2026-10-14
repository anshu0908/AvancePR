import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vDist;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Distance from center offset by damped mouse
    vec2 center = vec2(0.0, 0.0) + uMouse * 0.35;
    float dist = length(pos.xy - center);
    vDist = dist;

    // Concentric broadcast waves expanding outward
    float waveSpeed = 1.35;
    float waveFreq = 4.2;
    float waveDecay = exp(-dist * 0.32);
    
    // Wave formula
    float elevation = sin(dist * waveFreq - uTime * waveSpeed) * 0.22 * waveDecay;
    
    // Dampen and recede as user scrolls down
    float scrollDamp = max(0.08, 1.0 - uScroll * 0.0018);
    elevation *= scrollDamp;

    pos.z += elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (3.8 + elevation * 4.5) * (1.0 / - (modelViewMatrix * vec4(pos, 1.0)).z) * 1.7;
  }
`;

const fragmentShader = `
  uniform vec3 uColorGold;
  uniform vec3 uColorBronze;
  uniform vec3 uColorDark;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vDist;

  void main() {
    // Circular point particle softness
    vec2 coord = gl_PointCoord - vec2(0.5);
    float distToCenter = length(coord);
    if (distToCenter > 0.5) discard;

    float alpha = smoothstep(0.5, 0.08, distToCenter);

    // Color gradient based on wave height and distance
    float mixFactor = clamp((vElevation + 0.12) * 2.8, 0.0, 1.0);
    vec3 color = mix(uColorBronze, uColorGold, mixFactor);

    // Fade edges softly
    float edgeFade = smoothstep(4.5, 1.2, vDist);
    alpha *= edgeFade * 0.75;

    gl_FragColor = vec4(color, alpha);
  }
`;

export const SignalWavesScene: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);
  const { viewport } = useThree();

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uColorGold: { value: new THREE.Color('#D4973B') },
      uColorBronze: { value: new THREE.Color('#854D0E') },
      uColorDark: { value: new THREE.Color('#090807') }
    }),
    []
  );

  // Generate dense particle plane grid (optimized to 64x64 for smooth 60-120fps)
  const geometry = useMemo(() => {
    const segmentsX = 64;
    const segmentsY = 64;
    const sizeX = Math.max(viewport.width * 1.5, 9);
    const sizeY = Math.max(viewport.height * 1.5, 7.5);
    return new THREE.PlaneGeometry(sizeX, sizeY, segmentsX, segmentsY);
  }, [viewport.width, viewport.height]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Performance guard: pause computation when Hero is scrolled out of viewport
    if (scrollYRef.current > window.innerHeight * 1.15) {
      return;
    }

    // Damped cursor tracking
    currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.08;
    currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.08;

    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.set(currentMouse.current.x, currentMouse.current.y);
    uniforms.uScroll.value = scrollYRef.current;

    // Slight gentle tilt of the whole points mesh
    pointsRef.current.rotation.x = -0.35 + currentMouse.current.y * 0.04;
    pointsRef.current.rotation.y = currentMouse.current.x * 0.04;
  });

  return (
    <points ref={pointsRef} geometry={geometry} position={[0, -0.2, 0]}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
