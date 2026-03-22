import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Clock, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl tracking-tight">ROI Agent</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#value" className="hover:text-gray-900 transition-colors">Value</Link>
            <Link href="#how-it-works" className="hover:text-gray-900 transition-colors">How it works</Link>
          </div>
          <Link 
            href="/consultation"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md"
          >
            Start free consultation
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Unlock the real <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              value of AI for your business.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Stop guessing about AI. Describe your business to our expert AI consultant and get a customized, actionable roadmap to reduce costs and scale revenue.
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

      {/* Value Proposition Grid (Google AI style clean cards) */}
      <section id="value" className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real results, mapped out.</h2>
            <p className="text-lg text-gray-600">We analyze your specific bottlenecks and provide solutions that impact your bottom line.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Maximize Revenue</h3>
              <p className="text-gray-600 leading-relaxed">Discover AI tools that automate lead generation, personalize marketing at scale, and increase your conversion rates.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Reclaim Your Time</h3>
              <p className="text-gray-600 leading-relaxed">Identify repetitive tasks in your operations that can be fully automated, freeing your team for high-value work.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Actionable Roadmap</h3>
              <p className="text-gray-600 leading-relaxed">No abstract concepts. Get specific tool recommendations, effort estimates, and expected ROI for your exact industry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">How it works</h2>
          
          <div className="relative">
            <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-gray-100 hidden md:block"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 relative">
              <div className="md:w-5/12 text-right pr-8 md:pr-0">
                <h3 className="text-2xl font-bold mb-2">1. Describe your business</h3>
                <p className="text-gray-600">Tell us what you do, how big your team is, and where your biggest headaches are.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center relative z-10 my-4 md:my-0 shadow-lg ring-4 ring-white">1</div>
              <div className="md:w-5/12 pl-8 md:pl-0 text-left hidden md:block"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 relative">
              <div className="md:w-5/12 pr-8 md:pr-0 text-right hidden md:block"></div>
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center relative z-10 my-4 md:my-0 shadow-lg ring-4 ring-white">2</div>
              <div className="md:w-5/12 text-left pl-8 md:pl-0">
                <h3 className="text-2xl font-bold mb-2">2. Chat with the Agent</h3>
                <p className="text-gray-600">Our AI will ask 1 or 2 targeted questions to deeply understand your unique operational bottlenecks.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between relative">
              <div className="md:w-5/12 text-right pr-8 md:pr-0">
                <h3 className="text-2xl font-bold mb-2">3. Get your ROI Roadmap</h3>
                <p className="text-gray-600">Receive a customized, structured report detailing exactly which AI tools to adopt and how much time they will save you.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center relative z-10 my-4 md:my-0 shadow-lg ring-4 ring-white">3</div>
              <div className="md:w-5/12 pl-8 md:pl-0 text-left hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gray-900 text-white text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to modernize your operations?</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join forward-thinking businesses leveraging AI to outpace the competition.</p>
        <Link 
          href="/consultation"
          className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 text-lg font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:bg-gray-50"
        >
          Get your AI Roadmap
        </Link>
      </section>
      
      <footer className="bg-gray-900 border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} ROI Agent. Built for speed and scale.</p>
      </footer>
    </div>
  );
}
