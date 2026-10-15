import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { useLenis } from '@/hooks/useLenis';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ServiceDetailPage } from '@/pages/ServiceDetailPage';
import { WorkIndexPage } from '@/pages/WorkIndexPage';
import { CaseDetailPage } from '@/pages/CaseDetailPage';
import { BlogsPage } from '@/pages/BlogsPage';
import { FaqPage } from '@/pages/FaqPage';
import { ContactPage } from '@/pages/ContactPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { TermsPage } from '@/pages/TermsPage';
import { CookieConsentBanner } from '@/components/ui/CookieConsentBanner';
import { FixedContactButtons } from '@/components/ui/FixedContactButtons';
import { Scroll3DDotsBackground } from '@/components/three/Scroll3DDotsBackground';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const globalLenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: { immediate: boolean }) => void } }).__lenis;
    if (globalLenis) {
      globalLenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash]);

  return null;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/work" element={<WorkIndexPage />} />
          <Route path="/work/:slug" element={<CaseDetailPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  useLenis();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <CustomCursor />
        <Scroll3DDotsBackground />
        <div className="grain-overlay" aria-hidden="true" />
        <CookieConsentBanner />
        <FixedContactButtons />
        <div className="relative flex flex-col min-h-screen bg-transparent text-light-bg selection:bg-brand-gold selection:text-white z-10">
          <Navbar />
          <div className="flex-1 w-full">
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
