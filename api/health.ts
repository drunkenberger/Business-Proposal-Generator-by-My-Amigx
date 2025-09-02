import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'WAZA Proposal Generator API',
    version: '1.0.0',
    environment: process.env.VERCEL_ENV || 'development'
  });
}