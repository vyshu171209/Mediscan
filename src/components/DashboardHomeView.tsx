import React from 'react';
import { MedicalReportAnalysis, SampleReportOption } from '../medicalTypes';
import { SAMPLE_REPORTS } from '../medicalSampleData';
import { AppPage } from './AppSidebar';

interface DashboardHomeViewProps {
  currentAnalysis: MedicalReportAnalysis | null;
  onNavigate: (page: AppPage) => void;
  onSelectSample: (sample: SampleReportOption) => void;
  isPatientMode: boolean;
}

export const DashboardHomeView: React.FC<DashboardHomeViewProps> = ({
  currentAnalysis,
  onNavigate,
  onSelectSample,
  isPatientMode,
}) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Hero Banner with Image & Project Branding */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Column: Branding, Title & Description */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-5 z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Clinical Intelligence System
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                v2.6 Multi-Score Decision Support
              </span>
            </div>

            <div>
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Medi<span className="text-emerald-400">Scan</span>
              </h1>
              <p className="font-headline text-lg sm:text-xl font-medium text-emerald-300/90 mt-1">
                Medical Report Scanner, Multi-Score Risk Engine &amp; Treatment Predictor
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Upload laboratory panels, radiology impressions, or clinical notes. MediScan automatically extracts abnormal biomarkers, computes validated clinical risk scores, predicts guideline-directed pharmacotherapy, simulates multi-phase patient outcomes, and captures end-of-care feedback.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('scan')}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-headline font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">document_scanner</span>
                <span>Scan Medical Report</span>
              </button>

              <button
                onClick={() => onNavigate('scores')}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-headline font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
              >
                <span className="material-symbols-outlined text-lg text-emerald-400">analytics</span>
                <span>View Score Analysis</span>
              </button>

              <button
                onClick={() => onNavigate('treatment')}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-headline font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
              >
                <span className="material-symbols-outlined text-lg text-teal-400">play_circle</span>
                <span>Live Demo &amp; Plan</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Image */}
          <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-full min-h-[300px] overflow-hidden">
            <img
              src="/mediscan_hero.jpg"
              alt="MediScan Advanced Clinical Diagnostics Interface"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95 contrast-105"
            />
            {/* Gradient Overlays for Seamless Blending */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-[11px] font-bold text-emerald-300 flex items-center gap-1.5 shadow-lg">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>Guideline-Concordant AI Architecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Platform Statistics Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">document_scanner</span>
          </div>
          <div>
            <div className="font-headline font-extrabold text-2xl text-slate-900 dark:text-white">Multimodal</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Images, PDFs &amp; Text</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">analytics</span>
          </div>
          <div>
            <div className="font-headline font-extrabold text-2xl text-slate-900 dark:text-white">5 Calculators</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">CURB-65, ASCVD, KDIGO...</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">play_circle</span>
          </div>
          <div>
            <div className="font-headline font-extrabold text-2xl text-slate-900 dark:text-white">4-Phase</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Live Treatment Simulation</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">rate_review</span>
          </div>
          <div>
            <div className="font-headline font-extrabold text-2xl text-slate-900 dark:text-white">EHR Outcome</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Post-Care Feedback Audit</div>
          </div>
        </div>
      </section>

      {/* 3. Currently Loaded Case Executive Summary Card (if active) */}
      {currentAnalysis && (
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Active Clinical Case in Memory
                </span>
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {currentAnalysis.reportType}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Patient: Age {currentAnalysis.patientProfile.age || 'N/A'} · Sex {currentAnalysis.patientProfile.sex || 'N/A'} · Setting: {currentAnalysis.patientProfile.detectedSetting}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Severity Score</span>
                <span className="font-headline font-black text-2xl text-rose-600 dark:text-rose-400">
                  {currentAnalysis.scoreAnalysis.overallSeverityScore}/100
                </span>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                {currentAnalysis.scoreAnalysis.severityTier}
              </span>
            </div>
          </div>

          {/* Diagnoses preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentAnalysis.diagnoses.map((d, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{d.condition}</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{d.evidence}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 shrink-0">
                  {d.severity}
                </span>
              </div>
            ))}
          </div>

          {/* Quick navigation row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Urgency: <strong className="text-slate-800 dark:text-slate-200">{currentAnalysis.scoreAnalysis.urgencyTimeline}</strong>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('scores')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Full Scores</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button
                onClick={() => onNavigate('treatment')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
              >
                <span>Live Simulation &amp; Plan</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. Quick-Select Verified Sample Reports */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-headline font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">science</span>
              <span>1-Click Clinical Benchmark Datasets</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instantly test multi-score risk calculation and predicted treatments across common medical profiles:
            </p>
          </div>
          <button
            onClick={() => onNavigate('scan')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Custom Scan &amp; Upload</span>
            <span className="material-symbols-outlined text-sm">upload_file</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SAMPLE_REPORTS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => {
                onSelectSample(sample);
                onNavigate('scores');
              }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  {sample.category}
                </span>
                <h4 className="font-headline font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {sample.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {sample.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Load &amp; Analyze</span>
                <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Clinical Decision Support Standards & Telehealth Consultation Banner */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Telehealth Doctor Consult Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-800/60 text-white space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Live Physician Advisory
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg text-white">
              Direct Doctor Case Consultation
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Have predicted treatment regimens and clinical risk scores verified directly with a board-certified attending physician in our interactive consultation suite.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="material-symbols-outlined text-emerald-400 text-base">support_agent</span>
              <span>Attending Specialist Available</span>
            </div>

            <button
              onClick={() => onNavigate('treatment')}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <span>Consult Doctor in Plan</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Evidence-Based Practice Guidelines Accreditation */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-headline font-bold text-base">
            <span className="material-symbols-outlined text-emerald-600">verified</span>
            <span>Accredited Clinical Guidelines</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All predicted dosages, contraindication alerts, and risk stratification thresholds strictly adhere to peer-reviewed international standards:
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-emerald-600">check</span>
              <span>ADA 2024 Standards</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-emerald-600">check</span>
              <span>ACC / AHA Guidelines</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-emerald-600">check</span>
              <span>KDIGO Renal Protocol</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-emerald-600">check</span>
              <span>ATS / IDSA Guidelines</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
