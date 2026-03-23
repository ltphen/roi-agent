import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'ROI Agent | Free AI Business Consultation',
  description: 'Describe your business and let our AI strategy consultant map out how artificial intelligence can save you time, increase revenue, and reduce operational costs. Get a custom ROI roadmap.',
  keywords: ['AI consultant', 'business automation', 'AI roadmap', 'reduce costs', 'scale revenue', 'AI strategy'],
  openGraph: {
    title: 'ROI Agent | Free AI Business Consultation',
    description: 'Get a free, custom AI adoption roadmap for your business.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
      <GoogleTagManager gtmId="GTM-P8X9M4Q" />
    </html>
  );
}
