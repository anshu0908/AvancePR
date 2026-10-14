export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  category: string;
  serviceTags: string[];
  coverImage: string;
  oneLiner: string;
  overview: string;
  objective: string;
  approach: string;
  outcome: string;
  metrics?: { label: string; value: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '13',
    slug: 'stovekraft',
    client: 'Stovekraft',
    category: 'Consumer & Retail',
    serviceTags: ['Corporate Communication', 'Product Launch PR', 'Media Relations'],
    coverImage: '/assets/work/stovekraft.png',
    oneLiner: 'Secured national & regional media dominance across Dainik Bhaskar, Mint, and ET Retail for premier kitchenware launches.',
    overview: 'Stovekraft, a leading home appliance brand in India, offers innovative and affordable kitchen solutions with flagship household brands like Pigeon and Gilma, catering to evolving Indian consumer needs.',
    objective: 'Stovekraft sought to announce upcoming product launches while solidifying its position as the market leader in kitchen appliances. The objective was to reach women and modern households through strategic digital, regional, and national media presence.',
    approach: 'Executed a multi-tiered communications blitz: released tailored press notes across regional and digital publications, coordinated product reviews highlighting unique value propositions, and leveraged women-centric platforms like Her Zindagi to deepen target engagement.',
    outcome: 'Through a well-executed PR campaign, Stovekraft secured extensive media coverage in leading publications such as Dainik Bhaskar, Punjab Kesari, Rashtriya Sahara, ET Retail, Indian Retailer, and Mint. This strategic presence amplified brand credibility and reinforced market leadership.',
    metrics: [
      { label: 'Tier-1 Outlets', value: 'Mint, ET Retail' },
      { label: 'Regional Reach', value: 'Pan-India Vernacular' }
    ]
  },
  {
    id: '9',
    slug: 'hostbooks',
    client: 'HostBooks',
    category: 'Enterprise Fintech & SaaS',
    serviceTags: ['PR For Startups', 'Fintech PR', 'Corporate Reputation'],
    coverImage: '/assets/work/hostbooks.png',
    oneLiner: 'Generated over 10 Billion+ organic audience reach across top business publications for premier accounting automation.',
    overview: 'HostBooks is a premier provider of comprehensive business automation and cloud-based accounting solutions, empowering SMEs, chartered accountants, and enterprises across India.',
    objective: 'Elevate HostBooks from a software provider to the definitive thought leader in automated compliance, taxation, and business productivity ahead of key market expansion.',
    approach: 'Positioned the leadership through hard-hitting commentary on national budget implications, GST digital transformations, and technology op-eds, backed by continuous news releases on customer milestone growth.',
    outcome: 'Generated around 10 Billion+ cumulative audience reach through prominent features in Economic Times, Financial Express, Business Standard, and Zee Business, solidifying HostBooks as India’s leading accounting automation platform.',
    metrics: [
      { label: 'Media Impressions', value: '10B+' },
      { label: 'Business Press', value: 'ET, FE, BS' }
    ]
  },
  {
    id: '10',
    slug: 'arc-electric',
    client: 'Arc Electric',
    category: 'EV & Clean Mobility',
    serviceTags: ['Startup PR', 'Influencer Strategy', 'Clean Mobility'],
    coverImage: '/assets/work/arc-electric.png',
    oneLiner: 'Propelled India\'s pioneering B2B EV mobility platform into national clean-tech spotlight.',
    overview: 'Arc Electric is India\'s leading B2B Electric Vehicle platform, driving zero-emission fleet electrification for enterprise logistics and sustainable last-mile delivery.',
    objective: 'Establish market authority in clean mobility, attract strategic fleet partners, and position the founders as pioneers in India’s green transportation revolution.',
    approach: 'Formulated a comprehensive campaign highlighting EV unit economics, sustainability benchmarks, and fleet electrification milestones across automotive, tech, and financial media.',
    outcome: 'Secured extensive national coverage across major automotive and mainstream publications, successfully generating inquiries from top-tier institutional delivery partners.',
    metrics: [
      { label: 'Industry Spotlight', value: 'Clean Mobility Leader' },
      { label: 'Campaign Reception', value: 'Objective Achieved' }
    ]
  },
  {
    id: '12',
    slug: 'minimalist-hotel',
    client: 'Minimalist Hotel',
    category: 'Hospitality & Lifestyle',
    serviceTags: ['Influencer Marketing', 'Brand PR', 'Hospitality'],
    coverImage: '/assets/work/minimalist-hotel.png',
    oneLiner: 'Positioned boutique hybrid hospitality as the premier destination for discerning modern travelers.',
    overview: 'Minimalist Hotel, a pioneer in hybrid hospitality, merges modern minimalism with experiential boutique hotel culture in design-forward Indian destinations.',
    objective: 'Drive viral brand awareness and booking desire among contemporary urban travelers, digital nomads, and design enthusiasts.',
    approach: 'Orchestrated curated creator residencies, lifestyle media reviews, and architectural design features across premier travel and style publications.',
    outcome: 'Through a meticulously planned PR campaign, Minimalist Hotel became one of the most talked-about design properties, achieving peak occupancy and high social media resonance.',
    metrics: [
      { label: 'Niche Resonance', value: 'Design & Luxury Media' },
      { label: 'Occupancy Impact', value: 'Sustained Growth' }
    ]
  },
  {
    id: '11',
    slug: 'om-logistics',
    client: 'Om Logistics',
    category: 'Logistics & Supply Chain',
    serviceTags: ['Corporate Communication', 'Trade Press', 'Enterprise PR'],
    coverImage: '/assets/work/om-logistics.png',
    oneLiner: 'Reinforced multi-modal leadership for India\'s foremost nationwide supply chain and freight giant.',
    overview: 'Om Logistics is one of India\'s largest multi-modal logistics and supply chain conglomerates, connecting industrial hubs across the nation.',
    objective: 'Communicate massive infrastructure expansions, green fleet transitions, and technological modernizations to industrial clients and investors.',
    approach: 'Targeted leading supply chain journals, business dailies, and trade media with strategic milestones, infrastructure capacity releases, and leadership perspectives.',
    outcome: 'Through a well-crafted PR campaign, Om Logistics generated substantial visibility across industrial and corporate sectors, affirming its status as a pillar of Indian logistics infrastructure.',
    metrics: [
      { label: 'Trade Impact', value: 'Pan-India Industrial' },
      { label: 'Corporate Stature', value: 'Market Authority' }
    ]
  },
  {
    id: '2',
    slug: 'amara-ai',
    client: 'Amara.ai',
    category: 'Artificial Intelligence & HR Tech',
    serviceTags: ['Startup PR', 'AI Tech PR', 'Founder Profiling'],
    coverImage: '/assets/work/amara-ai.jpeg',
    oneLiner: 'Achieved 1 Billion+ reach for an AI-powered conversational platform transforming employee engagement.',
    overview: 'Amara is an enterprise AI chatbot that fosters workplace belonging, enhances retention, and interprets real-time employee sentiment.',
    objective: 'Position Amara.ai as an indispensable HR tech innovation for post-pandemic distributed and hybrid enterprise workforces.',
    approach: 'Executed thought-leadership op-eds on workplace burnout, retention analytics, and AI empathy, supported by customer case stories.',
    outcome: 'Generated around 1 Billion+ reach through prominent features across tech publications, HR leadership magazines, and national news dailies.',
    metrics: [
      { label: 'Media Reach', value: '1 Billion+' },
      { label: 'Core Category', value: 'HR Tech AI' }
    ]
  },
  {
    id: '3',
    slug: 'ayatiworks',
    client: 'Ayatiworks',
    category: 'Digital Marketing & Media',
    serviceTags: ['Corporate Communication', 'Personal Branding'],
    coverImage: '/assets/work/ayatiworks.jpeg',
    oneLiner: 'Secured high-profile speaking opportunities and industry roundtables for digital marketing vanguard.',
    overview: 'AyatiWorks is one of the top digital marketing and creative agencies delivering high-ROI growth solutions for consumer and B2B brands.',
    objective: 'Establish agency leadership on national marketing panels, prestigious podcasts, and industry summits.',
    approach: 'Proactively pitched agency founders for expert commentary on digital ad evolutions, consumer shifts, and MarTech trends.',
    outcome: 'Generated high-value opportunities for Ayatiworks to participate in prominent trade summits, boosting business inbound inquiries and industry renown.',
    metrics: [
      { label: 'Industry Panels', value: 'National Summits' },
      { label: 'Authority', value: 'Recognized Voice' }
    ]
  },
  {
    id: '4',
    slug: 'skills-caravan',
    client: 'Skills Caravan',
    category: 'EdTech & Enterprise SaaS',
    serviceTags: ['Startup PR', 'B2B Tech'],
    coverImage: '/assets/work/skills-caravan.jpeg',
    oneLiner: 'Commanded premier CAT A features in YourStory and national business press for enterprise upskilling.',
    overview: 'Skills Caravan is a SaaS-based B2B edtech platform revolutionizing corporate continuous learning, employee capability, and micro-learning.',
    objective: 'Drive enterprise enterprise L&D awareness and attract institutional HR buyers across tech and manufacturing sectors.',
    approach: 'Anchored PR around workplace skill obsolescence, modern workforce reskilling, and client ROI metrics.',
    outcome: 'Prominent features in Tier-A publications like YourStory and business journals, fueling rapid inbound enterprise demos.',
    metrics: [
      { label: 'Tier-A Coverage', value: 'YourStory Featured' },
      { label: 'Client Segment', value: 'Enterprise B2B' }
    ]
  },
  {
    id: '5',
    slug: 'ramp-global',
    client: 'Ramp Global',
    category: 'AutoTech & Enterprise Ecosystems',
    serviceTags: ['Startup PR', 'Corporate Communication'],
    coverImage: '/assets/work/ramp-global.jpeg',
    oneLiner: 'Secured landmark Economic Times coverage for India\'s leading aftermarket automotive ecosystem.',
    overview: 'RAMP Global is a comprehensive cloud-based ecosystem for automotive aftermarket businesses, repair centers, and fleet operators.',
    objective: 'Build credibility with institutional automotive investors and unorganized garage networks undergoing digital transformation.',
    approach: 'Crafted compelling growth narratives around aftermarket digitization, venture funding milestones, and nationwide workshop empowerment.',
    outcome: 'Prominent features in Category-A publications including Economic Times, Inc42, and prominent tech verticals.',
    metrics: [
      { label: 'Flagship Feature', value: 'Economic Times' },
      { label: 'Audience Sector', value: 'AutoTech' }
    ]
  },
  {
    id: '6',
    slug: 'uplifters',
    client: 'Uplifters',
    category: 'Skill-Based EdTech',
    serviceTags: ['Startup PR', 'Social Impact'],
    coverImage: '/assets/work/uplifters.jpeg',
    oneLiner: 'Amplified vernacular skill-building startup in The Pioneer and leading education media.',
    overview: 'Uplifters is an outcome-driven edtech startup with a "Learn Now, Pay Later" model providing affordable technical career education to Tier-2/3 youth.',
    objective: 'Highlight the human impact and social mobility driven by affordable technology education in non-metro India.',
    approach: 'Targeted leading education reporters and mainstream press with student success stories and democratic education op-eds.',
    outcome: 'Prominent features in CAT A publications including The Pioneer, Zee Education, and regional publications, driving massive student enrollments.',
    metrics: [
      { label: 'Publication Feature', value: 'The Pioneer' },
      { label: 'Impact Focus', value: 'Tier 2/3 Mobility' }
    ]
  },
  {
    id: '7',
    slug: 'aarika',
    client: 'Aarika Innovation',
    category: 'DeepTech & Hardware AI',
    serviceTags: ['Startup PR', 'DeepTech PR'],
    coverImage: '/assets/work/aarika.jpeg',
    oneLiner: 'Featured in Financial Express for frontier deep tech and proprietary hardware engineering.',
    overview: 'Aarika Innovation is a deep tech engineering company creating advanced automated hardware solutions and cutting-edge innovations.',
    objective: 'Establish technical credibility with global industrial procurement leaders and national innovation councils.',
    approach: 'Structured deep-dive technology features detailing proprietary IP, patent advancements, and domestic manufacturing capabilities.',
    outcome: 'Secured Tier-A coverage in Financial Express and national technology outlets, generating valuable institutional interest.',
    metrics: [
      { label: 'National Financial Press', value: 'Financial Express' },
      { label: 'Technology Segment', value: 'DeepTech IP' }
    ]
  },
  {
    id: '8',
    slug: 'togopool',
    client: 'Togopool',
    category: 'Consumer Tech & Smart Commute',
    serviceTags: ['Consumer PR', 'Influencer Marketing', 'Activations'],
    coverImage: '/assets/work/togopool.png',
    oneLiner: 'Organized 10+ corporate co-working activations and urban mobility campaigns across NCR.',
    overview: 'Togopool is a ride-sharing and carpooling app designed for safe, economical, and eco-friendly daily office commutes.',
    objective: 'Drive app installs and corporate route density among corporate professionals in Gurgaon and Delhi-NCR.',
    approach: 'Coupled regional press announcements with 10+ live activations in high-density co-working hubs and tech parks.',
    outcome: 'Generated extensive hyper-local media coverage and corporate signups, establishing high trust in ride safety.',
    metrics: [
      { label: 'On-Ground Activations', value: '10+ Co-Working Hubs' },
      { label: 'Commute Impact', value: 'NCR Metro Density' }
    ]
  },
  {
    id: '1',
    slug: 'prabhubhakti',
    client: 'Prabhubhakti',
    category: 'D2C & Spiritual Lifestyle',
    serviceTags: ['Startup PR', 'D2C Consumer PR'],
    coverImage: '/assets/work/prabhubhakti.jpeg',
    oneLiner: 'Accelerated brand exposure and consumer conviction for pioneer spiritual wellness e-commerce brand.',
    overview: 'Incorporated in 2022, Prabhu Bhakti is a rapidly scaling spiritual wellness and devotional apparel e-commerce brand.',
    objective: 'Establish consumer credibility, combat skeptical perceptions, and gain coverage as a pioneer in modern devotional retail.',
    approach: 'Formulated startup founder origin stories, festive trend stories, and national e-commerce growth features.',
    outcome: 'Generated extensive media coverage which increased brand search volume and established Prabhu Bhakti as a category frontrunner.',
    metrics: [
      { label: 'Category', value: 'Devotional D2C' },
      { label: 'Search Impact', value: 'Substantial Lift' }
    ]
  }
];
