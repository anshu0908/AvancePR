import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '@/data/services';
import { CASE_STUDIES } from '@/data/work';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/#services" replace />;
  }

  // Find 2 related case studies
  const relatedCases = CASE_STUDIES.filter((c) =>
    c.serviceTags.some((tag) => tag.toLowerCase().includes(service.title.toLowerCase()) || service.title.toLowerCase().includes(tag.toLowerCase()))
  ).slice(0, 2);

  const displayCases = relatedCases.length > 0 ? relatedCases : CASE_STUDIES.slice(0, 2);

  // 4-step structured methodology
  const steps = [
    {
      num: '01',
      title: 'Narrative Excavation & Angle Craft',
      desc: 'We audit your milestones, competitors, and sector dynamics to distill an undeniable journalistic hook.'
    },
    {
      num: '02',
      title: 'Targeted Media Architecture',
      desc: 'Formulation of bespoke press assets, targeted editor selection, and tailored briefing documents.'
    },
    {
      num: '03',
      title: 'Direct Pitching & Embargo Blitz',
      desc: 'Aggressive, personalized outreach to Tier-1 beat reporters, facilitating interviews and exclusive features.'
    },
    {
      num: '04',
      title: 'Syndication & Authority Amplification',
      desc: 'Maximizing coverage longevity through digital syndication, social distribution, and executive profiling.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{`${service.title} | Avance PR — Strategic Communications`}</title>
        <meta name="description" content={service.description} />
        <link rel="canonical" href={`https://www.avancepr.in/services/${service.slug}`} />
      </Helmet>

      <main id="main-content" className="pt-28 sm:pt-36 bg-transparent text-light-bg">
        {/* Back Link & Breadcrumb */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-8">
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-brand-gold transition-colors font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Capabilities</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-brand-gold font-mono">
                  Practice Area
                </span>
              </div>

              <h1 className="text-[40px] sm:text-[56px] lg:text-[68px] font-extrabold tracking-[-0.035em] leading-[1.04] text-white [text-wrap:balance]">
                {service.title}
              </h1>

              <p className="mt-6 text-[18px] sm:text-[22px] font-medium text-stone-200 leading-snug">
                {service.tagline}
              </p>

              <p className="mt-4 text-[16px] text-stone-300 leading-relaxed max-w-2xl">
                {service.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton to="/contact" variant="primary">
                  Discuss {service.title}
                </MagneticButton>
                <a
                  href={`https://wa.me/919899707349?text=Hello%20Avance%20PR%2C%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-stone-200 hover:border-brand-gold hover:text-white text-sm font-semibold transition-colors"
                >
                  <span>Quick WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800 bg-stone-900 aspect-[4/3] lg:aspect-[1/1]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                  Avance PR · {service.title} Practice
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deliverables Section */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 border-b border-white/10">
          <SectionHeading
            theme="dark"
            eyebrow="Deliverables & Scope"
            title="What we execute under this mandate."
            description="Concrete, tangible strategic outputs designed to command national media respect."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-dark-surface border border-white/10 shadow-lg flex items-start gap-4 hover:border-brand-gold/60 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{item}</h3>
                  <p className="mt-1 text-sm text-stone-400">
                    Handled end-to-end by our senior communications leads.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Step Strategic Methodology */}
        <div className="bg-stone-950 py-20 sm:py-28 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionHeading
              align="center"
              theme="dark"
              eyebrow="Strategic Execution"
              title="How we deploy your campaign in four steps."
            />

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((st) => (
                <div
                  key={st.num}
                  className="p-7 rounded-2xl bg-dark-surface border border-white/10 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-2xl font-extrabold text-brand-gold">
                      {st.num}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-4">{st.title}</h3>
                    <p className="mt-2 text-sm text-stone-300 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Relevant Case Studies */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeading
              theme="dark"
              eyebrow="Case Proof"
              title="Related campaign deployments."
            />
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-gold hover:text-white transition-colors"
            >
              <span>Explore All 13 Case Studies</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayCases.map((cs) => (
              <Link
                key={cs.id}
                to={`/work/${cs.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden bg-dark-surface border border-white/10 shadow-lg hover:border-brand-gold/60 transition-all"
              >
                <div className="relative w-full aspect-[1/1.3] overflow-hidden bg-stone-900">
                  <picture>
                    <source srcSet={cs.coverImage.replace(/\.(png|jpe?g)$/, '.webp')} type="image/webp" />
                    <img
                      src={cs.coverImage}
                      alt={cs.client}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-xs font-mono text-brand-gold border border-brand-gold/30 shadow-md">
                    {cs.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-gold transition-colors">
                    {cs.client}
                  </h3>
                  <p className="mt-2 text-sm text-stone-300 leading-relaxed line-clamp-2">
                    {cs.oneLiner}
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-brand-gold">
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <ClosingCtaSection />
      </main>
    </>
  );
};
