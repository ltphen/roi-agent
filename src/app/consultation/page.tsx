'use client';

import { useChat } from '@ai-sdk/react';
import { Send, Bot, User, AlertCircle, CheckCircle2, Zap, TrendingUp, Clock, Share2, Twitter, Linkedin, Copy } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ReportData {
  companyName: string;
  executiveSummary: string;
  opportunities: {
    area: string;
    solution: string;
    impact: string;
    effort: string;
    roiEstimate: string;
  }[];
  recommendedTools: { name: string; description: string }[];
  viralQuote: string;
}

export default function Chat() {
  const [businessContext, setBusinessContext] = useState('');
  const [reportGenerating, setReportGenerating] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [copied, setCopied] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, append, error } = useChat({
    body: { businessContext }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Check if the AI just signaled it is ready for the report
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'assistant' && lastMessage.content.includes('[READY_FOR_REPORT]') && !reportGenerating && !reportData) {
      generateFinalReport();
    }
  }, [messages]);

  const generateFinalReport = async () => {
    setReportGenerating(true);
    try {
      const res = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });
      if (!res.ok) throw new Error('Failed to generate report');
      const data = await res.json();
      setReportData(data);
      triggerConfetti();
    } catch (err) {
      console.error(err);
      alert("There was an error generating your final roadmap. Please try again.");
    } finally {
      setReportGenerating(false);
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#2563eb', '#06b6d4', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#2563eb', '#06b6d4', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleShare = async () => {
    const shareText = `Just got my custom AI Adoption Roadmap for my business.\\n\\n"${reportData?.viralQuote}"\\n\\nBuilt by ROI Agent.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My AI Adoption Roadmap',
          text: shareText,
          url: window.location.origin,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareText}\\n${window.location.origin}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const submitInitialContext = (e: React.FormEvent) => {
    e.preventDefault();
    append({
      role: 'user',
      content: businessContext
    });
  };

  // Filter out the internal system trigger from UI
  const displayMessages = messages.filter(m => !m.content.includes('[READY_FOR_REPORT]'));

  if (reportData) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-100">
        <div className="max-w-4xl mx-auto">
          {/* Stunning Report Header */}
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400 opacity-10 rounded-full blur-2xl -ml-10 -mb-10"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
                <SparklesIcon className="w-4 h-4 text-cyan-300" />
                <span>AI Adoption Roadmap Generated</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                {reportData.companyName}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl">
                {reportData.executiveSummary}
              </p>
            </div>
          </div>

          {/* Viral Share Banner */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-blue-500">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Your AI Thesis</p>
              <p className="text-xl font-bold italic text-gray-800">"{reportData.viralQuote}"</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <button 
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
              >
                {copied ? <CheckCircle2 className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                {copied ? 'Copied!' : 'Share Roadmap'}
              </button>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just got my custom AI Adoption Roadmap.\\n\\n"${reportData.viralQuote}"\\n\\nBuilt by @roia_agent`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white px-4 py-3 rounded-xl font-medium transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`Just got my custom AI Adoption Roadmap.\\n\\n"${reportData.viralQuote}"\\n\\nI'm looking at implementing some massive operational efficiencies this quarter.`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#095196] text-white px-4 py-3 rounded-xl font-medium transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2 space-y-8">
              {/* Opportunities */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" /> 
                  High-Impact Opportunities
                </h2>
                <div className="space-y-4">
                  {reportData.opportunities.map((opp, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{opp.area}</h3>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wide">
                          <Zap className="w-3 h-3" /> {opp.roiEstimate}
                        </span>
                      </div>
                      <p className="text-gray-900 font-medium mb-4">{opp.solution}</p>
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          Impact: <strong className="text-gray-700">{opp.impact}</strong>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          Effort: <strong className="text-gray-700">{opp.effort}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Tools Stack */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-indigo-600" /> 
                  Recommended Stack
                </h2>
                <div className="space-y-6">
                  {reportData.recommendedTools.map((tool, i) => (
                    <div key={i} className="group">
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{tool.name}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed mt-1">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Bot className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold tracking-tight">AI Strategy Consultant</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full max-w-4xl mx-auto flex flex-col gap-6 relative">
        {messages.length === 0 && (
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mt-8">
            <h2 className="text-3xl font-bold mb-3">Welcome.</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">Describe your business, and I will map out exactly how AI can save you time, increase revenue, or reduce operational costs.</p>
            <textarea
              className="w-full p-5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-40 text-base shadow-inner transition-all"
              placeholder="e.g. I run a local dental clinic with 4 dentists and 2 receptionists. We struggle with appointment scheduling and following up on unpaid invoices..."
              value={businessContext}
              onChange={(e) => setBusinessContext(e.target.value)}
            />
            <button
              onClick={submitInitialContext}
              disabled={!businessContext.trim() || isLoading}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none w-full md:w-auto flex items-center justify-center gap-2"
            >
              {isLoading ? "Analyzing..." : "Start Consultation"} <Send className="w-5 h-5" />
            </button>
          </div>
        )}

        {displayMessages.map(m => (
          <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role !== 'user' && (
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-3xl px-6 py-4 shadow-sm text-base leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 rounded-bl-sm'}`}>
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
            {m.role === 'user' && (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200 shadow-sm">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && displayMessages.length > 0 && !error && (
          <div className="flex gap-4 justify-start">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 shadow-sm animate-pulse">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl rounded-bl-sm px-6 py-4 shadow-sm flex items-center gap-2 w-24">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex gap-4 justify-center my-4">
            <div className="bg-red-50 text-red-600 border border-red-200 rounded-3xl px-6 py-5 shadow-sm flex items-start gap-3 max-w-2xl">
              <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-1">Connection Error</h3>
                <p className="text-sm whitespace-pre-wrap">{error.message || "Failed to connect to the AI provider. Check your API keys and server logs."}</p>
              </div>
            </div>
          </div>
        )}

        {/* Full screen loading overlay for report generation */}
        {reportGenerating && (
          <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Architecting your Roadmap...</h3>
            <p className="text-gray-500">Synthesizing insights into a custom strategy.</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {displayMessages.length > 0 && !reportGenerating && (
        <footer className="bg-white border-t border-gray-200 p-4 sticky bottom-0 z-10">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3 relative">
            <input
              className="flex-1 py-4 pl-6 pr-16 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner text-base transition-all"
              value={input}
              placeholder="Type your response..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </form>
        </footer>
      )}
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
