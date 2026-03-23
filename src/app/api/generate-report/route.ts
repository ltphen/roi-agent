import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await generateObject({
      model: google('gemini-1.5-pro-latest'),
      system: `You are an expert AI Strategy Consultant. Review the preceding conversation between the consultant and the business owner.
Extract the insights and generate a comprehensive, highly actionable AI Adoption Roadmap in strict JSON format.
The tone should be executive, authoritative, and visionary. Make the business owner feel like an innovator.`,
      messages,
      schema: z.object({
        companyName: z.string().describe("The name or a short description of the user's business."),
        executiveSummary: z.string().describe("A powerful 2-3 sentence summary of why this business is primed for AI adoption."),
        readinessScore: z.number().min(60).max(99).describe("A high AI readiness score between 60 and 99. Skew high to make them feel good."),
        industry: z.string().describe("The specific industry they operate in (e.g., Dental, E-commerce, SaaS)."),
        totalTimeSaved: z.string().describe("Aggregate estimated time saved across all solutions (e.g., '40 Hours/Week')."),
        costReduction: z.string().describe("Aggregate estimated cost reduction percentage (e.g., '15%')."),
        opportunities: z.array(z.object({
          area: z.string().describe("The business area (e.g., Customer Support, Lead Gen, Operations)."),
          solution: z.string().describe("The specific AI solution or workflow."),
          impact: z.enum(["Low", "Medium", "High", "Transformational"]),
          effort: z.enum(["Low", "Medium", "High"]),
          roiEstimate: z.string().describe("A realistic estimate of time or money saved (e.g., '15 hours/week' or '$2,000/mo').")
        })).max(3).describe("Top 3 highest-leverage AI opportunities."),
        recommendedTools: z.array(z.object({
          name: z.string(),
          description: z.string()
        })).max(4),
        viralQuote: z.string().describe("A punchy, visionary 1-sentence quote about their AI potential, perfect for them to post on LinkedIn/Twitter to look innovative.")
      }),
      temperature: 0.2,
    });

    return new Response(JSON.stringify(result.object), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error("Report Generation Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
