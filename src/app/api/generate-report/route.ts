import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { db } from '@/db';
import { sessions, messages, reports } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { buildReportGenerationPrompt } from '@/lib/prompts';

export const maxDuration = 120;

const OpportunitySchema = z.object({
  title: z.string().describe('Short, specific title for this AI opportunity'),
  category: z.enum(['Revenue Growth', 'Cost Reduction', 'Time Savings', 'Customer Experience', 'Risk Mitigation']),
  description: z.string().describe('2-3 sentences describing the specific opportunity and how it solves their stated problem'),
  toolRecommendations: z.array(z.string()).describe('Specific real tool names (e.g., Harvey, Jasper, Zapier) — no generics'),
  estimatedTimeSavedPerWeek: z.string().describe('e.g. "8-12 hours/week across 3 staff"'),
  estimatedAnnualROI: z.string().describe('e.g. "$45,000–$60,000 in staff time" or "15–25% revenue uplift"'),
  implementationEffort: z.enum(['Low', 'Medium', 'High']),
  timeToValue: z.string().describe('e.g. "2–4 weeks", "3–6 months"'),
  priority: z.enum(['Quick Win', 'Strategic', 'Long-term']),
  implementationSteps: z.array(z.string()).describe('3–5 concrete first steps to implement this'),
});

const RoadmapPhaseSchema = z.object({
  label: z.string().describe('e.g. "Foundation & Quick Wins"'),
  duration: z.string().describe('e.g. "Months 1–2"'),
  focus: z.string().describe('One sentence describing the phase theme'),
  actions: z.array(z.string()).describe('4–6 specific actions to take in this phase'),
  expectedOutcome: z.string().describe('What success looks like at the end of this phase'),
});

const RiskSchema = z.object({
  risk: z.string().describe('Specific risk name'),
  description: z.string().describe('1–2 sentences explaining why this is a risk for their business specifically'),
  mitigation: z.string().describe('Concrete steps to mitigate this risk'),
  severity: z.enum(['Low', 'Medium', 'High']),
});

const ReportSchema = z.object({
  executiveSummary: z.string().describe('3–4 sentence summary of the most important findings and opportunities. Must be specific to their business, not generic.'),
  keyMetrics: z.object({
    totalOpportunitiesIdentified: z.number(),
    estimatedWeeklyHoursSaved: z.string().describe('e.g. "20–35 hours/week"'),
    estimatedAnnualROI: z.string().describe('e.g. "$80,000–$120,000"'),
    quickWinsAvailable: z.number().describe('Count of opportunities marked Quick Win'),
    paybackPeriod: z.string().describe('e.g. "3–6 months"'),
  }),
  aiOpportunities: z.array(OpportunitySchema).min(4).max(8).describe('4–8 specific, ranked AI opportunities for this business'),
  implementationRoadmap: z.object({
    phase1: RoadmapPhaseSchema,
    phase2: RoadmapPhaseSchema,
    phase3: RoadmapPhaseSchema,
  }),
  risks: z.array(RiskSchema).min(3).max(6),
  considerations: z.array(z.string()).describe('3–5 important factors the business owner should consider before starting — budget, team readiness, data quality, vendor lock-in, etc.'),
  nextSteps: z.array(z.string()).describe('5 concrete, prioritized actions to take in the next 30 days'),
  disclaimer: z.string().describe('Brief professional disclaimer about estimates being illustrative'),
});

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    const session = await db.query.sessions.findFirst({
      where: eq(sessions.id, sessionId),
    });

    if (!session) {
      return new Response(JSON.stringify({ error: 'Session not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const msgs = await db
      .select()
      .from(messages)
      .where(eq(messages.sessionId, sessionId))
      .orderBy(asc(messages.createdAt));

    const conversationText = msgs
      .map(m => `${m.role.toUpperCase()}: ${m.content}`)
      .join('\n\n');

    const systemPrompt = buildReportGenerationPrompt(session, conversationText);

    const { object: report } = await generateObject({
      model: google('gemini-3.1-pro-preview'),
      schema: ReportSchema,
      prompt: systemPrompt,
      temperature: 0.3,
    });

    const reportId = randomUUID();
    await db.insert(reports).values({
      id: reportId,
      sessionId,
      reportJson: JSON.stringify(report),
      createdAt: new Date(),
    });

    await db
      .update(sessions)
      .set({ status: 'report_generated' })
      .where(eq(sessions.id, sessionId));

    return Response.json({ reportId, report });
  } catch (error: any) {
    console.error('Generate report error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
