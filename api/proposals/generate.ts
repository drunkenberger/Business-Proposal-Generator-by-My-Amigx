import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

// Types
interface CostItem {
  description: string;
  hours: number;
}

interface TimelineItem {
  milestone: string;
  startDate: string;
  duration: number;
  durationUnit: 'days' | 'weeks' | 'months';
}

interface PricingRegion {
  id: string;
  name: string;
  hourlyRate: number;
  currency: string;
  symbol: string;
}

interface RegionalCostItem extends CostItem {
  hourlyRate: number;
  totalCost: number;
}

// Pricing regions
const PRICING_REGIONS: PricingRegion[] = [
  { id: 'mexico', name: 'Mexico', hourlyRate: 25, currency: 'USD', symbol: '$' },
  { id: 'us', name: 'United States', hourlyRate: 75, currency: 'USD', symbol: '$' },
  { id: 'europe', name: 'Europe', hourlyRate: 65, currency: 'USD', symbol: '$' }
];

// Helper functions
function calculateRegionalPricing(costItems: CostItem[], region: PricingRegion): RegionalCostItem[] {
  return costItems.map(item => ({
    ...item,
    hourlyRate: region.hourlyRate,
    totalCost: Math.round(item.hours * region.hourlyRate * 100) / 100
  }));
}

function calculateTotalCost(regionalCostItems: RegionalCostItem[]): number {
  const sum = regionalCostItems.reduce((total, item) => total + item.totalCost, 0);
  return Math.round(sum * 100) / 100;
}

// Validation helper
function validateRequest(body: any): string | null {
  if (!body.clientName || body.clientName.length < 2) return 'Client name is required (min 2 characters)';
  if (!body.clientEmail || !body.clientEmail.includes('@')) return 'Valid email is required';
  if (!body.projectTitle || body.projectTitle.length < 5) return 'Project title is required (min 5 characters)';
  if (!body.serviceDescription || body.serviceDescription.length < 20) return 'Service description is required (min 20 characters)';
  if (!body.deliverables || body.deliverables.length < 10) return 'Deliverables are required (min 10 characters)';
  if (!body.costItems || !Array.isArray(body.costItems) || body.costItems.length === 0) return 'At least one cost item is required';
  if (!body.timelineItems || !Array.isArray(body.timelineItems) || body.timelineItems.length === 0) return 'At least one timeline item is required';
  return null;
}

// AI generation function
async function generateProposal(anthropic: Anthropic, formData: any) {
  const prompt = `You are an expert business consultant and proposal writer with 15+ years of experience. Your task is to create a comprehensive, professional business proposal that significantly enriches and expands upon the basic information provided by the user.

IMPORTANT: Generate the entire response in ${formData.language || "English"}. All section titles and content must be in ${formData.language || "English"}. Do not translate proper nouns or numbers.

BASE INFORMATION PROVIDED:
- Client: ${formData.clientName}
- Project: ${formData.projectTitle}
- Services: ${formData.serviceDescription}
- Deliverables: ${formData.deliverables}
- Cost Items: ${formData.costItems?.map((item: CostItem) => `${item.description}: ${item.hours} hours`).join("\n")}
- Timeline: ${formData.timelineItems?.map((item: TimelineItem) => `${item.milestone}: ${item.duration} ${item.durationUnit} starting ${item.startDate}`).join("\n")}

YOUR MISSION: Transform this basic information into a compelling, detailed business proposal.

Please provide your response in this exact format, with these exact section headers (translated to ${formData.language || "English"}):

EXECUTIVE SUMMARY:
[Write a comprehensive 4-5 paragraph executive summary that includes market context, client objectives, value proposition, methodology, benefits, and timeline efficiency]

SCOPE OF WORK:
[Transform the basic deliverables into an exhaustive, professional scope with phase-by-phase breakdown, technical methodology, quality assurance, documentation standards, success metrics, and risk mitigation]

TERMS AND CONDITIONS:
[Generate comprehensive, professional terms including payment schedules, IP rights, change management, quality guarantees, confidentiality, dispute resolution, termination protocols, and liability limitations]

Transform this basic project information into a compelling business case that makes the client excited to work with WAZA Lab.`;

  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 8000,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  // Parse sections
  const executiveSummaryMatch = formData.language === "Spanish"
    ? text.match(/RESUMEN EJECUTIVO:\s*([\s\S]*?)(?=\n\nALCANCE DEL TRABAJO:)/i)
    : text.match(/EXECUTIVE SUMMARY:\s*([\s\S]*?)(?=\n\nSCOPE OF WORK:)/i);
  
  const scopeOfWorkMatch = formData.language === "Spanish"
    ? text.match(/ALCANCE DEL TRABAJO:\s*([\s\S]*?)(?=\n\nTÉRMINOS Y CONDICIONES:)/i)
    : text.match(/SCOPE OF WORK:\s*([\s\S]*?)(?=\n\nTERMS AND CONDITIONS:)/i);
  
  const termsMatch = formData.language === "Spanish"
    ? text.match(/TÉRMINOS Y CONDICIONES:\s*([\s\S]*?)$/i)
    : text.match(/TERMS AND CONDITIONS:\s*([\s\S]*?)$/i);

  return {
    executiveSummary: executiveSummaryMatch?.[1]?.trim() || "",
    scopeOfWork: scopeOfWorkMatch?.[1]?.trim() || "",
    terms: termsMatch?.[1]?.trim() || "",
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
  }

  try {
    // Validate request
    const validationError = validateRequest(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        error: {
          message: validationError,
          status: 400
        },
        timestamp: new Date().toISOString()
      });
    }

    // Get API key
    const apiKey = req.body.anthropicApiKey || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Anthropic API key is required. Provide it in the request or set ANTHROPIC_API_KEY in environment variables.',
          status: 400
        },
        timestamp: new Date().toISOString()
      });
    }

    // Initialize Anthropic
    const anthropic = new Anthropic({ apiKey });

    // Generate AI content
    const aiContent = await generateProposal(anthropic, req.body);

    // Process pricing for all regions
    const regionalProposals = PRICING_REGIONS.map(region => {
      const regionalCostItems = calculateRegionalPricing(req.body.costItems, region);
      const totalCost = calculateTotalCost(regionalCostItems);
      
      return {
        region,
        costItems: regionalCostItems,
        totalCost,
        executiveSummary: aiContent.executiveSummary,
        scopeOfWork: aiContent.scopeOfWork,
        terms: aiContent.terms
      };
    });

    // Prepare response
    const response = {
      success: true,
      data: {
        clientDetails: {
          name: req.body.clientName,
          company: req.body.company || req.body.projectTitle,
          email: req.body.clientEmail
        },
        serviceDetails: {
          description: aiContent.executiveSummary,
          scopeOfWork: aiContent.scopeOfWork
        },
        timeline: req.body.timelineItems,
        regionalProposals,
        customTerms: req.body.customTerms,
        generatedAt: new Date().toISOString()
      }
    };

    res.status(200).json(response);

  } catch (error: any) {
    console.error('Proposal generation error:', error);
    
    // Handle Anthropic API errors
    if (error?.status === 401) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid Anthropic API key',
          status: 401
        },
        timestamp: new Date().toISOString()
      });
    }

    if (error?.status === 429) {
      return res.status(429).json({
        success: false,
        error: {
          message: 'Rate limit exceeded. Please try again later.',
          status: 429
        },
        timestamp: new Date().toISOString()
      });
    }

    // Generic error
    res.status(500).json({
      success: false,
      error: {
        message: error?.message || 'An error occurred while generating the proposal',
        status: 500
      },
      timestamp: new Date().toISOString()
    });
  }
}