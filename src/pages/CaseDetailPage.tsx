import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '@/data/work';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection';

export const CaseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const currentIndex = CASE_STUDIES.findIndex((c) => c.slug === slug);

  if (currentIndex === -1) {
    return <Navigate to="/work" replace />;
  }

  const currentCase = CASE_STUDIES[currentIndex];
  const nextCase = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  return (
    <>
      <Helmet>
        <title>{`${currentCase.client} Case Study | Avance PR`}</title>
        <meta
          name="description"
          content={`${currentCase.client} PR Case Study: ${currentCase.oneLiner}`}
        />
        <link rel="canonical" href={`https://www.avancepr.in/work/${currentCase.slug}`} />
      </Helmet>

      <main id="main-content" className="pt-28 sm:pt-36 bg-transparent text-light-bg min-h-screen">
        {/* Navigation Breadcrumb */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-8">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-brand-gold transition-colors font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Work</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-12 sm:pb-16 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3.5 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-xs font-mono uppercase tracking-wider font-bold">
              {currentCase.category}
            </span>
            <span className="text-stone-600 font-mono">/</span>
            <span className="text-xs text-stone-400 font-mono">
              Campaign Deployment 0{currentIndex + 1}
            </span>
          </div>

          <h1 className="text-[38px] sm:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.035em] leading-[1.04] text-white [text-wrap:balance]">
            {currentCase.client}
          </h1>

          <p className="mt-6 text-[18px] sm:text-[22px] font-medium text-stone-300 max-w-4xl leading-relaxed [text-wrap:pretty]">
            {currentCase.oneLiner}
          </p>

          <div className="mt-8 flex flex-wrap gap-2 text-xs font-mono text-stone-400">
            {currentCase.serviceTags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-stone-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Large Media Showcase (Ambient Luxury Editorial Stage) */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)] border border-white/15 bg-stone-950 py-10 sm:py-14 px-4 flex items-center justify-center">
            {/* Ambient Brand Color Backdrop Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <picture>
                <source srcSet={currentCase.coverImage.replace(/\.(png|jpe?g)$/, '.webp')} type="image/webp" />
                <img
                  src={currentCase.coverImage}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover filter blur-3xl opacity-35 scale-125"
                />
              </picture>
              <div className="absolute inset-0 bg-stone-950/60" />
            </div>

            {/* Crisp Foreground Poster Card in Authentic Resolution */}
            <div className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] aspect-[1/1.4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(212,151,59,0.15)] border-2 border-white/20 transition-transform duration-500 hover:scale-[1.01]">
              <picture>
                <source srcSet={currentCase.coverImage.replace(/\.(png|jpe?g)$/, '.webp')} type="image/webp" />
                <img
                  src={currentCase.coverImage}
                  alt={currentCase.client}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>

        {/* Case Study Body: Overview, Strategy, Approach, Outcome */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left Column: Quick Metadata & Metrics */}
            <div className="md:col-span-4 flex flex-col gap-8">
              <div className="p-6 rounded-2xl bg-dark-surface border border-white/10 shadow-lg space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider font-mono text-stone-500 block mb-1">
                    Client
                  </span>
                  <span className="text-lg font-bold text-white">{currentCase.client}</span>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider font-mono text-stone-500 block mb-1">
                    Sector
                  </span>
                  <span className="text-sm font-semibold text-stone-300">{currentCase.category}</span>
                </div>

                {currentCase.metrics && currentCase.metrics.length > 0 && (
                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <span className="text-xs uppercase tracking-wider font-mono text-brand-gold font-bold block">
                      Campaign Impact
                    </span>
                    {currentCase.metrics.map((m, mi) => (
                      <div key={mi}>
                        <div className="text-2xl font-extrabold text-white">{m.value}</div>
                        <div className="text-xs text-stone-400">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 rounded-2xl bg-stone-900 border border-brand-gold/30 text-white space-y-3">
                <span className="text-xs uppercase tracking-wider font-mono text-brand-gold font-bold block">
                  Need Similar Results?
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Book a direct briefing with our founder to discuss positioning your brand in tier-1 media.
                </p>
                <div className="pt-2">
                  <MagneticButton to="/contact" variant="primary" className="w-full text-xs py-2.5">
                    Schedule Strategy Call
                  </MagneticButton>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Editorial Sections */}
            <div className="md:col-span-8 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-gold" />
                  <span>Overview</span>
                </h2>
                <p className="mt-4 text-[16px] text-stone-300 leading-relaxed">
                  {currentCase.overview}
                </p>
              </div>

              {/* Objective & Strategy */}
              <div className="pt-8 border-t border-white/10">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-gold" />
                  <span>Objective & Strategy</span>
                </h2>
                <p className="mt-4 text-[16px] text-stone-300 leading-relaxed">
                  {currentCase.objective}
                </p>
              </div>

              {/* Approach */}
              <div className="pt-8 border-t border-white/10">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-gold" />
                  <span>Execution & Approach</span>
                </h2>
                <p className="mt-4 text-[16px] text-stone-300 leading-relaxed">
                  {currentCase.approach}
                </p>
              </div>

              {/* How Success Appeared */}
              <div className="pt-8 p-8 rounded-3xl bg-dark-surface border border-brand-gold/30 shadow-lg">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
                  <span>How Success Appeared</span>
                </h2>
                <p className="mt-4 text-[16px] text-stone-200 leading-relaxed font-medium">
                  {currentCase.outcome}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Case Study Navigation Banner */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 border-t border-white/10">
          <Link
            to={`/work/${nextCase.slug}`}
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-8 rounded-2xl bg-dark-surface border border-white/10 shadow-lg hover:border-brand-gold/60 transition-all"
          >
            <div>
              <span className="text-xs uppercase tracking-wider font-mono text-brand-gold font-bold">
                Next Case Study
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-brand-gold transition-colors mt-1">
                {nextCase.client}
              </h3>
              <p className="text-xs text-stone-400 mt-1">{nextCase.category}</p>
            </div>

            <div className="mt-4 sm:mt-0 flex items-center gap-2 text-sm font-bold text-brand-gold group-hover:translate-x-1 transition-transform">
              <span>View Case</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <ClosingCtaSection />
      </main>
    </>
  );
};
