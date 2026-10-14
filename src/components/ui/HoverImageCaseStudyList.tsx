import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudy } from '@/data/work';

interface HoverImageCaseStudyListProps {
  items: CaseStudy[];
  pills?: string[];
  activePill?: string;
  onPillChange?: (pill: string) => void;
  ctaText?: string;
  maxDisplay?: number;
}

export const HoverImageCaseStudyList: React.FC<HoverImageCaseStudyListProps> = ({
  items,
  pills,
  activePill,
  onPillChange,
  ctaText = 'View Case Study',
  maxDisplay
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isInside, setIsInside] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse follower physics using spring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 240, mass: 0.18 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Offset so card floats nicely to the right-center of the cursor
    const x = e.clientX - rect.left + 24;
    const y = e.clientY - rect.top - 110;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnterContainer = () => {
    setIsInside(true);
  };

  const handleMouseLeaveContainer = () => {
    setIsInside(false);
    setHoveredIndex(null);
  };

  const displayItems = maxDisplay ? items.slice(0, maxDisplay) : items;
  const activeItem = hoveredIndex !== null ? displayItems[hoveredIndex] : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnterContainer}
      onMouseLeave={handleMouseLeaveContainer}
      className="relative w-full select-none"
    >
      {/* Category Filter Pills (if provided) */}
      {pills && pills.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-14 max-w-4xl mx-auto">
          {pills.map((pill) => {
            const isActive = activePill ? activePill === pill : false;
            return (
              <button
                key={pill}
                onClick={() => onPillChange?.(pill)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold tracking-wide transition-all duration-300 border cursor-pointer select-none ${
                  isActive
                    ? 'bg-brand-gold text-dark-bg border-brand-gold font-extrabold shadow-[0_4px_20px_rgba(212,151,59,0.35)] scale-[1.03]'
                    : 'bg-stone-900/80 text-stone-300 border-white/10 hover:border-brand-gold/60 hover:text-white hover:bg-stone-850 backdrop-blur-md'
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>
      )}

      {/* Floating Image Preview Card (Tracks Cursor on Desktop) */}
      <motion.div
        aria-hidden="true"
        style={{
          x: smoothX,
          y: smoothY,
          pointerEvents: 'none'
        }}
        className="hidden lg:block absolute top-0 left-0 z-40 w-[340px] xl:w-[380px] h-[220px] xl:h-[240px]"
      >
        <AnimatePresence mode="wait">
          {isInside && activeItem && (
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 bg-stone-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            >
              <img
                src={activeItem.coverImage}
                alt={activeItem.client}
                className="w-full h-full object-cover transform scale-105 transition-transform duration-700"
              />

              {/* Bottom Vignette & Information Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gold font-bold">
                    {activeItem.category}
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="text-xl font-extrabold text-white tracking-tight">
                    {activeItem.client}
                  </h4>
                  {activeItem.metrics && activeItem.metrics[0] && (
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-[11px] font-mono font-bold shrink-0">
                      {activeItem.metrics[0].value}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-stone-300 line-clamp-1 leading-snug">
                  {activeItem.oneLiner}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Editorial Interactive Rows */}
      <div className="relative border-t border-white/10 divide-y divide-white/10">
        {displayItems.map((item, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <Link
              key={item.id}
              to={`/work/${item.slug}`}
              onMouseEnter={() => setHoveredIndex(index)}
              className="group relative flex flex-col lg:flex-row lg:items-center justify-between py-8 sm:py-10 px-3 sm:px-6 transition-all duration-300 hover:bg-white/[0.03] rounded-2xl cursor-pointer"
            >
              {/* Left Column: Number & Client Title & Subtitle */}
              <div className="flex items-start lg:items-baseline gap-6 sm:gap-10">
                <span
                  className={`font-mono text-sm sm:text-base font-semibold pt-1 lg:pt-0 transition-colors duration-300 ${
                    isHovered ? 'text-brand-gold font-bold' : 'text-zinc-500'
                  }`}
                >
                  0{index + 1}
                </span>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3
                      className={`text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-[-0.025em] transition-all duration-300 ${
                        isHovered
                          ? 'text-brand-gold translate-x-2'
                          : 'text-white'
                      }`}
                    >
                      {item.client}
                    </h3>

                    {/* Tag badge */}
                    <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-stone-400 text-xs font-mono font-medium">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-zinc-400 group-hover:text-stone-300 transition-colors max-w-2xl leading-relaxed [text-wrap:pretty]">
                    {item.oneLiner}
                  </p>

                  {/* Mobile Preview Image Inline (Visible on small screens where hover does not exist) */}
                  <div className="block lg:hidden mt-4 pt-2">
                    <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-white/10 aspect-video bg-stone-900">
                      <img
                        src={item.coverImage}
                        alt={item.client}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                        <span className="text-xs font-mono text-brand-gold font-bold">
                          {item.metrics && item.metrics[0] ? item.metrics[0].value : item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: CTA & Circular Arrow Button (Matches Reference) */}
              <div className="flex items-center gap-4 self-end lg:self-center mt-6 lg:mt-0 shrink-0">
                <span
                  className={`text-xs sm:text-[13px] uppercase tracking-wider font-bold transition-colors duration-300 ${
                    isHovered ? 'text-brand-gold' : 'text-zinc-400'
                  }`}
                >
                  {ctaText}
                </span>

                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isHovered
                      ? 'bg-brand-gold border-brand-gold text-dark-bg scale-105 shadow-[0_0_20px_rgba(212,151,59,0.4)]'
                      : 'border-white/20 text-zinc-300 hover:border-brand-gold'
                  }`}
                >
                  <ArrowUpRight
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isHovered ? 'translate-x-0.5 -translate-y-0.5 text-dark-bg' : 'text-zinc-300'
                    }`}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
