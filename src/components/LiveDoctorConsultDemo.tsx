import React, { useState, useEffect, useRef } from 'react';
import { TreatmentPlan } from '../medicalTypes';

interface LiveDoctorConsultDemoProps {
  treatmentData: TreatmentPlan;
  reportTitle?: string;
}

export const LiveDoctorConsultDemo: React.FC<LiveDoctorConsultDemoProps> = ({
  treatmentData,
  reportTitle,
}) => {
  const [callStatus, setCallStatus] = useState<'connected' | 'ended'>('connected');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isDoctorSpeaking, setIsDoctorSpeaking] = useState(false);
  const [activeSpeechText, setActiveSpeechText] = useState(
    'Hello! I am Dr. Sarah Chen. I have reviewed your medical report and confirmed the indicated pharmacotherapy.'
  );
  const [doctorNote, setDoctorNote] = useState<string>(
    'Patient findings reviewed. Primary therapy indicated: guideline-directed pharmacotherapy with renal and glycemic monitoring. Confirmed safe contraindication profile with zero NSAID overlap.'
  );
  const [isNoteApproved, setIsNoteApproved] = useState(false);

  // References for video & canvas
  const patientVideoRef = useRef<HTMLVideoElement | null>(null);
  const doctorCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // Real webcam feed initialization
  useEffect(() => {
    if (callStatus === 'connected' && isVideoOn) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            localStreamRef.current = stream;
            if (patientVideoRef.current) {
              patientVideoRef.current.srcObject = stream;
              patientVideoRef.current.play().catch(() => {});
            }
            setIsCameraActive(true);
          })
          .catch((err) => {
            console.log('Webcam not permitted or unavailable; running simulated stream', err);
            setIsCameraActive(false);
          });
      }
    } else {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }
      setIsCameraActive(false);
    }

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }
    };
  }, [callStatus, isVideoOn]);

  // Doctor animated canvas video loop
  useEffect(() => {
    const canvas = doctorCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      const w = canvas.width;
      const h = canvas.height;

      // Dark clinical room backdrop with gradient
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#09131e');
      bgGrad.addColorStop(0.5, '#0e2032');
      bgGrad.addColorStop(1, '#050c14');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Hospital room background elements: blurred shelves & medical monitor
      ctx.fillStyle = 'rgba(16, 185, 129, 0.04)';
      ctx.fillRect(20, 30, 160, 90);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1;
      ctx.strokeRect(20, 30, 160, 90);

      // Mini ECG waveform in background monitor
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      for (let x = 25; x < 175; x += 3) {
        const y = 75 + Math.sin((x + t * 40) * 0.1) * (x % 35 === 0 ? 18 : 3);
        if (x === 25) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Telemetry HUD text
      ctx.fillStyle = '#6ee7b7';
      ctx.font = '10px monospace';
      ctx.fillText('LIVE VITALS: 74 BPM | SpO2: 98% | BP: 124/80', 25, 45);

      // Doctor's upper body / lab coat
      const centerX = w / 2;
      const centerY = h * 0.62;

      // Shoulders / White Lab Coat
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 140, 170, 95, 0, 0, Math.PI * 2);
      ctx.fill();

      // Inner scrubs (Teal / Blue)
      ctx.fillStyle = '#0f766e';
      ctx.beginPath();
      ctx.moveTo(centerX - 35, centerY + 70);
      ctx.lineTo(centerX + 35, centerY + 70);
      ctx.lineTo(centerX, centerY + 160);
      ctx.closePath();
      ctx.fill();

      // Stethoscope around neck
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(centerX, centerY + 70, 52, 0.2, Math.PI - 0.2);
      ctx.stroke();

      // Stethoscope chest piece
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(centerX + 32, centerY + 130, 9, 0, Math.PI * 2);
      ctx.fill();

      // Doctor's Head & Face
      const headBob = isDoctorSpeaking ? Math.sin(t * 5) * 2.5 : Math.sin(t * 1.5) * 1.2;
      const headY = centerY - 35 + headBob;

      // Hair
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.ellipse(centerX, headY - 10, 48, 55, 0, 0, Math.PI * 2);
      ctx.fill();

      // Face skin
      ctx.fillStyle = '#f7d3ba';
      ctx.beginPath();
      ctx.ellipse(centerX, headY + 5, 42, 48, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hair front fringe
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(centerX - 15, headY - 32, 28, 0, Math.PI);
      ctx.arc(centerX + 20, headY - 30, 24, 0, Math.PI);
      ctx.fill();

      // Eyes
      const blink = Math.sin(t * 0.8) > 0.98;
      ctx.fillStyle = '#0f172a';
      if (blink) {
        ctx.fillRect(centerX - 24, headY - 4, 14, 2);
        ctx.fillRect(centerX + 10, headY - 4, 14, 2);
      } else {
        ctx.beginPath();
        ctx.arc(centerX - 17, headY - 3, 4.5, 0, Math.PI * 2);
        ctx.arc(centerX + 17, headY - 3, 4.5, 0, Math.PI * 2);
        ctx.fill();
        // Eye reflections
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(centerX - 18, headY - 5, 1.5, 0, Math.PI * 2);
        ctx.arc(centerX + 16, headY - 5, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Eyeglasses (Doctor frame)
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - 28, headY - 12, 22, 17);
      ctx.strokeRect(centerX + 6, headY - 12, 22, 17);
      ctx.beginPath();
      ctx.moveTo(centerX - 6, headY - 4);
      ctx.lineTo(centerX + 6, headY - 4);
      ctx.stroke();

      // Nose
      ctx.strokeStyle = '#d49b7e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, headY);
      ctx.lineTo(centerX + 2, headY + 12);
      ctx.stroke();

      // Mouth with speaking animation
      ctx.fillStyle = '#b91c1c';
      const mouthOpen = isDoctorSpeaking ? Math.abs(Math.sin(t * 8)) * 7 + 2 : 2;
      ctx.beginPath();
      ctx.ellipse(centerX, headY + 26, 9, mouthOpen, 0, 0, Math.PI * 2);
      ctx.fill();

      // Live Watermark in top corner
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(w - 30, 30, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('LIVE STREAM 1080p', w - 42, 34);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDoctorSpeaking]);

  // Voice speech synthesis
  const speakDoctorMessage = (text: string) => {
    setActiveSpeechText(text);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      utterance.onstart = () => setIsDoctorSpeaking(true);
      utterance.onend = () => setIsDoctorSpeaking(false);
      utterance.onerror = () => setIsDoctorSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsDoctorSpeaking(true);
      setTimeout(() => setIsDoctorSpeaking(false), 5000);
    }
  };

  return (
    <section className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Live Video Telehealth Session
            </span>
            {reportTitle && (
              <span className="text-xs text-slate-400 truncate max-w-xs">
                Case: {reportTitle}
              </span>
            )}
          </div>
          <h3 className="font-headline text-2xl font-bold mt-1 text-white">
            Direct Doctor Video Consultation
          </h3>
          <p className="text-xs text-slate-400">
            Real-time interactive video session with attending specialist to verify medical findings and sign off on treatments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {callStatus === 'connected' ? (
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Session Connected · 1080p Video</span>
            </span>
          ) : (
            <button
              onClick={() => {
                setCallStatus('connected');
                speakDoctorMessage('Welcome back. Let us review your laboratory metrics and treatment plan.');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-base">video_call</span>
              <span>Re-Start Video Call</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Video & Consultation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Video Window (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
            {callStatus === 'connected' ? (
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                {/* Doctor's Animated Live Video Feed */}
                <canvas
                  ref={doctorCanvasRef}
                  width={640}
                  height={360}
                  className="w-full h-full object-cover"
                />

                {/* Patient Camera Stream (Picture-in-Picture) */}
                <div className="absolute top-4 right-4 w-32 sm:w-44 aspect-video bg-slate-900 border-2 border-emerald-500/50 rounded-xl overflow-hidden shadow-2xl z-20">
                  {isCameraActive ? (
                    <video
                      ref={patientVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover scale-x-[-1]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-slate-900">
                      <span className="material-symbols-outlined text-slate-400 text-2xl">videocam_off</span>
                      <span className="text-[10px] font-bold text-slate-300 mt-1">Patient Feed</span>
                      <span className="text-[9px] text-emerald-400">Audio Connected</span>
                    </div>
                  )}
                  <div className="absolute bottom-1 left-1 bg-black/70 px-1.5 py-0.2 rounded text-[9px] font-bold text-white">
                    You
                  </div>
                </div>

                {/* Doctor ID & Speech Banner */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-slate-800/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <span className="material-symbols-outlined text-lg">medical_services</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-bold text-xs text-white">Dr. Sarah Chen, MD, FACC</span>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                        Attending Physician
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5 line-clamp-2 italic">
                      &ldquo;{activeSpeechText}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video flex flex-col items-center justify-center p-8 text-center space-y-3 bg-slate-950">
                <span className="material-symbols-outlined text-5xl text-slate-600">call_end</span>
                <p className="text-sm font-bold text-white">Consultation Video Ended</p>
                <p className="text-xs text-slate-400">Click below to reconnect with Dr. Sarah Chen.</p>
                <button
                  onClick={() => {
                    setCallStatus('connected');
                    speakDoctorMessage('Connecting you to live medical consult.');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-lg"
                >
                  Start Live Video Call
                </button>
              </div>
            )}
          </div>

          {/* Interactive Doctor Conversation Prompts */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-emerald-400">record_voice_over</span>
              <span>Ask Doctor During Live Call (Voice &amp; Video Sync):</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() =>
                  speakDoctorMessage(
                    'I have evaluated your HbA1c and renal markers. Starting with Metformin and an SGLT2 inhibitor provides proven organ protection and maintains stable glucose levels.'
                  )
                }
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[11px] text-left text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                &quot;Doctor, please review my laboratory values.&quot;
              </button>

              <button
                type="button"
                onClick={() =>
                  speakDoctorMessage(
                    'Your dosage has been calibrated to your eGFR baseline. Be sure to avoid any over-the-counter NSAIDs like ibuprofen, which could strain your kidneys.'
                  )
                }
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[11px] text-left text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                &quot;Are there any drug or kidney contraindications?&quot;
              </button>

              <button
                type="button"
                onClick={() =>
                  speakDoctorMessage(
                    'We will repeat your comprehensive metabolic panel in 60 days. If you experience any lightheadedness or nausea, reach out immediately.'
                  )
                }
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[11px] text-left text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                &quot;What is the follow-up monitoring timeline?&quot;
              </button>
            </div>
          </div>

          {/* Call Controls Bar */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsMuted((p) => !p)}
              className={`p-3 rounded-xl transition-colors cursor-pointer ${
                isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
              title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
            >
              <span className="material-symbols-outlined text-lg">{isMuted ? 'mic_off' : 'mic'}</span>
            </button>

            <button
              onClick={() => setIsVideoOn((p) => !p)}
              className={`p-3 rounded-xl transition-colors cursor-pointer ${
                !isVideoOn ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
              title={isVideoOn ? 'Turn Camera Off' : 'Turn Camera On'}
            >
              <span className="material-symbols-outlined text-lg">{isVideoOn ? 'videocam' : 'videocam_off'}</span>
            </button>

            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setCallStatus(callStatus === 'connected' ? 'ended' : 'connected');
              }}
              className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                callStatus === 'connected'
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {callStatus === 'connected' ? 'call_end' : 'call'}
              </span>
              <span>{callStatus === 'connected' ? 'End Video Call' : 'Start Video Call'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Doctor's Live Second Opinion & Prescription Signoff (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Attending Physician Signoff
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                EHR Synchronized
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                Doctor Consultation Notes:
              </label>
              <textarea
                rows={4}
                value={doctorNote}
                onChange={(e) => setDoctorNote(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Prescriptions Approved Checklist */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">
                Regimen Signoff Verification:
              </span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {treatmentData.firstLineMedications.map((med, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white">{med.drugName}</span>
                      <div className="text-[10px] text-slate-400">{med.dosage} · {med.frequencyAndRoute}</div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      Approved
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sign and Append to Medical Record */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsNoteApproved(true)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-headline font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
              >
                <span className="material-symbols-outlined text-base">verified</span>
                <span>{isNoteApproved ? 'Doctor Second Opinion Confirmed' : 'Sign & Validate Regimen to EHR'}</span>
              </button>
              {isNoteApproved && (
                <p className="text-[10px] text-emerald-400 text-center mt-1.5">
                  Signed by Dr. Sarah Chen, MD, FACC on {new Date().toLocaleTimeString()} · Record #EHR-9921
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
