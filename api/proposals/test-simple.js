export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test basic validation
    if (!req.body?.clientName) {
      return res.status(400).json({ 
        error: 'Missing clientName',
        body: req.body 
      });
    }

    // Test API key presence
    const apiKey = req.body.anthropicApiKey || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ 
        error: 'No API key found',
        hasEnvKey: !!process.env.ANTHROPIC_API_KEY,
        hasBodyKey: !!req.body.anthropicApiKey
      });
    }

    // Test Anthropic SDK import
    try {
      const Anthropic = require('@anthropic-ai/sdk');
      const anthropic = new Anthropic({ apiKey });
      
      return res.status(200).json({
        success: true,
        message: 'All basic checks passed',
        hasApiKey: true,
        anthropicSdkLoaded: true
      });
    } catch (importError) {
      return res.status(500).json({
        error: 'Failed to load Anthropic SDK',
        details: importError.message
      });
    }

  } catch (error) {
    return res.status(500).json({
      error: 'General error',
      message: error.message,
      stack: error.stack
    });
  }
}