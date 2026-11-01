import React, { useState } from 'react';
import { MedicalReportAnalysis } from '../medicalTypes';

/* -------------------------------------------------------------
 * Medical Disclaimer Modal
 * ------------------------------------------------------------- */
interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">shield</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-slate-900 dark:text-white">
                Clinical Safety & Legal Disclaimer
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Regulatory Classification & Usage Boundaries
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <p>
            <strong>1. Decision Support Only:</strong> MediScan is engineered for clinical decision support, academic research, and medical report data extraction. It does not constitute independent medical practice.
          </p>
          <p>
            <strong>2. Physician Verification:</strong> All diagnostic predictions, therapeutic regimens, and drug dosages must be independently reviewed and verified by a licensed healthcare professional before clinical administration.
          </p>
          <p>
            <strong>3. Acute Emergencies:</strong> If a patient is experiencing acute chest discomfort, shortness of breath, altered mental status, or signs of stroke, immediately contact emergency services (911).
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            I Understand & Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * Export Printable Summary Modal
 * ------------------------------------------------------------- */
interface ExportSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: MedicalReportAnalysis;
}

export const ExportSummaryModal: React.FC<ExportSummaryModalProps> = ({
  isOpen,
  onClose,
  analysis,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateReportSummaryText = () => {
    return `=====================================================
MEDISCAN - CLINICAL REPORT & TREATMENT PREDICTION
Generated: ${new Date().toLocaleString()}
Report Type: ${analysis.reportType}
Patient: Age ${analysis.patientProfile.age || 'N/A'}, Sex ${analysis.patientProfile.sex || 'N/A'}
Setting: ${analysis.patientProfile.detectedSetting}
=====================================================

1. DIAGNOSTIC FINDINGS:
${analysis.diagnoses.map((d) => `- [${d.icdCode || 'ICD'}] ${d.condition} (Severity: ${d.severity}, Confidence: ${d.confidence}%)\n  Evidence: ${d.evidence}`).join('\n')}

2. CLINICAL SCORE ANALYSIS:
- Overall Severity Index: ${analysis.scoreAnalysis.overallSeverityScore}/100 (${analysis.scoreAnalysis.severityTier})
- Action Timeline: ${analysis.scoreAnalysis.urgencyTimeline}
- Diagnostic Confidence: ${analysis.scoreAnalysis.evidenceQualityScore}%
Calculated Clinical Indices:
${analysis.scoreAnalysis.clinicalScores.map((s) => `- ${s.name}: ${s.calculatedValue} [${s.riskCategory} Risk]\n  Meaning: ${s.clinicalMeaning}`).join('\n')}

3. DETECTED BIOMARKER VARIANCES:
${analysis.scoreAnalysis.biomarkerBreakdown.map((b) => `- ${b.markerName}: ${b.patientValue} (Ref: ${b.referenceRange}) [${b.status}]\n  Impact: ${b.clinicalImpact}`).join('\n')}

4. PREDICTED TREATMENT PROTOCOL:
First-Line Medications:
${analysis.treatmentPlan.firstLineMedications.map((m) => `- ${m.drugName} (${m.drugClass}): ${m.dosage} - ${m.frequencyAndRoute}\n  Rationale: ${m.rationale}\n  Guideline: ${m.guidelineRecommendation}`).join('\n')}

Lifestyle & Dietary Prescriptions:
${analysis.treatmentPlan.lifestyleAndDiet.map((l) => `- ${l}`).join('\n')}

CONTRAINDICATIONS TO AVOID:
${analysis.treatmentPlan.contraindicationsAndWarnings.map((w) => `[!] ${w}`).join('\n')}

MONITORING SCHEDULE:
${analysis.treatmentPlan.monitoringSchedule.map((m) => `- ${m}`).join('\n')}

EMERGENCY RED FLAGS:
${analysis.treatmentPlan.emergencyRedFlags.map((e) => `[!] ${e}`).join('\n')}
=====================================================`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateReportSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">print</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-xl text-slate-900 dark:text-white">
                Export Clinical Consultation Summary
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Formatted for Electronic Health Record (EHR) chart notes and print discharge
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
          {generateReportSummaryText()}
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">print</span>
            <span>Print Report</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleCopyText}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied to Clipboard' : 'Copy Full Summary'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
