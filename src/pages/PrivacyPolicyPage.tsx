import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection';

export const PrivacyPolicyPage: React.FC = () => {
  const lastUpdated = 'October 14, 2026';

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Avance PR — Strategic Communications</title>
        <meta
          name="description"
          content="Privacy Policy and Data Protection Charter of Avance PR. Compliant with India's Digital Personal Data Protection Act (DPDP Act 2023) and global standards."
        />
        <link rel="canonical" href="https://www.avancepr.in/privacy-policy" />
      </Helmet>

      <main id="main-content" className="pt-28 sm:pt-36 bg-dark-bg text-light-bg min-h-screen">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12 border-b border-white/10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-brand-gold font-mono">
              Legal & Compliance Charter
            </span>
          </div>

          <h1 className="text-[38px] sm:text-[54px] lg:text-[64px] font-extrabold tracking-[-0.035em] leading-[1.05] text-white [text-wrap:balance]">
            Privacy Policy & <span className="text-brand-gold">Data Protection.</span>
          </h1>

          <p className="mt-4 text-sm text-zinc-400 font-mono">
            Last Updated: {lastUpdated} · Version 2.4 · Effective across all Avance PR mandates
          </p>
        </div>

        {/* Legal Body */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-14 sm:py-20 text-stone-300 leading-relaxed text-[15px] sm:text-[16px] space-y-12">
          
          {/* Executive Summary */}
          <section className="p-8 rounded-2xl bg-dark-surface border border-white/10 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-brand-gold" />
              <span>Commitment to Narrative & Data Confidentiality</span>
            </h2>
            <p className="text-stone-300 leading-relaxed">
              Avance PR (“we”, “us”, “our”, or “the Agency”) is a boutique strategic communications and public relations agency with principal offices at <strong>5th Floor, Truworx Vatika Triangle, MG Road, Sector 28, Gurugram, Haryana 122009, India</strong>. We treat client information, embargoed press materials, and personal data with institutional-grade discretion under India’s <em>Digital Personal Data Protection Act, 2023 (DPDP Act)</em>, the <em>Information Technology Act, 2000</em>, and international privacy standards.
            </p>
          </section>

          {/* 1. Scope & Applicability */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">1. Scope and Applicability</h2>
            <p className="text-stone-300">
              This Privacy Policy applies to all personal and business data processed across:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-stone-300">
              <li>Visitors navigating our website at <code className="text-brand-gold">avancepr.in</code>.</li>
              <li>Prospective and active clients submitting mandate inquiries, briefs, and embargoed press releases.</li>
              <li>Journalists, editors, and key opinion leaders interacting with our media relations desk.</li>
              <li>Subscribers, event attendees, and corporate stakeholders receiving our PR perspectives and advisories.</li>
            </ul>
          </section>

          {/* 2. Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">2. Categories of Information We Collect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-gold" />
                  <span>Direct Inquiries & Briefs</span>
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Full name, work email address, telephone number, brand/company name, primary strategic service needs, campaign launch targets, and confidential briefing notes.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-brand-gold" />
                  <span>Technical & Telemetry Data</span>
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Browser type, operating system, IP address (anonymized), device classification, referral source, and interaction metrics used strictly to enhance page rendering performance.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Purpose of Processing */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">3. Lawful Basis and Purpose of Processing</h2>
            <p className="text-stone-300">
              We process personal data solely on legitimate commercial grounds and contractual necessity, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-stone-300">
              <li><strong className="text-white">Mandate Assessment:</strong> Evaluating PR viability, narrative hooks, and timeline feasibility for prospective clients.</li>
              <li><strong className="text-white">Contractual Execution:</strong> Delivering media relations, influencer management, corporate communications, and crisis containment scopes.</li>
              <li><strong className="text-white">Journalistic Pitching:</strong> Facilitating relevant story placements with national media editors based on public beats and legitimate journalistic interests.</li>
              <li><strong className="text-white">Security & Compliance:</strong> Protecting against unauthorized access, safeguarding intellectual property, and complying with statutory audit mandates.</li>
            </ul>
          </section>

          {/* 4. Media Relations & Press Discretion */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">4. Media Relations & Journalist Privacy Standards</h2>
            <p className="text-stone-300">
              Avance PR maintains verified relationships with senior correspondents, bureau chiefs, and broadcast producers across Indian and global publications. Media contact databases are curated exclusively from public journalistic bylines, official mastheads, and direct opt-in interactions. We do not sell, rent, or trade media contacts to external brokers under any circumstances.
            </p>
          </section>

          {/* 5. Non-Disclosure & Security Standards */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">5. Strict Non-Disclosure & Technical Safeguards</h2>
            <p className="text-stone-300">
              All confidential client materials—including unannounced funding rounds, executive transitions, M&A developments, and holding statements—are restricted to designated account war rooms under signed Non-Disclosure Agreements (NDAs). Data is protected using encrypted storage, access logging, and two-factor authenticated infrastructure.
            </p>
          </section>

          {/* 6. Cookies and Tracking */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">6. Cookies and Local Storage</h2>
            <p className="text-stone-300">
              Our website uses strictly necessary cookies and browser local storage to maintain session preferences (such as your cookie consent choice). We do not deploy invasive cross-site tracking pixels or behavioral ad profiling tools. You may configure your browser to reject cookies, though certain interactive features may be restricted.
            </p>
          </section>

          {/* 7. Data Subject Rights */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">7. Your Rights Under the DPDP Act & GDPR</h2>
            <p className="text-stone-300">
              As a data principal, you hold statutory rights regarding your personal information:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Right to access summary of processed personal data</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Right to correction and updating of outdated records</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Right to erasure / deletion where processing is complete</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Right to nominate and seek grievance redressal</span>
              </div>
            </div>
          </section>

          {/* 8. Grievance Officer & Contact Details */}
          <section className="p-8 rounded-2xl bg-dark-surface border border-white/10 text-white space-y-4 shadow-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-gold" />
              <span>Grievance Officer & Privacy Inquiries</span>
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              In accordance with the Information Technology Act 2000 and the Digital Personal Data Protection Act 2023, the details of our designated Data Protection & Grievance Officer are:
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 text-sm space-y-2 font-mono text-stone-300">
              <div><strong className="text-white">Designation:</strong> Data Protection Desk / Founder Office</div>
              <div><strong className="text-white">Officer:</strong> Ritika Garg, Founder & CEO</div>
              <div><strong className="text-white">Agency:</strong> Avance PR</div>
              <div><strong className="text-white">Address:</strong> 5th Floor, Truworx Vatika Triangle, MG Road, Sector 28, Gurugram, Haryana 122009, India</div>
              <div><strong className="text-white">Email:</strong> <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-brand-gold hover:underline">{SITE_CONFIG.contact.email}</a></div>
              <div><strong className="text-white">Response SLA:</strong> Within 48 business hours</div>
            </div>
          </section>

        </div>

        <ClosingCtaSection />
      </main>
    </>
  );
};
