export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'boost-reputation',
    question: 'How can a PR firm help boost the reputation and exposure of my brand?',
    answer: 'A dedicated PR firm builds earned media credibility rather than purchased visibility. At Avance PR, we translate your milestones, leadership insights, and innovations into compelling editorial narratives that top-tier journalists want to cover. This earns third-party validation in newspapers, industry journals, podcasts, and digital media—establishing long-term trust that directly influences customers, talent, and investors.',
    category: 'Strategy'
  },
  {
    id: 'evaluate-effectiveness',
    question: 'How are PR initiatives evaluated for their effectiveness and measurable impact?',
    answer: 'We track comprehensive qualitative and quantitative metrics: Tier-1 media placement volume, estimated readership reach, key message pull-through, share of voice (SOV) against competitors, inbound investor/partner inquiries, organic search lift (domain authority and branded searches), and positive sentiment shifts.',
    category: 'Measurement'
  },
  {
    id: 'timeframes-and-steps',
    question: 'What are the anticipated timeframes and steps involved in creating and launching a PR campaign?',
    answer: 'A structured campaign progresses through four distinct phases: (1) Discovery & Narrative Formulation (Days 1–7): deep-dive founder interviews, messaging angles, and asset assembly; (2) Media Architecture (Days 8–14): press release formulation, pitch customisation, and media list curation; (3) Execution & Pitching (Weeks 3–4): embargoed pitching, journalist briefings, and launch distribution; (4) Sustained Momentum (Ongoing): follow-up features, thought leadership op-eds, and reactive newsjacking.',
    category: 'Execution'
  },
  {
    id: 'team-experience',
    question: 'How qualified and experienced is the Avance PR team?',
    answer: 'Founded by Ritika Garg, who honed her foundational communications expertise at Ogilvy, our team comprises senior media strategists, former journalists, and creative storytellers. We have managed communications for 100+ brands across technology, EV mobility, enterprise SaaS, retail, and hospitality, earning recognitions such as ET 40 Under 40 and ET Women Leaders Awards.',
    category: 'Agency'
  },
  {
    id: 'pr-vs-advertising',
    question: 'What is the fundamental difference between PR and advertising?',
    answer: 'Advertising is paid media where you control the placement and message ("pay to speak"). Public Relations is earned media where an objective journalist or publication validates your credibility ("trusted endorsement"). Audiences inherently view earned media as authentic and authoritative, making PR up to 90% more effective at generating institutional conviction than plain advertisements.',
    category: 'Fundamentals'
  },
  {
    id: 'choosing-agency',
    question: 'How should a business choose the right PR agency in India?',
    answer: 'Look for an agency that: (1) has direct relationships with journalists in your specific sector (not generic blasting); (2) prioritizes strategic narrative craft over vanity metrics; (3) is founder-led and agile enough to capitalize on fast-moving news cycles; and (4) brings proven case studies with verified client outcomes and references.',
    category: 'Guidance'
  },
  {
    id: 'startup-pr-help',
    question: 'How specifically does strategic PR help early and growth-stage startups?',
    answer: 'For startups, credibility is currency. Strategic PR validates your solution in front of early adopters, aids talent recruitment by making your startup an aspirational workplace, and dramatically accelerates venture fundraising by creating positive perception among angel investors and VC partners before term sheets are signed.',
    category: 'Startups'
  },
  {
    id: 'types-of-pr',
    question: 'What are the different types of PR services Avance PR offers?',
    answer: 'We deliver full-spectrum communications tailored to different organizational needs: PR for Startups (launch and funding amplification), Corporate Communications (reputation and stakeholder management), Influencer Marketing (curated creator partnerships), Crisis Communications (rapid 24/7 issue containment), Social Media Management (digital narrative velocity), and Personal Branding (C-suite authority building).',
    category: 'Services'
  }
];
