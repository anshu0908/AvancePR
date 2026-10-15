import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Scale, AlertCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection';

export const TermsPage: React.FC = () => {
  const lastUpdated = 'October 14, 2026';

  return (
    <>
      <Helmet>
        <title>Terms of Service & Mandate Conditions | Avance PR</title>
        <meta
          name="description"
          content="Terms of Service and Master Mandate Agreement governing strategic communications, media relations, and advisory services provided by Avance PR."
        />
        <link rel="canonical" href="https://www.avancepr.in/terms-of-service" />
      </Helmet>

      <main id="main-content" className="pt-28 sm:pt-36 bg-transparent text-light-bg min-h-screen">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12 border-b border-white/10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-brand-gold font-mono">
              Commercial & Mandate Framework
            </span>
          </div>

          <h1 className="text-[38px] sm:text-[54px] lg:text-[64px] font-extrabold tracking-[-0.035em] leading-[1.05] text-white [text-wrap:balance]">
            Terms of Service & <span className="text-brand-gold">Engagement.</span>
          </h1>

          <p className="mt-4 text-sm text-zinc-400 font-mono">
            Last Updated: {lastUpdated} · Governed by the Laws of Haryana & Delhi NCR, India
          </p>
        </div>

        {/* Legal Body */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-14 sm:py-20 text-stone-300 leading-relaxed text-[15px] sm:text-[16px] space-y-12">
          
          {/* Executive Overview */}
          <section className="p-8 rounded-2xl bg-dark-surface border border-white/10 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-brand-gold" />
              <span>Master Engagement Protocol</span>
            </h2>
            <p className="text-stone-300 leading-relaxed">
              These Terms of Service (“Terms”) constitute a legally binding agreement between <strong>Avance PR</strong> (“Agency”, “we”, “us”) having its principal office at 5th Floor, Truworx Vatika Triangle, MG Road, Sector 28, Gurugram, India, and any corporate entity, founder, or individual (“Client”, “you”) accessing our digital services or executing a Statement of Work (SOW) for strategic communications.
            </p>
          </section>

          {/* 1. Scope of Strategic Communications Services */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">1. Scope of Services</h2>
            <p className="text-stone-300">
              Avance PR provides strategic communications advisory, including but not limited to: PR for Startups, Media Relations, Influencer Partnerships, Corporate Communications, Crisis Containment, and Executive Personal Branding. Specific deliverables, deployment timelines, and retainer tiers are governed by individual Statements of Work executed between the parties.
            </p>
          </section>

          {/* 2. Media Relations & Journalistic Independence */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">2. Media Relations & Editorial Independence</h2>
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-stone-200">
              <div className="flex items-center gap-2.5 font-bold text-brand-gold mb-2">
                <AlertCircle className="w-5 h-5 text-brand-gold" />
                <span>Fundamental Industry Standard & Disclaimer</span>
              </div>
              <p className="text-sm leading-relaxed text-stone-300">
                Avance PR practices authentic, earned media relations. We do not engage in paid editorial placement masquerading as objective reporting. While we apply proprietary narrative architecture and senior pitch strategy to maximize coverage, <strong className="text-white">editorial discretion remains solely with journalists, editors, and publication bureau chiefs</strong>. Avance PR cannot and does not guarantee specific publishing dates, word counts, or headlines in third-party press outlets.
              </p>
            </div>
          </section>

          {/* 3. Client Representations & Factual Integrity */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">3. Client Warranties & Information Accuracy</h2>
            <p className="text-stone-300">
              The Client warrants that all corporate data, financial figures, funding announcements, executive credentials, and quotes provided to the Agency for media distribution are accurate, complete, and non-infringing. The Client assumes full legal responsibility for any material misrepresentation or statutory violation contained in approved press materials.
            </p>
          </section>

          {/* 4. Retainer, Invoicing & Commercial Terms */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">4. Retainer Fees, Billing & Payment Protocols</h2>
            <ul className="list-disc pl-6 space-y-2 text-stone-300">
              <li><strong className="text-white">Advance Retainer:</strong> Monthly advisory retainers are billed on the 1st of each calendar month and are payable within 7 business days.</li>
              <li><strong className="text-white">Taxes:</strong> All commercial fees are exclusive of Goods and Services Tax (GST 18%) or applicable local statutory levies.</li>
              <li><strong className="text-white">Out-of-Pocket Expenses:</strong> Approved third-party production costs (press conference venue hire, wire service distribution fees, creator licensing) are billed at actuals with prior written consent.</li>
              <li><strong className="text-white">Default / Late Settlement:</strong> Unpaid invoices exceeding 30 calendar days shall incur interest at 1.5% per month until full discharge.</li>
            </ul>
          </section>

          {/* 5. Non-Disclosure & Mutual Confidentiality */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">5. Mutual Confidentiality (NDA)</h2>
            <p className="text-stone-300">
              Both parties agree to treat all proprietary information—including embargoed press releases, strategic business roadmaps, unreleased product blueprints, and commercial rates—as strictly confidential. This obligation survives termination of the engagement for a minimum period of three (3) years.
            </p>
          </section>

          {/* 6. Intellectual Property */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">6. Intellectual Property Rights</h2>
            <p className="text-stone-300">
              Upon receipt of full payment, the Client owns all final approved press releases, media kits, and ghostwritten thought-leadership articles prepared specifically for the Client. Avance PR retains all rights to its underlying agency methodologies, proprietary media intelligence databases, and general pitch strategies. The Agency reserves the right to cite published case studies in its credentials portfolio.
            </p>
          </section>

          {/* 7. Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">7. Limitation of Liability</h2>
            <p className="text-stone-300">
              To the maximum extent permitted by applicable Indian law, neither party shall be liable for indirect, incidental, consequential, or punitive damages. The aggregate liability of Avance PR arising from any mandate shall not exceed the total agency fees paid by the Client to Avance PR in the preceding two (2) months.
            </p>
          </section>

          {/* 8. Governing Law & Dispute Resolution */}
          <section className="p-8 rounded-2xl bg-dark-surface border border-white/10 text-white space-y-4 shadow-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-gold" />
              <span>Governing Law & Legal Jurisdiction</span>
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              These Terms and any individual Statement of Work shall be governed by and construed in accordance with the laws of India. Any unresolved dispute arising out of or in connection with an engagement shall be submitted to the exclusive jurisdiction of the competent courts located in <strong className="text-white">Gurugram, Haryana, India</strong>.
            </p>
            <div className="pt-4 border-t border-white/10 text-xs font-mono text-zinc-400">
              For formal legal notices: Legal Desk, Avance PR, 5th Floor, Truworx Vatika Triangle, MG Road, Sector 28, Gurugram, Haryana 122009 · <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-brand-gold hover:underline">{SITE_CONFIG.contact.email}</a>
            </div>
          </section>

        </div>

        <ClosingCtaSection />
      </main>
    </>
  );
};
