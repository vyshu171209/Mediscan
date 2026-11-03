import React, { useState } from 'react';
import { TreatmentPlan, PatientPreferences } from '../medicalTypes';
import { LiveDemoSection } from './LiveDemoSection';

interface TreatmentPlanViewProps {
  treatmentData: TreatmentPlan;
  patientFriendlySummary: string;
  isPatientMode: boolean;
  onOpenLiveDemo?: () => void;
  reportTitle?: string;
}

type TreatmentViewMode = 'standard' | 'tailored' | 'simulation';

export const TreatmentPlanView: React.FC<TreatmentPlanViewProps> = ({
  treatmentData,
  patientFriendlySummary,
  isPatientMode,
  onOpenLiveDemo,
  reportTitle,
}) => {
  const [viewMode, setViewMode] = useState<TreatmentViewMode>('standard');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // --------------------------------------------------------------------------
  // Patient Preferences & Advice Customization State
  // --------------------------------------------------------------------------
  const [preferences, setPreferences] = useState<PatientPreferences>({
    preferredRoute: 'oral_only',
    costBudget: 'value_optimized',
    dietaryCapacity: 'moderate_balanced',
    activityLevel: 'moderate_walk',
    monitoringMethod: 'home_digital_cgm',
  });
  const [isPlanCustomized, setIsPlanCustomized] = useState(false);

  // Compute adherence probability index dynamically
  const adherenceScore = Math.min(
    98,
    80 +
      (preferences.preferredRoute === 'oral_only' ? 8 : 4) +
      (preferences.costBudget === 'standard_generic' ? 8 : 5) +
      (preferences.dietaryCapacity === 'moderate_balanced' ? 6 : 4)
  );

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
    <div id="treatment-plan-section" className="space-y-8">
      {/* Patient Friendly Summary Callout */}
      {isPatientMode && (
        <div className="p-6 sm:p-8 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-headline font-bold text-lg">
            <span className="material-symbols-outlined text-2xl">family_restroom</span>
            <span>What These Results Mean For You (Plain Language Explanation)</span>
          </div>
          <div className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line">
            {patientFriendlySummary}
          </div>
        </div>
      )}

      {/* Segmented Mode Selector & Quick Doctor Call Launcher */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-slate-100 dark:bg-slate-850 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5 flex-1">
          <button
            onClick={() => setViewMode('standard')}
            className={`flex-1 py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              viewMode === 'standard'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">clinical_notes</span>
            <span>Standard Protocol</span>
          </button>

          <button
            onClick={() => setViewMode('tailored')}
            className={`flex-1 py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              viewMode === 'tailored'
                ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">tune</span>
            <span>Plan by Patient Advice</span>
            <span className="text-[10px] bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 px-1.5 py-0.2 rounded-full font-bold">
              Tailored
            </span>
          </button>

          <button
            onClick={() => setViewMode('simulation')}
            className={`flex-1 py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              viewMode === 'simulation'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">timeline</span>
            <span>4-Phase Simulation</span>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.2 rounded-full font-bold">
              Active
            </span>
          </button>
        </div>

        {onOpenLiveDemo && (
          <button
            onClick={onOpenLiveDemo}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-emerald-600/20 active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-base">video_call</span>
            <span>Direct Doctor Video Call</span>
          </button>
        )}
      </div>

      {/* VIEW: 4-PHASE SIMULATION */}
      {viewMode === 'simulation' && (
        <LiveDemoSection
          treatmentData={treatmentData}
          reportTitle={reportTitle}
        />
      )}

      {/* =========================================================================
          VIEW 1: PLAN BASED ON PATIENT ADVICE & PREFERENCES
          ========================================================================= */}
      {viewMode === 'tailored' && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-600 text-xl">tune</span>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Shared Clinical Decision Making
                </span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Customize Regimen Based on Patient Advice &amp; Lifestyle
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Tailor administration route, medication budget tier, and lifestyle constraints to optimize compliance.
              </p>
            </div>

            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Predicted Adherence</span>
              <div className="font-headline font-extrabold text-2xl text-emerald-600 dark:text-emerald-400">
                {adherenceScore}%
              </div>
            </div>
          </div>

          {/* Preferences Form Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preference 1: Administration Route */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Patient Administration Preference
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPreferences((p) => ({ ...p, preferredRoute: 'oral_only' }));
                    setIsPlanCustomized(true);
                  }}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    preferences.preferredRoute === 'oral_only'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-base">pill</span>
                    <span>Oral Pills Only</span>
                  </div>
                  <span className="text-[10px] font-normal text-slate-500">Prefers zero injections</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPreferences((p) => ({ ...p, preferredRoute: 'injectable_ok' }));
                    setIsPlanCustomized(true);
                  }}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    preferences.preferredRoute === 'injectable_ok'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-base">vaccines</span>
                    <span>Injectables Acceptable</span>
                  </div>
                  <span className="text-[10px] font-normal text-slate-500">Weekly GLP-1 / SubQ is fine</span>
                </button>
              </div>
            </div>

            {/* Preference 2: Budget & Copay Sensitivity */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Medication Budget &amp; Copay Tier
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPreferences((p) => ({ ...p, costBudget: 'standard_generic' }));
                    setIsPlanCustomized(true);
                  }}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    preferences.costBudget === 'standard_generic'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-base">savings</span>
                    <span>Low-Copay Generics</span>
                  </div>
                  <span className="text-[10px] font-normal text-slate-500">&lt;$25/month focus</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPreferences((p) => ({ ...p, costBudget: 'value_optimized' }));
                    setIsPlanCustomized(true);
                  }}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    preferences.costBudget === 'value_optimized'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-base">health_and_safety</span>
                    <span>Guideline Comprehensive</span>
                  </div>
                  <span className="text-[10px] font-normal text-slate-500">Prioritize organ protection</span>
                </button>
              </div>
            </div>

            {/* Preference 3: Dietary Adherence Readiness */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Dietary Transition Readiness
              </label>
              <select
                value={preferences.dietaryCapacity}
                onChange={(e) => {
                  setPreferences((p) => ({ ...p, dietaryCapacity: e.target.value as any }));
                  setIsPlanCustomized(true);
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="strict_dash">Strict DASH / Renal-Mediterranean Diet (Immediate switch)</option>
                <option value="moderate_balanced">Moderate Balanced Progression (Gradual sodium &amp; carb drop)</option>
                <option value="lifestyle_coached">Dietitian-Guided Coaching Pathway</option>
              </select>
            </div>

            {/* Preference 4: Monitoring Modality */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Self-Monitoring Preference
              </label>
              <select
                value={preferences.monitoringMethod}
                onChange={(e) => {
                  setPreferences((p) => ({ ...p, monitoringMethod: e.target.value as any }));
                  setIsPlanCustomized(true);
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="home_digital_cgm">Home Continuous Sensor / Bluetooth Blood Pressure Cuff</option>
                <option value="fingerstick_manual">Standard Manual Blood Pressure &amp; Fingerstick Log</option>
                <option value="clinic_visits_only">In-Clinic Surveillance Only</option>
              </select>
            </div>
          </div>

          {/* Adapted Regimen Output */}
          <div className="p-6 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-600 text-xl">recommend</span>
                <h4 className="font-headline font-bold text-base text-teal-900 dark:text-teal-200">
                  Personalized Regimen Adaptation (Based on Patient Input)
                </h4>
              </div>
              <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/50 px-2.5 py-0.5 rounded-full">
                Active Adaptation
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-850 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">Pharmacotherapy Adjustment:</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {preferences.preferredRoute === 'oral_only'
                    ? 'Selected once-daily oral SGLT2 inhibitor (Empagliflozin 10mg) + oral biguanide with dinner; deferred injectable GLP-1 RA based on patient preference.'
                    : 'Incorporated once-weekly injectable GLP-1 receptor agonist (Semaglutide 0.25mg) to leverage dual cardioprotective and weight-reduction benefits.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-850 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">Monitoring &amp; Lifestyle Plan:</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {preferences.monitoringMethod === 'home_digital_cgm'
                    ? 'Prescribed 14-day continuous glucose sensor for real-time glycemic variability review without painful routine fingersticks.'
                    : 'Scheduled bi-weekly clinic vitals verification and monthly nurse check-ins.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          VIEW 2: STANDARD CLINICAL GUIDELINE PROTOCOL
          ========================================================================= */}
      {viewMode === 'standard' && (
        <section className="space-y-8">
          {/* Section: First-Line Pharmacotherapy */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-headline text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  First-Line Guideline Pharmacotherapy
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Targeted pharmacotherapy selected based on laboratory biomarkers and clinical practice guidelines.
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full self-start sm:self-auto">
                {firstLineMedications.length} Regimens Indicated
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {firstLineMedications.map((med, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-headline font-bold text-base text-slate-900 dark:text-white">
                          {med.drugName}
                        </h4>
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          {med.drugClass}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {med.frequencyAndRoute}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 text-xs">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Target Dosage</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{med.dosage}</span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                      <strong className="text-slate-800 dark:text-slate-200">Clinical Rationale: </strong>
                      {med.rationale}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined text-sm text-teal-600">verified</span>
                      <span className="text-[11px] font-medium">{med.guidelineRecommendation}</span>
                    </div>

                    <button
                      onClick={() =>
                        handleCopyRegimen(
                          `${med.drugName} (${med.dosage}, ${med.frequencyAndRoute}) - ${med.rationale}`,
                          idx
                        )
                      }
                      className="text-[11px] font-bold text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copiedIndex === idx ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Adjunctive Therapies */}
          {adjunctiveTherapies && adjunctiveTherapies.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-headline text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Adjunctive &amp; Second-Line Considerations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adjunctiveTherapies.map((adj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-start gap-2.5"
                  >
                    <span className="material-symbols-outlined text-teal-600 text-base mt-0.5 shrink-0">
                      add_circle
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{adj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contraindications & Safety Warnings */}
          <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-4">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-headline font-bold text-base">
              <span className="material-symbols-outlined text-xl">block</span>
              <span>Contraindications &amp; Drug-Lab Toxicity Alerts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contraindicationsAndWarnings.map((warning, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800/80 text-xs text-rose-900 dark:text-rose-200 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="material-symbols-outlined text-rose-600 text-base mt-0.5 shrink-0">
                    dangerous
                  </span>
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Lifestyle, Monitoring & Red Flags */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lifestyle & Nutrition */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 font-headline font-bold text-sm text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-emerald-600">nutrition</span>
                <span>Dietary &amp; Lifestyle Directives</span>
              </div>
              <ul className="space-y-2">
                {lifestyleAndDiet.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed"
                  >
                    <span className="material-symbols-outlined text-emerald-600 text-sm mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Monitoring Schedule */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 font-headline font-bold text-sm text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-teal-600">calendar_clock</span>
                <span>Surveillance &amp; Lab Monitoring</span>
              </div>
              <ul className="space-y-2">
                {monitoringSchedule.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed"
                  >
                    <span className="material-symbols-outlined text-teal-600 text-sm mt-0.5 shrink-0">
                      schedule
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Emergency Red Flags */}
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-3">
              <div className="flex items-center gap-2 font-headline font-bold text-sm text-amber-900 dark:text-amber-300">
                <span className="material-symbols-outlined text-amber-600">emergency</span>
                <span>Emergency Red Flags (Seek 911 / ER)</span>
              </div>
              <p className="text-[11px] text-amber-800 dark:text-amber-400">
                Immediate clinical escalation required if any of these critical symptoms occur:
              </p>
              <ul className="space-y-2">
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
        </section>
      )}
    </div>
  );
};
