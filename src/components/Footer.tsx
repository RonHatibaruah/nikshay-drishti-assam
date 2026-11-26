import React from 'react';
import { Shield, ExternalLink, Mail, AlertTriangle, FileText, Download, Lock, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAdminLogin?: () => void;
  onOpenDedication?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminLogin, onOpenDedication }) => {
  return (
    <footer className="bg-[#071326] text-slate-300 text-xs border-t border-[#122442] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Prominent Statutory Disclaimer Box */}
        <div className="mb-8 p-4 bg-[#0c1e3d] rounded-xl border border-blue-600/40 text-blue-100 text-xs shadow-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-amber-300 uppercase tracking-wider text-[11px] block">
                Statutory Clinical & Implementation Disclaimer (NESFIC-D-30 Mandate)
              </strong>
              <p className="text-slate-200 leading-relaxed text-[11px]">
                NikshayDrishti (নিশ্চয় দৃষ্টি) is an artificial intelligence-driven clinical decision-support and programmatic decision-support system (CDSS) developed for the <strong>National Health Mission (NHM) and State TB Cell, Department of Health & Family Welfare, Government of Assam</strong> under <strong>NESFIC-D-30 (Stream 1 — Government Track: Health Sector)</strong>.
              </p>
              <p className="text-blue-200/90 leading-relaxed text-[11px]">
                <strong>Important Notice:</strong> Risk outputs, predictive triage scores, vulnerability indices, and differentiated care recommendations are <strong>decision-support tools only and must NOT replace clinical diagnosis, clinical discretion, or authorized programme decisions</strong> by treating physicians and medical officers. Patient health records are processed in strict compliance with the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong> and <strong>Ayushman Bharat Digital Mission (ABDM / ABHA)</strong> privacy standards.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Col 1: Platform Overview */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-base mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
              NikshayDrishti • নিশ্চয় দৃষ্টি (Assam TB Sentinel)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-4">
              AI-Powered Risk Stratification and Programme Decision Support System submitted under{' '}
              <strong className="text-white">NESFIC-D-30 (Stream 1 — Government Track: Health Sector)</strong> for the{' '}
              <strong className="text-white">National Health Mission (NHM) & State TB Cell, Government of Assam</strong>.
            </p>

              {/* Contact Email Box, Dedication & Admin Link */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="p-3 bg-[#0c1e3d] rounded-lg border border-blue-700/60 flex flex-wrap items-center justify-between gap-2 max-w-xl flex-1">
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs">
                    Visitor Inquiries & Technical Contact:
                  </span>
                </div>
                <a
                  href="mailto:Kalyanjit@gmail.com"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-md shadow transition-colors"
                >
                  <span>Kalyanjit@gmail.com</span>
                </a>
              </div>

              {onOpenDedication && (
                <button
                  onClick={onOpenDedication}
                  className="px-3 py-2.5 bg-rose-950/70 hover:bg-rose-900/90 border border-rose-500/50 text-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Founder's Personal Dedication to My Mother"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                  <span>Dedicated to Mom</span>
                </button>
              )}

              {onOpenAdminLogin && (
                <button
                  onClick={onOpenAdminLogin}
                  className="px-3 py-2.5 bg-[#0c1e3d] hover:bg-[#132a4f] border border-amber-500/40 text-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Console Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Official References & Proposal */}
          <div>
            <h4 className="text-white font-semibold mb-3">Official References & Code</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/downloads/NESFIC_D30_Proposal_Kalyanjit_Hatibaruah.pdf"
                  target="_blank"
                  rel="noreferrer"
                  download="NESFIC_D30_Proposal_Kalyanjit_Hatibaruah.pdf"
                  className="hover:text-blue-300 flex items-center gap-1 text-slate-200 font-medium"
                >
                  <Download className="w-3 h-3 text-blue-400" />
                  Official Proposal (PDF)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/flugelsoft-01/tb-risk-stratification-ai"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-300 flex items-center gap-1 text-blue-300 font-medium"
                >
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                  GitHub Repository (flugelsoft-01)
                </a>
              </li>
              <li>
                <a
                  href="https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-30"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-300 flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                  NESFIC-D-30 Problem Statement
                </a>
              </li>
              <li>
                <a
                  href="https://nhm.assam.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-300 flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                  NHM Assam Official Portal
                </a>
              </li>
              <li>
                <a
                  href="https://www.nikshay.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-300 flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                  Central Ni-kshay Portal (MoHFW)
                </a>
              </li>
              <li>
                <a
                  href="https://tbcindia.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-300 flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                  Central TB Division (CTD) India
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Flugelsoft Labs Copyright */}
        <div className="pt-6 border-t border-[#122442] flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-400 text-[11px]">
          <div>
            Copyrights Flugelsoft Labs • © 2026 Flugelsoft Labs. All Rights Reserved. • NESFIC 2026 Government Track
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>Lead Applicant: <strong>Kalyanjit Hatibaruah</strong></span>
            <span>•</span>
            <a href="mailto:Kalyanjit@gmail.com" className="text-blue-400 hover:underline">
              Kalyanjit@gmail.com
            </a>
            <span>•</span>
            <a href="https://github.com/flugelsoft-01/tb-risk-stratification-ai" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
              GitHub: flugelsoft-01
            </a>
            <span>•</span>
            <span>Assam State Data Centre (ASDC) Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
