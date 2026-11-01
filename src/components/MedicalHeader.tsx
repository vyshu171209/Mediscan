import React from 'react';

interface MedicalHeaderProps {
  isPatientMode: boolean;
  onToggleMode: () => void;
  onReset: () => void;
  hasAnalysis: boolean;
  onOpenDisclaimer: () => void;
}

export const MedicalHeader: React.FC<MedicalHeaderProps> = ({
  isPatientMode,
  onToggleMode,
  onReset,
  hasAnalysis,
  onOpenDisclaimer
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              medical_services
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                MediScan
              </span>
              <span className="hidden sm:inline-block text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
                Clinical Decision Support
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block">
              Report Scanner · Evidence-Based Treatment Predictor · Multi-Score Engine
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Mode Switcher: Clinician vs Patient */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={onToggleMode}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                !isPatientMode
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-base">clinical_notes</span>
              <span className="hidden sm:inline">Clinician View</span>
            </button>
            <button
              onClick={onToggleMode}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                isPatientMode
                  ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-base">person</span>
              <span className="hidden sm:inline">Patient Friendly</span>
            </button>
          </div>

          {/* New Scan Button */}
          {hasAnalysis && (
            <button
              onClick={onReset}
              className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Upload another report"
            >
              <span className="material-symbols-outlined text-base">restart_alt</span>
              <span className="hidden sm:inline">New Scan</span>
            </button>
          )}

          {/* Medical Disclaimer trigger */}
          <button
            onClick={onOpenDisclaimer}
            className="p-2 text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Clinical Safety Disclaimer"
            aria-label="Medical Disclaimer"
          >
            <span className="material-symbols-outlined text-xl">shield</span>
          </button>
        </div>
      </div>
    </header>
  );
};
