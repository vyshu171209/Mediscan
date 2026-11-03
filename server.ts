import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Increase payload limit for base64 image scanning
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize Clinical Intelligence Engine
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': process.env.CLIENT_USER_AGENT || ['ais', 'tudio', '-build'].join(''),
      },
    },
  });
}

// Medical Schema for structured diagnostic output
const medicalAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    reportType: {
      type: Type.STRING,
      description: 'Specific type of medical report identified (e.g. Comprehensive Metabolic Panel, Chest CT, Histopathology Biopsy).',
    },
    patientProfile: {
      type: Type.OBJECT,
      properties: {
        age: { type: Type.STRING, description: 'Patient age if detected or estimated' },
        sex: { type: Type.STRING, description: 'Patient sex if detected or estimated' },
        detectedSetting: { type: Type.STRING, description: 'e.g. Outpatient Clinic, Emergency Dept, ICU' },
      },
      required: ['detectedSetting'],
    },
    diagnoses: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          condition: { type: Type.STRING, description: 'Name of diagnosed condition or finding' },
          icdCode: { type: Type.STRING, description: 'Relevant ICD-10 code if applicable' },
          confidence: { type: Type.NUMBER, description: 'Diagnostic confidence percentage (1-100)' },
          severity: { type: Type.STRING, description: 'Mild, Moderate, Severe, or Critical' },
          evidence: { type: Type.STRING, description: 'Exact lab marker or textual evidence supporting this' },
        },
        required: ['condition', 'confidence', 'severity', 'evidence'],
      },
    },
    scoreAnalysis: {
      type: Type.OBJECT,
      properties: {
        overallSeverityScore: {
          type: Type.NUMBER,
          description: 'Overall clinical severity index from 0 to 100',
        },
        severityTier: {
          type: Type.STRING,
          description: 'Low Risk, Moderate Risk, High Risk, or Critical / Emergent',
        },
        urgencyTimeline: {
          type: Type.STRING,
          description: 'e.g. Immediate / Emergency, Urgent within 24-48h, Routine 1-2 weeks',
        },
        evidenceQualityScore: {
          type: Type.NUMBER,
          description: 'Confidence in data quality from report from 0 to 100',
        },
        clinicalScores: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: 'e.g. ASCVD 10-Yr Risk, CURB-65, eGFR Staging, FIB-4' },
              calculatedValue: { type: Type.STRING, description: 'Calculated value (e.g. 18.4%, 2 points, Stage 3a)' },
              riskCategory: { type: Type.STRING, description: 'Low, Intermediate, Elevated, or High' },
              clinicalMeaning: { type: Type.STRING, description: 'Clinical implication of this score' },
            },
            required: ['name', 'calculatedValue', 'riskCategory', 'clinicalMeaning'],
          },
        },
        biomarkerBreakdown: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              markerName: { type: Type.STRING, description: 'e.g. HbA1c, Troponin I, Potassium, Creatinine' },
              patientValue: { type: Type.STRING, description: 'Patient value with units (e.g. 9.4%, 1.8 mg/dL)' },
              referenceRange: { type: Type.STRING, description: 'Normal reference range (e.g. 4.0 - 5.6%)' },
              status: { type: Type.STRING, description: 'Normal, High, Critical High, Low, Critical Low' },
              clinicalImpact: { type: Type.STRING, description: 'Why this value matters clinically' },
            },
            required: ['markerName', 'patientValue', 'referenceRange', 'status', 'clinicalImpact'],
          },
        },
      },
      required: ['overallSeverityScore', 'severityTier', 'urgencyTimeline', 'evidenceQualityScore', 'clinicalScores', 'biomarkerBreakdown'],
    },
    treatmentPlan: {
      type: Type.OBJECT,
      properties: {
        firstLineMedications: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              drugName: { type: Type.STRING, description: 'Generic and trade drug name' },
              drugClass: { type: Type.STRING, description: 'Pharmacologic class' },
              dosage: { type: Type.STRING, description: 'Standard recommended therapeutic dosage' },
              frequencyAndRoute: { type: Type.STRING, description: 'e.g. Once daily PO with meals' },
              rationale: { type: Type.STRING, description: 'Specific pathophysiologic rationale' },
              guidelineRecommendation: { type: Type.STRING, description: 'Source guideline (e.g. ADA Standards of Care, ACC/AHA, GOLD)' },
            },
            required: ['drugName', 'dosage', 'frequencyAndRoute', 'rationale', 'guidelineRecommendation'],
          },
        },
        adjunctiveTherapies: {
          type: Type.ARRAY,
          items: { type: Type.STRING, description: 'Secondary pharmacologic or therapeutic interventions' },
        },
        lifestyleAndDiet: {
          type: Type.ARRAY,
          items: { type: Type.STRING, description: 'Evidence-based non-pharmacological prescriptions' },
        },
        contraindicationsAndWarnings: {
          type: Type.ARRAY,
          items: { type: Type.STRING, description: 'Drugs/treatments contraindicated by these findings or lab values' },
        },
        monitoringSchedule: {
          type: Type.ARRAY,
          items: { type: Type.STRING, description: 'Follow-up lab draws and clinician visit timeline' },
        },
        emergencyRedFlags: {
          type: Type.ARRAY,
          items: { type: Type.STRING, description: 'Critical warning signs requiring immediate 911 / ER visit' },
        },
      },
      required: ['firstLineMedications', 'adjunctiveTherapies', 'lifestyleAndDiet', 'contraindicationsAndWarnings', 'monitoringSchedule', 'emergencyRedFlags'],
    },
    patientFriendlySummary: {
      type: Type.STRING,
      description: 'Clear, empathetic, jargon-free 2-3 paragraph summary explaining the results and next steps for the patient.',
    },
  },
  required: ['reportType', 'patientProfile', 'diagnoses', 'scoreAnalysis', 'treatmentPlan', 'patientFriendlySummary'],
};

// API Route: Scan Report and Predict Treatment & Score Analysis
app.post('/api/scan-report', async (req: Request, res: Response): Promise<void> => {
  try {
    const { imageBase64, mimeType, reportText, clinicalNotes } = req.body;

    if (!imageBase64 && !reportText) {
      res.status(400).json({ error: 'Please provide either an image of the report or report text.' });
      return;
    }

    if (!ai) {
      res.status(503).json({
        error: 'Clinical diagnostic service is currently unavailable or unconfigured. Please select a verified sample report to preview full analysis.',
      });
      return;
    }

    const contents: any[] = [];

    if (imageBase64) {
      // Strip data url prefix if present
      const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');
      contents.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: cleanBase64,
        },
      });
    }

    const promptText = `
You are a senior physician, laboratory director, and clinical pharmacology expert.
Examine this medical report in detail (lab results, imaging, pathology, vital signs, or discharge summary).
Perform an exhaustive clinical analysis:
1. Identify all diagnostic findings and abnormal biomarkers.
2. Calculate relevant standard clinical risk scores (e.g., ASCVD 10-Yr Risk, CURB-65, eGFR / KDIGO Staging, FIB-4, CHADS2-VASc, MELD, or Framingham depending on findings).
3. Compute an overall severity index (0-100) and evidence quality score.
4. Formulate an evidence-based primary treatment plan following current international clinical practice guidelines (ADA, ACC/AHA, KDIGO, GOLD, IDSA). Include exact dosages, frequencies, mechanism of action, and guidelines.
5. Identify absolute and relative contraindications (e.g. Metformin if eGFR < 30, ACE inhibitors with hyperkalemia, NSAIDs in kidney disease).
6. Provide emergency red flag triggers and a reassuring, clear patient-friendly translation.

${reportText ? `Report Text:\n${reportText}\n` : ''}
${clinicalNotes ? `Patient Background / Clinical Context:\n${clinicalNotes}\n` : ''}
`;

    contents.push({ text: promptText });

    const contentsPayload = contents.length === 1 ? contents[0].text : { parts: contents };
    const requestConfig = {
      systemInstruction:
        'You are an authoritative, evidence-based medical diagnostics and clinical decision support system. Provide rigorous, precise medical analysis with accurate dosages, ICD codes, and clinical guidelines. Always prioritize patient safety and detect contraindications.',
      responseMimeType: 'application/json',
      responseSchema: medicalAnalysisSchema,
    };

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contentsPayload,
        config: requestConfig,
      });
    } catch (primaryErr: any) {
      console.warn('Primary model busy, falling back to fast model:', primaryErr?.message || primaryErr);
      response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: contentsPayload,
        config: requestConfig,
      });
    }

    const rawJson = response.text || '{}';
    const parsedData = JSON.parse(rawJson);

    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error scanning medical report:', error);
    let errorMsg = 'Failed to scan and predict treatment for the report. Please try again.';
    if (error?.message) {
      if (error.message.includes('503') || error.message.includes('high demand') || error.message.includes('ResourceExhausted') || error.message.includes('429')) {
        errorMsg = 'The clinical analysis service is temporarily busy due to high network demand. Please retry in a few moments.';
      } else if (error.message.includes('API_KEY')) {
        errorMsg = 'Clinical analysis service is not properly configured.';
      }
    }
    res.status(500).json({ error: errorMsg });
  }
});

// API Route: Clinical Question / What-If Scenario Follow-up
app.post('/api/clinical-qa', async (req: Request, res: Response): Promise<void> => {
  try {
    const { question, reportSummary, currentTreatment } = req.body;

    if (!question) {
      res.status(400).json({ error: 'Question is required' });
      return;
    }

    if (!ai) {
      res.status(503).json({ error: 'Clinical decision service is currently unavailable.' });
      return;
    }

    const prompt = `
Clinical Context from Medical Report:
${JSON.stringify(reportSummary || {}, null, 2)}

Current Predicted Treatment:
${JSON.stringify(currentTreatment || {}, null, 2)}

Clinician / Patient Question:
"${question}"

Provide an authoritative, evidence-based clinical answer:
- Direct answer to the question
- Impact on treatment regimen and dosage adjustments if applicable
- Alternative medications or safety precautions
- Specific guideline citations (ACC/AHA, ADA, KDIGO, etc.)
`;

    const requestConfig = {
      systemInstruction:
        'You are a senior clinical pharmacologist and medical specialist providing decision support on medical reports and treatment adjustments.',
    };

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: requestConfig,
      });
    } catch (primaryErr: any) {
      console.warn('Primary model busy for QA, falling back to fast model:', primaryErr?.message || primaryErr);
      response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: prompt,
        config: requestConfig,
      });
    }

    res.json({ success: true, answer: response.text });
  } catch (error: any) {
    console.error('Error answering clinical question:', error);
    let errorMsg = 'Failed to answer clinical query. Please try again.';
    if (error?.message && (error.message.includes('503') || error.message.includes('high demand') || error.message.includes('429'))) {
      errorMsg = 'The clinical advisory service is temporarily experiencing high demand. Please try again shortly.';
    }
    res.status(500).json({ error: errorMsg });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Medical Report Scanner server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
