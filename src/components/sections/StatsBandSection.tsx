import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { SITE_CONFIG } from '@/data/site';

export const StatsBandSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!statsRef.current) return;
      const statNumbers = statsRef.current.querySelectorAll('.stat-number');

      statNumbers.forEach((el) => {
        const targetValue = parseInt(el.getAttribute('data-target') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';

        const obj = { val: 0 };
        gsap.fromTo(obj, { val: 0 }, {
          val: targetValue,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              el.textContent = '0' + suffix;
            }
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + suffix;
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { target: 100, suffix: '+', label: 'Brands Empowered', note: 'Startups, Unicorns & Enterprises' },
    { target: 13, suffix: '', label: 'Featured Case Studies', note: 'Verified Media Deployments' },
    { target: 5, suffix: '', label: 'National PR Honors', note: 'ET 40 Under 40 & Industry Accolades' },
    { target: 500, suffix: '+', label: 'Tier-1 Media Placements', note: 'Mainstream, Tech & Business Press' }
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 bg-transparent text-light-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col border-l border-white/15 pl-5 sm:pl-6 first:border-l-0 lg:first:border-l"
            >
              <div
                data-target={stat.target}
                data-suffix={stat.suffix}
                className="stat-number text-[44px] sm:text-[60px] lg:text-[68px] font-extrabold tracking-[-0.03em] leading-none text-white font-sans"
              >
                {stat.target}{stat.suffix}
              </div>
              <div className="mt-3 text-[16px] sm:text-[18px] font-bold text-brand-gold tracking-tight">
                {stat.label}
              </div>
              <div className="mt-1 text-[13px] text-zinc-400 font-normal">
                {stat.note}
              </div>
            </div>
          ))}
        </div>

        {/* Press Strip Underneath */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <span className="text-[12px] uppercase tracking-[0.16em] text-zinc-400 font-bold">
              As Seen Across Tier-1 Publications & Media Outlets
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              Earned Media · Zero Sponsored Content
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-8 opacity-75">
            {SITE_CONFIG.pressOutlets.map((outlet, i) => (
              <span
                key={i}
                className="text-[16px] sm:text-[18px] font-serif tracking-wider font-semibold text-zinc-300 hover:text-brand-gold transition-colors select-none"
              >
                {outlet.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
