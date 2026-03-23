import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const company = searchParams.get('company') || 'Your Business';
    const score = searchParams.get('score') || '85';
    const timeSaved = searchParams.get('time') || '40h/wk';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <div style={{ color: '#06b6d4', fontSize: '32px', fontWeight: 'bold' }}>✦</div>
            <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', letterSpacing: '-0.02em' }}>
              ROI Agent
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '60px' }}>
            <div style={{ color: '#94a3b8', fontSize: '36px', marginBottom: '16px' }}>
              AI Adoption Roadmap
            </div>
            <div style={{ color: 'white', fontSize: '72px', fontWeight: '900', lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: '900px' }}>
              {company}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.1)', padding: '32px 48px', borderRadius: '24px' }}>
              <div style={{ color: '#94a3b8', fontSize: '24px', marginBottom: '8px' }}>AI Readiness</div>
              <div style={{ color: '#38bdf8', fontSize: '56px', fontWeight: 'bold' }}>Top {100 - parseInt(score)}%</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.1)', padding: '32px 48px', borderRadius: '24px' }}>
              <div style={{ color: '#94a3b8', fontSize: '24px', marginBottom: '8px' }}>Projected Savings</div>
              <div style={{ color: '#4ade80', fontSize: '56px', fontWeight: 'bold' }}>{timeSaved}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
