import { db } from '@/db';
import { messages } from '@/db/schema';
import { randomUUID } from 'crypto';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const { role, content } = await req.json();

    await db.insert(messages).values({
      id: randomUUID(),
      sessionId,
      role,
      content,
      createdAt: new Date(),
    });

    return Response.json({ ok: true });
  } catch (error: any) {
    console.error('Messages POST error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
