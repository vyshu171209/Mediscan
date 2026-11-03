import React from 'react';

interface ThankYouSectionProps {
  onNavigateHome?: () => void;
  onNewScan?: () => void;
  onExport?: () => void;
}

export const ThankYouSection: React.FC<ThankYouSectionProps> = ({
  onNavigateHome,
  onNewScan,
  onExport,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/70 border border-emerald-500/30 text-white p-8 sm:p-12 shadow-2xl space-y-8 animate-fade-in">
      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Center Heartbeat Icon & Decorative Header */}
      <div className="relative text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/30 mx-auto">
          <span className="material-symbols-outlined text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
            favorite
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-800">
            Gratitude &amp; Healthcare Excellence
          </span>
          <h3 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Thank You for Visiting My Website!
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
            We are deeply grateful for your time exploring <strong className="text-emerald-400">MediScan</strong>. Whether you are a healthcare professional reviewing complex clinical panels or a patient navigating your health journey, our mission is to empower you with evidence-based intelligence and personalized clarity.
          </p>
        </div>
      </div>

      {/* Designed Highlight Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-800/80 space-y-2 text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto sm:mx-0">
            <span className="material-symbols-outlined text-xl">verified_user</span>
          </div>
          <h4 className="font-headline font-bold text-sm text-white">Guideline-Directed Care</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Formulations strictly aligned with ADA, ACC/AHA, KDIGO, and ATS clinical practice citations.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-800/80 space-y-2 text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto sm:mx-0">
            <span className="material-symbols-outlined text-xl">lock</span>
          </div>
          <h4 className="font-headline font-bold text-sm text-white">Confidential &amp; Secure</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Zero third-party tracking, zero credential exposure, and encrypted medical processing.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-800/80 space-y-2 text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto sm:mx-0">
            <span className="material-symbols-outlined text-xl">support_agent</span>
          </div>
          <h4 className="font-headline font-bold text-sm text-white">Doctor Consultation Ready</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Seamlessly bridge automated diagnostic insights with direct attending physician case review.
          </p>
        </div>
      </div>

      {/* Designed Action Row */}
      <div className="relative flex flex-wrap items-center justify-center gap-3 pt-2">
        {onNavigateHome && (
          <button
            onClick={onNavigateHome}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-headline font-bold text-xs flex items-center gap-2 transition-all cursor-pointer border border-slate-700 shadow-sm"
          >
            <span className="material-symbols-outlined text-base">dashboard</span>
            <span>Return to Dashboard</span>
          </button>
        )}

        {onNewScan && (
          <button
            onClick={onNewScan}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-headline font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/25 active:scale-95"
          >
            <span className="material-symbols-outlined text-base">document_scanner</span>
            <span>Start New Scan</span>
          </button>
        )}

        {onExport && (
          <button
            onClick={onExport}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-headline font-bold text-xs flex items-center gap-2 transition-all cursor-pointer border border-slate-700 shadow-sm"
          >
            <span className="material-symbols-outlined text-base">print</span>
            <span>Export Clinical Summary</span>
          </button>
        )}
      </div>

      {/* Footer Disclaimer & Designer Signature */}
      <div className="relative text-center pt-6 border-t border-slate-800/80 space-y-1">
        <p className="text-[11px] text-slate-500">
          MediScan is intended for clinical decision support and educational reference. Always consult a licensed healthcare professional for diagnostic decisions.
        </p>
        <p className="text-xs text-emerald-400 font-headline font-semibold pt-1">
          Designed with care for modern healthcare excellence · MediScan 2026
        </p>
      </div>
    </section>
  );
};
