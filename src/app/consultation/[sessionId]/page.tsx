'use client';

import { useChat } from '@ai-sdk/react';
import { Send, Bot, User, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';

type SessionData = {
  id: string;
  businessName: string | null;
  industry: string | null;
  companySize: string | null;
  primaryGoal: string | null;
  status: string | null;
};

export default function ConsultationPage() {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;
  const router = useRouter();

  const [session, setSession] = useState<SessionData | null>(null);
  const [reportReady, setReportReady] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const greetingSent = useRef(false);

  useEffect(() => {
    fetch(`/api/sessions/${sessionId}`)
      .then(r => r.json())
      .then(data => setSession(data.session))
      .catch(console.error);
  }, [sessionId]);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, append } =
    useChat({
      body: { sessionId },
      onFinish: async (message) => {
        // Persist assistant message
        await fetch(`/api/sessions/${sessionId}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: 'assistant', content: message.content }),
        }).catch(console.error);

        // Detect report readiness signal
        if (message.content.includes('[READY_FOR_REPORT]')) {
          setReportReady(true);
          await fetch(`/api/sessions/${sessionId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'report_ready' }),
          }).catch(console.error);
        }
      },
    });

  // Persist user messages when submitted
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const userContent = input;
    handleSubmit(e);
    if (userContent.trim()) {
      await fetch(`/api/sessions/${sessionId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'user', content: userContent }),
      }).catch(console.error);
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Kick off initial greeting once session loads (run once only)
  useEffect(() => {
    if (session && !greetingSent.current) {
      greetingSent.current = true;
      const greeting = `Hi! I have reviewed your business profile. You are running ${session.businessName ?? 'your business'} in the ${session.industry ?? ''} space with a primary goal to ${(session.primaryGoal ?? '').toLowerCase()}.\n\nLet me ask you one targeted question to make sure I give you the most relevant recommendations possible.`;
      append({ role: 'assistant', content: greeting });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const generateReport = async () => {
    setGeneratingReport(true);
    try {
      await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      router.push(`/report/${sessionId}`);
    } catch (e) {
      console.error(e);
      setGeneratingReport(false);
    }
  };

  const displayMessages = messages.filter(m => !m.content.includes('[READY_FOR_REPORT]'));

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-none">AI Strategy Consultant</h1>
              {session && (
                <p className="text-xs text-gray-500 mt-0.5">{session.businessName} · {session.industry}</p>
              )}
            </div>
          </div>
          {reportReady && !generatingReport && (
            <button
              onClick={generateReport}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              Generate my report
            </button>
          )}
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full max-w-4xl mx-auto flex flex-col gap-4">

        {/* Report ready banner */}
        {reportReady && (
          <div className="sticky top-2 z-10 mx-auto w-full max-w-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl px-6 py-4 shadow-lg flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">Your AI Strategy Report is ready</p>
                <p className="text-blue-100 text-xs mt-0.5">We have everything we need to build your roadmap</p>
              </div>
              <button
                onClick={generateReport}
                disabled={generatingReport}
                className="flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors shrink-0 ml-4"
              >
                {generatingReport ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Generate report</>
                )}
              </button>
            </div>
          </div>
        )}

        {displayMessages.map(m => (
          <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role !== 'user' && (
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[82%] rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-sm ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white border border-gray-100 rounded-bl-none text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
            {m.role === 'user' && (
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {isLoading && !error && (
          <div className="flex gap-3 justify-start">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm flex items-center gap-1.5">
              <span className="text-xs text-gray-400 mr-2">Analyzing your business…</span>
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center my-4">
            <div className="bg-red-50 text-red-600 border border-red-200 rounded-2xl px-5 py-4 flex items-start gap-3 max-w-2xl">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-1">Connection error</p>
                <p className="text-xs">{error.message || 'Failed to connect to AI. Check your API key and server logs.'}</p>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      {/* Input */}
      {!reportReady && (
        <footer className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
          <form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto flex gap-3 relative">
            <input
              className="flex-1 py-4 pl-5 pr-14 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
              value={input}
              placeholder="Reply to the consultant…"
              onChange={handleInputChange}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </footer>
      )}

      {generatingReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-4 max-w-sm mx-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Building your roadmap</h3>
            <p className="text-gray-500 text-sm text-center">
              Analysing your consultation and generating a personalised AI strategy report…
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
