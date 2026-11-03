import React, { useState } from 'react';
import { TreatmentPlan } from '../medicalTypes';
import { TreatmentPlanView } from './TreatmentPlanView';
import { LiveDoctorConsultDemo } from './LiveDoctorConsultDemo';

interface LiveDemoOrPlanViewProps {
  treatmentData: TreatmentPlan;
  patientFriendlySummary: string;
  isPatientMode: boolean;
  reportTitle?: string;
  defaultSubView?: 'plan' | 'doctor';
}

export const LiveDemoOrPlanView: React.FC<LiveDemoOrPlanViewProps> = ({
  treatmentData,
  patientFriendlySummary,
  isPatientMode,
  reportTitle,
  defaultSubView = 'plan',
}) => {
  const [subView, setSubView] = useState<'plan' | 'doctor'>(defaultSubView);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
              Clinical Therapy
            </span>
            {reportTitle && (
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">
                Case: {reportTitle}
              </span>
            )}
          </div>
          <h2 className="font-headline text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {subView === 'plan' ? 'Predicted Clinical Treatment Plan' : 'Live Doctor Consultation Demo'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {subView === 'plan'
              ? 'Guideline-directed pharmacotherapy protocol & shared patient advice adaptations.'
              : 'Direct case review and second-opinion signoff with an attending medical specialist.'}
          </p>
        </div>

        {/* View Switcher Buttons */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-850 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setSubView('plan')}
            className={`py-2 px-4 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              subView === 'plan'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">medication</span>
            <span>Predicted Treatment Plan</span>
          </button>

          <button
            onClick={() => setSubView('doctor')}
            className={`py-2 px-4 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              subView === 'doctor'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">video_call</span>
            <span>Live Doctor Consult Demo</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                subView === 'doctor' ? 'bg-white/20 text-white' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
              }`}
            >
              Direct
            </span>
          </button>
        </div>
      </div>

      {/* Selected View Content */}
      {subView === 'plan' ? (
        <TreatmentPlanView
          treatmentData={treatmentData}
          patientFriendlySummary={patientFriendlySummary}
          isPatientMode={isPatientMode}
          onOpenLiveDemo={() => setSubView('doctor')}
          reportTitle={reportTitle}
        />
      ) : (
        <LiveDoctorConsultDemo
          treatmentData={treatmentData}
          reportTitle={reportTitle}
        />
      )}
    </div>
  );
};
