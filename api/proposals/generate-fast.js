import Anthropic from '@anthropic-ai/sdk';

// Pricing regions
const PRICING_REGIONS = [
  { id: 'mexico', name: 'Mexico', hourlyRate: 25, currency: 'USD', symbol: '$' },
  { id: 'us', name: 'United States', hourlyRate: 75, currency: 'USD', symbol: '$' },
  { id: 'europe', name: 'Europe', hourlyRate: 65, currency: 'USD', symbol: '$' }
];

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Basic validation
    if (!req.body?.clientName) return res.status(400).json({ error: 'Client name required' });
    if (!req.body?.clientEmail) return res.status(400).json({ error: 'Client email required' });
    if (!req.body?.projectTitle) return res.status(400).json({ error: 'Project title required' });
    if (!req.body?.serviceDescription) return res.status(400).json({ error: 'Service description required' });
    
    const apiKey = req.body.anthropicApiKey || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ error: 'API key required' });
    }

    // Initialize Anthropic with faster model
    const anthropic = new Anthropic({ apiKey });

    // Simpler, faster prompt for quick generation
    const prompt = `Create a brief business proposal summary for:
Client: ${req.body.clientName}
Project: ${req.body.projectTitle}
Services: ${req.body.serviceDescription}

Provide ONLY:
1. A 2-3 sentence executive summary
2. Three main deliverables
3. One key benefit

Keep it very brief and professional. Response in ${req.body.language || 'English'}.`;

    // Use faster model with lower token count
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307", // Faster model
      max_tokens: 500, // Much smaller response
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const aiContent = response.content[0].type === 'text' ? response.content[0].text : '';

    // Calculate pricing for regions
    const costItems = req.body.costItems || [{ description: 'Service', hours: 10 }];
    const regionalProposals = PRICING_REGIONS.map(region => {
      const items = costItems.map(item => ({
        ...item,
        hourlyRate: region.hourlyRate,
        totalCost: item.hours * region.hourlyRate
      }));
      const totalCost = items.reduce((sum, item) => sum + item.totalCost, 0);
      
      return {
        region,
        costItems: items,
        totalCost,
        summary: aiContent
      };
    });

    // Return simplified response
    return res.status(200).json({
      success: true,
      data: {
        clientDetails: {
          name: req.body.clientName,
          email: req.body.clientEmail,
          company: req.body.projectTitle
        },
        summary: aiContent,
        regionalProposals,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Generation failed',
      message: error.message
    });
  }
}