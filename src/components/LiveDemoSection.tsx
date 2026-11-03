import React, { useState } from 'react';
import { TreatmentPlan } from '../medicalTypes';

interface LiveDemoSectionProps {
  treatmentData: TreatmentPlan;
  reportTitle?: string;
}

export const LiveDemoSection: React.FC<LiveDemoSectionProps> = ({
  treatmentData,
  reportTitle,
}) => {
  const [demoStep, setDemoStep] = useState<number>(0);
  const [isPlayingDemo, setIsPlayingDemo] = useState<boolean>(false);
  const [demoScenario, setDemoScenario] = useState<'optimal' | 'mild_nausea' | 'elevated_bp'>('optimal');

  const timelineSteps = [
    {
      phase: 'Phase 1: Day 1',
      timeframe: 'Hours 0–24',
      title: 'Acute Initiation & Safety Baseline',
      status: 'Initial Dosing',
      badge: 'Acute Phase',
      actions: [
        'Administer primary guideline dosage with meals to mitigate gastrointestinal sensitivity.',
        'Obtain baseline vitals (BP, HR, hydration status) and confirm safe renal thresholds.',
        'Screen patient profile for drug-drug interactions and confirm zero concurrent NSAID usage.',
      ],
      biomarkerProjection: [
        { name: 'Primary Target (e.g. Glucose / BP)', current: 'Acute baseline', target: '-10% drop by 24h', trend: 'down' },
        { name: 'Renal / Electrolyte Safety', current: 'Stable', target: 'Potassium within 3.5–5.1 mEq/L', trend: 'neutral' },
      ],
      clinicalTip: 'Educate patient on hydration targets and red-flag symptoms requiring immediate clinical contact.',
    },
    {
      phase: 'Phase 2: Days 7–14',
      timeframe: 'Weeks 1–2',
      title: 'Early Tolerability & Biochemical Response',
      status: 'Early Stabilization',
      badge: 'Stabilization',
      actions: [
        'Repeat Basic Metabolic Panel (BMP) to verify serum creatinine and potassium balance.',
        'Evaluate patient-reported tolerability and confirm absence of orthostatic dizziness.',
        'Review adherence logs and confirm proper administration technique.',
      ],
      biomarkerProjection: [
        { name: 'Primary Symptom Burden', current: 'Decreasing', target: '-30% reduction from baseline', trend: 'down' },
        { name: 'Creatinine Fluctuation', current: '<20% variance', target: 'Normal hemodynamic shift', trend: 'neutral' },
      ],
      clinicalTip: 'Mild creatinine fluctuations (<30%) upon SGLT2i or RAAS blockade initiation reflect reduced intraglomerular pressure and denote renoprotection.',
    },
    {
      phase: 'Phase 3: Month 1',
      timeframe: 'Weeks 4–6',
      title: 'Dosage Titration & Therapeutic Steady State',
      status: 'Dose Optimization',
      badge: 'Titration',
      actions: [
        'Titrate to full guideline-directed maintenance dosage following tolerance confirmation.',
        'Review digital continuous monitoring or home blood pressure diary (target TIR > 70%).',
        'Reinforce dietary sodium restriction (<2,000 mg/day) and scheduled aerobic activity.',
      ],
      biomarkerProjection: [
        { name: 'Primary Pathology Marker', current: 'Normalized', target: 'Approaching clinical target', trend: 'down' },
        { name: 'Microvascular Event Risk', current: 'Subdued', target: 'Significant morbidity reduction', trend: 'down' },
      ],
      clinicalTip: 'If patient reports transient mild side effects, split doses or administer with evening meal before altering pharmacological class.',
    },
    {
      phase: 'Phase 4: Month 3',
      timeframe: 'Weeks 12–16',
      title: 'Target Attainment & Long-Term Maintenance',
      status: 'Goal Maintenance',
      badge: 'Long-Term',
      actions: [
        'Order formal follow-up laboratory panel (HbA1c, repeat Lipid Profile, urine ACR).',
        'Assess sustained end-organ protection and cardiovascular risk decrescendo.',
        'Transition patient into 6-month maintenance surveillance pathway.',
      ],
      biomarkerProjection: [
        { name: 'Diagnostic Target (e.g. HbA1c / LDL)', current: 'Goal Achieved', target: 'HbA1c <7.0% / LDL in target', trend: 'target' },
        { name: 'Long-term Organ Protection', current: 'Optimized', target: 'Decelerated disease progression', trend: 'target' },
      ],
      clinicalTip: 'Schedule annual multidisciplinary evaluations (retinal imaging, comprehensive foot examination, cardiac review).',
    },
  ];

  const handleNextStep = () => {
    setDemoStep((prev) => Math.min(timelineSteps.length - 1, prev + 1));
  };

  const handlePrevStep = () => {
    setDemoStep((prev) => Math.max(0, prev - 1));
  };

  const handleToggleAutoPlay = () => {
    if (isPlayingDemo) {
      setIsPlayingDemo(false);
    } else {
      setIsPlayingDemo(true);
      let step = demoStep;
      const interval = setInterval(() => {
        step = (step + 1) % timelineSteps.length;
        setDemoStep(step);
      }, 3500);
      setTimeout(() => {
        clearInterval(interval);
        setIsPlayingDemo(false);
      }, 14000);
    }
  };

  const currentStep = timelineSteps[demoStep];

  return (
    <section id="live-demo-section" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Interactive Treatment Engine
            </span>
            {reportTitle && (
              <span className="text-xs text-slate-400 hidden sm:inline">
                · {reportTitle}
              </span>
            )}
          </div>
          <h3 className="font-headline text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Live Clinical Treatment Simulation
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Step through patient progression from Day 1 initiation to Month 3 goal attainment with live trajectory modeling.
          </p>
        </div>

        {/* Stepper Controls & Auto Play */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrevStep}
            disabled={demoStep === 0}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Previous phase"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
          </button>

          <button
            onClick={handleToggleAutoPlay}
            className="px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-base">
              {isPlayingDemo ? 'pause' : 'play_arrow'}
            </span>
            <span>{isPlayingDemo ? 'Pause Demo' : 'Auto-Play Journey'}</span>
          </button>

          <button
            onClick={handleNextStep}
            disabled={demoStep === timelineSteps.length - 1}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Next phase"
          >
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* 4-Phase Stepper Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {timelineSteps.map((step, idx) => {
          const isActive = idx === demoStep;
          const isPast = idx < demoStep;
          return (
            <button
              key={idx}
              onClick={() => setDemoStep(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs ring-2 ring-emerald-500/20'
                  : isPast
                  ? 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 opacity-85 hover:opacity-100'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-60 hover:opacity-90'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className={isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500'}>
                  {step.phase}
                </span>
                {isPast ? (
                  <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                ) : (
                  <span className="text-[10px] text-slate-400 font-normal">{step.badge}</span>
                )}
              </div>
              <div className="font-headline font-bold text-xs text-slate-800 dark:text-slate-100 mt-1 truncate">
                {step.title}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{step.timeframe}</span>
            </button>
          );
        })}
      </div>

      {/* Active Phase Details Container */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                {currentStep.phase} · {currentStep.timeframe}
              </span>
              <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold px-2 py-0.5 rounded">
                {currentStep.status}
              </span>
            </div>
            <h4 className="font-headline font-bold text-xl text-slate-900 dark:text-white mt-1">
              {currentStep.title}
            </h4>
          </div>

          {/* Interactive Scenario Tester */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              Simulate Response:
            </span>
            <select
              value={demoScenario}
              onChange={(e) => setDemoScenario(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="optimal">Scenario: Optimal Tolerance (100% adherence)</option>
              <option value="mild_nausea">Scenario: Patient reports mild nausea</option>
              <option value="elevated_bp">Scenario: Mild blood pressure rebound</option>
            </select>
          </div>
        </div>

        {/* Dynamic Scenario Feedback Alerts */}
        {demoScenario === 'mild_nausea' && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-amber-600 text-base mt-0.5">info</span>
            <div>
              <strong>Live Clinical Adjustment: </strong>
              Take medications with largest meal or switch to bedtime administration. If on GLP-1 RA, ensure slow 4-week titration before dose escalation.
            </div>
          </div>
        )}

        {demoScenario === 'elevated_bp' && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-rose-600 text-base mt-0.5">warning</span>
            <div>
              <strong>Live Clinical Adjustment: </strong>
              Titrate ACEi/ARB or add a low-dose calcium channel blocker (Amlodipine 5mg). Reinforce strict &lt;2,000 mg/day dietary sodium.
            </div>
          </div>
        )}

        {/* Grid: Actions & Biomarker Projections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-emerald-600">task_alt</span>
              <span>Active Interventions in This Phase</span>
            </h5>
            <ul className="space-y-2">
              {currentStep.actions.map((act, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-emerald-600 text-sm mt-0.5 shrink-0">check</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-teal-600">trending_down</span>
              <span>Simulated Biomarker Trajectory</span>
            </h5>
            <div className="space-y-2.5">
              {currentStep.biomarkerProjection.map((bio, i) => (
                <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{bio.name}</span>
                    <div className="text-[11px] text-slate-400">Current: {bio.current}</div>
                  </div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                    {bio.target}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Clinical Tip */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <span className="material-symbols-outlined text-emerald-600 text-base shrink-0">lightbulb</span>
          <span>
            <strong>Physician Guidance: </strong>
            {currentStep.clinicalTip}
          </span>
        </div>
      </div>
    </section>
  );
};
