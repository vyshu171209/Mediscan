import React, { useState } from 'react';
import { TreatmentFeedback } from '../medicalTypes';

interface TreatmentFeedbackSectionProps {
  savedFeedback?: TreatmentFeedback;
  onSaveFeedback: (feedback: TreatmentFeedback) => void;
  reportTitle?: string;
}

export const TreatmentFeedbackSection: React.FC<TreatmentFeedbackSectionProps> = ({
  savedFeedback,
  onSaveFeedback,
  reportTitle,
}) => {
  const [overallRating, setOverallRating] = useState<number>(savedFeedback?.overallRating || 5);
  const [effectivenessRating, setEffectivenessRating] = useState<number>(savedFeedback?.effectivenessRating || 5);
  const [toleranceStatus, setToleranceStatus] = useState<TreatmentFeedback['toleranceStatus']>(
    savedFeedback?.toleranceStatus || 'Well Tolerated'
  );
  const [adherencePercentage, setAdherencePercentage] = useState<number>(savedFeedback?.adherencePercentage || 95);
  const [symptomsImproved, setSymptomsImproved] = useState<boolean>(
    savedFeedback?.symptomsImproved !== undefined ? savedFeedback.symptomsImproved : true
  );
  const [clinicianComments, setClinicianComments] = useState<string>(
    savedFeedback?.clinicianComments || 'Patient initiated on protocol; vitals and renal panels remain stable.'
  );
  const [patientComments, setPatientComments] = useState<string>(
    savedFeedback?.patientComments || 'Routine easy to follow with daily pill organizer. Symptoms noticeably improved.'
  );
  const [recommendedFollowUp, setRecommendedFollowUp] = useState<string>(
    savedFeedback?.recommendedFollowUpAction || 'Continue maintenance therapy and repeat CMP in 60 days.'
  );
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(!!savedFeedback);
  const [justSaved, setJustSaved] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: TreatmentFeedback = {
      id: `feedback-${Date.now()}`,
      submittedAt: new Date().toLocaleString(),
      overallRating,
      effectivenessRating,
      toleranceStatus,
      adherencePercentage,
      symptomsImproved,
      clinicianComments,
      patientComments,
      recommendedFollowUpAction: recommendedFollowUp,
    };
    onSaveFeedback(newFeedback);
    setFeedbackSubmitted(true);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 3000);
  };

  return (
    <section id="feedback-section" className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
      {/* Decorative accent background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
              Post-Intervention Review
            </span>
            {reportTitle && (
              <span className="text-xs text-slate-400 truncate max-w-xs">
                Case: {reportTitle}
              </span>
            )}
          </div>
          <h3 className="font-headline text-2xl font-bold mt-2 text-white flex items-center gap-2.5">
            <span className="material-symbols-outlined text-emerald-400 text-2xl">rate_review</span>
            <span>End-of-Treatment Outcome &amp; Clinical Feedback</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate treatment efficacy, patient tolerability, compliance, and recommendations. All feedback integrates into the exported clinical chart.
          </p>
        </div>

        {feedbackSubmitted && !justSaved && (
          <div className="flex items-center gap-2 bg-emerald-950/70 border border-emerald-800 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-300">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>Outcome Logged to Record</span>
          </div>
        )}

        {justSaved && (
          <div className="flex items-center gap-2 bg-emerald-500 text-slate-950 px-3.5 py-1.5 rounded-xl text-xs font-bold animate-bounce">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>Feedback Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-6">
        {/* Ratings & Key Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Overall Rating */}
          <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
              Treatment Protocol Quality
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setOverallRating(star)}
                  className={`text-xl transition-transform hover:scale-110 cursor-pointer ${
                    star <= overallRating ? 'text-amber-400' : 'text-slate-600'
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="text-xs font-bold text-slate-300 ml-2">{overallRating}/5</span>
            </div>
            <p className="text-[10px] text-slate-400">Clinical guideline appropriateness</p>
          </div>

          {/* Effectiveness Rating */}
          <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
              Therapeutic Efficacy
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setEffectivenessRating(star)}
                  className={`text-xl transition-transform hover:scale-110 cursor-pointer ${
                    star <= effectivenessRating ? 'text-emerald-400' : 'text-slate-600'
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="text-xs font-bold text-slate-300 ml-2">{effectivenessRating}/5</span>
            </div>
            <p className="text-[10px] text-slate-400">Target biomarker resolution</p>
          </div>

          {/* Tolerability Selector */}
          <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
              Patient Tolerability
            </label>
            <select
              value={toleranceStatus}
              onChange={(e) => setToleranceStatus(e.target.value as any)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="Well Tolerated">Well Tolerated (Zero side effects)</option>
              <option value="Mild Side Effects">Mild Side Effects (Self-limiting)</option>
              <option value="Moderate Intolerance">Moderate Intolerance</option>
              <option value="Dose Modification Needed">Dose Modification Needed</option>
            </select>
            <p className="text-[10px] text-slate-400">Reported adverse profile</p>
          </div>

          {/* Adherence Slider */}
          <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Treatment Adherence
              </label>
              <span className="text-xs font-bold text-emerald-400">{adherencePercentage}%</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              step={5}
              value={adherencePercentage}
              onChange={(e) => setAdherencePercentage(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">Compliance with daily schedule</p>
          </div>
        </div>

        {/* Symptoms Checklist */}
        <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-850 border border-slate-800 cursor-pointer select-none hover:border-slate-700 transition-colors">
          <input
            type="checkbox"
            checked={symptomsImproved}
            onChange={(e) => setSymptomsImproved(e.target.checked)}
            className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
          />
          <span className="text-xs sm:text-sm text-slate-200">
            <strong>Patient Symptom Resolution Confirmed: </strong>
            Patient reports tangible clinical symptom alleviation, improved physical functioning, and biomarker stability under this protocol.
          </span>
        </label>

        {/* Comments: Clinician & Patient */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-emerald-400">stethoscope</span>
              <span>Physician / Clinician Notes</span>
            </label>
            <textarea
              rows={3}
              value={clinicianComments}
              onChange={(e) => setClinicianComments(e.target.value)}
              placeholder="Enter physician observations, laboratory response, and titration plan..."
              className="w-full p-3 rounded-xl border border-slate-700 bg-slate-850 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-teal-400">person</span>
              <span>Patient Direct Feedback &amp; Experience</span>
            </label>
            <textarea
              rows={3}
              value={patientComments}
              onChange={(e) => setPatientComments(e.target.value)}
              placeholder="Patient's experience, medication ease of use, or lifestyle challenges..."
              className="w-full p-3 rounded-xl border border-slate-700 bg-slate-850 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Recommended Follow-up Action */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-emerald-400">event_repeat</span>
            <span>Recommended Next Clinical Step</span>
          </label>
          <select
            value={recommendedFollowUp}
            onChange={(e) => setRecommendedFollowUp(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-700 bg-slate-850 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="Continue maintenance therapy and repeat CMP in 60 days.">
              Continue maintenance therapy and repeat comprehensive metabolic panel in 60 days
            </option>
            <option value="Titrate primary dose upward in 4 weeks after renal and electrolyte check.">
              Titrate primary dose upward in 4 weeks after renal and electrolyte check
            </option>
            <option value="Step down therapy; target biomarker remission and normalization achieved.">
              Step down therapy; target biomarker remission and normalization achieved
            </option>
            <option value="Schedule urgent specialist consultation (Nephrology / Cardiology).">
              Schedule urgent specialist consultation (Nephrology / Cardiology)
            </option>
          </select>
        </div>

        {/* Submit Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <span className="text-[11px] text-slate-400">
            {savedFeedback?.submittedAt
              ? `Last updated on ${savedFeedback.submittedAt}`
              : 'Feedback will be permanently appended to patient report export.'}
          </span>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-headline font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-base">save_as</span>
            <span>{feedbackSubmitted ? 'Update Recorded Feedback' : 'Submit Feedback & Log to Chart'}</span>
          </button>
        </div>
      </form>
    </section>
  );
};
