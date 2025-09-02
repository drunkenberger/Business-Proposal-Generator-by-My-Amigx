// Remove import

const PRICING_REGIONS = [
  {
    id: 'mexico',
    name: 'Mexico',
    hourlyRate: 25,
    currency: 'USD',
    symbol: '$'
  },
  {
    id: 'us',
    name: 'United States',
    hourlyRate: 75,
    currency: 'USD',
    symbol: '$'
  },
  {
    id: 'europe',
    name: 'Europe',
    hourlyRate: 65,
    currency: 'USD',
    symbol: '$'
  }
];

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only GET requests are allowed'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      regions: PRICING_REGIONS,
      count: PRICING_REGIONS.length
    },
    timestamp: new Date().toISOString()
  });
}