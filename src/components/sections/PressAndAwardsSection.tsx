import React, { useState } from 'react';
import { ArrowUpRight, Award, Newspaper } from 'lucide-react';
import { PRESS_ITEMS } from '@/data/press';
import { AWARDS } from '@/data/awards';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const PressAndAwardsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'press' | 'awards'>('press');

  return (
    <section className="relative w-full py-24 sm:py-36 bg-dark-bg text-light-bg overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionHeading
            theme="dark"
            eyebrow="Media Validation & Honors"
            title="Third-party credibility across national media."
            description="Verified press coverage, agency mandates, and national leadership awards."
          />

          {/* Toggle Pills */}
          <div className="flex items-center p-1 rounded-full bg-stone-900 border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('press')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'press'
                  ? 'bg-brand-gold text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5 text-white" />
              <span>Press Coverage ({PRESS_ITEMS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('awards')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'awards'
                  ? 'bg-brand-gold text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-white" />
              <span>Awards & Honors ({AWARDS.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Refined Editorial Press Table */}
        {activeTab === 'press' && (
          <div className="divide-y divide-white/10 border-y border-white/10">
            {PRESS_ITEMS.map((item, index) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col md:flex-row md:items-center justify-between py-6 sm:py-7 px-2 hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8 max-w-4xl">
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-xs text-stone-500">0{index + 1}</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-bold tracking-wide">
                      {item.outlet}
                    </span>
                  </div>

                  <h3 className="text-[18px] sm:text-[21px] font-bold text-white group-hover:text-brand-gold transition-colors tracking-tight [text-wrap:pretty]">
                    {item.headline}
                  </h3>
                </div>

                <div className="mt-3 md:mt-0 flex items-center justify-between md:justify-end gap-6 shrink-0">
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                    <span className="hidden sm:inline">{item.category}</span>
                    <span>·</span>
                    <span>{item.year}</span>
                  </div>

                  <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Tab 2: Awards Timeline */}
        {activeTab === 'awards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AWARDS.map((award, index) => (
              <div
                key={award.id}
                className="p-7 rounded-2xl bg-dark-surface border border-white/10 shadow-lg flex flex-col justify-between hover:border-brand-gold/60 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-xs font-bold font-mono">
                      {award.year}
                    </span>
                    <span className="text-xs font-mono text-stone-500">0{index + 1}</span>
                  </div>

                  <h3 className="text-[22px] font-bold text-white group-hover:text-brand-gold transition-colors tracking-tight">
                    {award.title}
                  </h3>

                  <div className="mt-1 text-sm font-semibold text-brand-gold">
                    {award.organization}
                  </div>

                  <p className="mt-4 text-[14px] text-stone-300 leading-relaxed">
                    {award.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-stone-400">
                  <Award className="w-4 h-4 text-brand-gold" />
                  <span>Verified National Citation</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
