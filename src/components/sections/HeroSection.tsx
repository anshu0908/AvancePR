import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { SignalWavesCanvas } from '@/components/three/SignalWavesCanvas';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { gsap } from '@/lib/gsap';

export const HeroSection: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.querySelectorAll('.hero-line'),
          { y: 60, opacity: 0, rotateX: -10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.1,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.2
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const marqueeItems = [
    'PR for Startups',
    'Influencer Marketing',
    'Corporate Communication',
    'Crisis Management',
    'Social Media Management',
    'Personal Branding'
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between bg-transparent text-light-bg overflow-hidden pt-24 sm:pt-32 pb-6"
    >
      {/* 3D WebGL concentric broadcast wave scene */}
      <SignalWavesCanvas />

      {/* Main Content Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto flex flex-col items-center text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/5 border border-brand-gold/30 backdrop-blur-md mb-6 sm:mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0" />
          <span className="text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-brand-gold">
            Strategic Communications Agency · Gurugram
          </span>
        </motion.div>

        {/* Hero Main Headline (Split-Text Reveal) */}
        <h1
          ref={headlineRef}
          className="text-[34px] min-[370px]:text-[40px] sm:text-[62px] md:text-[80px] lg:text-[98px] font-extrabold tracking-[-0.035em] leading-[1.04] sm:leading-[0.98] max-w-5xl [text-wrap:balance]"
        >
          <span className="block overflow-hidden">
            <span className="hero-line block text-white drop-shadow-sm">
              Advance your
            </span>
          </span>
          <span className="block overflow-hidden mt-1 sm:mt-2">
            <span className="hero-line block bg-gradient-to-r from-brand-gold via-[#F7D488] to-brand-gold bg-clip-text text-transparent">
              relations.
            </span>
          </span>
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-6 sm:mt-8 text-[17px] sm:text-[20px] md:text-[22px] font-normal text-zinc-300/90 max-w-2xl leading-[1.5] [text-wrap:pretty]"
        >
          Media, influencer and digital PR for brands that want to be{' '}
          <span className="text-white font-medium underline decoration-brand-gold/60 underline-offset-4">
            believed
          </span>
          , not just seen.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
        >
          <MagneticButton to="/contact" variant="primary">
            Book a free strategy call
          </MagneticButton>
          <MagneticButton to="/work" variant="secondary">
            See our work
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom Bar: Marquee & Scroll Indicator */}
      <div className="relative z-10 w-full mt-10">
        {/* Scroll Cue */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-widest font-mono"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="w-3.5 h-3.5 text-brand-gold" />
          </motion.div>
        </div>

        {/* Slim Bottom Marquee */}
        <div className="border-y border-white/10 bg-dark-bg/60 backdrop-blur-sm py-3 overflow-hidden select-none">
          <div className="flex w-max animate-marquee-left">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
              <span
                key={idx}
                aria-hidden={idx >= marqueeItems.length}
                className="inline-flex items-center gap-6 px-6 text-[13px] uppercase tracking-[0.14em] text-zinc-400 font-medium"
              >
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
