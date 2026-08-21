import React from 'react';
import { PageView } from '../types';
import { COMPANY_CONFIG } from '../data/company';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigate: (page: PageView) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 dark:bg-[#050b18] min-h-screen py-10 sm:py-14 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002060] dark:text-blue-400 hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-blue-50 dark:bg-blue-950/80 text-[#002060] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Compliance &amp; Data Protection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} | Mars Remedies
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">1. Information Collection &amp; Trade Enquiries</h2>
              <p>
                Mars Remedies collects professional contact information provided voluntarily through our trade enquiry forms, email communications, and telephone inquiries. This data typically includes your name, commercial designation, pharmaceutical firm name, phone number, email address, and territorial requirements.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">2. Utilization of Data</h2>
              <p>
                The information collected is strictly utilized to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                <li>Process PCD franchise applications and evaluate geographical exclusivity.</li>
                <li>Transmit wholesale price lists, promotional kits, and drug formulation specifications.</li>
                <li>Coordinate logistics, batch verification, and commercial invoice billing between our Patna (A.O.) and Baddi (H.O.) offices.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">3. Confidentiality &amp; Non-Disclosure</h2>
              <p>
                We do not sell, lease, or distribute your trade or contact data to third-party marketing entities. Information is only shared internally with authorized sales coordinators and logistics handlers to fulfill orders and business partnerships.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">4. Contact For Privacy Matters</h2>
              <p>
                If you have questions regarding the handling of your commercial information, please contact our administrative desk at{' '}
                <a href={`mailto:${COMPANY_CONFIG.email}`} className="text-[#002060] dark:text-blue-400 font-bold underline">
                  {COMPANY_CONFIG.email}
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
