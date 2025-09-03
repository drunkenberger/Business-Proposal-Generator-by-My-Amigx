import Anthropic from "@anthropic-ai/sdk";
import { ProposalRequest } from "../types/proposal.js";

export class AnthropicService {
  private anthropic: Anthropic;

  constructor(apiKey?: string) {
    const key = apiKey || process.env.ANTHROPIC_API_KEY;
    if (!key) {
      throw new Error('Anthropic API key is required');
    }
    
    this.anthropic = new Anthropic({
      apiKey: key,
    });
  }

  async generateProposal(formData: ProposalRequest) {
    const prompt = `You are an expert business consultant and proposal writer with 15+ years of experience. Your task is to create a comprehensive, professional business proposal that significantly enriches and expands upon the basic information provided by the user.

IMPORTANT: Generate the entire response in ${formData.language || "English"}. All section titles and content must be in ${formData.language || "English"}. Do not translate proper nouns or numbers.

BASE INFORMATION PROVIDED:
- Client: ${formData.clientName}
- Project: ${formData.projectTitle}
- Services: ${formData.serviceDescription}
- Deliverables: ${formData.deliverables}
- Cost Items: ${formData.costItems?.map((item) => `${item.description}: ${item.hours} hours (rate determined by region)`).join("\n")}
- Timeline: ${formData.timelineItems?.map((item) => `${item.milestone}: ${item.duration} ${item.durationUnit} starting ${item.startDate}`).join("\n")}

YOUR MISSION: Transform this basic information into a compelling, detailed business proposal by:

1. ENRICHING CONTENT: Expand each section with professional insights, industry best practices, and value propositions
2. ADDING STRATEGIC VALUE: Include risk mitigation, success metrics, competitive advantages, and business impact
3. PROFESSIONAL LANGUAGE: Use sophisticated business terminology while maintaining clarity
4. COMPREHENSIVE DETAILS: Add methodology explanations, quality assurance processes, and technical specifications
5. CLIENT FOCUS: Emphasize benefits, ROI, and how this project addresses client's business objectives

Create a proposal that positions WAZA Lab as a premium, expert solution provider. Make the client feel confident they're making the right choice.

Please provide your response in this exact format, with these exact section headers (translated to ${formData.language || "English"}):

EXECUTIVE SUMMARY:
[Write a comprehensive 4-5 paragraph executive summary that includes:
- Current market context and business opportunity analysis
- Client's specific pain points and strategic objectives
- WAZA Lab's unique value proposition and competitive differentiators
- Our proven methodology and technical expertise
- Quantifiable benefits and business impact
- Risk mitigation and success guarantee framework
- Timeline efficiency and resource optimization
Make it compelling, data-driven, and demonstrate deep industry knowledge.]

SCOPE OF WORK:
[Transform the basic deliverables into an exhaustive, professional scope with:
- Detailed phase-by-phase breakdown with specific deliverables
- Technical architecture and implementation methodology
- Quality assurance protocols and testing frameworks
- Documentation standards and knowledge transfer processes
- Performance benchmarks and success metrics
- Risk assessment and mitigation strategies
- Communication workflows and reporting cadence
- Post-delivery support and maintenance protocols
- Compliance and security considerations
Format as comprehensive bullet points with measurable outcomes and specific methodologies.]

TERMS AND CONDITIONS:
[Generate comprehensive, professional terms that include:
- Payment schedules and milestone-based billing
- Intellectual property rights and ownership
- Project scope change management procedures
- Quality guarantees and performance warranties
- Confidentiality and data protection clauses
- Dispute resolution and escalation processes
- Project termination and deliverable handover protocols
- Liability limitations and indemnification terms
- Force majeure and unforeseen circumstances provisions
Make these terms professional, balanced, and protective for both parties.]

ADDITIONAL GUIDELINES:
- Use industry-specific terminology appropriately
- Include relevant best practices and standards
- Emphasize WAZA Lab's expertise and experience
- Highlight unique value propositions
- Address potential client concerns proactively
- Make the proposal feel premium and comprehensive
- Ensure all content is in ${formData.language || "English"}
- Maintain professional, consultative tone throughout

Transform this basic project information into a compelling business case that makes the client excited to work with WAZA Lab.`;

    try {
      const response = await this.anthropic.messages.create({
        model: "claude-3-5-sonnet-20250114",
        max_tokens: 8000,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      });

      const text = response.content[0].type === 'text' ? response.content[0].text : '';

      // Parse sections using regex
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
    } catch (error) {
      console.error("Anthropic API Error:", error);
      throw new Error(`AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}