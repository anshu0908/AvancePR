import React from 'react';

export const SignalWavesFallback: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-dark-bg">
      {/* Ambient background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full blur-[120px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #D4973B 0%, #854D0E 45%, transparent 70%)'
        }}
      />

      {/* Concentric Signal Rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-[200px] h-[200px] rounded-full border border-brand-gold/40 animate-pulse-subtle" />
        <div className="absolute w-[360px] h-[360px] rounded-full border border-brand-gold/25" />
        <div className="absolute w-[540px] h-[540px] rounded-full border border-brand-gold/15" />
        <div className="absolute w-[740px] h-[740px] rounded-full border border-brand-gold/10" />
        <div className="absolute w-[980px] h-[980px] rounded-full border border-brand-gold/5" />
      </div>

      {/* Subtle radial vignette overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, #090807 85%)'
        }}
      />
    </div>
  );
};
