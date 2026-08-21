import React from 'react';
import { PageView } from '../types';
import { COMPANY_CONFIG } from '../data/company';
import { SectionHeading } from './SectionHeading';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (page: PageView) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              badge="About Mars Remedies"
              title="Driven by Quality, Committed to Better Healthcare"
              subtitle="Mars Remedies is a dedicated pharmaceutical enterprise operating dual strategic operational hubs in Baddi (Himachal Pradesh) and Patna (Bihar)."
              align="left"
              className="mb-6!"
            />

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We specialize in offering high-grade therapeutic formulations developed under stringent quality controls, robust stability protocols, and strict adherence to WHO-GMP standards. Our portfolio spans 110+ formulations tailored for clinics, hospitals, pharmacies, and ethical distribution networks across India.
            </p>

            {/* Core Values / Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <ShieldCheck className="w-5 h-5 text-[#002060] dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">GMP Assured Quality</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Assayed for purity &amp; dissolution</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <Building2 className="w-5 h-5 text-[#e11d27] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Dual Operational Hubs</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Baddi (H.O.) &amp; Patna (A.O.)</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#002060] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900/80 border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
              >
                <span>Read Corporate Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Location & Infrastructure Overview */}
          <div className="lg:col-span-6 space-y-4">
            {/* Patna Office Card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 dark:bg-blue-950/90 text-[#002060] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {COMPANY_CONFIG.offices.patna.type}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Commercial Operations</span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
                {COMPANY_CONFIG.offices.patna.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5 mt-2">
                <MapPin className="w-4 h-4 text-[#e11d27] shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.offices.patna.fullAddress}</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                {COMPANY_CONFIG.offices.patna.role}
              </p>
            </div>

            {/* Baddi Office Card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  {COMPANY_CONFIG.offices.baddi.type}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Corporate &amp; Supply Hub</span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
                {COMPANY_CONFIG.offices.baddi.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5 mt-2">
                <MapPin className="w-4 h-4 text-[#002060] dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.offices.baddi.fullAddress}</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                {COMPANY_CONFIG.offices.baddi.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
