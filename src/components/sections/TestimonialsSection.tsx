import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="relative w-full py-24 sm:py-36 bg-dark-bg text-light-bg overflow-hidden border-b border-white/10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-gold/5 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <SectionHeading
            theme="dark"
            eyebrow="Founder & Client Conviction"
            title="What partners say when the headlines break."
          />

          {/* Controls */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-zinc-400 mr-2">
              0{currentIndex + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white hover:text-brand-gold transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white hover:text-brand-gold transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Large Quote Container */}
        <div className="relative min-h-[380px] sm:min-h-[340px] flex flex-col justify-between p-8 sm:p-12 rounded-3xl bg-dark-surface/90 border border-white/10 backdrop-blur-md">
          <Quote className="w-12 h-12 text-brand-gold/30 mb-6 shrink-0" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col justify-between flex-grow"
            >
              {/* Highlight Quote */}
              <blockquote className="text-[20px] sm:text-[26px] lg:text-[30px] font-medium leading-[1.35] text-white tracking-[-0.01em] [text-wrap:pretty]">
                "{current.quote}"
              </blockquote>

              {/* Attribution */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-gold to-brand-bronze flex items-center justify-center text-dark-bg font-extrabold text-lg shadow-md">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[17px] font-bold text-white">
                      {current.name}
                    </div>
                    <div className="text-[13px] text-zinc-400">
                      {current.role}, <span className="text-brand-gold font-medium">{current.company}</span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                  Verified Client Partner
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar Indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-3xl overflow-hidden">
            <motion.div
              className="h-full bg-brand-gold"
              initial={false}
              animate={{ width: `${((currentIndex + 1) / TESTIMONIALS.length) * 100}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="mt-8 grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                currentIndex === idx
                  ? 'bg-brand-gold/15 border-brand-gold text-brand-gold'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="text-[11px] font-mono">0{idx + 1}</div>
              <div className="text-[12px] font-bold truncate mt-0.5">{t.company}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
