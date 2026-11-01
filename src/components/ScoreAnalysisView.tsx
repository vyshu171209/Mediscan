import React, { useState } from 'react';
import { ScoreAnalysis } from '../medicalTypes';

interface ScoreAnalysisViewProps {
  scoreData: ScoreAnalysis;
}

export const ScoreAnalysisView: React.FC<ScoreAnalysisViewProps> = ({ scoreData }) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'abnormal'>('abnormal');

  const {
    overallSeverityScore,
    severityTier,
    urgencyTimeline,
    evidenceQualityScore,
    clinicalScores,
    biomarkerBreakdown,
  } = scoreData;

  // Determine severity tier color styling
  const getSeverityStyle = (tier: string) => {
    switch (tier) {
      case 'Critical / Emergent':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/40',
          border: 'border-rose-200 dark:border-rose-800',
          text: 'text-rose-700 dark:text-rose-400',
          barColor: 'bg-rose-600',
          badgeBg: 'bg-rose-600 text-white',
          icon: 'warning',
        };
      case 'High Risk':
        return {
          bg: 'bg-orange-50 dark:bg-orange-950/40',
          border: 'border-orange-200 dark:border-orange-800',
          text: 'text-orange-700 dark:text-orange-400',
          barColor: 'bg-orange-500',
          badgeBg: 'bg-orange-500 text-white',
          icon: 'priority_high',
        };
      case 'Moderate Risk':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/40',
          border: 'border-amber-200 dark:border-amber-800',
          text: 'text-amber-700 dark:text-amber-400',
          barColor: 'bg-amber-500',
          badgeBg: 'bg-amber-500 text-white',
          icon: 'info',
        };
      default:
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/40',
          border: 'border-emerald-200 dark:border-emerald-800',
          text: 'text-emerald-700 dark:text-emerald-400',
          barColor: 'bg-emerald-500',
          badgeBg: 'bg-emerald-600 text-white',
          icon: 'check_circle',
        };
    }
  };

  const severityStyle = getSeverityStyle(severityTier);

  const displayedBiomarkers = biomarkerBreakdown.filter((b) => {
    if (filterStatus === 'all') return true;
    return b.status !== 'Normal';
  });

  return (
    <div className="space-y-8">
      {/* Top Multi-Dimensional Score Strip */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Overall Severity Index Card */}
        <div
          className={`md:col-span-8 p-6 sm:p-8 rounded-2xl border ${severityStyle.border} ${severityStyle.bg} flex flex-col justify-between shadow-xs`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Composite Clinical Severity Index
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="font-headline text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-white">
                  {overallSeverityScore}
                </span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">/ 100</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${severityStyle.badgeBg}`}>
                  {severityTier}
                </span>
              </div>
            </div>

            <div className="text-right sm:max-w-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Urgency & Action Timeline
              </span>
              <p className="font-headline font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
                {urgencyTimeline}
              </p>
            </div>
          </div>

          {/* Severity Progress Scale */}
          <div className="mt-6 space-y-2">
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full ${severityStyle.barColor} transition-all duration-700 ease-out`}
                style={{ width: `${Math.min(100, Math.max(5, overallSeverityScore))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              <span>0 (Normal / Minimal)</span>
              <span>25 (Mild)</span>
              <span>50 (Moderate)</span>
              <span>75 (High)</span>
              <span>100 (Critical Emergent)</span>
            </div>
          </div>
        </div>

        {/* Evidence Quality & Confidence Card */}
        <div className="md:col-span-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Diagnostic Confidence
              </span>
              <span className="material-symbols-outlined text-emerald-600 text-xl">verified</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-4xl font-extrabold text-slate-900 dark:text-white">
                {evidenceQualityScore}%
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">High Evidence</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Based on concordance across biochemical markers, reference ranges, and guideline-validated scoring systems.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Clinical Rule Engine</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">Evidence System</span>
          </div>
        </div>
      </div>

      {/* Standard Clinical Calculators Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600">calculate</span>
            <h3 className="font-headline text-xl font-bold text-slate-900 dark:text-white">
              Validated Clinical Calculators
            </h3>
          </div>
          <span className="text-xs text-slate-500">Automated derivation from report findings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clinicalScores.map((score, idx) => {
            const isHigh = score.riskCategory === 'High' || score.riskCategory === 'Critical';
            const isIntermediate = score.riskCategory === 'Intermediate' || score.riskCategory === 'Elevated';
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-headline font-bold text-sm text-slate-800 dark:text-slate-100">
                      {score.name}
                    </h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isHigh
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                          : isIntermediate
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                          : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                      }`}
                    >
                      {score.riskCategory}
                    </span>
                  </div>

                  <div className="font-headline text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {score.calculatedValue}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {score.clinicalMeaning}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                  <span className="material-symbols-outlined text-sm">fact_check</span>
                  <span>Validated Clinical Algorithm</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Biomarker Breakdown & Out-of-Range Radar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs space-y-0">
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-headline text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">biotech</span>
              <span>Detected Biomarkers & Lab Variances</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Identified laboratory values compared against standard adult reference thresholds.
            </p>
          </div>

          {/* Filter toggle */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setFilterStatus('abnormal')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterStatus === 'abnormal'
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Abnormal Only ({biomarkerBreakdown.filter((b) => b.status !== 'Normal').length})
            </button>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All Biomarkers ({biomarkerBreakdown.length})
            </button>
          </div>
        </div>

        {/* Biomarkers Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-6">Biomarker</th>
                <th className="py-3 px-6">Reported Value</th>
                <th className="py-3 px-6">Reference Range</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Clinical Pathophysiology</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedBiomarkers.map((item, idx) => {
                const isCritical = item.status.includes('Critical');
                const isAbnormal = item.status !== 'Normal';
                return (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors"
                  >
                    <td className="py-3.5 px-6 font-bold text-slate-800 dark:text-slate-100">
                      {item.markerName}
                    </td>
                    <td className="py-3.5 px-6 font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {item.patientValue}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-slate-500 dark:text-slate-400">
                      {item.referenceRange}
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isCritical
                            ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                            : isAbnormal
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                      {item.clinicalImpact}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
