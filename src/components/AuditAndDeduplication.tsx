import React, { useState } from 'react';
import { DEATH_AUDITS, DEDUPLICATION_CANDIDATES } from '../data/assam_tb_data';
import { DeathAudit, DeduplicationCandidate } from '../types/tb';
import { 
  Users, 
  FileSearch, 
  AlertOctagon, 
  CheckCircle, 
  ShieldAlert, 
  Check, 
  X, 
  PieChart, 
  HeartCrack,
  Clock,
  Sparkles,
  Stethoscope
} from 'lucide-react';

export const AuditAndDeduplication: React.FC = () => {
  const [dedupCandidates, setDedupCandidates] = useState<DeduplicationCandidate[]>(DEDUPLICATION_CANDIDATES);
  const [deathAudits, setDeathAudits] = useState<DeathAudit[]>(DEATH_AUDITS);
  const [activeTab, setActiveTab] = useState<'dedup' | 'deathAudit'>('deathAudit');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleMergeRecords = (id: string) => {
    setDedupCandidates(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: 'Confirmed Duplicate (Merged)' };
      }
      return c;
    }));
    showNotification(`Records merged and reconciled in central Nikshay database for candidate pair ${id}. Master ID established.`);
  };

  const handleRejectDuplicate = (id: string) => {
    setDedupCandidates(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: 'Distinct Patients' };
      }
      return c;
    }));
    showNotification(`Flag dismissed: Records verified as distinct clinical patients.`);
  };

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      {notification && (
        <div className="bg-[#0a192f] border border-blue-600 text-blue-100 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-blue-300 hover:text-white text-xs">Dismiss</button>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Audit Intelligence & Algorithmic De-Duplication Engine
            </h2>
            <span className="bg-blue-100 text-blue-900 border border-blue-200 text-xs px-2.5 py-0.5 rounded-full font-semibold">
              Quality & Integrity Assurance
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Machine learning fuzzy record reconciliation to eliminate fragmented Nikshay registrations and clinical verbal autopsy analytics to prevent early mortality.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab('deathAudit')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'deathAudit'
                ? 'bg-blue-700 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Early Mortality Audits ({deathAudits.length})
          </button>
          <button
            onClick={() => setActiveTab('dedup')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'dedup'
                ? 'bg-blue-700 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fuzzy De-Duplication ({dedupCandidates.length})
          </button>
        </div>
      </div>

      {/* Section 1: Death Audits */}
      {activeTab === 'deathAudit' && (
        <div className="space-y-6">
          {/* Key Insight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold uppercase block">Median Time to Mortality</span>
              <div className="text-2xl font-bold text-slate-900 mt-1">16.5 Days</div>
              <p className="text-xs text-red-600 font-medium mt-1">
                74% of patient deaths occur within first 30 days of treatment initiation
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold uppercase block">Primary Systemic Culprit</span>
              <div className="text-2xl font-bold text-slate-900 mt-1">Severe Malnutrition</div>
              <p className="text-xs text-amber-600 font-medium mt-1">
                BMI &lt; 14 is present in 62% of early-mortality verbal autopsies
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold uppercase block">Preventability Assessment</span>
              <div className="text-2xl font-bold text-blue-800 mt-1">75% Preventable</div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Actionable with upfront differentiated in-patient triage & nutrition
              </p>
            </div>
          </div>

          {/* Death Audit List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <HeartCrack className="w-4 h-4 text-red-500" />
                60-Day Early Mortality Case Audits & Root Cause Analysis
              </h3>
              <span className="text-xs text-slate-500">NTEP Assam Death Review Protocol</span>
            </div>

            <div className="divide-y divide-slate-200">
              {deathAudits.map((audit) => (
                <div key={audit.id} className="p-4 sm:p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">{audit.patientName}</span>
                        <span className="text-xs font-mono text-blue-800 font-semibold">({audit.patientId})</span>
                        <span className="text-xs px-2 py-0.5 rounded font-bold bg-red-100 text-red-800 border border-red-200">
                          Died Day {audit.daysFromTreatmentToDeath} of Rx
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {audit.age}y / {audit.gender} • {audit.tbUnit}, {audit.district}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        {audit.preventabilityTier}
                      </span>
                    </div>
                  </div>

                  {/* Findings Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-slate-500 font-semibold block mb-0.5">Primary Systemic Factor:</span>
                      <span className="font-bold text-red-700">{audit.primarySystemicFactor}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block mb-0.5">Corrective Action Instituted:</span>
                      <span className="text-slate-700">{audit.correctiveActionTaken}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Investigating Nodal Officer: <strong>{audit.investigatingOfficer}</strong></span>
                    <span>Audit Date: {audit.auditDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section 2: De-Duplication */}
      {activeTab === 'dedup' && (
        <div className="space-y-6">
          <div className="bg-[#0a192f] text-white p-5 rounded-xl border border-blue-800 shadow-md">
            <h3 className="text-sm font-bold flex items-center gap-2 text-blue-300">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Machine Learning Fuzzy Record Resolution Algorithm
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Cross-matches patient registrations across private clinics, public peripheral health institutions, and adjoining district TB units using <em>Double Metaphone Assamese phonetic transliteration</em>, mobile phone hash matching, and GPS residence cluster proximity.
            </p>
          </div>

          <div className="space-y-4">
            {dedupCandidates.map((candidate) => {
              const isMerged = candidate.status === 'Confirmed Duplicate (Merged)';
              const isDismissed = candidate.status === 'Distinct Patients';

              return (
                <div key={candidate.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">Cluster #{candidate.id}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-100 text-blue-900 border border-blue-200">
                        {candidate.matchConfidence}% Match Confidence
                      </span>
                    </div>
                    <div>
                      <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                        isMerged
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : isDismissed
                          ? 'bg-slate-100 text-slate-700 border border-slate-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {candidate.status}
                      </span>
                    </div>
                  </div>

                  {/* Side-by-side comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Record A */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1.5">
                      <div className="font-bold text-slate-700 text-xs uppercase text-blue-800">Record A (Primary Initial Entry)</div>
                      <div>Name: <strong className="text-slate-900">{candidate.candidateA.name}</strong></div>
                      <div>Nikshay ID: <span className="font-mono text-blue-900 font-semibold">{candidate.candidateA.nikshayId}</span></div>
                      <div>Demographics: {candidate.candidateA.age}y / {candidate.candidateA.gender}</div>
                      <div>Address: {candidate.candidateA.address}</div>
                      <div>Mobile: {candidate.candidateA.mobile}</div>
                      <div>Facility: {candidate.candidateA.facility}</div>
                    </div>

                    {/* Record B */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1.5">
                      <div className="font-bold text-slate-700 text-xs uppercase text-blue-800">Record B (Suspected Duplicate Registration)</div>
                      <div>Name: <strong className="text-slate-900">{candidate.candidateB.name}</strong></div>
                      <div>Nikshay ID: <span className="font-mono text-blue-800 font-semibold">{candidate.candidateB.nikshayId}</span></div>
                      <div>Demographics: {candidate.candidateB.age}y / {candidate.candidateB.gender}</div>
                      <div>Address: {candidate.candidateB.address}</div>
                      <div>Mobile: {candidate.candidateB.mobile}</div>
                      <div>Facility: {candidate.candidateB.facility}</div>
                    </div>
                  </div>

                  {/* Matching Signals */}
                  <div className="mt-3 p-3 bg-blue-50/60 rounded-lg border border-blue-200 text-xs">
                    <span className="font-bold text-blue-900 block mb-1">Identified Algorithmic Concordance:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.matchingFields.map((field, fIdx) => (
                        <span key={fIdx} className="bg-white border border-blue-300 text-blue-800 px-2 py-0.5 rounded text-[11px] font-medium">
                          ✓ {field}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  {!isMerged && !isDismissed && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleRejectDuplicate(candidate.id)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
                      >
                        Dismiss (Distinct Patients)
                      </button>
                      <button
                        onClick={() => handleMergeRecords(candidate.id)}
                        className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Confirm & Merge Master Nikshay ID
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
