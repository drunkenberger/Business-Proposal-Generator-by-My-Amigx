import express from 'express';
import { AnthropicService } from '../services/anthropic';
import { PricingService } from '../services/pricing';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { validateProposalRequest, handleValidationErrors } from '../middleware/validation';
import { ProposalRequest, ProposalResponse, RegionalProposal } from '../types/proposal';

const router = express.Router();

/**
 * GET /api/proposals/regions
 * Get available pricing regions
 */
router.get('/regions', asyncHandler(async (req, res) => {
  const regions = PricingService.getAllRegions();

  res.json({
    success: true,
    data: {
      regions,
      count: regions.length
    },
    timestamp: new Date().toISOString()
  });
}));

/**
 * POST /api/proposals/generate
 * Generate a business proposal
 */
router.post('/generate',
  validateProposalRequest,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const proposalRequest: ProposalRequest = req.body;

    // Check for API key (either in request or environment)
    const apiKey = proposalRequest.anthropicApiKey || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw createError(400, 'Anthropic API key is required. Provide it in the request body or set ANTHROPIC_API_KEY environment variable.');
    }

    // Initialize Anthropic service
    const anthropicService = new AnthropicService(apiKey);

    try {
      // Generate AI content
      const aiContent = await anthropicService.generateProposal(proposalRequest);

      // Process pricing for all regions
      const safeCostItems = proposalRequest.costItems ?? [];
      const regionalProposals: RegionalProposal[] = PricingService.getAllRegions().map(region => {
        const regionalCostItems = PricingService.calculateRegionalPricing(
          safeCostItems,
          region
        );
        const totalCost = PricingService.calculateTotalCost(regionalCostItems);

        return {
          region,
          costItems: regionalCostItems,
          totalCost,
          executiveSummary: aiContent.executiveSummary,
          scopeOfWork: aiContent.scopeOfWork,
          terms: aiContent.terms
        };
      });

      // Use scopeOfWork from AI content directly
      const response: ProposalResponse = {
        success: true,
        data: {
          clientDetails: {
            name: proposalRequest.clientName,
            company: proposalRequest.company,
            email: proposalRequest.clientEmail
          },
          serviceDetails: {
            description: aiContent.executiveSummary,
            scopeOfWork: aiContent.scopeOfWork
          },
          timeline: proposalRequest.timelineItems,
          regionalProposals,
          customTerms: proposalRequest.customTerms,
          generatedAt: new Date().toISOString()
        }
      };

      res.json(response);

    } catch (error) {
      console.error('Proposal generation error:', error);
      throw createError(
        500,
        error instanceof Error
          ? `Proposal generation failed: ${error.message}`
          : 'Unknown error occurred during proposal generation'
      );
    }
  })
);

/**
 * GET /api/proposals/health
 * Health check for the proposals service
 */
router.get('/health', asyncHandler(async (req, res) => {
  // Basic health check - in production you might want to test API connectivity
  const hasApiKey = !!(process.env.ANTHROPIC_API_KEY);

  res.json({
    success: true,
    data: {
      status: 'healthy',
      services: {
        anthropic: hasApiKey ? 'configured' : 'not configured',
        pricing: 'operational'
      },
      availableRegions: PricingService.getAllRegions().length,
      timestamp: new Date().toISOString()
    }
  });
}));

export default router;