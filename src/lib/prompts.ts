import type { InferSelectModel } from 'drizzle-orm';
import type { sessions } from '@/db/schema';

type Session = InferSelectModel<typeof sessions>;

const INDUSTRY_TOOLS: Record<string, string[]> = {
  Healthcare: ['Suki (clinical documentation)', 'Nabla (ambient AI notes)', 'Ambience Healthcare', 'Nuance DAX', 'Innovaccer (analytics)'],
  Legal: ['Harvey (legal research)', 'CoCounsel by Thomson Reuters', 'Ironclad (contract management)', 'Casetext', 'Spellbook'],
  'Real Estate': ['Ylopo (AI lead gen)', 'Follow Up Boss', 'Roof AI (chatbot)', 'Structurely (lead qualification)', 'Lofty CRM'],
  'E-commerce': ['Jasper (product copy)', 'Tidio (AI chat)', 'Gorgias (support automation)', 'Nosto (personalization)', 'Klaviyo AI'],
  Hospitality: ['Cloudbeds (PMS with AI)', 'Revinate (guest messaging)', 'Lodgify', 'Hapi Hotel Tools', 'Canary Technologies'],
  Manufacturing: ['Sight Machine (process AI)', 'Augury (predictive maintenance)', 'Tulip (operations platform)', 'Sight Machine', 'Uptake'],
  'Professional Services': ['Notion AI', 'Otter.ai (meeting notes)', 'HubSpot AI', 'Salesforce Einstein', 'ChatGPT for proposals'],
  Retail: ['Lily AI (product discovery)', 'Bloomreach', 'Salesfloor', 'Mercaux', 'Lightspeed AI'],
  Education: ['Khanmigo (AI tutor)', 'Gradescope (AI grading)', 'Turnitin (originality)', 'Synthesis AI', 'Carnegie Learning'],
  'Marketing & Advertising': ['Jasper', 'Copy.ai', 'Perplexity', 'Midjourney', 'AdCreative.ai', 'Persado'],
  Construction: ['Buildots (progress monitoring)', 'Alice Technologies (planning)', 'Procore AI', 'OpenSpace', 'Versatile'],
  Other: ['ChatGPT', 'Zapier AI', 'Make (automation)', 'Notion AI', 'Microsoft Copilot'],
};

export function buildConsultationSystemPrompt(session: Session | null): string {
  if (!session) {
    return `You are a senior AI Strategy Consultant. Your goal is to understand the user's business and identify high-impact areas where AI can save time, increase revenue, or reduce costs.

RULES:
1. Be concise, professional, and highly practical. No fluff.
2. Ask a MAXIMUM of 2 clarifying questions to understand their bottlenecks.
3. When you have enough context, say exactly "[READY_FOR_REPORT]" on a new line and stop asking questions.
4. Speak to them as a business owner, not a technologist. No jargon.`;
  }

  const industryTools = INDUSTRY_TOOLS[session.industry ?? 'Other'] ?? INDUSTRY_TOOLS['Other'];
  const challenges = session.topChallenges ? JSON.parse(session.topChallenges) : [];
  const challengeList = challenges.length > 0 ? challenges.join(', ') : 'not specified';

  return `You are a senior AI Strategy Consultant specializing in the ${session.industry ?? 'business'} sector.

CLIENT PROFILE:
- Business: ${session.businessName ?? 'Not specified'}
- Industry: ${session.industry ?? 'Not specified'}
- Team size: ${session.companySize ?? 'Not specified'}
- Annual revenue: ${session.annualRevenue ?? 'Not specified'}
- Primary goal: ${session.primaryGoal ?? 'Not specified'}
- Key challenges: ${challengeList}
- Current tools: ${session.techStack ?? 'Not specified'}
- Biggest manual task: ${session.biggestTask ?? 'Not specified'}
- AI experience: ${session.aiExperience === 'yes' ? `Yes — ${session.aiTools ?? 'some tools'}` : 'No prior AI tools'}

INDUSTRY-RELEVANT AI TOOLS TO REFERENCE: ${industryTools.join(', ')}

YOUR MISSION:
Conduct a focused, high-value consultation. Dig into specifics — probe for numbers, frequencies, and pain points.
Ask at most 2 follow-up questions. When you have enough context to generate a detailed, specific report, say exactly "[READY_FOR_REPORT]" on a new line.

RULES:
1. Always tie recommendations to their specific ${session.industry} context — no generic advice.
2. Reference real tools from the list above where relevant.
3. Be quantitative: ask about hours/week spent on tasks, staff costs, volume of transactions, etc.
4. Speak like a consultant to a business owner — no tech jargon.
5. Maximum 3 paragraphs per response.
6. When you have enough detail to produce a specific, actionable report, output "[READY_FOR_REPORT]" on its own line.`;
}

export function buildReportGenerationPrompt(session: Session, conversationText: string): string {
  const challenges = session.topChallenges ? JSON.parse(session.topChallenges) : [];
  const industryTools = INDUSTRY_TOOLS[session.industry ?? 'Other'] ?? INDUSTRY_TOOLS['Other'];

  return `You are a senior AI Strategy Consultant producing a formal AI Adoption Report for a client.

CLIENT PROFILE:
- Business: ${session.businessName ?? 'Not provided'}
- Industry: ${session.industry ?? 'Not provided'}
- Team size: ${session.companySize ?? 'Not provided'}
- Annual revenue: ${session.annualRevenue ?? 'Not provided'}
- Primary goal: ${session.primaryGoal ?? 'Not provided'}
- Key challenges: ${challenges.join(', ') || 'Not provided'}
- Current tools/software: ${session.techStack ?? 'Not provided'}
- Biggest manual task: ${session.biggestTask ?? 'Not provided'}
- Prior AI experience: ${session.aiExperience === 'yes' ? `Yes — ${session.aiTools}` : 'None'}

CONSULTATION TRANSCRIPT:
${conversationText}

INDUSTRY AI TOOLS AVAILABLE: ${industryTools.join(', ')}

INSTRUCTIONS:
Generate a comprehensive, structured AI strategy report. Requirements:
- Use REAL tool names and vendors (no hypothetical tools)
- Provide REALISTIC ROI estimates based on ${session.industry} industry benchmarks
- Give SPECIFIC implementation steps tailored to a ${session.companySize ?? 'small'} team
- Include HONEST risks: change management, data privacy, upfront cost, staff adoption
- Design a phased roadmap appropriate for their size and resources
- Reference the consultation transcript to make recommendations specific to their stated problems
- Every opportunity should directly address something from their challenges or conversation

Be thorough, specific, and professional. This is a deliverable a business owner will use to make investment decisions.`;
}
