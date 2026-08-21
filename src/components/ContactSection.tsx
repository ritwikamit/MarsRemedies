import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Building, Send, CheckCircle2, Copy, Check, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  initialProduct?: string;
  onClearInitialProduct?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialProduct,
  onClearInitialProduct,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    enquiryType: 'Distribution / Franchise',
    productOfInterest: initialProduct || '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({
        ...prev,
        productOfInterest: initialProduct,
        message: prev.message || `I am interested in product details, pricing, and availability for: ${initialProduct}`,
      }));
    }
  }, [initialProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('marsremedies580@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      city: '',
      enquiryType: 'Distribution / Franchise',
      productOfInterest: '',
      message: '',
    });
    setIsSuccess(false);
    if (onClearInitialProduct) onClearInitialProduct();
  };

  return (
    <section className="py-16 md:py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Office Details & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase mb-3 bg-[#141414] text-[#c5a368] border border-[#c5a368]/30">
                <Building className="w-3 h-3 text-[#c5a368]" />
                <span>Offices & Locations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Get in Touch with Mars Remedies
              </h2>
              <p className="text-sm text-[#888888] mt-2 leading-relaxed">
                Connect directly with our administration or headquarters for institutional supplies, product quotations, and distributor partnerships.
              </p>
            </div>

            {/* Email Quick Action Card */}
            <div className="bg-[#0a0a0a] rounded-2xl p-5 border border-[#1a1a1a] shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#c5a368]/30 flex items-center justify-center text-[#c5a368]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#666666] block">
                      Official Communication Email
                    </span>
                    <a
                      href="mailto:marsremedies580@gmail.com"
                      className="text-xs sm:text-sm font-mono font-bold text-white hover:text-[#c5a368] transition-colors"
                    >
                      marsremedies580@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-[#141414] hover:bg-[#222222] text-[#888888] hover:text-white border border-[#222222] transition-colors cursor-pointer"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-[#4ade80]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copiedEmail && (
                <p className="text-[10px] text-[#4ade80] font-medium mt-2 text-right">
                  Email copied to clipboard!
                </p>
              )}
            </div>

            {/* Location 1: Administrative Office (Patna) */}
            <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#1a1a1a] hover:border-[#c5a368]/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c5a368] mb-3">
                <MapPin className="w-4 h-4 text-[#c5a368]" />
                <span>Administrative Office</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-['Space_Grotesk']">
                Patna Commercial Office
              </h3>
              <address className="not-italic text-xs sm:text-sm text-[#888888] leading-relaxed">
                401, S.P. Tower, West Boring Canal Road,<br />
                Patna – 800001, Bihar, India
              </address>
              <div className="mt-4 pt-3 border-t border-[#141414] flex items-center justify-between text-xs text-[#666666]">
                <span>State: Bihar (HQ Operations)</span>
                <span className="font-mono text-[#c5a368]">PIN: 800001</span>
              </div>
            </div>

            {/* Location 2: Head Office (Baddi, HP) */}
            <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#1a1a1a] hover:border-[#c5a368]/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c5a368] mb-3">
                <Building className="w-4 h-4 text-[#c5a368]" />
                <span>Head Office / Manufacturing Hub</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-['Space_Grotesk']">
                Baddi Corporate Facility
              </h3>
              <address className="not-italic text-xs sm:text-sm text-[#888888] leading-relaxed">
                Phase-3, Industrial Area, Baddi,<br />
                Distt. Solan – 173205, Himachal Pradesh, India
              </address>
              <div className="mt-4 pt-3 border-t border-[#141414] flex items-center justify-between text-xs text-[#666666]">
                <span>State: Himachal Pradesh</span>
                <span className="font-mono text-[#c5a368]">PIN: 173205</span>
              </div>
            </div>

          </div>

          {/* Right Column: B2B Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0a0a0a] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#1a1a1a] shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#141414] border border-[#c5a368]/40 text-[#4ade80] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                    Enquiry Received Successfully
                  </h3>
                  <p className="text-sm text-[#888888] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Mars Remedies. Our commercial team will review your requirements and respond promptly at <strong className="text-white">{formData.email}</strong>.
                  </p>

                  <div className="pt-6">
                    <button
                      onClick={handleResetForm}
                      className="px-6 py-2.5 rounded-xl bg-[#c5a368] text-[#050505] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#dfbd80] transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                      Send Commercial Enquiry
                    </h3>
                    <p className="text-xs text-[#777777] mt-1">
                      Fill in your trade details below. For urgent enquiries, write directly to <span className="text-[#c5a368]">marsremedies580@gmail.com</span>.
                    </p>
                  </div>

                  {/* Preselected product badge if present */}
                  {formData.productOfInterest && (
                    <div className="p-3 rounded-xl bg-[#141414] border border-[#c5a368]/30 flex items-center justify-between text-xs text-[#c5a368]">
                      <span>Product Selected: <strong className="text-white">{formData.productOfInterest}</strong></span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, productOfInterest: '' })}
                        className="text-[11px] underline text-[#888888] hover:text-white"
                      >
                        Clear
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#888888] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050505] border border-[#1a1a1a] text-sm text-white placeholder-[#444444] focus:outline-hidden focus:border-[#c5a368] focus:ring-1 focus:ring-[#c5a368] transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#888888] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rajesh@pharmaagency.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050505] border border-[#1a1a1a] text-sm text-white placeholder-[#444444] focus:outline-hidden focus:border-[#c5a368] focus:ring-1 focus:ring-[#c5a368] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#888888] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050505] border border-[#1a1a1a] text-sm text-white placeholder-[#444444] focus:outline-hidden focus:border-[#c5a368] focus:ring-1 focus:ring-[#c5a368] transition-all"
                      />
                    </div>

                    {/* Company / Pharmacy Name */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#888888] mb-1.5">
                        Firm / Agency Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Apex Health Enterprises"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050505] border border-[#1a1a1a] text-sm text-white placeholder-[#444444] focus:outline-hidden focus:border-[#c5a368] focus:ring-1 focus:ring-[#c5a368] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* City / State */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#888888] mb-1.5">
                        City & State *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Patna, Bihar"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050505] border border-[#1a1a1a] text-sm text-white placeholder-[#444444] focus:outline-hidden focus:border-[#c5a368] focus:ring-1 focus:ring-[#c5a368] transition-all"
                      />
                    </div>

                    {/* Enquiry Type */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#888888] mb-1.5">
                        Enquiry Type
                      </label>
                      <select
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050505] border border-[#1a1a1a] text-sm text-white focus:outline-hidden focus:border-[#c5a368] focus:ring-1 focus:ring-[#c5a368] transition-all cursor-pointer"
                      >
                        <option value="Distribution / Franchise">Distribution / Franchise</option>
                        <option value="Hospital & Bulk Supply">Hospital & Bulk Supply</option>
                        <option value="Stockist Agency">Stockist Agency</option>
                        <option value="General Product Enquiry">General Product Enquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#888888] mb-1.5">
                      Message & Requirements *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please specify product names, intended territory, or any specific requirements..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050505] border border-[#1a1a1a] text-sm text-white placeholder-[#444444] focus:outline-hidden focus:border-[#c5a368] focus:ring-1 focus:ring-[#c5a368] transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#c5a368] text-[#050505] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#dfbd80] active:bg-[#a6864d] shadow-[0_0_20px_rgba(197,163,104,0.25)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Details...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Enquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
