import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  Users, 
  Package, 
  Calendar, 
  Sliders, 
  FileText, 
  Download, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Search, 
  Filter, 
  Truck, 
  Zap, 
  Activity, 
  LogOut,
  Stethoscope,
  MapPin,
  Clock,
  ArrowUpRight,
  Database,
  Lock,
  ChevronRight,
  Info
} from 'lucide-react';
import { AdminUser } from './AdminLogin';

interface AdminConsoleProps {
  currentUser: AdminUser;
  onLogout: () => void;
  onNavigateTab: (tab: string) => void;
}

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  district: string;
  tu: string;
  bmi: number;
  sputum: string;
  cavitation: boolean;
  diabetes: boolean;
  hiv: boolean;
  riskScore: number;
  tier: 'Critical' | 'High' | 'Moderate' | 'Low';
  overridden: boolean;
  overrideReason?: string;
  assignedFacility: string;
}

interface CartridgeStock {
  district: string;
  facility: string;
  type: 'GeneXpert (CBNAAT)' | 'Truenat';
  currentStock: number;
  dailyBurnRate: number;
  bufferDays: number;
  status: 'Critical' | 'Adequate' | 'Surplus';
}

interface SupervisoryTour {
  id: string;
  tu: string;
  district: string;
  spiScore: number;
  leadOfficer: string;
  focusArea: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  scheduledDate: string;
}

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ip: string;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({ currentUser, onLogout, onNavigateTab }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'patients' | 'logistics' | 'tours' | 'rules' | 'audit'>('overview');

  // Search & Filter state
  const [patientSearch, setPatientSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');

  // State: Patients
  const [patients, setPatients] = useState<PatientRecord[]>([
    { id: 'NK-AS-84920', name: 'Ramesh Karmakar', age: 48, gender: 'Male', district: 'Dibrugarh', tu: 'Chabua TU', bmi: 13.8, sputum: '3+', cavitation: true, diabetes: true, hiv: false, riskScore: 89, tier: 'Critical', overridden: false, assignedFacility: 'Assam Medical College (AMCH)' },
    { id: 'NK-AS-77312', name: 'Monowara Begum', age: 34, gender: 'Female', district: 'Barpeta', tu: 'Mandia TU (Char)', bmi: 15.2, sputum: '2+', cavitation: false, diabetes: false, hiv: false, riskScore: 78, tier: 'Critical', overridden: false, assignedFacility: 'Barpeta Civil Hospital' },
    { id: 'NK-AS-99214', name: 'Pranab Bordoloi', age: 52, gender: 'Male', district: 'Kamrup Metro', tu: 'Guwahati Urban TU', bmi: 16.4, sputum: '1+', cavitation: true, diabetes: true, hiv: true, riskScore: 84, tier: 'Critical', overridden: false, assignedFacility: 'Gauhati Medical College (GMCH)' },
    { id: 'NK-AS-61204', name: 'Dipali Das', age: 29, gender: 'Female', district: 'Darrang', tu: 'Mangaldai TU', bmi: 17.1, sputum: 'Scanty', cavitation: false, diabetes: false, hiv: false, riskScore: 56, tier: 'High', overridden: false, assignedFacility: 'Mangaldai Civil Hospital' },
    { id: 'NK-AS-54190', name: 'Babul Tanti', age: 42, gender: 'Male', district: 'Tinsukia', tu: 'Doomdooma TU (Tea)', bmi: 14.5, sputum: '2+', cavitation: true, diabetes: false, hiv: false, riskScore: 74, tier: 'High', overridden: false, assignedFacility: 'Tinsukia Civil Hospital' },
    { id: 'NK-AS-32118', name: 'Anowar Hussain', age: 61, gender: 'Male', district: 'Dhubri', tu: 'Golakganj TU', bmi: 18.0, sputum: 'Negative', cavitation: false, diabetes: true, hiv: false, riskScore: 42, tier: 'Moderate', overridden: false, assignedFacility: 'Dhubri Medical College' },
  ]);

  // State: Cartridge Inventory
  const [inventory, setInventory] = useState<CartridgeStock[]>([
    { district: 'Darrang', facility: 'Mangaldai Civil Hospital DMC', type: 'Truenat', currentStock: 18, dailyBurnRate: 4.5, bufferDays: 4, status: 'Critical' },
    { district: 'Golaghat', facility: 'Khumtai CHC CBNAAT Center', type: 'GeneXpert (CBNAAT)', currentStock: 24, dailyBurnRate: 3.8, bufferDays: 6, status: 'Critical' },
    { district: 'Barpeta', facility: 'Fakhruddin Ali Ahmed Medical College', type: 'GeneXpert (CBNAAT)', currentStock: 140, dailyBurnRate: 8.2, bufferDays: 17, status: 'Adequate' },
    { district: 'Dibrugarh', facility: 'Assam Medical College CBNAAT Lab', type: 'GeneXpert (CBNAAT)', currentStock: 260, dailyBurnRate: 11.0, bufferDays: 23, status: 'Adequate' },
    { district: 'Kamrup Metro', facility: 'Guwahati State TB Demonstration Centre', type: 'Truenat', currentStock: 480, dailyBurnRate: 14.0, bufferDays: 34, status: 'Surplus' },
    { district: 'Cachar', facility: 'Silchar Medical College Lab', type: 'GeneXpert (CBNAAT)', currentStock: 185, dailyBurnRate: 7.5, bufferDays: 24, status: 'Adequate' },
  ]);

  // State: Supervisory Tours
  const [tours, setTours] = useState<SupervisoryTour[]>([
    { id: 'TOUR-AS-101', tu: 'Doomdooma TU', district: 'Tinsukia', spiScore: 88.4, leadOfficer: 'Dr. Debojit Sarmah (STO)', focusArea: 'Tea Garden Delayed Triage & Sputum Cascade', status: 'Scheduled', scheduledDate: '2026-11-24' },
    { id: 'TOUR-AS-102', tu: 'Mandia TU (Char)', district: 'Barpeta', spiScore: 84.2, leadOfficer: 'Dr. M. K. Nath (DTO)', focusArea: 'Riverine Sputum Runner Dropouts', status: 'In Progress', scheduledDate: '2026-11-21' },
    { id: 'TOUR-AS-103', tu: 'Mangaldai TU', district: 'Darrang', spiScore: 79.8, leadOfficer: 'Dr. Ananya Kalita (DTO)', focusArea: 'Truenat Cartridge Buffer Depletion', status: 'Scheduled', scheduledDate: '2026-11-27' },
  ]);

  // State: CDSS Engine Rules
  const [criticalCutoff, setCriticalCutoff] = useState<number>(75);
  const [highCutoff, setHighCutoff] = useState<number>(50);
  const [moderateCutoff, setModerateCutoff] = useState<number>(25);
  const [bmiWeight, setBmiWeight] = useState<number>(35);
  const [cavitaryWeight, setCavitaryWeight] = useState<number>(25);
  const [hivWeight, setHivWeight] = useState<number>(20);
  const [diabetesWeight, setDiabetesWeight] = useState<number>(15);
  const [engineMode, setEngineMode] = useState<'ensemble' | 'rules'>('ensemble');
  const [rulesSavedNotice, setRulesSavedNotice] = useState(false);

  // State: Audit Trail
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([
    { id: 'AUD-991', timestamp: '2026-11-21 14:15:22', user: currentUser.name, action: 'ADMIN_SESSION_INIT', details: `Session authenticated via ASDC Gateway (${currentUser.role})`, ip: '10.14.22.84' },
    { id: 'AUD-990', timestamp: '2026-11-21 12:40:05', user: 'System (Nikshay Sync)', action: 'AUTO_INGESTION_SYNC', details: '12 new notifications ingested from Nikshay v2.4 API', ip: '10.14.0.12' },
    { id: 'AUD-989', timestamp: '2026-11-21 11:22:18', user: 'Dr. Debojit Sarmah', action: 'DISPATCH_LOGISTICS', details: 'Emergency dispatch: +60 Truenat cartridges released to Darrang', ip: '10.14.22.84' },
    { id: 'AUD-988', timestamp: '2026-11-21 10:15:30', user: 'Dr. Ananya Kalita', action: 'TRIAGE_OVERRIDE', details: 'Patient NK-AS-84920 manual escalation to Critical (acute hemoptysis)', ip: '10.14.45.19' }
  ]);

  // Modals
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [selectedPatientForOverride, setSelectedPatientForOverride] = useState<PatientRecord | null>(null);
  const [overrideNewTier, setOverrideNewTier] = useState<'Critical' | 'High' | 'Moderate' | 'Low'>('Critical');
  const [overrideReasonInput, setOverrideReasonInput] = useState('');

  // Add Patient Form State
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState<number>(45);
  const [newPatientGender, setNewPatientGender] = useState('Male');
  const [newPatientDistrict, setNewPatientDistrict] = useState('Dibrugarh');
  const [newPatientTU, setNewPatientTU] = useState('Moran TU');
  const [newPatientBMI, setNewPatientBMI] = useState<number>(14.8);
  const [newPatientSputum, setNewPatientSputum] = useState('2+');
  const [newPatientCavitation, setNewPatientCavitation] = useState(true);
  const [newPatientDiabetes, setNewPatientDiabetes] = useState(false);
  const [newPatientHIV, setNewPatientHIV] = useState(false);

  // Dispatch Logistics State
  const [dispatchDistrict, setDispatchDistrict] = useState('Darrang');
  const [dispatchQty, setDispatchQty] = useState(50);
  const [dispatchSuccessMsg, setDispatchSuccessMsg] = useState('');

  // Supervisory Tour State
  const [newTourTU, setNewTourTU] = useState('Doomdooma TU');
  const [newTourDistrict, setNewTourDistrict] = useState('Tinsukia');
  const [newTourFocus, setNewTourFocus] = useState('Tea Garden Differentiated Care Audit');

  // Handle Save CDSS Rules
  const handleSaveRules = () => {
    setRulesSavedNotice(true);
    const newLog: AuditEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: currentUser.name,
      action: 'CDSS_WEIGHTS_UPDATED',
      details: `Thresholds updated: Crit >${criticalCutoff}, High >${highCutoff}. Mode: ${engineMode}`,
      ip: '10.14.22.84'
    };
    setAuditLogs([newLog, ...auditLogs]);
    setTimeout(() => setRulesSavedNotice(false), 3000);
  };

  // Handle Add Patient Submit
  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    // Calculate simulated risk score
    let score = 30;
    if (newPatientBMI < 16) score += 35;
    else if (newPatientBMI < 18.5) score += 15;
    if (newPatientCavitation) score += 20;
    if (newPatientHIV) score += 25;
    if (newPatientDiabetes) score += 15;
    if (newPatientSputum === '3+' || newPatientSputum === '2+') score += 10;
    score = Math.min(score, 98);

    let tier: 'Critical' | 'High' | 'Moderate' | 'Low' = 'Low';
    if (score >= criticalCutoff) tier = 'Critical';
    else if (score >= highCutoff) tier = 'High';
    else if (score >= moderateCutoff) tier = 'Moderate';

    const newId = `NK-AS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newRecord: PatientRecord = {
      id: newId,
      name: newPatientName || 'New Patient',
      age: Number(newPatientAge),
      gender: newPatientGender,
      district: newPatientDistrict,
      tu: newPatientTU,
      bmi: Number(newPatientBMI),
      sputum: newPatientSputum,
      cavitation: newPatientCavitation,
      diabetes: newPatientDiabetes,
      hiv: newPatientHIV,
      riskScore: score,
      tier: tier,
      overridden: false,
      assignedFacility: `${newPatientDistrict} Civil Hospital`
    };

    setPatients([newRecord, ...patients]);
    setAuditLogs([
      {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        user: currentUser.name,
        action: 'PATIENT_RECORD_CREATED',
        details: `Added ${newId} (${newPatientName}) - Risk: ${score} (${tier})`,
        ip: '10.14.22.84'
      },
      ...auditLogs
    ]);

    setIsAddPatientOpen(false);
    // Reset Form
    setNewPatientName('');
  };

  // Handle Override Submit
  const handleApplyOverride = () => {
    if (!selectedPatientForOverride || !overrideReasonInput.trim()) return;

    setPatients(patients.map(p => {
      if (p.id === selectedPatientForOverride.id) {
        return {
          ...p,
          tier: overrideNewTier,
          overridden: true,
          overrideReason: overrideReasonInput
        };
      }
      return p;
    }));

    setAuditLogs([
      {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        user: currentUser.name,
        action: 'CLINICAL_TRIAGE_OVERRIDE',
        details: `${selectedPatientForOverride.id} escalated to ${overrideNewTier}: "${overrideReasonInput}"`,
        ip: '10.14.22.84'
      },
      ...auditLogs
    ]);

    setIsOverrideModalOpen(false);
    setSelectedPatientForOverride(null);
    setOverrideReasonInput('');
  };

  // Handle Dispatch Logistics
  const handleExecuteDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setInventory(inventory.map(item => {
      if (item.district === dispatchDistrict) {
        const newStock = item.currentStock + Number(dispatchQty);
        const newBuffer = Math.round(newStock / item.dailyBurnRate);
        return {
          ...item,
          currentStock: newStock,
          bufferDays: newBuffer,
          status: newBuffer >= 14 ? 'Adequate' : 'Critical'
        };
      }
      return item;
    }));

    const msg = `Successfully dispatched +${dispatchQty} cartridges to ${dispatchDistrict} Central Store.`;
    setDispatchSuccessMsg(msg);

    setAuditLogs([
      {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        user: currentUser.name,
        action: 'BUFFER_STOCK_DISPATCH',
        details: `Dispatched +${dispatchQty} cartridges to ${dispatchDistrict} from Guwahati State Buffer`,
        ip: '10.14.22.84'
      },
      ...auditLogs
    ]);

    setTimeout(() => setDispatchSuccessMsg(''), 4000);
  };

  // Handle Schedule Tour
  const handleScheduleTour = (e: React.FormEvent) => {
    e.preventDefault();
    const newTour: SupervisoryTour = {
      id: `TOUR-AS-${Math.floor(100 + Math.random() * 900)}`,
      tu: newTourTU,
      district: newTourDistrict,
      spiScore: 82.5,
      leadOfficer: currentUser.name,
      focusArea: newTourFocus,
      status: 'Scheduled',
      scheduledDate: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10)
    };
    setTours([newTour, ...tours]);
    setAuditLogs([
      {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        user: currentUser.name,
        action: 'SUPERVISORY_TOUR_SCHEDULED',
        details: `Assigned tour to ${newTourTU} (${newTourDistrict}) focusing on: ${newTourFocus}`,
        ip: '10.14.22.84'
      },
      ...auditLogs
    ]);
  };

  // Export Data as JSON
  const handleExportJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      exporter: currentUser,
      patients,
      inventory,
      tours,
      auditLogs,
      cdssConfig: {
        criticalCutoff,
        highCutoff,
        moderateCutoff,
        bmiWeight,
        cavitaryWeight,
        hivWeight,
        diabetesWeight,
        engineMode
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NikshayDrishti_Admin_Export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export Audit CSV
  const handleExportCSV = () => {
    const headers = ['AuditID', 'Timestamp', 'User', 'Action', 'Details', 'IP'];
    const rows = auditLogs.map(l => [l.id, l.timestamp, `"${l.user}"`, l.action, `"${l.details}"`, l.ip]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encodedUri;
    a.download = `NikshayDrishti_Audit_Trail_${Date.now()}.csv`;
    a.click();
  };

  // Filtered Patients
  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(patientSearch.toLowerCase()) || 
                          p.id.toLowerCase().includes(patientSearch.toLowerCase()) ||
                          p.tu.toLowerCase().includes(patientSearch.toLowerCase());
    const matchesDistrict = districtFilter === 'All' || p.district === districtFilter;
    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Admin Header Bar */}
      <div className="bg-gradient-to-r from-[#0a192f] via-[#0f284e] to-[#0a192f] border border-blue-900/80 rounded-2xl p-4 sm:p-6 shadow-xl text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  NikshayDrishti Management Cockpit
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-blue-950 border border-blue-700/60 text-blue-200 text-[11px] font-mono font-semibold">
                  Admin • {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-blue-100/90">
                Logged in as <strong className="text-white">{currentUser.name}</strong> ({currentUser.designation}) • {currentUser.district}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#12284b] border border-blue-700/50 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-blue-100 font-mono">ASDC Node • Nikshay API v2.4 Live</span>
            </div>

            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#12284b] hover:bg-[#1a3768] text-blue-200 border border-blue-500/40 transition-all shadow-sm"
              title="Download Full Admin State as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export System State</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-700/50 transition-all shadow-sm"
              title="Log Out of Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 mt-5 pt-4 border-t border-blue-900/60">
          {[
            { id: 'overview', label: 'System Telemetry', icon: Activity },
            { id: 'patients', label: 'Patient Roster & Triage', icon: Users },
            { id: 'logistics', label: 'Cartridge Logistics', icon: Package },
            { id: 'tours', label: 'Supervisory Tours', icon: Calendar },
            { id: 'rules', label: 'CDSS Rules & AI Governance', icon: Sliders },
            { id: 'audit', label: 'Audit Trail & Compliance', icon: FileText }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-950/60'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-TAB 1: SYSTEM OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Active TB Patients Managed</span>
                <Users className="w-4 h-4 text-blue-700" />
              </div>
              <div className="text-2xl font-bold text-slate-900">1,248</div>
              <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>100% Stratified via CDSS</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Critical Early-Mortality Risk</span>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-bold text-rose-600">142</div>
              <div className="text-[11px] text-slate-500 mt-1">
                98 (69%) placed in Upfront Inpatient Care
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>District CBNAAT/Truenat Labs</span>
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">35</div>
              <div className="text-[11px] text-amber-600 mt-1 font-semibold">
                2 Facilities at Buffer Alert (&lt;7 days)
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Supervisory Tour Fulfillment</span>
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">92.4%</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Prioritized by Predictive SPI Index
              </div>
            </div>
          </div>

          {/* Quick Actions & Live Bridge Telemetry */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-700" />
                  <h3 className="text-sm font-bold text-slate-800">Operational Bridge Telemetry</h3>
                </div>
                <span className="text-[11px] bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded font-mono">
                  Sync Interval: 15 min
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-blue-700" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Central Ni-kshay v2.4 API Ingestion</div>
                      <div className="text-[11px] text-slate-500">Subscribed to webhook: /api/v2/tb/notifications/assam</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">HEALTHY</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">ABDM Health Information Provider (HIP/HIU)</div>
                      <div className="text-[11px] text-slate-500">M1, M2, M3 Compliant for ABHA ID linkage</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">CONNECTED</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-purple-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">State Diagnostic Cartridge Buffer (Guwahati Warehouse)</div>
                      <div className="text-[11px] text-slate-500">Available reserve: 4,800 CBNAAT / 2,400 Truenat Cartridges</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveSubTab('logistics')}
                    className="px-2.5 py-1 text-[11px] font-bold bg-blue-700 hover:bg-blue-600 text-white rounded transition-colors"
                  >
                    Manage Buffer
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Admin Navigation shortcuts */}
            <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Administrative Shortcuts</span>
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Quickly jump between public prototype modules and governance tasks.
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => onNavigateTab('worklist')}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-blue-900/60 text-xs text-slate-200 flex items-center justify-between group transition-colors"
                  >
                    <span>View Public TB Risk Worklist</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-300" />
                  </button>

                  <button
                    onClick={() => onNavigateTab('gis')}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-blue-900/60 text-xs text-slate-200 flex items-center justify-between group transition-colors"
                  >
                    <span>Inspect Geospatial Vulnerability Map</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-300" />
                  </button>

                  <button
                    onClick={() => onNavigateTab('facilities')}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-blue-900/60 text-xs text-slate-200 flex items-center justify-between group transition-colors"
                  >
                    <span>Open Facility Supervisory Matrix</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-300" />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Statutory: CDSS Decision-support tool only. Clinical discretion resides with authorized Medical Officers.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: PATIENT ROSTER & TRIAGE OVERRIDE */}
      {activeSubTab === 'patients' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-700" />
                <span>Patient Roster & Clinical Triage Management</span>
              </h3>
              <p className="text-xs text-slate-500">
                Inspect AI-assigned risk tiers, add new clinical cases, or perform manual triage overrides with mandatory audit logging.
              </p>
            </div>

            <button
              onClick={() => setIsAddPatientOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Patient Record</span>
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                placeholder="Search patient name, Ni-kshay ID, or TU..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">District:</span>
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="All">All Districts (Assam)</option>
                <option value="Dibrugarh">Dibrugarh</option>
                <option value="Barpeta">Barpeta</option>
                <option value="Kamrup Metro">Kamrup Metro</option>
                <option value="Darrang">Darrang</option>
                <option value="Tinsukia">Tinsukia</option>
                <option value="Dhubri">Dhubri</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Patient ID & Name</th>
                  <th className="py-2.5 px-3">Location (District / TU)</th>
                  <th className="py-2.5 px-3">Clinical Profile</th>
                  <th className="py-2.5 px-3">Risk Score</th>
                  <th className="py-2.5 px-3">Assigned Tier</th>
                  <th className="py-2.5 px-3 text-right">Administrative Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{p.id} • {p.age}y/{p.gender}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800">{p.district}</div>
                      <div className="text-[11px] text-slate-500">{p.tu}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${p.bmi < 16 ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'}`}>
                          BMI {p.bmi}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700">
                          Sputum: {p.sputum}
                        </span>
                        {p.cavitation && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800">
                            Cavitary
                          </span>
                        )}
                        {p.hiv && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-100 text-purple-800">
                            HIV+
                          </span>
                        )}
                        {p.diabetes && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800">
                            DM
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 font-mono">{p.riskScore}%</div>
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                        <div 
                          className={`h-full ${p.riskScore > 75 ? 'bg-rose-500' : p.riskScore > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${p.riskScore}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        p.tier === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                        p.tier === 'High' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {p.tier}
                      </span>
                      {p.overridden && (
                        <div className="text-[10px] text-purple-700 font-medium mt-1 flex items-center gap-0.5" title={p.overrideReason}>
                          <span>Overridden</span>
                          <Info className="w-3 h-3 inline" />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedPatientForOverride(p);
                          setOverrideNewTier(p.tier);
                          setIsOverrideModalOpen(true);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 hover:border-blue-300 rounded transition-colors"
                      >
                        Clinical Override
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CARTRIDGE LOGISTICS OVERRIDE */}
      {activeSubTab === 'logistics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Dispatch Tool */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-700" />
                  <span>Emergency Diagnostic Buffer Dispatch</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Release cartridges from the Guwahati Central State Buffer directly to deficit district stores.
                </p>
              </div>

              {dispatchSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{dispatchSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleExecuteDispatch} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Destination District TB Store
                  </label>
                  <select
                    value={dispatchDistrict}
                    onChange={(e) => setDispatchDistrict(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    {inventory.map(item => (
                      <option key={item.district} value={item.district}>
                        {item.district} ({item.currentStock} in stock • {item.bufferDays} days buffer)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Cartridge Allocation Quantity
                  </label>
                  <select
                    value={dispatchQty}
                    onChange={(e) => setDispatchQty(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value={25}>25 Cartridges (Emergency Run)</option>
                    <option value={50}>50 Cartridges (Standard Buffer Top-up)</option>
                    <option value={100}>100 Cartridges (Full District Re-supply)</option>
                    <option value={200}>200 Cartridges (Regional Medical College Batch)</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-600 border border-slate-200">
                  <div className="font-semibold text-slate-800 mb-0.5">Guwahati State Buffer Status:</div>
                  <div>CBNAAT: 4,800 units | Truenat: 2,400 units | Transit: Blue Dart cold-chain courier</div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Truck className="w-4 h-4" />
                  <span>Execute Emergency Reallocation</span>
                </button>
              </form>
            </div>

            {/* Right: Live District Inventory Table */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-700" />
                    <span>District Sputum Testing Lab Stock Monitor</span>
                  </h3>
                  <p className="text-xs text-slate-500">Live cartridge burn rates and stock-out depletion forecasters.</p>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                  35 Districts Monitored
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-y border-slate-200">
                    <tr>
                      <th className="py-2 px-3">District & Lab</th>
                      <th className="py-2 px-3">Technology</th>
                      <th className="py-2 px-3">Current Stock</th>
                      <th className="py-2 px-3">Burn Rate</th>
                      <th className="py-2 px-3">Buffer Horizon</th>
                      <th className="py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inventory.map(item => (
                      <tr key={item.district} className="hover:bg-slate-50/80">
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-slate-800">{item.district}</div>
                          <div className="text-[10px] text-slate-500">{item.facility}</div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 font-medium">{item.type}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 font-mono">{item.currentStock} units</td>
                        <td className="py-2.5 px-3 text-slate-600 font-mono">{item.dailyBurnRate}/day</td>
                        <td className="py-2.5 px-3 font-mono font-bold">
                          <span className={item.bufferDays <= 7 ? 'text-rose-600' : 'text-slate-700'}>
                            {item.bufferDays} days
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                            item.status === 'Adequate' ? 'bg-emerald-100 text-emerald-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUB-TAB 4: SUPERVISORY TOURS */}
      {activeSubTab === 'tours' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Form to Schedule Targeted Tour */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>Assign Supervisory Tour / ACF Mission</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Dispatch priority supervisory visits to failing TUs identified via the Supervisory Priority Index (SPI).
                </p>
              </div>

              <form onSubmit={handleScheduleTour} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Target District</label>
                  <select
                    value={newTourDistrict}
                    onChange={(e) => setNewTourDistrict(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="Tinsukia">Tinsukia (Tea Garden Belt)</option>
                    <option value="Dibrugarh">Dibrugarh (Upper Assam)</option>
                    <option value="Barpeta">Barpeta (Riverine Char Areas)</option>
                    <option value="Dhubri">Dhubri (Border/Char belt)</option>
                    <option value="Darrang">Darrang (Diagnostic Deficit)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Tuberculosis Unit (TU)</label>
                  <input
                    type="text"
                    value={newTourTU}
                    onChange={(e) => setNewTourTU(e.target.value)}
                    placeholder="e.g. Doomdooma TU"
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Supervisory Focus Objective</label>
                  <textarea
                    value={newTourFocus}
                    onChange={(e) => setNewTourFocus(e.target.value)}
                    rows={2}
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Dispatch Supervisory Tour</span>
                </button>
              </form>
            </div>

            {/* Tour Roster */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span>State & District Scheduled Supervisory Interventions</span>
                  </h3>
                  <p className="text-xs text-slate-500">Tours scheduled based on algorithmic SPI prioritization.</p>
                </div>
              </div>

              <div className="space-y-3">
                {tours.map(t => (
                  <div key={t.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{t.tu}</span>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-medium">
                          {t.district}
                        </span>
                        <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded font-mono">
                          SPI: {t.spiScore}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">{t.focusArea}</div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2 font-mono">
                        <span>Lead: {t.leadOfficer}</span>
                        <span>•</span>
                        <span>Date: {t.scheduledDate}</span>
                      </div>
                    </div>

                    <div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        t.status === 'Scheduled' ? 'bg-purple-100 text-purple-800' :
                        t.status === 'In Progress' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUB-TAB 5: CDSS RULE ENGINE & AI GOVERNANCE */}
      {activeSubTab === 'rules' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-700" />
                <span>Clinical Decision Support System (CDSS) Rule Engine & Model Governance</span>
              </h3>
              <p className="text-xs text-slate-500">
                Configure clinical cutoffs, adjust clinical risk feature weights, and select the inference model tier.
              </p>
            </div>

            <button
              onClick={handleSaveRules}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Publish Engine Config</span>
            </button>
          </div>

          {rulesSavedNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Engine configuration successfully committed to ASDC Edge Gateway. Audit entry recorded.</span>
            </div>
          )}

          {/* Engine Selector */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Primary Predictive Model Architecture
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div 
                onClick={() => setEngineMode('ensemble')}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  engineMode === 'ensemble' 
                    ? 'border-blue-500 bg-blue-50/70 shadow-sm' 
                    : 'border-slate-200 bg-white hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">Ensemble XGBoost + SHAP (Recommended)</span>
                  <span className="text-[10px] bg-blue-700 text-white px-1.5 py-0.2 rounded font-semibold">AUROC 0.88</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Non-linear interaction modeling of undernutrition, cavitation, and comorbidity with real-time SHAP force plots.
                </p>
              </div>

              <div 
                onClick={() => setEngineMode('rules')}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  engineMode === 'rules' 
                    ? 'border-blue-500 bg-blue-50/70 shadow-sm' 
                    : 'border-slate-200 bg-white hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">Deterministic Clinical Guideline Rules</span>
                  <span className="text-[10px] bg-slate-600 text-white px-1.5 py-0.2 rounded font-semibold">Fallback</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Fixed clinical threshold scoring based strictly on standard National TB Elimination Programme (NTEP) flowcharts.
                </p>
              </div>
            </div>
          </div>

          {/* Sliders: Risk Cutoffs */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Risk Stratification Cutoffs (0 - 100 Score)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-lg border border-rose-200 bg-rose-50/50 space-y-1">
                <div className="flex justify-between text-xs font-bold text-rose-900">
                  <span>Critical Tier Threshold:</span>
                  <span className="font-mono">&gt; {criticalCutoff}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="90"
                  value={criticalCutoff}
                  onChange={(e) => setCriticalCutoff(Number(e.target.value))}
                  className="w-full accent-rose-600"
                />
                <div className="text-[10px] text-rose-700">Triggers mandatory inpatient bed alert & daily SMS.</div>
              </div>

              <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 space-y-1">
                <div className="flex justify-between text-xs font-bold text-amber-900">
                  <span>High Tier Threshold:</span>
                  <span className="font-mono">&gt; {highCutoff}%</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="65"
                  value={highCutoff}
                  onChange={(e) => setHighCutoff(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
                <div className="text-[10px] text-amber-700">Triggers bi-weekly ASHA home supervision visits.</div>
              </div>

              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 space-y-1">
                <div className="flex justify-between text-xs font-bold text-emerald-900">
                  <span>Moderate Tier Threshold:</span>
                  <span className="font-mono">&gt; {moderateCutoff}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="35"
                  value={moderateCutoff}
                  onChange={(e) => setModerateCutoff(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="text-[10px] text-emerald-700">Standard DOTS outpatient regimen + nutrition support.</div>
              </div>
            </div>
          </div>

          {/* Sliders: Feature Weights */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              2. Key Feature Attribution Weights
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span>Severe Undernutrition (BMI &lt; 16 kg/m²)</span>
                  <span className="font-mono font-bold text-blue-800">{bmiWeight} pts</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span>Bilateral Cavitary Chest X-Ray Lesions</span>
                  <span className="font-mono font-bold text-blue-800">{cavitaryWeight} pts</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  value={cavitaryWeight}
                  onChange={(e) => setCavitaryWeight(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span>HIV / Immunocompromised Co-infection</span>
                  <span className="font-mono font-bold text-blue-800">{hivWeight} pts</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  value={hivWeight}
                  onChange={(e) => setHivWeight(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span>Uncontrolled Diabetes (HbA1c &gt; 9.0)</span>
                  <span className="font-mono font-bold text-blue-800">{diabetesWeight} pts</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={diabetesWeight}
                  onChange={(e) => setDiabetesWeight(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: AUDIT TRAIL & COMPLIANCE */}
      {activeSubTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-700" />
                <span>Immutable Regulatory Audit Trail</span>
              </h3>
              <p className="text-xs text-slate-500">
                Cryptographically tracked administrative events compliant with the Digital Personal Data Protection Act (DPDPA 2023).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Event ID</th>
                  <th className="py-2.5 px-3">Timestamp (IST)</th>
                  <th className="py-2.5 px-3">Authorized Actor</th>
                  <th className="py-2.5 px-3">Action Code</th>
                  <th className="py-2.5 px-3">Event Summary</th>
                  <th className="py-2.5 px-3 font-mono">Client IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-800">{log.id}</td>
                    <td className="py-2.5 px-3 text-slate-500">{log.timestamp}</td>
                    <td className="py-2.5 px-3 text-blue-800 font-semibold font-sans">{log.user}</td>
                    <td className="py-2.5 px-3">
                      <span className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[10px] font-bold">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-sans text-slate-700">{log.details}</td>
                    <td className="py-2.5 px-3 text-slate-400 text-[11px]">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: ADD PATIENT */}
      {isAddPatientOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-700" />
                <span>Add Patient Record & Evaluate CDSS Risk</span>
              </h3>
              <button 
                onClick={() => setIsAddPatientOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPatient} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bipin Saikia"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newPatientAge}
                    onChange={(e) => setNewPatientAge(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Gender</label>
                  <select
                    value={newPatientGender}
                    onChange={(e) => setNewPatientGender(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs bg-white focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">District</label>
                  <select
                    value={newPatientDistrict}
                    onChange={(e) => setNewPatientDistrict(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs bg-white focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="Dibrugarh">Dibrugarh</option>
                    <option value="Barpeta">Barpeta</option>
                    <option value="Kamrup Metro">Kamrup Metro</option>
                    <option value="Darrang">Darrang</option>
                    <option value="Tinsukia">Tinsukia</option>
                    <option value="Dhubri">Dhubri</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tuberculosis Unit (TU)</label>
                  <input
                    type="text"
                    value={newPatientTU}
                    onChange={(e) => setNewPatientTU(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Body Mass Index (BMI)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="10"
                    max="40"
                    value={newPatientBMI}
                    onChange={(e) => setNewPatientBMI(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Sputum Smear Grade</label>
                  <select
                    value={newPatientSputum}
                    onChange={(e) => setNewPatientSputum(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs bg-white focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="3+">3+ (High Bacillary Load)</option>
                    <option value="2+">2+</option>
                    <option value="1+">1+</option>
                    <option value="Scanty">Scanty</option>
                    <option value="Negative">Negative / Extra-Pulmonary</option>
                  </select>
                </div>
              </div>

              {/* Comorbidity Toggles */}
              <div className="p-3 bg-slate-50 rounded-lg space-y-2 border border-slate-200">
                <span className="block font-semibold text-slate-800">Clinical Risk Markers:</span>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPatientCavitation}
                      onChange={(e) => setNewPatientCavitation(e.target.checked)}
                      className="accent-blue-600 rounded"
                    />
                    <span>Bilateral Cavitary CXR</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPatientDiabetes}
                      onChange={(e) => setNewPatientDiabetes(e.target.checked)}
                      className="accent-blue-600 rounded"
                    />
                    <span>Diabetes Mellitus (DM)</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPatientHIV}
                      onChange={(e) => setNewPatientHIV(e.target.checked)}
                      className="accent-blue-600 rounded"
                    />
                    <span>HIV Co-infection</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPatientOpen(false)}
                  className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white font-bold shadow-sm"
                >
                  Calculate CDSS Risk & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CLINICAL TRIAGE OVERRIDE */}
      {isOverrideModalOpen && selectedPatientForOverride && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-blue-700" />
                <span>Authorized Clinical Triage Override</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Patient: <strong className="text-slate-800">{selectedPatientForOverride.name}</strong> ({selectedPatientForOverride.id})
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-500">Current AI Stratification:</span>
                  <span className="font-bold text-slate-800">{selectedPatientForOverride.tier} ({selectedPatientForOverride.riskScore}%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">BMI / Sputum:</span>
                  <span className="text-slate-700">{selectedPatientForOverride.bmi} kg/m² • {selectedPatientForOverride.sputum}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Override Clinical Tier:
                </label>
                <select
                  value={overrideNewTier}
                  onChange={(e) => setOverrideNewTier(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs bg-white focus:ring-1 focus:ring-blue-600 font-bold"
                >
                  <option value="Critical">Critical (Immediate Inpatient Hospitalization)</option>
                  <option value="High">High (Bi-weekly ASHA Home Monitoring)</option>
                  <option value="Moderate">Moderate (Standard Outpatient DOTS)</option>
                  <option value="Low">Low (Routine Clinic Follow-up)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mandatory Clinical Justification (Logged to Audit Trail):
                </label>
                <textarea
                  value={overrideReasonInput}
                  onChange={(e) => setOverrideReasonInput(e.target.value)}
                  placeholder="e.g. Patient presents with hemoptysis and uncontrolled diabetes despite moderate BMI; escalating to Critical for 48hr clinical stabilization."
                  rows={3}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOverrideModalOpen(false)}
                  className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!overrideReasonInput.trim()}
                  onClick={handleApplyOverride}
                  className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white font-bold disabled:opacity-50 shadow-sm"
                >
                  Commit Clinical Override
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
