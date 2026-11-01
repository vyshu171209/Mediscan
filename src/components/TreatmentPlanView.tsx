import React, { useState } from 'react';
import { TreatmentPlan } from '../medicalTypes';

interface TreatmentPlanViewProps {
  treatmentData: TreatmentPlan;
  patientFriendlySummary: string;
  isPatientMode: boolean;
}

export const TreatmentPlanView: React.FC<TreatmentPlanViewProps> = ({
  treatmentData,
  patientFriendlySummary,
  isPatientMode
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const {
    firstLineMedications,
    adjunctiveTherapies,
    lifestyleAndDiet,
    contraindicationsAndWarnings,
    monitoringSchedule,
    emergencyRedFlags,
  } = treatmentData;

  const handleCopyRegimen = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Patient Friendly Summary Callout */}
      {isPatientMode ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-headline font-bold text-lg">
            <span className="material-symbols-outlined text-2xl">family_restroom</span>
            <span>What These Results Mean For You (Plain Language Explanation)</span>
          </div>
          <div className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line">
            {patientFriendlySummary}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined text-emerald-600">verified_user</span>
            <span>
              Treatment predictions generated in concordance with international clinical practice guidelines (ADA, ACC/AHA, ATS, KDIGO, AASLD).
            </span>
          </div>
          <span className="font-bold text-emerald-700 dark:text-emerald-400">Class I / Grade A Focus</span>
        </div>
      )}

      {/* Primary First-Line Pharmacotherapy Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-xl">medication</span>
            <h3 className="font-headline text-xl font-bold text-slate-900 dark:text-white">
              First-Line Recommended Pharmacotherapy
            </h3>
          </div>
          <span className="text-xs text-slate-500">{firstLineMedications.length} targeted agents</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {firstLineMedications.map((med, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      {med.drugClass}
                    </span>
                    <h4 className="font-headline font-bold text-lg text-slate-900 dark:text-white mt-0.5">
                      {med.drugName}
                    </h4>
                  </div>
                  <button
                    onClick={() =>
                      handleCopyRegimen(
                        `${med.drugName} - ${med.dosage} (${med.frequencyAndRoute}). Rationale: ${med.rationale}`,
                        idx
                      )
                    }
                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Copy prescription details"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {copiedIndex === idx ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>

                {/* Dosage & Route Badge */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 mb-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Target Dosage
                    </span>
                    <span className="font-headline font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {med.dosage}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Frequency & Route
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {med.frequencyAndRoute}
                    </span>
                  </div>
                </div>

                {/* Rationale */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong className="text-slate-800 dark:text-slate-100">Mechanism: </strong>
                  {med.rationale}
                </p>
              </div>

              {/* Guideline Citation */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                <span className="material-symbols-outlined text-sm">menu_book</span>
                <span className="truncate">{med.guidelineRecommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contraindications & Absolute Safety Warnings */}
      <div className="p-6 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-rose-800 dark:text-rose-400 font-headline font-bold text-base">
          <span className="material-symbols-outlined text-xl">block</span>
          <span>Contraindications & High-Risk Interactions to Avoid</span>
        </div>
        <p className="text-xs text-rose-900/80 dark:text-rose-300/80">
          Based on the detected laboratory thresholds and renal/hepatic markers, the following medications present unacceptable toxicity or acute decompensation risks:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {contraindicationsAndWarnings.map((warning, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-rose-200 dark:border-rose-800/60 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2.5 leading-relaxed"
            >
              <span className="material-symbols-outlined text-rose-600 text-base shrink-0 mt-0.5">
                cancel
              </span>
              <span>{warning}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary & Lifestyle Therapies Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Adjunctive & Procedural Therapies */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-headline font-bold text-base text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-teal-600 text-xl">healing</span>
            <span>Adjunctive & Procedural Interventions</span>
          </div>
          <ul className="space-y-2.5">
            {adjunctiveTherapies.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
              >
                <span className="material-symbols-outlined text-teal-600 text-sm mt-0.5 shrink-0">
                  check_circle
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Evidence-Based Lifestyle & Nutrition */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-headline font-bold text-base text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-emerald-600 text-xl">nutrition</span>
            <span>Lifestyle & Nutritional Prescriptions</span>
          </div>
          <ul className="space-y-2.5">
            {lifestyleAndDiet.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
              >
                <span className="material-symbols-outlined text-emerald-600 text-sm mt-0.5 shrink-0">
                  eco
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Monitoring Schedule & Emergency Triggers */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Monitoring Timeline */}
        <div className="md:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-headline font-bold text-base text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-blue-600 text-xl">event_repeat</span>
            <span>Follow-Up Laboratory & Monitoring Timetable</span>
          </div>
          <div className="space-y-3">
            {monitoringSchedule.map((schedule, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300"
              >
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{schedule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Red Flags */}
        <div className="md:col-span-5 p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-headline font-bold text-base text-amber-900 dark:text-amber-300">
            <span className="material-symbols-outlined text-amber-600 text-xl">emergency</span>
            <span>Emergency Red Flags (Seek 911 / ER)</span>
          </div>
          <p className="text-[11px] text-amber-800 dark:text-amber-400">
            Immediate escalation required if any of these critical symptoms occur:
          </p>
          <ul className="space-y-2.5">
            {emergencyRedFlags.map((flag, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium"
              >
                <span className="material-symbols-outlined text-amber-600 text-sm mt-0.5 shrink-0">
                  warning
                </span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
