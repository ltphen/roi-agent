import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, businessContext } = await req.json();

    const systemPrompt = `You are a top-tier AI Strategy Consultant. 
Your goal is to understand the user's business and identify high-impact, low-effort areas where AI can save time, increase revenue, or reduce costs.

Current Business Context: ${businessContext || "Not provided yet."}

RULES:
1. Be concise, professional, and highly practical. No fluff.
2. Ask a MAXIMUM of 2 clarifying questions to understand their bottlenecks.
3. If you have enough information to generate a comprehensive AI adoption report, say exactly: "[READY_FOR_REPORT]" and stop asking questions.
4. Speak to them as a non-technical business owner. Do not use complex jargon.`;

    // Swapping to the widely available gemini-1.5-pro-latest to ensure no model resolution issues
    const result = await streamText({
      model: google('gemini-1.5-pro-latest'),
      system: systemPrompt,
      messages,
      temperature: 0.4,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
