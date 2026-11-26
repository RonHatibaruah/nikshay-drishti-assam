import React from 'react';
import { ASSAM_DISTRICTS } from '../data/assam_tb_data';
import { 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  HeartHandshake, 
  Award, 
  Download, 
  ExternalLink,
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export const ExecutiveCommand: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0a192f] via-[#0f284e] to-[#0a192f] text-white p-6 rounded-2xl shadow-xl border border-blue-900/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                State TB Cell • Government of Assam
              </span>
              <span className="text-blue-400/40">•</span>
              <span className="text-xs text-blue-200">NESFIC-D-30 Operational Intelligence</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight mt-1">
              TB Mukt Assam 2026 Executive Command Center
            </h2>
            <p className="text-sm text-blue-100/90 mt-1 max-w-2xl">
              Consolidated real-time decision-support system tracking epidemiology, differentiated care coverage, diagnostic cascade efficiency, and district elimination milestones.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Downloading Quarterly State TB Dossier (PDF report)...')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              Download State Dossier (PDF)
            </button>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-blue-900/60">
          <div className="bg-[#12284b]/80 p-4 rounded-xl border border-blue-700/40">
            <span className="text-xs text-blue-200 font-medium">Statewide TB Notification</span>
            <div className="text-2xl font-extrabold text-white mt-1">32,840</div>
            <div className="text-[11px] text-blue-300 flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> 8.4% case detection surge
            </div>
          </div>

          <div className="bg-[#12284b]/80 p-4 rounded-xl border border-blue-700/40">
            <span className="text-xs text-blue-200 font-medium">Treatment Success Rate (TSR)</span>
            <div className="text-2xl font-extrabold text-white mt-1">85.4%</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Aligned with NTEP 85% benchmark
            </div>
          </div>

          <div className="bg-[#12284b]/80 p-4 rounded-xl border border-blue-700/40">
            <span className="text-xs text-blue-200 font-medium">Differentiated Care Enrolled</span>
            <div className="text-2xl font-extrabold text-amber-300 mt-1">7,420</div>
            <div className="text-[11px] text-blue-200/80 mt-1">
              22.6% identified as High/Critical Risk
            </div>
          </div>

          <div className="bg-[#12284b]/80 p-4 rounded-xl border border-blue-700/40">
            <span className="text-xs text-blue-200 font-medium">Nikshay Poshan DBT Disbursed</span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">92.4%</div>
            <div className="text-[11px] text-blue-300 mt-1">
              ₹1,000/mo fast-tracked nutrition DBT
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Programs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tea Garden & Hard-to-reach Focus */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm">Tea Garden TB Vulnerability Index</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">High Focus</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Upper Assam districts (Dibrugarh, Tinsukia, Sonitpur) exhibit 34% higher prevalence of severe undernutrition (BMI &lt; 14) and higher early mortality.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-700">
              <span>Active Screening in Tea Estates:</span>
              <strong className="text-slate-900">142 Estates Covered</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Mobile AI-Xray Yield Rate:</span>
              <strong className="text-red-700 font-bold">8.9% Positivity</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Sputum Sample Collection Turnaround:</span>
              <strong className="text-blue-800 font-bold">36 Hours (Down from 84h)</strong>
            </div>
          </div>
        </div>

        {/* Riverine Char Area Boat Diagnostics */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm">Riverine Char Area Network</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">Barpeta & Dhubri</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Islands and sandbar settlements facing geographical isolation during monsoon floods. Supported by solar-powered boat diagnostic units.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-700">
              <span>Operating Boat Diagnostics:</span>
              <strong className="text-slate-900">8 Riverine Vessels</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Truenat Battery Quattro Uptime:</span>
              <strong className="text-emerald-700 font-bold">98.2%</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Loss to Follow-up Reduction:</span>
              <strong className="text-blue-800 font-bold">-42% vs 2024 Baseline</strong>
            </div>
          </div>
        </div>

        {/* Differentiated Care Early Mortality Reduction */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm">Mortality Reduction Impact</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Pilot Outcome</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Algorithmic stratification prioritizes critical patients for inpatient nutritional admission and bi-weekly medical officer home visits.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-700">
              <span>30-Day Mortality Reduction:</span>
              <strong className="text-emerald-700 font-bold text-sm">↓ 31.4% in Pilot</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Inpatient Beds Utilized for TB:</span>
              <strong className="text-slate-900">380 Beds Active</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Treatment Adherence via MERM:</span>
              <strong className="text-blue-800 font-bold">91.2% Overall</strong>
            </div>
          </div>
        </div>
      </div>

      {/* District-wise Elimination Performance Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              District Tuberculosis Performance & Risk Stratification Index (35 Districts)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked by notification burden, percentage of high-risk patients, and treatment success rates.
            </p>
          </div>
          <span className="text-xs text-blue-900 font-semibold bg-blue-100 border border-blue-200 px-2.5 py-1 rounded">
            Updated Daily at 06:00 IST
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Notified Cases (Annual)</th>
                <th className="py-3 px-4">Annualized Rate (/lakh)</th>
                <th className="py-3 px-4">High Risk Cohort %</th>
                <th className="py-3 px-4">Treatment Success (TSR)</th>
                <th className="py-3 px-4">Case Fatality Rate</th>
                <th className="py-3 px-4">Vulnerable Clusters</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {ASSAM_DISTRICTS.map((dist, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900 text-sm">
                    {dist.district}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">
                    {dist.totalNotified.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {dist.annualizedNotificationRate}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold font-mono ${dist.highRiskPatientPct > 25 ? 'text-red-700' : 'text-slate-800'}`}>
                        {dist.highRiskPatientPct}%
                      </span>
                      {dist.highRiskPatientPct > 25 && (
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className={`font-bold ${dist.treatmentSuccessRate >= 85 ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {dist.treatmentSuccessRate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {dist.deathRate}%
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {dist.vulnerablePocketsCount} Pockets ({dist.diagnosticCentersCount} NAAT Labs)
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-blue-50 text-blue-900 border border-blue-200">
                      Pilot Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
