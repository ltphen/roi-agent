'use client';

import { useChat } from '@ai-sdk/react';
import { Send, Bot, User } from 'lucide-react';
import { useState } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [businessContext, setBusinessContext] = useState('');

  const submitInitialContext = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e, { data: { businessContext } });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Bot className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold tracking-tight">AI Strategy Consultant</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full max-w-4xl mx-auto flex flex-col gap-6">
        {messages.length === 0 && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
            <h2 className="text-2xl font-semibold mb-2">Welcome.</h2>
            <p className="text-gray-600 mb-6">Describe your business, and I will help you map out exactly how AI can save you time, increase revenue, or reduce operational costs.</p>
            <textarea
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 text-base shadow-inner"
              placeholder="e.g. I run a local dental clinic with 4 dentists and 2 receptionists. We struggle with appointment scheduling and following up on unpaid invoices."
              value={businessContext}
              onChange={(e) => setBusinessContext(e.target.value)}
            />
            <button
              onClick={submitInitialContext}
              disabled={!businessContext.trim()}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
            >
              Start Consultation
            </button>
          </div>
        )}

        {messages.map(m => (
          <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role !== 'user' && (
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-sm text-base leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-100 rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
            {m.role === 'user' && (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 border border-gray-300">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200 animate-pulse">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm flex items-center gap-2 w-24">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            </div>
          </div>
        )}
      </main>

      {messages.length > 0 && (
        <footer className="bg-white border-t border-gray-200 p-4 sticky bottom-0 z-10">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3 relative">
            <input
              className="flex-1 py-4 pl-5 pr-14 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner text-base"
              value={input}
              placeholder="Type your response..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </form>
        </footer>
      )}
    </div>
  );
}
