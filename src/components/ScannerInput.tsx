import React, { useState, useRef } from 'react';
import { SAMPLE_REPORTS } from '../medicalSampleData';
import { SampleReportOption } from '../medicalTypes';

interface ScannerInputProps {
  onScanReport: (params: {
    imageBase64?: string;
    mimeType?: string;
    reportText?: string;
    clinicalNotes?: string;
  }) => Promise<void>;
  onSelectSample: (sample: SampleReportOption) => void;
  isLoading: boolean;
}

export const ScannerInput: React.FC<ScannerInputProps> = ({
  onScanReport,
  onSelectSample,
  isLoading
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');
  const [pastedText, setPastedText] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientSex, setPatientSex] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [knownAllergies, setKnownAllergies] = useState('');
  const [currentMeds, setCurrentMeds] = useState('');

  // Uploaded image state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      alert('Please upload an image (JPEG, PNG, WEBP) or PDF of the medical report.');
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleTriggerScan = async () => {
    let contextNotes = '';
    if (patientAge || patientSex || knownAllergies || currentMeds) {
      contextNotes = `Patient Demographics: Age ${patientAge || 'Unknown'}, Sex ${patientSex}. Known Allergies: ${
        knownAllergies || 'None reported'
      }. Current Home Medications: ${currentMeds || 'None reported'}.`;
    }

    if (activeTab === 'upload' && imagePreview) {
      await onScanReport({
        imageBase64: imagePreview,
        mimeType: selectedFile?.type || 'image/jpeg',
        clinicalNotes: contextNotes,
      });
    } else if (activeTab === 'text' && pastedText.trim()) {
      await onScanReport({
        reportText: pastedText,
        clinicalNotes: contextNotes,
      });
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero & Scanner Centerpiece */}
      <section className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Evidence-Based Medical Intelligence
        </div>
        <h1 className="font-headline text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          Scan Medical Reports & Predict Treatments
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          Upload laboratory test panels, radiology impressions, or clinical summaries to extract abnormal biomarkers, calculate standard risk scores, and predict guideline-directed treatment protocols.
        </p>
      </section>

      {/* Main Scanner Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden max-w-4xl mx-auto">
        {/* Input Method Segmented Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-6 pt-4 flex gap-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-lg">document_scanner</span>
            <span>Upload Document / Image Scan</span>
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'text'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-lg">edit_note</span>
            <span>Paste Lab Values / Clinical Text</span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Upload Dropzone */}
          {activeTab === 'upload' && (
            <div>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                  isDragOver
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                    : 'border-slate-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-850'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />

                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="relative inline-block max-w-sm rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                      <img
                        src={imagePreview}
                        alt="Medical Report Preview"
                        className="max-h-64 object-contain mx-auto"
                      />
                      <div className="absolute top-2 right-2 bg-slate-900/80 text-white text-xs px-2 py-1 rounded">
                        Ready to scan
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {selectedFile?.name || 'Selected Report File'}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          setImagePreview(null);
                        }}
                        className="mt-2 text-xs text-rose-600 hover:underline font-bold"
                      >
                        Remove and select another file
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl">upload_file</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-bold text-slate-800 dark:text-slate-100">
                        Drop your medical report here, or <span className="text-emerald-600 underline">browse files</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Supports blood tests, CMP, CBC, lipid profiles, radiology reports, ECG scans, biopsy notes (PNG, JPG, PDF)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Text Input Area */}
          {activeTab === 'text' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Paste Lab Report Text, Biomarker Readings or Doctor’s Notes
              </label>
              <textarea
                rows={7}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Example:
Fasting Glucose: 218 mg/dL
HbA1c: 9.4%
Total Cholesterol: 238 mg/dL, LDL: 162 mg/dL
Creatinine: 1.48 mg/dL, BUN: 28, eGFR: 52
Urine Albumin/Creatinine Ratio: 185 mg/g
BP: 148/92 mmHg"
                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-slate-100 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          )}

          {/* Patient Context (Optional Clinical Details) */}
          <div className="bg-slate-50 dark:bg-slate-850/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <span className="material-symbols-outlined text-sm text-emerald-600">badge</span>
              <span>Patient Context (Optional for Precise Staging & Dosage)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Patient Age
                </label>
                <input
                  type="text"
                  placeholder="e.g. 58"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Patient Sex
                </label>
                <select
                  value={patientSex}
                  onChange={(e) => setPatientSex(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Known Allergies
                </label>
                <input
                  type="text"
                  placeholder="e.g. Penicillin, Sulfa, None"
                  value={knownAllergies}
                  onChange={(e) => setKnownAllergies(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Current Medications
                </label>
                <input
                  type="text"
                  placeholder="e.g. Metformin 500mg, Lisinopril"
                  value={currentMeds}
                  onChange={(e) => setCurrentMeds(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="pt-2">
            <button
              onClick={handleTriggerScan}
              disabled={isLoading || (activeTab === 'upload' && !imagePreview) || (activeTab === 'text' && !pastedText.trim())}
              className={`w-full py-4 rounded-xl font-headline font-bold text-base flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg ${
                isLoading || (activeTab === 'upload' && !imagePreview) || (activeTab === 'text' && !pastedText.trim())
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-95 shadow-emerald-600/25 active:scale-[0.99]'
              }`}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                  <span>Analyzing Report & Computing Clinical Scores...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-2xl">vital_signs</span>
                  <span>Scan Report & Predict Treatment</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Preloaded Sample Reports for Instant Testing */}
      <section className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-xl">folder_managed</span>
            <h3 className="font-headline font-bold text-lg text-slate-900 dark:text-white">
              Try Instant Verified Medical Samples
            </h3>
          </div>
          <span className="text-xs text-slate-500">1-click clinical test cases</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_REPORTS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                    {sample.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {sample.badge}
                  </span>
                </div>
                <h4 className="font-headline font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {sample.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {sample.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  Load & Predict Treatment
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
                <span className="text-[10px] text-slate-400">Precomputed validation</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
