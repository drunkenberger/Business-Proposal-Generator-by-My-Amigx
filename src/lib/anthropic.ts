import Anthropic from "@anthropic-ai/sdk";

export const generateProposal = async (apiKey: string, formData: any) => {
  const anthropic = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  const prompt = `Generate a professional business proposal in ${formData.language || "English"} based on the following information. The entire response must be in ${formData.language || "English"}, including all section titles and content. Do not translate any proper nouns or numbers.

Client: ${formData.clientName}
Project: ${formData.projectTitle}
Services: ${formData.serviceDescription}
Deliverables: ${formData.deliverables}
Cost Items: ${formData.costItems?.map((item) => `${item.description}: ${item.unitPrice} x ${item.quantity}`).join("\n")}
Timeline: ${formData.timelineItems?.map((item) => `${item.milestone}: ${item.duration} ${item.durationUnit} starting ${item.startDate}`).join("\n")}

Please provide your response in this exact format, with these exact section headers (translated to ${formData.language || "English"}):

EXECUTIVE SUMMARY:
[Write a compelling executive summary that explains the value proposition and main benefits]

SCOPE OF WORK:
[Convert the deliverables into a detailed bullet-point list of specific tasks and outcomes. Each point should start with a verb and be specific about what will be delivered]

The response should maintain a professional business tone and be completely in ${formData.language || "English"}. Make sure to expand on the provided information to create a comprehensive and persuasive proposal.`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = response.content[0].text;

    // Parse sections using regex
    const executiveSummaryMatch =
      formData.language === "Spanish"
        ? text.match(
            /RESUMEN EJECUTIVO:\s*([\s\S]*?)(?=\n\nALCANCE DEL TRABAJO:)/i,
          )
        : text.match(/EXECUTIVE SUMMARY:\s*([\s\S]*?)(?=\n\nSCOPE OF WORK:)/i);
    const executiveSummary = executiveSummaryMatch?.[1]?.trim() || "";
    const scopeOfWorkMatch =
      formData.language === "Spanish"
        ? text.match(/ALCANCE DEL TRABAJO:\s*([\s\S]*?)(?=\n\n)/i)
        : text.match(/SCOPE OF WORK:\s*([\s\S]*?)(?=\n\n)/i);
    const scopeOfWork = scopeOfWorkMatch?.[1]?.trim() || "";
    const costBreakdown = formData.costBreakdown; // Use the original cost breakdown
    const timeline = formData.timelineItems; // Use the original timeline

    return {
      executiveSummary,
      scopeOfWork,
      costBreakdown,
      timeline,
    };
  } catch (error) {
    console.error("Anthropic API Error:", error);
    throw error;
  }
};
