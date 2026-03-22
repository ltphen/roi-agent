import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { db } from '@/db';
import { sessions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { buildConsultationSystemPrompt } from '@/lib/prompts';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json();

    let systemPrompt: string;

    if (sessionId) {
      const session = await db.query.sessions.findFirst({
        where: eq(sessions.id, sessionId),
      });
      systemPrompt = session
        ? buildConsultationSystemPrompt(session)
        : buildConsultationSystemPrompt(null);
    } else {
      systemPrompt = buildConsultationSystemPrompt(null);
    }

    const result = await streamText({
      model: google('gemini-3.1-pro-preview'),
      system: systemPrompt,
      messages,
      temperature: 0.4,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('API Route Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
