import React from 'react';
import { MedicalReportAnalysis } from '../medicalTypes';

interface SavedReportsHistoryViewProps {
  savedReports: MedicalReportAnalysis[];
  activeReportId?: string;
  onSelectReport: (report: MedicalReportAnalysis) => void;
  onNavigate: (page: any) => void;
  onExportReport: (report: MedicalReportAnalysis) => void;
  onDeleteReport?: (index: number) => void;
}

export const SavedReportsHistoryView: React.FC<SavedReportsHistoryViewProps> = ({
  savedReports,
  onSelectReport,
  onNavigate,
  onExportReport,
  onDeleteReport,
}) => {
  const reportsWithFeedback = savedReports.filter((r) => r.feedback);
  const criticalReports = savedReports.filter(
    (r) => r.scoreAnalysis.severityTier === 'Critical / Emergent' || r.scoreAnalysis.severityTier === 'High Risk'
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-xl">folder_shared</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Clinical Health Records
            </span>
          </div>
          <h2 className="font-headline text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Recent Reports &amp; Saved Records
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Unified archive of all scanned diagnostic panels, computed risk calculators, and post-treatment feedback logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {savedReports.length} Total Records Saved
          </span>
        </div>
      </div>

      {/* Quick Summary Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">history</span>
          </div>
          <div>
            <div className="font-headline font-bold text-xl text-slate-900 dark:text-white">{savedReports.length}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Total Scanned Reports</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">rate_review</span>
          </div>
          <div>
            <div className="font-headline font-bold text-xl text-slate-900 dark:text-white">{reportsWithFeedback.length}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Feedback Logged to Chart</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">priority_high</span>
          </div>
          <div>
            <div className="font-headline font-bold text-xl text-rose-600 dark:text-rose-400">{criticalReports.length}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">High / Critical Urgency</div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-600">inventory_2</span>
          <span>Saved Patient Cases &amp; Diagnostic Records</span>
        </h3>

        {savedReports.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <span className="material-symbols-outlined text-4xl text-slate-400">folder_open</span>
            <h4 className="font-headline font-bold text-lg text-slate-900 dark:text-white">No Saved Records Yet</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Scan a lab report or select a clinical case from the scanner to automatically save and track patient records here.
            </p>
            <button
              onClick={() => onNavigate('scan')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
            >
              Open Scanner
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {savedReports.map((report, idx) => {
              const isCritical = report.scoreAnalysis.severityTier === 'Critical / Emergent';
              const isHigh = report.scoreAnalysis.severityTier === 'High Risk';

              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 shadow-xs transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          RECORD #{idx + 101}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {report.timestamp || 'Verified Clinical Benchmark'}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Patient: Age {report.patientProfile.age || 'N/A'}, {report.patientProfile.sex || 'N/A'} ({report.patientProfile.detectedSetting})
                        </span>
                      </div>
                      <h4 className="font-headline font-bold text-lg text-slate-900 dark:text-white">
                        {report.reportType}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Severity</span>
                        <span className="font-headline font-black text-xl text-slate-900 dark:text-white">
                          {report.scoreAnalysis.overallSeverityScore}/100
                        </span>
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-xl ${
                          isCritical
                            ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                            : isHigh
                            ? 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400'
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                        }`}
                      >
                        {report.scoreAnalysis.severityTier}
                      </span>
                    </div>
                  </div>

                  {/* Primary Diagnoses & Findings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {report.diagnoses.map((diag, dIdx) => (
                      <div key={dIdx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{diag.condition}</span>
                        <span className="text-slate-400 ml-1.5 font-mono text-[10px]">({diag.icdCode || 'ICD-10'})</span>
                      </div>
                    ))}
                  </div>

                  {/* Feedback Status Pill if submitted */}
                  {report.feedback ? (
                    <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-bold">
                        <span className="material-symbols-outlined text-base">verified</span>
                        <span>Feedback Logged ({report.feedback.submittedAt})</span>
                        <span>· Rating: ★ {report.feedback.overallRating}/5</span>
                        <span>· Adherence: {report.feedback.adherencePercentage}%</span>
                      </div>
                      <span className="text-[11px] text-teal-700 dark:text-teal-400">
                        Tolerability: <strong>{report.feedback.toleranceStatus}</strong>
                      </span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                      <span>Treatment feedback not yet submitted for this record.</span>
                      <button
                        onClick={() => {
                          onSelectReport(report);
                          onNavigate('feedback');
                        }}
                        className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-slate-500 dark:text-slate-400">
                      Urgency Timeline: <strong>{report.scoreAnalysis.urgencyTimeline}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onExportReport(report)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">print</span>
                        <span>Export Summary</span>
                      </button>

                      <button
                        onClick={() => {
                          onSelectReport(report);
                          onNavigate('scores');
                        }}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <span>Open Report Workspace</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>

                      {onDeleteReport && (
                        <button
                          onClick={() => onDeleteReport(idx)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Remove record"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
