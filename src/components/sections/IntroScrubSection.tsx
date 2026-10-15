import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export const IntroScrubSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const statement =
    "PR is not just about visibility but credibility, influence, and growth. We engineer authoritative media positioning for ambitious brands—placing your narrative at the center of the conversations that shape public trust, investor conviction, and category leadership.";

  const words = statement.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return;
      const wordElements = textRef.current.querySelectorAll('.scrub-word');

      gsap.fromTo(
        wordElements,
        { opacity: 0.2, y: 3 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 0.7,
            invalidateOnRefresh: true
          }
        }
      );
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 sm:py-36 bg-transparent text-light-bg border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-gold" />
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-brand-gold font-mono">
            The Avance Philosophy
          </span>
        </div>

        <p
          ref={textRef}
          className="text-[22px] min-[360px]:text-[26px] sm:text-[36px] md:text-[44px] lg:text-[50px] font-semibold tracking-[-0.03em] leading-[1.22] font-sans text-white [text-wrap:pretty]"
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="scrub-word inline-block mr-[0.24em] will-change-transform opacity-20"
            >
              {word}
            </span>
          ))}
        </p>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 text-[14px] text-stone-400">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">Ritika Garg</span>
            <span className="text-stone-600">/</span>
            <span>Founder & CEO · Ogilvy Alumna</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-gold font-medium">
            <span>Gurugram HQ</span>
            <span>·</span>
            <span>Pan-India Reach</span>
          </div>
        </div>
      </div>
    </section>
  );
};
