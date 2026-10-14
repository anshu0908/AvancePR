import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { MagneticButton } from '@/components/ui/MagneticButton';

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isScrolledRef = useRef(false);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const nextScrolled = currentScrollY > 40;
          if (nextScrolled !== isScrolledRef.current) {
            isScrolledRef.current = nextScrolled;
            setIsScrolled(nextScrolled);
          }

          const nextVisible = !(currentScrollY > 120 && currentScrollY > lastScrollY && !isMobileMenuOpen);
          if (nextVisible !== isVisibleRef.current) {
            isVisibleRef.current = nextVisible;
            setIsVisible(nextVisible);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-dark-bg/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden flex items-center justify-center p-1 bg-white/5 border border-white/10 group-hover:border-brand-gold/60 transition-colors">
              <img
                src="/assets/logo.png"
                alt="Avance PR Logo"
                className="w-full h-full object-contain"
                width="40"
                height="40"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] sm:text-[19px] font-extrabold tracking-[-0.02em] text-white">
                Avance<span className="text-brand-gold">PR</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-zinc-400 font-medium hidden sm:block">
                Strategic Communications
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {SITE_CONFIG.navLinks.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-[14px] font-medium transition-colors duration-200 relative py-1 ${
                    isActive ? 'text-brand-gold' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:block">
              <MagneticButton to="/contact" variant="primary" showArrow={true}>
                Book a Strategy Call
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-brand-gold" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark-bg/98 backdrop-blur-xl md:hidden flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
          >
            {/* Background ambient radial glow */}
            <div className="absolute top-1/4 -right-1/4 w-80 h-80 rounded-full bg-brand-gold/10 blur-[100px] pointer-events-none" />

            <div className="flex flex-col gap-5 pt-4">
              <span className="text-[12px] uppercase tracking-[0.16em] text-brand-gold font-bold">
                Navigation
              </span>
              <nav className="flex flex-col gap-4">
                {SITE_CONFIG.navLinks.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.35 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-[28px] font-bold tracking-tight text-white hover:text-brand-gold transition-colors flex items-center justify-between"
                    >
                      {item.name}
                      <span className="text-zinc-600 text-sm font-mono">0{index + 1}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Mobile Contact Quick Actions */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
              <MagneticButton
                to="/contact"
                variant="primary"
                className="w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a Strategy Call
              </MagneticButton>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${SITE_CONFIG.contact.rawPhone}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white text-sm font-medium"
                >
                  <Phone className="w-4 h-4 text-brand-gold" />
                  Call Agency
                </a>
                <a
                  href={SITE_CONFIG.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:text-emerald-300 text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              <p className="text-[12px] text-zinc-500 text-center pt-2">
                5th Floor, Truworx Vatika Triangle, MG Road, Gurugram
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
