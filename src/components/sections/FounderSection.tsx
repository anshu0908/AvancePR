import React from 'react';
import { Award, CheckCircle2, Linkedin, Mail } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const FounderSection: React.FC = () => {
  const credentials = [
    { title: 'Ogilvy Alumna', note: 'Global agency discipline' },
    { title: 'ET 40 Under 40', note: 'National business leader honor' },
    { title: 'ET Women Leaders 2025', note: 'Entrepreneurial excellence' },
    { title: 'Clarissa Awards', note: 'Leading PR Agency recipient' }
  ];

  return (
    <section className="relative w-full py-24 sm:py-36 bg-dark-bg text-light-bg overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800 bg-stone-900 group">
              <img
                src={SITE_CONFIG.founder.image}
                alt={SITE_CONFIG.founder.name}
                className="w-full h-auto aspect-[4/5] object-cover object-top transition-transform duration-700 group-hover:scale-102"
                loading="lazy"
                width="600"
                height="750"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

              {/* Founder Tag on Image */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full bg-brand-gold text-dark-bg text-[11px] font-bold uppercase tracking-wider">
                  Founder & CEO
                </span>
                <h3 className="text-2xl font-bold mt-2 tracking-tight">Ritika Garg</h3>
                <p className="text-xs text-zinc-300 font-mono mt-0.5">
                  Ogilvy Heritage · Communications Strategist
                </p>
              </div>
            </div>

            {/* Prestige Floating Accent Badge */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 p-5 rounded-2xl bg-dark-surface border border-white/15 shadow-2xl items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-brand-gold" />
              </div>
              <div className="text-xs font-medium text-stone-300">
                <strong className="block text-white font-bold">ET 40 Under 40</strong>
                Economic Times National Recognition
              </div>
            </div>
          </div>

          {/* Editorial Bio Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <SectionHeading
              theme="dark"
              eyebrow="Leadership & Heritage"
              title="Built on agency rigor. Driven by founder obsession."
            />

            {/* Signature Quote */}
            <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-dark-surface border border-white/10 border-l-4 border-l-brand-gold text-stone-200 text-[17px] sm:text-[19px] font-medium italic leading-relaxed shadow-lg">
              "{SITE_CONFIG.founder.quote}"
            </div>

            {/* Verified Narrative */}
            <div className="mt-6 space-y-4 text-[15px] sm:text-[16px] text-stone-300 leading-relaxed">
              <p>
                An award-winning entrepreneur recognized by the Economic Times 40 Under 40 and ET Women Leaders Awards, <strong className="text-white">Ritika Garg</strong> founded Avance PR to redefine how brands communicate, connect, and scale authority.
              </p>
              <p>
                A seasoned communications strategist who began her career at <strong className="text-white">Ogilvy</strong>, Ritika brings deep expertise in media relations, corporate communications, and influencer strategy. Under her leadership, Avance PR has grown into one of India’s fastest-emerging strategic communications agencies, trusted by over 100+ brands across technology, education, sustainability, hospitality, and finance.
              </p>
              <p>
                Guided by her belief that PR is not just about visibility but credibility, influence, and growth, Ritika continues to lead with innovation, empathy, and a people-first vision.
              </p>
            </div>

            {/* Credentials Row */}
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {credentials.map((cred, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-white font-bold text-[14px]">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{cred.title}</span>
                  </div>
                  <span className="text-[12px] text-stone-400 mt-1">{cred.note}</span>
                </div>
              ))}
            </div>

            {/* Direct Connect Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={SITE_CONFIG.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-brand-gold hover:text-dark-bg text-white text-sm font-semibold transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contact.founderEmail}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-stone-300 hover:border-brand-gold hover:text-white text-sm font-semibold transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email Founder Office</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
