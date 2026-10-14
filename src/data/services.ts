export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  deliverables: string[];
  approach: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'startup-pr',
    slug: 'startup-pr',
    title: 'PR For Startups',
    tagline: 'From launch stage to category defining leadership.',
    description: 'We position ambitious founders and early-to-growth startups in tier-one national press, tech journals, and investor publications. We build the early credibility that drives customer trust and valuation multiples.',
    image: '/assets/services/startup-pr.jpg',
    deliverables: [
      'Funding & Product Launch Announcements',
      'Founder Thought Leadership & Profiling',
      'Tier-1 Media Relations & Press Releases',
      'Investor & Ecosystem Visibility Strategy'
    ],
    approach: [
      'Story Excavation & Hook Formulation',
      'Targeted Media Pitching (Tier A Publications)',
      'Founder Briefing & Interview Prep',
      'Syndication & Amplification Across Channels'
    ]
  },
  {
    id: 'influencer-marketing',
    slug: 'influencer-marketing',
    title: 'Influencer Marketing',
    tagline: 'High-affinity voice alignment with measurable resonance.',
    description: 'Connecting your brand with key opinion leaders, industry voices, and trusted creators. We orchestrate organic integrations and data-driven creator partnerships that convert awareness into conviction.',
    image: '/assets/services/influencer-marketing.jpg',
    deliverables: [
      'Bespoke Creator & Key Opinion Leader Sourcing',
      'Narrative Co-Creation & Campaign Briefing',
      'End-to-End Contract & Rights Management',
      'Engagement, Sentiment & Reach Reporting'
    ],
    approach: [
      'Audience Affinity & Authenticity Vetting',
      'Creative Angle Alignment with Brand Pillars',
      'Seamless Multi-Platform Execution',
      'Real-Time Pulse Tracking & Sentiment Analysis'
    ]
  },
  {
    id: 'corporate-communication',
    slug: 'corporate-communication',
    title: 'Corporate Communication',
    tagline: 'Protecting corporate reputation and commanding market respect.',
    description: 'Comprehensive stakeholder communications for established enterprises, logistics giants, and publicly oriented firms. We protect reputation, manage transitions, and maintain authoritative brand narratives.',
    image: '/assets/services/corporate-communication.jpg',
    deliverables: [
      'Executive Leadership Profiling & Op-Eds',
      'Stakeholder & Investor Communication Kits',
      'Corporate Mandate & CSR Amplification',
      'Internal & Change Management Advisory'
    ],
    approach: [
      'Stakeholder Mapping & Perception Benchmarking',
      'Strategic Narrative & Message Architecture',
      'Proactive Media Briefings & Roundtables',
      'Ongoing Reputation Monitoring & Measurement'
    ]
  },
  {
    id: 'social-media-marketing',
    slug: 'social-media-marketing',
    title: 'Social Media Management',
    tagline: 'Distinctive digital presence built on narrative velocity.',
    description: 'Full-spectrum social media execution that elevates corporate handles into cultural magnets. We combine compelling visual storytelling, rapid reactive trends, and community stewardship.',
    image: '/assets/services/social-media-marketing.jpg',
    deliverables: [
      'Editorial Calendar & Cross-Platform Strategy',
      'High-Impact Graphic, Motion & Video Content',
      'Active Community Stewardship & Engagement',
      'Paid Social Amplification & Funnel Retargeting'
    ],
    approach: [
      'Brand Persona & Tone Formulation',
      'Always-On Trend Sensing & Rapid Response',
      'Content Production with Editorial Polish',
      'Bi-Weekly Velocity & Sentiment Audits'
    ]
  },
  {
    id: 'crisis-management',
    slug: 'crisis-management',
    title: 'Crisis Management',
    tagline: 'Rapid containment, decisive clarity, and reputation safeguard.',
    description: 'When unforeseen events threaten hard-earned brand equity, our senior war room mobilizes within hours. We deploy containment protocols, proactive message framing, and stakeholder stabilization.',
    image: '/assets/services/crisis-management.jpg',
    deliverables: [
      '24/7 Rapid Incident War Room Response',
      'Holding Statements & Media FAQs Formulation',
      'Spokesperson Training & Simulated Press Scenarios',
      'Post-Crisis Narrative Rebuilding & Trust Recovery'
    ],
    approach: [
      'Instant Risk Assessment & Fact Verification',
      'Unified Message Formulation & Leak Containment',
      'Direct Media Engagement & Off-The-Record Briefs',
      'Long-Term Trust Recovery & SEO De-escalation'
    ]
  },
  {
    id: 'personal-branding',
    slug: 'personal-branding',
    title: 'Personal Branding',
    tagline: 'Elevating visionary executives into industry authorities.',
    description: 'We craft authentic, commanding public profiles for CEOs, visionary founders, and C-suite leaders. From keynote stages and prestigious podcast invitations to national award nominations and LinkedIn authority.',
    image: '/assets/services/personal-branding.jpg',
    deliverables: [
      'Founder Personal Narrative & Core Positioning',
      'Ghostwritten Columns, Op-Eds & LinkedIn Essays',
      'Keynote Speaking, Panel & Podcast Placement',
      'Prestige Industry Awards & Recognition Submissions'
    ],
    approach: [
      'Distinctive Intellectual Point-of-View Mapping',
      'Content Cadence & Editorial Ghostwriting',
      'High-Tier Media Interview Facilitation',
      'Network Resonance & Industry Standing Elevation'
    ]
  }
];
