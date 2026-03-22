import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Clock, DollarSign, Shield, ChevronDown, CheckCircle, Star } from 'lucide-react';

const INDUSTRY_EXAMPLES: Record<string, { win: string; tool: string; result: string }[]> = {
  Healthcare: [
    { win: 'Automate clinical note documentation', tool: 'Suki / Nabla', result: 'Save 2+ hours per clinician per day' },
    { win: 'AI-powered appointment scheduling & reminders', tool: 'AI phone & SMS bots', result: 'Reduce no-shows by up to 30%' },
    { win: 'Automate insurance pre-authorisation checks', tool: 'Waystar / Cohere Health', result: 'Cut admin cost by $60K+/year' },
  ],
  Legal: [
    { win: 'Contract review & redlining in minutes', tool: 'Harvey / CoCounsel', result: 'Review 10x faster than manual' },
    { win: 'Automated client intake & onboarding', tool: 'Clio + AI forms', result: 'Save 3–4 hrs per new matter' },
    { win: 'AI legal research on demand', tool: 'Casetext / Westlaw AI', result: 'Slash research time by 60%' },
  ],
  'E-commerce': [
    { win: 'AI product descriptions at scale', tool: 'Jasper / Copy.ai', result: 'Ship 10x more SKU content' },
    { win: 'Automate customer support tickets', tool: 'Gorgias / Tidio', result: 'Handle 70% of tickets without staff' },
    { win: 'Personalised product recommendations', tool: 'Nosto / Rebuy', result: '15–25% average order value increase' },
  ],
  'Real Estate': [
    { win: 'Qualify & respond to leads 24/7', tool: 'Structurely / Roof AI', result: '3x more leads converted' },
    { win: 'Auto-generate listing descriptions & social posts', tool: 'ChatGPT + Zapier', result: 'Cut listing prep from 2 hrs to 10 min' },
    { win: 'AI market analysis & pricing reports', tool: 'HouseCanary / Zillow AI', result: 'Price properties 25% more accurately' },
  ],
};

const FAQS = [
  {
    q: 'Is this really free?',
    a: 'Yes — completely free. No credit card, no signup, no hidden fees. You get the full consultation and report at no cost.',
  },
  {
    q: 'How is this different from just asking ChatGPT?',
    a: 'ROI Agent is purpose-built for business strategy. It collects structured data about your specific business first, then generates a structured report with real tool recommendations, ROI estimates, a phased roadmap, and risk analysis — not a generic essay.',
  },
  {
    q: 'How long does it take?',
    a: 'About 5–10 minutes total. 3 minutes for the intake form, up to 2 questions in the chat, then your full report is generated automatically.',
  },
  {
    q: 'Do you store my business data?',
    a: 'Your session is stored locally in our database only to generate your report. We do not sell or share your data.',
  },
  {
    q: 'What kind of businesses is this for?',
    a: 'Any business, any size, any industry. We have tailored recommendations for Healthcare, Legal, Real Estate, E-commerce, Hospitality, Manufacturing, Retail, Education, and more.',
  },
];

export default function LandingPage() {
  const industries = Object.keys(INDUSTRY_EXAMPLES);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-xl tracking-tight">ROI Agent</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#industries" className="hover:text-gray-900 transition-colors">Industries</a>
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How it works</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
          </div>
          <Link
            href="/intake"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md"
          >
            Get my free roadmap
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4" />
            Free AI strategy consultation — 10 minutes
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.08]">
            Get your business&apos;s<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
              AI strategy roadmap.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
            Describe your business. Our AI consultant asks 2 questions.
            You get a complete strategy report: opportunities, ROI estimates, risks, and a phased roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/intake"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start free consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-400">No sign-up · No credit card · 100% free</p>
          </div>

          {/* Social proof strip */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {['Healthcare', 'Legal', 'E-commerce', 'Real Estate', 'Hospitality', 'Manufacturing'].map(ind => (
              <span key={ind} className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Report preview mockup */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Not a chatbot. A real deliverable.</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Your report includes everything a business owner needs to make an informed AI investment decision.
            </p>
          </div>

          {/* Deliverable cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <TrendingUp className="w-5 h-5 text-green-600" />, bg: 'bg-green-50', title: 'AI Opportunities', desc: '4–8 specific, ranked opportunities with real tool names, time savings, and ROI estimates.' },
              { icon: <DollarSign className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50', title: 'ROI Estimates', desc: 'Realistic annual return calculations based on your industry, team size, and revenue range.' },
              { icon: <Clock className="w-5 h-5 text-orange-600" />, bg: 'bg-orange-50', title: '3-Phase Roadmap', desc: 'A phased implementation plan — quick wins first, then strategic and long-term moves.' },
              { icon: <Shield className="w-5 h-5 text-red-600" />, bg: 'bg-red-50', title: 'Risk Register', desc: 'Honest assessment of change management, privacy, cost, and adoption risks — with mitigation strategies.' },
              { icon: <CheckCircle className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-50', title: 'Key Considerations', desc: 'What your team needs to know before starting: budget, data readiness, vendor lock-in and more.' },
              { icon: <ArrowRight className="w-5 h-5 text-indigo-600" />, bg: 'bg-indigo-50', title: 'Your Next 30 Days', desc: '5 prioritised, concrete actions to start your AI transformation immediately.' },
            ].map(({ icon, bg, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  {icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry examples */}
      <section id="industries" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for your industry</h2>
            <p className="text-lg text-gray-500">Specific recommendations, not generic advice.</p>
          </div>

          <div className="space-y-4">
            {industries.map(industry => (
              <details key={industry} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-900">{industry}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 grid md:grid-cols-3 gap-4 border-t border-gray-50">
                  {INDUSTRY_EXAMPLES[industry].map((ex, i) => (
                    <div key={i} className="pt-4">
                      <p className="font-semibold text-gray-900 text-sm mb-1">{ex.win}</p>
                      <p className="text-xs text-blue-600 font-medium mb-1">via {ex.tool}</p>
                      <p className="text-xs text-gray-500">{ex.result}</p>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-gray-50 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-lg text-gray-500">From zero to full AI roadmap in under 10 minutes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                time: '~3 min',
                title: 'Fill in your business profile',
                desc: 'Answer structured questions about your industry, team size, goals, and biggest challenges.',
                color: 'bg-blue-600',
              },
              {
                step: '2',
                time: '~5 min',
                title: 'Chat with the AI consultant',
                desc: 'The consultant asks at most 2 targeted follow-up questions to fully understand your bottlenecks.',
                color: 'bg-indigo-600',
              },
              {
                step: '3',
                time: 'Instant',
                title: 'Get your full strategy report',
                desc: 'A structured, printable report with opportunities, ROI, roadmap, risks, and next steps.',
                color: 'bg-purple-600',
              },
            ].map(({ step, time, title, desc, color }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg mb-4`}>
                  {step}
                </div>
                <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full mb-3">{time}</span>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What business owners say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I had no idea where to start with AI. This gave me a clear, prioritised plan I could hand to my team the same day.",
                name: 'Sarah K.',
                role: 'Owner, Bright Dental Clinic',
              },
              {
                quote: "The ROI estimates surprised me. We implemented 2 quick wins in the first week and saved ~10 hours of admin immediately.",
                name: 'Marcus T.',
                role: 'Managing Partner, TCL Legal',
              },
              {
                quote: "Finally — specific tool recommendations for my industry, not 'consider using AI to improve your business'. Very actionable.",
                name: 'Priya N.',
                role: 'CEO, Nourish E-commerce',
              },
            ].map(({ quote, name, role }) => (
              <div key={name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{name}</p>
                  <p className="text-gray-400 text-xs">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-900 text-sm">{q}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-3" />
                </summary>
                <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-gray-900 text-white text-center px-6">
        <div className="max-w-2xl mx-auto">
          <Sparkles className="w-10 h-10 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to see what AI can do for your business?
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Get your personalised AI strategy roadmap in 10 minutes. Free, forever.
          </p>
          <Link
            href="/intake"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 text-lg font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:bg-gray-50 hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get my free AI roadmap <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-500 text-sm mt-6">No sign-up required · Takes 10 minutes</p>
        </div>
      </section>

      <footer className="bg-gray-900 border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} ROI Agent. AI strategy for every business.</p>
      </footer>
    </div>
  );
}
