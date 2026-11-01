# MediScan — Medical Report Scanner, Treatment Predictor & Score Analysis

**MediScan** is an intelligent clinical decision support platform designed to scan laboratory panels, diagnostic imaging reports, pathology results, and clinical summaries. Powered by advanced clinical intelligence and modern evidence-based practice guidelines, the application extracts abnormal biomarkers, calculates validated clinical risk scores, predicts targeted therapeutic regimens, and flags life-threatening contraindications.

---

## 🌟 Key Features

### 1. Multimodal Medical Report Scanner
- **Document & Image Scanner**: Drag-and-drop or upload photos/scans of lab sheets, blood tests, radiology impressions, and pathology reports (`PNG`, `JPG`, `WEBP`, `PDF`).
- **Clinical Text & Lab Paste**: Paste raw laboratory readings, discharge summaries, or clinical progress notes.
- **Patient Context Integration**: Enter optional demographics (Age, Sex), known allergies (e.g., Penicillin, Sulfa), and current home medications to personalize drug selection and detect interactions.
- **1-Click Verified Sample Reports**:
  - **Type 2 Diabetes & Diabetic Nephropathy**: HbA1c 9.4%, eGFR 52 mL/min/1.73m², uACR 185 mg/g, mixed dyslipidemia.
  - **Community-Acquired Pneumonia & Sepsis Watch**: Right lower lobe consolidation, WBC 18.4k with 15% bands, Procalcitonin 2.85 ng/mL, BUN 29 mg/dL.
  - **Acute Coronary Syndrome (NSTEMI)**: hs-Troponin I 1.42 ng/mL, ischemic ST depressions, LDL 178 mg/dL.
  - **Advanced Hepatic Fibrosis & Cirrhosis (MASH)**: FIB-4 4.85, AST/ALT > 1, Platelets 98k, Morrison's pouch ascites.

### 2. Multi-Dimensional Score Analysis
- **Composite Severity Index (0–100)**: Visual gauge bar mapping overall clinical severity into risk tiers:
  - `0–25`: Low Risk / Minimal
  - `26–50`: Moderate Risk
  - `51–75`: High Risk
  - `76–100`: Critical / Emergent
- **Urgency & Action Timeline**: Actionable response timeframes (e.g., *Immediate Inpatient Admission*, *Urgent within 3–7 days*, *Routine follow-up*).
- **Diagnostic Confidence Score**: Percentage evaluation of clinical concordance across findings.
- **Validated Clinical Calculators**:
  - **CURB-65**: Pneumonia severity & 30-day mortality risk stratification.
  - **ASCVD 10-Year Risk**: Cardiovascular event projection for primary prevention.
  - **KDIGO Staging**: Kidney disease progression and albuminuria categorization.
  - **TIMI Risk Score**: 14-day ischemic/infarction mortality probability.
  - **FIB-4 & Child-Pugh Score**: Non-invasive liver fibrosis staging and hepatic synthetic function reserve.
- **Biomarker Variance Radar**: Table comparing detected values against reference intervals with status indicators (`Critical High`, `High`, `Low`, `Normal`) and clinical pathophysiology.

### 3. Evidence-Based Treatment Prediction
- **First-Line Pharmacotherapy Cards**:
  - Generic and trade drug names.
  - Pharmacological drug classes.
  - Target starting dosages, titration schedules, frequencies, and routes.
  - Specific mechanisms of action.
  - International clinical practice citations (**ADA 2024**, **ACC/AHA 2023**, **ATS/IDSA**, **KDIGO**, **AASLD**).
  - One-click prescription details copying.
- **Contraindications & Toxicity Alerts**: Flags dangerous medications contraindicated by the patient's specific lab values (e.g., NSAIDs in renal failure/cirrhosis, metformin eGFR limits, nitrates with PDE-5 inhibitors).
- **Lifestyle & Nutritional Prescriptions**: Sodium limits, carbohydrate guidelines, aerobic targets, and dietary patterns (DASH, Mediterranean).
- **Monitoring Schedule**: Structured follow-up lab re-check timetable (14 days, 30 days, 90 days).
- **Emergency Red Flags**: Critical warning triggers requiring immediate 911 / Emergency Room presentation.

### 4. Interactive Clinical Decision Support
- **Dual View Modes**:
  - **Clinician View**: In-depth medical terminology, ICD-10 coding, and guideline citations.
  - **Patient-Friendly View**: Jargon-free, empathetic explanation of results and next steps.
- **Clinical Scenario Q&A**: Interactive chat grounded in the scanned report to test "what-if" scenarios (e.g., alternative drugs for penicillin allergies, statin-induced myalgia management).
- **Export & Print Summary**: Formatted clinical summary optimized for Electronic Health Record (EHR) notes or patient discharge documentation.
- **Safety & Regulatory Disclaimer**: Explicit clinical decision support guardrails.

---

## 🛠️ Technology Stack

- **Frontend**:
  - [React 19](https://react.dev/) — User interface library
  - [TypeScript](https://www.typescriptlang.org/) — Type safety and schema definitions
  - [Tailwind CSS v4](https://tailwindcss.com/) — Modern utility-first styling with `@theme` tokens
  - Typography — Space Grotesk for headlines, Inter for clinical prose
  - Iconography — Material Symbols Outlined diagnostic icons
- **Backend**:
  - [Express.js](https://expressjs.com/) — Node.js REST API server
  - Clinical Intelligence Service — Server-side medical reasoning engine with structured diagnostic schema validation
  - [tsx](https://github.com/privatenumber/tsx) — TypeScript execution for Node.js
- **Tooling**:
  - [Vite](https://vite.dev/) — Fast frontend bundler and dev server middleware

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or open the repository:
```bash
git clone <repository-url>
cd react-example
```

2. Install dependencies:
```bash
npm install
```

3. Configure Environment Variables:
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

4. Start the Full-Stack Development Server:
```bash
npm run dev
```
The server will start on `http://localhost:3000`.

---

## 🔌 API Endpoints

### 1. `POST /api/scan-report`
Scans an uploaded report image or pasted clinical text and returns structured diagnostic analysis, score evaluation, and predicted treatment.

**Request Body:**
```json
{
  "imageBase64": "data:image/jpeg;base64,...", // Optional if reportText provided
  "mimeType": "image/jpeg",
  "reportText": "Fasting Glucose: 218 mg/dL, HbA1c: 9.4%...", // Optional if imageBase64 provided
  "clinicalNotes": "Age 58, Male, Allergic to Penicillin" // Optional
}
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "reportType": "Comprehensive Metabolic Panel & Lipid Profile",
    "patientProfile": { "age": "58", "sex": "Male", "detectedSetting": "Outpatient" },
    "diagnoses": [
      {
        "condition": "Type 2 Diabetes Mellitus",
        "icdCode": "E11.69",
        "confidence": 98,
        "severity": "Severe",
        "evidence": "HbA1c 9.4%"
      }
    ],
    "scoreAnalysis": {
      "overallSeverityScore": 68,
      "severityTier": "High Risk",
      "urgencyTimeline": "Urgent within 3 to 7 days",
      "evidenceQualityScore": 96,
      "clinicalScores": [...],
      "biomarkerBreakdown": [...]
    },
    "treatmentPlan": {
      "firstLineMedications": [...],
      "adjunctiveTherapies": [...],
      "lifestyleAndDiet": [...],
      "contraindicationsAndWarnings": [...],
      "monitoringSchedule": [...],
      "emergencyRedFlags": [...]
    },
    "patientFriendlySummary": "..."
  }
}
```

### 2. `POST /api/clinical-qa`
Answers follow-up clinical decision support questions and evaluates drug allergy or dosage scenarios grounded in the active report.

**Request Body:**
```json
{
  "question": "What if the patient is allergic to Penicillin?",
  "reportSummary": { ... },
  "currentTreatment": { ... }
}
```

---

## 📁 Project Structure

```
├── .env.example                     # Environment template
├── index.html                       # HTML entry point with fonts & meta
├── metadata.json                    # Application configuration metadata
├── package.json                     # Dependencies and run scripts
├── server.ts                        # Express server & clinical decision API endpoints
├── tsconfig.json                    # TypeScript compiler configuration
├── vite.config.ts                   # Vite configuration
└── src/
    ├── main.tsx                     # React root mount
    ├── index.css                    # Tailwind v4 theme & global styles
    ├── App.tsx                      # Root component & view coordination
    ├── medicalTypes.ts              # Diagnostic, Score, and Treatment interfaces
    ├── medicalSampleData.ts         # Verified benchmark clinical reports
    └── components/
        ├── MedicalHeader.tsx        # Top bar with view toggles & actions
        ├── ScannerInput.tsx         # Document dropzone, OCR preview & text entry
        ├── ScoreAnalysisView.tsx    # Severity gauge, clinical calculators & biomarkers
        ├── TreatmentPlanView.tsx    # Medications, contraindications & lifestyle
        ├── ClinicalQAChat.tsx       # Grounded clinical decision support Q&A
        └── MedicalModals.tsx        # Disclaimer and export/print modals
```

---

## ⚖️ Clinical Safety & Legal Disclaimer

> **IMPORTANT**: MediScan is intended strictly for educational, informational, and clinical decision support purposes. It does not replace the professional medical judgment, diagnosis, or treatment of a licensed physician or healthcare provider. Always consult a qualified medical professional before making any clinical decisions or administering pharmaceutical therapies. In an acute emergency, immediately dial **911** or your local emergency services.

---

## 📄 License
This project is licensed under the Apache 2.0 License.
