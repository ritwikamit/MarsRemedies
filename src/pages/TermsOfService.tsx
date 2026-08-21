import React from 'react';
import { PageView } from '../types';
import { COMPANY_CONFIG } from '../data/company';
import { FileText, ArrowLeft, AlertCircle } from 'lucide-react';

interface TermsOfServiceProps {
  onNavigate: (page: PageView) => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onNavigate }) => {
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
              <FileText className="w-3.5 h-3.5" />
              <span>Legal Terms &amp; Medical Disclaimer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Terms &amp; Medical Disclaimer
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} | Mars Remedies
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {/* Prominent Medical Notice */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-amber-900 dark:text-amber-300 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <strong className="font-bold block mb-1">Not For Direct Consumer Prescriptions:</strong>
                The pharmaceutical products and formulations displayed on this website are intended solely for registered medical practitioners, licensed chemists, pharmaceutical distributors, and healthcare stockists. This website does not sell prescription medications directly to the general public online.
              </div>
            </div>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">1. Nature of the Product Catalogue</h2>
              <p>
                The information, compositions, pack sizes, and therapeutic categories presented on this portal are for trade reference, educational overview, and business enquiry purposes. While we strive to maintain complete accuracy, actual packaging or formulations may undergo regulatory updates as mandated by drug licensing authorities.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">2. Medical Advice Disclaimer</h2>
              <p>
                Nothing on this website constitutes medical consultation, clinical diagnosis, or prescriptive advice. Patients must consult certified medical practitioners for any symptoms or health conditions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">3. PCD Franchise &amp; Distribution Terms</h2>
              <p>
                Franchise allocations and territory rights are subject to mutual agreement, statutory drug license (DL) verification, GST registration, and execution of standard corporate trade conditions with Mars Remedies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">4. Intellectual Property</h2>
              <p>
                All brand names, trademarks, product logos (including Mars Remedies wordmark and symbols), and text content are the intellectual property of Mars Remedies and protected under applicable trademark and copyright laws.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
