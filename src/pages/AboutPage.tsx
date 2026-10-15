import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Target, Users, Zap } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection';

export const AboutPage: React.FC = () => {
  const values = [
    {
      icon: <Target className="w-6 h-6 text-brand-gold" />,
      title: 'Precision Narrative Architecture',
      description: 'We do not broadcast generic press releases. We sculpt unmistakable strategic hooks tailored to the specific beats of national journalists.'
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-gold" />,
      title: 'Earned Authority Over Paid Noise',
      description: 'We believe genuine market respect is earned through third-party journalistic scrutiny, objective validation, and intellectual leadership.'
    },
    {
      icon: <Zap className="w-6 h-6 text-brand-gold" />,
      title: 'Agile Founder-Led Mobilization',
      description: 'Free from bloated bureaucratic agency structures, our senior war room pivots at news-cycle speed to insert your brand into breaking conversations.'
    },
    {
      icon: <Users className="w-6 h-6 text-brand-gold" />,
      title: 'Deep Journalist Relationships',
      description: 'Built on years of integrity, editorial accuracy, and mutual respect with tier-1 editors across mainline dailies, television, and digital verticals.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Avance PR — Strategic Communications Agency</title>
        <meta
          name="description"
          content="Learn about Avance PR, founded by Ogilvy alumna Ritika Garg. High-impact strategic communications, media relations, and reputation architecture in Gurugram, India."
        />
        <link rel="canonical" href="https://www.avancepr.in/about" />
      </Helmet>

      <main id="main-content" className="pt-28 sm:pt-36 bg-transparent text-light-bg">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-20 border-b border-white/10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-brand-gold font-mono">
              About Avance PR
            </span>
          </div>

          <h1 className="text-[40px] sm:text-[60px] lg:text-[76px] font-extrabold tracking-[-0.035em] leading-[1.02] text-white max-w-4xl [text-wrap:balance]">
            We turn ambitious ventures into <span className="text-brand-gold">household authorities.</span>
          </h1>

          <p className="mt-8 text-[18px] sm:text-[22px] text-stone-300 max-w-3xl leading-relaxed [text-wrap:pretty]">
            Founded on the belief that PR is not merely about vanity visibility but institutional credibility, influence, and growth. We partner with founders who refuse to be ignored.
          </p>
        </div>

        {/* Narrative & Founder Heritage Section */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800 bg-stone-900">
                <picture>
                  <source srcSet="/assets/ritika.webp" type="image/webp" />
                  <img
                    src={SITE_CONFIG.founder.image}
                    alt="Ritika Garg, Founder & CEO of Avance PR"
                    className="w-full h-auto aspect-[4/5] object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-wider font-mono">
                    Founder & CEO
                  </span>
                  <h3 className="text-2xl font-bold">Ritika Garg</h3>
                  <p className="text-xs text-zinc-300">Ogilvy Alumna · ET 40 Under 40</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <SectionHeading
                theme="dark"
                eyebrow="Our Genesis"
                title="The discipline of global agencies. The hunger of a boutique powerhouse."
              />

              <div className="mt-6 space-y-5 text-[16px] text-stone-300 leading-relaxed">
                <p>
                  Having commenced her communications career at <strong className="text-white">Ogilvy</strong>, founder Ritika Garg observed a systemic disconnect in the Indian communications landscape: large legacy agencies were sluggish and formulaic, while smaller shops lacked strategic depth and journalistic gravitas.
                </p>
                <p>
                  Avance PR was conceived in Gurugram to bridge that void. We provide modern tech founders, mobility innovators, and legacy corporations with the strategic rigor of an international agency, paired with the ferocious speed, responsiveness, and media access of a dedicated partner.
                </p>
                <p>
                  Today, Avance PR has guided <strong className="text-white">100+ brands</strong> across India—commanding recurring tier-1 editorial placements in The Economic Times, Mint, YourStory, Financial Express, and national television networks.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-extrabold text-white font-sans">100+</div>
                  <div className="text-xs font-semibold text-brand-gold uppercase tracking-wider mt-1 font-mono">Brands Represented</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white font-sans">10B+</div>
                  <div className="text-xs font-semibold text-brand-gold uppercase tracking-wider mt-1 font-mono">Audience Reach</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white font-sans">5+</div>
                  <div className="text-xs font-semibold text-brand-gold uppercase tracking-wider mt-1 font-mono">National Awards</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="bg-stone-950 py-24 sm:py-32 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionHeading
              align="center"
              theme="dark"
              eyebrow="Our Guiding Ethos"
              title="Four non-negotiable standards of our practice."
              description="How we consistently outperform legacy public relations firms across India."
            />

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-dark-surface border border-white/10 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center mb-5 text-brand-gold">
                      {val.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{val.title}</h3>
                    <p className="mt-3 text-stone-300 text-sm leading-relaxed">{val.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ClosingCtaSection />
      </main>
    </>
  );
};
