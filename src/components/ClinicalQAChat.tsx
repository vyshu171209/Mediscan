import React, { useState } from 'react';
import { MedicalReportAnalysis } from '../medicalTypes';

interface ClinicalQAChatProps {
  analysis: MedicalReportAnalysis;
}

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const ClinicalQAChat: React.FC<ClinicalQAChatProps> = ({ analysis }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: `Hello! I have analyzed this ${analysis.reportType}. You can ask any clinical follow-up question, test "what-if" drug allergy scenarios, or request dosing adjustments based on these specific findings.`,
      time: 'Just now',
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const suggestedQuestions = [
    'What if the patient is allergic to Penicillin / Beta-lactams?',
    'Can this patient safely take Metformin with their current eGFR?',
    'What if the patient develops statin intolerance or myalgia?',
    'How should we adjust medications if potassium rises above 5.2?',
  ];

  const handleSendQuestion = async (queryText?: string) => {
    const q = queryText || inputQuestion;
    if (!q.trim() || isSubmitting) return;

    const userMsg: Message = {
      sender: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuestion('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/clinical-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          reportSummary: {
            reportType: analysis.reportType,
            diagnoses: analysis.diagnoses,
            scoreAnalysis: analysis.scoreAnalysis,
          },
          currentTreatment: analysis.treatmentPlan,
        }),
      });

      const data = await response.json();

      if (data.success && data.answer) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'assistant',
            text: data.answer,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error(data.error || 'No response generated');
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: `Clinical Decision Support Note: When evaluating "${q}", guidelines recommend strictly cross-checking hepatic and renal clearance. If API connection is restricted in this environment, always verify with institutional pharmacy and UpToDate protocols.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden flex flex-col h-[520px]">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">forum</span>
          </div>
          <div>
            <h4 className="font-headline font-bold text-sm text-slate-900 dark:text-white">
              Clinical Decision Support & Scenario Q&A
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Ask about alternative drugs, drug-drug interactions, and clinical guidelines.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
          Grounded to Scanned Report
        </span>
      </div>

      {/* Suggested Quick Queries */}
      <div className="px-5 py-2.5 bg-slate-100/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex gap-2 overflow-x-auto no-scrollbar">
        {suggestedQuestions.map((sug, i) => (
          <button
            key={i}
            onClick={() => handleSendQuestion(sug)}
            disabled={isSubmitting}
            className="shrink-0 text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 px-3 py-1 rounded-full text-slate-700 dark:text-slate-300 font-medium transition-colors cursor-pointer"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700 whitespace-pre-line'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
          </div>
        ))}

        {isSubmitting && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 py-2">
            <span className="material-symbols-outlined animate-spin text-emerald-600 text-base">
              progress_activity
            </span>
            <span>Querying clinical pharmacology & guideline corpus...</span>
          </div>
        )}
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendQuestion();
        }}
        className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Ask a clinical question about this report (e.g. drug allergy, dosage change, guideline citation)..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={!inputQuestion.trim() || isSubmitting}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Send</span>
          <span className="material-symbols-outlined text-sm">send</span>
        </button>
      </form>
    </div>
  );
};
