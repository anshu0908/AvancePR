import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Phone, MapPin, Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { SERVICES } from '@/data/services';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-transparent text-light-bg border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[140px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-16 sm:pb-12 pb-[calc(4rem+env(safe-area-inset-bottom,0px))]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center p-1 bg-white/5 border border-white/10">
                <img
                  src="/assets/logo.png"
                  alt="Avance PR Logo"
                  className="w-full h-full object-contain"
                  width="40"
                  height="40"
                />
              </div>
              <span className="text-[22px] font-extrabold tracking-tight text-white">
                Avance<span className="text-brand-gold">PR</span>
              </span>
            </Link>

            <p className="text-zinc-400 text-[15px] leading-relaxed max-w-sm">
              Strategic communications and public relations agency based in Gurugram, India. Building earned credibility, narrative velocity, and category leadership for high-growth ventures.
            </p>

            {/* Direct Contacts - Fixed Mismatch */}
            <div className="flex flex-col gap-2.5 pt-2 text-[14px]">
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-3 text-zinc-300 hover:text-brand-gold transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-gold/50 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-brand-gold" />
                </div>
                <span>{SITE_CONFIG.contact.email}</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.contact.rawPhone}`}
                className="flex items-center gap-3 text-zinc-300 hover:text-brand-gold transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-gold/50 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-brand-gold" />
                </div>
                <span>{SITE_CONFIG.contact.phone}</span>
              </a>

              <div className="flex items-start gap-3 text-zinc-400 text-[13px] pt-1">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                </div>
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[12px] uppercase tracking-[0.16em] text-brand-gold font-bold">
              Services
            </span>
            <ul className="flex flex-col gap-2.5 text-[14px]">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span>{s.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[12px] uppercase tracking-[0.16em] text-brand-gold font-bold">
              Agency
            </span>
            <ul className="flex flex-col gap-2.5 text-[14px]">
              <li>
                <Link to="/about" className="text-zinc-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-zinc-400 hover:text-white transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-zinc-400 hover:text-white transition-colors">
                  PR Insights
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-zinc-400 hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-zinc-400 hover:text-white transition-colors">
                  Book Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="flex flex-col gap-4">
            <span className="text-[12px] uppercase tracking-[0.16em] text-brand-gold font-bold">
              Connect
            </span>
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-brand-gold transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-brand-gold transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-brand-gold transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[12px] text-zinc-500 pt-2 leading-relaxed">
              Founder Office: <a href={`mailto:${SITE_CONFIG.contact.founderEmail}`} className="text-zinc-400 hover:text-brand-gold">{SITE_CONFIG.contact.founderEmail}</a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-zinc-500">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2026 AvancePR. All rights reserved.</span>
            <Link to="/privacy-policy" className="hover:text-brand-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-brand-gold transition-colors">
              Terms of Service
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-400 hover:text-brand-gold transition-colors group cursor-pointer"
          >
            <span>Back to Top</span>
            <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-gold/50 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
