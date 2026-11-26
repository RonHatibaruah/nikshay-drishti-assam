import React, { useState } from 'react';
import { 
  Heart, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  Stethoscope, 
  BookOpen,
  Award
} from 'lucide-react';

interface DedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTutorial?: () => void;
}

export const DedicationModal: React.FC<DedicationModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenTutorial 
}) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('nikshay_dedication_dismissed', 'true');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-blue-900/20 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-800">
        
        {/* Top Header - Deep Navy Blue with Indian Tricolor subtle accent strip */}
        <div className="bg-[#0a192f] text-white p-6 sm:p-8 relative">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-600" />
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-blue-900/60 transition-colors"
            title="Close Dedication Window"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-rose-950/40 flex-shrink-0">
              <Heart className="w-7 h-7 fill-white" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-[11px] font-mono text-rose-300 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Founder's Personal Dedication</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Dedicated to My Mother
              </h2>
              <p className="text-xs sm:text-sm text-blue-200/80 mt-0.5">
                In Gratitude for Her Recovery & in Moral Service of Public Health
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body - Crisp White with Elegant Typography */}
        <div className="p-6 sm:p-8 space-y-5 text-sm leading-relaxed text-slate-700">
          
          {/* Heartfelt Story Quote Box */}
          <div className="bg-gradient-to-br from-rose-50/70 via-blue-50/40 to-slate-50 border border-rose-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-rose-900 font-bold text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
              <span>A Personal Journey from Diagnosis to Recovery</span>
            </div>
            <p className="italic text-slate-800 text-sm leading-relaxed">
              &ldquo;This initiative is affectionately and reverently dedicated to my Mother, who recently suffered from Tuberculosis and fought through the arduous physical and emotional journey to achieve a complete, triumphant recovery.&rdquo;
            </p>
          </div>

          {/* Core Essay / Reflection on Tech Duty */}
          <div className="space-y-3.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
            <p>
              Witnessing a loved one endure the crushing weight of Tuberculosis firsthand—the frightening cough, rapid loss of weight, weeks of diagnostic ambiguity, the relentless rigor of multi-month antibiotic regimens, and the sheer vulnerability when proper nutrition and care coordination falter—was a deeply humbling and transformative experience.
            </p>

            <p>
              As a senior technology architect and systems specialist, this intimate encounter with illness laid bare an undeniable moral truth: <strong className="text-slate-900 font-semibold">technology without empathy is empty, but empathy equipped with engineering and management rigor possesses the power to transform and save lives.</strong>
            </p>

            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-blue-950 text-xs">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>The Tech Expert's Duty in Public Health</span>
              </div>
              <p className="text-blue-900/90 text-xs leading-relaxed">
                Tuberculosis is one of mankind&apos;s oldest afflictions, yet in our society, lives are tragically lost not because curative medicines are unavailable, but because of <strong>diagnostic delays</strong>, <strong>specimens lost in transit</strong> across fragmented logistics, <strong>delayed differentiated care</strong> for undernourished elders, and a lack of real-time clinical intelligence for overburdened frontline workers.
              </p>
              <p className="text-blue-900/90 text-xs leading-relaxed">
                It is the solemn obligation of technologists and management leaders to direct our finest tools—predictive machine learning, explainable CDSS, GIS hotspot spatial intelligence, and automated supply chains—toward our nation&apos;s greatest healthcare battles.
              </p>
            </div>

            <p>
              <strong>NikshayDrishti</strong> was engineered with this exact personal conviction: to ensure that no patient is abandoned in referral queues, no vulnerable individual slips through algorithmic cracks, and every healthcare worker across Assam is empowered to protect someone&apos;s mother, father, or child.
            </p>
          </div>

          {/* Author Signature Card */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-bold text-slate-900 text-sm">Kalyanjit Hatibaruah</div>
              <div className="text-xs text-slate-500">
                Lead Applicant & Enterprise Solutions Architect • Flugelsoft Labs
              </div>
              <div className="text-[11px] font-mono text-blue-800 mt-0.5">
                NESFIC-D-30: AI-Enabled Vulnerability Stratification & Differentiated Care
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Don&apos;t show again automatically</span>
              </label>
            </div>
          </div>

        </div>

        {/* Modal Footer - Navy Accent & Action Buttons */}
        <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {onOpenTutorial && (
            <button
              onClick={() => {
                handleClose();
                onOpenTutorial();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Tutorial & Video Guide</span>
            </button>
          )}

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-900/20 inline-flex items-center gap-2 transition-all"
            >
              <span>Enter NikshayDrishti Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
