import React, { useState } from 'react';
import { DIAGNOSTIC_FACILITIES } from '../data/assam_tb_data';
import { DiagnosticFacility } from '../types/tb';
import { 
  Building2, 
  Cpu, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Boxes, 
  Calendar, 
  UserCheck, 
  Navigation,
  FileSpreadsheet,
  Zap,
  Clock
} from 'lucide-react';

export const FacilitySupervision: React.FC = () => {
  const [facilities, setFacilities] = useState<DiagnosticFacility[]>(DIAGNOSTIC_FACILITIES);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [notice, setNotice] = useState<string | null>(null);

  const filteredFacilities = facilities.filter(f => 
    selectedDistrict === 'ALL' || f.district.toLowerCase().includes(selectedDistrict.toLowerCase())
  );

  const handleRequisition = (facilityName: string) => {
    setNotice(`Emergency Truenat/CBNAAT cartridge requisition dispatched via Nikshay Aushadhi for ${facilityName}. Central TB Warehouse (Guwahati) notified.`);
    setTimeout(() => setNotice(null), 5000);
  };

  // Mock Supervisory Tour Priority List
  const supervisoryPriorities = [
    {
      phi: 'Sepon Tea Estate Hospital & Moran TU',
      district: 'Dibrugarh',
      spiScore: 9.4,
      reasons: ['Presumptive-to-NAAT referral gap > 42%', 'High proportion of severe undernutrition (BMI < 14)', 'Low 99DOTS digital adherence enrollment'],
      lastVisited: '45 days ago',
      assignedSupervisor: 'Sri D. Bora (STS Dibrugarh)'
    },
    {
      phi: 'Baghbar Sub-Center HWC & Chenga TU',
      district: 'Barpeta',
      spiScore: 9.1,
      reasons: ['Riverine sample transport delays exceeding 72h', 'Repeated Truenat cartridge stockouts', 'Sputum sample collection target deficit'],
      lastVisited: '38 days ago',
      assignedSupervisor: 'Dr. H. Talukdar (DTO Barpeta)'
    },
    {
      phi: 'Pandu Urban Health Center & Maligaon PHC',
      district: 'Kamrup Metropolitan',
      spiScore: 8.7,
      reasons: ['Urban slum migrant loss-to-follow-up rate of 6.2%', 'Delayed PMDT second-line regimen initiation for MDR cases'],
      lastVisited: '18 days ago',
      assignedSupervisor: 'Dr. M. Deka (STS Guwahati West)'
    },
    {
      phi: 'Mankachar Model Hospital & Border PHIs',
      district: 'Dhubri',
      spiScore: 8.5,
      reasons: ['High presumptive positivity (11.4%) indicating high community transmission', 'Incomplete Nikshay Poshan DBT account seeding'],
      lastVisited: '52 days ago',
      assignedSupervisor: 'Dr. S. Ahmed (DTO Dhubri)'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      {notice && (
        <div className="bg-[#0a192f] border border-blue-600 text-blue-100 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-300" />
            <span className="text-sm font-medium">{notice}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-blue-300 hover:text-white text-xs">Dismiss</button>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Facility Supportive Supervision & Diagnostic Logistics Optimizer
            </h2>
            <span className="bg-blue-100 text-blue-900 border border-blue-200 text-xs px-2.5 py-0.5 rounded-full font-semibold">
              Logistics & Resource DSS
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time cartridge inventory forecasting, machine capacity load-balancing, and data-driven Supervisory Priority Index (SPI) tour planning for DTOs and field teams.
          </p>
        </div>

        {/* District Filter */}
        <div>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="border border-slate-300 rounded-lg py-2 px-3 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
          >
            <option value="ALL">All Assam Districts</option>
            <option value="Dibrugarh">Dibrugarh</option>
            <option value="Kamrup Metropolitan">Kamrup Metropolitan</option>
            <option value="Cachar">Cachar (Silchar)</option>
            <option value="Sonitpur">Sonitpur (Tezpur)</option>
            <option value="Barpeta">Barpeta</option>
          </select>
        </div>
      </div>

      {/* Diagnostic Capacity & Cartridge Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFacilities.map((fac) => {
          const isCriticalStock = fac.daysOfStockRemaining <= 3;
          const isNearCapacity = fac.utilizationRate >= 90;

          return (
            <div key={fac.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{fac.name}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">{fac.district} • {fac.facilityType}</div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                  isCriticalStock
                    ? 'bg-red-100 text-red-800 border-red-300'
                    : isNearCapacity
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}>
                  {fac.operationalStatus}
                </span>
              </div>

              {/* Machine Specs */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-blue-700" /> Technology:
                  </span>
                  <span className="font-bold text-slate-800">{fac.machineType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Daily Utilization:</span>
                  <span className="font-bold text-slate-800 font-mono">
                    {fac.currentDailyTests} / {fac.dailyCapacity} tests ({fac.utilizationRate}%)
                  </span>
                </div>
                {/* Meter */}
                <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full ${fac.utilizationRate > 90 ? 'bg-amber-500' : 'bg-blue-700'}`} 
                    style={{ width: `${Math.min(100, fac.utilizationRate)}%` }}
                  ></div>
                </div>
              </div>

              {/* Cartridge Inventory Forecast */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Boxes className="w-3.5 h-3.5 text-slate-400" /> Cartridge Stock:
                  </span>
                  <span className="font-mono font-bold text-slate-800">{fac.cartridgeStock} units</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Stockout Forecast:
                  </span>
                  <span className={`font-bold font-mono ${isCriticalStock ? 'text-red-700' : 'text-slate-800'}`}>
                    {fac.daysOfStockRemaining} days ({fac.predictedStockoutDate})
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  Nodal Contact: {fac.contactPerson}
                </div>
              </div>

              {/* Requisition Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleRequisition(fac.name)}
                  className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all shadow-sm ${
                    isCriticalStock
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-slate-800 hover:bg-slate-900 text-white'
                  }`}
                >
                  Requisition Buffer Stock
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Algorithmic Supervisory Priority Index (SPI) Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-700" />
              Algorithmic Supervisory Priority Index (SPI) — Weekly Tour Planner
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Identifies peripheral health facilities (PHIs) and TB units exhibiting severe operational bottlenecks requiring immediate on-site supportive supervision.
            </p>
          </div>
          <span className="bg-blue-50 border border-blue-200 text-blue-900 text-xs px-2.5 py-1 rounded font-semibold">
            DTO & STS Action Deck
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Supervisory Target & District</th>
                <th className="py-3 px-4">SPI Score</th>
                <th className="py-3 px-4">Triggered Operational Deficits</th>
                <th className="py-3 px-4">Last Visit</th>
                <th className="py-3 px-4">Assigned Supervisor</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {supervisoryPriorities.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-sm">{item.phi}</div>
                    <div className="text-slate-500 text-[11px]">{item.district}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded text-xs">
                      {item.spiScore} / 10
                    </span>
                  </td>
                  <td className="py-3.5 px-4 space-y-1">
                    {item.reasons.map((r, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-1.5 text-slate-700 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {item.lastVisited}
                  </td>
                  <td className="py-3.5 px-4 text-blue-900 font-semibold">
                    {item.assignedSupervisor}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setNotice(`Field visit route and digital checklist dispatched to ${item.assignedSupervisor} for ${item.phi}`);
                      }}
                      className="px-3 py-1.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-sm"
                    >
                      Schedule Tour
                    </button>
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
