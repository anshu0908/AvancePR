import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, LayoutGrid, Layers } from 'lucide-react';
import { SERVICES } from '@/data/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FannedDeckShowcase, FannedDeckItem } from '@/components/ui/FannedDeckShowcase';

export const ServicesListSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'deck' | 'list'>('deck');
  const [activeFilter, setActiveFilter] = useState('All 6 Practices');

  const categories = [
    'All 6 Practices',
    'Startup & Tech',
    'Corporate & Crisis',
    'Influence & Brand'
  ];

  // Map service items to FannedDeckItem structure
  const allDeckItems: FannedDeckItem[] = SERVICES.map((service, index) => ({
    id: service.id,
    title: service.title,
    subtitle: service.tagline,
    description: service.description,
    badge: `★ 0${index + 1}`,
    tag: 'Avance Practice',
    image: service.image,
    link: `/services/${service.slug}`,
    deliverables: service.deliverables,
    category:
      service.id === 'startup-pr' || service.id === 'social-media-marketing'
        ? 'Startup & Tech'
        : service.id === 'corporate-communication' || service.id === 'crisis-management'
        ? 'Corporate & Crisis'
        : 'Influence & Brand'
  }));

  const filteredItems =
    activeFilter === 'All 6 Practices'
      ? allDeckItems
      : allDeckItems.filter((item) => item.category === activeFilter);

  return (
    <section
      id="services"
      className="relative w-full py-24 sm:py-32 bg-transparent text-light-bg border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header with View Mode Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            theme="dark"
            eyebrow="Our Core Capabilities"
            title="Strategic communications engineered for market conviction."
            description="Six specialized practice areas designed to take your brand from obscurity to institutional authority."
          />

          <div className="flex items-center gap-3 shrink-0">
            {/* View Mode Toggle */}
            <div className="p-1 rounded-full bg-stone-900/90 border border-white/10 flex items-center gap-1 text-xs font-bold shrink-0">
              <button
                onClick={() => setViewMode('deck')}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'deck'
                    ? 'bg-brand-gold text-dark-bg font-extrabold shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">3D Interactive Deck</span>
                <span className="sm:hidden">Deck</span>
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-brand-gold text-dark-bg font-extrabold shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Editorial List</span>
                <span className="sm:hidden">List</span>
              </button>
            </div>

            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center gap-2 text-[14px] font-bold text-brand-gold hover:text-white transition-colors"
            >
              <span>Custom PR Scope</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3D Fanned Deck Mode (Default - Matching Reference Design) */}
        {viewMode === 'deck' ? (
          <div className="w-full pt-4 pb-6">
            <FannedDeckShowcase
              items={filteredItems.length > 0 ? filteredItems : allDeckItems}
              theme="dark"
              pills={categories}
              activePill={activeFilter}
              onPillChange={(pill) => setActiveFilter(pill)}
              ctaText="Explore Practice Strategy"
              showDetailsPanel={true}
            />
          </div>
        ) : (
          /* Editorial Stacked List View */
          <div className="relative border-t border-white/10 divide-y divide-white/10">
            {SERVICES.map((service, index) => (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 transition-colors duration-300 gap-4 hover:bg-white/5 px-2 sm:px-4 rounded-xl"
              >
                <div className="flex items-start md:items-baseline gap-6 sm:gap-10">
                  <span className="font-mono text-xs font-semibold text-stone-500 group-hover:text-brand-gold transition-colors pt-1 md:pt-0">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-brand-gold group-hover:translate-x-2 transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-stone-400 max-w-2xl leading-relaxed">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-center">
                  <span className="text-xs uppercase tracking-wider font-bold text-stone-400 group-hover:text-brand-gold transition-colors">
                    Explore Strategy
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
