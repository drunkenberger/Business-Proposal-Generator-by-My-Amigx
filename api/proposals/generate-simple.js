export default async function handler(req, res) {
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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Starting proposal generation...');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    // Validate required fields
    if (!req.body?.clientName || req.body.clientName.length < 2) {
      return res.status(400).json({ error: 'Client name is required (min 2 characters)' });
    }
    if (!req.body?.clientEmail || !req.body.clientEmail.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }
    if (!req.body?.projectTitle || req.body.projectTitle.length < 5) {
      return res.status(400).json({ error: 'Project title is required (min 5 characters)' });
    }
    if (!req.body?.serviceDescription || req.body.serviceDescription.length < 20) {
      return res.status(400).json({ error: 'Service description is required (min 20 characters)' });
    }
    
    console.log('Basic validation passed');

    // Check API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ 
        error: 'Anthropic API key not found in environment variables',
        hasEnvKey: !!process.env.ANTHROPIC_API_KEY
      });
    }
    
    console.log('API key found in environment');

    // Try to load Anthropic SDK
    let Anthropic;
    try {
      Anthropic = require('@anthropic-ai/sdk');
      console.log('Anthropic SDK loaded successfully');
    } catch (importError) {
      console.error('Failed to import Anthropic SDK:', importError);
      return res.status(500).json({
        error: 'Failed to load Anthropic SDK',
        details: importError.message
      });
    }

    // Initialize Anthropic client
    let anthropic;
    try {
      anthropic = new Anthropic({ apiKey });
      console.log('Anthropic client initialized');
    } catch (initError) {
      console.error('Failed to initialize Anthropic client:', initError);
      return res.status(500).json({
        error: 'Failed to initialize Anthropic client',
        details: initError.message
      });
    }

    // Simple AI call for testing
    console.log('Making AI call...');
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      messages: [{
        role: "user", 
        content: `Create a brief executive summary for ${req.body.clientName}'s ${req.body.projectTitle} project.`
      }],
      temperature: 0.7,
    });

    const aiContent = response.content[0].type === 'text' ? response.content[0].text : 'AI response not available';
    console.log('AI call successful');

    // Return simple response
    return res.status(200).json({
      success: true,
      data: {
        clientDetails: {
          name: req.body.clientName,
          email: req.body.clientEmail,
          company: req.body.projectTitle
        },
        aiGeneratedSummary: aiContent,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Detailed error:', error);
    return res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Unknown error',
        status: 500,
        details: error.toString(),
        stack: error.stack
      },
      timestamp: new Date().toISOString()
    });
  }
}