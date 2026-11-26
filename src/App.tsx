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
import { DedicationModal } from './components/DedicationModal';
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
  UserCheck,
  Heart
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('executive');
  const [selectedRole, setSelectedRole] = useState<string>('STO');
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isDedicationOpen, setIsDedicationOpen] = useState<boolean>(true);
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

    // Check if user dismissed dedication modal
    const dedicationDismissed = localStorage.getItem('nikshay_dedication_dismissed');
    if (dedicationDismissed === 'true') {
      setIsDedicationOpen(false);
    } else {
      setIsDedicationOpen(true);
    }

    // Support deep link: ?tutorial=true or #tutorial or ?dedication=true
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('tutorial') === 'true' || searchParams.get('guide') === 'true' || window.location.hash === '#tutorial' || window.location.hash === '#guide') {
      setIsTutorialOpen(true);
    }
    if (searchParams.get('dedication') === 'true' || window.location.hash === '#dedication') {
      setIsDedicationOpen(true);
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
        onOpenDedication={() => setIsDedicationOpen(true)}
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
          {/* Founder's Dedication Quick Pill */}
          <button
            onClick={() => setIsDedicationOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-900 rounded-lg text-xs font-bold shadow-sm transition-all"
            title="Read Founder's Dedication to Mom"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>Dedicated to Mom</span>
          </button>

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

      {/* Founder's Dedication Initial Modal */}
      <DedicationModal
        isOpen={isDedicationOpen}
        onClose={() => setIsDedicationOpen(false)}
        onOpenTutorial={() => setIsTutorialOpen(true)}
      />

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
      <Footer 
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)} 
        onOpenDedication={() => setIsDedicationOpen(true)}
      />
    </div>
  );
};
