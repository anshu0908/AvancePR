import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneProps {
  scrollYRef: React.MutableRefObject<number>;
  targetMouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

const vertexShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;

  attribute float aSize;
  attribute float aAlpha;
  attribute float aParallax;
  attribute float aTwinkle;
  attribute float aPhase;

  varying float vAlpha;
  varying float vTwinkle;
  varying float vPhase;
  varying float vParallax;

  void main() {
    vAlpha = aAlpha;
    vTwinkle = aTwinkle;
    vPhase = aPhase;
    vParallax = aParallax;

    vec3 pos = position;

    // 3D Parallax Scroll: dots at different Z-depths scroll at different velocities
    float scrollOffset = uScroll * 0.0068 * aParallax;
    // Seamless vertical wrap from -38 to +38 in 3D space
    pos.y = mod(pos.y + scrollOffset + 38.0, 76.0) - 38.0;

    // Subtle 3D organic floating drift
    pos.x += sin(uTime * 0.38 + pos.z * 0.45) * 0.28;
    pos.z += cos(uTime * 0.32 + pos.x * 0.45) * 0.28;

    // Fluid 3D mouse parallax responsive to depth
    float depthFactor = (pos.z + 20.0) * 0.04;
    pos.x += uMouse.x * 1.8 * depthFactor;
    pos.y += uMouse.y * 1.8 * depthFactor;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Crisp point sizing with perspective depth attenuation
    gl_PointSize = aSize * (1.0 / - mvPosition.z) * 2.8;
  }
`;

const fragmentShader = `
  uniform float uTime;

  varying float vAlpha;
  varying float vTwinkle;
  varying float vPhase;
  varying float vParallax;

  void main() {
    // Sharp circular point
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    // Smooth soft edge anti-aliasing
    float strength = smoothstep(0.5, 0.04, dist);

    // Subtle organic twinkle
    float twinkle = 0.82 + 0.18 * sin(uTime * vTwinkle + vPhase);
    float finalAlpha = vAlpha * strength * twinkle;

    // Pure brilliant white dots (#FFFFFF) with delicate champagne accent on deep field dots
    vec3 color = vec3(1.0, 1.0, 1.0);
    if (vParallax < 0.85) {
      // Soft champagne gold accent for depth contrast
      color = mix(vec3(0.97, 0.85, 0.58), vec3(1.0, 1.0, 1.0), 0.70);
    }

    // High-brilliance diamond nucleus
    if (dist < 0.25) {
      color = vec3(1.0, 1.0, 1.0);
      finalAlpha = min(1.0, finalAlpha * 1.35);
    }

    gl_FragColor = vec4(color, finalAlpha);
  }
`;

const DotsScene: React.FC<SceneProps> = ({ scrollYRef, targetMouseRef }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const currentMouse = useRef({ x: 0, y: 0 });

  const particleCount = 1000;

  const [geometry, uniforms] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);
    const parallaxes = new Float32Array(particleCount);
    const twinkles = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Scatter in 3D coordinate volume
      positions[i * 3 + 0] = (Math.random() - 0.5) * 48; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 76; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 34; // Z

      // Size distribution: majority crisp dots, 25% prominent star-points
      const isHeroStar = Math.random() > 0.75;
      sizes[i] = isHeroStar ? Math.random() * 4.0 + 5.0 : Math.random() * 2.5 + 3.0;

      // Opacity: high contrast crispness against obsidian dark background
      alphas[i] = Math.random() * 0.35 + 0.65;

      // Parallax multiplier based on Z-depth (closer dots scroll faster)
      const zNorm = (positions[i * 3 + 2] + 17) / 34; // 0 to 1
      parallaxes[i] = 0.55 + zNorm * 1.65; // 0.55x to 2.2x

      // Twinkle parameters
      twinkles[i] = Math.random() * 2.2 + 1.2;
      phases[i] = Math.random() * Math.PI * 2;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));
    geo.setAttribute('aParallax', new THREE.BufferAttribute(parallaxes, 1));
    geo.setAttribute('aTwinkle', new THREE.BufferAttribute(twinkles, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

    const u = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) }
    };

    return [geo, u];
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Damped mouse tracking
    currentMouse.current.x += (targetMouseRef.current.x - currentMouse.current.x) * 0.05;
    currentMouse.current.y += (targetMouseRef.current.y - currentMouse.current.y) * 0.05;

    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uScroll.value = scrollYRef.current;
    uniforms.uMouse.value.set(currentMouse.current.x, currentMouse.current.y);

    // Subtle camera/points tilt for deep spatial parallax
    pointsRef.current.rotation.x = currentMouse.current.y * 0.035;
    pointsRef.current.rotation.y = currentMouse.current.x * 0.035;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
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

export const Scroll3DDotsBackground: React.FC = () => {
  const [canRender, setCanRender] = useState(false);
  const scrollYRef = useRef(0);
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only disable if device is narrow mobile screen < 640px
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    setCanRender(true);

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const handlePointerMove = (e: MouseEvent) => {
      targetMouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  if (!canRender) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-[1] overflow-hidden"
      style={{ opacity: 0.95 }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 22], fov: 52 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        className="w-full h-full"
      >
        <DotsScene scrollYRef={scrollYRef} targetMouseRef={targetMouseRef} />
      </Canvas>
    </div>
  );
};

export default Scroll3DDotsBackground;
