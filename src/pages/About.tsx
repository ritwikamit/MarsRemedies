import React from 'react';
import { PageView } from '../types';
import { COMPANY_CONFIG } from '../data/company';
import { SectionHeading } from '../components/SectionHeading';
import { Logo } from '../components/Logo';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Target, 
  Eye, 
  FlaskRound,
  FileCheck2,
  ExternalLink
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
}

export const About: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 dark:bg-[#050b18] min-h-screen py-10 sm:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header with Official Logo Showcase */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mx-auto">
            <Logo size="lg" variant="auto" showTagline={true} />
          </div>

          <div className="pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-blue-50 dark:bg-blue-950/80 text-[#002060] dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e11d27]" />
              <span>Corporate Profile</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              About Mars Remedies
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Founded on the guiding ethos of <em>"Committed to serve better Healthcare"</em>, Mars Remedies is an established pharmaceutical company dedicated to enhancing therapeutic outcomes with affordable, high-efficacy medications.
            </p>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#002060] dark:text-blue-400 border border-blue-100 dark:border-blue-900 flex items-center justify-center mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">Our Mission</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To deliver superior-grade, clinically tested pharmaceuticals accessible to healthcare professionals, distributors, and patients across India. We ensure our formulations meet stringent purity, stability, and bioavailability criteria.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950 text-[#e11d27] dark:text-red-400 border border-red-100 dark:border-red-900 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">Our Vision</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To be recognized as a premier pharmaceutical brand synonymous with uncompromised ethics, dependable supply chains, and forward-looking therapeutic formulations that empower healthier communities.
            </p>
          </div>
        </div>

        {/* Strategic Operational Hubs */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-8">
          <div>
            <SectionHeading
              badge="Dual Operational Hubs"
              title="Strategic Infrastructure & Logistics"
              subtitle="To ensure seamless distribution, responsive customer support, and uncompromised batch handling, Mars Remedies operates two pivotal corporate centers."
              align="left"
              className="mb-0!"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Patna Administrative Office */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-blue-100 dark:bg-blue-950 text-[#002060] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {COMPANY_CONFIG.offices.patna.type}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Commercial Division</span>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {COMPANY_CONFIG.offices.patna.title}
              </h3>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#e11d27] shrink-0 mt-0.5" />
                  <span>{COMPANY_CONFIG.offices.patna.fullAddress}</span>
                </p>
                <p className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Role:</strong> {COMPANY_CONFIG.offices.patna.role}
                </p>
              </div>

              <a
                href={COMPANY_CONFIG.offices.patna.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002060] dark:text-blue-400 hover:underline"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Baddi Head Office */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  {COMPANY_CONFIG.offices.baddi.type}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Operations Hub</span>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {COMPANY_CONFIG.offices.baddi.title}
              </h3>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#002060] dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>{COMPANY_CONFIG.offices.baddi.fullAddress}</span>
                </p>
                <p className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Role:</strong> {COMPANY_CONFIG.offices.baddi.role}
                </p>
              </div>

              <a
                href={COMPANY_CONFIG.offices.baddi.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002060] dark:text-blue-400 hover:underline"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Quality Assurance Framework */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6">
          <SectionHeading
            badge="Quality Assurance"
            title="Rigorous Quality & Compliance Standards"
            subtitle="Quality is not an afterthought at Mars Remedies; it is deeply embedded in every step from molecule procurement to final tamper-evident packaging."
            align="left"
            className="mb-0!"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">WHO-GMP Compliant</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Manufacturing facilities are aligned with World Health Organization Good Manufacturing Practices for sterility and consistency.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <FlaskRound className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Assay &amp; Bioavailability</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Every batch is subjected to chromatography assays, dissolution rate verification, and microbiological microbial load checks.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <FileCheck2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tamper-Proof Packaging</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                High-barrier Alu-Alu, blister, and sealed leak-resistant containers safeguard formulations across temperature fluctuations.
              </p>
            </div>
          </div>
        </div>

        {/* PCD Franchise & Trade Opportunity Callout */}
        <div className="bg-gradient-to-r from-blue-900 via-[#002060] to-indigo-950 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold">Partner With Mars Remedies</h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Are you a pharmaceutical distributor, medical representative, or healthcare entrepreneur? Inquire about PCD franchise rights for your designated territory today.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#002060] bg-white hover:bg-slate-100 shadow-md transition-all shrink-0 cursor-pointer"
          >
            <span>Franchise Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
