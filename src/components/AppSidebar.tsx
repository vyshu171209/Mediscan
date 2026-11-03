import React from 'react';
import { MedicalReportAnalysis } from '../medicalTypes';

export type AppPage = 'dashboard' | 'scan' | 'scores' | 'treatment' | 'qa' | 'feedback' | 'history' | 'thankyou';

interface AppSidebarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  currentAnalysis: MedicalReportAnalysis | null;
  savedReportsCount?: number;
  isPatientMode: boolean;
  onToggleMode: () => void;
  onOpenDisclaimer: () => void;
  onOpenExport: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentPage,
  onNavigate,
  currentAnalysis,
  savedReportsCount = 0,
  isPatientMode,
  onToggleMode,
  onOpenDisclaimer,
  onOpenExport,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems: {
    id: AppPage;
    label: string;
    sublabel: string;
    icon: string;
    badge?: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      sublabel: 'Overview & Benchmark',
      icon: 'dashboard',
    },
    {
      id: 'scan',
      label: 'Scan Lab / Reports',
      sublabel: 'Upload OCR & Lab Notes',
      icon: 'document_scanner',
      badge: 'Scanner',
    },
    {
      id: 'scores',
      label: 'Scoring Analysis',
      sublabel: 'Calculators & Biomarkers',
      icon: 'analytics',
      badge: currentAnalysis ? `${currentAnalysis.scoreAnalysis.overallSeverityScore}/100` : undefined,
    },
    {
      id: 'treatment',
      label: 'Predicted Treatment Plan',
      sublabel: 'Guideline Rx & Doctor Consult',
      icon: 'medication',
      badge: 'Guideline Rx',
    },
    {
      id: 'qa',
      label: 'Clinical Decision Q&A',
      sublabel: 'Advisory Consultation',
      icon: 'forum',
    },
    {
      id: 'feedback',
      label: 'Treatment Feedback',
      sublabel: 'Outcome & Tolerability',
      icon: 'rate_review',
      badge: currentAnalysis?.feedback ? 'Logged' : undefined,
    },
    {
      id: 'history',
      label: 'Saved Reports & History',
      sublabel: 'Recent Records & Feedback',
      icon: 'folder_shared',
      badge: savedReportsCount > 0 ? `${savedReportsCount}` : undefined,
    },
    {
      id: 'thankyou',
      label: 'Thank You',
      sublabel: 'Appreciation & Summary',
      icon: 'favorite',
      badge: 'Visit',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Logo & Branding */}
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  medical_services
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline font-bold text-xl tracking-tight text-white">
                    Medi<span className="text-emerald-400">Scan</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                    Pro
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Clinical Decision Support</p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Active Case Mini Card */}
          {currentAnalysis && (
            <div className="mx-3 my-3 p-3 rounded-xl bg-slate-850 border border-slate-800/80">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Case
                </span>
                <span className="text-[10px] text-slate-400">
                  Age {currentAnalysis.patientProfile.age || 'N/A'}
                </span>
              </div>
              <div className="font-headline font-bold text-xs text-white truncate" title={currentAnalysis.reportType}>
                {currentAnalysis.reportType}
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[11px]">
                <span className="text-slate-400">Severity Risk:</span>
                <span className="font-bold text-rose-400">
                  {currentAnalysis.scoreAnalysis.overallSeverityScore}/100 ({currentAnalysis.scoreAnalysis.severityTier})
                </span>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Features &amp; Clinical Views
            </span>

            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full p-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-600/30 ring-1 ring-emerald-500/50'
                      : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-xl ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-xs font-headline leading-snug">{item.label}</div>
                      <div
                        className={`text-[10px] ${
                          isActive ? 'text-emerald-100 font-normal' : 'text-slate-500'
                        }`}
                      >
                        {item.sublabel}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-emerald-400 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: View Mode & Utilities */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          {/* Mode Switcher */}
          <div className="bg-slate-850 p-1 rounded-xl border border-slate-800 flex items-center text-xs">
            <button
              onClick={onToggleMode}
              className={`flex-1 py-1.5 px-2 rounded-lg text-center font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                !isPatientMode
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">clinical_notes</span>
              <span className="text-[11px]">Clinician</span>
            </button>
            <button
              onClick={onToggleMode}
              className={`flex-1 py-1.5 px-2 rounded-lg text-center font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isPatientMode
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">person</span>
              <span className="text-[11px]">Patient</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={onOpenExport}
              disabled={!currentAnalysis}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white disabled:opacity-40 flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-750"
              title="Export report summary"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span className="text-[11px]">Export</span>
            </button>

            <button
              onClick={onOpenDisclaimer}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-750"
              title="Clinical Safety Disclaimer"
            >
              <span className="material-symbols-outlined text-sm text-amber-400">shield</span>
              <span className="text-[11px]">Disclaimer</span>
            </button>
          </div>

          <div className="text-[10px] text-slate-500 text-center pt-1">
            Clinical Decision Support · Not for primary diagnosis
          </div>
        </div>
      </aside>
    </>
  );
};
