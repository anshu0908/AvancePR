import React, { useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

export const FixedContactButtons: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<'email' | 'whatsapp' | null>(null);

  const { fixedButtons, email } = SITE_CONFIG.contact;
  const targetEmail = fixedButtons?.email || email;
  const targetWaNumber = fixedButtons?.whatsappNumber || '919899707349';
  const waPrefill = encodeURIComponent(
    fixedButtons?.whatsappPrefillText || "Hi Avance PR team, I'd like to know more about your services."
  );
  const emailSubject = encodeURIComponent(
    fixedButtons?.emailSubject || 'Strategic Communications Inquiry — Avance PR'
  );
  const emailBody = encodeURIComponent(
    fixedButtons?.emailBody || "Hi Avance PR team,\n\nI would like to explore a strategic communications partnership for my organization.\n\nBrand / Organization:\nContact Name:\nPhone / WhatsApp:"
  );

  const emailHref = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`;
  const whatsappHref = `https://wa.me/${targetWaNumber}?text=${waPrefill}`;

  return (
    <aside
      aria-label="Quick contact options"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-auto select-none pb-[env(safe-area-inset-bottom,0px)]"
    >
      {/* WhatsApp Button */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {hoveredButton === 'whatsapp' && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="hidden sm:flex absolute right-full mr-3 items-center pointer-events-none"
            >
              <div className="py-1.5 px-3 rounded-xl bg-dark-surface/95 backdrop-blur-md border border-emerald-500/30 text-white text-xs font-semibold tracking-wide shadow-xl flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Chat on WhatsApp</span>
                <span className="text-zinc-500 font-mono text-[11px]">+91 98997 07349</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open WhatsApp conversation with Avance PR (+91 98997 07349)"
          onMouseEnter={() => setHoveredButton('whatsapp')}
          onMouseLeave={() => setHoveredButton(null)}
          onFocus={() => setHoveredButton('whatsapp')}
          onBlur={() => setHoveredButton(null)}
          className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_8px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.55)] border border-emerald-400/40 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg cursor-pointer"
        >
          {/* Subtle pulse ring on idle */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/20 animate-ping opacity-60 pointer-events-none group-hover:opacity-0" />
          
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
        </a>
      </div>

      {/* Gmail / Email Button */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {hoveredButton === 'email' && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="hidden sm:flex absolute right-full mr-3 items-center pointer-events-none"
            >
              <div className="py-1.5 px-3 rounded-xl bg-dark-surface/95 backdrop-blur-md border border-brand-gold/40 text-white text-xs font-semibold tracking-wide shadow-xl flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <span>Email Inquiry Desk</span>
                <span className="text-zinc-500 font-mono text-[11px]">{targetEmail}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href={emailHref}
          aria-label={`Send email to Avance PR (${targetEmail})`}
          onMouseEnter={() => setHoveredButton('email')}
          onMouseLeave={() => setHoveredButton(null)}
          onFocus={() => setHoveredButton('email')}
          onBlur={() => setHoveredButton(null)}
          className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-stone-900 to-black text-brand-gold shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_32px_rgba(212,151,59,0.35)] border border-brand-gold/50 hover:border-brand-gold flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg cursor-pointer"
        >
          <Mail className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110 text-brand-gold" />
        </a>
      </div>
    </aside>
  );
};
