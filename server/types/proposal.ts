export interface CostItem {
  description: string;
  hours: number;
}

export interface TimelineItem {
  milestone: string;
  startDate: string;
  duration: number;
  durationUnit: 'days' | 'weeks' | 'months';
}

export interface PricingRegion {
  id: string;
  name: string;
  hourlyRate: number;
  currency: string;
  symbol: string;
}

export interface ProposalRequest {
  clientName: string;
  clientEmail: string;
  company?: string;
  projectTitle: string;
  serviceDescription: string;
  deliverables: string;
  costItems: CostItem[];
  timelineItems: TimelineItem[];
  language?: 'English' | 'Spanish';
  customTerms?: string;
  anthropicApiKey?: string; // Optional if using server-side key
}

export interface RegionalCostItem extends CostItem {
  hourlyRate: number;
  totalCost: number;
}

export interface RegionalProposal {
  region: PricingRegion;
  costItems: RegionalCostItem[];
  totalCost: number;
  executiveSummary: string;
  scopeOfWork: string;
  terms?: string;
}

export interface ProposalResponse {
  success: true;
  data: {
    client: {
      name: string;
      company?: string;
      email: string;
    };
    service: {
      description: string;
      scopeOfWork: string[];
    };
    timeline: TimelineItem[];
    regionalProposals: RegionalProposal[];
    customTerms?: string;
    generatedAt: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    status: number;
    stack?: string;
  };
  timestamp: string;
  path: string;
}