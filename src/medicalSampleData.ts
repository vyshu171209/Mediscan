import { SampleReportOption } from './medicalTypes';

export const SAMPLE_REPORTS: SampleReportOption[] = [
  {
    id: 'sample-diabetes-ckd',
    title: 'Type 2 Diabetes & Early Diabetic Nephropathy',
    category: 'Endocrinology & Nephrology',
    badge: 'Lab Panel · High Risk',
    summary: 'HbA1c 9.4%, Fasting Glucose 218 mg/dL, Microalbumin/Cr ratio 185 mg/g, eGFR 52 mL/min/1.73m²',
    reportText: `PATIENT LABORATORY REPORT - METABOLIC & RENAL PROFILE
Patient: Mark Reynolds, Age: 58, Male
Ordering Provider: Dr. S. Vance, Internal Medicine
Specimen Collection: Fasting (12 hrs)

COMPREHENSIVE METABOLIC PANEL (CMP)
- Fasting Plasma Glucose: 218 mg/dL [Reference: 70 - 99 mg/dL] (HIGH)
- Hemoglobin A1c: 9.4% [Reference: 4.0 - 5.6%] (CRITICAL HIGH)
- Serum Creatinine: 1.48 mg/dL [Reference: 0.70 - 1.30 mg/dL] (HIGH)
- Blood Urea Nitrogen (BUN): 28 mg/dL [Reference: 7 - 20 mg/dL] (HIGH)
- Estimated GFR (CKD-EPI 2021): 52 mL/min/1.73m² [Reference: >60] (LOW - Stage 3a CKD)
- Serum Potassium: 4.6 mEq/L [Reference: 3.5 - 5.1 mEq/L] (NORMAL)
- Serum Sodium: 139 mEq/L [Reference: 135 - 145 mEq/L] (NORMAL)

LIPID PANEL
- Total Cholesterol: 238 mg/dL [Reference: <200 mg/dL] (HIGH)
- LDL-Cholesterol (Direct): 162 mg/dL [Reference: <100 mg/dL] (HIGH)
- HDL-Cholesterol: 38 mg/dL [Reference: >40 mg/dL] (LOW)
- Triglycerides: 245 mg/dL [Reference: <150 mg/dL] (HIGH)

URINE MICROALBUMIN EXCRETION
- Urine Albumin/Creatinine Ratio (uACR): 185 mg/g [Reference: <30 mg/g] (HIGH - Moderately Increased Albuminuria A2)
- Urine Blood: Negative
- Urine Leukocyte Esterase: Negative

PHYSICAL EXAM VITALS AT DRAW:
- Blood Pressure: 148/92 mmHg (Stage 2 Hypertension)
- BMI: 31.8 kg/m² (Class I Obesity)`,
    precomputedAnalysis: {
      reportType: 'Comprehensive Metabolic Panel, Lipid Profile & Urine Microalbumin',
      patientProfile: {
        age: '58 years',
        sex: 'Male',
        detectedSetting: 'Outpatient Primary Care / Endocrinology',
      },
      diagnoses: [
        {
          condition: 'Type 2 Diabetes Mellitus with Poor Glycemic Control',
          icdCode: 'E11.69',
          confidence: 98,
          severity: 'Severe',
          evidence: 'Hemoglobin A1c 9.4% (target <7.0%), Fasting Glucose 218 mg/dL.',
        },
        {
          condition: 'Chronic Kidney Disease (CKD), Stage G3aA2 (Diabetic Nephropathy)',
          icdCode: 'N18.31',
          confidence: 94,
          severity: 'Moderate',
          evidence: 'eGFR 52 mL/min/1.73m² (Stage 3a) with persistent microalbuminuria (uACR 185 mg/g).',
        },
        {
          condition: 'Mixed Dyslipidemia (High ASCVD Risk)',
          icdCode: 'E78.2',
          confidence: 96,
          severity: 'Moderate',
          evidence: 'LDL-C 162 mg/dL, Triglycerides 245 mg/dL, Low HDL 38 mg/dL.',
        },
        {
          condition: 'Essential Hypertension, Stage 2',
          icdCode: 'I10',
          confidence: 95,
          severity: 'Moderate',
          evidence: 'Resting BP 148/92 mmHg in high-risk diabetic patient.',
        },
      ],
      scoreAnalysis: {
        overallSeverityScore: 68,
        severityTier: 'High Risk',
        urgencyTimeline: 'Urgent within 3 to 7 days for pharmacological initiation and dietary stabilization.',
        evidenceQualityScore: 96,
        clinicalScores: [
          {
            name: 'KDIGO CKD Staging',
            calculatedValue: 'Stage G3a / A2',
            riskCategory: 'High',
            clinicalMeaning: 'Moderate-to-high risk of renal progression and cardiovascular events. Requires renoprotective SGLT2i + ACEi/ARB.',
          },
          {
            name: 'ASCVD 10-Year Cardiovascular Risk',
            calculatedValue: '21.4%',
            riskCategory: 'High',
            clinicalMeaning: 'High primary prevention risk category (exceeds 20% threshold). Strong indication for high-intensity statin therapy.',
          },
          {
            name: 'Diabetic Microvascular Complication Index',
            calculatedValue: 'Grade 2',
            riskCategory: 'Elevated',
            clinicalMeaning: 'Presence of nephropathy signals urgent need for annual dilated retinal exam and peripheral diabetic neuropathy screening.',
          },
        ],
        biomarkerBreakdown: [
          {
            markerName: 'Hemoglobin A1c',
            patientValue: '9.4%',
            referenceRange: '4.0 - 5.6%',
            status: 'Critical High',
            clinicalImpact: 'Substantial persistent hyperglycemia elevating risk of microvascular and macrovascular end-organ damage.',
          },
          {
            markerName: 'Fasting Plasma Glucose',
            patientValue: '218 mg/dL',
            referenceRange: '70 - 99 mg/dL',
            status: 'High',
            clinicalImpact: 'Marked fasting hepatic glucose output elevation indicating insulin resistance and beta-cell dysfunction.',
          },
          {
            markerName: 'Urine Albumin/Creatinine (uACR)',
            patientValue: '185 mg/g',
            referenceRange: '<30 mg/g',
            status: 'High',
            clinicalImpact: 'Glomerular barrier breakdown; hallmark of early diabetic nephrosclerosis.',
          },
          {
            markerName: 'eGFR (CKD-EPI)',
            patientValue: '52 mL/min/1.73m²',
            referenceRange: '>60 mL/min/1.73m²',
            status: 'Low',
            clinicalImpact: 'Modest renal filtration impairment; requires dose adjustments for renally cleared medications.',
          },
          {
            markerName: 'LDL-Cholesterol',
            patientValue: '162 mg/dL',
            referenceRange: '<100 mg/dL (target <70)',
            status: 'High',
            clinicalImpact: 'Atherogenic lipoprotein burden requiring high-intensity HMG-CoA reductase inhibitor therapy.',
          },
        ],
      },
      treatmentPlan: {
        firstLineMedications: [
          {
            drugName: 'Empagliflozin (Jardiance)',
            drugClass: 'SGLT2 Inhibitor',
            dosage: '10 mg',
            frequencyAndRoute: 'Once daily PO in morning',
            rationale: 'Proven deceleration of CKD progression, reduction in cardiovascular death, and secondary glucose lowering without hypoglycemia.',
            guidelineRecommendation: 'ADA / KDIGO 2024 Standards of Care: Class I, Level A for T2D with CKD eGFR 20-60.',
          },
          {
            drugName: 'Lisinopril (Zestril)',
            drugClass: 'ACE Inhibitor',
            dosage: '10 mg (titrate to 20 mg as tolerated)',
            frequencyAndRoute: 'Once daily PO',
            rationale: 'Dilates efferent arterioles, reducing intraglomerular hydrostatic pressure and reversing microalbuminuria.',
            guidelineRecommendation: 'KDIGO 2024 Clinical Practice Guideline for Diabetes in CKD (Class 1A).',
          },
          {
            drugName: 'Atorvastatin (Lipitor)',
            drugClass: 'HMG-CoA Reductase Inhibitor (High-Intensity Statin)',
            dosage: '40 mg',
            frequencyAndRoute: 'Once daily PO at bedtime',
            rationale: 'Mandated for primary prevention in diabetic patients aged 40-75 with LDL > 100 and ASCVD risk > 20%.',
            guidelineRecommendation: 'ACC/AHA 2019 / ADA 2024 Multisociety Cholesterol Guidelines (Class I).',
          },
          {
            drugName: 'Semaglutide (Ozempic) or Metformin ER',
            drugClass: 'GLP-1 Receptor Agonist',
            dosage: '0.25 mg weekly subQ x 4 weeks, then titrate to 0.5 mg',
            frequencyAndRoute: 'Once weekly subcutaneous injection',
            rationale: 'Powerful HbA1c reduction (1.5-2.0%), cardioprotective renal benefit, and sustained weight reduction for BMI 31.8.',
            guidelineRecommendation: 'ADA / EASD Consensus Statement 2024.',
          },
        ],
        adjunctiveTherapies: [
          'Home blood pressure self-monitoring (HBPM) with target < 130/80 mmHg.',
          'Continuous Glucose Monitoring (CGM, e.g. Dexcom G7 or Freestyle Libre 3) to evaluate time-in-range (TIR > 70%).',
          'Annual dilated retinal photography to screen for non-proliferative diabetic retinopathy.',
        ],
        lifestyleAndDiet: [
          'Medical Nutrition Therapy (MNT): Dietary sodium restricted to < 2,000 mg/day (DASH diet).',
          'Moderate carbohydrate restriction (45-60g per meal) with high dietary fiber (>30g/day).',
          'Aerobic physical activity: 150 minutes/week of brisk walking or cycling, paired with twice-weekly resistance training.',
        ],
        contraindicationsAndWarnings: [
          'Avoid initiating Metformin full-dose (1000mg BID) without titration given eGFR 52; monitor eGFR every 3-6 months. Discontinue if eGFR drops < 30 mL/min.',
          'Contraindicated: NSAIDs (Ibuprofen, Naproxen, Celecoxib) — will trigger acute hemodynamic renal failure and hyperkalemia on ACEi.',
          'Warn patient of SGLT2i euglycemic DKA symptoms and instruct proper perineal hygiene to prevent mycotic infections.',
        ],
        monitoringSchedule: [
          'Repeat Serum Potassium and Creatinine in 14-21 days after Lisinopril initiation to ensure potassium < 5.2 and creatinine bump < 30%.',
          'Repeat HbA1c, CMP, and Urine Albumin/Creatinine ratio in 90 days.',
          'Repeat Fasting Lipid Panel in 8-12 weeks to confirm >50% LDL-C reduction on Atorvastatin 40mg.',
        ],
        emergencyRedFlags: [
          'Systolic BP > 180 mmHg or diastolic > 110 mmHg with headache or visual changes (Hypertensive Urgency/Emergency).',
          'Persistent nausea, vomiting, abdominal pain, or deep rapid breathing (Kussmaul breathing) indicative of diabetic ketoacidosis.',
          'Sudden decrease in urine output or bilateral leg edema.',
        ],
      },
      patientFriendlySummary:
        'Your lab results show that your blood sugar levels (A1c 9.4%) and cholesterol are significantly higher than healthy ranges, and your kidneys are showing early, reversible strain (called microalbuminuria). The good news is that these findings were caught in time to take decisive action.\n\nYour predicted treatment combines modern protective medicines: an SGLT2 inhibitor (like Jardiance) and a blood pressure protector (like Lisinopril) that specifically safeguard your kidneys while lowering blood sugar. Along with a cholesterol-lowering statin and guided dietary adjustments, this plan is engineered to protect your heart and kidneys for years to come.',
    },
  },
  {
    id: 'sample-pneumonia-cap',
    title: 'Acute Community-Acquired Pneumonia with Sepsis Watch',
    category: 'Pulmonology & Infectious Disease',
    badge: 'CXR & Blood Work · Urgent',
    summary: 'Right lower lobe infiltrate, WBC 18.4k with 15% bands, Procalcitonin 2.8 ng/mL, BUN 29 mg/dL, CURB-65 = 3',
    reportText: `EMERGENCY DEPARTMENT / INPATIENT ADMISSION PANEL
Patient: Evelyn Harper, Age: 69, Female
Triage Vitals: Temp: 38.9°C (102.0°F), HR: 112 bpm, BP: 98/58 mmHg, RR: 30 breaths/min, SpO2: 89% on room air

CHEST RADIOGRAPHY (2-VIEW CXR):
Findings: Dense alveolar consolidation with visible air bronchograms in the right lower lobe, accompanied by blunting of the right costophrenic angle consistent with a small parapneumonic pleural effusion. Cardiothoracic silhouette within normal limits.
Impression: Acute right lower lobe lobar pneumonia.

COMPLETE BLOOD COUNT (CBC) WITH DIFFERENTIAL:
- White Blood Cells (WBC): 18.4 x10³/µL [Reference: 4.5 - 11.0] (CRITICAL HIGH)
- Absolute Neutrophil Count: 15.6 x10³/µL (HIGH)
- Band Neutrophils: 15% [Reference: 0 - 5%] (LEFT SHIFT)
- Hemoglobin: 12.8 g/dL [Reference: 12.0 - 15.5] (NORMAL)
- Platelets: 210 x10³/µL [Reference: 150 - 450] (NORMAL)

SERUM BIOCHEMISTRY & BIOMARKERS:
- Blood Urea Nitrogen (BUN): 29 mg/dL [Reference: 7 - 20] (ELEVATED)
- Serum Creatinine: 1.15 mg/dL [Baseline: 0.85] (MILD PRERENAL AZOTEMIA)
- Serum Lactate: 2.4 mmol/L [Reference: 0.5 - 2.0] (ELEVATED - Tissue Hypoperfusion)
- Procalcitonin: 2.85 ng/mL [Reference: <0.10 ng/mL] (HIGH - Bacterial etiology highly probable)
- High-Sensitivity C-Reactive Protein (hs-CRP): 142 mg/L [Reference: <5.0] (CRITICAL HIGH)
- Blood Cultures x2: Drawn at bedside (Pending incubation)
- Sputum Gram Stain: Gram-positive diplococci in pairs (Lancet-shaped, consistent with Streptococcus pneumoniae)
- Rapid Influenza A/B & COVID-19 PCR: Negative`,
    precomputedAnalysis: {
      reportType: 'Inpatient Emergency Diagnostic Workup (CXR, CBC, Chemistry, Procalcitonin)',
      patientProfile: {
        age: '69 years',
        sex: 'Female',
        detectedSetting: 'Emergency Department / Step-down Unit',
      },
      diagnoses: [
        {
          condition: 'Community-Acquired Pneumonia (CAP), Severe Bacterial (Streptococcus pneumoniae likely)',
          icdCode: 'J13',
          confidence: 97,
          severity: 'Severe',
          evidence: 'RLL consolidation with air bronchograms, sputum gram-positive diplococci, procalcitonin 2.85 ng/mL.',
        },
        {
          condition: 'Sepsis Secondary to Pulmonary Source (qSOFA = 2, Lactate 2.4)',
          icdCode: 'A41.9',
          confidence: 92,
          severity: 'Critical',
          evidence: 'Tachypnea RR 30, SBP 98 mmHg, elevated serum lactate 2.4 mmol/L, WBC 18.4k with 15% left shift.',
        },
        {
          condition: 'Acute Hypoxemic Respiratory Failure',
          icdCode: 'J96.01',
          confidence: 95,
          severity: 'Severe',
          evidence: 'SpO2 89% on ambient air, tachypnea requiring supplemental oxygen.',
        },
      ],
      scoreAnalysis: {
        overallSeverityScore: 82,
        severityTier: 'Critical / Emergent',
        urgencyTimeline: 'Immediate inpatient admission; parenteral antimicrobial therapy within 1 hour.',
        evidenceQualityScore: 98,
        clinicalScores: [
          {
            name: 'CURB-65 Pneumonia Severity Score',
            calculatedValue: '3 Points',
            riskCategory: 'High',
            clinicalMeaning: 'Criteria met: BUN > 19 (29), RR >= 30 (30), Age >= 65 (69). 30-day mortality risk ~14%. Inpatient hospitalization strongly indicated; consider ICU/step-down evaluation.',
          },
          {
            name: 'qSOFA (Quick Sepsis-related Organ Failure Assessment)',
            calculatedValue: '2 Points',
            riskCategory: 'High',
            clinicalMeaning: 'Criteria met: RR >= 22 (30) and SBP <= 100 (98). Signals high risk for adverse outcomes and in-hospital mortality.',
          },
          {
            name: 'PSI (Pneumonia Severity Index / Fine Score)',
            calculatedValue: 'Class IV (108 points)',
            riskCategory: 'High',
            clinicalMeaning: 'Confirms need for aggressive inpatient antibiotic therapy and monitoring.',
          },
        ],
        biomarkerBreakdown: [
          {
            markerName: 'Procalcitonin',
            patientValue: '2.85 ng/mL',
            referenceRange: '<0.10 ng/mL',
            status: 'Critical High',
            clinicalImpact: 'Definitive biological marker of invasive bacterial infection; rules out pure viral etiology.',
          },
          {
            markerName: 'White Blood Cell Count',
            patientValue: '18.4 x10³/µL',
            referenceRange: '4.5 - 11.0 x10³/µL',
            status: 'Critical High',
            clinicalImpact: 'Marked leukocytosis with 15% bandemia signaling acute bone marrow neutrophil release.',
          },
          {
            markerName: 'Blood Urea Nitrogen (BUN)',
            patientValue: '29 mg/dL',
            referenceRange: '7 - 20 mg/dL',
            status: 'High',
            clinicalImpact: 'Dehydration/prerenal state contributing directly to CURB-65 severity scoring.',
          },
          {
            markerName: 'Serum Lactate',
            patientValue: '2.4 mmol/L',
            referenceRange: '0.5 - 2.0 mmol/L',
            status: 'High',
            clinicalImpact: 'Anaerobic metabolism secondary to microvascular hypoperfusion.',
          },
        ],
      },
      treatmentPlan: {
        firstLineMedications: [
          {
            drugName: 'Ceftriaxone (Rocephin) IV',
            drugClass: 'Third-Generation Cephalosporin',
            dosage: '1 to 2 grams',
            frequencyAndRoute: 'Every 24 hours IV infusion in 50 mL D5W',
            rationale: 'Potent bactericidal coverage against Streptococcus pneumoniae and common Gram-negative respiratory pathogens.',
            guidelineRecommendation: 'ATS / IDSA 2019 Community-Acquired Pneumonia Inpatient Guidelines.',
          },
          {
            drugName: 'Azithromycin (Zithromax) IV',
            drugClass: 'Macrolide Antibiotic',
            dosage: '500 mg',
            frequencyAndRoute: 'Once daily IV infusion over 60 minutes',
            rationale: 'Provides atypical pathogen coverage (Mycoplasma, Legionella) and beneficial pulmonary immunomodulatory anti-inflammatory effects.',
            guidelineRecommendation: 'ATS / IDSA 2019 Guidelines: Preferred Beta-lactam + Macrolide combination.',
          },
          {
            drugName: 'Isotonic Crystalloid (Lactated Ringer’s)',
            drugClass: 'Intravenous Resuscitation Fluid',
            dosage: '30 mL/kg (approximately 1,500 - 2,000 mL)',
            frequencyAndRoute: 'IV bolus over first 2-3 hours',
            rationale: 'Restores effective circulating volume, clears serum lactate, and optimizes renal perfusion.',
            guidelineRecommendation: 'Surviving Sepsis Campaign 2021 1-Hour Bundle.',
          },
        ],
        adjunctiveTherapies: [
          'Supplemental oxygen via nasal cannula titrated to target SpO2 92-96%.',
          'Incentive spirometry 10 breaths every waking hour to prevent atelectasis.',
          'Pharmacologic VTE prophylaxis: Enoxaparin 40 mg subcutaneous daily once stabilized.',
        ],
        lifestyleAndDiet: [
          'Initial NPO until respiratory rate stabilizes < 24 and aspiration risk evaluated.',
          'Early mobilization / sitting upright in chair once hemodynamic parameters normalize.',
        ],
        contraindicationsAndWarnings: [
          'Caution: Monitor QTc interval on ECG prior to Azithromycin if patient has electrolyte imbalances.',
          'Avoid oral-only outpatient discharge; CURB-65 score of 3 mandates hospital observation.',
          'Do not administer systemic steroids unless patient has concomitant COPD exacerbation or septic shock refractory to fluids.',
        ],
        monitoringSchedule: [
          'Continuous pulse oximetry and telemetry monitoring for first 24 hours.',
          'Repeat serum lactate at 4 hours to verify clearance to < 2.0 mmol/L.',
          'Daily CBC with diff and Procalcitonin check on Day 3 to guide antibiotic de-escalation and discharge readiness.',
        ],
        emergencyRedFlags: [
          'Signs of respiratory muscle exhaustion (intercostal retractions, paradoxical breathing, inability to speak full sentences).',
          'Mean Arterial Pressure (MAP) < 65 mmHg refractory to initial 2L fluid bolus (requires ICU vasopressor support).',
          'Acute confusion or declining Glasgow Coma Scale.',
        ],
      },
      patientFriendlySummary:
        'Your test results indicate a serious bacterial lung infection (pneumonia) in your right lower lung, which is causing your body to work extra hard to breathe and pump oxygen. Because your body temperature is elevated and blood tests show a strong inflammatory reaction, you will be admitted to the hospital where healthcare providers can closely watch your recovery.\n\nYou will receive intravenous antibiotics (Ceftriaxone and Azithromycin) designed to clear the bacterial infection quickly, along with IV hydration fluids and supplemental oxygen to make breathing comfortable. Most patients show clear improvement within 48 to 72 hours of starting this regimen.',
    },
  },
  {
    id: 'sample-cardiology-acs',
    title: 'Acute Coronary Syndrome (NSTEMI) & Severe Atherosclerosis',
    category: 'Cardiology & Intensive Care',
    badge: 'Cardiac Markers · Critical',
    summary: 'High-Sensitivity Troponin I 1.42 ng/mL (99th percentile <0.04), Total Cholesterol 265 mg/dL, TIMI = 5',
    reportText: `CARDIAC TELEMETRY & BIOMARKER EMERGENCY REPORT
Patient: Robert Chen, Age: 63, Male
Presenting Complaint: Retrosternal pressure radiating to left arm and jaw x 90 mins, diaphoresis.

12-LEAD ELECTROCARDIOGRAM (ECG):
Rhythm: Sinus tachycardia at 104 bpm.
Conduction: Normal PR (160 ms), normal QRS (88 ms).
Morphology: 1.5 mm ST-segment depression in leads V4-V6, II, III, aVF. T-wave inversion in leads I and aVL. No pathological Q-waves. No localized ST-segment elevation.
Impression: High-risk Non-ST Elevation Acute Coronary Syndrome (NSTE-ACS).

CARDIAC ENZYMES & BIOMARKERS (STAT DRAW):
- High-Sensitivity Cardiac Troponin I (hs-cTnI): 1.420 ng/mL [Reference: <0.040 ng/mL] (CRITICAL HIGH - 35x ULN)
- Repeat Troponin I at 2 hours: 2.180 ng/mL (Significant delta confirming acute myocardial injury)
- Creatine Kinase-MB (CK-MB): 38.4 ng/mL [Reference: <5.0 ng/mL] (CRITICAL HIGH)
- B-type Natriuretic Peptide (BNP): 480 pg/mL [Reference: <100 pg/mL] (ELEVATED)

LIPID PANEL:
- Total Cholesterol: 265 mg/dL [Reference: <200]
- LDL-C: 178 mg/dL [Reference: <100, Target <55 in secondary prevention]
- HDL-C: 32 mg/dL [Reference: >40]
- Triglycerides: 275 mg/dL [Reference: <150]

COAGULATION & RENAL:
- Platelet Count: 245 x10³/µL (NORMAL)
- Serum Creatinine: 1.02 mg/dL (NORMAL)
- Estimated GFR: >60 mL/min/1.73m² (NORMAL)`,
    precomputedAnalysis: {
      reportType: 'Emergency Cardiac Biomarker Series & 12-Lead ECG Analysis',
      patientProfile: {
        age: '63 years',
        sex: 'Male',
        detectedSetting: 'Cardiac Intensive Care Unit / Cath Lab Alert',
      },
      diagnoses: [
        {
          condition: 'Non-ST-Segment Elevation Myocardial Infarction (NSTEMI), High-Risk',
          icdCode: 'I21.4',
          confidence: 99,
          severity: 'Critical',
          evidence: 'Dynamic hs-Troponin I rise from 1.42 to 2.18 ng/mL with ischemic ST depressions in leads V4-V6.',
        },
        {
          condition: 'Severe Atherosclerotic Cardiovascular Disease (ASCVD) with Dyslipidemia',
          icdCode: 'I25.10',
          confidence: 96,
          severity: 'Severe',
          evidence: 'Baseline LDL-C 178 mg/dL, low HDL 32 mg/dL in setting of acute coronary plaque disruption.',
        },
        {
          condition: 'Subclinical Ventricular Wall Stress (Elevated BNP)',
          icdCode: 'I50.9',
          confidence: 88,
          severity: 'Moderate',
          evidence: 'BNP 480 pg/mL reflecting acute elevated left ventricular end-diastolic filling pressure.',
        },
      ],
      scoreAnalysis: {
        overallSeverityScore: 92,
        severityTier: 'Critical / Emergent',
        urgencyTimeline: 'Immediate Cath Lab activation; early invasive coronary angiography within 24 hours.',
        evidenceQualityScore: 99,
        clinicalScores: [
          {
            name: 'TIMI Risk Score for NSTE-ACS',
            calculatedValue: '5 out of 7 Points',
            riskCategory: 'High',
            clinicalMeaning: 'Points for Age >=65, ST deviation, elevated cardiac biomarkers, prior risk factors. 26.2% risk of all-cause mortality, new/recurrent MI, or severe ischemia at 14 days.',
          },
          {
            name: 'GRACE 2.0 Risk Score',
            calculatedValue: '148 Points',
            riskCategory: 'High',
            clinicalMeaning: 'High in-hospital mortality (>5%) and post-discharge event risk. Mandates urgent invasive catheterization.',
          },
          {
            name: 'CRUSADE Bleeding Risk Score',
            calculatedValue: '24 Points',
            riskCategory: 'Low',
            clinicalMeaning: 'Favorable safety margin for dual antiplatelet therapy (DAPT) and therapeutic anticoagulation.',
          },
        ],
        biomarkerBreakdown: [
          {
            markerName: 'High-Sensitivity Troponin I',
            patientValue: '1.42 -> 2.18 ng/mL',
            referenceRange: '<0.040 ng/mL',
            status: 'Critical High',
            clinicalImpact: 'Definitive diagnosis of acute myocardial cell necrosis with active upward delta.',
          },
          {
            markerName: 'CK-MB',
            patientValue: '38.4 ng/mL',
            referenceRange: '<5.0 ng/mL',
            status: 'Critical High',
            clinicalImpact: 'Confirms rapid ongoing myocardial cell breakdown.',
          },
          {
            markerName: 'B-type Natriuretic Peptide (BNP)',
            patientValue: '480 pg/mL',
            referenceRange: '<100 pg/mL',
            status: 'High',
            clinicalImpact: 'Signifies early hemodynamic left ventricular wall stress and diastolic overload.',
          },
          {
            markerName: 'LDL-C',
            patientValue: '178 mg/dL',
            referenceRange: '<55 mg/dL (Post-ACS Target)',
            status: 'Critical High',
            clinicalImpact: 'Extremely elevated plaque substrate requiring immediate maximum-intensity statin + ezetimibe.',
          },
        ],
      },
      treatmentPlan: {
        firstLineMedications: [
          {
            drugName: 'Aspirin (Chewable)',
            drugClass: 'COX-1 Inhibitor / Antiplatelet',
            dosage: '325 mg loading dose, then 81 mg daily',
            frequencyAndRoute: 'Immediate oral chewable load, then daily PO',
            rationale: 'Irreversibly inhibits platelet thromboxane A2 production, preventing further coronary thrombus propagation.',
            guidelineRecommendation: 'ACC / AHA 2023 Coronary Artery Disease Guidelines (Class I, Level A).',
          },
          {
            drugName: 'Ticagrelor (Brilinta)',
            drugClass: 'P2Y12 Receptor Antagonist',
            dosage: '180 mg loading dose, followed by 90 mg BID',
            frequencyAndRoute: 'Oral loading dose immediately',
            rationale: 'Reversible, rapid-onset P2Y12 platelet blockade proven superior to clopidogrel in reducing cardiovascular death and stent thrombosis.',
            guidelineRecommendation: 'ESC / ACC NSTE-ACS Guidelines (Class I, Level B).',
          },
          {
            drugName: 'Unfractionated Heparin (UFH) or Enoxaparin',
            drugClass: 'Anticoagulant',
            dosage: '60 units/kg IV bolus (max 4000 units), then 12 units/kg/hr infusion',
            frequencyAndRoute: 'Continuous IV infusion titrated to aPTT 50-70s',
            rationale: 'Suppresses thrombin generation to stabilize disrupted atherosclerotic plaque prior to coronary catheterization.',
            guidelineRecommendation: 'ACC / AHA Class I Recommendation.',
          },
          {
            drugName: 'Rosuvastatin (Crestor) or Atorvastatin',
            drugClass: 'High-Intensity Statin',
            dosage: '40 mg (Rosuvastatin) or 80 mg (Atorvastatin)',
            frequencyAndRoute: 'Once daily PO at bedtime',
            rationale: 'Acute plaque stabilization, pleiotropic endothelial anti-inflammatory effect, and aggressive LDL reduction toward <55 mg/dL.',
            guidelineRecommendation: 'AHA / ACC Secondary Prevention Guidelines (Class I).',
          },
        ],
        adjunctiveTherapies: [
          'Urgent Coronary Angiography and Percutaneous Coronary Intervention (PCI / Stenting) within 24 hours.',
          'Sublingual Nitroglycerin 0.4 mg PRN chest discomfort (hold if SBP < 90 mmHg).',
          'Oral Beta-Blocker (Metoprolol Tartrate 25 mg BID) once hemodynamics are stable without signs of cardiogenic shock.',
        ],
        lifestyleAndDiet: [
          'Strict cardiac telemetry bed rest until post-catheterization stabilization.',
          'Cardioprotective Mediterranean diet (sodium < 1,500 mg, zero trans fats).',
          'Referral to Phase II Outpatient Cardiac Rehabilitation upon discharge.',
        ],
        contraindicationsAndWarnings: [
          'Absolute Contraindication: Avoid NSAIDs (ibuprofen, naproxen) — increases mortality, reinfarction, and cardiac rupture post-MI.',
          'Do NOT administer Nitrates if patient has used PDE-5 inhibitors (Sildenafil, Tadalafil) within 24-48 hours (risk of fatal hypotension).',
          'Assess bleeding risk before catheter access (radial artery approach preferred over femoral to minimize major bleed complications).',
        ],
        monitoringSchedule: [
          'Continuous 12-lead telemetry monitoring in Cardiac Care Unit.',
          'Serial hs-Troponin measurements at 3 hours and 6 hours to chart necrosis peak.',
          'Transthoracic Echocardiogram (TTE) within 24-48 hours to evaluate Left Ventricular Ejection Fraction (LVEF) and wall motion abnormalities.',
        ],
        emergencyRedFlags: [
          'Recurrence of ischemic chest pain refractory to medical therapy (triggers emergent immediate cath lab activation).',
          'Development of pulmonary crackles, dyspnea, or SBP < 90 mmHg (Cardiogenic Shock / Acute Heart Failure).',
          'Ventricular arrhythmias (Sustained VT / VF) on cardiac monitor.',
        ],
      },
      patientFriendlySummary:
        'Your cardiac tests and high-sensitivity troponin levels confirm that heart muscle cells have experienced acute stress due to a temporary restriction in blood flow to a coronary artery (a condition known as NSTEMI).\n\nYou have been immediately placed on standard heart-protective medications: powerful blood thinners to stop clots from expanding, a medicine to steady your blood pressure, and a high-strength cholesterol medication that coats and stabilizes the blood vessel walls. The cardiology team will perform a routine heart catheterization to inspect your coronary arteries and place a stent if needed to permanently restore full blood circulation.',
    },
  },
  {
    id: 'sample-liver-cirrhosis',
    title: 'Advanced Hepatic Fibrosis / MASH Cirrhosis Screen',
    category: 'Gastroenterology & Hepatology',
    badge: 'Liver Function & Fibrosis · Moderate Risk',
    summary: 'ALT 184 U/L, AST 210 U/L, Total Bilirubin 2.6 mg/dL, Albumin 3.1 g/dL, Platelets 98k, FIB-4 = 4.85',
    reportText: `HEPATOLOGY & LIVER SPECIALTY EVALUATION
Patient: Maria Santos, Age: 54, Female
Clinical History: Type 2 Diabetes, Metabolic Dysfunction-Associated Steatohepatitis (MASH), increasing abdominal distension and peripheral edema.

LIVER FUNCTION TESTS (LFTs):
- Alanine Aminotransferase (ALT): 184 U/L [Reference: 7 - 35 U/L] (CRITICAL HIGH)
- Aspartate Aminotransferase (AST): 210 U/L [Reference: 10 - 40 U/L] (CRITICAL HIGH, AST/ALT ratio > 1.0)
- Alkaline Phosphatase (ALP): 165 U/L [Reference: 44 - 121 U/L] (HIGH)
- Total Bilirubin: 2.6 mg/dL [Reference: 0.2 - 1.2 mg/dL] (HIGH)
- Direct Bilirubin: 1.4 mg/dL [Reference: 0.0 - 0.3 mg/dL] (HIGH)
- Serum Albumin: 3.1 g/dL [Reference: 3.5 - 5.0 g/dL] (LOW - Impaired Hepatic Synthetic Function)
- Total Protein: 6.2 g/dL [Reference: 6.0 - 8.3 g/dL] (LOW-NORMAL)

COAGULATION & HEMATOLOGY:
- Prothrombin Time (PT): 16.2 seconds [Reference: 11.0 - 13.5 s] (HIGH)
- INR: 1.45 [Reference: 0.9 - 1.1] (ELEVATED - Decreased clotting factor synthesis)
- Complete Blood Count - Platelets: 98 x10³/µL [Reference: 150 - 450 x10³/µL] (LOW - Thrombocytopenia / Splenic Sequestration)
- Hemoglobin: 11.4 g/dL (Mild normocytic anemia)

ABDOMINAL ULTRASOUND & FIBROSCAN ELASTOGRAPHY:
Findings: Coarse hepatic echotexture with nodular surface contour. Splenomegaly (14.2 cm bipolar length). Small volume ascites in Morrison's pouch.
Transient Elastography (FibroScan): Liver stiffness measurement 22.4 kPa (F4 Cirrhosis threshold >= 12.5 kPa). Controlled Attenuation Parameter (CAP): 328 dB/m (Severe hepatic steatosis).`,
    precomputedAnalysis: {
      reportType: 'Hepatology Comprehensive Panel, Coagulation & FibroScan Elastography',
      patientProfile: {
        age: '54 years',
        sex: 'Female',
        detectedSetting: 'Outpatient Hepatology / Gastroenterology Clinic',
      },
      diagnoses: [
        {
          condition: 'Compensated/Early Decompensated Cirrhosis secondary to MASH (F4 Fibrosis)',
          icdCode: 'K74.60',
          confidence: 96,
          severity: 'Severe',
          evidence: 'FibroScan liver stiffness 22.4 kPa, AST/ALT ratio > 1, thrombocytopenia 98k, and small volume ascites.',
        },
        {
          condition: 'Portal Hypertension with Hypersplenism',
          icdCode: 'K76.6',
          confidence: 94,
          severity: 'Moderate',
          evidence: 'Thrombocytopenia (98k) secondary to splenomegaly (14.2 cm) and Morrison’s pouch fluid.',
        },
        {
          condition: 'Hepatic Synthetic Dysfunction (Coagulopathy & Hypoalbuminemia)',
          icdCode: 'K76.89',
          confidence: 93,
          severity: 'Moderate',
          evidence: 'Serum Albumin 3.1 g/dL and prolonged INR 1.45.',
        },
      ],
      scoreAnalysis: {
        overallSeverityScore: 74,
        severityTier: 'High Risk',
        urgencyTimeline: 'Specialist hepatology consultation within 1-2 weeks; upper endoscopy for variceal screening.',
        evidenceQualityScore: 97,
        clinicalScores: [
          {
            name: 'FIB-4 Index (Fibrosis-4 Calculator)',
            calculatedValue: '4.85 Points',
            riskCategory: 'High',
            clinicalMeaning: 'Significantly exceeds the 2.67 threshold for advanced fibrosis; 97% positive predictive value for cirrhosis (F3-F4).',
          },
          {
            name: 'Child-Pugh Classification',
            calculatedValue: '7 Points (Class B)',
            riskCategory: 'Intermediate',
            clinicalMeaning: 'Moderate hepatic impairment. 1-year survival rate approximately 80%; requires cautious pharmacological dosing.',
          },
          {
            name: 'MELD-Na Score (Model for End-Stage Liver Disease)',
            calculatedValue: '13 Points',
            riskCategory: 'Intermediate',
            clinicalMeaning: 'Estimated 3-month mortality ~6%. Sets baseline for outpatient surveillance and potential transplant listing criteria if decompensation advances.',
          },
        ],
        biomarkerBreakdown: [
          {
            markerName: 'FIB-4 Score',
            patientValue: '4.85',
            referenceRange: '<1.30 (Low Risk)',
            status: 'Critical High',
            clinicalImpact: 'Non-invasive proof of extensive hepatic architectural remodeling and collagen deposition.',
          },
          {
            markerName: 'Platelet Count',
            patientValue: '98 x10³/µL',
            referenceRange: '150 - 450 x10³/µL',
            status: 'Low',
            clinicalImpact: 'Portal hypertension causing pooling and splenic sequestration of circulating platelets.',
          },
          {
            markerName: 'Serum Albumin',
            patientValue: '3.1 g/dL',
            referenceRange: '3.5 - 5.0 g/dL',
            status: 'Low',
            clinicalImpact: 'Reduced functional hepatocyte mass unable to produce oncotic pressure proteins, promoting fluid accumulation.',
          },
          {
            markerName: 'INR (Prothrombin Time)',
            patientValue: '1.45',
            referenceRange: '0.9 - 1.1',
            status: 'High',
            clinicalImpact: 'Impaired synthesis of vitamin K-dependent clotting factors (II, VII, IX, X).',
          },
        ],
      },
      treatmentPlan: {
        firstLineMedications: [
          {
            drugName: 'Spironolactone (Aldactone)',
            drugClass: 'Aldosterone Receptor Antagonist (Diuretic)',
            dosage: '100 mg (paired with Furosemide 40 mg if ascites progresses)',
            frequencyAndRoute: 'Once daily PO in morning',
            rationale: 'Counters secondary hyperaldosteronism typical in portal hypertension to resorb Morrison’s pouch fluid and leg edema.',
            guidelineRecommendation: 'AASLD 2021 Guidance on Management of Adult Patients with Ascites.',
          },
          {
            drugName: 'Carvedilol (Coreg)',
            drugClass: 'Non-Selective Beta-Blocker with Alpha-1 Blocker',
            dosage: '3.125 mg BID, titrate to 6.25 mg BID',
            frequencyAndRoute: 'Twice daily PO with meals',
            rationale: 'Lowers portal venous pressure through splanchnic vasoconstriction to prevent initial esophageal variceal hemorrhage.',
            guidelineRecommendation: 'Baveno VII Consensus Guidelines on Portal Hypertension (Class 1A).',
          },
          {
            drugName: 'Resmetirom (Rezdiffra) or GLP-1 RA',
            drugClass: 'Thyroid Hormone Receptor-Beta Agonist / Incretin',
            dosage: '80 mg PO once daily',
            frequencyAndRoute: 'Once daily PO',
            rationale: 'Targeted reduction in hepatic steatosis and reversal of underlying MASH inflammatory activity.',
            guidelineRecommendation: 'FDA Approved 2024 / AASLD Practice Guidance.',
          },
        ],
        adjunctiveTherapies: [
          'Esophagogastroduodenoscopy (EGD) within 4 weeks for screening and prophylactic band ligation of esophageal varices.',
          'Right Upper Quadrant (RUQ) Ultrasound + Serum Alpha-Fetoprotein (AFP) every 6 months for Hepatocellular Carcinoma (HCC) surveillance.',
          'Bone mineral density DXA scan to screen for hepatic osteodystrophy.',
        ],
        lifestyleAndDiet: [
          'Strict 2.0 g/day sodium diet to prevent progressive ascites accumulation.',
          'High protein dietary intake: 1.2 to 1.5 g/kg/day (vegetable and dairy protein prioritized) to prevent sarcopenia.',
          'Complete, total abstinence from all alcohol and hepatotoxic herbal supplements.',
        ],
        contraindicationsAndWarnings: [
          'ABSOLUTE CONTRAINDICATION: NSAIDs (Ibuprofen, Aleve) — triggers fatal hepatorenal syndrome and gastrointestinal bleeding.',
          'Limit Acetaminophen (Tylenol) to strictly < 2.0 grams (2,000 mg) per 24 hours.',
          'Avoid sedatives, benzodiazepines, and narcotics which can precipitate hepatic encephalopathy.',
        ],
        monitoringSchedule: [
          'Liver Function Panel, CMP, and Coagulation profile every 3 months.',
          'Semi-annual HCC surveillance ultrasound + AFP.',
          'Daily morning dry weights; report weight gain > 2 lbs/day or 5 lbs/week.',
        ],
        emergencyRedFlags: [
          'Hematemesis (vomiting blood or coffee-ground material) or melena (black tarry stools) — requires 911 activation.',
          'Acute onset of confusion, daytime sleepiness, slurred speech, or flapping tremor (Asterixis / Hepatic Encephalopathy).',
          'Fever with worsening abdominal pain (Spontaneous Bacterial Peritonitis).',
        ],
      },
      patientFriendlySummary:
        'Your specialized liver and blood tests indicate that persistent inflammation from fatty liver changes has led to scarring (fibrosis) in the liver tissue. Your liver is also beginning to hold on to fluid and is having a harder time making proteins.\n\nWhile this requires careful management, contemporary hepatology treatments can effectively stabilize the liver. Your plan includes medications to reduce pressure in your abdominal blood vessels, gentle diuretics to flush excess fluid, and strict dietary sodium boundaries. By avoiding liver-straining pain relievers and monitoring your health with your specialist, we can protect liver function and prevent complications.',
    },
  },
];
