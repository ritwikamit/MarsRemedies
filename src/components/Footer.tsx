import React from 'react';
import { Logo } from './Logo';
import { PageView } from '../types';
import { COMPANY_CONFIG } from '../data/company';
import { CATEGORIES } from '../data/products';
import { 
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ArrowUp, 
  ExternalLink,
  ChevronRight,
  Building
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onSelectCategory?: (category: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Corporate', page: 'about' },
    { label: 'Product Catalogue', page: 'products' },
    { label: 'Dosage Categories', page: 'categories' },
    { label: 'Franchise / Contact', page: 'contact' },
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Terms & Disclaimer', page: 'terms' },
  ];

  return (
    <footer className="bg-[#091842] text-slate-300 border-t border-blue-950 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-blue-900/60">
          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-400 rounded-xl cursor-pointer p-0 inline-flex"
              aria-label="Mars Remedies Home"
            >
              <Logo variant="dark" size="lg" showTagline={false} />
            </button>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm pt-2">
              Mars Remedies is a dedicated pharmaceutical enterprise committed to healthcare excellence through quality-assured formulations, ethical distribution, and PCD franchise opportunities nationwide.
            </p>

            <div className="pt-2">
              <a
                href={`mailto:${COMPANY_CONFIG.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-900/50 hover:bg-blue-900 border border-blue-700/60 text-xs font-semibold text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-300" />
                <span>{COMPANY_CONFIG.email}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-blue-800/80 pb-2">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => {
                      onNavigate(link.page);
                      scrollToTop();
                    }}
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-blue-400" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-blue-800/80 pb-2">
              Dosage Forms
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      if (onSelectCategory) {
                        onSelectCategory(cat);
                      } else {
                        onNavigate('products');
                      }
                      scrollToTop();
                    }}
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer truncate"
                  >
                    <ChevronRight className="w-3 h-3 text-blue-400" />
                    <span>{cat}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Corporate Offices (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-blue-800/80 pb-2">
              Corporate Offices
            </h4>

            {/* Patna Office */}
            <div className="text-xs space-y-1 bg-blue-950/50 p-3 rounded-xl border border-blue-900/80">
              <div className="flex items-center justify-between text-blue-300 font-bold">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-[#dc2626]" />
                  {COMPANY_CONFIG.offices.patna.type}
                </span>
                <a
                  href={COMPANY_CONFIG.offices.patna.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-300 hover:text-white inline-flex items-center gap-0.5"
                >
                  <span>Map</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {COMPANY_CONFIG.offices.patna.addressLine1}, {COMPANY_CONFIG.offices.patna.addressLine2}, {COMPANY_CONFIG.offices.patna.state}
              </p>
            </div>

            {/* Baddi Office */}
            <div className="text-xs space-y-1 bg-blue-950/50 p-3 rounded-xl border border-blue-900/80">
              <div className="flex items-center justify-between text-blue-300 font-bold">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-blue-400" />
                  {COMPANY_CONFIG.offices.baddi.type}
                </span>
                <a
                  href={COMPANY_CONFIG.offices.baddi.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-300 hover:text-white inline-flex items-center gap-0.5"
                >
                  <span>Map</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {COMPANY_CONFIG.offices.baddi.addressLine1}, {COMPANY_CONFIG.offices.baddi.addressLine2}
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer Notice */}
        <div className="py-6 border-b border-blue-900/60 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-300">Regulatory &amp; Product Notice:</strong> {COMPANY_CONFIG.disclaimer}
          </p>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Mars Remedies. All Rights Reserved. Committed to serve better Healthcare.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                onNavigate('privacy');
                scrollToTop();
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button
              onClick={() => {
                onNavigate('terms');
                scrollToTop();
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span>&bull;</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-blue-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
