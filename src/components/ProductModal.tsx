import React, { useEffect } from 'react';
import { Product } from '../types';
import { COMPANY_CONFIG } from '../data/company';
import { ProductVisual } from './ProductVisual';
import { 
  X, 
  Send, 
  Check, 
  Pill, 
  Package, 
  ShieldCheck, 
  AlertCircle, 
  Info,
  Copy,
  Sparkles,
  Award
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onEnquire: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onEnquire,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#product/${product.slug || product.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
      >
        {/* Header */}
        <div className="bg-[#002060] dark:bg-slate-950 text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-blue-900/60 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-white/15 text-blue-100 border border-white/20">
              {product.category}
            </span>
            <span className="text-xs text-blue-200 dark:text-blue-300">Ref ID: {product.id}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Top Visual & Identity Banner */}
          <div className="grid sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-5">
              <ProductVisual
                category={product.category}
                brandName={product.brandName}
                dosageForm={product.dosageForm}
                packSize={product.packSize}
                size="md"
              />
            </div>

            <div className="sm:col-span-7 space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 id="modal-product-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {product.brandName}
                </h2>
                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/70 text-[#002060] dark:text-blue-300 font-bold text-xs rounded-full border border-blue-200 dark:border-blue-800">
                  {product.dosageForm}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official Mars Remedies Formulation • WHO-GMP Assured
              </p>

              <div className="flex items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Bioequivalence Standard
                </span>
              </div>
            </div>
          </div>

          {/* Active Composition Box */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002060] dark:text-blue-400">
              <Pill className="w-4 h-4" />
              <span>Active Pharmaceutical Composition</span>
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
              {product.composition}
            </p>
          </div>

          {/* Key Specs Matrix */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Commercial Pack</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {product.packSize}
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Quality Standard</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                WHO-GMP &amp; ISO
              </span>
            </div>
          </div>

          {/* Storage & Handling Note */}
          <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 rounded-xl p-3.5 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Storage Recommendation:</strong> Store in a cool, dry, and dark place below 25°C. Protect from direct moisture and sunlight. Keep out of reach of children.
            </div>
          </div>

          {/* Regulatory Disclaimer */}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              {COMPANY_CONFIG.disclaimer}
            </span>
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Share Link</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => onEnquire(product)}
              className="grow inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#002060] hover:bg-[#002d8a] active:bg-[#001744] dark:bg-blue-600 dark:hover:bg-blue-500 shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-blue-200" />
              <span>Enquire For Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
