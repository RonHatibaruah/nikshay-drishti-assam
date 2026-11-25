import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Copy, 
  Download, 
  ExternalLink, 
  HelpCircle, 
  Layers, 
  MapPin, 
  Shield, 
  ShieldAlert, 
  Stethoscope, 
  Activity, 
  HeartPulse, 
  FileText,
  Truck,
  Cpu,
  Clock,
  ChevronRight,
  Info
} from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string) => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
  setActiveTab
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (filename: string, textUrl: string) => {
    fetch(textUrl)
      .then(r => r.text())
      .then(text => {
        navigator.clipboard.writeText(text);
        setCopiedNotice(`Copied full text of ${filename} to clipboard!`);
        setTimeout(() => setCopiedNotice(null), 3500);
      })
      .catch(() => {
        setCopiedNotice(`Please download ${filename} directly via the link below.`);
        setTimeout(() => setCopiedNotice(null), 3500);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-teal-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">
                  Tutorial & System Guide: NikshayDrishti (নিশ্চয় দৃষ্টি)
                </h2>
                <span className="text-[10px] font-mono bg-teal-800 text-teal-200 px-2 py-0.5 rounded border border-teal-600/40">
                  NESFIC-D-30
                </span>
              </div>
              <p className="text-xs text-slate-300">
                What the application is, how to use it, and how to test every departmental capability.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Step Navigation Pill Tabs */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { step: 1, label: '1. What It Is' },
            { step: 2, label: '2. User Roles' },
            { step: 3, label: '3. Feature Tour' },
            { step: 4, label: '4. Official Proposal' }
          ].map(s => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeStep === s.step
                  ? 'bg-teal-700 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Notification Toast */}
        {copiedNotice && (
          <div className="bg-emerald-800 text-white text-xs px-4 py-2 font-medium flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span>{copiedNotice}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed flex-1">
          
          {/* STEP 1: What is NikshayDrishti? */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="bg-teal-50 border border-teal-200 p-4 rounded-xl text-teal-950">
                <h3 className="text-sm font-bold text-teal-900 mb-1 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-teal-700" />
                  What is NikshayDrishti?
                </h3>
                <p>
                  <strong>NikshayDrishti (নিশ্চয় দৃষ্টি)</strong> is an artificial intelligence-powered clinical decision-support and programmatic decision-support system (CDSS) developed for the <strong>National Health Mission (NHM) and State TB Cell, Government of Assam</strong> under <strong>NESFIC-D-30 (Stream 1 — Government Track: Health Sector)</strong>.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">The Real-World Challenge in Assam:</h4>
                <ul className="space-y-2 pl-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>High Early Mortality:</strong> Approximately 74% of patient deaths occur within the first 30 days of treatment initiation, predominantly driven by severe undernutrition (BMI &lt; 14), delayed presentation, and diagnostic lag.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Vulnerable Geographic Pockets:</strong> Tea garden line bastis in Upper Assam (Dibrugarh, Tinsukia) and riverine char sandbars in Lower Assam (Barpeta, Dhubri) face acute access barriers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Diagnostic Referral Leakage:</strong> High dropout rates between cough screening at peripheral Ayushman Arogya Mandirs and molecular NAAT testing at distant labs.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-amber-900">
                <strong>Mandatory Statutory Guardrail:</strong> In strict compliance with the challenge mandate, all risk outputs and recommendations are <em>decision-support only</em> and do not replace clinical diagnosis or authorized programme decisions by medical officers.
              </div>
            </div>
          )}

          {/* STEP 2: User Roles */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Role-Based Consoles (Switch using the top navigation bar):
              </h3>
              <p className="text-slate-500">
                The platform tailors features for four primary stakeholders in Assam’s health system:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                    <Shield className="w-4 h-4 text-teal-600" />
                    State TB Officer (STO)
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Accesses statewide strategic dashboards, 35-district notification trajectories, mortality reduction trends vs 2015 baseline, and Nikshay Poshan DBT disbursement oversight.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    District TB Officer (DTO)
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Monitors diagnostic cartridge burn rates, receives 14-day stock-out early warnings, schedules automated Supervisory Priority Index (SPI) tours, and conducts death audits.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                    <Stethoscope className="w-4 h-4 text-teal-600" />
                    Medical Officer & STS
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Reviews clinical patient worklists, inspects SHAP explainability cards, approves inpatient bed triage for critical patients, and delivers high-protein food baskets.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Feature Tour */}
          {activeStep === 3 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                How to Test Each Core Capability:
              </h3>
              
              <div className="space-y-2.5">
                {[
                  {
                    tab: 'worklist',
                    title: '1. Risk Stratification & Differentiated Care',
                    desc: 'Filter by Critical/High risk, click "Explain & CDSS" to view the SHAP biomarker breakdown (BMI < 14, smear 3+, MDR), and approve high-protein food baskets.',
                    icon: HeartPulse
                  },
                  {
                    tab: 'gis',
                    title: '2. Geospatial Vulnerability & ACF Map',
                    desc: 'Explore Assam tea estates, char areas, and slums on the Leaflet map. Click any cluster to inspect population yield and click "Dispatch AI-Xray Van".',
                    icon: Layers
                  },
                  {
                    tab: 'referrals',
                    title: '3. Closed-Loop Referral Cascade',
                    desc: 'Follow the 5-stage diagnostic pipeline from Ayushman Arogya Mandirs to NAAT testing. Click "Advance Step" or "Escalate" on SLA overdue samples.',
                    icon: Clock
                  },
                  {
                    tab: 'facilities',
                    title: '4. Facility Supervision & Predictive Logistics',
                    desc: 'Monitor Truenat/CBNAAT capacity utilization, view the 14-day cartridge stockout predictor, and schedule weekly Supervisory Priority Index (SPI) tours.',
                    icon: Cpu
                  },
                  {
                    tab: 'audit',
                    title: '5. Audit & Algorithmic De-Duplication',
                    desc: 'Test the Double Metaphone Assamese fuzzy record matcher to merge duplicate Nikshay IDs, and review 60-day early mortality verbal autopsies.',
                    icon: FileText
                  },
                  {
                    tab: 'admin',
                    title: '6. Admin Console & Management System',
                    desc: 'Dedicated governance cockpit: add patients, execute manual clinical triage overrides, dispatch emergency cartridge buffer stock, and adjust CDSS AI weights (Demo: admin@nhm.assam.gov.in / dispur2026).',
                    icon: Shield
                  }
                ].map(feat => {
                  const Icon = feat.icon;
                  return (
                    <div key={feat.tab} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <Icon className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-slate-900">{feat.title}</h4>
                          <p className="text-slate-600 text-[11px] mt-0.5">{feat.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab(feat.tab);
                          onClose();
                        }}
                        className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded font-bold text-[10px] whitespace-nowrap shadow flex items-center gap-1"
                      >
                        Open Tab <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Official Proposal Document */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <div className="bg-slate-900 text-white p-5 rounded-xl border border-teal-800">
                <h3 className="text-sm font-bold text-teal-300 flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-teal-400" />
                  Official NESFIC-D-30 Solution Proposal
                </h3>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  The complete official proposal submission document prepared for the National Health Mission (NHM) and State TB Cell, Government of Assam, formatted under the Uniform Solution Proposal Requirements (USPR).
                </p>
              </div>

              {/* Official Proposal Download Card */}
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Official Solution Proposal Document (PDF)</h4>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Includes all 12 submission fields, implementation roadmap, budget allocation, and embedded 16:9 widescreen technological framework infographics.
                  </p>
                </div>
                <a
                  href="/downloads/NESFIC_D30_Proposal_Kalyanjit_Hatibaruah.pdf"
                  target="_blank"
                  rel="noreferrer"
                  download="NESFIC_D30_Proposal_Kalyanjit_Hatibaruah.pdf"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow flex items-center gap-2 whitespace-nowrap self-start sm:self-center"
                >
                  <Download className="w-4 h-4" />
                  Download Proposal (PDF)
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Lead Applicant / Principal Investigator: <strong>Kalyanjit Hatibaruah</strong> • Flugelsoft Labs (kalyanjit.hatibaruah@gmail.com)
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
