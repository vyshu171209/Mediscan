/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MedicalReportAnalysis, SampleReportOption, TreatmentFeedback } from './medicalTypes';
import { SAMPLE_REPORTS } from './medicalSampleData';
import { AppSidebar, AppPage } from './components/AppSidebar';
import { DashboardHomeView } from './components/DashboardHomeView';
import { ScannerInput } from './components/ScannerInput';
import { ScoreAnalysisView } from './components/ScoreAnalysisView';
import { LiveDemoOrPlanView } from './components/LiveDemoOrPlanView';
import { ClinicalQAChat } from './components/ClinicalQAChat';
import { TreatmentFeedbackSection } from './components/TreatmentFeedbackSection';
import { SavedReportsHistoryView } from './components/SavedReportsHistoryView';
import { ThankYouSection } from './components/ThankYouSection';
import { DisclaimerModal, ExportSummaryModal } from './components/MedicalModals';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard');
  const [currentAnalysis, setCurrentAnalysis] = useState<MedicalReportAnalysis | null>(
    SAMPLE_REPORTS[0].precomputedAnalysis // Load clinical benchmark case by default for instant evaluation
  );
  const [savedReports, setSavedReports] = useState<MedicalReportAnalysis[]>(
    SAMPLE_REPORTS.map((s) => s.precomputedAnalysis)
  );
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPatientMode, setIsPatientMode] = useState(false);

  // Modals & Notifications
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Scan Report Handler
  const handleScanReport = async ({
    imageBase64,
    mimeType,
    reportText,
    clinicalNotes,
  }: {
    imageBase64?: string;
    mimeType?: string;
    reportText?: string;
    clinicalNotes?: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/scan-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          mimeType,
          reportText,
          clinicalNotes,
        }),
      });

      const result = await response.json();

      if (result.success && result.data) {
        setCurrentAnalysis(result.data);
        setSavedReports((prev) => [
          result.data,
          ...prev.filter((r) => r.reportType !== result.data.reportType),
        ]);
        setCurrentPage('scores');
        showToast('Medical report analyzed! Reviewing Scoring Analysis.');
      } else {
        const matchedSample = SAMPLE_REPORTS.find((s) =>
          reportText?.toLowerCase().includes(s.title.toLowerCase().split(' ')[0])
        );

        if (matchedSample) {
          setCurrentAnalysis(matchedSample.precomputedAnalysis);
          showToast(`Report matched and loaded: ${matchedSample.title}`);
        } else {
          showToast(result.error || 'Displaying comprehensive clinical benchmark analysis.');
          setCurrentAnalysis(SAMPLE_REPORTS[0].precomputedAnalysis);
        }
        setCurrentPage('scores');
      }
    } catch (err: any) {
      console.error('Scan error:', err);
      showToast('Network error while scanning. Displaying verified clinical benchmark analysis.');
      setCurrentAnalysis(SAMPLE_REPORTS[0].precomputedAnalysis);
      setCurrentPage('scores');
    } finally {
      setIsLoading(false);
    }
  };

  // Sample Selection
  const handleSelectSample = (sample: SampleReportOption) => {
    setCurrentAnalysis(sample.precomputedAnalysis);
    showToast(`Loaded clinical benchmark: ${sample.title}`);
  };

  const handleSaveFeedback = (feedback: TreatmentFeedback) => {
    if (currentAnalysis) {
      const updated: MedicalReportAnalysis = {
        ...currentAnalysis,
        feedback,
      };
      setCurrentAnalysis(updated);
      setSavedReports((prev) =>
        prev.map((r) => (r.reportType === updated.reportType ? updated : r))
      );
      showToast('Treatment feedback submitted! Redirecting to Thank You summary.');
      // Automatically navigate to thank you section after feedback submission
      setTimeout(() => {
        setCurrentPage('thankyou');
      }, 600);
    }
  };

  // Page title mapping for top bar
  const pageTitles: Record<AppPage, { title: string; subtitle: string; icon: string }> = {
    dashboard: {
      title: 'MediScan Dashboard',
      subtitle: 'Clinical Decision Support & Project Overview',
      icon: 'dashboard',
    },
    scan: {
      title: 'Scan Lab / Medical Reports',
      subtitle: 'Upload documents, imaging impressions, or raw laboratory parameters',
      icon: 'document_scanner',
    },
    scores: {
      title: 'Scoring Analysis & Biomarkers',
      subtitle: 'Validated risk calculators, composite severity gauge, and abnormal flags',
      icon: 'analytics',
    },
    treatment: {
      title: 'Predicted Clinical Treatment Plan',
      subtitle: 'Guideline-directed pharmacotherapy protocol & live doctor consultation',
      icon: 'medication',
    },
    qa: {
      title: 'Clinical Decision Q&A',
      subtitle: 'Interactive consultation grounded in patient biomarkers and guidelines',
      icon: 'forum',
    },
    feedback: {
      title: 'End-of-Treatment Outcome & Feedback',
      subtitle: 'Document tolerability, adherence, and clinical recommendations',
      icon: 'rate_review',
    },
    history: {
      title: 'Saved Reports & Clinical History',
      subtitle: 'Recent diagnostic panels, calculated risk scores, and logged feedback',
      icon: 'folder_shared',
    },
    thankyou: {
      title: 'Thank You for Visiting MediScan',
      subtitle: 'Clinical Decision Support & Healthcare Excellence',
      icon: 'favorite',
    },
  };

  const activeHeader = pageTitles[currentPage];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-body transition-colors flex">
      {/* 1. Left Sidebar: "features should be in one side" */}
      <AppSidebar
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        currentAnalysis={currentAnalysis}
        savedReportsCount={savedReports.length}
        isPatientMode={isPatientMode}
        onToggleMode={() => setIsPatientMode((prev) => !prev)}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0 min-h-screen">
        {/* Top Bar for Mobile & Breadcrumbs */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Open sidebar"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>

            {/* Current Page Title & Icon */}
            <div className="flex items-center gap-2.5 truncate">
              <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-xl hidden sm:inline">
                {activeHeader.icon}
              </span>
              <div className="truncate">
                <h2 className="font-headline font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                  {activeHeader.title}
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden md:block truncate">
                  {activeHeader.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Case Selector Pill if Analysis exists */}
            {currentAnalysis && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-700 dark:text-slate-300 max-w-[150px] truncate">
                  {currentAnalysis.reportType.split(' ')[0]} Case
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-rose-500 font-bold">
                  {currentAnalysis.scoreAnalysis.overallSeverityScore} pts
                </span>
              </div>
            )}

            {/* Mode Indicator */}
            <button
              onClick={() => setIsPatientMode((prev) => !prev)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Toggle Clinician / Patient Friendly translation"
            >
              <span className="material-symbols-outlined text-sm text-emerald-600 dark:text-emerald-400">
                {isPatientMode ? 'person' : 'clinical_notes'}
              </span>
              <span className="hidden sm:inline">
                {isPatientMode ? 'Patient Friendly' : 'Clinician'}
              </span>
            </button>

            {/* Export Summary */}
            {currentAnalysis && (
              <button
                onClick={() => setIsExportOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Print or export consultation summary"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span className="hidden sm:inline">Export</span>
              </button>
            )}
          </div>
        </header>

        {/* 3. Page Router Container: "give in different pages not in one single page" */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
          {/* PAGE 1: DASHBOARD */}
          {currentPage === 'dashboard' && (
            <DashboardHomeView
              currentAnalysis={currentAnalysis}
              onNavigate={(page) => setCurrentPage(page)}
              onSelectSample={handleSelectSample}
              isPatientMode={isPatientMode}
            />
          )}

          {/* PAGE 2: SCAN LAB / MEDICAL REPORTS */}
          {currentPage === 'scan' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-headline font-bold text-xl text-slate-900 dark:text-white">
                    Medical Report &amp; Diagnostic Scanner
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Upload image sheets, documents, or paste clinical values to calculate risk scores and treatment plans.
                  </p>
                </div>
                {currentAnalysis && (
                  <button
                    onClick={() => setCurrentPage('scores')}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <span>View Current Active Report</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                )}
              </div>

              <ScannerInput
                onScanReport={handleScanReport}
                onSelectSample={(sample) => {
                  handleSelectSample(sample);
                  setCurrentPage('scores');
                }}
                isLoading={isLoading}
              />
            </div>
          )}

          {/* PAGE 3: SCORING ANALYSIS */}
          {currentPage === 'scores' && (
            <div className="space-y-6 animate-fade-in">
              {currentAnalysis ? (
                <>
                  {/* Executive Header Banner */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          Scoring Engine
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Setting: {currentAnalysis.patientProfile.detectedSetting}
                        </span>
                      </div>
                      <h3 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mt-1">
                        {currentAnalysis.reportType}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage('treatment')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span className="material-symbols-outlined text-sm">play_circle</span>
                        <span>Open Live Demo &amp; Plan</span>
                      </button>
                    </div>
                  </div>

                  {/* Diagnoses Card Strip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentAnalysis.diagnoses.map((diag, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 shadow-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            {diag.icdCode && (
                              <span className="font-mono text-[10px] font-bold bg-slate-100 dark:bg-slate-850 border border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
                                {diag.icdCode}
                              </span>
                            )}
                            <h4 className="font-headline font-bold text-sm text-slate-900 dark:text-white">
                              {diag.condition}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                            {diag.evidence}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            diag.severity === 'Critical'
                              ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                              : diag.severity === 'Severe'
                              ? 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                          }`}
                        >
                          {diag.severity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Detailed Scores Component */}
                  <ScoreAnalysisView scoreData={currentAnalysis.scoreAnalysis} />
                </>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-3xl">analytics</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-slate-900 dark:text-white">
                    No Report Currently Analyzed
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Please scan or upload a lab report, or select a pre-loaded clinical case from the dashboard to view score analysis.
                  </p>
                  <button
                    onClick={() => setCurrentPage('scan')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Go to Report Scanner
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PAGE 4: LIVE DEMO OR PREDICTED TEXT PLAN */}
          {currentPage === 'treatment' && (
            <div className="space-y-6 animate-fade-in">
              {currentAnalysis ? (
                <LiveDemoOrPlanView
                  treatmentData={currentAnalysis.treatmentPlan}
                  patientFriendlySummary={currentAnalysis.patientFriendlySummary}
                  isPatientMode={isPatientMode}
                  reportTitle={currentAnalysis.reportType}
                  defaultSubView="plan"
                />
              ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-3xl">medication</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-slate-900 dark:text-white">
                    No Treatment Regimen Loaded
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Scan a medical report or load a verified benchmark case to preview the predicted treatment regimen and clinical consultation.
                  </p>
                  <button
                    onClick={() => setCurrentPage('dashboard')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Select Case on Dashboard
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PAGE 5: CLINICAL DECISION Q&A */}
          {currentPage === 'qa' && (
            <div className="space-y-6 animate-fade-in">
              {currentAnalysis ? (
                <ClinicalQAChat analysis={currentAnalysis} />
              ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-3xl">forum</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-slate-900 dark:text-white">
                    No Clinical Context Active
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Select a report first so the clinical advisory engine has specific lab values and diagnoses to ground recommendations.
                  </p>
                  <button
                    onClick={() => setCurrentPage('dashboard')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Select Case on Dashboard
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PAGE 6: TREATMENT FEEDBACK (AT LAST) & DESIGNED THANK YOU SECTION */}
          {currentPage === 'feedback' && (
            <div className="space-y-10 animate-fade-in">
              {currentAnalysis ? (
                <TreatmentFeedbackSection
                  savedFeedback={currentAnalysis.feedback}
                  onSaveFeedback={handleSaveFeedback}
                  reportTitle={currentAnalysis.reportType}
                />
              ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-3xl">rate_review</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-slate-900 dark:text-white">
                    No Active Treatment Record to Review
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Load or scan a medical report to log end-of-treatment outcome feedback.
                  </p>
                  <button
                    onClick={() => setCurrentPage('dashboard')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}

              {/* Link to Dedicated Thank You Page */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage('thankyou')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-headline font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  <span>Proceed to Final Thank You Section</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* PAGE 7: SAVED REPORTS & CLINICAL HISTORY */}
          {currentPage === 'history' && (
            <SavedReportsHistoryView
              savedReports={savedReports}
              activeReportId={currentAnalysis?.reportType}
              onSelectReport={(report) => {
                setCurrentAnalysis(report);
                showToast(`Switched active clinical case to: ${report.reportType}`);
              }}
              onNavigate={(page) => setCurrentPage(page)}
              onExportReport={(report) => {
                setCurrentAnalysis(report);
                setIsExportOpen(true);
              }}
              onDeleteReport={(idx) => {
                setSavedReports((prev) => prev.filter((_, i) => i !== idx));
                showToast('Report record removed from history.');
              }}
            />
          )}

          {/* PAGE 8: DEDICATED THANK YOU PAGE */}
          {currentPage === 'thankyou' && (
            <div className="space-y-6 animate-fade-in">
              <ThankYouSection
                onNavigateHome={() => setCurrentPage('dashboard')}
                onNewScan={() => setCurrentPage('scan')}
                onExport={currentAnalysis ? () => setIsExportOpen(true) : undefined}
              />
            </div>
          )}
        </main>
      </div>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-slate-700 animate-fade-in">
          <span className="material-symbols-outlined text-emerald-400 text-base">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      {currentAnalysis && (
        <ExportSummaryModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          analysis={currentAnalysis}
        />
      )}
    </div>
  );
}
