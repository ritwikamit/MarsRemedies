export type ProductCategory = 
  | 'Tablets'
  | 'Capsules & Softgel'
  | 'Syrups'
  | 'Drops / Powder / Sachet'
  | 'Injections'
  | 'Cream / Lotion / Soap'
  | 'Eye & Ear Drops'
  | 'Oil';

export interface Product {
  id: string;
  slug?: string;
  brandName: string;
  composition: string;
  category: ProductCategory;
  dosageForm: string;
  packSize: string;
  featured?: boolean;
  description?: string;
  indications?: string;
  storage?: string;
}

export type PageView = 
  | 'home' 
  | 'about' 
  | 'products' 
  | 'categories' 
  | 'contact' 
  | 'privacy' 
  | 'terms'
  | 'product-detail'
  | 'not-found';

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  state: string;
  enquiryType: 'pcd_franchise' | 'third_party_manufacturing' | 'institutional_supply' | 'product_inquiry' | 'general';
  productOfInterest: string;
  message: string;
}

export interface OfficeInfo {
  type: string;
  title: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  pin?: string;
  country: string;
  fullAddress: string;
  googleMapsUrl: string;
  role: string;
}
