# MediScan — Medical Report Scanner, Treatment Predictor & Score Analysis

**MediScan** is an intelligent clinical decision support platform designed to scan laboratory panels, diagnostic imaging reports, pathology results, and clinical summaries. Powered by advanced clinical intelligence and modern evidence-based practice guidelines, the application extracts abnormal biomarkers, calculates validated clinical risk scores, predicts targeted therapeutic regimens, and flags life-threatening contraindications.

---

## 🌟 Architecture & Page Navigation

MediScan is structured with a dedicated **Sidebar Navigation ("Features on One Side")** separating each clinical workflow into independent, focused pages:

1. **Dashboard Page (`/dashboard`)**:
   - Hero visualization banner with MediScan diagnostics imagery.
   - Project name, system status, and executive clinical KPIs.
   - Active patient case summary and 1-click clinical benchmark selector.
   - Direct launch tiles to every feature.

2. **Scan Lab / Scanning Reports Page (`/scan`)**:
   - Multimodal document dropzone (`PNG`, `JPG`, `WEBP`, `PDF`) and raw clinical text paste.
   - Patient context inputs (Age, Sex, Allergies, Current Home Medications).
   - Instant 1-click verified sample case loader.

3. **Scoring Analysis Page (`/scores`)**:
   - Composite Severity Index (0–100) and risk tiering (`Low`, `Moderate`, `High`, `Critical`).
   - Urgency timelines and evidence quality score.
   - Validated clinical risk calculators: **CURB-65**, **ASCVD 10-Year Risk**, **KDIGO Staging**, **TIMI Risk**, and **FIB-4**.
   - Biomarker Variance Radar & comparative reference interval table.

4. **Predicted Treatment Plan & Doctor Consult Page (`/treatment`)**:
   - Primary: **Predicted Clinical Treatment Plan** — First-line guideline pharmacotherapy, contraindication warnings, lifestyle directives, and **Plan Based on Patient Advice** (customizing route, budget copay tier, and dietary readiness with dynamic adherence scoring).
   - Interactive: **Direct Live Doctor Consultation Demo** — Real-time physician video/audio consultation simulation with attending specialist Dr. Sarah Chen, MD, FACC, live audio waveform, and second-opinion prescription signoff.

5. **Clinical Decision Support Q&A Page (`/qa`)**:
   - Interactive consultation chat grounded in the patient's scanned biomarkers and diagnoses.
   - Test "what-if" scenarios, drug-allergy contraindications, and guideline dosage adjustments.

6. **End-of-Treatment Feedback Console (`/feedback`)**:
   - Conclusive page at the end of the clinical treatment workflow.
   - 5-Star Protocol Quality and Therapeutic Efficacy ratings.
   - Patient tolerability selection and adherence compliance slider (20%–100%).
   - Symptom improvement verification and physician/patient notes.
   - Follow-up clinical recommendation dropdown, synced with printable EHR export summaries.

7. **Thank You Page (`/thankyou`)**:
   - Dedicated conclusion section.
   - Designed medical appreciation banner with animated heartbeat pulse.
   - Clinical trust pillars, quick return actions, and healthcare excellence dedication.

---

## 🌟 Key Features Detail
- **Urgency & Action Timeline**: Actionable response timeframes (e.g., *Immediate Inpatient Admission*, *Urgent within 3–7 days*, *Routine follow-up*).
- **Diagnostic Confidence Score**: Percentage evaluation of clinical concordance across findings.
- **Validated Clinical Calculators**:
  - **CURB-65**: Pneumonia severity & 30-day mortality risk stratification.
  - **ASCVD 10-Year Risk**: Cardiovascular event projection for primary prevention.
  - **KDIGO Staging**: Kidney disease progression and albuminuria categorization.
  - **TIMI Risk Score**: 14-day ischemic/infarction mortality probability.
  - **FIB-4 & Child-Pugh Score**: Non-invasive liver fibrosis staging and hepatic synthetic function reserve.
- **Biomarker Variance Radar**: Table comparing detected values against reference intervals with status indicators (`Critical High`, `High`, `Low`, `Normal`) and clinical pathophysiology.

### 3. Evidence-Based Treatment Prediction & Live Simulation
- **Live Treatment Demo & Simulation Mode**:
  - Interactive 4-phase clinical pathway:
    - *Phase 1 (Day 1)*: Acute initiation, baseline vitals, and safety checks.
    - *Phase 2 (Days 7–14)*: Early tolerability, BMP renal monitoring, and symptom reduction.
    - *Phase 3 (Month 1)*: Dose titration to full guideline steady state.
    - *Phase 4 (Month 3)*: Target biomarker attainment (HbA1c < 7.0%, LDL target) and long-term surveillance.
  - Interactive controls: Auto-play journey, phase stepping, simulated biomarker trajectories, and live patient scenario testing (optimal, nausea, blood pressure rebound).
- **Patient-Tailored Plan Customization (Based on Patient Advice)**:
  - Customizes regimens based on patient lifestyle, advice, and financial capacity:
    - *Administration route*: Oral pills only vs. injectables permitted.
    - *Budget / Tier*: Low-copay generics vs. comprehensive guideline combinations.
    - *Dietary readiness*: Strict DASH vs. moderate gradual shifts.
    - *Monitoring modality*: Home continuous sensors vs. clinic visits.
  - Dynamically calculates a personalized **Adherence Probability Index**.
- **First-Line Pharmacotherapy Cards**: Generic/trade names, drug classes, target starting dosages, titration schedules, frequencies, routes, mechanisms of action, and international clinical practice citations (**ADA 2024**, **ACC/AHA 2023**, **ATS/IDSA**, **KDIGO**, **AASLD**).
- **Contraindications & Toxicity Alerts**: Flags dangerous medications contraindicated by the patient's specific lab values (e.g., NSAIDs in renal failure/cirrhosis, metformin eGFR limits, nitrates with PDE-5 inhibitors).
- **End-of-Treatment Clinical Feedback Console**:
  - Star ratings for overall plan and clinical effectiveness.
  - Tolerance status recording (Well Tolerated, Mild Side Effects, Moderate Intolerance, Dose Modification Needed).
  - Adherence compliance percentage slider.
  - Symptom improvement validation.
  - Clinician and patient direct feedback logs with follow-up action recommendations.
  - Inclusion in printable and exported medical records.

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
        ├── MedicalHeader.tsx            # Top bar with view toggles & actions
        ├── ScannerInput.tsx             # Document dropzone, OCR preview & text entry
        ├── ScoreAnalysisView.tsx        # Severity gauge, clinical calculators & biomarkers
        ├── TreatmentPlanView.tsx        # Standard guideline protocol & patient advice customization
        ├── LiveDemoSection.tsx          # 4-phase interactive patient simulation engine & scenario testing
        ├── ClinicalQAChat.tsx           # Grounded clinical decision support Q&A
        ├── TreatmentFeedbackSection.tsx # End-of-treatment clinical outcome & feedback console
        └── MedicalModals.tsx            # Disclaimer and export/print modals
```

---

## ⚖️ Clinical Safety & Legal Disclaimer

> **IMPORTANT**: MediScan is intended strictly for educational, informational, and clinical decision support purposes. It does not replace the professional medical judgment, diagnosis, or treatment of a licensed physician or healthcare provider. Always consult a qualified medical professional before making any clinical decisions or administering pharmaceutical therapies. In an acute emergency, immediately dial **911** or your local emergency services.

---

## 📄 License
This project is licensed under the Apache 2.0 License.
