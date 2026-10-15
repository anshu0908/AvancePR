import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, ArrowUpRight, Clock, Building } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { SERVICES } from '@/data/services';
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: SERVICES[0].title,
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');
  const [mailLink, setMailLink] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const textPayload = `*New Consultation Inquiry — Avance PR*
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || 'Not specified'}
Service Interest: ${formData.service}
Campaign Brief: ${formData.message}`;

    const encodedText = encodeURIComponent(textPayload);
    const generatedWaLink = `https://wa.me/919899707349?text=${encodedText}`;
    const generatedMailLink = `mailto:info@avancepr.in?subject=${encodeURIComponent(`New PR Mandate Inquiry: ${formData.company || formData.fullName}`)}&body=${encodedText}`;

    setWaLink(generatedWaLink);
    setMailLink(generatedMailLink);
    setSubmitted(true);

    // Open WhatsApp in new tab automatically
    window.open(generatedWaLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Helmet>
        <title>Contact Avance PR | Strategic Communications Gurugram & Delhi NCR</title>
        <meta
          name="description"
          content="Initiate a strategic PR consultation with Avance PR. Offices at Truworx Vatika Triangle, Gurugram. Direct phone, email, and WhatsApp advisory."
        />
        <link rel="canonical" href="https://www.avancepr.in/contact" />
      </Helmet>

      <main id="main-content" className="pt-28 sm:pt-36 bg-transparent text-light-bg min-h-screen">
        {/* Editorial Header */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-12 sm:pb-16 border-b border-white/10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-brand-gold font-mono">
              Inquire & Partner
            </span>
          </div>

          <h1 className="text-[40px] sm:text-[60px] lg:text-[76px] font-extrabold tracking-[-0.035em] leading-[1.02] text-white max-w-4xl [text-wrap:balance]">
            Let’s build your <span className="text-brand-gold">category narrative.</span>
          </h1>

          <p className="mt-6 text-[18px] sm:text-[22px] text-stone-300 max-w-3xl leading-relaxed">
            Whether preparing for a funding announcement, entering a new market, or architecting national media presence, our senior advisory team responds within 24 hours.
          </p>
        </div>

        {/* Form & Office Information Grid */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Direct Contact & Office Cards */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Quick Communication Box */}
              <div className="p-8 sm:p-10 rounded-3xl bg-dark-surface border border-white/10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
                
                <span className="text-xs uppercase tracking-widest font-mono text-brand-gold font-bold">
                  Direct Line
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 text-white">
                  Fastest advisory response
                </h2>
                <p className="text-stone-300 text-sm sm:text-base mt-2 leading-relaxed">
                  For urgent press inquiries, launch timeline evaluations, or direct founder briefings.
                </p>

                <div className="mt-8 flex flex-col gap-4">
                  <a
                    href={SITE_CONFIG.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold hover:bg-brand-gold/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-stone-400 font-medium">WhatsApp Priority</div>
                        <div className="text-sm sm:text-base font-bold text-white">{SITE_CONFIG.contact.phone}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href={`tel:${SITE_CONFIG.contact.rawPhone}`}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold hover:bg-brand-gold/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-stone-400 font-medium">Direct Telephone</div>
                        <div className="text-sm sm:text-base font-bold text-white">{SITE_CONFIG.contact.phone}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold hover:bg-brand-gold/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-stone-400 font-medium">Inquiry Inbox</div>
                        <div className="text-sm sm:text-base font-bold text-white">{SITE_CONFIG.contact.email}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Office Headquarters Card */}
              <div className="p-8 rounded-3xl bg-dark-surface border border-white/10 shadow-lg flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-gold">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-stone-400 font-semibold">
                      Physical Presence
                    </span>
                    <h3 className="text-lg font-bold text-white">Gurugram Headquarters</h3>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-stone-300 text-sm leading-relaxed">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                  <p>{SITE_CONFIG.contact.address}</p>
                </div>

                <div className="flex items-center gap-3 text-stone-400 text-sm">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Monday – Friday: 9:30 AM – 6:30 PM IST</span>
                </div>

                {/* Styled Map Preview Card */}
                <a
                  href="https://maps.google.com/?q=Truworx+Vatika+Triangle+Gurugram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block relative rounded-2xl overflow-hidden border border-white/15 group aspect-video bg-stone-900"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 group-hover:opacity-85 transition-all duration-500"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 50% 50%, rgba(212,151,59,0.2), rgba(9,8,7,0.9)), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 20px)'
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                    <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-2">
                      <MapPin className="w-5 h-5 text-dark-bg" />
                    </div>
                    <div className="font-bold text-sm">Vatika Triangle, MG Road</div>
                    <div className="text-xs text-stone-300 mt-1 flex items-center gap-1">
                      <span>Open in Google Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Inquiry Consultation Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl bg-dark-surface border border-white/10 shadow-2xl">
                <div className="mb-8">
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
                    Mandate Consultation
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
                    Tell us about your brand vision
                  </h2>
                  <p className="text-stone-300 text-sm sm:text-base mt-2">
                    Fill out the briefing parameters below. Your submission triggers direct communication via WhatsApp and email.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center gap-4 animate-fade-in">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Inquiry Prepared</h3>
                    <p className="text-stone-300 text-sm max-w-md">
                      Your consultation details have been formatted. We have opened WhatsApp to connect you directly with our strategy lead.
                    </p>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full justify-center">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Re-open WhatsApp</span>
                      </a>
                      <a
                        href={mailLink}
                        className="px-6 py-3 rounded-full bg-brand-gold hover:bg-brand-gold-hover text-dark-bg font-extrabold text-sm flex items-center justify-center gap-2 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Send as Email</span>
                      </a>
                    </div>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-xs font-semibold text-stone-400 hover:text-white underline"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2 font-mono">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Ritika Garg"
                          className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-stone-900/90 text-white placeholder:text-stone-500 focus:bg-stone-950 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2 font-mono">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-stone-900/90 text-white placeholder:text-stone-500 focus:bg-stone-950 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2 font-mono">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98997 07349"
                          className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-stone-900/90 text-white placeholder:text-stone-500 focus:bg-stone-950 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2 font-mono">
                          Company / Brand Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="e.g. HostBooks / Stovekraft"
                          className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-stone-900/90 text-white placeholder:text-stone-500 focus:bg-stone-950 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2 font-mono">
                        Primary Strategic Need *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-stone-900/90 text-white focus:bg-stone-950 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                      >
                        {SERVICES.map(s => (
                          <option key={s.id} value={s.title} className="bg-stone-900 text-white">
                            {s.title}
                          </option>
                        ))}
                        <option value="General PR & Media Retainer" className="bg-stone-900 text-white">General PR & Media Retainer</option>
                        <option value="Crisis Communications Consultation" className="bg-stone-900 text-white">Crisis Communications Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2 font-mono">
                        Campaign Goals & Timeline *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your upcoming launch, current media footprint, target audience, or specific challenges..."
                        className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-stone-900/90 text-white placeholder:text-stone-500 focus:bg-stone-950 focus:outline-none focus:border-brand-gold transition-colors text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-brand-gold hover:bg-brand-gold-hover text-dark-bg font-extrabold text-base transition-all duration-300 shadow-lg hover:shadow-brand-gold/30 flex items-center justify-center gap-2 cursor-pointer mt-2 focus-visible:ring-2 focus-visible:ring-brand-gold"
                    >
                      <Send className="w-4 h-4 text-dark-bg" />
                      <span>Initiate Strategic Consultation</span>
                    </button>

                    <p className="text-center text-xs text-stone-400 mt-1">
                      Strict confidentiality assured. Non-disclosure agreements signed prior to campaign briefing upon request.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>

        <ClosingCtaSection />
      </main>
    </>
  );
};
