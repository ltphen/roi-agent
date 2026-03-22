import { db } from '@/db';
import { sessions } from '@/db/schema';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = randomUUID();

    await db.insert(sessions).values({
      id,
      businessName: body.businessName ?? null,
      industry: body.industry ?? null,
      companySize: body.companySize ?? null,
      annualRevenue: body.annualRevenue ?? null,
      primaryGoal: body.primaryGoal ?? null,
      topChallenges: body.topChallenges ? JSON.stringify(body.topChallenges) : null,
      techStack: body.techStack ?? null,
      aiExperience: body.aiExperience ?? null,
      aiTools: body.aiTools ?? null,
      biggestTask: body.biggestTask ?? null,
      status: 'chatting',
      createdAt: new Date(),
    });

    return Response.json({ sessionId: id });
  } catch (error: any) {
    console.error('Sessions POST error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
