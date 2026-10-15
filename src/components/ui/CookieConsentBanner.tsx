import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a cookie choice
    const consent = localStorage.getItem('avancepr_cookie_consent');
    if (!consent) {
      // Delay display slightly for smooth page entry
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('avancepr_cookie_consent', 'accepted_all');
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('avancepr_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-6 sm:right-auto z-[9990] sm:max-w-md w-full px-4 pb-4 sm:px-0 sm:pb-0"
        >
          <div className="p-5 sm:p-6 rounded-2xl bg-dark-bg/95 backdrop-blur-xl border border-brand-gold/30 text-white shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden">
            {/* Ambient Gold Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gold font-bold">
                    Privacy Preference
                  </span>
                  <h4 className="text-[15px] font-bold text-white tracking-tight mt-0.5">
                    We value your narrative privacy
                  </h4>
                </div>
              </div>

              <button
                onClick={handleEssentialOnly}
                aria-label="Close cookie banner"
                className="text-stone-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-3 text-[13px] text-zinc-300 leading-relaxed font-normal">
              Avance PR uses strictly essential telemetry and privacy-preserving cookies to optimize high-performance navigation and analyze site engagement under the Digital Personal Data Protection Act, 2023. Read our{' '}
              <Link to="/privacy-policy" className="text-brand-gold hover:underline font-medium">
                Privacy Policy
              </Link>.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 py-2.5 px-4 rounded-xl bg-brand-gold hover:bg-brand-gold-hover text-dark-bg font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Accept All
              </button>
              <button
                onClick={handleEssentialOnly}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs tracking-wider transition-colors border border-white/10"
              >
                Essential Only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
