import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ListFilter, Layers } from 'lucide-react';
import { CASE_STUDIES } from '@/data/work';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HoverImageCaseStudyList } from '@/components/ui/HoverImageCaseStudyList';
import { FannedDeckShowcase, FannedDeckItem } from '@/components/ui/FannedDeckShowcase';

export const SelectedWorkSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All Mandates');
  const [viewMode, setViewMode] = useState<'hover-list' | 'fanned-deck'>('hover-list');

  const categories = [
    'All Mandates',
    'Consumer & Retail',
    'Enterprise Fintech & SaaS',
    'EV & Clean Mobility',
    'Logistics & Supply Chain'
  ];

  const filteredCaseStudies =
    activeCategory === 'All Mandates'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((item) => item.category === activeCategory);

  // Map case studies to FannedDeckItem for alternate view
  const allWorkDeckItems: FannedDeckItem[] = CASE_STUDIES.map((cs, index) => ({
    id: cs.id,
    title: cs.client,
    subtitle: cs.oneLiner,
    description: cs.overview,
    badge: cs.metrics && cs.metrics[0] ? `★ ${cs.metrics[0].value}` : `★ 0${index + 1}`,
    tag: cs.category,
    image: cs.coverImage,
    link: `/work/${cs.slug}`,
    metrics: cs.metrics,
    deliverables: cs.serviceTags,
    category: cs.category
  }));

  const filteredDeckItems =
    activeCategory === 'All Mandates'
      ? allWorkDeckItems
      : allWorkDeckItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="work"
      className="relative w-full py-24 lg:py-32 bg-dark-bg text-light-bg overflow-hidden border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHeading
          theme="dark"
          eyebrow="Selected Deployments"
          title="Narratives that catalyzed national authority."
          description="A curated portfolio of high-impact media mandates and category-defining campaigns."
        />

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
          {/* View Mode Toggle: Hover List vs 3D Deck */}
          <div className="p-1 rounded-full bg-stone-900 border border-white/10 flex items-center gap-1 text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setViewMode('hover-list')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'hover-list'
                  ? 'bg-brand-gold text-dark-bg font-extrabold shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Interactive Hover List</span>
            </button>

            <button
              onClick={() => setViewMode('fanned-deck')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'fanned-deck'
                  ? 'bg-brand-gold text-dark-bg font-extrabold shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D Fanned Deck</span>
            </button>
          </div>

          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:text-white transition-colors"
          >
            <span>View All 13 Case Studies</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {viewMode === 'hover-list' ? (
          /* Signature Editorial Hover-Reveal List */
          <HoverImageCaseStudyList
            items={filteredCaseStudies}
            pills={categories}
            activePill={activeCategory}
            onPillChange={(pill) => setActiveCategory(pill)}
            ctaText="View Case Study"
            maxDisplay={6}
          />
        ) : (
          /* 3D Fanned Deck Showcase */
          <FannedDeckShowcase
            items={filteredDeckItems.length > 0 ? filteredDeckItems : allWorkDeckItems}
            theme="dark"
            pills={categories}
            activePill={activeCategory}
            onPillChange={(pill) => setActiveCategory(pill)}
            ctaText="Read Case Study Mandate"
            showDetailsPanel={true}
          />
        )}
      </div>
    </section>
  );
};

