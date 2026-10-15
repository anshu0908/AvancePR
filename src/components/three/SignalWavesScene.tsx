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

    // Center offset by smoothed mouse
    vec2 center = vec2(0.0, 0.0) + uMouse * 0.45;
    float dist = length(pos.xy - center);
    vDist = dist;

    // 3D Concentric broadcast waves expanding outward + scroll-driven 3D surge
    float waveSpeed = 1.45;
    float waveFreq = 3.6;
    float waveDecay = exp(-dist * 0.26);
    
    // Wave formula responding to both time and scroll velocity
    float wave = sin(dist * waveFreq - uTime * waveSpeed + uScroll * 0.0055) * 0.32 * waveDecay;
    float microWave = cos(pos.x * 1.5 - pos.y * 1.5 - uTime * 0.9 + uScroll * 0.003) * 0.12 * waveDecay;
    float elevation = wave + microWave;

    // Elevate on Z axis for intense 3D perspective
    pos.z += elevation;
    vElevation = elevation;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Crisp 3D point sizing with depth attenuation
    float pointScale = 2.2;
    gl_PointSize = (5.2 + elevation * 5.8) * (1.0 / - mvPosition.z) * pointScale;
  }
`;

const fragmentShader = `
  uniform vec3 uColorWhite;
  uniform vec3 uColorGold;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vDist;

  void main() {
    // Sharp circular point particle
    vec2 coord = gl_PointCoord - vec2(0.5);
    float distToCenter = length(coord);
    if (distToCenter > 0.5) discard;

    // Smooth edge alpha
    float alpha = smoothstep(0.5, 0.06, distToCenter);

    // Luminous crisp white dots with subtle champagne gold accent at wave depths
    float crestFactor = clamp((vElevation + 0.16) * 2.6, 0.0, 1.0);
    vec3 color = mix(uColorGold, uColorWhite, crestFactor * 0.75 + 0.25);

    // Inner nucleus is pure diamond white (#FFFFFF)
    if (distToCenter < 0.24) {
      color = vec3(1.0, 1.0, 1.0);
      alpha = min(1.0, alpha * 1.3);
    }

    // Soft outer radial fade from center of screen
    float edgeFade = smoothstep(5.8, 1.6, vDist);
    alpha *= edgeFade * 0.95;

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
      uColorWhite: { value: new THREE.Color('#FFFFFF') },
      uColorGold: { value: new THREE.Color('#F7D488') }
    }),
    []
  );

  // Generate dense particle plane grid (72x72 for maximum crispness and silky 60-120fps)
  const geometry = useMemo(() => {
    const segmentsX = 72;
    const segmentsY = 72;
    const sizeX = Math.max(viewport.width * 1.6, 10);
    const sizeY = Math.max(viewport.height * 1.6, 8.5);
    return new THREE.PlaneGeometry(sizeX, sizeY, segmentsX, segmentsY);
  }, [viewport.width, viewport.height]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Damped cursor tracking
    currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.08;
    currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.08;

    const scroll = scrollYRef.current;
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.set(currentMouse.current.x, currentMouse.current.y);
    uniforms.uScroll.value = scroll;

    // Rich 3D perspective tilt and displacement reacting to scroll and mouse
    pointsRef.current.position.y = -0.15 - scroll * 0.0006;
    pointsRef.current.position.z = - (scroll * 0.0014);
    pointsRef.current.rotation.x = -0.36 + currentMouse.current.y * 0.05 + (scroll * 0.00035);
    pointsRef.current.rotation.y = currentMouse.current.x * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry} position={[0, -0.15, 0]}>
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
