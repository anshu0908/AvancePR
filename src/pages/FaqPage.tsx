import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { FAQS } from '@/data/faq';
import { SITE_CONFIG } from '@/data/site';
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection';

export const FaqPage: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Avance PR — Strategic Communications</title>
        <meta
          name="description"
          content="Answers to common questions about PR campaigns, startup PR timelines, crisis communications, media evaluation, and choosing the right agency."
        />
        <link rel="canonical" href="https://www.avancepr.in/faq" />
      </Helmet>

      <main id="main-content" className="pt-28 sm:pt-36 bg-dark-bg text-light-bg min-h-screen">
        {/* Header */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-14 border-b border-white/10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-brand-gold">
              Inquiry Resource
            </span>
          </div>

          <h1 className="text-[40px] sm:text-[60px] lg:text-[76px] font-extrabold tracking-[-0.035em] leading-[1.02] text-white [text-wrap:balance]">
            All your questions <span className="text-brand-gold">answered.</span>
          </h1>

          <p className="mt-6 text-[18px] sm:text-[22px] text-zinc-400 max-w-3xl leading-relaxed">
            Everything you need to know about how strategic communications functions, how we evaluate impact, and what to expect during a mandate.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <div className="divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((item, index) => {
              const isOpen = openId === item.id;

              return (
                <div key={item.id} className="py-6 sm:py-8">
                  <button
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-6 text-left group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs font-bold text-brand-gold mt-1">
                        0{index + 1}
                      </span>
                      <h2 className="text-[20px] sm:text-[24px] font-bold text-white group-hover:text-brand-gold transition-colors tracking-tight [text-wrap:balance]">
                        {item.question}
                      </h2>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full border border-white/15 flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen ? 'bg-brand-gold border-brand-gold text-dark-bg rotate-180' : 'text-zinc-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-4 pl-8 sm:pl-9 pr-4 text-[16px] text-zinc-300 leading-relaxed [text-wrap:pretty]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct Support Card */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-dark-surface border border-white/10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-wider font-mono text-brand-gold font-bold">
                Have a specialized inquiry?
              </span>
              <h3 className="text-2xl font-bold mt-1 text-white">Speak directly with our strategy team.</h3>
              <p className="text-sm text-zinc-400 mt-2 max-w-md">
                We assess PR viability, media hooks, and launch timelines in an initial complimentary 20-minute briefing.
              </p>
            </div>

            <a
              href={SITE_CONFIG.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-brand-gold text-dark-bg font-bold text-sm hover:bg-white transition-colors shrink-0 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>

        <ClosingCtaSection />
      </main>
    </>
  );
};
