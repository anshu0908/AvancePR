import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/sections/HeroSection';
import { IntroScrubSection } from '@/components/sections/IntroScrubSection';
import { StatsBandSection } from '@/components/sections/StatsBandSection';
import { ServicesListSection } from '@/components/sections/ServicesListSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';
import { ClientsMarqueeSection } from '@/components/sections/ClientsMarqueeSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { PressAndAwardsSection } from '@/components/sections/PressAndAwardsSection';
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Avance PR: Best PR Agency in India | Top PR Firms for Startups</title>
        <meta
          name="description"
          content="Avance PR is an award-winning strategic communications and PR firm based in Gurugram, India. PR for startups, crisis management, influencer strategy, and corporate communication."
        />
        <link rel="canonical" href="https://www.avancepr.in/" />
      </Helmet>

      <main id="main-content">
        <HeroSection />
        <IntroScrubSection />
        <StatsBandSection />
        <ServicesListSection />
        <SelectedWorkSection />
        <ClientsMarqueeSection />
        <TestimonialsSection />
        <FounderSection />
        <PressAndAwardsSection />
        <ClosingCtaSection />
      </main>
    </>
  );
};
