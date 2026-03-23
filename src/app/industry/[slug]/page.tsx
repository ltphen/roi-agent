import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Sparkles, Bot } from 'lucide-react';
import industries from '@/data/industries.json';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return industries.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((ind) => ind.slug === slug);
  if (!industry) return {};
  return {
    title: industry.title,
    description: industry.heroText,
    openGraph: {
      title: industry.title,
      description: industry.heroText,
    }
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industries.find((ind) => ind.slug === slug);
  
  if (!industry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl tracking-tight">ROI Agent</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/#value" className="hover:text-gray-900 transition-colors">Value</Link>
            <Link href="/#how-it-works" className="hover:text-gray-900 transition-colors">How it works</Link>
          </div>
          <Link 
            href="/consultation"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md"
          >
            Start free consultation
          </Link>
        </div>
      </nav>

      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8">
            <Bot className="w-4 h-4" />
            <span>Industry-Specific AI Strategy</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            {industry.h1}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {industry.heroText}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/consultation"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start your consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-500 mt-4 sm:mt-0 sm:ml-4">No credit card required. 100% free MVP.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
