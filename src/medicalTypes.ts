export interface PatientProfile {
  age?: string;
  sex?: string;
  detectedSetting: string;
}

export interface Diagnosis {
  condition: string;
  icdCode?: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  evidence: string;
}

export interface ClinicalScore {
  name: string;
  calculatedValue: string;
  riskCategory: 'Low' | 'Intermediate' | 'Elevated' | 'High' | 'Critical';
  clinicalMeaning: string;
}

export interface BiomarkerItem {
  markerName: string;
  patientValue: string;
  referenceRange: string;
  status: 'Normal' | 'High' | 'Critical High' | 'Low' | 'Critical Low';
  clinicalImpact: string;
}

export interface ScoreAnalysis {
  overallSeverityScore: number; // 0-100
  severityTier: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Critical / Emergent';
  urgencyTimeline: string;
  evidenceQualityScore: number;
  clinicalScores: ClinicalScore[];
  biomarkerBreakdown: BiomarkerItem[];
}

export interface MedicationPrescription {
  drugName: string;
  drugClass: string;
  dosage: string;
  frequencyAndRoute: string;
  rationale: string;
  guidelineRecommendation: string;
}

export interface TreatmentPlan {
  firstLineMedications: MedicationPrescription[];
  adjunctiveTherapies: string[];
  lifestyleAndDiet: string[];
  contraindicationsAndWarnings: string[];
  monitoringSchedule: string[];
  emergencyRedFlags: string[];
}

export interface MedicalReportAnalysis {
  reportType: string;
  patientProfile: PatientProfile;
  diagnoses: Diagnosis[];
  scoreAnalysis: ScoreAnalysis;
  treatmentPlan: TreatmentPlan;
  patientFriendlySummary: string;
  timestamp?: string;
}

export interface SampleReportOption {
  id: string;
  title: string;
  category: string;
  badge: string;
  summary: string;
  reportText: string;
  precomputedAnalysis: MedicalReportAnalysis;
}
