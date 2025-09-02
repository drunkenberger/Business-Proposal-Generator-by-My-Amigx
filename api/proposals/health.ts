import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const hasApiKey = !!(process.env.ANTHROPIC_API_KEY);

  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      services: {
        anthropic: hasApiKey ? 'configured' : 'not configured (set ANTHROPIC_API_KEY in Vercel environment variables)',
        pricing: 'operational'
      },
      availableRegions: 3,
      timestamp: new Date().toISOString()
    }
  });
}