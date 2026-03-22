'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Sparkles, TrendingUp, DollarSign, Clock, Shield, Users, AlertTriangle, CheckCircle, ChevronRight, Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Opportunity = {
  title: string;
  category: 'Revenue Growth' | 'Cost Reduction' | 'Time Savings' | 'Customer Experience' | 'Risk Mitigation';
  description: string;
  toolRecommendations: string[];
  estimatedTimeSavedPerWeek: string;
  estimatedAnnualROI: string;
  implementationEffort: 'Low' | 'Medium' | 'High';
  timeToValue: string;
  priority: 'Quick Win' | 'Strategic' | 'Long-term';
  implementationSteps: string[];
};

type RoadmapPhase = {
  label: string;
  duration: string;
  focus: string;
  actions: string[];
  expectedOutcome: string;
};

type Risk = {
  risk: string;
  description: string;
  mitigation: string;
  severity: 'Low' | 'Medium' | 'High';
};

type Report = {
  executiveSummary: string;
  keyMetrics: {
    totalOpportunitiesIdentified: number;
    estimatedWeeklyHoursSaved: string;
    estimatedAnnualROI: string;
    quickWinsAvailable: number;
    paybackPeriod: string;
  };
  aiOpportunities: Opportunity[];
  implementationRoadmap: {
    phase1: RoadmapPhase;
    phase2: RoadmapPhase;
    phase3: RoadmapPhase;
  };
  risks: Risk[];
  considerations: string[];
  nextSteps: string[];
  disclaimer: string;
};

type ReportResponse = {
  report: Report;
  sessionId: string;
  createdAt: number;
};

const CATEGORY_STYLES: Record<Opportunity['category'], { bg: string; text: string; icon: React.ReactNode }> = {
  'Revenue Growth': { bg: 'bg-green-50', text: 'text-green-700', icon: <TrendingUp className="w-4 h-4" /> },
  'Cost Reduction': { bg: 'bg-blue-50', text: 'text-blue-700', icon: <DollarSign className="w-4 h-4" /> },
  'Time Savings': { bg: 'bg-orange-50', text: 'text-orange-700', icon: <Clock className="w-4 h-4" /> },
  'Customer Experience': { bg: 'bg-purple-50', text: 'text-purple-700', icon: <Users className="w-4 h-4" /> },
  'Risk Mitigation': { bg: 'bg-slate-50', text: 'text-slate-700', icon: <Shield className="w-4 h-4" /> },
};

const PRIORITY_STYLES: Record<Opportunity['priority'], string> = {
  'Quick Win': 'bg-green-100 text-green-800',
  'Strategic': 'bg-blue-100 text-blue-800',
  'Long-term': 'bg-purple-100 text-purple-800',
};

const EFFORT_STYLES: Record<Opportunity['implementationEffort'], string> = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700',
};

const SEVERITY_STYLES: Record<Risk['severity'], string> = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700',
};

export default function ReportPage() {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;

  const [data, setData] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/report/${sessionId}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError('Failed to load report'))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center animate-pulse">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-500 text-sm">Loading your report…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">{error || 'Report not found'}</p>
          <Link href="/intake" className="text-blue-600 hover:underline text-sm">Start a new consultation</Link>
        </div>
      </div>
    );
  }

  const { report } = data;
  const phases = [report.implementationRoadmap.phase1, report.implementationRoadmap.phase2, report.implementationRoadmap.phase3];
  const phaseColors = ['bg-blue-600', 'bg-indigo-600', 'bg-purple-600'];

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      {/* Nav — hidden on print */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/intake" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> New consultation
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-lg">ROI Agent</span>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-4 h-4" /> Save as PDF
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 space-y-10">

        {/* Hero metrics */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white print:bg-blue-600">
          <div className="flex items-center gap-2 mb-2 opacity-80">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-widest">AI Strategy Report</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-1">Your AI Roadmap</h1>
          <p className="text-blue-200 text-sm mb-8">
            Generated {new Date(data.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Estimated Annual ROI', value: report.keyMetrics.estimatedAnnualROI },
              { label: 'Hours Saved / Week', value: report.keyMetrics.estimatedWeeklyHoursSaved },
              { label: 'Opportunities Found', value: String(report.keyMetrics.totalOpportunitiesIdentified) },
              { label: 'Payback Period', value: report.keyMetrics.paybackPeriod },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-blue-200 text-xs font-medium mb-1">{label}</p>
                <p className="text-white font-bold text-lg leading-tight">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Summary */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">1</span>
            Executive Summary
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-gray-700 leading-relaxed">{report.executiveSummary}</p>
          </div>
        </section>

        {/* AI Opportunities */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">2</span>
            AI Opportunities
            <span className="text-sm font-normal text-gray-400 ml-1">({report.aiOpportunities.length} identified)</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {report.aiOpportunities.map((opp, i) => {
              const catStyle = CATEGORY_STYLES[opp.category];
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-8 h-8 rounded-xl ${catStyle.bg} ${catStyle.text} flex items-center justify-center shrink-0`}>
                        {catStyle.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">{opp.title}</h3>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${PRIORITY_STYLES[opp.priority]}`}>
                      {opp.priority}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">{opp.description}</p>

                  {/* Metrics row */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-0.5">Time saved / week</p>
                      <p className="text-sm font-semibold text-gray-800">{opp.estimatedTimeSavedPerWeek}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-0.5">Annual ROI</p>
                      <p className="text-sm font-semibold text-gray-800">{opp.estimatedAnnualROI}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-0.5">Effort</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${EFFORT_STYLES[opp.implementationEffort]}`}>
                        {opp.implementationEffort}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-0.5">Time to value</p>
                      <p className="text-sm font-semibold text-gray-800">{opp.timeToValue}</p>
                    </div>
                  </div>

                  {/* Tools */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">RECOMMENDED TOOLS</p>
                    <div className="flex flex-wrap gap-1.5">
                      {opp.toolRecommendations.map((tool, j) => (
                        <span key={j} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">{tool}</span>
                      ))}
                    </div>
                  </div>

                  {/* Steps */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">FIRST STEPS</p>
                    <ol className="space-y-1">
                      {opp.implementationSteps.map((step, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0 mt-0.5 text-[10px]">{j + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Implementation Roadmap */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">3</span>
            Implementation Roadmap
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {phases.map((phase, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className={`${phaseColors[i]} px-5 py-4 text-white`}>
                  <p className="text-xs font-semibold opacity-75 uppercase tracking-wider mb-1">{phase.duration}</p>
                  <h3 className="font-bold text-base">{phase.label}</h3>
                  <p className="text-sm opacity-80 mt-1">{phase.focus}</p>
                </div>
                <div className="p-5 space-y-5">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">ACTIONS</p>
                    <ul className="space-y-1.5">
                      {phase.actions.map((action, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs font-semibold text-gray-500 mb-1">EXPECTED OUTCOME</p>
                    <p className="text-xs text-gray-700">{phase.expectedOutcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Risks */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">4</span>
            Risk Register
          </h2>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {report.risks.map((risk, i) => (
                <div key={i} className="p-5 flex gap-4 items-start">
                  <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${
                    risk.severity === 'High' ? 'text-red-500' : risk.severity === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-semibold text-gray-900 text-sm">{risk.risk}</h4>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${SEVERITY_STYLES[risk.severity]}`}>
                        {risk.severity} severity
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700"><span className="font-medium">Mitigation:</span> {risk.mitigation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Considerations */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">5</span>
            Key Considerations
          </h2>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <ul className="space-y-3">
              {report.considerations.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">{i + 1}</div>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">6</span>
            Your Next 30 Days
          </h2>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6 shadow-sm">
            <ol className="space-y-3">
              {report.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                  <p className="text-gray-800 font-medium text-sm pt-1.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gray-900 rounded-3xl p-8 text-center text-white print:hidden">
          <h3 className="text-xl font-bold mb-2">Want to start a new consultation?</h3>
          <p className="text-gray-400 text-sm mb-6">Run a fresh analysis for a different business or scenario.</p>
          <Link
            href="/intake"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-full text-sm hover:bg-gray-100 transition-colors"
          >
            <Sparkles className="w-4 h-4" /> Start new consultation
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center pb-6">{report.disclaimer}</p>
      </div>
    </div>
  );
}
