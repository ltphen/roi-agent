'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Sparkles, Check } from 'lucide-react';

const INDUSTRIES = [
  'Healthcare', 'Legal', 'Real Estate', 'E-commerce',
  'Hospitality', 'Manufacturing', 'Professional Services',
  'Retail', 'Education', 'Marketing & Advertising', 'Construction', 'Other',
];

const COMPANY_SIZES = ['Solo / Freelancer', '2–10 employees', '11–50 employees', '51–200 employees', '200+ employees'];
const REVENUE_RANGES = ['Under $500K/yr', '$500K–$2M/yr', '$2M–$10M/yr', '$10M+/yr', 'Prefer not to say'];
const PRIMARY_GOALS = [
  'Cut operational costs',
  'Grow revenue',
  'Save team time & reduce manual work',
  'Improve customer experience',
  'Scale without hiring more staff',
];

const CHALLENGES_BY_INDUSTRY: Record<string, string[]> = {
  Healthcare: ['Appointment scheduling & no-shows', 'Insurance claims & billing', 'Patient follow-up & recall', 'Clinical documentation', 'Staff coordination'],
  Legal: ['Contract review & drafting', 'Client intake & onboarding', 'Billing & time tracking', 'Legal research', 'Document management'],
  'Real Estate': ['Lead qualification & follow-up', 'Listing descriptions & marketing', 'Scheduling showings', 'Market analysis & reporting', 'Client communication'],
  'E-commerce': ['Customer support volume', 'Product descriptions & SEO', 'Inventory management', 'Returns & refunds', 'Marketing & ad copy'],
  Hospitality: ['Reservations & booking management', 'Guest communication', 'Staff scheduling', 'Review management & responses', 'Upselling & cross-selling'],
  Manufacturing: ['Predictive maintenance', 'Quality control & inspection', 'Demand forecasting', 'Supply chain coordination', 'Production scheduling'],
  'Professional Services': ['Proposal & report writing', 'Meeting notes & follow-ups', 'Client onboarding', 'Project management', 'Billing & invoicing'],
  Retail: ['Inventory & stock management', 'Customer service', 'Promotions & pricing', 'Product recommendations', 'Staff scheduling'],
  Education: ['Student grading & feedback', 'Administrative paperwork', 'Parent & student communication', 'Curriculum planning', 'Attendance & reporting'],
  'Marketing & Advertising': ['Content creation at scale', 'Ad copy & creative testing', 'Reporting & analytics', 'Client reporting', 'Social media management'],
  Construction: ['Project scheduling & planning', 'Safety & compliance documentation', 'Cost estimation', 'Subcontractor coordination', 'Progress monitoring'],
  Other: ['Administrative tasks', 'Customer communication', 'Reporting & data analysis', 'Sales & lead generation', 'Finance & invoicing'],
};

type FormData = {
  businessName: string;
  industry: string;
  companySize: string;
  annualRevenue: string;
  primaryGoal: string;
  topChallenges: string[];
  techStack: string;
  biggestTask: string;
  aiExperience: string;
  aiTools: string;
};

const TOTAL_STEPS = 4;

export default function IntakePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    businessName: '',
    industry: '',
    companySize: '',
    annualRevenue: '',
    primaryGoal: '',
    topChallenges: [],
    techStack: '',
    biggestTask: '',
    aiExperience: '',
    aiTools: '',
  });

  const challenges = CHALLENGES_BY_INDUSTRY[form.industry] ?? CHALLENGES_BY_INDUSTRY['Other'];

  const toggleChallenge = (c: string) => {
    setForm(f => ({
      ...f,
      topChallenges: f.topChallenges.includes(c)
        ? f.topChallenges.filter(x => x !== c)
        : f.topChallenges.length < 3
          ? [...f.topChallenges, c]
          : f.topChallenges,
    }));
  };

  const canNext = () => {
    if (step === 1) return form.businessName.trim() && form.industry && form.companySize && form.annualRevenue;
    if (step === 2) return form.primaryGoal && form.topChallenges.length > 0;
    if (step === 3) return form.biggestTask.trim() && form.aiExperience;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const { sessionId } = await res.json();
      router.push(`/consultation/${sessionId}`);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center gap-2 border-b border-white/60 bg-white/50 backdrop-blur-sm">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <span className="font-bold text-lg tracking-tight text-gray-900">ROI Agent</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Step {step} of {TOTAL_STEPS}</span>
              <span className="text-sm text-gray-400">{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {['Business', 'Goals', 'Operations', 'Review'].map((label, i) => (
                <span
                  key={label}
                  className={`text-xs font-medium ${i + 1 <= step ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">

            {/* Step 1: Business Basics */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Tell us about your business</h2>
                <p className="text-gray-500 mb-8">This helps us tailor every recommendation to your exact context.</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Business name</label>
                    <input
                      type="text"
                      placeholder="e.g. Bright Dental Clinic"
                      value={form.businessName}
                      onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {INDUSTRIES.map(ind => (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, industry: ind, topChallenges: [] }))}
                          className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all text-left ${
                            form.industry === ind
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Team size</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {COMPANY_SIZES.map(size => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, companySize: size }))}
                          className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all text-left ${
                            form.companySize === size
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Annual revenue</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {REVENUE_RANGES.map(rev => (
                        <button
                          key={rev}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, annualRevenue: rev }))}
                          className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all text-left ${
                            form.annualRevenue === rev
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                          }`}
                        >
                          {rev}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Goals & Challenges */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Goals & challenges</h2>
                <p className="text-gray-500 mb-8">What matters most to your business right now?</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Primary goal for AI adoption</label>
                    <div className="space-y-2">
                      {PRIMARY_GOALS.map(goal => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, primaryGoal: goal }))}
                          className={`w-full px-4 py-3 rounded-xl text-sm font-medium border transition-all text-left flex items-center gap-3 ${
                            form.primaryGoal === goal
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            form.primaryGoal === goal ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                          }`}>
                            {form.primaryGoal === goal && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Top challenges <span className="font-normal text-gray-400">(select up to 3)</span>
                    </label>
                    <p className="text-xs text-gray-400 mb-3">{form.topChallenges.length}/3 selected</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {challenges.map(c => {
                        const selected = form.topChallenges.includes(c);
                        const maxed = form.topChallenges.length >= 3 && !selected;
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => toggleChallenge(c)}
                            disabled={maxed}
                            className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all text-left flex items-center gap-2 ${
                              selected
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : maxed
                                  ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                            }`}>
                              {selected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            {c}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Current Operations */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Current operations</h2>
                <p className="text-gray-500 mb-8">Help us understand what you work with today.</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What is your biggest manual or repetitive task?
                    </label>
                    <textarea
                      placeholder="e.g. We spend ~3 hours a day manually following up with leads by email. The same messages go out every time."
                      value={form.biggestTask}
                      onChange={e => setForm(f => ({ ...f, biggestTask: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current software / tools your team uses
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. QuickBooks, Salesforce, Slack, Google Workspace"
                      value={form.techStack}
                      onChange={e => setForm(f => ({ ...f, techStack: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Have you used AI tools in your business before?
                    </label>
                    <div className="flex gap-3">
                      {['yes', 'no'].map(v => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, aiExperience: v, aiTools: v === 'no' ? '' : f.aiTools }))}
                          className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all capitalize ${
                            form.aiExperience === v
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                          }`}
                        >
                          {v === 'yes' ? 'Yes' : 'No, not yet'}
                        </button>
                      ))}
                    </div>
                    {form.aiExperience === 'yes' && (
                      <input
                        type="text"
                        placeholder="Which AI tools? e.g. ChatGPT, Midjourney, Zapier AI"
                        value={form.aiTools}
                        onChange={e => setForm(f => ({ ...f, aiTools: e.target.value }))}
                        className="mt-3 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Launch */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Ready to launch</h2>
                <p className="text-gray-500 mb-8">Here&apos;s a summary of your profile before we start the consultation.</p>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 divide-y divide-gray-100 mb-6">
                  {[
                    { label: 'Business', value: form.businessName },
                    { label: 'Industry', value: form.industry },
                    { label: 'Team size', value: form.companySize },
                    { label: 'Revenue', value: form.annualRevenue },
                    { label: 'Primary goal', value: form.primaryGoal },
                    { label: 'Key challenges', value: form.topChallenges.join(', ') },
                    { label: 'Biggest task', value: form.biggestTask },
                    { label: 'Current tools', value: form.techStack || 'Not specified' },
                    { label: 'AI experience', value: form.aiExperience === 'yes' ? `Yes — ${form.aiTools || 'some tools'}` : 'No prior AI tools' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex px-5 py-3 gap-4">
                      <span className="text-sm font-semibold text-gray-500 w-32 shrink-0">{label}</span>
                      <span className="text-sm text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 text-sm text-blue-800">
                  <strong>What happens next:</strong> Our AI consultant will ask up to 2 targeted follow-up questions, then generate your personalised AI strategy roadmap — typically under 5 minutes.
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {step < TOTAL_STEPS ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canNext()}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
                >
                  {loading ? 'Starting consultation…' : (
                    <><Sparkles className="w-4 h-4" /> Start my AI consultation</>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Trust footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Free forever · No credit card · Your data stays private
          </p>
        </div>
      </main>
    </div>
  );
}
