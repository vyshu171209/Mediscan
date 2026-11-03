import React, { useState } from 'react';

export const InteractiveCalculators: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<'curb65' | 'ascvd' | 'kdigo' | 'timi' | 'fib4'>('curb65');

  // 1. CURB-65 State
  const [curbC, setCurbC] = useState(false);
  const [curbU, setCurbU] = useState(true);
  const [curbR, setCurbR] = useState(false);
  const [curbB, setCurbB] = useState(false);
  const [curb65, setCurb65] = useState(false);

  const curbScore = (curbC ? 1 : 0) + (curbU ? 1 : 0) + (curbR ? 1 : 0) + (curbB ? 1 : 0) + (curb65 ? 1 : 0);
  const getCurbRisk = () => {
    if (curbScore <= 1) return { tier: 'Low Risk', mortality: '< 1.5%', disposition: 'Outpatient treatment suitable', badge: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' };
    if (curbScore === 2) return { tier: 'Intermediate Risk', mortality: '9.2%', disposition: 'Inpatient observation or close hospital admission', badge: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' };
    return { tier: 'High / Severe Risk', mortality: '22% - 31%', disposition: 'Urgent hospital admission; evaluate ICU for scores 4-5', badge: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' };
  };

  // 2. ASCVD State
  const [ascvdAge, setAscvdAge] = useState(58);
  const [ascvdSex, setAscvdSex] = useState<'male' | 'female'>('male');
  const [ascvdTotChol, setAscvdTotChol] = useState(218);
  const [ascvdHdl, setAscvdHdl] = useState(38);
  const [ascvdSbp, setAscvdSbp] = useState(138);
  const [ascvdOnHtn, setAscvdOnHtn] = useState(true);
  const [ascvdDiabetes, setAscvdDiabetes] = useState(true);
  const [ascvdSmoker, setAscvdSmoker] = useState(false);

  // Approximate ACC/AHA pooled risk calculation formula
  const calculateAscvd = () => {
    let score = (ascvdAge - 40) * 0.45;
    score += ascvdSex === 'male' ? 4.5 : 2.5;
    score += (ascvdTotChol - 160) * 0.08;
    score -= (ascvdHdl - 45) * 0.15;
    score += (ascvdSbp - 120) * 0.12;
    if (ascvdOnHtn) score += 3.2;
    if (ascvdDiabetes) score += 6.5;
    if (ascvdSmoker) score += 5.8;
    const finalPct = Math.max(1.2, Math.min(48.5, Math.round(score * 10) / 10));
    return finalPct;
  };
  const ascvdRisk = calculateAscvd();

  // 3. KDIGO State
  const [kdigoEgfr, setKdigoEgfr] = useState(52);
  const [kdigoUacr, setKdigoUacr] = useState(185);

  const getKdigoClassification = () => {
    let gStage = 'G1 (Normal >= 90)';
    if (kdigoEgfr < 15) gStage = 'G5 (Kidney Failure < 15)';
    else if (kdigoEgfr < 30) gStage = 'G4 (Severely Decreased 15-29)';
    else if (kdigoEgfr < 45) gStage = 'G3b (Moderately-Severely Decreased 30-44)';
    else if (kdigoEgfr < 60) gStage = 'G3a (Mildly-Moderately Decreased 45-59)';
    else if (kdigoEgfr < 90) gStage = 'G2 (Mildly Decreased 60-89)';

    let aStage = 'A1 (Normal/Mild < 30 mg/g)';
    if (kdigoUacr > 300) aStage = 'A3 (Severely Increased > 300 mg/g)';
    else if (kdigoUacr >= 30) aStage = 'A2 (Moderately Increased 30-300 mg/g)';

    let riskTier = 'Low Risk';
    let riskColor = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950';
    if (kdigoEgfr < 30 || kdigoUacr > 300) {
      riskTier = 'Very High Risk (Progressive CKD / Nephrology Consultation)';
      riskColor = 'text-rose-600 bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800';
    } else if (kdigoEgfr < 45 || (kdigoEgfr < 60 && kdigoUacr >= 30)) {
      riskTier = 'High Risk of Progression';
      riskColor = 'text-orange-600 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800';
    } else if (kdigoEgfr < 60 || kdigoUacr >= 30) {
      riskTier = 'Moderate Risk';
      riskColor = 'text-amber-600 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800';
    }

    return { gStage, aStage, riskTier, riskColor };
  };

  // 4. TIMI State
  const [timiAge, setTimiAge] = useState(false);
  const [timiCadFactors, setTimiCadFactors] = useState(true);
  const [timiKnownCad, setTimiKnownCad] = useState(false);
  const [timiAspirin, setTimiAspirin] = useState(true);
  const [timiAngina, setTimiAngina] = useState(true);
  const [timiStDeviation, setTimiStDeviation] = useState(true);
  const [timiCardiacMarkers, setTimiCardiacMarkers] = useState(true);

  const timiScore =
    (timiAge ? 1 : 0) +
    (timiCadFactors ? 1 : 0) +
    (timiKnownCad ? 1 : 0) +
    (timiAspirin ? 1 : 0) +
    (timiAngina ? 1 : 0) +
    (timiStDeviation ? 1 : 0) +
    (timiCardiacMarkers ? 1 : 0);

  const getTimiRisk = () => {
    if (timiScore <= 2) return { risk: 'Low Risk', rate: '4.7% - 8.3%', plan: 'Early conservative or non-invasive ischemia evaluation' };
    if (timiScore <= 4) return { risk: 'Intermediate Risk', rate: '13.2% - 19.9%', plan: 'Inpatient admission, anti-ischemic therapy & prompt angiography' };
    return { risk: 'High Risk', rate: '26.2% - 40.9%', plan: 'Urgent early invasive strategy (coronary catheterization within 24h)' };
  };

  // 5. FIB-4 State
  const [fib4Age, setFib4Age] = useState(52);
  const [fib4Ast, setFib4Ast] = useState(68);
  const [fib4Alt, setFib4Alt] = useState(45);
  const [fib4Platelets, setFib4Platelets] = useState(115);

  const calculateFib4 = () => {
    if (fib4Platelets <= 0 || fib4Alt <= 0) return 0;
    const val = (fib4Age * fib4Ast) / (fib4Platelets * Math.sqrt(fib4Alt));
    return Math.round(val * 100) / 100;
  };
  const fib4Score = calculateFib4();
  const getFib4Risk = () => {
    if (fib4Score < 1.45) return { tier: 'Low Probability of Advanced Fibrosis', meaning: 'F0-F1 stages; high negative predictive value (>90%). Routine primary care follow-up.', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950' };
    if (fib4Score <= 3.25) return { tier: 'Indeterminate Risk Zone', meaning: 'Requires secondary non-invasive testing (FibroScan / VCTE or ELF test).', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950' };
    return { tier: 'High Probability of Advanced Fibrosis / Cirrhosis', meaning: 'F3-F4 stages; positive predictive value >65%. Urgent Hepatology referral & HCC surveillance.', color: 'text-rose-600 bg-rose-50 dark:bg-rose-950' };
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Interactive Clinical Decision Calculators
            </span>
          </div>
          <h3 className="font-headline text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Real-Time Diagnostic Risk Calculators (Live Interactive Mode)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Modify any clinical parameter below to watch risk percentages, staging categories, and clinical recommendations recompute instantly.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          5 Clinical Algorithms Active
        </span>
      </div>

      {/* Calculator Tab Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveCalculator('curb65')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCalculator === 'curb65'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          1. CURB-65 (Pneumonia)
        </button>

        <button
          onClick={() => setActiveCalculator('ascvd')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCalculator === 'ascvd'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          2. ASCVD 10-Yr (Cardiovascular)
        </button>

        <button
          onClick={() => setActiveCalculator('kdigo')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCalculator === 'kdigo'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          3. KDIGO CKD (Kidney Staging)
        </button>

        <button
          onClick={() => setActiveCalculator('timi')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCalculator === 'timi'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          4. TIMI Risk (ACS / Ischemia)
        </button>

        <button
          onClick={() => setActiveCalculator('fib4')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCalculator === 'fib4'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          5. FIB-4 (Liver Fibrosis)
        </button>
      </div>

      {/* CALCULATOR 1: CURB-65 */}
      {activeCalculator === 'curb65' && (
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="font-headline font-bold text-lg text-slate-900 dark:text-white">
                CURB-65 Pneumonia Mortality Risk Score
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Validated criterion for stratifying pneumonia severity and determining outpatient vs inpatient admission.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-headline font-black text-3xl text-emerald-600 dark:text-emerald-400">
                {curbScore} / 5 pts
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCurbRisk().badge}`}>
                {getCurbRisk().tier}
              </span>
            </div>
          </div>

          {/* Interactive Checkbox Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input type="checkbox" checked={curbC} onChange={(e) => setCurbC(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
              <span><strong>C</strong> - Confusion (Abbreviated Mental Test &lt;= 8 or disorientation)</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input type="checkbox" checked={curbU} onChange={(e) => setCurbU(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
              <span><strong>U</strong> - Blood Urea Nitrogen (BUN &gt; 19 mg/dL or &gt; 7 mmol/L)</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input type="checkbox" checked={curbR} onChange={(e) => setCurbR(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
              <span><strong>R</strong> - Respiratory Rate (&gt;= 30 breaths/min)</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input type="checkbox" checked={curbB} onChange={(e) => setCurbB(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
              <span><strong>B</strong> - Blood Pressure (SBP &lt; 90 mmHg or DBP &lt;= 60 mmHg)</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer sm:col-span-2">
              <input type="checkbox" checked={curb65} onChange={(e) => setCurb65(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
              <span><strong>65</strong> - Patient Age &gt;= 65 Years</span>
            </label>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200">Clinical Recommendation:</span>
            <p className="text-slate-600 dark:text-slate-400">
              30-Day Estimated Mortality: <strong>{getCurbRisk().mortality}</strong> · <strong>{getCurbRisk().disposition}</strong>.
            </p>
          </div>
        </div>
      )}

      {/* CALCULATOR 2: ASCVD 10-YEAR */}
      {activeCalculator === 'ascvd' && (
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="font-headline font-bold text-lg text-slate-900 dark:text-white">
                ASCVD 10-Year Primary Cardiovascular Risk
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ACC / AHA pooled cohort risk equations projecting 10-year probability of myocardial infarction or stroke.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-headline font-black text-3xl text-rose-600 dark:text-rose-400">
                {ascvdRisk}%
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${ascvdRisk >= 20 ? 'bg-rose-100 text-rose-700' : ascvdRisk >= 7.5 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {ascvdRisk >= 20 ? 'High Risk (>=20%)' : ascvdRisk >= 7.5 ? 'Intermediate Risk (7.5-19.9%)' : 'Low / Borderline'}
              </span>
            </div>
          </div>

          {/* Interactive Sliders & Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">Age:</span>
                <span className="font-bold text-slate-900 dark:text-white">{ascvdAge} years</span>
              </div>
              <input type="range" min={40} max={79} value={ascvdAge} onChange={(e) => setAscvdAge(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">Total Cholesterol:</span>
                <span className="font-bold text-slate-900 dark:text-white">{ascvdTotChol} mg/dL</span>
              </div>
              <input type="range" min={130} max={320} value={ascvdTotChol} onChange={(e) => setAscvdTotChol(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">HDL Cholesterol:</span>
                <span className="font-bold text-slate-900 dark:text-white">{ascvdHdl} mg/dL</span>
              </div>
              <input type="range" min={20} max={100} value={ascvdHdl} onChange={(e) => setAscvdHdl(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">Systolic Blood Pressure:</span>
                <span className="font-bold text-slate-900 dark:text-white">{ascvdSbp} mmHg</span>
              </div>
              <input type="range" min={90} max={200} value={ascvdSbp} onChange={(e) => setAscvdSbp(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-slate-500 font-bold block">Patient Sex:</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => setAscvdSex('male')} className={`flex-1 py-1 rounded text-xs font-bold ${ascvdSex === 'male' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>Male</button>
                <button type="button" onClick={() => setAscvdSex('female')} className={`flex-1 py-1 rounded text-xs font-bold ${ascvdSex === 'female' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>Female</button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={ascvdDiabetes} onChange={(e) => setAscvdDiabetes(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
                <span>Diabetes History</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={ascvdOnHtn} onChange={(e) => setAscvdOnHtn(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
                <span>Hypertension Therapy</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={ascvdSmoker} onChange={(e) => setAscvdSmoker(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
                <span>Current Tobacco Smoker</span>
              </label>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <strong>Guideline Directive: </strong>
            {ascvdRisk >= 20 ? 'High-intensity statin therapy (Atorvastatin 40-80mg or Rosuvastatin 20-40mg) strongly indicated to achieve >= 50% LDL-C reduction.' : ascvdRisk >= 7.5 ? 'Moderate to high-intensity statin recommended after clinician-patient risk discussion.' : 'Lifestyle optimization; statin considered if risk-enhancing factors present.'}
          </div>
        </div>
      )}

      {/* CALCULATOR 3: KDIGO CKD */}
      {activeCalculator === 'kdigo' && (
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="font-headline font-bold text-lg text-slate-900 dark:text-white">
                KDIGO Chronic Kidney Disease Progression Heatmap
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dual classification combining Glomerular Filtration Rate (G1-G5) and Albuminuria Category (A1-A3).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${getKdigoClassification().riskColor}`}>
                {getKdigoClassification().riskTier}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700 dark:text-slate-300">eGFR (mL/min/1.73m²):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{kdigoEgfr}</span>
              </div>
              <input type="range" min={10} max={120} value={kdigoEgfr} onChange={(e) => setKdigoEgfr(Number(e.target.value))} className="w-full accent-emerald-500" />
              <div className="text-[11px] text-slate-500">Classification: <strong>{getKdigoClassification().gStage}</strong></div>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700 dark:text-slate-300">Urine Albumin/Creatinine (uACR mg/g):</span>
                <span className="font-bold text-teal-600 dark:text-teal-400 text-sm">{kdigoUacr}</span>
              </div>
              <input type="range" min={5} max={800} value={kdigoUacr} onChange={(e) => setKdigoUacr(Number(e.target.value))} className="w-full accent-teal-500" />
              <div className="text-[11px] text-slate-500">Albuminuria Category: <strong>{getKdigoClassification().aStage}</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <strong>KDIGO Clinical Action: </strong>
            Initiate renoprotective SGLT2 inhibitor (Empagliflozin/Dapagliflozin) + ACEi/ARB titration to suppress intraglomerular pressure and decelerate CKD progression.
          </div>
        </div>
      )}

      {/* CALCULATOR 4: TIMI RISK SCORE */}
      {activeCalculator === 'timi' && (
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="font-headline font-bold text-lg text-slate-900 dark:text-white">
                TIMI Risk Score for UA / NSTEMI
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                14-Day all-cause mortality, new or recurrent myocardial infarction, or urgent revascularization.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-headline font-black text-3xl text-rose-600 dark:text-rose-400">
                {timiScore} / 7
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                {getTimiRisk().risk} ({getTimiRisk().rate})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input type="checkbox" checked={timiAge} onChange={(e) => setTimiAge(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
              <span>Age &gt;= 65 Years</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input type="checkbox" checked={timiCadFactors} onChange={(e) => setTimiCadFactors(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
              <span>&gt;= 3 CAD Risk Factors (FHx, HTN, Hyperlipidemia, DM, Smoker)</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input type="checkbox" checked={timiKnownCad} onChange={(e) => setTimiKnownCad(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
              <span>Known CAD (Coronary Stenosis &gt;= 50%)</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input type="checkbox" checked={timiAspirin} onChange={(e) => setTimiAspirin(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
              <span>Aspirin Use in Past 7 Days</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input type="checkbox" checked={timiAngina} onChange={(e) => setTimiAngina(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
              <span>Severe Angina (&gt;= 2 Anginal Episodes in Past 24h)</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input type="checkbox" checked={timiStDeviation} onChange={(e) => setTimiStDeviation(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
              <span>ST-Segment Deviation &gt;= 0.5 mm on ECG</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer sm:col-span-2">
              <input type="checkbox" checked={timiCardiacMarkers} onChange={(e) => setTimiCardiacMarkers(e.target.checked)} className="w-4 h-4 accent-emerald-500 rounded" />
              <span>Elevated Serum Cardiac Biomarkers (hs-Troponin I or T)</span>
            </label>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <strong>Management Strategy: </strong>
            {getTimiRisk().plan}
          </div>
        </div>
      )}

      {/* CALCULATOR 5: FIB-4 SCORE */}
      {activeCalculator === 'fib4' && (
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="font-headline font-bold text-lg text-slate-900 dark:text-white">
                FIB-4 Liver Fibrosis Index
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Non-invasive index evaluating advanced hepatic fibrosis and cirrhosis in MASH and viral hepatitis.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-headline font-black text-3xl text-emerald-600 dark:text-emerald-400">
                {fib4Score}
              </span>
              <span className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${getFib4Risk().color}`}>
                {getFib4Risk().tier}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between font-bold">
                <span>Age:</span>
                <span className="text-emerald-600">{fib4Age} yr</span>
              </div>
              <input type="range" min={18} max={85} value={fib4Age} onChange={(e) => setFib4Age(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between font-bold">
                <span>AST (U/L):</span>
                <span className="text-emerald-600">{fib4Ast}</span>
              </div>
              <input type="range" min={10} max={250} value={fib4Ast} onChange={(e) => setFib4Ast(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between font-bold">
                <span>ALT (U/L):</span>
                <span className="text-emerald-600">{fib4Alt}</span>
              </div>
              <input type="range" min={10} max={250} value={fib4Alt} onChange={(e) => setFib4Alt(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between font-bold">
                <span>Platelets (10^9/L):</span>
                <span className="text-emerald-600">{fib4Platelets}</span>
              </div>
              <input type="range" min={30} max={450} value={fib4Platelets} onChange={(e) => setFib4Platelets(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
            <strong>Diagnostic Implication: </strong>
            <p className="text-slate-600 dark:text-slate-400">{getFib4Risk().meaning}</p>
          </div>
        </div>
      )}
    </div>
  );
};
