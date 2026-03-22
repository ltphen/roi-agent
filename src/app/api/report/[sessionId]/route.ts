import { db } from '@/db';
import { reports } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    const report = await db
      .select()
      .from(reports)
      .where(eq(reports.sessionId, sessionId))
      .orderBy(desc(reports.createdAt))
      .limit(1);

    if (!report.length) {
      return new Response(JSON.stringify({ error: 'Report not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return Response.json({
      ...report[0],
      report: JSON.parse(report[0].reportJson),
    });
  } catch (error: any) {
    console.error('Report GET error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
