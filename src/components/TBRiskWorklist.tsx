import React, { useState } from 'react';
import { Patient, PatientRiskTier } from '../types/tb';
import { MOCK_PATIENTS } from '../data/assam_tb_data';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Activity, 
  TrendingUp, 
  CheckCircle, 
  UserCheck, 
  ShieldAlert, 
  Stethoscope, 
  FileText,
  ChevronRight,
  Info,
  Calendar,
  Phone,
  Layers,
  HeartPulse
} from 'lucide-react';

export const TBRiskWorklist: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Filter patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phi.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier = selectedTier === 'ALL' || patient.riskTier === selectedTier;
    const matchesDistrict = selectedDistrict === 'ALL' || patient.district.toLowerCase().includes(selectedDistrict.toLowerCase());

    return matchesSearch && matchesTier && matchesDistrict;
  });

  const handleAction = (message: string) => {
    setActionNotice(message);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const toggleFoodBasket = (patientId: string) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        const updated = !p.differentiatedCarePlan.foodBasketDelivered;
        handleAction(`Nutritional basket status updated for ${p.name} (Delivered: ${updated ? 'Yes' : 'No'})`);
        return {
          ...p,
          differentiatedCarePlan: {
            ...p.differentiatedCarePlan,
            foodBasketDelivered: updated
          }
        };
      }
      return p;
    }));
  };

  const getTierBadge = (tier: PatientRiskTier) => {
    switch (tier) {
      case 'CRITICAL':
        return <span className="bg-red-100 text-red-800 border border-red-300 px-2 py-0.5 rounded text-xs font-bold inline-flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-red-600" /> CRITICAL (Triage)</span>;
      case 'HIGH':
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded text-xs font-bold inline-flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-amber-600" /> HIGH RISK</span>;
      case 'MODERATE':
        return <span className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-2 py-0.5 rounded text-xs font-bold inline-flex items-center gap-1"><Activity className="w-3 h-3 text-yellow-600" /> MODERATE</span>;
      case 'STANDARD':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded text-xs font-bold inline-flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-600" /> STANDARD</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      {actionNotice && (
        <div className="bg-[#0a192f] border border-blue-600 text-blue-100 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-blue-300 hover:text-white text-xs">Dismiss</button>
        </div>
      )}

      {/* Top Header & Metrics */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              TB Patient Risk Stratification & Clinical Worklist
            </h2>
            <span className="bg-blue-100 text-blue-900 border border-blue-200 text-xs px-2.5 py-0.5 rounded-full font-semibold">
              Live Nikshay Sync
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Machine Learning clinical decision-support engine identifying patients with high risk of early mortality, treatment failure, or loss-to-follow-up.
          </p>
        </div>

        {/* Quick Triage Counters */}
        <div className="flex items-center gap-3">
          <div className="bg-red-50 border border-red-200 p-2.5 rounded-lg text-center min-w-[90px]">
            <div className="text-lg font-bold text-red-700">
              {patients.filter(p => p.riskTier === 'CRITICAL').length}
            </div>
            <div className="text-[11px] font-semibold text-red-600 uppercase tracking-tight">Critical Triage</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-center min-w-[90px]">
            <div className="text-lg font-bold text-amber-700">
              {patients.filter(p => p.riskTier === 'HIGH').length}
            </div>
            <div className="text-[11px] font-semibold text-amber-600 uppercase tracking-tight">High Risk</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-center min-w-[90px]">
            <div className="text-lg font-bold text-emerald-700">
              {patients.filter(p => p.riskTier === 'STANDARD').length}
            </div>
            <div className="text-[11px] font-semibold text-emerald-600 uppercase tracking-tight">Standard</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[280px]">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Patient Name, Nikshay ID (e.g. AS-DIB-2026-00481), or Health Facility..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Risk Tier Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600 font-medium">Risk Tier:</span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="border border-slate-300 rounded-md py-1.5 px-2 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="ALL">All Risk Tiers</option>
              <option value="CRITICAL">Critical (Score 90+)</option>
              <option value="HIGH">High Risk (Score 75-89)</option>
              <option value="MODERATE">Moderate Risk (Score 50-74)</option>
              <option value="STANDARD">Standard Care (Score &lt; 50)</option>
            </select>
          </div>

          {/* District Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-600 font-medium">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="border border-slate-300 rounded-md py-1.5 px-2 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="ALL">All Districts (Assam)</option>
              <option value="Dibrugarh">Dibrugarh</option>
              <option value="Kamrup Metropolitan">Kamrup Metropolitan</option>
              <option value="Cachar">Cachar (Silchar)</option>
              <option value="Sonitpur">Sonitpur (Tezpur)</option>
              <option value="Barpeta">Barpeta</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Patient & Nikshay ID</th>
                <th className="py-3 px-4">Demographics & Site</th>
                <th className="py-3 px-4">Clinical Biomarkers</th>
                <th className="py-3 px-4">Risk Tier & Score</th>
                <th className="py-3 px-4">Top Risk Drivers (SHAP)</th>
                <th className="py-3 px-4">Differentiated Care Protocol</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPatients.map((patient) => {
                const isUnderweight = patient.bmi < 16.0;
                const isCritical = patient.riskTier === 'CRITICAL';

                return (
                  <tr key={patient.id} className={`hover:bg-slate-50 transition-colors ${isCritical ? 'bg-red-50/20' : ''}`}>
                    {/* Patient Name & Nikshay */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{patient.name}</div>
                      <div className="text-xs text-blue-700 font-mono font-medium">{patient.id}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{patient.phi} • {patient.district}</div>
                    </td>

                    {/* Age / Sex / Site */}
                    <td className="py-3.5 px-4 text-xs text-slate-700">
                      <div><strong className="text-slate-900">{patient.age}y</strong> / {patient.gender}</div>
                      <div className="text-slate-500 mt-0.5">{patient.type}: {patient.site}</div>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200">
                        {patient.category}
                      </span>
                    </td>

                    {/* Clinical Biomarkers */}
                    <td className="py-3.5 px-4 text-xs">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-slate-500">BMI:</span>
                        <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                          isUnderweight ? 'bg-red-100 text-red-700 font-extrabold border border-red-300' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {patient.bmi} kg/m²
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600">Smear: <strong>{patient.smearGrade}</strong></div>
                      <div className="text-[11px] text-slate-600 font-mono">
                        {patient.cbnaatResult.includes('Resistant') ? (
                          <span className="text-red-600 font-bold">Rif Resistant (MDR)</span>
                        ) : (
                          <span className="text-emerald-700">Rif Susceptible</span>
                        )}
                      </div>
                      {patient.cavitaryDisease && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-1 rounded font-semibold">Cavitary</span>
                      )}
                    </td>

                    {/* Risk Tier & Score */}
                    <td className="py-3.5 px-4">
                      {getTierBadge(patient.riskTier)}
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="w-16 bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full ${patient.riskScore > 80 ? 'bg-red-600' : patient.riskScore > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${patient.riskScore}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold font-mono text-slate-800">{patient.riskScore}/100</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Mortality Prob: <strong>{(patient.mortalityRiskProb * 100).toFixed(0)}%</strong>
                      </div>
                    </td>

                    {/* Top Risk Drivers */}
                    <td className="py-3.5 px-4 text-xs">
                      <div className="space-y-1">
                        {patient.topRiskDrivers.slice(0, 2).map((driver, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                            <span className={`w-1.5 h-1.5 rounded-full ${driver.impact.includes('High') ? 'bg-red-500' : driver.impact.includes('Protective') ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                            <span className="text-slate-700 truncate max-w-[170px]" title={driver.factor}>
                              {driver.factor}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Differentiated Care Protocol */}
                    <td className="py-3.5 px-4 text-xs">
                      <div className="space-y-1">
                        {patient.differentiatedCarePlan.inpatientTriageRequired && (
                          <div className="text-red-700 font-semibold text-[11px] flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-red-500" /> Inpatient Bed Referral
                          </div>
                        )}
                        <div className="text-slate-600 text-[11px]">
                          Supervision: <strong>{patient.differentiatedCarePlan.supervisionFrequency}</strong>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <button
                            onClick={() => toggleFoodBasket(patient.id)}
                            className={`text-[10px] px-2 py-0.5 rounded font-medium border ${
                              patient.differentiatedCarePlan.foodBasketDelivered
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                            }`}
                          >
                            Food Basket: {patient.differentiatedCarePlan.foodBasketDelivered ? '✓ Delivered' : 'Pending'}
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActivePatient(patient)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold border border-blue-200 transition-colors"
                      >
                        Explain & CDSS
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Detail & SHAP Explainability Modal */}
      {activePatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a192f]/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
            {/* Modal Header */}
            <div className="bg-[#0a192f] text-white p-5 rounded-t-2xl flex items-center justify-between border-b border-blue-900">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">{activePatient.name}</h3>
                  <span className="text-xs font-mono bg-blue-950 text-blue-200 border border-blue-700/60 px-2 py-0.5 rounded">
                    {activePatient.id}
                  </span>
                  {getTierBadge(activePatient.riskTier)}
                </div>
                <p className="text-xs text-blue-200 mt-1">
                  Peripheral Health Institution: {activePatient.phi} • {activePatient.tbUnit}, {activePatient.district}
                </p>
              </div>
              <button
                onClick={() => setActivePatient(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1 rounded-full hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* CDSS Regulatory Alert */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded text-amber-900 text-xs flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Clinical Decision Support Disclaimer (NESFIC-D-30 Mandate):</strong> This risk evaluation is algorithmically computed using multi-variable clinical and demographic predictors. It is intended strictly for <em>prioritisation and differentiated care decision-support</em> and must NOT replace clinical diagnosis or clinical discretion by the treating Medical Officer.
                </div>
              </div>

              {/* Patient Profile Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Age & Gender</span>
                  <span className="font-bold text-slate-800">{activePatient.age} yrs / {activePatient.gender}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Body Mass Index (BMI)</span>
                  <span className={`font-bold ${activePatient.bmi < 16 ? 'text-red-700' : 'text-slate-800'}`}>
                    {activePatient.bmi} kg/m² ({activePatient.weight} kg)
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Microscopy & NAAT</span>
                  <span className="font-bold text-slate-800">{activePatient.smearGrade} / {activePatient.cbnaatResult}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Diabetes / HIV</span>
                  <span className="font-bold text-slate-800">{activePatient.diabetesStatus} / HIV {activePatient.hivStatus}</span>
                </div>
              </div>

              {/* SHAP Feature Attribution Matrix */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-700" />
                  Explainable Risk Attribution (SHAP Feature Weight Matrix)
                </h4>
                <p className="text-xs text-slate-500 mb-3">
                  Relative positive/negative contribution of each clinical parameter to the composite risk score of <strong>{activePatient.riskScore}/100</strong>.
                </p>

                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {activePatient.topRiskDrivers.map((driver, idx) => {
                    const isPositive = driver.shapValue > 0;
                    const widthPercent = Math.min(100, Math.abs(driver.shapValue) * 200);

                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-700">{driver.factor}</span>
                          <span className={`font-mono font-bold ${isPositive ? 'text-red-700' : 'text-emerald-700'}`}>
                            {isPositive ? `+${(driver.shapValue * 100).toFixed(1)}% risk` : `${(driver.shapValue * 100).toFixed(1)}% protective`}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                          <div
                            className={`h-full ${isPositive ? 'bg-red-500' : 'bg-emerald-500'}`}
                            style={{ width: `${widthPercent}%` }}
                          ></div>
                        </div>
                        <div className="text-[10px] text-slate-400">Observed Value: {driver.value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Differentiated Care Action Checklist */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-blue-700" />
                  Targeted Differentiated Care Directives
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className={`p-3 rounded-lg border ${activePatient.differentiatedCarePlan.inpatientTriageRequired ? 'bg-red-50 border-red-200 text-red-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    <div className="font-bold flex items-center gap-1.5">
                      <HeartPulse className="w-4 h-4 text-red-600" />
                      Inpatient Clinical Triage
                    </div>
                    <div className="text-[11px] mt-1 text-slate-600">
                      {activePatient.differentiatedCarePlan.inpatientTriageRequired
                        ? 'Mandatory: Refer to Sub-Divisional / District Hospital TB Ward for nutritional stabilization and vitals monitoring.'
                        : 'Not Required: Standard outpatient ambulatory DOTS care permitted.'}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border bg-slate-50 border-slate-200 text-slate-700">
                    <div className="font-bold flex items-center gap-1.5 text-blue-900">
                      <UserCheck className="w-4 h-4 text-blue-700" />
                      Supervisory Home Cadence
                    </div>
                    <div className="text-[11px] mt-1 text-slate-600">
                      Assigned Cadence: <strong>{activePatient.differentiatedCarePlan.supervisionFrequency}</strong>.
                      Next mandatory chest follow-up: <strong>{activePatient.differentiatedCarePlan.ecgChestXrayFollowupDate}</strong>.
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border bg-slate-50 border-slate-200 text-slate-700">
                    <div className="font-bold flex items-center gap-1.5 text-blue-900">
                      <Activity className="w-4 h-4 text-blue-700" />
                      Nikshay Poshan Direct Benefit Transfer (DBT)
                    </div>
                    <div className="text-[11px] mt-1 text-slate-600">
                      Priority DBT Queue active: ₹1,000/month bank transfer fast-tracked under Assam State DBT Cell.
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border bg-slate-50 border-slate-200 text-slate-700">
                    <div className="font-bold flex items-center gap-1.5 text-blue-900">
                      <Phone className="w-4 h-4 text-blue-700" />
                      Patient Contact & ABHA ID
                    </div>
                    <div className="text-[11px] mt-1 text-slate-600">
                      Mobile: {activePatient.mobile} • ABHA: <span className="font-mono">{activePatient.abhaId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="bg-slate-50 p-4 rounded-b-2xl border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  handleAction(`Clinical alert dispatched to Medical Officer in-charge at ${activePatient.phi}`);
                  setActivePatient(null);
                }}
                className="px-4 py-2 bg-[#0a192f] hover:bg-blue-900 text-white rounded-lg text-xs font-semibold shadow"
              >
                Dispatch Medical Officer Alert
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleAction(`Nutritional support kit approved for ${activePatient.name}`);
                    setActivePatient(null);
                  }}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow"
                >
                  Approve High-Protein Kit
                </button>
                <button
                  onClick={() => setActivePatient(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
