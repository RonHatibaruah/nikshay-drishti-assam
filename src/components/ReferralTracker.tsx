import React, { useState } from 'react';
import { REFERRAL_LOOPS } from '../data/assam_tb_data';
import { ReferralLoop } from '../types/tb';
import { 
  GitCommit, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Search, 
  Filter, 
  FileCheck, 
  Truck,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';

export const ReferralTracker: React.FC = () => {
  const [referrals, setReferrals] = useState<ReferralLoop[]>(REFERRAL_LOOPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const filteredReferrals = referrals.filter(ref => {
    const matchesSearch = 
      ref.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.originPHI.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || ref.transportStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const triggerEscalation = (refId: string, patientName: string) => {
    setActionMessage(`Urgent SLA escalation dispatched to Senior TB Lab Supervisor (STLS) for ${patientName}`);
    setTimeout(() => setActionMessage(null), 4000);
  };

  const advanceStatus = (refId: string) => {
    setReferrals(prev => prev.map(ref => {
      if (ref.id === refId) {
        if (ref.transportStatus === 'Sample in Transit') {
          return { ...ref, transportStatus: 'Tested', elapsedDays: ref.elapsedDays + 1, isOverdue: false };
        } else if (ref.transportStatus === 'Tested') {
          return { ...ref, transportStatus: 'Report Released', elapsedDays: ref.elapsedDays + 1 };
        } else if (ref.transportStatus === 'Report Released') {
          return { ...ref, transportStatus: 'Treatment Initiated', elapsedDays: ref.elapsedDays + 1, actionPendingWith: 'Completed' };
        } else if (ref.transportStatus === 'LOST_IN_TRANSIT_ALERT') {
          return { ...ref, transportStatus: 'Sample in Transit', elapsedDays: 1, isOverdue: false, actionPendingWith: 'Sample Re-collected by ASHA' };
        }
      }
      return ref;
    }));
    setActionMessage(`Referral cycle advanced for record ${refId}`);
    setTimeout(() => setActionMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Action banner */}
      {actionMessage && (
        <div className="bg-[#0a192f] border border-blue-600 text-blue-100 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">{actionMessage}</span>
          </div>
          <button onClick={() => setActionMessage(null)} className="text-blue-300 hover:text-white text-xs">Dismiss</button>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Closed-Loop Diagnostic & Treatment Referral Tracking
            </h2>
            <span className="bg-blue-100 text-blue-900 border border-blue-200 text-xs px-2.5 py-0.5 rounded-full font-semibold">
              Zero Leakage Architecture
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Tracking every presumptive sputum sample from Peripheral Health Institutions (PHIs) to NAAT labs, and closing the gap between diagnostic positive notifications and first-dose treatment initiation.
          </p>
        </div>

        {/* Leakage Metrics */}
        <div className="flex items-center gap-3">
          <div className="bg-red-50 border border-red-200 p-2.5 rounded-lg text-center min-w-[100px]">
            <div className="text-lg font-bold text-red-700">
              {referrals.filter(r => r.isOverdue).length}
            </div>
            <div className="text-[11px] font-semibold text-red-600 uppercase tracking-tight">SLA Overdue</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-lg text-center min-w-[100px]">
            <div className="text-lg font-bold text-blue-900">
              {referrals.filter(r => r.transportStatus === 'Treatment Initiated').length}
            </div>
            <div className="text-[11px] font-semibold text-blue-700 uppercase tracking-tight">Loops Closed</div>
          </div>
        </div>
      </div>

      {/* 5-Stage Diagnostic Pipeline Diagram */}
      <div className="bg-gradient-to-r from-[#0a192f] via-[#0f284e] to-[#0a192f] text-white p-5 rounded-xl shadow-md border border-blue-900/80">
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-3 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          NTEP Assam 5-Stage Closed-Loop Pipeline SLA Standard
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="bg-[#12284b] p-3 rounded-lg border border-blue-700/40">
            <div className="text-blue-300 font-bold mb-1">1. Sample Collection</div>
            <div className="text-blue-100/90 text-[11px]">SC-HWC / ASHA cough screening. Sputum cup barcoded.</div>
            <div className="text-[10px] text-blue-300 font-mono mt-1">Target SLA: 24h</div>
          </div>
          <div className="bg-[#12284b] p-3 rounded-lg border border-blue-700/40">
            <div className="text-blue-300 font-bold mb-1">2. Cold-Chain Courier</div>
            <div className="text-blue-100/90 text-[11px]">Transport to nearest Truenat / CBNAAT molecular lab.</div>
            <div className="text-[10px] text-blue-300 font-mono mt-1">Target SLA: 48h</div>
          </div>
          <div className="bg-[#12284b] p-3 rounded-lg border border-blue-700/40">
            <div className="text-blue-300 font-bold mb-1">3. NAAT Testing</div>
            <div className="text-blue-100/90 text-[11px]">Cartridge run (MTB detection + Rifampicin resistance).</div>
            <div className="text-[10px] text-blue-300 font-mono mt-1">Target SLA: 24h</div>
          </div>
          <div className="bg-[#12284b] p-3 rounded-lg border border-blue-700/40">
            <div className="text-blue-300 font-bold mb-1">4. Nikshay Auto-Sync</div>
            <div className="text-blue-100/90 text-[11px]">Lab result verified; SMS alert to patient & treating MO.</div>
            <div className="text-[10px] text-blue-300 font-mono mt-1">Target SLA: Instant</div>
          </div>
          <div className="bg-[#12284b] p-3 rounded-lg border border-blue-700/40">
            <div className="text-blue-300 font-bold mb-1">5. First-Dose Initiation</div>
            <div className="text-blue-100/90 text-[11px]">4FDC regimen dispensed; differentiated care triage.</div>
            <div className="text-[10px] text-blue-300 font-mono mt-1">Target SLA: &lt; 48h</div>
          </div>
        </div>
      </div>

      {/* Filter and Table View */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Patient Name, ID, or Health Institution..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-300 rounded-lg py-1.5 px-3 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="ALL">All Referral Statuses</option>
            <option value="Sample in Transit">Sample in Transit</option>
            <option value="Tested">Tested at Lab</option>
            <option value="Report Released">Report Released</option>
            <option value="Treatment Initiated">Treatment Initiated</option>
            <option value="LOST_IN_TRANSIT_ALERT">Alert: Lost in Transit</option>
          </select>
        </div>
      </div>

      {/* Referral Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Referral ID & Patient</th>
                <th className="py-3 px-4">Origin PHI & Destination</th>
                <th className="py-3 px-4">Investigation Type</th>
                <th className="py-3 px-4">Current Pipeline Stage</th>
                <th className="py-3 px-4">Elapsed vs SLA</th>
                <th className="py-3 px-4">Action Pending With</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredReferrals.map((ref) => {
                const isLost = ref.transportStatus === 'LOST_IN_TRANSIT_ALERT';
                const isClosed = ref.transportStatus === 'Treatment Initiated';

                return (
                  <tr key={ref.id} className={`hover:bg-slate-50 transition-colors ${isLost ? 'bg-red-50/40' : ''}`}>
                    {/* ID & Patient */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{ref.patientName}</div>
                      <div className="text-xs text-blue-700 font-mono font-medium">{ref.patientId}</div>
                      <div className="text-[11px] text-slate-400">{ref.id}</div>
                    </td>

                    {/* Origin / Dest */}
                    <td className="py-3.5 px-4 text-xs">
                      <div className="font-medium text-slate-800">{ref.originPHI}</div>
                      <div className="text-slate-400 flex items-center gap-1 my-0.5">
                        <ArrowRight className="w-3 h-3 text-blue-600" />
                        <span className="text-blue-900 font-semibold">{ref.destinationFacility}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Referred: {ref.referredDate}</div>
                    </td>

                    {/* Investigation Type */}
                    <td className="py-3.5 px-4 text-xs">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200">
                        {ref.referralType}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-xs">
                      {isLost ? (
                        <span className="bg-red-100 text-red-800 border border-red-300 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                          LOST IN TRANSIT
                        </span>
                      ) : isClosed ? (
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Closed (Initiated)
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-900 border border-blue-300 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-700" />
                          {ref.transportStatus}
                        </span>
                      )}
                    </td>

                    {/* Elapsed vs SLA */}
                    <td className="py-3.5 px-4 text-xs font-mono">
                      <div className={`font-bold ${ref.isOverdue ? 'text-red-600' : 'text-slate-700'}`}>
                        {ref.elapsedDays}d / {ref.slaDays}d SLA
                      </div>
                      {ref.isOverdue && (
                        <span className="text-[10px] text-red-600 font-bold block uppercase">
                          Exceeded SLA
                        </span>
                      )}
                    </td>

                    {/* Action Pending */}
                    <td className="py-3.5 px-4 text-xs text-slate-700">
                      <div className="font-medium">{ref.actionPendingWith}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <PhoneCall className="w-3 h-3 text-slate-400" />
                        {ref.patientPhone}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {ref.isOverdue && (
                        <button
                          onClick={() => triggerEscalation(ref.id, ref.patientName)}
                          className="px-2.5 py-1 rounded bg-red-100 hover:bg-red-200 text-red-800 text-xs font-semibold border border-red-200"
                        >
                          Escalate
                        </button>
                      )}
                      {!isClosed && (
                        <button
                          onClick={() => advanceStatus(ref.id)}
                          className="px-2.5 py-1 rounded bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow"
                        >
                          Advance Step
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
