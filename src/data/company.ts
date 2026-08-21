export const COMPANY_CONFIG = {
  name: 'Mars Remedies',
  legalName: 'Mars Remedies Pharmaceuticals',
  tagline: 'Committed to serve better Healthcare',
  email: 'mascospharma1977@gmail.com',
  /**
   * Official phone configuration. Update this value when an official line is assigned.
   * If set to 'REPLACE_WITH_OFFICIAL_NUMBER', the UI will gracefully provide direct email inquiry
   * or a prompt to connect with company management.
   */
  phone: '9931431044',
  
  offices: {
    patna: {
      type: 'Administrative Office (A.O.)',
      title: 'Patna Commercial & Administrative Office',
      addressLine1: 'Sai Homes, Janakpuri, Road No. 3',
      addressLine2: 'Gola Road, PATNA',
      state: 'Bihar',
      country: 'India',
      fullAddress: 'Sai Homes, Janakpuri, Road No. 3, Gola Road, Patna, Bihar, India',
      googleMapsUrl: 'https://maps.google.com/?q=Sai+Homes+Janakpuri+Road+No+3+Gola+Road+Patna+Bihar',
      role: 'Marketing coordination, sales billing, distributor communications & trade queries.',
    },
    baddi: {
      type: 'Head Office (H.O.)',
      title: 'Baddi Corporate & Operations Hub',
      addressLine1: 'KHASRA NO-2272/1896 OPP UNICHEM, LABORATORIES VARDMAN ROAD',
      addressLine2: 'BHATOULI KALA',
      state: 'Himachal Pradesh',
      pin: '',
      country: 'India',
      fullAddress: 'KHASRA NO-2272/1896 OPP UNICHEM, LABORATORIES VARDMAN ROAD. BHATOULI KALA. BADDI (HP)',
      googleMapsUrl: 'https://maps.google.com/?q=KHASRA+NO-2272%2F1896+OPP+UNICHEM+LABORATORIES+VARDMAN+ROAD+BHATOULI+KALA+BADDI+HP',
      role: 'Batch coordination, packaging, quality control assurance & regional logistics.',
    },
  },

  disclaimer:
    'The product information presented on this website is for informational, catalogue, and trade enquiry purposes only. It does not constitute medical advice or prescriptions. Healthcare practitioners and patients should consult relevant clinical guidelines and certified practitioners before use.',
};

export const createProductSlug = (brandName: string, id: string): string => {
  const cleanName = brandName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${cleanName}-${id}`;
};
