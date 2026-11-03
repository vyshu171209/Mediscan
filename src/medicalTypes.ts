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

export interface TreatmentFeedback {
  id: string;
  submittedAt: string;
  overallRating: number; // 1-5
  effectivenessRating: number; // 1-5
  toleranceStatus: 'Well Tolerated' | 'Mild Side Effects' | 'Moderate Intolerance' | 'Dose Modification Needed';
  adherencePercentage: number;
  symptomsImproved: boolean;
  clinicianComments: string;
  patientComments: string;
  recommendedFollowUpAction: string;
}

export interface PatientPreferences {
  preferredRoute: 'oral_only' | 'injectable_ok' | 'any';
  costBudget: 'standard_generic' | 'value_optimized' | 'premium_comprehensive';
  dietaryCapacity: 'strict_dash' | 'moderate_balanced' | 'lifestyle_coached';
  activityLevel: 'sedentary' | 'moderate_walk' | 'vigorous';
  monitoringMethod: 'home_digital_cgm' | 'clinic_visits_only';
}

export interface TreatmentTimelineStep {
  phase: string;
  timeframe: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  actions: string[];
  expectedBiomarkerChange: {
    marker: string;
    before: string;
    target: string;
  }[];
  clinicalGoal: string;
  riskAlert?: string;
}

export interface MedicalReportAnalysis {
  reportType: string;
  patientProfile: PatientProfile;
  diagnoses: Diagnosis[];
  scoreAnalysis: ScoreAnalysis;
  treatmentPlan: TreatmentPlan;
  patientFriendlySummary: string;
  timestamp?: string;
  feedback?: TreatmentFeedback;
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
