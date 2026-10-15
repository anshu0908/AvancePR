import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { SignalWavesScene } from './SignalWavesScene';
import { SignalWavesFallback } from './SignalWavesFallback';
export const SignalWavesCanvas: React.FC = () => {
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    // 1. Check viewport size (disable heavy 3D on mobile < 768px as per design brief)
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setShouldRender3D(false);
      return;
    }

    // 2. Verify WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setShouldRender3D(false);
        return;
      }
    } catch {
      setShouldRender3D(false);
      return;
    }

    setShouldRender3D(true);
  }, []);

  if (!shouldRender3D) {
    return <SignalWavesFallback />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0">
      <Suspense fallback={<SignalWavesFallback />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4.2], fov: 48 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
          className="w-full h-full"
        >
          <SignalWavesScene />
        </Canvas>
      </Suspense>

      {/* Subtle radial vignette gradient over canvas for text contrast */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(9,8,7,0.2) 20%, #090807 90%)'
        }}
      />
    </div>
  );
};
