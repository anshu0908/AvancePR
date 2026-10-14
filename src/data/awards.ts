export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
}

export const AWARDS: Award[] = [
  {
    id: 'et-40-under-40',
    title: '40 Under 40 Honoree',
    organization: 'The Economic Times',
    year: '2024',
    description: 'Recognized among India\'s top transformative business leaders and communication strategists shaping the nation\'s startup ecosystem.'
  },
  {
    id: 'et-women-leaders-2025',
    title: 'ET Women Leaders Award',
    organization: 'The Economic Times',
    year: '2025',
    description: 'Conferred for visionary entrepreneurship, exemplary communications leadership, and championing diverse teams.'
  },
  {
    id: 'clarissa-leading-pr-agency',
    title: 'Leading PR Agency of the Year',
    organization: 'Clarissa Awards',
    year: '2024',
    description: 'Awarded for standout campaign velocity, proactive media placement rates, and category-defining client case studies.'
  },
  {
    id: 'wonder-women-2025',
    title: 'Wonder Women 2025 Honor',
    organization: 'National Leadership Forum',
    year: '2025',
    description: 'Celebrating high-impact women leaders driving systemic transformation across marketing, communications, and media.'
  },
  {
    id: 'young-entrepreneur-award-2025',
    title: 'Young Entrepreneur Award',
    organization: 'Her Zindagi',
    year: '2025',
    description: 'Honoring breakthrough agency founders reshaping modern narrative architecture and independent communications.'
  }
];
