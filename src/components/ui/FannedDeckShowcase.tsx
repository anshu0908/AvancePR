import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface FannedDeckItem {
  id: string;
  title: string;
  subtitle: string;
  tag?: string;
  badge?: string;
  image: string;
  link: string;
  metrics?: { label: string; value: string }[];
  deliverables?: string[];
  description?: string;
  category?: string;
}

interface FannedDeckShowcaseProps {
  items: FannedDeckItem[];
  theme?: 'light' | 'dark';
  pills?: string[];
  activePill?: string;
  onPillChange?: (pill: string) => void;
  ctaText?: string;
  showDetailsPanel?: boolean;
}

export const FannedDeckShowcase: React.FC<FannedDeckShowcaseProps> = ({
  items,
  theme = 'dark',
  pills,
  activePill,
  onPillChange,
  ctaText = 'Explore Strategy',
  showDetailsPanel = true
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // When items change or activePill changes, keep activeIndex valid
  useEffect(() => {
    if (activeIndex >= items.length) {
      setActiveIndex(0);
    }
  }, [items.length, activeIndex]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  }, [items.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const activeItem = items[activeIndex] || items[0];

  const isDark = theme === 'dark';

  return (
    <div className="w-full flex flex-col items-center">
      {/* Category Pills Bar (Matching Reference Design) */}
      {pills && pills.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12 max-w-4xl mx-auto">
          {pills.map((pill) => {
            const isActive = activePill ? activePill === pill : false;
            return (
              <button
                key={pill}
                onClick={() => onPillChange?.(pill)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold tracking-wide transition-all duration-300 border cursor-pointer select-none ${
                  isActive
                    ? 'bg-brand-gold text-dark-bg border-brand-gold font-extrabold shadow-[0_4px_20px_rgba(212,151,59,0.35)] scale-[1.03]'
                    : isDark
                    ? 'bg-stone-900/80 text-stone-300 border-white/10 hover:border-brand-gold/60 hover:text-white hover:bg-stone-850 backdrop-blur-md'
                    : 'bg-stone-100 text-stone-600 border-stone-200 hover:text-dark-bg hover:bg-white'
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>
      )}

      {/* 3D Fanned Deck Stage */}
      <div className="relative w-full max-w-4xl h-[420px] sm:h-[480px] lg:h-[520px] flex items-center justify-center perspective-[1200px] overflow-visible">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous card"
          className={`absolute left-2 sm:left-6 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border backdrop-blur-md ${
            isDark
              ? 'bg-stone-900/80 border-white/15 text-white hover:bg-brand-gold hover:border-brand-gold'
              : 'bg-white/90 border-stone-200 text-stone-800 hover:bg-brand-gold hover:text-white hover:border-brand-gold'
          }`}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next card"
          className={`absolute right-2 sm:right-6 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border backdrop-blur-md ${
            isDark
              ? 'bg-stone-900/80 border-white/15 text-white hover:bg-brand-gold hover:border-brand-gold'
              : 'bg-white/90 border-stone-200 text-stone-800 hover:bg-brand-gold hover:text-white hover:border-brand-gold'
          }`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Cards Render */}
        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, index) => {
            const offset = index - activeIndex;
            // Only render cards within 3 positions of active to keep DOM light and smooth
            if (Math.abs(offset) > 3) return null;

            const isCenter = offset === 0;

            // Geometry calculations for authentic card fan
            const angleStep = isMobile ? 12 : 14;
            const xStep = isMobile ? 65 : 120;
            const yStep = isMobile ? 16 : 22;

            const rotateZ = offset * angleStep;
            const x = offset * xStep;
            const y = Math.abs(offset) * yStep;
            const scale = isCenter ? (isMobile ? 1.02 : 1.08) : Math.max(0.78, 1 - Math.abs(offset) * 0.08);
            const zIndex = 30 - Math.abs(offset) * 5;
            const opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.22);

            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  transformOrigin: '50% 90%',
                  zIndex
                }}
                animate={{
                  x,
                  y,
                  rotateZ,
                  scale,
                  opacity
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 26,
                  mass: 0.8
                }}
                className={`absolute w-[240px] sm:w-[280px] lg:w-[310px] h-[340px] sm:h-[400px] lg:h-[440px] rounded-3xl overflow-hidden cursor-pointer select-none transition-shadow duration-300 ${
                  isCenter
                    ? 'shadow-[0_25px_60px_-15px_rgba(212,151,59,0.35)] ring-2 ring-brand-gold/80'
                    : 'shadow-xl hover:opacity-90'
                }`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isCenter
                      ? 'filter-none'
                      : 'grayscale contrast-125 brightness-[0.6]'
                  }`}
                  loading="eager"
                />

                {/* Dark Scrim Gradients */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isCenter
                      ? 'bg-gradient-to-t from-black/90 via-black/35 to-black/20'
                      : 'bg-black/50'
                  }`}
                />

                {/* Top Badges (Only on active or subtly on others) */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  {item.badge && (
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono shadow-md backdrop-blur-md ${
                        isCenter
                          ? 'bg-brand-gold text-white'
                          : 'bg-black/60 text-stone-300 border border-white/10'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      <span>{item.badge}</span>
                    </div>
                  )}

                  {item.tag && (
                    <div
                      className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md ${
                        isCenter
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'bg-black/60 text-stone-400 border border-white/5'
                      }`}
                    >
                      {item.tag}
                    </div>
                  )}
                </div>

                {/* Center Focal Indicator (Matching Reference Play/Focus Button) */}
                {isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform"
                    >
                      <ArrowUpRight className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>
                )}

                {/* Bottom Content Scrim */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white flex flex-col justify-end">
                  <div className="text-[11px] font-mono tracking-wider text-brand-gold uppercase font-bold mb-1">
                    {item.category || `Strategy 0${index + 1}`}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-stone-200 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dot Track */}
      <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to ${item.title}`}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === idx
                ? 'w-8 h-2 bg-brand-gold'
                : isDark
                ? 'w-2 h-2 bg-white/20 hover:bg-white/40'
                : 'w-2 h-2 bg-stone-300 hover:bg-stone-500'
            }`}
          />
        ))}
      </div>

      {/* Active Item Expandable Details Panel */}
      {showDetailsPanel && activeItem && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-4xl mt-10 sm:mt-12 p-6 sm:p-8 lg:p-10 rounded-3xl border shadow-xl ${
              isDark
                ? 'bg-stone-900/90 border-white/10 text-white'
                : 'bg-white border-stone-200/90 text-dark-bg'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Details & Overview */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-gold">
                      Active Strategy Practice · 0{activeIndex + 1}
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {activeItem.title}
                  </h4>

                  <p
                    className={`mt-3 text-sm sm:text-base leading-relaxed ${
                      isDark ? 'text-stone-300' : 'text-stone-600'
                    }`}
                  >
                    {activeItem.description || activeItem.subtitle}
                  </p>
                </div>

                {/* Key Metrics / Deliverables Preview */}
                {activeItem.deliverables && activeItem.deliverables.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeItem.deliverables.slice(0, 4).map((d, i) => (
                      <div
                        key={i}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-medium ${
                          isDark
                            ? 'bg-white/5 border-white/5 text-stone-200'
                            : 'bg-stone-50 border-stone-150 text-stone-700'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span className="line-clamp-1">{d}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeItem.metrics && activeItem.metrics.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-4">
                    {activeItem.metrics.map((m, i) => (
                      <div
                        key={i}
                        className={`px-4 py-2 rounded-xl border ${
                          isDark
                            ? 'bg-white/5 border-white/10'
                            : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        <div className="text-[11px] uppercase tracking-wider text-brand-gold font-mono font-bold">
                          {m.label}
                        </div>
                        <div className="text-lg font-extrabold mt-0.5">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Actions & Quick Connect */}
              <div className="lg:col-span-5 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-8 border-stone-200 dark:border-white/10">
                <Link
                  to={activeItem.link}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-brand-gold hover:bg-brand-gold/90 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-brand-gold/30 transition-all hover:scale-[1.02]"
                >
                  <span>{ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${
                    isDark
                      ? 'border-white/20 text-white hover:bg-white/10'
                      : 'border-stone-300 text-stone-800 hover:border-brand-gold hover:text-brand-gold hover:bg-white'
                  }`}
                >
                  <span>Request Mandate Proposal</span>
                </Link>

                <p
                  className={`text-center text-[11px] mt-1 ${
                    isDark ? 'text-stone-400' : 'text-stone-500'
                  }`}
                >
                  Direct partner-led counsel · Gurugram, India
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
