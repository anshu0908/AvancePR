import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, LayoutGrid, Layers, ListFilter } from 'lucide-react';
import { CASE_STUDIES } from '@/data/work';
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection';
import { HoverImageCaseStudyList } from '@/components/ui/HoverImageCaseStudyList';
import { FannedDeckShowcase, FannedDeckItem } from '@/components/ui/FannedDeckShowcase';

export const WorkIndexPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'hover-list' | 'featured' | 'grid'>('hover-list');

  const categories = [
    'All',
    'Enterprise Fintech & SaaS',
    'Consumer & Retail',
    'EV & Clean Mobility',
    'Logistics & Supply Chain',
    'Artificial Intelligence & HR Tech'
  ];

  const filteredCases =
    activeFilter === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === activeFilter);

  // Map to FannedDeckItem
  const fannedItems: FannedDeckItem[] = filteredCases.map((cs, idx) => ({
    id: cs.id,
    title: cs.client,
    subtitle: cs.oneLiner,
    description: cs.overview,
    badge: cs.metrics && cs.metrics[0] ? `★ ${cs.metrics[0].value}` : `★ 0${idx + 1}`,
    tag: cs.category,
    image: cs.coverImage,
    link: `/work/${cs.slug}`,
    metrics: cs.metrics,
    deliverables: cs.serviceTags,
    category: cs.category
  }));

  return (
    <>
      <Helmet>
        <title>Selected Work | Avance PR — High-Impact Case Studies</title>
        <meta
          name="description"
          content="Explore all 13 verified case studies from Avance PR: Stovekraft, HostBooks, Arc Electric, Om Logistics, Amara.ai, Ramp Global, and more."
        />
        <link rel="canonical" href="https://www.avancepr.in/work" />
      </Helmet>

      <main id="main-content" className="pt-28 sm:pt-36 bg-dark-bg text-light-bg min-h-screen">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-10 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-brand-gold font-mono">
                  Portfolio & Deployments
                </span>
              </div>

              <h1 className="text-[40px] sm:text-[60px] lg:text-[72px] font-extrabold tracking-[-0.035em] leading-[1.02] text-white [text-wrap:balance]">
                Case studies in <span className="text-brand-gold">credibility and scale.</span>
              </h1>

              <p className="mt-5 text-[17px] sm:text-[20px] text-stone-300 max-w-3xl leading-relaxed">
                Thirteen verified strategic communications campaigns that created category leaders, secured national press dominance, and catalyzed millions in business value.
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="p-1 rounded-full bg-stone-900 border border-white/10 flex items-center gap-1 text-xs font-bold shrink-0 self-start md:self-end">
              <button
                onClick={() => setViewMode('hover-list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'hover-list'
                    ? 'bg-brand-gold text-dark-bg font-extrabold shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Hover Reveal</span>
              </button>

              <button
                onClick={() => setViewMode('featured')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'featured'
                    ? 'bg-brand-gold text-dark-bg font-extrabold shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Deck</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-brand-gold text-dark-bg font-extrabold shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Archive Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Interactive Hover Image Reveal List */}
        {viewMode === 'hover-list' ? (
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
            <HoverImageCaseStudyList
              items={filteredCases}
              pills={categories}
              activePill={activeFilter}
              onPillChange={(pill) => setActiveFilter(pill)}
              ctaText="Read Case Study"
            />
          </div>
        ) : viewMode === 'featured' ? (
          /* View Mode 2: 3D Fanned Deck Featured Showcase View */
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
            <FannedDeckShowcase
              items={fannedItems}
              theme="dark"
              pills={categories}
              activePill={activeFilter}
              onPillChange={(pill) => setActiveFilter(pill)}
              ctaText="Read Complete Case Study"
              showDetailsPanel={true}
            />

            {/* Quick Link to Browse All Grid below */}
            <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm text-stone-400 font-mono">
                Showing {filteredCases.length} of {CASE_STUDIES.length} verified mandates
              </span>
              <button
                onClick={() => setViewMode('grid')}
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:text-white transition-colors cursor-pointer"
              >
                <span>Switch to 3-column archive grid</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Grid View Mode */
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-bold tracking-wide transition-all border cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-brand-gold text-dark-bg font-extrabold border-brand-gold shadow-[0_4px_20px_rgba(212,151,59,0.35)] scale-[1.03]'
                      : 'bg-stone-900/80 border-white/10 text-stone-300 hover:border-brand-gold hover:text-white'
                  }`}
                >
                  {cat} {cat === 'All' && `(${CASE_STUDIES.length})`}
                </button>
              ))}
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredCases.map((cs, idx) => (
                  <motion.div
                    key={cs.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={`/work/${cs.slug}`}
                      className="group flex flex-col rounded-2xl overflow-hidden bg-dark-surface border border-white/10 shadow-lg hover:border-brand-gold/60 hover:shadow-brand-gold/10 transition-all duration-300 h-full"
                    >
                      <div className="relative w-full h-60 overflow-hidden bg-stone-900">
                        <img
                          src={cs.coverImage}
                          alt={cs.client}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-brand-gold border border-brand-gold/30">
                            {cs.category}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                          <span className="font-mono text-xs text-zinc-300">
                            0{idx + 1}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-brand-gold text-dark-bg flex items-center justify-center transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <h2 className="text-[22px] font-bold text-white group-hover:text-brand-gold transition-colors tracking-tight">
                            {cs.client}
                          </h2>
                          <p className="mt-2 text-[14px] text-stone-300 leading-relaxed line-clamp-3">
                            {cs.oneLiner}
                          </p>
                        </div>

                        {cs.metrics && cs.metrics[0] && (
                          <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                            <span className="text-xs font-mono text-stone-400">{cs.metrics[0].label}</span>
                            <span className="text-sm font-bold text-brand-gold">{cs.metrics[0].value}</span>
                          </div>
                        )}

                        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono text-stone-400">
                          {cs.serviceTags.slice(0, 2).map((t, ti) => (
                            <span key={ti} className="text-brand-gold font-medium">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        <ClosingCtaSection />
      </main>
    </>
  );
};
