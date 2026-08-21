import React from 'react';
import { PageView } from '../types';
import { COMPANY_CONFIG } from '../data/company';
import { Send, Mail, CheckCircle2 } from 'lucide-react';

interface CTASectionProps {
  onNavigate: (page: PageView) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 md:py-20 bg-[#002060] dark:bg-slate-950 text-white relative overflow-hidden transition-colors border-t border-b border-blue-900/60 dark:border-slate-800">
      {/* Background Subtle Pattern & Glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-950/90 via-[#002060] to-indigo-950/90 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 border border-blue-800/80 dark:border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/80 dark:bg-slate-800/80 border border-blue-700 dark:border-slate-700 text-blue-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Open for PCD Pharma Franchise &amp; Third-Party Enquiries</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Expand Your Pharmaceutical Distribution with Mars Remedies
              </h2>

              <p className="text-sm sm:text-base text-blue-100/90 dark:text-slate-300 max-w-2xl leading-relaxed">
                Connect with our commercial team today to discuss exclusive territorial marketing rights, wholesale bulk supply, or complete catalogue trade terms.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-blue-200 dark:text-blue-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Monopoly Rights Available
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Prompt Despatch from Baddi &amp; Patna
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Full Promotional Support
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-[#002060] bg-white hover:bg-slate-100 active:bg-slate-200 shadow-lg transition-all duration-150 cursor-pointer text-center"
              >
                <Send className="w-4 h-4 text-[#002060]" />
                <span>Submit Trade Enquiry</span>
              </button>

              <a
                href={`mailto:${COMPANY_CONFIG.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-blue-200 hover:text-white bg-blue-900/60 dark:bg-slate-800/80 hover:bg-blue-900 dark:hover:bg-slate-700 border border-blue-700/80 dark:border-slate-700 transition-all text-center"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Official Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
