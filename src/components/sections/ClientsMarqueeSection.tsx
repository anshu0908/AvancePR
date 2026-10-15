import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const ClientsMarqueeSection: React.FC = () => {
  // Real logos + client typographic badges
  const clientLogosRow1 = [
    { name: 'Stovekraft', img: '/assets/clients/logo1.png' },
    { name: 'HostBooks', img: '/assets/clients/logo2.png' },
    { name: 'ARC Electric', img: '/assets/clients/logo3.png' },
    { name: 'Om Logistics', img: '/assets/clients/logo4.png' },
    { name: 'Amara.ai', img: '/assets/clients/logo5.png' },
    { name: 'Minimalist Hotel', img: '/assets/clients/logo6.png' },
    { name: 'Quantel', img: '/assets/clients/logo7.png' },
    { name: 'Ramp Global', textBadge: 'RAMP GLOBAL' },
    { name: 'Pigeon India', textBadge: 'PIGEON' }
  ];

  const clientLogosRow2 = [
    { name: 'Skills Caravan', textBadge: 'SKILLS CARAVAN' },
    { name: 'Uplifters', textBadge: 'UPLIFTERS' },
    { name: 'Aarika Innovation', textBadge: 'AARIKA' },
    { name: 'Togopool', textBadge: 'TOGOPOOL' },
    { name: 'Prabhubhakti', textBadge: 'PRABHUBHAKTI' },
    { name: 'DeMatade', textBadge: 'DEMATADE' },
    { name: 'Ayatiworks', textBadge: 'AYATIWORKS' },
    { name: 'Gilma Appliances', textBadge: 'GILMA' },
    { name: 'HostBooks Cloud', img: '/assets/clients/logo2.png' }
  ];

  const renderBadge = (item: { name: string; img?: string; textBadge?: string }, key: number, isDuplicate = false) => (
    <div
      key={key}
      aria-hidden={isDuplicate}
      className="flex-shrink-0 mx-3 sm:mx-4 px-6 sm:px-7 py-3 sm:py-4 rounded-2xl bg-dark-surface/90 border border-white/10 shadow-lg flex items-center justify-center min-w-[150px] sm:min-w-[175px] h-18 sm:h-20 transition-all duration-300 hover:border-brand-gold/60 hover:bg-white/[0.04] cursor-pointer select-none group"
    >
      {item.img ? (
        <img
          src={item.img}
          alt={item.name}
          className="max-h-10 sm:max-h-11 w-auto max-w-[120px] object-contain opacity-75 group-hover:opacity-100 brightness-125 contrast-125 transition-all duration-300"
          loading="lazy"
        />
      ) : (
        <span className="font-extrabold text-[13px] sm:text-[14px] tracking-wider text-stone-300 group-hover:text-brand-gold transition-colors font-sans">
          {item.textBadge}
        </span>
      )}
    </div>
  );

  return (
    <section id="clients" className="relative w-full py-20 sm:py-28 bg-transparent text-light-bg overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-14 text-center">
        <SectionHeading
          align="center"
          theme="dark"
          eyebrow="Ecosystem Trust"
          title="Trusted by 100+ brands across India"
          description="From disruptive venture-backed startups to nationwide logistics conglomerates and public household names."
        />
      </div>

      {/* Row 1: Moves Left */}
      <div className="relative w-full overflow-hidden flex py-2 group/marquee">
        <div className="flex w-max animate-marquee-left group-hover/marquee:[animation-play-state:paused]">
          {[...clientLogosRow1, ...clientLogosRow1, ...clientLogosRow1].map((item, idx) =>
            renderBadge(item, idx, idx >= clientLogosRow1.length)
          )}
        </div>
      </div>

      {/* Row 2: Moves Right */}
      <div className="relative w-full overflow-hidden flex py-3 mt-3 group/marquee">
        <div className="flex w-max animate-marquee-right group-hover/marquee:[animation-play-state:paused]">
          {[...clientLogosRow2, ...clientLogosRow2, ...clientLogosRow2].map((item, idx) =>
            renderBadge(item, idx, idx >= clientLogosRow2.length)
          )}
        </div>
      </div>
    </section>
  );
};
