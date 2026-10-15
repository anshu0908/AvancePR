import React from 'react';
import { Mail, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { MagneticButton } from '@/components/ui/MagneticButton';

export const ClosingCtaSection: React.FC = () => {
  return (
    <section className="relative w-full py-28 sm:py-40 bg-transparent text-light-bg overflow-hidden border-t border-white/10">
      {/* Light concentric ripple echo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[300px] h-[300px] rounded-full border border-brand-gold/40 animate-pulse-subtle" />
        <div className="absolute w-[550px] h-[550px] rounded-full border border-brand-gold/25" />
        <div className="absolute w-[850px] h-[850px] rounded-full border border-brand-gold/15" />
        <div className="absolute w-[1200px] h-[1200px] rounded-full border border-brand-gold/10" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-brand-gold/30 mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-brand-gold">
            Initiate Your Mandate
          </span>
        </div>

        {/* Giant Headline */}
        <h2 className="text-[44px] sm:text-[68px] md:text-[84px] lg:text-[96px] font-extrabold tracking-[-0.035em] leading-[0.98] text-white [text-wrap:balance]">
          Let's make <span className="bg-gradient-to-r from-brand-gold via-[#F7D488] to-brand-gold bg-clip-text text-transparent">headlines.</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-8 text-[17px] sm:text-[20px] text-zinc-300 max-w-2xl leading-relaxed [text-wrap:pretty]">
          Whether preparing a landmark funding announcement, launching into the Indian market, or safeguarding reputation—our senior strategists are ready to mobilize.
        </p>

        {/* Primary CTA Button */}
        <div className="mt-10">
          <MagneticButton to="/contact" variant="primary" className="text-base px-8 py-4">
            Book a free strategy call
          </MagneticButton>
        </div>

        {/* Large Direct Links Grid */}
        <div className="mt-16 pt-12 border-t border-white/10 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
          <a
            href={`tel:${SITE_CONFIG.contact.rawPhone}`}
            className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold hover:bg-white/10 transition-all text-white group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-zinc-400 font-mono">Direct Line</span>
              <span className="text-[15px] font-bold text-white group-hover:text-brand-gold transition-colors">{SITE_CONFIG.contact.phone}</span>
            </div>
          </a>

          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold hover:bg-white/10 transition-all text-white group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-zinc-400 font-mono">Inquiry Desk</span>
              <span className="text-[15px] font-bold text-white group-hover:text-brand-gold transition-colors">{SITE_CONFIG.contact.email}</span>
            </div>
          </a>

          <a
            href={SITE_CONFIG.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/15 transition-all text-white group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-emerald-400 font-mono">Immediate WhatsApp</span>
              <span className="text-[15px] font-bold text-white group-hover:text-emerald-300 transition-colors">Start Chat</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
