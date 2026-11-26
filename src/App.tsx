import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TBRiskWorklist } from './components/TBRiskWorklist';
import { VulnerabilityMap } from './components/VulnerabilityMap';
import { ReferralTracker } from './components/ReferralTracker';
import { FacilitySupervision } from './components/FacilitySupervision';
import { AuditAndDeduplication } from './components/AuditAndDeduplication';
import { ExecutiveCommand } from './components/ExecutiveCommand';
import { TutorialModal } from './components/TutorialModal';
import { AdminLogin, AdminUser } from './components/AdminLogin';
import { AdminConsole } from './components/AdminConsole';
import { 
  Activity, 
  MapPin, 
  GitCommit, 
  Building2, 
  FileSearch, 
  ShieldAlert, 
  HelpCircle,
  FileText,
  BookOpen,
  Copy,
  Download,
  Lock,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('executive');
  const [selectedRole, setSelectedRole] = useState<string>('STO');
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Restore previous admin session if exists & check URL for tutorial deep link
  useEffect(() => {
    const saved = localStorage.getItem('nikshay_admin_session');
    if (saved) {
      try {
        setAdminUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('nikshay_admin_session');
      }
    }

    // Support deep link: ?tutorial=true or #tutorial
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('tutorial') === 'true' || searchParams.get('guide') === 'true' || window.location.hash === '#tutorial' || window.location.hash === '#guide') {
      setIsTutorialOpen(true);
    }
  }, []);

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    localStorage.setItem('nikshay_admin_session', JSON.stringify(user));
    setActiveTab('admin');
  };

  const handleLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('nikshay_admin_session');
    setActiveTab('executive');
  };

  // When role changes, switch to relevant default tab
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    if (role === 'STO') {
      setActiveTab('executive');
    } else if (role === 'DTO') {
      setActiveTab('facilities');
    } else if (role === 'MO_STS') {
      setActiveTab('worklist');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedRole={selectedRole}
        setSelectedRole={handleRoleChange}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        adminUser={adminUser}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Role Indicator & Quick Actions Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Active View:</span>
          <span className="font-bold text-slate-800 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 shadow-sm flex items-center gap-1.5">
            {activeTab === 'admin' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-amber-800">
                  NikshayDrishti Management Console (Super Admin & Governance)
                </span>
              </>
            ) : selectedRole === 'STO' ? (
              'State TB Officer (Statewide Elimination Cockpit & Policy)' 
            ) : selectedRole === 'DTO' ? (
              'District TB Officer (Supervision SPI Tours & Predictive Logistics)' 
            ) : (
              'Medical Officer / STS (Patient Triage & Differentiated Care)'
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Admin Login Quick Pill if not logged in */}
          {!adminUser && (
            <button
              onClick={() => setIsAdminLoginOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-lg text-xs font-bold shadow-sm transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>Demo Admin Login</span>
            </button>
          )}

          {/* Tutorial / Guide Pill */}
          <button
            onClick={() => setIsTutorialOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 rounded-lg text-xs font-bold shadow-sm transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>How to Use & Test</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        {activeTab === 'executive' && <ExecutiveCommand />}
        {activeTab === 'worklist' && <TBRiskWorklist />}
        {activeTab === 'gis' && <VulnerabilityMap />}
        {activeTab === 'referrals' && <ReferralTracker />}
        {activeTab === 'facilities' && <FacilitySupervision />}
        {activeTab === 'audit' && <AuditAndDeduplication />}
        
        {/* Admin Console View */}
        {activeTab === 'admin' && (
          adminUser ? (
            <AdminConsole 
              currentUser={adminUser} 
              onLogout={handleLogout}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-lg mx-auto shadow-sm space-y-4 my-12">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7 text-amber-700" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Admin Authentication Required</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                The NikshayDrishti Management Console is restricted to authorized State TB Officers, District TB Officers, and System Administrators. Please sign in using the provided demo credentials to explore the admin capabilities.
              </p>
              <button
                onClick={() => setIsAdminLoginOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>Open Admin Login (Demo Credentials)</span>
              </button>
            </div>
          )
        )}
      </main>

      {/* Admin Login Modal */}
      <AdminLogin
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Comprehensive Tutorial & Guide Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        setActiveTab={setActiveTab}
      />

      {/* Footer */}
      <Footer onOpenAdminLogin={() => setIsAdminLoginOpen(true)} />
    </div>
  );
};
