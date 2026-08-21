import React, { useState, useEffect } from 'react';
import { PageView, ContactFormData } from '../types';
import { COMPANY_CONFIG } from '../data/company';
import { SectionHeading } from '../components/SectionHeading';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  HelpCircle,
  Clock
} from 'lucide-react';

interface ContactPageProps {
  initialProduct?: string;
  onClearInitialProduct?: () => void;
  onNavigate: (page: PageView) => void;
}

export const Contact: React.FC<ContactPageProps> = ({
  initialProduct = '',
  onClearInitialProduct,
  onNavigate,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    state: '',
    enquiryType: initialProduct ? 'product_inquiry' : 'pcd_franchise',
    productOfInterest: initialProduct || '',
    message: initialProduct ? `I would like to inquire about trade terms and pricing for ${initialProduct}.` : '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({
        ...prev,
        productOfInterest: initialProduct,
        enquiryType: 'product_inquiry',
        message: `I would like to inquire about trade terms and pricing for ${initialProduct}.`,
      }));
    }
  }, [initialProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onClearInitialProduct) {
        onClearInitialProduct();
      }
    }, 800);
  };

  const faqs = [
    {
      q: 'How can I apply for PCD Pharma Franchise monopoly rights?',
      a: 'Submit your city, district, and contact details via our enquiry form above or email us directly at marsremedies580@gmail.com. Our commercial desk will review territory exclusivity and share the complete product rate list and promotional kit details.',
    },
    {
      q: 'What promotional support does Mars Remedies provide to distributors?',
      a: 'We provide comprehensive marketing collateral including Visual Aids, Product Glossaries, Sample Catch Covers, Order Books, Reminder Cards, and promotional gifts for medical practitioners.',
    },
    {
      q: 'Where are product shipments dispatched from?',
      a: 'Depending on your destination state, consignments are routed and dispatched from our primary operations hub in Baddi (Himachal Pradesh) or our administrative hub in Patna (Bihar).',
    },
    {
      q: 'Do you support third-party pharmaceutical manufacturing queries?',
      a: 'Yes, we assist healthcare groups and institutional buyers with contract manufacturing and bulk formulation supply under standard WHO-GMP compliance protocols.',
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-[#050b18] min-h-screen py-10 sm:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-blue-50 dark:bg-blue-950/80 text-[#002060] dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e11d27]" />
            <span>Direct Commercial Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact Mars Remedies
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Connect with our sales, marketing, and distribution management for PCD franchise opportunities, institutional supply, and product inquiries.
          </p>
        </div>

        {/* Main Grid: Form + Office Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Trade &amp; Franchise Enquiry Form</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Fill in your details below and our team will get back to you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-850 rounded-2xl p-8 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Enquiry Transmitted Successfully</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for contacting Mars Remedies. We have registered your trade enquiry. For urgent correspondence, you may also email us directly at{' '}
                    <strong className="text-slate-900 dark:text-white">{COMPANY_CONFIG.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        company: '',
                        city: '',
                        state: '',
                        enquiryType: 'pcd_franchise',
                        productOfInterest: '',
                        message: '',
                      });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/80 hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors cursor-pointer"
                  >
                    <span>Submit Another Enquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {initialProduct && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 rounded-xl text-xs text-[#002060] dark:text-blue-300 flex items-center justify-between">
                      <span>Inquiring for: <strong>{initialProduct}</strong></span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((p) => ({ ...p, productOfInterest: '' }));
                          if (onClearInitialProduct) onClearInitialProduct();
                        }}
                        className="text-xs text-blue-800 dark:text-blue-400 underline font-semibold cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Rajesh Sharma / Amit Kumar"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#002060] dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. info@yourfirm.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#002060] dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#002060] dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Company / Pharmacy Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Apex Pharma Agencies"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#002060] dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        City / District <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Patna / Solan / Varanasi"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#002060] dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="e.g. Bihar / Uttar Pradesh / Himachal"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#002060] dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Enquiry Nature <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#002060] dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm outline-hidden cursor-pointer"
                      >
                        <option value="pcd_franchise" className="dark:bg-slate-900">PCD Pharma Franchise Opportunity</option>
                        <option value="third_party_manufacturing" className="dark:bg-slate-900">Third-Party Contract Manufacturing</option>
                        <option value="institutional_supply" className="dark:bg-slate-900">Hospital / Institutional Bulk Supply</option>
                        <option value="product_inquiry" className="dark:bg-slate-900">Specific Formulation Inquiry</option>
                        <option value="general" className="dark:bg-slate-900">General Commercial Correspondence</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Product of Interest
                      </label>
                      <input
                        type="text"
                        name="productOfInterest"
                        value={formData.productOfInterest}
                        onChange={handleChange}
                        placeholder="e.g. ACELEED-P, LEVLEED-M"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#002060] dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Message / Territory Details
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please specify territory requirements, monthly estimated volume, or any specific query..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#002060] dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-[#002060] hover:bg-[#002d8a] active:bg-[#001744] dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md transition-all cursor-pointer disabled:opacity-70"
                  >
                    <Send className="w-4 h-4 text-blue-200" />
                    <span>{isSubmitting ? 'Transmitting Enquiry...' : 'Submit Trade Enquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Corporate Contact Information & Locations (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#002060] dark:text-blue-400 border border-blue-100 dark:border-blue-900 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Direct Email Contact</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Official sales &amp; trade desk</p>
                </div>
              </div>
              <a
                href={`mailto:${COMPANY_CONFIG.email}`}
                className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-[#002060] dark:text-blue-400 transition-colors"
              >
                {COMPANY_CONFIG.email}
              </a>
            </div>

            {/* Patna Administrative Office */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 dark:bg-blue-950 text-[#002060] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {COMPANY_CONFIG.offices.patna.type}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Patna, Bihar</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {COMPANY_CONFIG.offices.patna.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#e11d27] shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.offices.patna.fullAddress}</span>
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <strong>Focus:</strong> {COMPANY_CONFIG.offices.patna.role}
              </div>
              <a
                href={COMPANY_CONFIG.offices.patna.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002060] dark:text-blue-400 hover:underline pt-1"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Baddi Head Office */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  {COMPANY_CONFIG.offices.baddi.type}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Solan, Himachal</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {COMPANY_CONFIG.offices.baddi.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#002060] dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.offices.baddi.fullAddress}</span>
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <strong>Focus:</strong> {COMPANY_CONFIG.offices.baddi.role}
              </div>
              <a
                href={COMPANY_CONFIG.offices.baddi.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002060] dark:text-blue-400 hover:underline pt-1"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Trade & PCD FAQ Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-[#002060] dark:text-blue-400" />
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Trade Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
